---
tags:
- mechanism
- nbe
- normalization
- elaboration
- implemented
- ast
- dependent
- row-types
- modality
- continuation
- recursion
- inference
- unification
---
# Quoting

Readback from the semantic domain to syntax: `NF.quote` maps NF.Value back to EB.Term. This is the reverse direction of NbE evaluation — together, evaluate and quote form the eval/quote cycle that drives definitional equality.

The core operation at the boundary is **level-to-index conversion**: bound variables in NF.Value carry de Bruijn levels (absolute position in the context), but EB.Term uses de Bruijn indices (relative distance to binder). Quoting converts via `lvl - v.lvl - 1`.

Under binders (Lambda, Pi, Mu), quoting applies the closure to a fresh rigid variable at the current level, then quotes the result at the next level. This is how NbE "opens" a binder for readback — the fresh rigid becomes a bound variable in the quoted output. Sigma is a special case: the closure is applied to the binder's annotation (the row) rather than a fresh rigid, because sigma dependency flows through field labels, not positional binding.

Meta-variables are resolved during quoting: if the meta is solved (present in `ctx.zonker`), quoting recurses through the solution. Unsolved metas stay as `EB.Var` nodes. This means quoting performs zonking inline — the result is a fully zonked EB.Term.

Neutral terms delegate to their wrapped head. Stuck matches (StuckMatch) rebuild an `EB.Match` from the closure's scrutinee.

<!-- connections:start -->

## Connections

**Outgoing**
- USES → [[level-to-index-conversion]] — Core conversion
- USES → [[closures]] — Apply closure for readback
- QUOTES_TO → [[eb-term]] — NF.Value → EB.Term
- TRAVERSES → [[nf-value]] — Recursive descent
- ENABLES → [[pretty-printing]] — NF values → readable terms
- RELIES_ON → [[de-bruijn-levels]] — Levels in NF.Value
- RELIES_ON → [[de-bruijn-indices]] — Indices in EB.Term
- RELIES_ON → [[level-to-index-conversion]] — Level → index at the boundary
- RELIES_ON → [[meta-variables]] — Chases zonker for solved metas
- RELIES_ON → [[sigma-bindings]] — Sigma applies annotation not fresh rigid
- CONTRASTS_WITH → [[cbv-evaluation]] — Quote is inverse of evaluate

**Incoming**
- [[pretty-printing]] ← USES — NF → EB → render
- [[ast-pipeline]] ← ENABLES — NF → EB readback
- [[nbe]] ← INCLUDES — Readback direction
- [[fst-closure-annotation]] ← APPLIES_TO — Fix quotes Pi to EB.Term at construction site
- [[sigma-quoting-match]] ← APPLIES_TO — Readback limitation
- [[sigma-quoting-field-ref]] ← APPLIES_TO — Readback type-for-value
- [[maplist-schema-unification]] ← RELIES_ON — Quote-evaluate round-trip for scrutinee narrowing
- [[sigma-quoting-field-ref]] ← MIRRORS — Symbolic application during readback, analogous to Pi quoting
- [[sigma-quoting-match]] ← MIRRORS — Symbolic application during readback, analogous to Pi quoting
- [[glued-evaluation]] ← APPLIES_TO — Quote becomes a fallback when syntax is preserved

<!-- connections:end -->

---
tags:
- mechanism
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

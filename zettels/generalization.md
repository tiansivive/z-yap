---
tags:
- type-system
- elaboration
- normalization
- unification
- inference
- mechanism
- concept
- dependent
- monad
- compiler
- code
- polymorphism
- metavariable
- reference
- implemented
status: implemented
---
# Generalization (let bindings)

Implementation: `src/elaboration/normalization/generalization.ts` `generalize`.

Input: `NF.Value` type, `EB.Term` definition, `EB.Context`, `EB.Resolutions`, skolem map from `V2.MutState`.

Collect unsolved metas via `collectMetasNF(ty, zonker)` and `collectMetasEB(tm, zonker)`, uniq by `val`, drop entries present in `resolutions` or `skolems`.

Scoping: keep only metas with `m.lvl >= ctx.env.length` (created at or inside the binding’s elaboration depth). Metas with smaller `lvl` stay open for outer solves.

Build `extendedCtx` by `EB.bind` for each meta with implicit origin `"inserted"` and map `zonker[meta.val]` to `NF.Var(Bound lvl)` so quoting sees binders.

Wrap the generalized type in implicit `NF.Pi`s outer-to-inner (`A.reverse(ms).reduce`), quoting bodies with trimmed env slices so closure levels align.

Interaction: `Stmt.letdec` in `src/elaboration/inference/statements.ts` calls `NF.generalize` after `EB.solve`; `wrapLambda` / `EB.Icit.instantiate` in `src/elaboration/implicits.ts` align term shapes with generalized types.

Hub: [[meta-variables.md]], [[implicits.md]].

<!-- connections:start -->

## Connections

**Outgoing**
- USES → [[meta-variables]] — Generalizes unsolved metas into implicit Pis
- IMPLEMENTS → [[hindley-milner]] — Yap's implementation of HM let-generalization
- PRODUCES → [[implicits]] — Generalization wraps terms in implicit lambdas

**Incoming**
- [[blocks]] ← USES — Let-polymorphism at boundaries
- [[deferred-constraint-solving]] ← ENABLES — Metas generalized before solving
- [[ghc-influence]] ← INSPIRES — Let-polymorphism
- [[missing-spec-let-polymorphism]] ← IMPLEMENTS — No spec formalization
- [[implicit-resolution-solver]] ← PRESERVES — Rejects subst-producing candidates
- [[knot-tying]] ← ENABLES — Recursive let evaluation
- [[hindley-milner]] ← INFORMS — Let-polymorphism theory
- [[implicit-resolution]] ← PRESERVES — Rejects subst-producing candidates
- [[implicit-resolution]] ← COMPOSES_WITH — Deferred resolution preserves generality
- [[blocks]] ← RELIES_ON — Let-dec runs NF.generalize/instantiate
- [[letpoly-implicit-escape]] ← APPLIES_TO — Meta escape at block boundary

<!-- connections:end -->

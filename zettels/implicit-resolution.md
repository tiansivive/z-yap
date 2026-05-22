---
tags:
- elaboration
- inference
- unification
- solver
- mechanism
- constraint
- dependent
- compiler
- code
- ast
- normalization
- monad
- error-handling
- implemented
status: implemented
---
# Implicit resolution (constraints)

Insertion: `src/elaboration/implicits.ts` `insert` — when an expected type is an implicit `Pi`, yields `freshMeta`, builds `App("Implicit", …)`, emits `V2.tell("constraint", { type: "resolve", meta, value: pi.binder.annotation, implicits: ctx.implicits })`. Recursive `insert.gen` walks nested implicit domains.

`resolve` pairs live beside `assign` unification constraints (`src/elaboration/solver/solver.ts` `Constraint`).

Solving: after `_solve` processes `assign` constraints into `zonker`, `resolve` runs with zonked context (`NF.force(ctx, value)` before lookup).

`EB.resolveImplicit` (`context.ts`) — head-first scan of `ctx.implicits`: `U.unify(goal, candidateType, …)` and return the first `[term, subst]` with `Either` success; the constraint solver in `solver.ts` performs the analogous resolution when processing `resolve` constraints.

Instantiate pass: `EB.Icit.instantiate` (`implicits.ts`) substitutes `resolutions` for meta `Var`s when traversing terms.

Hub: [[implicit-resolution-solver.md]], [[implicit-environment.md]], [[implicits.md]], [[typeclass-coherence]], [[functional-dependencies]].

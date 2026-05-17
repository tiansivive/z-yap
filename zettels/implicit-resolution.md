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

`EB.resolveImplicit` (`context.ts`) mirrors the same head-first unify walk but has **no call sites** elsewhere under `src/` (dead export as of this audit).

Instantiate pass: `EB.Icit.instantiate` (`implicits.ts`) substitutes `resolutions` for meta `Var`s when traversing terms.

Hub: [[implicit-resolution-solver.md]], [[implicit-environment.md]], [[implicits.md]].

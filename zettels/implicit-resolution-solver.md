---
tags:
- elaboration
- solver
- unification
- inference
- mechanism
- normalization
- type-system
- compiler
- code
- performance
- principle
- testing
- monad
- implemented
status: implemented
---
# Solver: `resolve` constraints

File: `src/elaboration/solver/solver.ts`.

`solve`: partition constraints into `assign` vs `resolve`. Process all `assign` via `U.unify` with context `zonker` composed into local reader state (`_solve`). Then `resolve(resolveConstraints, zonkedCtx)`.

Per `resolve` constraint: if `ctx.zonker[meta.val]` already set, skip. Else `lookup(implicits, nf)` walks the **front** of `implicits`: `U.unify(nf, candidateTy, env.length, Sub.empty)(ctx)`. On `Right(subst)`, accept only if `_.isEmpty(subst)` — non-empty substitution retries the tail so one implicit choice does not prematurely solve other metas (comment references Idris 2 / Lean-style behavior).

If no candidate, constraint is skipped without error; unresolved metas may remain for zonking / default instantiation paths in `implicits.ts` `instantiate`.

Hub: [[implicit-resolution.md]], [[generalization.md]].

---
tags:
  [
    mechanism,
    elaboration,
    unification,
    normalization,
    inference,
    monad,
    compiler,
    row-types,
    quantifiers,
    error-handling,
    tracing,
    implemented,
  ]
---
# Constraint solving

**Emission:** `V2.tell("constraint", …)` appends provenance-stamped constraints to the monad collector (`src/elaboration/shared/monad.v2.ts`). `assign` obligations default `lvl` to `ctx.env.length`.

**Solve:** `EB.solve` (`src/elaboration/solver/solver.ts`) partitions constraints: all `assign` rows are solved sequentially via `U.unify(left, right, lvl, subst)` with a zonker-augmented context; composed result is merged into `ctx.zonker`. Then `resolve` rows map implicit-holes to `EB.Term` by searching `ctx.implicits`, using `U.unify` and **skipping** candidates whose success substitution is non-empty (avoids prematurely fixing other metas — comment in `resolve`).

**Let pipeline:** `letdec` (`inference/statements.ts`) runs `V2.listen()` → `EB.solve(constraints)` under `V2.local` → `NF.generalize` on `NF.force(…)` → `NF.instantiate` → implicit wrap (`Icit`). Module-level lets follow the same sketch in `module.ts`.

**Zonking:** substitution lives in `ctx.zonker` (`context.ts`); `NF.force` consults it during normalization.

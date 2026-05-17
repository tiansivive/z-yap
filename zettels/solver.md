---
tags:
  [
    elaboration,
    inference,
    unification,
    normalization,
    tooling,
    mechanism,
    code,
    monad,
    polymorphism,
    project,
    testing,
    implemented,
  ]
---
# Solver

**`solve`** — **`src/elaboration/solver/solver.ts`**. Input **`Array<WithProvenance<Constraint>>`** where **`Constraint`** is **`assign`** (**`left`**, **`right`**: **`NF.Value`**, **`lvl`**) or **`resolve`** (**`meta`**, **`value`**, **`implicits`**).

1. **`assign`** list → **`_solve`**: for each constraint, **`V2.local(ctx => ({ ...ctx, zonker: Sub.compose(subst, ctx.zonker) }), U.unify(left, right, lvl, subst))`** then recurse with returned **`subst`**. Empty base case **`Sub.empty`**.
2. Build **`zonked = update(ctx, "zonker", z => Sub.compose(subst, z))`** using accumulated **`subst`**.
3. **`resolve`** passes **`zonked`** into **`resolve()`**.

**Return value**: **`{ zonker: subst, resolutions }`** — here **`zonker`** names the **assignment** substitution **`subst`** returned by **`_solve`**, not the full context zonker; callers merge via **`Sub.compose(zonker, ctx.zonker)`** (e.g. **`src/elaboration/module.ts`** **`expression`**).

**`resolve`**: skips metas already in **`ctx.zonker`**; **`NF.force(ctx, value)`**; **`lookup`** tries each implicit **`U.unify(nf, value, ctx.env.length, Sub.empty)`** — accepts only **`Either.Right`** with **empty** substitution (**`.isEmpty(result.right)`**) so candidates that would instantiate unrelated metas are skipped (comment references Idris2 / Lean behavior).

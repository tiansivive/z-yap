---
tags:
  [
    type-system,
    elaboration,
    normalization,
    unification,
    inference,
    verification,
    dependent,
    row-types,
    concept,
    reference,
    compiler,
    implemented,
  ]
---
# Unification

Hub for metavariable equality on **`NF.Value`** (**`src/elaboration/unification/unification.ts`**) and row unification (**`src/elaboration/unification/rows.ts`**), driven in batch by **`solve`** (**`src/elaboration/solver/solver.ts`**).

**Pipeline position**: inference/checking emit **`assign` / `resolve`** constraints (**`Constraint`** in **`solver.ts`**); **`solve` → `U.unify` → `Subst`**, then **`resolve`** against **`NF.force`** goals. **`module.ts`** **`expression`** composes returned **`zonker`** into context and feeds **`NF.generalize` / `NF.instantiate`** with **`resolutions`**.

**Core pieces** (detail zettels):

- **flex–flex / flex–rigid** — flex-flex-unification.md, flex-rigid-unification.md
- **occurs guard on `bind`** — occurs-check.md
- **μ / `App` unfold** — mu-type-unification.md
- **rows + `rewrite`** — row-unification.md, row-rewriting.md, row-unification-mechanism.md
- **`Subst`** — substitution-system.md
- **solver batching + implicits** — solver.md, solver-dispatch.md
- **full case inventory** — unification-algorithm.md

**Effects on context**: **`unify`** composes **`Sub.compose(subst, ctx.zonker)`** before **`NF.force`**; **`Mu`/`EB.unfoldMu`** uses **`V2.local`** so env length reflects μ binding during sub-calls.

---
tags:
  [
    type-system,
    elaboration,
    normalization,
    unification,
    recursion,
    dependent,
    mechanism,
    ast,
    code,
    reference,
    migration,
    implemented,
  ]
---
# Mu-type unification

**`Mu` vs `Mu`** (`src/elaboration/unification/unification.ts`): same pattern as **`Pi`** — unify binder annotations at **`lvl`**, compose substitution, then unify bodies **`NF.apply(mu.binder, mu.closure, NF.Constructors.Rigid(lvl))`** at **`lvl + 1`**.

**`Mu` vs other (and symmetric)**: unfold **`NF.apply(mu.binder, mu.closure, mu)`**, run remaining unification inside **`V2.local(ctx => EB.unfoldMu(ctx, { type: "Mu", variable: mu.binder.variable }, mu), …)`** so **`src/elaboration/shared/context.ts`** **`unfoldMu`** prepends an env entry (μ body in the environment for the recursive step).

**`App` vs `App`**: if no flex in head/arg positions, **`NF.unfoldMu(left)`** / **`NF.unfoldMu(right)`** (`src/elaboration/normalization/recursion.ts`) — if either is **`Some`**, **`unify`** the unfolded spine pair; else structural **`func`** + **`arg`**. Additional arms unfold a single **`App`** when **`NF.unfoldMu(app)`** is **`Some`**.

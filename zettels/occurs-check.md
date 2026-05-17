---
tags:
  [
    type-system,
    elaboration,
    unification,
    normalization,
    dependent,
    problem,
    mechanism,
    code,
    error-handling,
    tracing,
    monad,
    implemented,
  ]
---
# Occurs check

**`bind`** (`src/elaboration/unification/unification.ts`) calls **`occursCheck(ctx, v, canonical)`** after rewriting **`StuckMatch`** to **`NF.reduce`**. Identity **`Var`** meta (**`_.isEqual(ty.variable, v)`**) yields **`Subst.empty`** without scanning.

**Semantics in code**: **`occursCheck`** returns **`true`** when the meta **`v`** is deemed to occur inside **`ty`**; **`bind`** proceeds only when **`!occursCheck`** — otherwise it **`throw new Error("Unification: Occurs check failed. Need to implement mu type")`** (no μ-wrapper recovery implemented).

**`NF.Value` traversal**: **`Var`** (meta equality), **`Neutral`** (into **`value`**), **`Lambda`/`Pi`/`Sigma`** delegate to **`occursInTerm(closure.ctx, v, closure.term)`**, **`App`** (func + arg), **`Modal`** (**`value`** + **`modalities.liquid`**), **`Row`** via **`R.fold`**. Any other **`NF.Value`** shape hits **`.otherwise(() => false)`** — no explicit **`Mu`** / **`Lit`** / … descent.

**`occursInTerm`** walks **`EB.Term`**: **`Var` Meta** (zonker chase or equality), **`Abs`**, **`App`**, **`Match`**, **`Block`**, **`Row`**, **`Proj`**, **`Inj`**, **`Lit`** false, **`Modal`**, **`.otherwise`** false.

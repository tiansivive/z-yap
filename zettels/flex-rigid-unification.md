---
tags:
  [
    type-system,
    elaboration,
    normalization,
    unification,
    inference,
    dependent,
    modality,
    mechanism,
    principle,
    code,
    error-handling,
    implemented,
  ]
---
# Flex–rigid unification

`src/elaboration/unification/unification.ts`:

- Each **`unify`** entry rebuilds **`zonked`** context **`{ ...ctx, zonker: Sub.compose(subst, ctx.zonker) }`** and **`NF.force`** both operands before dispatch — instantiated metas surface as **`Neutral`** and are peeled again via **`NF.unwrapNeutral`**.
- **`[Flex, non-Flex]`** / **`[non-Flex, Flex]`**: **`bind(ctx, meta.variable, rigidSide)`** then **`Sub.compose(..., subst)`**. **`bind`** (same file) normalizes **`StuckMatch`** via **`NF.reduce`**, runs **`occursCheck`**, then **`Sub.of`** or **`throw`** (see **occurs-check** zettel).
- **`Flex`** plus **`subst` hit**: guarded clauses re-enter **`unify(subst[meta], other, lvl, subst)`** without **`bind`**.

Modal glue: **`Modal`** unwraps **`value`** against the other side via **`unify(value, …)`** before structural comparison.

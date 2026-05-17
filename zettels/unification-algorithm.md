---
tags:
  [
    type-system,
    elaboration,
    normalization,
    unification,
    inference,
    dependent,
    mechanism,
    ast,
    code,
    ffi,
    modality,
    implemented,
  ]
---
# Unification algorithm

**`export const unify(left, right, lvl, subst)`** — **`src/elaboration/unification/unification.ts`**.

**Pre-dispatch**: peel **`Neutral`** on either side (no level change). Inner loop: **`V2.track`**, **`ctx`**, **`zonker = Sub.compose(subst, ctx.zonker)`**, **`NF.force`** both, **`NF.unwrapNeutral`** pair, **`ts-pattern`** **`match`**.

**Representative clauses** (read source for exact guards):

| Pair shape | Behavior |
| --- | --- |
| **Flex × Flex** | **`bind`** left→right flex value; unify meta **annotations** |
| **Flex × _`subst` hit`** | Chase **`subst[meta]`**, recurse |
| **Flex × _** / **_ × Flex** | **`bind`** then **`Sub.compose`** |
| **Lit × Lit** | **`_.isEqual`** values else **`Err.UnificationFailure`** |
| **Modal** | unify embedded **`value`** |
| **Lambda × Lambda** | same **`binder.icit`**; **`NF.apply`** bodies at **`Rigid(lvl)`**, **`lvl+1`** |
| **Pi × Pi** | unify annotations; compose; unify bodies **`lvl+1`** |
| **Mu × Mu** | unify binder annotations; unify unfolded bodies **`lvl+1`** |
| **Sigma × Sigma** | unify annotations; bodies applied at **`Sigma`** binder annotation |
| **Σ × Schema** / **Schema × Σ** | **`NF.apply`** Σ closure at **`schema.arg`** then unify |
| **Schema × Schema**, **Struct × Struct**, **Variant × Variant** | unify **`arg`** rows |
| **Indexed × Indexed**, **Recursive × Recursive** | multi-field unify |
| **StuckMatch × StuckMatch** | **`throw`** unsupported |
| **StuckMatch × _** | **`NF.reduce`** explicit; unify |
| **App × App** | flex-fast path; else **`NF.unfoldMu`** on both sides or per-side **`App`** arms |
| **_ × Mu** / **Mu × _** | **`NF.apply`** + **`EB.unfoldMu`** |

**Rigid × Rigid**: **`_.isEqual(variable)`** else **`Err.RigidVariableMismatch`**.

**Row × Row**: **`Row.unify`** + **`Sub.compose`**.

**Foreign `Var` × Foreign `Var`**: same **`variable.name`** (comment: shadowing assumption).

**Otherwise**: **`Err.TypeMismatch`**.

Return **`Sub.compose(sub, subst)`** from inner successful **`unifier`**.

**`unify.gen`** wraps **`V2.pure(unify(...))`** for **`yield*`** call sites (**rows**, solver tracks).

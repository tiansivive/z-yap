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

**Semantics in code**: **`occursCheck`** returns **`true`** when the meta **`v`** is deemed to occur inside **`ty`**; **`bind`** proceeds only when **`!occursCheck`** — otherwise it **`throw new Error("Unification: Occurs check failed. Need to implement mu type")`** (occurrence inside a μ-type is not unwrapped; the bind aborts with that error).

**`NF.Value` traversal**: **`Var`** (meta equality), **`Neutral`** (into **`value`**), **`Lambda`/`Pi`/`Sigma`** delegate to **`occursInTerm(closure.ctx, v, closure.term)`**, **`App`** (func + arg), **`Modal`** (**`value`** + **`modalities.liquid`**), **`Row`** via **`R.fold`**. Any other **`NF.Value`** shape hits **`.otherwise(() => false)`** — no explicit **`Mu`** / **`Lit`** / … descent.

**`occursInTerm`** walks **`EB.Term`**: **`Var` Meta** (zonker chase or equality), **`Abs`**, **`App`**, **`Match`**, **`Block`**, **`Row`**, **`Proj`**, **`Inj`**, **`Lit`** false, **`Modal`**, **`.otherwise`** false.

<!-- connections:start -->

## Connections

**Outgoing**
- CONSTRAINS → [[unification-algorithm]] — Prevents cycles
- TRAVERSES → [[nf-value]] — Walks checking meta presence
- DETECTS → [[mu-types]] — Cyclic types
- DETECTS → [[typing-rules]] — Failures producing Mu wrapping

**Incoming**
- [[unification-algorithm]] ← USES — Prevents infinite types

<!-- connections:end -->

---
tags:
  [
    row-types,
    type-system,
    elaboration,
    normalization,
    unification,
    inference,
    dependent,
    mechanism,
    pattern,
    code,
    compiler,
    implemented,
  ]
---
# Row unification

Implemented in **`src/elaboration/unification/rows.ts`** (**`Row.unify`**) and invoked from **`NF.Row` vs `NF.Row`** in **`src/elaboration/unification/unification.ts`** with **`lvl = ctx.env.length`**.

**Purpose**: unify **`NF.Row`** spines (records / row polymorphism) using scoped-label rotation (**`rewrite`**) when matching an **`extension`** on the left against an arbitrary right row.

**High-level flow**:

- **`empty`/`empty`**: done (**`subst`** unchanged).
- Two **`variable`** rows: succeed only if **`_.isEqual(v1, v2)`**; else fall through to **`otherwise`** (**`throw`** with Leijen paper citation in message).
- Row meta **`variable`** solved in **`subst`**: chase (**`nf.row`**) if **`nf.type === "Row"`**, else **`throw "Expected row"`**.
- Row meta vs other: **`bind(ctx, variable, NF.Constructors.Row(otherRow))`** (**`bind`** from **`src/elaboration/unification/unification.ts`** via re-export pattern — **`rows.ts`** imports **`bind`** from **`"."`**).

**Extension vs `_`**: **`rewrite`**, require rewritten head **`extension`**, **`U.unify`** field **`NF.Value`**s, recurse **`Row.unify`** on tails; compose **`Subst`** **`o3 ∘ o2 ∘ o1`**.

**`empty` vs `extension`** (either order): **`Err.MissingLabel`**.

Unmatched combinations hit **`otherwise`** (**`throw`**).

Detail: **`row-unification-mechanism.md`**.

<!-- connections:start -->

## Connections

**Incoming**
- [[yap]] ← USES — Row variable unification in constraint solving
- [[constraint-solving]] ← USES — Row variables unified alongside type variables
- [[row-types.thread]] ← INCLUDES
- [[maplist-schema-unification]] ← APPLIES_TO — Row comparison step fails

<!-- connections:end -->

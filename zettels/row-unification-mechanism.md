---
tags:
  [
    row-types,
    unification,
    elaboration,
    normalization,
    dependent,
    mechanism,
    ast,
    code,
    reference,
    tracing,
    implemented,
  ]
---
# Row unification mechanism

Match order on **`[r1, r2]`** in **`Row.unify`** (`src/elaboration/unification/rows.ts`):

| Pattern | Action |
| --- | --- |
| **`empty`, `empty`** | **`V2.of(s)`** |
| **`variable`, `variable`** (equal) | **`V2.of(s)`** |
| **`variable` Meta, `_`** if **`s[meta]`** | **`unify(unfoldedRow, other, s)`** |
| **`_`, `variable` Meta** if **`s[meta]`** | symmetric chase |
| **`variable` Meta, `_`** (unsolved) | **`bind(ctx, variable, NF.Constructors.Row(r))`** |
| **`_`, `variable` Meta** (unsolved) | symmetric **`bind`** |
| **`extension`, `_`** | **`rewrite` → unify values → unify tails**; subst composition **`Sub.compose(o3, Sub.compose(o2, o1))`** |
| **`empty`, `extension`** | **`Err.MissingLabel(label, emptyRow)`** |
| **`extension`, `empty`** | **`Err.MissingLabel`** |
| **`otherwise`** | **`throw`** (message references Leijen, **"Extensible records with scoped labels"**) |

**`rewrite`** is defined in the same file; **`U.unify.gen(value, rewritten.value, lvl, Sub.compose(o1, s))`** uses **`lvl = ctx.env.length`**.

Tracking: **`V2.track({ tag: "unify", type: "row", rows: [r1, r2], ... })`**.

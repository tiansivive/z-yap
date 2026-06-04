---
tags:
  [
    row-types,
    unification,
    elaboration,
    normalization,
    rewriting,
    mechanism,
    dependent,
    ir,
    code,
    error-handling,
    reference,
    implemented,
  ]
---
# Row rewriting

**`rewrite`** is **`private`** inside **`src/elaboration/unification/rows.ts`** (see TODO comment pointing at **`rows.ts`**). **`Row.unify`** calls **`rewrite(r, label, s)`** when the left row is **`extension`** so the requested **`label`** sits at the head of the **right** row.

**Cases**:

- **`empty`**: **`V2.fail(Err.MissingLabel(label, r))`**.
- **`extension`** with matching **`label`**: return **`[Extension(label, value, row), Sub.empty]`**.
- **`extension`** with different label: recurse on **`row`**, then rotate — builds **`Extension(innerLabel, … Extension(lbl, val, tail))`** preserving the non-head field **`lbl`** behind the peeled label.
- **`variable`**:
  - Non-meta → **`Err.Impossible("Expected meta variable")`**.
  - Meta solved in **`s`**: **`rewrite(solved.row, label, s)`**.
  - Meta unsolved: **`freshMeta`** pair **`kvar`/`tvar`**, **`freshMeta`** row tail **`rvar`**, **`rf = Extension(label, tvar, rvar)`**, **`Sub.of(meta.val, NF.Constructors.Row(rf))`** — returns **`[rf, sub]`** (instantiates row meta as fresh extension + unknown tail).

<!-- connections:start -->

## Connections

**Outgoing**
- ENABLES → [[projection]] — Label lookup for field access
- ENABLES → [[injection]] — Row extension
- ENABLES → [[row-unification-mechanism]] — Restructuring for unification
- REWRITES → [[row-data-structure]] — Moves label to head
- TRAVERSES → [[row-data-structure]] — Recursive tail descent

**Incoming**
- [[row-unification-mechanism]] ← DELEGATES_TO — Label lookup
- [[row-data-structure]] ← ENABLES — Rewrite over rows
- [[structural-row-based-types]] ← MOTIVATES — Row mechanism choice
- [[row-polymorphism]] ← DELEGATES_TO — Label lookup mechanism
- [[row-types.thread]] ← INCLUDES

<!-- connections:end -->

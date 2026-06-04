---
tags:
  [
    planned,
    syntax,
    row-types,
    parser,
    type-system,
    elaboration,
    ast,
    inference,
    dependent,
    language,
    migration,
    problem,
    testing,
    reference,
  ]
---

# Records vs indexed separation

Surface syntax already distinguishes **anonymous rows / structs / tuples / variants** from **indexed dictionary types**:

- Row / extension typing examples use `[ … ]` style labels and tails (`src/elaboration/inference/__tests__/rows.test.ts`).
- Hash-map style types use **`{[ keyTy ]: valTy }`** (`src/elaboration/inference/__tests__/dictionaries.test.ts`: `{[ Num ]: Num }`).

Internally, **`EB.Constructors.HashMap`** composes foreign **`Indexed`** with optional strategy (`src/elaboration/syntax/term.ts`), separate from plain **`Struct`/`Schema`** row encodings.

Residual confusion is pedagogical/tooling-level (similar braces vs brackets). Sharper segregation — clearer syntax ↔ elaborator mapping, diagnostics — depends on coordinated grammar (`grammar.ne`), eventual tree-sitter parity, and any **`dedicated-row-constructors`**-style EB cleanup.

<!-- connections:start -->

## Connections

**Outgoing**
- ADDRESSES → [[structural-records]] — Syntax confusion with indexed types
- ADDRESSES → [[lists]] — Indexed vs plain record clarity
- ADDRESSES → [[dictionaries]] — Indexed vs plain record clarity

<!-- connections:end -->

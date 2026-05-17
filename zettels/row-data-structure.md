---
tags:
  - type-system
  - elaboration
  - concept
  - ast
  - ir
  - implemented
  - pattern
  - row-types
  - reference
  - display
  - performance
  - infrastructure
---
# Row Data Structure

`R.Row<T, V>` is `empty | extension { label, value, row } | variable { variable }` exported from `src/shared/rows.ts`. `EB.Term` rows use `T = EB.Term`, `V = EB.Variable` (`Row` alias in `src/elaboration/syntax/term.ts`); `NF.Value` rows use `T = NF.Value`, `V = NF.Variable` (`Row` in `src/elaboration/normalization/syntax/term.ts`).

The module centralizes `display`, `displayDoc`, `traverse`, `fold`, `append`, and `rewrite` (used from inference, e.g. `src/elaboration/inference/injection.ts` for label / row transformation). Errors from `rewrite` are `Either` tagged `Mismatch` / `ExpectedExtension` / `Other` (`rows.ts`).

Row **terms** inside `EB.Term` also include the standalone `{ type: "Row"; row }` constructor for type-level row objects; record/variant/schema **data** uses `App(Lit(Atom(...)), Row(...))` patterns in `CtorPatterns` (`src/elaboration/syntax/term.ts`).

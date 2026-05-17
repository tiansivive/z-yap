---
tags:
  [
    recursion,
    row-types,
    dependent,
    elaboration,
    inference,
    testing,
    type-system,
    mir,
    compiler,
    incomplete,
    project,
    syntax,
  ]
---
# Mutual recursion

**Within a row / struct literal:** Sigma + label variables support mutually dependent fields. Example: `src/elaboration/inference/__tests__/structs.test.ts` (`mutually dependent fields: { a: :b + 1, b: :a + 1 }`). Mechanism: `EB.Rows.inSigmaContext` (`src/elaboration/inference/rows.ts`) runs `extract` then `V2.local` with `EB.extendSigma` per label before checking field values; `collect` ties field types to `ctx.sigma[lbl]`. TODO in-file: sigma as a stack for nested rows.

**Module / top-level declarations:** `src/elaboration/module.ts` walks statements with `next(tail, ctx)` after each `let` / `foreign` / `using` — sequential elaboration on a growing context, not an SCC-based mutual recursion pass (no separate backpatching phase found in this file).

Claims about multi-module cyclic groups, Haskell-style patching, or nominal “seams” are not grounded in the current tree without further reading of `module.ts` beyond the sequential `next` structure.

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

**Module / top-level declarations:** `src/elaboration/module.ts` walks statements with `next(tail, ctx)` after each `let` / `foreign` / `using` — sequential elaboration on a growing context. Each binding is visible to later statements in the same module walk; cyclic top-level groups would need an SCC/backpatching story beyond this sequential `next` structure.

Multi-module cyclic groups, Haskell-style patching, or nominal “seams” would extend that module walk—worth validating against `module.ts` before asserting specific semantics.

<!-- connections:start -->

## Connections

**Outgoing**
- EXTENDS → [[module-system]] — Multi-pass elaboration
- REQUIRES → [[constraint-solver]] — Multi-pass constraint solving

**Incoming**
- [[recursion.thread]] ← INCLUDES
- [[sigma-vs-codata-label-refs]] ← COMPOSES_WITH — Flat-row sigma parallels mutual letrec
- [[gram-label-resolution-pass]] ← USES — Sigma row scope stack for nested rows
- [[recursive-struct-binding]] ← ADDRESSES — Struct label group is value-level letrec

<!-- connections:end -->

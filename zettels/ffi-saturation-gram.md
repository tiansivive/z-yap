---
tags:
  - implemented
  - lowering
  - graph
  - ffi
  - codegen
  - compiler
  - primitive
  - runtime
---

# FFI saturation (GRAM)

`src/GRAM/passes/saturate.ts` folds applications over foreign/primop refs into `EXTERNAL` graph nodes. When an application spine reaches the declared arity (consulted from `ARITIES` in `src/lowering/shared/primops.ts`), the pass collapses the chain into a single saturated node carrying all arguments.

Unsaturated applications remain as partial application nodes for closure wrapping downstream. Runs in explorer pipeline order `closureConvert(saturate(eta(...)))`.

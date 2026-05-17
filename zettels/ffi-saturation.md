---
tags:
- ffi
- lowering
- mir
- mechanism
- codegen
- backend
- runtime
- continuation
- monad
- testing
- primitive
- implemented
---
# FFI Saturation

In **MIR lowering**, saturated foreign calls are accumulated then emitted as direct calls; partial applications become forwarding closures (`docs/MIR-LOWERING.md`, `src/lowering/functions/materialize.ts` `reify` / `partial`).

Mechanism: `Functions.App.lower` (`src/lowering/functions/app.ts`) schedules `Cont:sat` frames with `saturate: new Set([0])` so `functions/materialize.ts` passes foreign/primop `LowerResult` spines through without premature closure wrapping while arguments stream in. When `args.length === arity`, `emitCall` writes `Call(direct)` / `PrimOp`; otherwise lowering keeps a pending `{ tag: "foreign" | "primop", args, arity }`.

Tests naming this behaviour: `src/lowering/__tests__/lower.test.ts` (`lower.test.ts.snap` entries for saturated vs unsaturated `print` / `write`, shift bodies).

Separate concern: **GRAM** `src/GRAM/passes/saturate.ts` folds applications over foreign refs into `EXTERNAL` graph nodes using payload arity (also consulting `ARITIES` from `src/lowering/shared/primops.ts`). That runs in explorer pipeline order `closureConvert(saturate(eta(...)))` (`src/cli/explore/pipeline.ts`), not inside `lowerToMir`.

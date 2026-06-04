---
tags:
  - deprecated
  - lowering
  - mir
  - ffi
  - codegen
  - compiler
  - primitive
  - runtime
---

# FFI saturation (MIR lowering)

Part of the deprecated direct `EB.Term → MIR` lowering path (`src/lowering/`). `Functions.App.lower` scheduled `Cont:sat` frames with `saturate: new Set([0])` so `functions/materialize.ts` passed foreign/primop spines through without premature closure wrapping while arguments streamed in. When `args.length === arity`, `emitCall` wrote `Call(direct)` / `PrimOp`; otherwise lowering kept a pending `{ tag: "foreign" | "primop", args, arity }`.

Superseded by the GRAM saturation pass ([[ffi-saturation-gram]]).

<!-- connections:start -->

## Connections

**Outgoing**
- EXTENDS → [[ffi]] — Deprecated MIR lowering saturation
- RELIES_ON → [[mir-lowering]] — Part of deprecated direct lowering path

**Incoming**
- [[ffi-saturation-gram]] ← SUPERSEDES — GRAM pass replaces MIR lowering mechanism

<!-- connections:end -->

---
tags:
  - bugfix
  - implemented
  - lowering
  - graph
  - mir
  - codegen
  - compiler
  - ir
---

# Bridge type-level erasure

`Tags.PI`, `Tags.SIGMA`, and `Tags.VAR_META` had no dispatch case in the GRAM→MIR bridge (`src/GRAM/bridge/emit.ts`). When these nodes appeared in the enriched graph — from type-level expressions like `(x: Num) -> (y: Num) -> Num` or implicit Pi `(x: Num) => Num` — the bridge fell through to `passthrough`, producing MIR references to undeclared variables (`v0`).

**Fix:** Added dispatch cases erasing all three to empty records (`emptyStruct`). Type-level nodes have no runtime representation; erasure is the correct semantics until QTT-based principled erasure is implemented.

**Files:** `src/GRAM/bridge/emit.ts`.

<!-- connections:start -->

## Connections

**Outgoing**
- FIXES → [[gram-to-mir-bridge]] — PI/SIGMA/VAR_META dispatch
- ADDRESSES → [[type-erasure]] — Interim erasure until QTT

**Incoming**
- [[explorer-audit.thread]] ← INCLUDES — Thread member

<!-- connections:end -->

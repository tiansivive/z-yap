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

`Tags.PI`, `Tags.SIGMA`, `Tags.MU`, and `Tags.VAR_META` need an interim runtime witness in the GRAM→MIR bridge (`src/GRAM/bridge/emit.ts`). Without a dedicated dispatch case, a type-level graph node falls through to `passthrough`, producing MIR references to undeclared variables (`v0`).

**Fix:** The bridge erases each form to an empty record (`emptyStruct`). Type-level nodes have no runtime representation; erasure is the correct semantics until QTT-based principled erasure is implemented. The allocation and enclosing `let` receive MIR `debug.erasure` provenance, so an operationally inert witness remains explainable in MIR display without becoming descriptive runtime data.

**Files:** `src/GRAM/bridge/emit.ts`.

<!-- connections:start -->

## Connections

**Outgoing**
- FIXES → [[gram-to-mir-bridge]] — PI/SIGMA/VAR_META dispatch
- ADDRESSES → [[type-erasure]] — Interim erasure until QTT

**Incoming**
- [[explorer-audit.thread]] ← INCLUDES — Thread member

<!-- connections:end -->

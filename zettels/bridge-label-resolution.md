---
tags:
  - bugfix
  - implemented
  - lowering
  - graph
  - mir
  - codegen
  - compiler
  - row-types
---

# Bridge label resolution

`Tags.VAR_LABEL` nodes (`:x` field self-references in dependent structs like `{ x: 1, y: :x + 2 }`) had no dispatch in the GRAM→MIR bridge. The bridge produced an undeclared MIR variable (`v1`) instead of resolving the label to the already-emitted field value.

**Fix:** Added label tracking to the bridge context (`bindLabel`/`resolveLabel` in `context.ts`), a `label` handler in `leaves.ts` that resolves via the label map, and updated the struct emitter in `emit.ts` to accumulate label bindings left-to-right so `:x` references resolve to the MIR name of `x`'s value.

**Files:** `src/GRAM/bridge/emit.ts`, `src/GRAM/bridge/context.ts`, `src/GRAM/bridge/leaves.ts`.

<!-- connections:start -->

## Connections

**Outgoing**
- FIXES → [[gram-to-mir-bridge]] — VAR_LABEL dispatch
- USES → [[row-types]] — Dependent struct field references
- LACKS → [[bridge-forward-label-refs]] — Current left-to-right pass handles backward refs only

**Incoming**
- [[explorer-audit.thread]] ← INCLUDES — Thread member
- [[bridge-label-closure-gap]] ← EXTENDS — Edge case of prior fix
- [[gram-label-resolution-pass]] ← SUPERSEDES — Edge resolution replaces the order-dependent name map

<!-- connections:end -->

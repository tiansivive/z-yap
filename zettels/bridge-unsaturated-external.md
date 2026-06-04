---
tags:
  - implemented
  - lowering
  - graph
  - mir
  - codegen
  - compiler
  - ffi
  - closure
  - primitive
  - ir
  - bugfix
---

# Bridge unsaturated external gap

`src/GRAM/bridge/primops.ts` emitted `Call({ type: "direct", func: name }, args)` for all `EXTERNAL` nodes without checking the `saturated` payload. Unsaturated externals (partial application of foreign/primop references) require synthetic closure wrappers — a chain of curried functions that accumulate arguments until arity is reached.

The old MIR lowering path (`src/lowering/functions/materialize.ts`) handled this correctly: `partial()` builds a closure wrapper chain via `curry()` and `Closure.bundle()`.

**Symptom**: An unsaturated foreign reference like `write 1` (arity 2, 1 arg provided) passed through the bridge emitted a direct call with insufficient arguments, producing undefined behavior or crashes at runtime.

**Resolution**: `[[gram-pap-pass]]` transforms unsaturated externals into explicit `PAP` nodes before they reach the bridge:
- `PAP { remaining }` nodes with `:materializes` edges to the original `EXTERNAL`
- `:captured` edges to the partial arguments

The bridge translates PAP nodes into MIR closure wrapper chains. This keeps the bridge mechanical (GRAM adds semantics, bridge translates) rather than teaching the bridge to emit closure wrappers.

<!-- connections:start -->

## Connections

**Outgoing**
- ADDRESSES → [[gram-to-mir-bridge]] — Bridge lacks partial application handling
- RELIES_ON → [[ffi-saturation-gram]] — Depends on saturate pass marking `saturated: false`
- RELIES_ON → [[saturation]] — Saturation mechanism marks partial vs full application
- MIRRORS → [[bridge-closure-capture]] — Sibling bridge closure gap
- ADDRESSES → [[primop-closure]] — Primop closures need synthetic wrappers when unsaturated

**Incoming**
- [[gram-pap-pass]] ← RESOLVES — PAP pass eliminates unsaturated externals before bridge
- [[pipeline-stabilization.thread]] ← INCLUDES — Bug: unsaturated externals need closure wrappers

<!-- connections:end -->

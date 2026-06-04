---
tags:
- concept
- normalization
- closure
- ffi
- primitive
- implemented
- evaluation
---
# PrimOp closure

A closure for primitive and external operations: `{ type: "PrimOp"; ctx; term; arity; compute }`. PrimOps accumulate arguments via environment extension until the arity is reached, then invoke the native `compute(...args)` function with the collected NF.Value arguments.

This is the mechanism for built-in operations (arithmetic, string operations, comparison) and FFI primitives. Unlike standard closures, PrimOps have a known arity and a JavaScript-level compute function rather than an EB.Term body.

Saturation works by slicing the first `arity` entries from the extended environment and passing them to `compute`. If any argument is neutral (stuck), the PrimOp cannot reduce and produces a neutral application instead — preserving the property that NbE only reduces when all needed information is available.

PrimOps are constructed during evaluation when an External value's arity is reached, bridging the gap between Yap's elaboration semantics and host-language operations.

<!-- connections:start -->

## Connections

**Outgoing**
- IMPLEMENTS → [[ffi]] — Built-in and foreign operations
- RELIES_ON → [[nf-value]] — Args and result are NF.Value
- PRODUCES → [[neutrals]] — Neutral when arg is stuck

**Incoming**
- [[bridge-unsaturated-external]] ← ADDRESSES — Primop closures need synthetic wrappers when unsaturated
- [[closures]] ← INCLUDES — FFI/primitive closure
- [[application-evaluation]] ← DISPATCHES_ON — Accumulate and fire when saturated

<!-- connections:end -->

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

<!-- connections:start -->

## Connections

**Outgoing**
- EXTENDS → [[ffi]] — GRAM saturation pass for foreign/primop refs
- RELIES_ON → [[gram]] — Operates on enriched GRAM graph
- PRESERVES → [[lambda]] — Calling convention via closures
- SUPERSEDES → [[ffi-saturation-mir]] — GRAM pass replaces MIR lowering mechanism
- INCLUDED_IN → [[gram-evolution.thread]] — GRAM saturation pass

**Incoming**
- [[global-pending-queue]] ← INCLUDES
- [[dictionary-passing]] ← APPLIES_TO — Saturation must account for dictionaries
- [[bridge-unsaturated-external]] ← RELIES_ON — Depends on saturate pass marking `saturated: false`
- [[gram-pap-pass]] ← FOLLOWS — Runs after saturate marks unsaturated externals

<!-- connections:end -->

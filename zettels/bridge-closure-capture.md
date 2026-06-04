---
tags:
  - needs-design
  - incomplete
  - lowering
  - graph
  - mir
  - codegen
  - compiler
  - closure
  - ir
  - pattern
---

# Bridge closure capture

`\f -> \x -> f (f x)` — the inner closure's MIR emits a bare `FuncRef` for the returned lambda without bundling the captured `f` into a closure environment. The outer function returns a `FuncRef` to an inner function that references `f`, but the bridge doesn't thread the capture through.

The GRAM closure pass (`src/GRAM/passes/closure.ts`) identifies free variables, but the bridge's calling convention for curried returns doesn't translate capture sets into runtime closure structs. A curried function that returns a closure needs the bridge to emit `MkClosure(func, {f})` rather than `FuncRef(func)`.

The bridge now throws explicitly when nested closures reference outer captures (`src/GRAM/bridge/closures.ts`), surfacing the gap in test snapshots rather than silently emitting incorrect MIR.

<!-- connections:start -->

## Connections

**Outgoing**
- ADDRESSES → [[gram-to-mir-bridge]] — Curried return calling convention
- ADDRESSES → [[closures]] — Capture threading for nested closures

**Incoming**
- [[explorer-audit.thread]] ← INCLUDES — Thread member
- [[bridge-unsaturated-external]] ← MIRRORS — Sibling bridge closure gap
- [[pipeline-stabilization.thread]] ← INCLUDES — Backlog: curried closure capture

<!-- connections:end -->

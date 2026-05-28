---
tags:
  - planned
  - lowering
  - graph
  - mir
  - codegen
  - compiler
  - closure
  - ir
---

# Bridge closure capture

`\f -> \x -> f (f x)` — the inner closure's MIR emits a bare `FuncRef` for the returned lambda without bundling the captured `f` into a closure environment. The outer function returns a `FuncRef` to an inner function that references `f`, but the bridge doesn't thread the capture through.

**Architecture gap:** The GRAM closure pass (`src/GRAM/passes/closure.ts`) identifies free variables, but the bridge's calling convention for curried returns doesn't translate capture sets into runtime closure structs. A curried function that returns a closure needs the bridge to emit `MkClosure(func, {f})` rather than `FuncRef(func)`.

**Snippet:** `\f -> \x -> f (f x)` — MIR output shows inner function body referencing `f` but no closure allocation on the return site.

**Status:** Needs design — this is a calling convention decision in the bridge, not a simple dispatch fix.

---
tags:
- lowering
- backend
- codegen
- runtime
- speculative
- syntax
- recursion
- ffi
- mir
- performance
- rewriting
- continuation
- ir
- reference
---
# Native λ (HVM)

Executable backends in-tree: NbE (`src/elaboration/normalization/evaluation.v2.ts`), MIR + closure conversion (`src/lowering/`), and MIR → JS/C/Erlang (`src/Codegen/v2/`). An interaction-net / HVM-style runtime is out of scope for the current tree.

An interaction-net backend would be a **speculative** alternative to the closure-saturated MIR calling convention (`Call(indirect)` with `__fn` / `__env` records) and would need its own FFI arity story — today that is solved in lowering (`functions/app.ts`, `materialize.ts`), not by preserving open λ through to a host ABI.

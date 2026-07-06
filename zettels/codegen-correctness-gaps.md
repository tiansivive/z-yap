---
tags:
  - codegen
  - backend
  - mir
  - lowering
  - compiler
  - bug
  - backlog
  - incomplete
  - integration
  - error-handling
---
# Codegen correctness gaps

The v2 codegen backends have correctness gaps that MIR does not: the emitted target code is wrong even where the MIR is correct. Running the explorer snippet library end to end surfaces three:

- **Cross-block bindings in the match/block state machine.** A value assigned in one `case` block and read at the `join` block is emitted as a block-local binding, so it is out of scope at the join — a `ReferenceError` in JS, an undeclared variable in C, an unbound variable in Erlang. It affects any match lowered through the block state machine.
- **Positional field access.** Reading a tuple/positional field emits `obj.0` in JS, which is a syntax error; it needs bracket form `obj[0]`. C and Erlang key records by string and are unaffected.
- **Type information reaching runtime.** Un-erased type-level values flow to codegen: a free type variable is emitted as a bare identifier (`Num` → `ReferenceError`) and a type atom is emitted as a string. This is the runtime face of the [[type-erasure]] gap.

These are backend-emitter concerns, orthogonal to correct MIR. The related lossy case where dispatch stringification misrepresents floats and records is tracked separately ([[string-dispatch-float-record-bug]]).

<!-- connections:start -->

## Connections

**Outgoing**
- REVEALS → [[type-erasure]] — Type-leak-to-runtime is the erasure gap's runtime face
- REFERENCES → [[string-dispatch-float-record-bug]] — Sibling lossy-lowering case

**Incoming**
- [[variant-match-generalization.session]] ← PRODUCED — Codegen bugs confirmed in the re-scan
- [[pipeline-stabilization.thread]] ← INCLUDES — Backend correctness backlog
- [[global-pending-queue]] ← INCLUDES — Deferred backend fixes

<!-- connections:end -->

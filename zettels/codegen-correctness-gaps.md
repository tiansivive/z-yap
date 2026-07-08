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

Two v2 codegen-backend gaps produce wrong target code from correct MIR:

- **Positional field access.** Reading a tuple/positional field emits `obj.0` in JS, which is a syntax error; it needs bracket form `obj[0]`. C and Erlang key records by string and are unaffected.
- **Type information reaching runtime.** Un-erased type-level values flow to codegen: a free type variable is emitted as a bare identifier (`Num` → `ReferenceError`) and a type atom is emitted as a string. This is the runtime face of the [[type-erasure]] gap.

A third symptom once grouped here — a match's join block reading a case-block-local binding, out of scope at the join — was not a codegen gap: the MIR itself failed to thread the arm result through a block parameter ([[match-merge-block-params]]). Once the merge uses block parameters, codegen lowers them to a function-scoped mutable and the emitted merge is in scope.

The related lossy case where dispatch stringification misrepresents floats and records is tracked separately ([[string-dispatch-float-record-bug]]).

<!-- connections:start -->

## Connections

**Outgoing**
- REVEALS → [[type-erasure]] — Type-leak-to-runtime is the erasure gap's runtime face
- REFERENCES → [[string-dispatch-float-record-bug]] — Sibling lossy-lowering case

**Incoming**
- [[variant-match-generalization.session]] ← PRODUCED — Codegen bugs confirmed in the re-scan
- [[pipeline-stabilization.thread]] ← INCLUDES — Backend correctness backlog
- [[global-pending-queue]] ← INCLUDES — Deferred backend fixes
- [[match-merge-block-params]] ← FIXES — Match join-block scoping was a MIR merge-threading defect, not a codegen gap
- [[pipeline-bug-squashing.session]] ← INFORMS — Reclassified + resolved the match-join-scoping symptom

<!-- connections:end -->

---
tags:
  [
    continuation,
    lowering,
    gram,
    mir,
    bridge,
    compiler,
    codegen,
    performance,
    mechanism,
    ir,
    runtime,
    backend,
    pattern,
    effect,
    state-machine,
    implemented,
    representation,
    branch,
    heap,
    infrastructure,
  ]
---
# Multishot bridge serialization

Implementation site: `src/GRAM/bridge/continuations.ts`. The bridge serialises multishot resumption without CPS by reusing the closure-environment record and the `Terminator.Branch` MIR primitive — the same primitives that lower closures and pattern matches.

Mechanism: when a `Reset` node has one or more in-body `Resume` neighbours, `reset` allocates a single capture-environment record carrying every free variable used after the shift body returns, plus a continuation record `{ __env: env }` that carries that environment through the state machine. Each `Resume` node receives a sequential numeric index (assigned in the order the bridge encounters them). The shared `r(v, env, idx)` block reconstructs the captured bindings via `Instr.Read` on the env record and terminates with `Terminator.Branch(idx, cases)` dispatching to per-resume `s_i` blocks. Each `s_i` block carries `(restResult, envParam)` parameters and unpacks the env via `Read` to restore the post-resume scope.

Single-resume reset (no `Resume` neighbours) skips `Branch` entirely and terminates `r` with `Terminator.Jump(reset_exit, [result])`; the env record is still allocated to keep the block parameter shape uniform. Single-shot specialisation (skipping the heap allocation when usage analysis proves at most one resume) is deferred — see [[singleshot-static-specialization]].

Cost model in the current implementation: multishot **always** heap-allocates the environment record and the continuation record. There is no stack-resume fast path; there is no count-based specialisation. The trade-off is the same one taken by the legacy MIR lowering and is preserved here intentionally — the bridge produces a uniform shape, and specialisation is a downstream pass concern.

Site move: this serialisation strategy was originally implemented in `src/lowering/continuations/{shift,kcall}.ts` ([[multishot-serialization]] documents that site). The bridge re-implements the same shape directly on the GRAM graph, so the `Resume` index assignment now comes from the graph topology rather than from a worklist counter.

<!-- connections:start -->

## Connections

**Outgoing**
- IMPLEMENTS → [[gram-canonical-ir.adr]] — Canonical multishot serialisation site
- SUPERSEDES → [[multishot-serialization]] — Canonical site replaces legacy implementation
- DEPRECATES → [[multishot-serialization]] — Lifecycle event: legacy site marked deprecated
- MIRRORS → [[multishot-serialization]] — Same shape, new site
- REVISES → [[multishot-serialization]] — Refines the serialisation description to the bridge
- COMPOSES_WITH → [[shift-reset-bridge-lowering]] — Multishot serialisation runs inside the bridge state machine

**Incoming**
- [[multishot-mir-state-machine-example]] ← CLARIFIES — Worked pseudo-MIR for the bridge-resident serialization shape
- [[singleshot-static-specialization]] ← APPLIES_TO — Specialises the conservative multishot shape when usage allows
- [[delimited-continuations.thread]] ← INCLUDES — Current multishot serialisation site
- [[gram]] ← INCLUDES — Bridge-resident multishot serialisation

<!-- connections:end -->

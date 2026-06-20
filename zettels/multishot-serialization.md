---
tags:
  [
    continuation,
    lowering,
    mir,
    compiler,
    codegen,
    performance,
    deprecated,
    mechanism,
    ir,
    runtime,
    infrastructure,
    testing,
    backend,
    reference,
    pattern,
    effect,
    elaboration,
    normalization,
    project,
    problem,
    legacy,
  ]
---
# Multishot Serialization

**Superseded by [[multishot-bridge-serialization]] — the canonical implementation moved to `src/GRAM/bridge/continuations.ts` per D-006 ([[gram-canonical-ir.adr]]).** The serialization strategy (heap-captured env, indexed resumes, `Branch`) is preserved on the new site. Original content preserved below for reference.

Lowering represents multishot `k(v)` without CPS by **heap-captured environments**, indexed resumes, and **`Branch`** (`src/lowering/continuations/shift.ts`, `kcall.ts`).

Mechanism: `src/lowering/continuations/shift.ts` allocates env + `k_ref`, rewinds the worklist to the delimiter, sub-lowers the shift body with `ShiftBodyCtx`. Each resume (`src/lowering/continuations/kcall.ts`) assigns a numeric index (`Instr.Let` + literal), terminates the current block with `Jump` into the shared `r` block `(value, env, idx)`, opens the next `s_i` block, stashes prior results via `UpdateImmutable` / `Read` on the env record. After the body, if `nextKCallIdx > 0`, assembly closes `r` with `Terminator.Branch(idx_param, cases)` dispatching to each `s_i`.

Cost model in this iteration: multi-shot **always** heap-allocates; stack allocation / single-shot shortcuts remain deferred design options. See `shift.ts` assembly path and `src/lowering/__tests__/lower.test.ts` snapshots for concrete shapes.

<!-- connections:start -->

## Connections

**Outgoing**
- CONSTRAINS → [[shift-reset-mir-lowering]] — Replay challenge
- MOTIVATES → [[selective-cps]] — Alternative approach

**Incoming**
- [[selective-cps]] ← ADDRESSES — Evidence passing alternative
- [[delimited-continuations.thread]] ← INCLUDES
- [[multishot-bridge-serialization]] ← SUPERSEDES — Canonical site replaces legacy implementation
- [[multishot-bridge-serialization]] ← DEPRECATES — Lifecycle event: legacy site marked deprecated
- [[multishot-bridge-serialization]] ← MIRRORS — Same shape, new site
- [[multishot-bridge-serialization]] ← REVISES — Refines the serialisation description to the bridge
- [[multishot-mir-state-machine-example]] ← MIRRORS — Same legacy state-machine shape, preserved as explanatory reference

<!-- connections:end -->

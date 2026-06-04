---
tags:
  [
    continuation,
    lowering,
    mir,
    compiler,
    codegen,
    mechanism,
    deprecated,
    ir,
    backend,
    inference,
    elaboration,
    ast,
    effect,
    testing,
    reference,
    migration,
    runtime,
    pattern,
    infrastructure,
    performance,
    rewriting,
    legacy,
  ]
---
# Shift/Reset MIR Lowering

**Superseded by [[shift-reset-bridge-lowering]] — the canonical implementation site moved to `src/GRAM/bridge/continuations.ts` per D-006 ([[gram-canonical-ir.adr]]).** The shape decision from D-004 ([[direct-style-lowering.adr]]) is unchanged; only the site moved. Original content preserved below for reference.

Implementation package: `src/lowering/continuations/reset.ts`, `shift.ts`, `kcall.ts`; dispatch from `src/lowering/lower.ts` on `Patterns.Reset` / `Patterns.Shift`.

`Reset.lower` pushes a `Delimiter` frame (result watermark) and `Cont` that re-pushes the body result, installs `resetCtx.resetExit`, then queues `Lower(term)`.

`Shift.lower` requires `resetCtx`; captures worklist suffix after the delimiter, allocates env + `k_ref` (`Instr.Alloc`), binds continuation binder stamps (`LowerCtx.bound`), opens shared resume block `rLabel(v, env, idx)`, rewinds stacks, pushes bridge/assembler continuations plus replay of captured frames/results. Multishot completion emits `Terminator.Branch(idx_param, cases)` mapping indices to post-resume blocks (`shift.ts`).

`KCall.lower` handles each `App(k, arg)` inside the shift body: numeric index, `Jump` to `rLabel`, fresh `s_i` with env updates (`Instr.UpdateImmutable`) and `Read`s restoring prior `r_j` bindings (`kcall.ts`).

Shift/reset lowering uses **`Alloc`/`Read`/`Jump`/`Branch`** only—resume is `Read` + `Jump`, not a dedicated MIR resume opcode.

Tests / snapshots: `src/lowering/__tests__/lower.test.ts`; runnable MIR interpreter smoke: `src/lowering/__tests__/interpret.test.ts`.

<!-- connections:start -->

## Connections

**Outgoing**
- LOWERS_TO → [[mir-lowering]] — State machines
- IMPLEMENTS → [[shift-reset]] — Runtime story
- IMPLEMENTS → [[direct-style-lowering.adr]] — Realizes the decision
- TRANSLATES_TO → [[mir-lowering]] — State machine (heap-allocated frames)

**Incoming**
- [[multishot-serialization]] ← CONSTRAINS — Replay challenge
- [[selective-cps]] ← CONTRASTS_WITH — Closure vs state machine
- [[direct-style-lowering.adr]] ← DOCUMENTS — The chosen lowering strategy
- [[gram-dataflow-semantics]] ← CONTRASTS_WITH — Dependency edges vs jump sequences
- [[gram-shift-reset-pass]] ← CONTRASTS_WITH — Annotation vs state machine
- [[delimited-continuations.thread]] ← INCLUDES
- [[shift-reset-bridge-lowering]] ← SUPERSEDES — Canonical site replaces legacy implementation
- [[shift-reset-bridge-lowering]] ← DEPRECATES — Lifecycle event: legacy site marked deprecated
- [[shift-reset-bridge-lowering]] ← MIRRORS — Same shape, new site
- [[shift-reset-bridge-lowering]] ← REVISES — Refines the lowering description to the bridge

<!-- connections:end -->

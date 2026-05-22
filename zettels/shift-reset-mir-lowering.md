---
tags:
  [
    continuation,
    lowering,
    mir,
    compiler,
    codegen,
    mechanism,
    implemented,
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
  ]
---
# Shift/Reset MIR Lowering

Implementation package: `src/lowering/continuations/reset.ts`, `shift.ts`, `kcall.ts`; dispatch from `src/lowering/lower.ts` on `Patterns.Reset` / `Patterns.Shift`.

`Reset.lower` pushes a `Delimiter` frame (result watermark) and `Cont` that re-pushes the body result, installs `resetCtx.resetExit`, then queues `Lower(term)`.

`Shift.lower` requires `resetCtx`; captures worklist suffix after the delimiter, allocates env + `k_ref` (`Instr.Alloc`), binds continuation binder stamps (`LowerCtx.bound`), opens shared resume block `rLabel(v, env, idx)`, rewinds stacks, pushes bridge/assembler continuations plus replay of captured frames/results. Multishot completion emits `Terminator.Branch(idx_param, cases)` mapping indices to post-resume blocks (`shift.ts`).

`KCall.lower` handles each `App(k, arg)` inside the shift body: numeric index, `Jump` to `rLabel`, fresh `s_i` with env updates (`Instr.UpdateImmutable`) and `Read`s restoring prior `r_j` bindings (`kcall.ts`).

Shift/reset lowering uses **`Alloc`/`Read`/`Jump`/`Branch`** only—resume is `Read` + `Jump`, not a dedicated MIR resume opcode.

Tests / snapshots: `src/lowering/__tests__/lower.test.ts`; runnable MIR interpreter smoke: `src/lowering/__tests__/interpret.test.ts`.

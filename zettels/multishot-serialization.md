---
tags:
  [
    continuation,
    lowering,
    mir,
    compiler,
    codegen,
    performance,
    deferred,
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
  ]
---
# Multishot Serialization

Lowering represents multishot `k(v)` without CPS by **heap-captured environments**, indexed resumes, and **`Branch`** (`docs/MIR-LOWERING.md` §7).

Mechanism: `src/lowering/continuations/shift.ts` allocates env + `k_ref`, rewinds the worklist to the delimiter, sub-lowers the shift body with `ShiftBodyCtx`. Each resume (`src/lowering/continuations/kcall.ts`) assigns a numeric index (`Instr.Let` + literal), terminates the current block with `Jump` into the shared `r` block `(value, env, idx)`, opens the next `s_i` block, stashes prior results via `UpdateImmutable` / `Read` on the env record. After the body, if `nextKCallIdx > 0`, assembly closes `r` with `Terminator.Branch(idx_param, cases)` dispatching to each `s_i`.

Cost model called out in docs: multi-shot **always** heap-allocates in this iteration; stack allocation / single-shot shortcuts are explicitly deferred (`docs/MIR-LOWERING.md` §8, limitation bullets).

Concrete illustration: `src/lowering/continuations/multishot.mir.md`.

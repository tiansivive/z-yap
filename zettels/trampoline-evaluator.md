---
tags:
  [
    normalization,
    elaboration,
    mechanism,
    implemented,
    performance,
    runtime,
    recursion,
    continuation,
    lowering,
    ir,
    inference,
    ffi,
    rewriting,
  ]
---
# Trampoline evaluator

`evaluate`/`evaluateTerm` (`src/elaboration/normalization/evaluation.v2.ts`) avoid deep JS recursion by driving two module-global heaps: `globalWorkStack` (`Eval` | `Cont` | `Delimiter`) and `globalResultStack`. Each `evaluate` call records initial lengths and only drains frames it pushed so nested `evaluate` calls can share stacks.

`reduceAndPushStack` performs spine contraction without allocating new stacks (comments call out stack-based reduce vs recursive `evaluate`). `Delimiter` frames are popped as no-ops once reached.

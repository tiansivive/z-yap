---
tags:
- mechanism
- nbe
- normalization
- elaboration
- evaluation
- implemented
- performance
- recursion
- continuation
---
# Trampoline evaluator

Yap's NbE evaluator avoids deep JavaScript recursion by using two module-global heaps: a work stack (`globalWorkStack`) carrying `Eval`, `Cont`, and `Delimiter` frames, and a result stack (`globalResultStack`) carrying NF.Values. Each call to `evaluate` records initial stack lengths and only drains frames it pushed, so nested evaluate calls can share the same stacks without interference.

The motivation is engineering: deeply nested or recursive elaboration terms would overflow the JS call stack with a naive recursive evaluator. The trampoline converts the recursive structure into an iterative loop driven by explicit frames, trading stack depth for heap allocation.

`reduceAndPushStack` (the application dispatch) performs spine contraction without allocating new stacks — it pushes new frames onto the existing work stack. `Delimiter` frames (placed by Reset for delimited continuations) are popped as no-ops once reached, serving as markers rather than computation carriers.

The architecture preserves CBV semantics exactly — the frame scheduling encodes the same evaluation order that a recursive evaluator would follow, just without the call stack depth. The evaluation-step-limit acts as a safety net on top of this architecture, preventing non-termination from consuming unbounded heap.

<!-- connections:start -->

## Connections

**Outgoing**
- IMPLEMENTS → [[nbe]] — Stack-safe evaluation
- ADDRESSES → [[nbe]] — Stack overflow prevention
- WRAPS → [[nbe]] — Heap-allocated frames
- PRESERVES → [[cbv-evaluation]] — Same results
- IMPLEMENTS → [[cbv-evaluation]] — Without stack overflow
- IMPLEMENTS → [[typing-rules]] — Operational semantics via NbE
- RELIES_ON → [[evaluation-step-limit]] — Step limit complements trampoline
- ENABLES → [[shift-reset]] — Delimiter frames on work stack
- ENABLES → [[continuation-closure]] — Frame capture from work stack

**Incoming**
- [[evaluation-step-limit]] ← CONSTRAINS — Prevents non-termination
- [[types-as-terms]] ← ENABLES — Evaluate types like values
- [[whnf-vs-full-normalization]] ← CONSTRAINS — Evaluation depth
- [[nbe]] ← DELEGATES_TO — Stack-safe execution
- [[nbe]] ← INCLUDES — Stack-safe architecture
- [[cbv-evaluation]] ← RELIES_ON — Frame scheduling encodes CBV order
- [[compiled-nbe]] ← APPLIES_TO — The dispatch machinery the compiled form would replace

<!-- connections:end -->

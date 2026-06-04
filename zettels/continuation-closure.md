---
tags:
- concept
- normalization
- closure
- continuation
- implemented
- evaluation
- effect
---
# Continuation closure

A closure that captures delimited evaluation state: `{ type: "Continuation"; ctx; term; frames: NF.StackFrame[]; results: NF.Value[] }`. Built when evaluating `EB.Shift` — the evaluator captures the suffix of the work stack up to the nearest `Delimiter` (placed by `Reset`), along with the accumulated result values.

Applying a continuation closure restores the captured state: the stored results are pushed back onto the result stack, the argument value is pushed on top, and the captured frames are replayed on the work stack. This implements the resumption semantics of `shift`/`reset` — invoking the continuation resumes the computation from where it was captured, with the supplied value as the "answer."

Multishot continuations are possible because applying a continuation closure does not consume it — the same closure can be applied multiple times with different arguments, each time restoring the same captured state. This is the evaluation-level mechanism that supports Yap's multishot continuation typing and Cartesian replay during elaboration.

The typing of continuation closures (answer type polymorphism, multishot evidence accumulation) is handled at the elaboration level in shift/reset inference, not in the closure representation itself.

<!-- connections:start -->

## Connections

**Outgoing**
- IMPLEMENTS → [[shift-reset]] — Captured delimited continuation
- RELIES_ON → [[nf-value]] — Captured frames and results
- ENABLES → [[nondeterminism-multishot]] — Multishot via reapplication
- RELIES_ON → [[cbv-evaluation]] — Captures work stack frames

**Incoming**
- [[closures]] ← INCLUDES — Delimited continuation closure
- [[application-evaluation]] ← DISPATCHES_ON — Restore frames and replay
- [[trampoline-evaluator]] ← ENABLES — Frame capture from work stack

<!-- connections:end -->

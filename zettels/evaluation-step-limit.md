---
tags:
- mechanism
- nbe
- normalization
- elaboration
- performance
- evaluation
- implemented
- recursion
- error-handling
---
# Evaluation step limit

An engineering safety net against non-termination in NbE. The evaluator's driver loop increments a counter on each iteration; exceeding the limit (default 10 million steps) throws an error with the offending term displayed.

Two separate limits operate:
- **Main evaluator**: counts iterations of the work stack drain loop. Catches infinite evaluation from recursive types, divergent type-level computation, or unbounded unfolding.
- **Continuation replay**: when applying a captured continuation closure, a separate inner loop with its own counter and fixed 10M limit prevents runaway resumption chains.

This is not a semantic design — it's pragmatic non-termination prevention. The limit is high enough to never trigger on well-formed programs (10M steps covers deeply nested elaboration) but catches genuine divergence. The error message includes the term being evaluated, aiding diagnosis.

The step limit complements the trampoline architecture: the trampoline prevents stack overflow (bounded depth), the step limit prevents heap exhaustion (bounded steps).

<!-- connections:start -->

## Connections

**Outgoing**
- CONSTRAINS → [[trampoline-evaluator]] — Prevents non-termination
- DETECTS → [[nbe]] — Infinite loops
- ADDRESSES → [[nbe]] — Non-termination prevention

**Incoming**
- [[nbe]] ← INCLUDES — Non-termination guard
- [[whnf-vs-full-normalization]] ← RELIES_ON — Safety net for one-evaluator design
- [[trampoline-evaluator]] ← RELIES_ON — Step limit complements trampoline

<!-- connections:end -->

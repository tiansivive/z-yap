---
tags:
  - nbe
  - evaluation
  - normalization
  - monad
  - generator
  - elaboration
  - tech-debt
  - planned
---

# Evaluation monad rework

The NbE evaluator (`evaluation.v2.ts`) is an imperative work-stack machine: frames pushed and popped in place, a while-driven dispatch loop, and shift/reset capture implemented by slicing the live stack. It predates the generator-monad style that now runs elaboration ([[elaboration-monad]]), lowering, and the solver, and is the last imperative core on the live path.

The rework: an Evaluation generator monad ([[generator-monad]]) that owns the work stack as monadic state, the way the lowering monad owns its block/function collectors — stack operations become monadic primitives, continuation capture becomes a state slice, and the evaluator body becomes yield-driven dispatch.

Deferred deliberately: the evaluator is stable and the hottest loop in the compiler, and nothing is blocked on the rework. Because the file is scheduled for a redo, its lint debt is intentionally not paid down — a header `eslint-disable` carries the rationale in-tree. The header is self-retiring: `reportUnusedDisableDirectives` flags it as unused once the rework lands clean.

<!-- connections:start -->

## Connections

**Outgoing**
- MODIFIES → [[cbv-evaluation]] — Rework target is the imperative work-stack evaluator
- USES → [[generator-monad]] — Evaluation monad instantiates the generator-monad pattern
- MIRRORS → [[solver-v2-monadic-port.implementation]] — Precedent: imperative core ported to the generator monad

**Incoming**
- [[shift-reset]] ← CONSTRAINS — Capture slices the work stack; the monad must expose it as state
- [[nbe]] ← INCLUDES — Planned evaluator rework
- [[global-pending-queue]] ← INCLUDES — Deferred evaluator monad rework
- [[lint-governance]] ← MOTIVATES — Evaluator carve-out is temporary; the rework retires it
- [[lint-governance.session]] ← PRODUCED — Rework surfaced by the carve-out discussion

<!-- connections:end -->

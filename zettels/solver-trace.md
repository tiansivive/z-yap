---
tags:
  - verification
  - sat
  - solver
  - mechanism
  - implemented
  - ivl
  - tooling
  - display
  - tracing
  - code
  - infrastructure
  - implementation
  - observability
  - generator
refs:
  src:
    - src/verification/solver/trace.ts
    - src/verification/solver/theories/theory.ts
    - src/verification/solver/solver.ts
  tests:
    - src/verification/solver/__tests__/trace.test.ts
---
# Solver trace

Generator-based observability system for the CDCL(T) solver. The solver's control flow is factored into generator functions (`function*`) that `yield` fine-grained `Step` events at every state transition, producing a complete execution trace without altering solving semantics.

**Step types** (`trace.ts`): `propagate` (BCP forces a literal), `decide` (heuristic pick), `conflict` (clause falsified), `analyze` (1UIP conflict analysis result), `backjump` (non-chronological backtrack), `theory-assert` (theory receives a literal), `theory-check` (theory consistency check), `quantifier-round` (instantiation pass), `sat`/`unsat` (terminal).

**Theory sub-events** (`theory.ts`): Each `theory-assert` and `theory-check` step carries a `detail` array of `TheoryStep` events — a union of `EUFTrace.Step` (merge, merge-skip, congruence, conflict, scan) and `ArithTrace.Step` (bound, bound-conflict, violation, pivot, infeasible, feasible). These expose the internal state transitions of each theory module per solver step.

**TracedSolverInstance**: Parallel API (`Solver.createTraced()`) that returns the generator plus atom table, proxy table, clause list, and EUF arena — everything needed for external consumption of the trace.

**Replay renderer** (`Trace.replay`): ~600 lines of `prettier-printer`-based presentation logic. Renders the trace as a human-readable small-step log: formula display, Tseitin proxy resolution back to original IVL subformulas, enode ID resolution to term names, equivalence class display after EUF merges, bound interval display after arithmetic updates, clause satisfaction tracking. Two modes: `symbolic` (proxy names) and `expanded` (inlined formulas).

**Collection**: `Trace.collect(generator)` drains the generator into a `{ steps, result }` pair. `Trace.replay({ formula, steps, atoms, proxies, clauses, arena })` renders the collected steps.

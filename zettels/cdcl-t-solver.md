---
tags:
  [verification, sat, mechanism, implemented, backend, reference, project, milestone, ffi, arithmetic, quantifiers, strings, row-types, inference, tooling, observability, generator]
---
# CDCL(T) solver

**Implemented:** DPLL(T) / CDCL(T) with theory plugins (EUF, linear arithmetic, quantifiers), a shared term arena, `push`/`pop`, and a `Solver` API (`assert`, `check`, optional `origin` on assert). Strings and rows remain future theories ([[string-theory]], [[row-theory]]). Full `explain` / obligation-linked UNSAT cores are milestone work ([[milestone-5-explanations]]).

Milestones 1 and 2 delivered. The in-tree CDCL(T) solver lives in `src/verification/solver/`: SAT core with two-watched-literal BCP, 1UIP conflict analysis, and non-chronological backjumping (`cdcl/core.ts`, `cdcl/watched.ts`); theory plugin interface (`theories/theory.ts`); EUF via hash-consed term arena and congruence closure (`theories/euf/`); linear arithmetic via fixed-tableau simplex with branch-and-bound (`theories/arithmetic/`); trigger-based quantifier instantiation with E-matching (`quantifiers/`). Top-level entry point: `solve(formula)` in `solver.ts`. `z3.adapter.ts` remains for cross-check during transition. See [[m1-implementation]] and [[m2-implementation]] for details.

**Observability:** A generator-based trace system (`trace.ts`) exposes every state transition as a `Step` event. Theory modules additionally yield `TheoryStep` sub-events (EUF merges, arithmetic bound updates). A `TracedSolverInstance` API (`Solver.createTraced()`) returns the generator alongside atom/proxy/clause/arena tables for external consumption. `Trace.replay` renders collected steps as a human-readable log via `prettier-printer`. See [[solver-trace]].

See also [`smt-solver-glossary.md`](smt-solver-glossary.md) for shorthand (BCP, 1UIP, etc.).

---
tags:
  - verification
  - solver
  - sat
  - cdcl
  - smt-theory
  - propagation
  - performance
  - deferred
  - planned
  - tech-debt
  - ivl
---
# Theory conclusions propagation

The v2 theory API carries a `propagations` result shape and EUF state names `conclusions`, but the current solver only consumes theory conflicts. EUF and arithmetic return empty propagation lists, and CDCL proceeds from Boolean BCP plus theory consistency checks.

Theory conclusions are CDCL(T) facts derived from active theory literals. For example, from `x = y`, EUF can conclude `f(x) = f(y)` when that Boolean atom is present; from `x >= 3` and `y >= 3`, arithmetic can conclude `x + y > 5` when the atom exists. Feeding those conclusions into CDCL avoids unnecessary Boolean decisions and provides stronger reasons for learned clauses.

This is a solver strength and performance feature over the fixed Boolean abstraction, not an immediate soundness blocker. It matters most for larger QF-EUFLIA-style refinement VCs with disjunctions, path joins, or encoded conditionals, where theory-implied facts can prune branch exploration before conflicts are discovered.

## Work shape

The theory layer needs to produce non-empty `Propagation` values with literal conclusions and justification literals. CDCL then needs to insert those conclusions into the trail with theory reasons, detect conflicts if the opposite literal is already assigned, and use the theory justification in conflict analysis.

<!-- connections:start -->

## Connections

**Incoming**
- [[solver-v2-monadic-port.session]] ← PRODUCED — Deferred theory propagation work discovered during v2 closeout
- [[solver-v2-effect-runtime.adr]] ← CONSTRAINS — Future propagation must flow through the runtime/theory result shape
- [[solver-v2-monadic-port.implementation]] ← DEFERRED_TO — Theory conclusions are named but not produced/consumed
- [[verification-backend.thread]] ← INCLUDES — Thread item 26

<!-- connections:end -->

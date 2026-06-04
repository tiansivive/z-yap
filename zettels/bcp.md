---
tags:
  - verification
  - sat
  - mechanism
  - implemented
  - milestone
  - solver
  - runtime
  - concept
---
# Boolean Constraint Propagation

Iterative **unit propagation** on CNF literals: whenever a clause has all literals falsified except one unknown, **that surviving literal becomes true**. Repeat until reaching a conflict (two opposed units) or a fixpoint ([watched literals](watched-literals.md) amortize traversals vs naïvely rescanning every clause after each assignment).

This is CDCL inner-loop work ([CDCL solver](cdcl-t-solver.md)) before any theory propagation; SAT core integration sketched under `docs/SMT-SOLVER.md` once Boolean search sits alongside theory plugins ([Milestone 2](milestone-2-euf-quant-lia.md)).

<!-- connections:start -->

## Connections

**Incoming**
- [[m2-implementation]] ← IMPLEMENTS — Unit propagation in core.ts
- [[solver-trace]] ← EXPOSES — Propagation steps rendered in trace output

<!-- connections:end -->

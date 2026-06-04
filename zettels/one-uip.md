---
tags:
  - verification
  - sat
  - mechanism
  - implemented
  - milestone
  - solver
  - principle
  - concept
---
# First Unique Implication Point (1UIP)

Conflict analysis slice in CDCL ([CDCL solver](cdcl-t-solver.md)): from the falsified clause, repeatedly resolve against **reason clauses** for literals falsified at the **current decision level**, keeping only literals at that level and below, until **exactly one** pivot literal remains assigned at that level—that cut is the first UIP. The **negation** of its trail literal becomes the learned clause's **asserting literal** once predecessors above that level are dropped.

Compared to plain chronological backtracking, enforcing the 1UIP cut yields shorter learned clauses that enable deeper **non-chronological backjumps**.

Ref: GRASP (Marques-Silva & Sakallah); modern CDCL writeups cite MiniSat internals and `docs/SMT-SOLVER.md` bibliography.

<!-- connections:start -->

## Connections

**Incoming**
- [[m2-implementation]] ← IMPLEMENTS — 1UIP conflict analysis in core.ts
- [[solver-trace]] ← EXPOSES — Conflict analysis + backjump steps rendered

<!-- connections:end -->

---
tags:
- verification
- milestone
- planned
- reference
- sat
- arithmetic
- quantifiers
- backend
- compiler
- infrastructure
- project
- mechanism
- inference
- tracing
---
# Milestone 2: EUF + guarded quantifiers + linear arithmetic

Roadmap slice from `docs/SMT-SOLVER.md` §Algorithms by milestone → Milestone 2.

Deliverables named there: shared term arena, congruence closure, trigger engine, simplex + branch-and-bound, boolean/CDCL core—minimum solver stack for most liquid-style obligations.

Depends on Milestone 1 VC IR feeding literals/clauses (same doc §Recommendation ordering: VC IR boundary then EUF/CDCL scaffolding then linear arithmetic).

Not in this milestone per that section: obligation-linked UNSAT cores and counterexample UX (Milestone 5).

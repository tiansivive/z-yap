---
tags:
- verification
- milestone
- implemented
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

**Goal:** minimum CDCL(T) stack for liquid-style obligations once IVL literals exist.

**Deliverables:** EUF congruence closure (`theories/euf/`), quantifier triggers and ematching (`quantifiers/`), linear real arithmetic (`theories/arithmetic/`), boolean CDCL core (`cdcl/`), orchestrated from `src/verification/solver/solver.ts`.

Depends on Milestone 1 IVL feeding literals/clauses (normalize → Skolem → CNF → CDCL(T)).

Out of scope here: obligation-linked UNSAT cores and counterexample UX (Milestone 5).

<!-- connections:start -->

## Connections

**Outgoing**
- PRODUCES → [[cdcl-t-solver]] — Core solver
- PRODUCES → [[euf-theory]] — EUF module
- PRODUCES → [[arithmetic-theory]] — Arithmetic module
- FOLLOWS → [[milestone-1-ir-boundary]] — After IR

**Incoming**
- [[milestone-3-strings]] ← FOLLOWS — After core
- [[verification-backend.thread]] ← INCLUDES
- [[m2-implementation]] ← IMPLEMENTS — Realizes the milestone
- [[m2-implementation]] ← ADDRESSES — Closes the open work item

<!-- connections:end -->

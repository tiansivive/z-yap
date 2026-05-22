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

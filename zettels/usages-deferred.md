---
tags:
- modality
- multiplicity
- elaboration
- verification
- deferred
- solver
- inference
- decision
- constraint
- compiler
- incomplete
- migration
- reference
- code
---
# Usages deferred relative to solver constraints

Quantitative usage vectors (`Q.Usages`) still flow through inference results (`EB.AST` in `src/elaboration/elaborate.ts`), but usage constraints are not part of active solving: `Constraint` omits `usage` (`src/elaboration/solver/solver.ts`), and `V2.tell("constraint", { type: "usage", … })` remains commented in lambda, block, statement, and check paths.

Verification focuses on liquid predicates and explicitly leaves multiplicity checking unimplemented (`src/verification/ARCHITECTURE.md`); `VerificationArtefacts` carries only Z3 VC + optional synthesized type (`src/verification/V2/types.ts`), not usage accumulation.

Downstream implication: multiplicity annotations influence parsed/elaborated modal structure but are not globally validated against term usage today.

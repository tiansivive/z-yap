---
tags:
- modality
- multiplicity
- verification
- elaboration
- planned
- constraint
- solver
- sat
- type-system
- mechanism
- compiler
- inference
- cli
- migration
---
# Modality enforcement

**Current code:** multiplicity is not enforced by the solver-backed elaboration constraint system—`Constraint` in `src/elaboration/solver/solver.ts` only supports `assign` and `resolve`; `usage` constraints are commented out. Call sites that would emit usage constraints (`yield* V2.tell("constraint", { type: "usage", … })`) are commented in `src/elaboration/check.ts`, `src/elaboration/inference/lambda.ts`, `src/elaboration/inference/statements.ts`, `src/elaboration/inference/block.ts`.

**Verification:** liquid refinements under `NF.Modal` are checked via Z3 (`src/verification/V2/`); `src/verification/ARCHITECTURE.md` states multiplicity checking is not implemented in that pass.

**Lookup / usages vectors:** bound-variable lookup returns zero usage vectors and leaves open how sigma multiplicities integrate (`QUESTION` in `src/elaboration/shared/context.ts`). Row sigma defaults include `multiplicity: Q.Many` in places like `extendSigmaEnv` (`src/elaboration/shared/context.ts`).

“Enforcement” here means future wiring: emit and solve usage constraints (or an equivalent analysis), align variable lookup usage with binder annotations, and extend verification beyond liquid predicates—none of which is complete in-tree.

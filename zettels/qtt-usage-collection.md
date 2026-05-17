---
tags:
- modality
- multiplicity
- elaboration
- inference
- monad
- mechanism
- deferred
- testing
- solver
- ast
- code
- project
- migration
---
# QTT-style usage collection

`Q.Usages` is `Multiplicity[]` from `src/shared/modalities/multiplicity.ts` (`noUsage`, `add`, `multiply`).

Inference returns `[EB.Term, NF.Value, Q.Usages]` as `EB.AST` (`src/elaboration/elaborate.ts`). Many inference rules thread usages through `Q.add` (e.g. rows in `src/elaboration/check.ts`, lists in `src/elaboration/inference/lists.ts`).

Binding sites that should relate usages to binder multiplicities keep `tell("constraint", { type: "usage", … })` commented (`src/elaboration/inference/lambda.ts`, `src/elaboration/check.ts`, `src/elaboration/inference/statements.ts`, `src/elaboration/inference/block.ts`). The solver omits usage constraints (`src/elaboration/solver/solver.ts`).

Variable lookup returns all-zero usages for bound variables and notes open questions for sigma multiplicity (`src/elaboration/shared/context.ts`).

Legacy tests in `src/elaboration/elaboration.test.ts` expect `{ type: "usage", … }` constraints but the suite is `describe.skip`.

Net: vectors are computed in places but not solved or validated against binder annotations—partial bookkeeping, not working QTT.

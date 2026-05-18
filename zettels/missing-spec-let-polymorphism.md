---
tags:
- type-system
- elaboration
- inference
- normalization
- infrastructure
- problem
- incomplete
- needs-design
- migration
- compiler
- polymorphism
- dependent
- monad
- solver
- testing
- reference
- drift
status: incomplete
---
# Missing spec: let-polymorphism

Behavior lives in TypeScript only: `src/elaboration/normalization/generalization.ts` (`generalize`, `instantiate`), `src/elaboration/inference/statements.ts` `letdec` (calls `EB.solve`, `NF.generalize`, `EB.Icit.wrapLambda`), `src/elaboration/solver/solver.ts` (interaction of `assign` vs `resolve`), and `src/elaboration/__tests__/let-polymorphism.test.ts`.

Undocumented details worth a written spec: meta `lvl` vs `ctx.env.length` split, collecting metas from term + type for implicits, skolem filtering, interaction with nondeterminism `replay` in `letdec`, order of zonker composition (`Sub.compose`).

No single `docs/` chapter was found that states these rules — treat repository tests + the above modules as the current contract.

Hub: [[generalization.md]], [[meta-variables.md]].

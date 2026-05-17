---
tags:
- verification
- milestone
- planned
- reference
- ir
- normalization
- sat
- dependent
- backend
- project
- inference
- tooling
- principle
---
# Milestone 1: IR boundary

Roadmap slice from `docs/SMT-SOLVER.md` §Algorithms by milestone → Milestone 1.

Deliverables named there: `VC` IR (`VC.Sort`, `VC.Term`, `VC.Formula`), translation from `NF.Value` into VC terms/formulas, optional debug printer—no solver yet.

Structural edits listed in the same doc: `VerificationArtefacts.vc` becomes `VC.Formula`; `Obligation.expr` becomes `VC.Formula`; `TranslationTools` emits VC instead of Z3 (`mkSort`, `translateTerm`, `translateFormula`, `quantify`).

Today (`src/verification/V2/types.ts`) `vc` is still `z3-solver` `Expr`; `src/verification/V2/logic/translate.ts` builds Z3 sorts/expressions directly.

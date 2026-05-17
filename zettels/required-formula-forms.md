---
tags:
  [verification, concept, incomplete, inference, elaboration, dependent, row-types, modality, ast, backend, strings, arithmetic, quantifiers, project, reference]
---
# Required formula forms

`docs/SMT-SOLVER.md` copies its bullet list from `src/verification/V2/check.ts`, `synth.ts`, `subtype.ts`, and `logic/translate.ts`: booleans (`$and`, `$or`, `$not`), implications via `Z3.Implies` in quantified rules, equality/disequality, guarded `Forall`, existentials introduced through synthesis/block paths, uninterpreted constants and array-based `App`, numeric externals, string literals as uninterpreted `Const`, row/schema/variant containment via `subtype.contains` on `NF.Row` (`subtype.ts`), nested structural rules.

**Translation gaps called out in-repo / design doc:** `translate.ts` throws on `NF.Patterns.Row` row literals (“not supported yet”). `docs/SMT-SOLVER.md` notes strings use an uninterpreted sort and `$concat` is not translated into a string theory. `VerificationArtefacts.vc` remains `z3-solver` `Expr` (`src/verification/V2/types.ts`), not the proposed `VC.Formula` IR.

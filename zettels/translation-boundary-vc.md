---
tags:
- verification
- elaboration
- normalization
- planned
- reference
- ir
- inference
- backend
- sat
- quantifiers
- dependent
- modality
- migration
- testing
- project
- principle
- codegen
- ffi
---
# Translation boundary (VC IR)

Target shape from `docs/SMT-SOLVER.md` §Translation boundary:

`TranslationTools`: `mkSort`, `translateTerm`, `translateFormula`, `quantify`—all producing `VC.Sort` / `VC.Term` / `VC.Formula` instead of Z3 AST.

Minimum structural goal stated there: decouple VC generation from Z3 while keeping `createCheck` / `createSynth` / `createSubtype` wiring.

Current implementation still matches Z3: `createTranslationTools` in `src/verification/V2/logic/translate.ts` returns `{ mkSort, translate: Expr builder, quantify }` using `z3-solver`; stub fragment in doc §Suggested API changes shows throws until ported.

`quantify()` remains the guarded-universal site (`Z3.ForAll` + `Implies` for liquid/modal annotations today).

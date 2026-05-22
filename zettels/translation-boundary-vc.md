---
tags:
- verification
- elaboration
- normalization
- incomplete
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

**Translation boundary target:** `TranslationTools` with `mkSort`, `translateTerm`, `translateFormula`, `quantify` — producing backend-neutral sorts/terms/formulas (IVL today) while keeping `createCheck` / `createSynth` / `createSubtype` wiring.

**ivl worktree (ivl-sat-solver branch):** `createTranslationTools` in `src/verification/V2/logic/translate.ts` now produces IVL types (`IVL.Sort`, `IVL.Term`, `IVL.Formula`) via the `Build` module. No Z3 import. `quantify()` builds `Build.forall` + `Build.implies` for liquid/modal annotations.

**main worktree:** still Z3-coupled — `createTranslationTools` returns `{ mkSort, translate: Expr builder, quantify }` using `z3-solver`; `quantify()` uses `Z3.ForAll` + `Implies`.

**Further work:** `z3.adapter.ts` translates IVL formulas back to Z3 for cross-checking, off the default verification path. A pluggable `VerificationBackend` interface would formalize swapping IVL vs Z3 vs in-house `solve` without touching check/synth/subtype wiring.

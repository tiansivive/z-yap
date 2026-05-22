---
tags:
- verification
- milestone
- implemented
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

**Goal:** solver-neutral VC IR before CDCL(T) theories.

**Deliverables:** IVL sorts/terms/formulas (`src/verification/solver/ivl/types.ts`), builders and printer (`build.ts`, `print.ts`), translation from `NF.Value` into IVL, normalization/Skolem/CNF passes feeding the solver stack.

**Structural target:** `VerificationArtefacts.vc` as `IVL.Formula`; obligations and `TranslationTools` emit IVL instead of Z3 (`mkSort`, `translateTerm`, `translateFormula`, `quantify`).

**Branch state:** implemented on the ivl worktree (`VerificationArtefacts.vc` is `IVL.Formula`). **main** still types `vc` as `z3-solver` `Expr` in `src/verification/V2/types.ts` with direct Z3 construction in `translate.ts`.

---
tags:
  [verification, sat, mechanism, planned, backend, ir, reference, project, milestone, lowering, inference, arithmetic, codegen, principle, problem, ffi]
---
# Boolean lowering (CNF)

**Status:** Design only. `docs/SMT-SOLVER.md` “Pass 3. Boolean lowering” calls for a Tseitin-style transform: theory atoms stay opaque, boolean connectives become clauses with origin metadata for unsat cores. The suggested file `src/verification/solver/cnf.ts` does not exist.

**Current stack:** VCs are Z3 `Bool` `Expr` values from `createTranslationTools` (`src/verification/V2/logic/translate.ts`); `VerificationServiceV2` (`src/verification/V2/service.ts`) never runs a Yap-owned CNF pass. Clause learning and boolean search are internal to Z3.

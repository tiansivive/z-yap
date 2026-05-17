---
tags:
  [verification, sat, mechanism, planned, backend, reference, project, milestone, ffi, arithmetic, quantifiers, strings, row-types, inference, tooling]
---
# CDCL(T) solver

**Planned:** `docs/SMT-SOLVER.md` targets DPLL(T) / CDCL(T) with theory plugins (EUF, arithmetic, strings, rows, quantifiers), a shared term arena, `push`/`pop`, and a `Solver` API (`assert`, `check`, `explain`). The document’s `createSolver` is an explicit stub.

**Reality:** There is no `src/verification/solver/` package. Verification is wired through `VerificationServiceV2(Z3, …)` in `src/verification/V2/service.ts`, which builds `createTranslationTools` from `z3-solver` and returns `check` / `synth` / `subtype` plus `getObligations`. SAT, CDCL, and theory combination are delegated to Z3.

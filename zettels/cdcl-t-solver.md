---
tags:
  [verification, sat, mechanism, planned, backend, reference, project, milestone, ffi, arithmetic, quantifiers, strings, row-types, inference, tooling]
---
# CDCL(T) solver

**Planned:** `docs/SMT-SOLVER.md` targets DPLL(T) / CDCL(T) with theory plugins (EUF, arithmetic, strings, rows, quantifiers), a shared term arena, `push`/`pop`, and a `Solver` API (`assert`, `check`, `explain`). The document’s `createSolver` is an explicit stub.

**Reality:** Milestone 1 delivered `src/verification/solver/` with the IVL-facing types (`IVL.Term`, `IVL.Formula` in `ivl.ts`), builder/printing helpers (`ivl.build.ts`, `ivl.print.ts`), and a bridging adapter (`z3.adapter.ts`). Boolean search and CDCL machinery are **still** outsourced to Z3—there is **no** in-tree SAT core, watched literals, conflict analysis stack, nor theory-plugins loop yet (`docs/SMT-SOLVER.md` Milestone 2). Obligations continue to originate from `VerificationServiceV2` in `src/verification/V2/service.ts` atop `createTranslationTools` until the CDCL/T layer consumes IVL literals directly.

See also [`smt-solver-glossary.md`](smt-solver-glossary.md) for shorthand (BCP, 1UIP, etc.).

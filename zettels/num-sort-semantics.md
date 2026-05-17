---
tags:
  [verification, arithmetic, decision, deferred, backend, reference, type-system, elaboration, ast, ffi, inference, sat, normalization, project, performance]
---
# Num sort semantics

**Current translation:** `src/verification/V2/logic/translate.ts` sets `Sorts.Num` to `Z3.Real.sort()` and numeric literals use `Z3.Real.val`. `Sorts.Int` exists in the same object for other uses; the ARCHITECTURE table in `src/verification/ARCHITECTURE.md` documents `Num → Real`.

**Design (open):** `docs/SMT-SOLVER.md` “Num semantics in verification” keeps the Yap-level mapping undecided; it recommends building the future solver dual-sorted (`Int`, `Real`) and deciding translation policy later (e.g. lengths as `Int`, metrics as `Real`).

Nothing in-repo locks a long-term policy beyond the present `Real` choice in `translate.ts`.

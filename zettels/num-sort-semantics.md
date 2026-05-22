---
tags:
  [verification, arithmetic, decision, deferred, backend, reference, type-system, elaboration, ast, ffi, inference, sat, normalization, project, performance]
---
# Num sort semantics

**Current translation:** `src/verification/V2/logic/translate.ts` sets `Sorts.Num` to `Z3.Real.sort()` and numeric literals use `Z3.Real.val`. `Sorts.Int` exists in the same object for other uses; the ARCHITECTURE table in `src/verification/ARCHITECTURE.md` documents `Num → Real`.

**Design (open):** Yap-level `Num` could stay on `Real`, split into `Int` vs `Real` uses (e.g. lengths as `Int`, metrics as `Real`), or adopt a dual-sorted IVL policy. The in-house arithmetic theory is real-linear today; integer branch-and-bound exists in `theories/arithmetic/branch.ts` for mixed constraints.

Policy remains a design choice: `translate.ts` currently maps `Sorts.Num` → `Z3.Real` on main; IVL exposes both `Int` and `Real` sorts for future tightening.

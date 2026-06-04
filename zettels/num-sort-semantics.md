---
tags:
  [verification, arithmetic, decision, deferred, backend, reference, type-system, elaboration, ast, ffi, inference, sat, normalization, project, performance]
---
# Num sort semantics

**Current translation:** `src/verification/V2/logic/translate.ts` maps surface **`Num`** to IVL **`Real`** via **`mkSort`** / literals (see `src/verification/ARCHITECTURE.md` for the Num↔Real convention).

**Z3-direct era:** the same convention was expressed with **`Z3.Real.sort()`** / **`Z3.Real.val`** ([[smt-translation]]).

**Design (open):** Yap-level `Num` could stay on `Real`, split into `Int` vs `Real` uses (e.g. lengths as `Int`, metrics as `Real`), or adopt a dual-sorted IVL policy. The in-house arithmetic theory is real-linear today; integer branch-and-bound exists in `theories/arithmetic/branch.ts` for mixed constraints.

<!-- connections:start -->

## Connections

**Outgoing**
- APPLIES_TO → [[arithmetic-theory]] — Int vs Real

<!-- connections:end -->

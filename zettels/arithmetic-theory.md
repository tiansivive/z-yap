---
tags:
  [
    verification,
    arithmetic,
    mechanism,
    implemented,
    backend,
    reference,
    project,
    normalization,
    ast,
    ir,
    sat,
    ffi,
    milestone,
    inference,
  ]
---
# Arithmetic theory

**Implemented path:** `src/verification/V2/logic/translate.ts` maps numeric literals with `Z3.Real.val` and lowers `$add`, `$sub`, `$mul`, `$div`, `$mod`, and comparisons via `z3-solver` real arithmetic helpers (`OP_ADD` … `OP_LTE`). Sort mapping declares `Sorts.Num` as `Z3.Real.sort()` (see `src/verification/ARCHITECTURE.md` table).

**In-house arithmetic (M2):** `src/verification/solver/theories/arithmetic/` — normalization to linear form (`normalize.ts`), arbitrary-precision rationals (`rational.ts`), fixed-tableau simplex with sliding bounds per Dutertre & de Moura (`simplex.ts`, `bounds.ts`), branch-and-bound for integer variables (`branch.ts`), and a `Theory`-conformant solver wrapper (`solver.ts`). Both literal polarities are registered so negated arithmetic atoms correctly tighten bounds. See [[m2-implementation]] for integration details.

NbE constant-folding (`src/shared/lib/primitives.ts` arithmetic `compute`) reduces ground work before VC generation; it is not a substitute for a dedicated non-linear theory.

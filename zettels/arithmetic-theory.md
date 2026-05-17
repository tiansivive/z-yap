---
tags:
  [
    verification,
    arithmetic,
    mechanism,
    planned,
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

**Planned path:** `docs/SMT-SOLVER.md` specifies an in-house arithmetic theory on VC IR: ground folding, linearization (`c * x`), preserving irreducible non-linear leaves, simplex + bounds, branch-and-bound for integers. Proposed layout: `src/verification/solver/arithmetic/` — that tree is not in the repo today.

NbE constant-folding (`src/shared/lib/primitives.ts` arithmetic `compute`) reduces ground work before VC generation; it is not a substitute for a dedicated non-linear theory.

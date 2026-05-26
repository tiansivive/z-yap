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

**Z3-direct era (superseded pipeline):** when `translate.ts` built **`z3-solver`** values directly ([[smt-translation]]), numeric literals used **`Z3.Real.val`**, **`Sorts.Num` → `Z3.Real.sort()`**, and primitives **`$add`…`$mod`**, comparisons via **`OP_ADD`…`OP_LTE`** helpers.

**IVL emission (today):** the same surface numerics lower to **`Build.Real`**, **`Build.num`**, **`Build.arith`** in **`translate.ts`** (IVL).

**In-house arithmetic (M2):** `src/verification/solver/theories/arithmetic/` — normalization to linear form (`normalize.ts`), arbitrary-precision rationals (`rational.ts`), fixed-tableau simplex with sliding bounds per Dutertre & de Moura (`simplex.ts`, `bounds.ts`), branch-and-bound for integer variables (`branch.ts`), and a `Theory`-conformant solver wrapper (`solver.ts`). Both literal polarities are registered so negated arithmetic atoms correctly tighten bounds. See [[m2-implementation]] for integration details.

NbE constant-folding (`src/shared/lib/primitives.ts` arithmetic `compute`) reduces ground work before VC generation; it is not a substitute for a dedicated non-linear theory.

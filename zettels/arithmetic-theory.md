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

<!-- connections:start -->

## Connections

**Outgoing**
- IMPLEMENTS → [[theory-plugin-interface]] — Simplex
- COMPOSES_WITH → [[string-theory]] — Length coupling
- VALIDATES → [[primitive-signature]] — Arithmetic operations
- RESOLVES → [[cdcl-t-solver]] — Simplex feasibility for linear constraints
- DISPATCHES_ON → [[cdcl-t-solver]] — Int → branch-and-bound, Real → simplex

**Incoming**
- [[string-theory]] ← DELEGATES_TO — Length lemmas
- [[num-sort-semantics]] ← APPLIES_TO — Int vs Real
- [[non-linear-arithmetic]] ← CONSTRAINS — Linearizable subset first
- [[milestone-2-euf-quant-lia]] ← PRODUCES — Arithmetic module
- [[dutertre-arithmetic]] ← INFORMS — Fast linear arithmetic
- [[string-theory]] ← USES — Length coupling
- [[m2-implementation]] ← IMPLEMENTS — Realizes simplex arithmetic
- [[m2-implementation]] ← ENCODES — Rational bounds + fixed tableau representation
- [[solver-trace]] ← EXPOSES — ArithTrace.Step reveals bound/pivot/feasibility internals
- [[solver-trace]] ← REPORTS — Renders bound intervals after updates
- [[dual-polarity-registration]] ← APPLIES_TO — Specific to arithmetic
- [[solver-testing]] ← DETAILS
- [[solver-v2-monadic-port.implementation]] ← IMPLEMENTS — v2 arithmetic domain port

<!-- connections:end -->

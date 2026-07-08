---
tags:
  - bug
  - deferred
  - verification
  - solver
  - mbqi
  - quantifiers
  - instantiation
  - validity
  - refinement
  - row-types
  - dependent
  - liquid
  - limitation
---
# Record-field refinement over a symbolic value discharges as false-valid

A refinement on a record field that references a sibling and reduces to an unsatisfiable body is wrongly reported valid. The witness: `mkPair: (n: Num) -> { x: Num, y: Num[| \v -> v > :x |] } = \n -> { x: n, y: n }` — the result must satisfy `y > x`, i.e. `n > n`, which never holds, so it should be rejected.

The obligation is generated correctly. The sibling `:x` resolves to `n` (the field value, not a free constant), producing the guarded form `∀v. (v = n) → (v > n)` — arithmetically `n > n`, false. So both the label resolution and the formula are right; the defect is downstream.

Two layers compound in the discharge. The CDCL(T) quantifier layer leaves `v = n` **residual** under MBQI — it never instantiates `v := n` to expose the arithmetic contradiction — so validity discharge defaults to valid. And a near-identical **scalar** obligation, `\n -> n : Num[| \v -> v > n |]`, is correctly rejected; the two IVL formulas differ only by a redundant `∧ (= n n)` conjunct (the trivially-true `x` field), yet the verdict flips. A redundant true conjunct changing validity points to a second issue in how validity discharge folds conjuncts, layered on the instantiation gap.

This is independent of the label machinery: the label resolves and the formula is faithful. It reproduces without any label-handling change — the locus is the solver's quantifier instantiation and the validity-discharge conjunct handling.

<!-- connections:start -->
<!-- connections:end -->

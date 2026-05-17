---
tags:
  [
    normalization,
    elaboration,
    planned,
    inference,
    unification,
    decision,
    problem,
    migration,
    dependent,
    drift,
    testing,
    reference,
    principle,
    pattern,
  ]
---
# WHNF codification

There is no `mode: "whnf" | "nf"` parameter on `NF.evaluate` or exported toggle in `evaluation.v2.ts`. Strength of normalization is implicit in `evaluateTerm` / `reduceAndPushStack` / `reduce` (e.g. `Abs` with `Mu` binder does not beta-reduce—result stays `Neutral(App …)` with comment “defer to unification”).

Codifying WHNF vs full NF at API boundaries would require design work plus tests; today only informal mentions appear (e.g. evaluation tests describe outcomes as WHNF).

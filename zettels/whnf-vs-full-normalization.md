---
tags:
  [
    normalization,
    elaboration,
    concept,
    inference,
    unification,
    mechanism,
    implemented,
    dependent,
    recursion,
    decision,
    performance,
    problem,
    ir,
    testing,
  ]
---
# WHNF vs full normalization

The evaluator is one function (`NF.evaluate`) without an explicit mode flag (`src/elaboration/normalization/evaluation.v2.ts`). Beta reduction runs for non-`Mu` `Abs` via `reduceAndPushStack` (extends context and enqueues body eval). Some heads stay weak: neutral metavar/foreign applications accumulate `Neutral` / partial `External`; `Mu` abstraction refuses unfold during reduce.

Tests (`src/elaboration/normalization/__tests__/evaluation.v2.test.ts`) describe expected heads as WHNF in prose. Unification and inference share the same `NF.evaluate` path — full normalization depth is whatever `reduce` / `reduceAndPushStack` perform for each head, not a second evaluator module.

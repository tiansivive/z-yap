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
    tech-debt,
  ]
---
# WHNF codification

`NF.evaluate` has a single entry point — strength of normalization is implicit in `evaluateTerm` / `reduceAndPushStack` / `reduce`. WHNF in Yap means: beta-reduce function redexes when the abstraction is not `Mu`; leave neutral metavar/foreign spines and deferred `Mu` heads as `Neutral` (e.g. `Abs` with `Mu` binder stays `Neutral(App …)` — “defer to unification” in `evaluation.v2.ts`).

Evaluation tests (`src/elaboration/normalization/__tests__/evaluation.v2.test.ts`) document expected heads as WHNF in prose. A future explicit `mode: "whnf" | "nf"` toggle at API boundaries would make that contract machine-checkable; the planned tag reflects that codification work.

<!-- connections:start -->

## Connections

**Outgoing**
- ADDRESSES → [[whnf-vs-full-normalization]] — Formalize the WHNF boundary

**Incoming**
- [[global-pending-queue]] ← INCLUDES
- [[effects-migration-regression-closure.session]] ← ADDRESSES — Partial: evalMode reader with noReduceEliminations

<!-- connections:end -->

---
tags:
  - bug
  - resolved
  - verification
  - sat
  - solver
  - euf
  - congruence-closure
---
# EUF congruence propagation bug

**Status:** Resolved. Congruence closure propagates merges to function applications; the disequality conflict is detected and the formula decides UNSAT.  
**Discovered:** 2026-06-03  
**Resolved:** 2026-06-21  
**Location:** `src/verification/solver/v2/euf/cc.ts`  
**Test:** `src/verification/solver/v2/euf/__tests__/cc.test.ts`, `src/verification/solver/v2/trace/__tests__/trace.test.ts`

## Resolution

After merging `x ≡ y`, congruence closure propagates to merge `f(x) ≡ f(y)`, and an asserted disequality `f(x) ≠ f(y)` against that merged class is reported as a conflict. `cc.test.ts` "propagates equality through congruent applications" asserts `find(f(x)) == find(f(y))` after the merge; "reports conflict for asserted disequality in one class" asserts `(x = y) ∧ (f(x) ≠ f(y))` produces the conflict clause `[-EQ_XY, -NEQ_FX_FY]`. The end-to-end UNSAT decision is exercised by `trace.test.ts` "EUF congruence contradiction". The duplicate-class arena symptom no longer appears.

## Original defect (historical)

Formula `(x = y) ∧ (f(x) ≠ f(y))` returned SAT when it should be UNSAT. After merging `x ≡ y`, [[congruence-closure]] failed to propagate the merge of `f(x) ≡ f(y)` (same head `f`, arguments now co-classed), so the asserted disequality passed without a conflict. The trace also showed a duplicate `{x}` class (5 classes for 4 nodes), pointing at parent-set tracking in `merge()` alongside the propagation failure.

<!-- connections:start -->

## Connections

**Outgoing**
- AFFECTS → [[congruence-closure]] — Defect was in merge propagation to function applications
- AFFECTS → [[euf-theory]] — EUF decision returned spurious SAT

**Incoming**
- [[global-pending-queue]] ← INCLUDES — Resolved solver parity bug
- [[congruence-closure]] ← FIXES — Merge propagates to congruent applications; disequality conflict detected
- [[m2-implementation]] ← FIXES — EUF milestone delivers working congruence propagation

<!-- connections:end -->

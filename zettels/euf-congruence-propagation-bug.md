---
tags:
  - bug
  - verification
  - sat
  - solver
  - euf
  - congruence-closure
---
# EUF congruence propagation bug

**Status:** Open  
**Discovered:** 2026-06-03  
**Location:** `src/verification/solver/theories/euf/cc.ts`, `merge()` function (lines 142-153)  
**Test:** `src/verification/solver/__tests__/trace.test.ts` — "EUF contradiction traces theory events"

## Description

Formula `(x = y) ∧ (f(x) ≠ f(y))` returns SAT when it should be UNSAT.

After merging `x ≡ y`, [[congruence-closure]] should automatically propagate to merge `f(x) ≡ f(y)` (same function head `f`, arguments now in same equivalence class). This would conflict with the asserted disequality `f(x) ≠ f(y)`, yielding UNSAT.

Instead, `f(x)` and `f(y)` remain in separate equivalence classes, and the disequality assertion passes without detecting a conflict.

## Trace output (from test snapshot)

```
classes: {x}  {y}  {x}  {f(x)}  {f(y)}
merge x ≡ y                         reason: p1
classes: {x, y}  {x}  {f(x)}  {f(y)}

[theory]  euf assert p2: ok
    scan p2: (!= (f x) (f y))           → ok

[sat]
```

## Suspicious behavior

Initial classes show duplicate `{x}` entry (5 classes for 4 nodes), suggesting possible arena/class tracking issue in addition to the propagation failure.

## Root cause hypothesis

The parent loop in `merge()` should iterate over parents of the merged nodes and check for congruent pairs to merge. Either:
1. Parent relationships aren't being set up correctly during arena initialization
2. The `congruent()` check isn't detecting the congruence condition
3. The parent sets aren't being looked up correctly (root vs node ID confusion)

## Related

- [[congruence-closure]]
- [[euf-theory]]
- [[m2-implementation]]

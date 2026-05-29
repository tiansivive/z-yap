---
tags:
  - bug
  - planned
  - normalization
  - primitive
  - evaluation
  - runtime
---

# $eq normalization bug

`FFI.$eq` returns `false` for equal numeric literals during NbE evaluation. Observed in integration pipeline snapshots: `areEqual @Num @EqNum 10 10` normalizes to `false`, `displayIfEqual 5 5` normalizes to `"Not equal"`.

The primop compute function fires (the result is a concrete boolean, not a neutral), so the arity-saturation path works correctly. The defect is in the `$eq` entry of `PrimOps` (`src/shared/lib/primitives.ts`): the compute function likely compares `NF.Value` structures (lodash `isEqual` or `===`) instead of extracting and comparing the wrapped numeric payloads.

**Discovered via:** integration pipeline test snapshot audit (`language-tour.test.ts.snap`, tests: "traits with implicits" → `same`, "multiple constraints" → `msg`).

**Impact:** Any program using `$eq` at the type level (e.g. typeclass-style `Eq` instances evaluated during normalization) produces wrong results. Runtime codegen is unaffected since codegen emits the operator directly.

---
tags:
  - bug
  - implemented
  - bugfix
  - normalization
  - primitive
  - evaluation
  - runtime
---

# $eq normalization bug

`FFI.$eq` returned `false` for equal numeric literals during NbE evaluation. `areEqual @Num @EqNum 10 10` normalized to `false`, `displayIfEqual 5 5` normalized to `"Not equal"`.

**Root cause:** `$eq` and `$neq` in `PrimOps` (`src/shared/lib/primitives.ts`) used `lodash.isEqual` on full `NF.Value` objects. Every `NF.Value` carries a unique `id` field from `mk(nextId())`, so two structurally identical literals (e.g. `Lit.Num(10)`) always compared as unequal. All other comparison primops (`$lt`, `$gt`, etc.) extracted `.value.value` before comparing and were unaffected.

**Fix:** Introduced an `equality` helper that extracts the `Literal` payload (`.value`) before comparing with `isEqual`, bypassing the identity field. Applied to both `$eq` and `$neq`. Same pattern as `comparison`, `arithmetic`, and `logical`.

**Discovered via:** integration pipeline test snapshot audit (`typeclasses.test.ts`, tests: "traits with implicits" → `same`, "multiple constraints" → `msg`).

**Verified via:** runtime instrumentation confirmed `isEqual(x, y)` returning `false` for `{id:1468, type:"Lit", value:{type:"Num", value:10}}` vs `{id:1470, type:"Lit", value:{type:"Num", value:10}}`. Post-fix: `equality` returns `true`.

<!-- connections:start -->

## Connections

**Outgoing**
- APPLIES_TO → [[primitive-signature]] — $eq is a registered primop
- RELIES_ON → [[nbe]] — Bug fires during normalization
- RELIES_ON → [[cbv-evaluation]] — Primop compute runs under CBV evaluation
- RELIES_ON → [[application-evaluation]] — PrimOps dispatch is application evaluation

**Incoming**
- [[pipeline-stabilization.thread]] ← INCLUDES — $eq returns wrong result on equal literals

<!-- connections:end -->

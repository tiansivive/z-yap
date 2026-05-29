---
tags:
  - bug
  - planned
  - elaboration
  - inference
  - normalization
  - display
---

# fst closure annotation mismatch

The polymorphic projection `\x y -> x` (type `Π(a: Type) => Π(b: Type) => a -> b -> a`) elaborates with swapped type parameter annotations. The inner closure annotation says `Π(y: x)` — using the value variable `x` as a type — instead of `Π(y: b)`. The outer lambda annotation says `Π(x: b)` instead of `Π(x: a)`.

This may be a display/annotation synthesis issue rather than a fundamental elaboration defect: the GRAM structure looks correct (the function body returns `x`, the first argument), and the inferred type `Π(a: Type) => Π(b: Type) => a -> b -> a` is right. However, the malformed annotations cause downstream effects — normalization produces closure objects with wrong capture annotations, and verification can fail with "Rigid variables do not match" because the annotation feeds back into constraint checking.

**Discovered via:** integration pipeline test snapshot audit (`language-tour.test.ts.snap`, test: "pair operations" → `fst`).

**Investigation direction:** Check how `wrapLambda` synthesizes closure annotations for nested implicit/explicit parameter chains. The swap pattern (a↔b) suggests the annotation builder uses the wrong binder depth or reverses the parameter list.

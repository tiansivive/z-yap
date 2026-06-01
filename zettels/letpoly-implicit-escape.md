---
tags:
  - bug
  - implemented
  - bugfix
  - elaboration
  - inference
  - generalization
  - normalization
  - polymorphism
---

# Let-poly implicit escape

Block-internal implicit type variables leaked to the outer binding. Source `let letpoly: Num = { let innerID = \x -> x; let n = innerID 42; let s = innerID "hi"; return n; }` elaborated with type `Π(a: Type) => Num` instead of `Num`, and the elaborated term wrapped the block in a spurious `λ(a: Type) =>`.

The outer binding has an explicit annotation (`Num`), so generalization should be fully constrained. But `innerID`'s let-polymorphism created implicit metas for its own polymorphic type, which escaped the block boundary because the told zonker from `letdec` generalization was dropped.

Additionally, `innerID`'s inner closure annotation was self-referential (`Π(x: innerID) -> (closure: innerID -| ...)`), caused by `Ann` nodes capturing stale `NF.Value` closures at inference time.

**Root cause:** Two independent defects combined:
1. The zonker propagation bug ([[module-zonker-fix]]) — `module.ts` dropped the told zonker from `letdec` generalization, causing inner metas to escape and re-generalize at the outer level.
2. The `Ann` closure annotation bug ([[fst-closure-annotation]]) — `Ann` nodes stored `NF.Value`s with closures from the pre-wrapping context, producing nonsensical annotations.

**Fix:** Resolved by the composition of both fixes. Type is now `Num`, normalized value is `42`, annotations display correctly.

**Discovered via:** integration pipeline test snapshot audit (`language-tour.test.ts.snap`, test: "let-polymorphism in blocks" → `letpoly`).

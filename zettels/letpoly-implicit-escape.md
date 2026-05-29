---
tags:
  - bug
  - planned
  - elaboration
  - inference
  - generalization
  - normalization
  - polymorphism
---

# Let-poly implicit escape

Block-internal implicit type variables leak to the outer binding. Source `let letpoly: Num = { let innerID = \x -> x; let n = innerID 42; let s = innerID "hi"; return n; }` elaborates with type `Π(a: Type) => Num` instead of `Num`, and the elaborated term wraps the block in a spurious `λ(a: Type) =>`.

The outer binding has an explicit annotation (`Num`), so generalization should be fully constrained. But `innerID`'s let-polymorphism creates implicit metas for its own polymorphic type. These metas appear to escape the block boundary because the scoping check in `NF.generalize` (`m.lvl >= ctx.env.length`) doesn't properly fence block-internal metas from the outer `letdec`.

Additionally, `innerID`'s inner closure annotation is self-referential: `Π(x: innerID) -> (closure: innerID -| ...)` — using the binding name as a type, which is nonsensical. This may be a separate display issue or the same root cause manifesting in annotation synthesis.

**Discovered via:** integration pipeline test snapshot audit (`language-tour.test.ts.snap`, test: "let-polymorphism in blocks" → `letpoly`).

**Note:** The problem may be partly display-side (annotation synthesis / closure display) rather than actual elaboration. The block's GRAM structure looks correct (innerID is polymorphic, n and s are monomorphic uses). Investigation should distinguish between wrong elaboration and wrong annotation display.

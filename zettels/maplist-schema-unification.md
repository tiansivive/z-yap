---
tags:
  - bug
  - needs-design
  - elaboration
  - row-types
  - recursion
  - normalization
---

# mapList Schema unification failure

Recursive `mapList` definition fails to elaborate with "Cannot unify L2 with L6" on cons cell schemas whose labels appear in different order. Source defines `mapList` over a `List a` type (mu-type with `Nil`/`Cons` variants), applying `f` to each element.

Row unification itself is well-tested and handles ordered rows correctly. The failure is more likely upstream — in how `mu`-type unfolding reconstructs the schema rows for the cons cell variant. When a mu-type unfolds, the inner row must be re-expressed in terms of the unfolded application; if the unfolding produces labels in a different order than the original constructor, the structural row comparison fails even though the label sets are identical.

**Discovered via:** integration pipeline test snapshot audit (`language-tour.test.ts.snap`, test: "polymorphic list operations" → `mapList`). The `map` function with a simpler structure succeeds; only `mapList` with full recursive mu-types triggers the failure.

**Investigation direction:** Check how `NbE.evaluate` unfolds mu-type applications and whether the resulting variant schema rows preserve label order. The issue may also surface in pattern matching over mu-types with multiple constructors.

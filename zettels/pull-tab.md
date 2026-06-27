---
tags:
  - concept
  - mechanism
  - continuation
  - language
  - compiler
  - pattern
  - semantics
  - rewriting
  - graph
  - evaluation
---
# Pull-tab

A pull-tab step lifts a non-deterministic choice out of a *needed* argument position — one
that must be evaluated for a pattern match to proceed — by propagating the choice upward in
the expression graph:

    f (a ? b) c  →  (f a c') ? (f b c')   where c' = c

The two resulting subexpressions can be evaluated independently; neither has a choice in a
needed position. The original `c` is shared, not copied, minimising duplication.

Pull-tabbing arises in lazy graph reduction because evaluation is demand-driven: when `f`
needs its first argument to decide which rule fires, it cannot commit to `a` or `b`. Pulling
the choice to the root defers that commitment and lets two independent sub-computations
proceed. The mechanism is described and benchmarked in [[sprite]].

A pull-tab step clones the choice node's identifier into both sub-expressions, creating
the consistency obligation tracked by [[choice-fingerprints]]. Every use of pull-tabbing
in a shared graph implies fingerprinting overhead.

In a strict call-by-value language, the "needed position blocks a match" scenario does not
arise: arguments are fully evaluated before a function is entered. A non-deterministic
choice in a needed position would have already been resolved at the call site (see
[[call-time-choice]]). Pull-tabbing is therefore a technique specific to lazy evaluation
order. The [[choose-fail-effect]] / handler design achieves analogous scheduling flexibility
in a strict setting without requiring graph rewriting.

<!-- connections:start -->

## Connections

**Outgoing**
- MOTIVATES → [[choice-fingerprints]] — creates cloned choice nodes that need consistency tracking
- CONTRASTS_WITH → [[choose-fail-effect]] — lazy graph propagation vs strict effect-based nondet
- REFERENCES → [[sprite]] — described and used in Sprite

**Incoming**
- [[call-time-choice]] ← CONTRASTS_WITH — pull-tab is needed in the lazy setting; call-time-choice removes the root cause
- [[sprite]] ← INTRODUCES — core lazy-nondet evaluation mechanism
- [[choice-fingerprints]] ← ADDRESSES — consistency problem created by pull-tab choice cloning
- [[pattern-matching.thread]] ← INCLUDES

<!-- connections:end -->

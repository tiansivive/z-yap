---
tags:
  - principle
  - concept
  - language
  - runtime
  - semantics
  - continuation
  - type-system
  - evaluation
  - strategy
  - decision
---
# Call-time choice

In a strict, let-bound language, a shared binding is evaluated exactly once before the body
that uses it runs. When that binding involves a non-deterministic choice, the choice is
forced to a single value at binding time — it does not re-evaluate independently at each
use site. This is *call-time choice* semantics, as distinct from *run-time choice* (where
each use site independently picks an alternative).

    let x = choose(A, B) in f(x, x)

Under call-time choice, `x` is bound to either `A` or `B` before `f` is called; both
occurrences of `x` in `f` see the same value. Under run-time choice, `f` could receive
`(A, A)`, `(A, B)`, `(B, A)`, or `(B, B)`.

Call-time choice is the natural reading in a strict language and is also the target
semantics in Curry — achieved there via [[choice-fingerprints]], because lazy graph sharing
means nodes can be reached from multiple in-progress computations and independently
evaluated. A strict let-bound language delivers call-time choice structurally: shared
bindings are values before any use-site evaluation occurs, so the clone-consistency problem
that [[choice-fingerprints]] address does not arise.

This has a direct consequence for [[choose-fail-effect]] in a strict setting: an
implementation does not need fingerprint tracking. The non-determinism substrate is simpler
in this regard than in a lazy graph-rewriting system like [[sprite]].

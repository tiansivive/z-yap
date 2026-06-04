---
tags:
- mechanism
- unification
- recursion
- type-system
- elaboration
- decision
- implemented
- normalization
- dependent
---
# Mu-type unification

The strategy for checking equality of equirecursive types during unification. Yap uses an unfold-and-recurse approach rather than coinductive bisimulation or eager global unfolding.

**Mu vs Mu**: same pattern as Pi — unify binder annotations at the current level, then apply both closures to a fresh rigid variable and unify the bodies at the next level. This compares the "shape" of two recursive types structurally.

**Mu vs other**: unfold the mu by applying its closure to itself (`NF.apply(mu.binder, mu.closure, mu)`), then continue unification with the unfolded body. The elaboration context records the unfolding via `unfoldMu` to prevent infinite loops — the mu body appears in the environment for the recursive step.

**App vs App**: when neither head has a flex meta, attempt `NF.unfoldMu` on either side. If unfolding produces a result, unify the unfolded pair; otherwise fall through to structural function+argument comparison.

This approach trades bisimulation completeness for simplicity; it handles the recursive types Yap's type system produces in practice. The equirecursive-types zettel discusses the broader design space including fuel-capped unfolding and bisimulation-based equality.

<!-- connections:start -->

## Connections

**Outgoing**
- SPECIALIZES → [[unification-algorithm]] — Mu case
- IMPLEMENTS → [[equirecursive-types]] — Current approach
- REWRITES → [[mu-types]] — Unfolds and recurses

**Incoming**
- [[equirecursive-types]] ← REVISES — Toward full bisimulation
- [[missing-spec-recursive-types]] ← IMPLEMENTS — No spec formalization
- [[knot-tying]] ← ENABLES — Recursive self-reference
- [[equirecursive-types]] ← DELEGATES_TO — Checking delegation
- [[recursion.thread]] ← INCLUDES

<!-- connections:end -->

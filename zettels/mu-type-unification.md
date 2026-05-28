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

This approach is simpler than full bisimulation but sufficient for the current type system. The equirecursive-types zettel discusses the design space including fuel-capped unfolding and the path toward bisimulation-based equality.

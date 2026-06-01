---
tags:
  - type-system
  - recursion
  - unification
  - normalization
  - elaboration
  - planned
  - needs-design
  - exploration
  - dependent
  - solver
---
# Design: bisimulation-based equality for μ-types

Determine how Yap should implement type equality for recursive (μ) types, choosing between or combining structural unfolding and coinductive bisimulation.

Current μ-type unification uses structural unfolding with an occurs check. Bisimulation-based equality (Amadio & Cardelli 1993, Brandt & Henglein 1998) would treat two recursive types as equal when they exhibit the same observable behavior at every unfolding step — a coinductive criterion. This is more complete than finite unfolding but requires a coinductive proof mechanism (e.g., assumption sets or greatest fixed point iteration) in the unifier.

The design must settle: whether bisimulation is needed (are there practical μ-type equalities the current unifier rejects?), integration with the existing constraint solver, interaction with row-based recursive types, and performance implications of coinductive checking.

See [[bisimulation-type-equality]] for the concept analysis and literature references.

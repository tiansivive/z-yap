---
tags:
- modality
- type-system
- inference
- elaboration
- unification
- planned
- needs-design
- polymorphism
- concept
- solver
- ast
- compiler
- reference
- migration
---
# Modality polymorphism

Surface and core syntax today fix multiplicity on `Modal.Annotations` as concrete `Q.Multiplicity` values (`src/elaboration/syntax/term.ts`)—no modality metavariables or grade-polymorphic binders yet.

An exploratory extension would intersect commented usage constraints (`src/elaboration/solver/solver.ts`), zonking (`Sub`), and the `stripModalities` rewrite in `src/elaboration/elaborate.ts`: polymorphism over grades needs graded information to survive inference and solving end-to-end.

---
tags:
  - verification
  - row-types
  - sat
  - ivl
  - backend
  - planned
  - needs-design
  - dependent
  - principle
  - solver
---
# Design: row theory for verification

Determine how the verification backend should reason about row-typed formulas structurally rather than encoding them into a generic theory.

Elaboration's row semantics are label-based: decompose by label, unify field-wise, handle openness through row variables. The verification side must respect the same structure. Flattening rows into uninterpreted sorts loses label identity, extension order, and tail information — producing imprecise reasoning. The owned CDCL(T) solver can host a native row theory plugin that shares elaboration's vocabulary.

The design must settle: theory plugin interface for rows, label-based decomposition in the solver, interaction with EUF (label equality) and quantifiers (row variable instantiation), and how row subtyping obligations translate into theory-level constraints.

See [[row-theory]] for the principle and motivation; [[required-theory-support]] for the broader theory landscape.

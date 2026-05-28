---
tags:
  - concept
  - elaboration
  - unification
  - inference
  - mechanism
  - type-system
  - dependent
  - compiler
---
# Constraint solving

Constraint solving is the mechanism by which Yap's elaborator resolves type-level unknowns introduced during elaboration. Rather than failing or committing immediately when the elaborator encounters a gap — an unsolved metavariable, an implicit argument needing evidence, a type mismatch requiring unification — it emits a **constraint** and continues.

## Constraint kinds

**Assign** constraints represent type equalities: "these two types must unify." They arise from bidirectional checking mismatches, application argument/parameter pairs, and annotation boundaries. Solving an assign constraint produces a substitution mapping metavariables to their solutions.

**Resolve** constraints represent implicit evidence obligations: "find an implicit value of this type." They arise when elaboration encounters an implicit Pi and inserts a fresh metavariable as a placeholder. Solving a resolve constraint searches the implicit environment for a candidate whose type unifies with the obligation.

## Role in elaboration

Constraint solving sits between elaboration (which produces constraints) and generalization (which abstracts over unsolved metavariables at let boundaries). The solver consumes a batch of constraints and produces two outputs: a **zonker** (substitution mapping solved metas to their values) and **resolutions** (mapping implicit metas to their evidence terms). These outputs feed into generalization, which decides which remaining metas become polymorphic binders.

The separation between constraint emission and solving is a deliberate design choice ([[deferred-constraint-solving]]) — Yap does not solve constraints eagerly at each mismatch site.

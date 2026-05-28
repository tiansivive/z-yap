---
tags:
  - elaboration
  - inference
  - unification
  - mechanism
  - hub
  - implemented
  - compiler
  - dependent
  - type-system
refs:
  - src: src/elaboration/solver/
    note: "Solver entry, constraint types, nondeterminism"
---
# Constraint solver

Hub for Yap's elaboration-time constraint solver — the subsystem that resolves type equalities and implicit obligations accumulated during elaboration.

## Domain

- **What it solves:** [[constraint-solving]] — assign (unification) and resolve (implicit evidence) constraints
- **When it solves:** [[deferred-constraint-solving]] — at let/module boundaries, not eagerly
- **Ordering:** [[assign-before-resolve]] — assignments first to populate the zonker, then resolution against zonked types
- **Resolution semantics:** [[implicit-resolution-solver]] — proof search via unification; [[empty-subst-guard]] — selection, not computation
- **Contrast:** [[eager-constraint-solving]] — the classical alternative Yap chose not to follow

## Mechanisms

- **Unification:** [[unification-algorithm]] — structural comparison producing substitutions
- **Constraint types:** [[constraint-types]] — the `assign` / `resolve` sum type
- **Zonking:** [[zonking]] — applying the solved substitution to normalize metas
- **Nondeterminism:** [[nondeterminism]] — multishot replay for branching solve attempts
- **Generalization:** [[generalization]] — abstracting over unsolved metas at let boundaries
- **Implicit resolution:** [[implicit-resolution]] — the broader implicit/typeclass story

## Provenance

Idris 2 and Lean influenced the solver's design, particularly the empty-subst guard on resolution and the assign-before-resolve ordering.

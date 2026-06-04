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

<!-- connections:start -->

## Connections

**Outgoing**
- USES → [[unification]] — Assign constraints → unify
- USES → [[nondeterminism]] — Multishot replay
- RESOLVES → [[constraint-types]] — Processes queue
- DELEGATES_TO → [[unification-algorithm]] — Assign constraints
- DELEGATES_TO → [[implicit-resolution-solver]] — Resolve constraints
- IMPLEMENTS → [[constraint-solving]] — Solver realizes the concept
- USES → [[implicit-resolution-solver]] — Resolve → Δ lookup
- ENABLES → [[deferred-constraint-solving]] — Batch processing at let boundaries
- ENABLES → [[implicit-resolution]] — Δ lookup phase

**Incoming**
- [[zonking]] ← FOLLOWS — After solving
- [[deferred-constraint-solving]] ← RELIES_ON — Batch processing at let boundaries
- [[constraint-solving]] ← DELEGATES_TO — Concept realized by the solver
- [[assign-before-resolve]] ← CONSTRAINS — Ordering invariant
- [[empty-subst-guard]] ← CONSTRAINS — Resolution acceptance rule
- [[idris-2-influence]] ← INSPIRES — Unification approach
- [[constraint-types]] ← ENABLES — Typed constraints
- [[constraint-types]] ← DISPATCHES_ON — Assign vs resolve
- [[nondeterminism-multishot]] ← USES — Runs after solving
- [[test-utility]] ← USES — Solve constraints
- [[implicit-resolution]] ← DELEGATES_TO — Batch processing
- [[bidirectional-checking]] ← DELEGATES_TO — At let boundaries
- [[mutual-recursion]] ← REQUIRES — Multi-pass constraint solving
- [[nondeterminism-multishot]] ← DISPATCHES_ON — Solution emptiness check
- [[nondeterminism]] ← DISPATCHES_ON — Solution emptiness (single vs replay)
- [[verification-backend.thread]] ← INCLUDES
- [[elaboration-v2.thread]] ← USES
- [[explorer-timing]] ← REPORTS — Solver timing breakdown

<!-- connections:end -->

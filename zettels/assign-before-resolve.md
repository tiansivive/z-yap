---
tags:
  - decision
  - elaboration
  - inference
  - unification
  - mechanism
  - principle
  - implemented
  - compiler
---
# Assign-before-resolve ordering

**Decision:** The constraint solver processes all `assign` constraints before any `resolve` constraints. Assignments build the zonker (substitution); resolution then runs against fully zonked types.

## Rationale

Resolution searches the implicit environment by unifying the obligation type against candidate types. If the obligation type still contains unsolved metavariables (because assign constraints haven't been processed yet), unification may fail spuriously or match the wrong candidate — the types aren't specific enough to discriminate.

By solving assignments first, the zonker reflects all type equalities discovered during elaboration. Resolution sees the most complete type information available, making candidate selection accurate.

## What would break

If resolution ran before or interleaved with assignment solving, an implicit argument of type `?A -> Int` (where `?A` is unsolved) might match a candidate of type `String -> Int` and also a candidate of type `Bool -> Int`. After assignments resolve `?A = String`, only the first candidate is correct — but interleaved resolution might have already committed to the second.

## Interaction with empty-subst guard

The ordering and the [[empty-subst-guard]] are complementary. Ordering ensures resolution sees solved types; the guard ensures resolution doesn't *produce* solutions as a side effect. Together they keep resolution as pure selection from the implicit environment.

<!-- connections:start -->

## Connections

**Outgoing**
- CONSTRAINS → [[constraint-solver]] — Ordering invariant
- COMPOSES_WITH → [[empty-subst-guard]] — Complementary invariants

**Incoming**
- [[idris-2-influence]] ← INSPIRES — Ordering discipline
- [[elaboration-v2.thread]] ← RELIES_ON

<!-- connections:end -->

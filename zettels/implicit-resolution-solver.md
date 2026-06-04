---
tags:
  - concept
  - elaboration
  - inference
  - unification
  - mechanism
  - type-system
  - dependent
  - compiler
  - principle
---
# Resolution via unification

Implicit arguments in Yap are resolved by unifying the expected type against candidates from the implicit environment. This is proof search: the implicit environment is a context of available evidence, and a successful unification match means a candidate *is* evidence for the required type.

## How it works

When elaboration encounters an implicit Pi type, it inserts a fresh metavariable as a placeholder and emits a `resolve` constraint carrying the expected type and a snapshot of the current implicit environment. Later, the solver walks the candidates in order, unifying the obligation type against each candidate's type. The first candidate that unifies successfully is selected as evidence.

## Semantic meaning

Resolution is **selection**, not computation. The solver is choosing from existing evidence in scope, not deriving new type-level facts. This distinction is enforced by the [[empty-subst-guard]]: if unification succeeds but produces a substitution that grounds metavariables beyond the one being resolved, the candidate is rejected. A candidate that "works" but has side effects on unrelated metas was too powerful — it was computing, not selecting.

## Relationship to typeclasses

This mechanism is the foundation for Yap's implicit/typeclass story. `using` declarations populate the implicit environment; resolution searches it. The quality of resolution depends on the environment's contents and ordering. Coherence ([[typeclass-coherence]]), functional dependencies ([[functional-dependencies]]), and superclass propagation ([[superclasses]]) all refine how candidates enter and are prioritized in this search.

<!-- connections:start -->

## Connections

**Outgoing**
- IMPLEMENTS → [[constraint-solving]] — Resolution as proof search via unification
- USES → [[unification-algorithm]] — Candidate matching by unification
- IMPLEMENTS → [[implicit-resolution]] — Solver-side mechanism
- USES → [[unification-algorithm]] — Candidate matching
- PRESERVES → [[generalization]] — Rejects subst-producing candidates

**Incoming**
- [[constraint-solver]] ← DELEGATES_TO — Resolve constraints
- [[empty-subst-guard]] ← CONSTRAINS — Selection-not-computation semantics
- [[constraint-solver]] ← USES — Resolve → Δ lookup
- [[elaboration-v2.thread]] ← USES
- [[functional-dependencies]] ← INFORMS — Solver determinacy
- [[typeclass-coherence]] ← APPLIES_TO — Solver selection policy
- [[superclasses]] ← INFORMS — Auto-propagation of superclass implicits

<!-- connections:end -->

---
tags:
  - decision
  - elaboration
  - inference
  - unification
  - mechanism
  - pattern
  - dependent
  - compiler
  - error-handling
  - principle
---
# Deferred constraint solving

**Decision:** Yap accumulates constraints during elaboration and solves them at let/module boundaries, rather than solving eagerly at each mismatch site.

## Rationale

**Error resilience.** Deferring constraints means elaboration can process an entire file — all function bodies, all let bindings — before any solving occurs. If function A has a type error, functions B, C, and D are still fully elaborated and their constraints solved independently. In an eager system, a unification failure halts traversal of that branch; in Yap's deferred system, the failure is contained to the solve phase of A's let boundary.

**Separation of concerns.** Elaboration traversal focuses on structural decomposition (checking, synthesis, application, etc.) without interleaving solver logic. The solver is a distinct phase with its own invariants ([[assign-before-resolve]], [[empty-subst-guard]]). This makes both easier to reason about and extend independently.

**Extensibility.** Adding new constraint kinds (e.g. usage constraints for QTT, new resolution strategies) requires only a new constraint type and a handler in the solver — not changes to the elaboration traversal.

## How it works

The elaboration monad accumulates constraints in its writer channel. At let/module boundaries, the accumulated constraints are drained via `listen`, passed to the solver, and the resulting substitution is merged into the context's zonker. Generalization then abstracts over any metas that remain unsolved after solving.

Both deferred and eager approaches support let-polymorphism — the choice between them is not about expressiveness but about engineering properties. See [[eager-constraint-solving]] for the contrast.

<!-- connections:start -->

## Connections

**Outgoing**
- ENABLES → [[generalization]] — Metas generalized before solving
- ENABLES → [[implicit-resolution]] — Full context for resolution
- RELIES_ON → [[constraint-solver]] — Batch processing at let boundaries
- RESOLVES → [[constraint-types]] — At let boundaries
- CONTRASTS_WITH → [[eager-constraint-solving]] — Deferred vs classical eager approach

**Incoming**
- [[eager-constraint-solving]] ← CONTRASTS_WITH — Classical vs deferred approach
- [[ghc-influence]] ← INSPIRES — Constraint deferral
- [[constraint-solver]] ← ENABLES — Batch processing at let boundaries
- [[implicit-resolution]] ← RESOLVES — At let boundaries
- [[elaboration-v2.thread]] ← RELIES_ON

<!-- connections:end -->

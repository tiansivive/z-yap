---
tags:
  - concept
  - elaboration
  - inference
  - unification
  - type-system
  - reference
---
# Eager constraint solving

In eager constraint solving, unification happens inline during the elaboration traversal — at each application, each annotation boundary, each pattern match — rather than being deferred to a separate phase. This is the classical approach: Algorithm W (Damas-Milner) interleaves constraint generation and solving in a single pass.

## Properties

**Locality:** Errors surface at the point where a constraint is first violated. The elaborator knows exactly which subexpression caused the failure, making error messages precise without additional provenance tracking.

**Simplicity:** No constraint accumulation infrastructure is needed. The elaborator carries a substitution and applies it as it goes. No separate solver phase, no batching, no drain points.

**Coupling:** Elaboration and solving are interleaved, so extending the solver (new constraint kinds, new resolution strategies) requires changes to the traversal. The elaborator must handle solving concerns inline.

**Halting on failure:** A unification failure stops traversal of the current branch. If function A has a type error, functions B, C, D in the same module may not be elaborated at all (depending on dependency structure), because the failure interrupts the traversal before reaching them.

## Relationship to Yap

Yap chose [[deferred-constraint-solving]] over eager solving for error resilience and separation of concerns. Both approaches support let-polymorphism — the choice is about engineering properties, not expressiveness.

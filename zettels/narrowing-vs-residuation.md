---
tags:
  - exploration
  - concept
  - language
  - type-system
  - pattern
  - needs-design
  - unification
  - continuation
  - semantics
  - design
  - strategy
---
# Narrowing vs residuation

Two readings of function inversion in [[functional-patterns]]:

**Narrowing** instantiates free variables in the pattern non-deterministically across all
constructor-term preimages of the scrutinee. Each instantiation is a separate result; there
may be many. The evaluation strategy is search: enumerate candidates, then check. Narrowing
requires a non-determinism substrate (see [[choose-fail-effect]]) and in the general case
does not bound statically how many results exist or whether the search terminates. This is
the full Curry reading.

**Residuation** treats the pattern position as a [[unification]] problem: given the
scrutinee, solve for the free variables such that the function applied to them produces the
scrutinee. The function must be injective, or the free components must be sufficiently
constrained by the rest of the match, for a unique solution to exist. When it succeeds
there is exactly one result; when it fails the clause is skipped. No non-determinism
substrate required; the computation stays within the unification machinery already present
in elaboration.

Residuation covers a meaningful subset of practical functional-pattern uses — any pattern
where the inversion is structurally determined by the type and value constraints — without
requiring the broader non-determinism machinery. Narrowing is strictly more expressive but
carries costs: exhaustiveness analysis over narrowing clauses is harder, QTT usage counting
becomes multiplicity-sensitive (each solution resumes the clause body once), and liquid
refinements and totality proofs become harder to discharge.

Whether to support narrowing, residuation, or both as a surface feature, and what modality
or annotation marks the boundary, is an open design question that affects the scope of the
verified fragment.

<!-- connections:start -->

## Connections

**Outgoing**
- ADDRESSES → [[functional-patterns]] — design space for the inversion semantics
- REQUIRES → [[choose-fail-effect]] — narrowing reading requires a non-determinism substrate
- USES → [[unification]] — residuation reading is a unification problem

**Incoming**
- [[functional-patterns]] ← MOTIVATES — function-in-pattern position requires a choice of inversion semantics
- [[pattern-matching.thread]] ← INCLUDES

<!-- connections:end -->

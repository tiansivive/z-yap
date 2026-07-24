---
tags:
  - verification
  - mechanism
  - principle
  - row-types
  - dependent
  - label
  - refinement
  - checking
  - context
  - elaboration
  - liquid
---
# Verification re-establishes the sibling-label scope at record boundaries

A `:label` reference in a refinement is a sibling name, meaningful only within the row that binds it. Elaboration collects these bindings while *walking the row* (its label context), not at the leaf where a label is read. Verification must apply the same discipline: whenever it destructures a record/sigma, it re-opens that row's sibling scope before descending into any field's refinement — otherwise a `:label` reaches formula translation with nothing in scope to resolve against.

The verification analogue of elaboration's row-walk binds every field of the row into scope at each boundary: the field's declared type (for sort lookup) and a symbolic placeholder for its value. Boundaries are the sites that open a record — struct-vs-schema checking, row containment during subtyping, and struct synthesis (which additionally threads each field's concrete value left-to-right so later siblings resolve to it). A refinement's translation then inherits the scope: a concrete sibling resolves to its value; a symbolic sibling becomes a logical constant of the field's sort.

The key framing: the fix belongs at the boundary that *has* the row, not at the translation leaf. Refinement subtyping over two bare refined types has no row in hand — it is a pure consumer of a scope that must have been established upstream.

Opening the boundary scope does not by itself recontextualize a dependency that was normalized against a symbolic enclosing record before a nested predicate closure was captured. That outer-field case requires the concrete boundary values to participate when the predicate is evaluated; see [[nested-refinement-outer-label-capture.bug]].

<!-- connections:start -->

## Connections

**Outgoing**
- RESOLVES → [[ivl-label-translation]] — Boundary collection closes the label-translation gap
- MIRRORS → [[label-lookup]] — Verification analogue of elaboration's row-walk label context
- APPLIES_TO → [[refinement-types]] — Refinements referencing sibling fields
- APPLIES_TO → [[sigma-types]] — Record boundaries opened during checking and subtyping

**Incoming**
- [[label-refinement-verification.session]] ← PRODUCED — Sibling-label scope invariant
- [[verification-backend.thread]] ← INCLUDES — Sibling-label scope mechanism
- [[row-types.thread]] ← INCLUDES — Row-boundary label collection in verification
- [[nested-refinement-outer-label-capture.bug]] ← REVEALS — Boundary scope must reach dependencies captured before the boundary opens

<!-- connections:end -->

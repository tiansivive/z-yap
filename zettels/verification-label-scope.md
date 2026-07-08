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

<!-- connections:start -->
<!-- connections:end -->

---
tags:
  - type-system
  - row-types
  - recursion
  - concept
  - planned
  - needs-design
  - codata
  - elaboration
  - lowering
  - compiler
  - language
  - exploration
  - principle
  - graph
---
# ν fixed point on the row

The coinductive fixed point `ν ρ. R` belongs on the row, not on the record. The occurrence restriction: `ρ` may appear only in field-type position — never as a row tail — and always under an interpretation (`Schema ρ` for product records, `Variant ρ` for sum types). This is the row analogue of strict positivity and is the tractable equirecursive fragment: rational-tree unification through a row is decidable, and the occurrence restriction keeps ν-unfolding from interfering with scoped-label rotation in row unification.

Placing the binder at row granularity rather than record granularity gives per-label scope: one field participates in a productive cycle while unrelated fields remain plain. The same binder covers both `Schema` and `Variant` interpretations, so stream records and colists share the fixed-point mechanism. The typing object aligns with the GRAM `label-cycles` analysis, which already reasons per-field over the `:refers_to` graph — row-level ν makes the typing and lowering analyses congruent objects.

## Guardedness and regularity as orthogonal discriminators

The label graph carries two independent properties:

**Guardedness** — does every cycle pass a lambda guard? This separates productive codata from ill-founded references (`{ foo: :bar, bar: :foo }`). ν makes guardedness a typing property: a well-typed inhabitant of `Schema(ν ρ. R)` is productive by construction; an unguarded cycle is a type error at elaboration time.

**Regularity** — does the infinite unfolding produce finitely many distinct subterms? A stream `{ ones: { head: 1, tail: :ones } }` is regular; `{ nats: { head: 0, tail: map (+1) :nats } }` is not. Regularity is a lowering decision, not a typing property: a guarded+regular value compiles to a memory cycle via the knot; a guarded+non-regular value requires thunk cells.

The `label-cycle-guardedness` pass currently collapses both productive and ill-founded eager cycles into a single rejection because ν does not yet exist to classify them. ν separates the well-formed productive cases; the regularity check at lowering then determines the representation.

## Effect on the open forks

**Typing-vs-lowering fork** ([[coinduction-typing-vs-lowering]]): the either/or dissolves. Typing discharges the guardedness guarantee; lowering resolves the representation choice via regularity. Both analyses run on the same label graph and are not in competition.

**Sigma/codata elaboration dispatch** ([[sigma-vs-codata-label-refs]]): elaboration dispatch for `:label` references becomes a property of the reference graph rather than a surface sigil or context heuristic. Acyclic references elaborate as sigma (telescope, deferred closure application); cyclic+guarded references elaborate under a ν binder; unguarded cycles are errors. The deferred/eager distinction survives as analysis output.

<!-- connections:start -->

## Connections

**Outgoing**
- SPECIALIZES → [[nu-types]] — Binder concretely at kind Row, not record
- COMPOSES_WITH → [[rows-universal-substrate]] — Fixed point is per-row; covers Schema and Variant equally
- ADDRESSES → [[coinduction-typing-vs-lowering]] — Resolves the fork: guardedness is typing, regularity is lowering
- INFORMS → [[sigma-vs-codata-label-refs]] — Dispatch becomes graph-property-driven, not sigil-driven
- APPLIES_TO → [[label-cycle-guardedness]] — Typing counterpart of the lowering-time guardedness gate
- CONSTRAINS → [[knot-eager-capture-invariant]] — Admitting constructor-guarded cycles requires enforcing allocate-before-capture
- RELIES_ON → [[recursive-struct-binding]] — Knot handles guarded+regular; thunk handles guarded+non-regular

**Incoming**
- [[nu-on-rows-design.session]] ← PRODUCED
- [[recursion.thread]] ← INCLUDES

<!-- connections:end -->

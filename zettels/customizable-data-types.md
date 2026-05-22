---
tags:
- concept
- language
- lowering
- speculative
- needs-design
- exploration
- row-types
- ffi
- codegen
- mechanism
- principle
- question
- type-system
- infrastructure
- compilation
- inference
- runtime
refs:
- session: e6fb44e5-9be1-41cd-a13d-0b6363cf0dec
  note: "Type system concepts exploration session"
---
# Customizable data types (hub)

Yap's aspiration: unify data structures under the record-like syntax that already exists ([[rows-universal-substrate]]), while allowing users to control compilation semantics and runtime representation.

The exploration space is broad. At one end: records and variants with pluggable backends (a list can be a linked list, an array, or a rope depending on a strategy). At the other end: Datalog-style relations where a tuple of values is indexed on multiple fields — query on the first element of a 5-tuple and get all matching tuples with their remaining values. Multimaps, RDF-style triples, and relational structures all fit this continuum.

The design principle: most users should not need to care. The high-level structural type (record, variant, relation) is what you write and what the type checker sees. Customization happens via [[indexing-strategies]] or compilation hints, possibly threaded as [[implicits]], so compilation semantics change while the surface type stays the same.

Open questions: how is this type-checked when "just" compilation semantics still affects observable behavior (performance, memory layout)? How does customization interact with the [[ffi]]? Can strategies be composed? Is there a default that is good enough for 90% of cases? How does the relational/Datalog angle interact with [[row-polymorphism]] — are indexed tuples just rows with implicit lookup strategies?

Hub: [[indexing-strategies]], [[rows-universal-substrate]], [[opaque-types]], [[module-system-exploration]].

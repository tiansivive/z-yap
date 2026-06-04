---
tags:
- concept
- mechanism
- speculative
- exploration
- row-types
- ffi
- infrastructure
- lowering
- codegen
- type-system
- question
- needs-design
- language
- compilation
- runtime
refs:
- session: e6fb44e5-9be1-41cd-a13d-0b6363cf0dec
  note: "Type system concepts exploration session"
---
# Indexing strategies

Sketches for pluggable data structure backends in Yap. A `Strategy` record defines how a container is indexed (numeric for arrays, string/hash for maps, composite for custom structures), and the implementation varies while the surface type stays the same.

One reasonable starting point: strategies are specified at the [[ffi]] boundary, making them opaque from the Yap side. You write the high-level structure; it compiles however the backend dictates. Then you can customize by working at the FFI boundary, swapping a linked-list backend for a hashmap backend.

Whether strategies should also be specifiable from pure Yap code (not just FFI) is an open question. If yes, the [[implicits]] mechanism is a natural carrier — thread a strategy implicit that the compiler uses to select compilation paths. This would leverage [[dictionary-passing]] for compilation hints, which is a novel use of the implicit infrastructure.

The type-checking story is unclear: if two values have the same Yap type but different strategies, are they interchangeable? If yes, strategy is purely a compilation hint. If no, strategy affects the type, which changes the [[structural-typing]] story.

Related: [[customizable-data-types]], [[ffi]], [[rows-universal-substrate]], [[dictionary-passing]], [[implicits]], [[structural-typing]].

<!-- connections:start -->

## Connections

**Outgoing**
- APPLIES_TO → [[customizable-data-types]] — Strategy application
- USES → [[implicits]] — Strategies as implicit parameters
- USES → [[dictionary-passing]] — Strategy records as dictionaries
- COMPOSES_WITH → [[ffi]] — FFI-specified indexing
- INFORMS → [[structural-typing]] — Same type, different representation

**Incoming**
- [[dictionary-passing]] ← INFORMS — Strategies as implicit dictionaries
- [[customizable-data-types]] ← RELIES_ON — Pluggable backends
- [[row-types.thread]] ← INCLUDES

<!-- connections:end -->

---
tags:
- concept
- mechanism
- type-system
- elaboration
- lowering
- implemented
- inference
- ffi
- codegen
- principle
- language
- row-types
- runtime
- compiler
refs:
- src: src/elaboration/solver/solver.ts
  note: "Implicit resolution as dictionary lookup"
- src: src/elaboration/implicits.ts
  note: "Dictionary insertion and instantiation"
- session: e6fb44e5-9be1-41cd-a13d-0b6363cf0dec
  note: "Type system concepts exploration session"
---
# Dictionary passing

Implementation strategy for typeclasses: each class becomes a record type (dictionary), each instance a record value, and polymorphic functions receive dictionaries as extra arguments. Used by GHC, Idris 2, and Lean.

Yap's [[typeclass-emulation]] is already dictionary passing by construction — records are the dictionaries, implicit Pi binders thread them. The elaboration makes this explicit: `(using show : Show a) => a -> String` desugars to an implicit function argument carrying a record.

Dictionaries are runtime-relevant (not erased). At the [[ffi]] boundary, this raises questions about arity: `foreign inc : Num a => a -> a` needs the dictionary argument accounted for in the foreign call convention (see [[ffi-saturation]]).

The advantage of this being the *only* mechanism (rather than a compilation target for a separate typeclass system) is simplicity: the user writes what the compiler sees, and [[implicit-resolution]] is the only "magic." No separate typeclass elaboration pass, no dictionary transformation — just records and implicit arguments.

Related: [[typeclass-emulation]], [[implicit-resolution]], [[implicits]], [[ffi]], [[ffi-saturation]], [[structural-records]], [[superclasses]].

<!-- connections:start -->

## Connections

**Outgoing**
- IMPLEMENTS → [[typeclass-emulation]] — Records as dictionaries
- RELIES_ON → [[implicit-resolution]] — Dictionaries threaded via implicits
- RELIES_ON → [[implicits]] — Implicit Pi binders carry dictionaries
- USES → [[structural-records]] — Dictionaries are records
- APPLIES_TO → [[ffi]] — FFI arity includes dictionary args
- APPLIES_TO → [[ffi-saturation-gram]] — Saturation must account for dictionaries
- INFORMS → [[indexing-strategies]] — Strategies as implicit dictionaries
- CONTRASTS_WITH → [[ghc-influence]] — GHC compiles to dictionaries; Yap starts with them
- INFORMS → [[ghc-influence]] — GHC dictionary compilation
- INFORMS → [[idris-2-influence]] — Idris 2 dictionary passing

**Incoming**
- [[customizable-data-types]] ← USES — Strategies as implicit dictionaries
- [[indexing-strategies]] ← USES — Strategy records as dictionaries

<!-- connections:end -->

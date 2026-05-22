---
tags:
- concept
- language
- exploration
- speculative
- needs-design
- question
- type-system
- structural
- infrastructure
- principle
- syntax
- mechanism
- elaboration
- inference
- compiler
refs:
- session: e6fb44e5-9be1-41cd-a13d-0b6363cf0dec
  note: "Type system concepts exploration session"
---
# Module system (exploration)

Yap has a rudimentary [[module-system]]: file-level imports, FFI declarations, and a flat namespace. There are no signatures, functors, export control, or abstraction boundaries in the ML-family sense.

Whether Yap needs a more formal module system is an open investigation. The current approach works for small programs but may not scale: without export control, library authors can't enforce invariants; without signatures, there's no way to specify a module's interface separately from its implementation.

The interaction with [[structural-typing]] matters: an ML-style module system with abstract types introduces a form of nominal typing (the module boundary is the abstraction). Whether this fits Yap's structural philosophy or fights it depends on the design (see [[nominal-identity]], [[opaque-types]]).

Alternatives to a full ML-family module system: implicit-based capability passing (modules as records of capabilities, leveraging [[typeclass-emulation]]), row-typed module signatures (using [[row-polymorphism]] for interface polymorphism), or a lightweight export-list mechanism extending what [[module-system]] already supports without full signatures.

Related: [[module-system]], [[structural-typing]], [[opaque-types]], [[nominal-identity]], [[typeclass-emulation]], [[customizable-data-types]].

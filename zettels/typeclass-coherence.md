---
tags:
- concept
- type-system
- inference
- solver
- elaboration
- exploration
- mechanism
- principle
- language
- speculative
- question
- concern
- normalization
- unification
refs:
- src: src/elaboration/solver/solver.ts
  note: "First-match implicit resolution semantics"
- session: e6fb44e5-9be1-41cd-a13d-0b6363cf0dec
  note: "Type system concepts exploration session"
---
# Typeclass coherence

The property that instance resolution is deterministic: for a given type and class, at most one instance exists. Haskell enforces global coherence. Scala and Rust have their own coherence stories.

Yap's [[implicit-resolution]] takes the first matching candidate in scope — essentially the same scoping rules as variables. This is well-understood behavior and pragmatically sufficient: the implicit in scope is the one you get. The semantics are the same as ordinary variable shadowing.

Coherence becomes a concern when structurally compatible [[implicits]] proliferate and resolution order produces surprising results. For now this is not a practical problem. A future coherence analysis could flag suspicious cases (multiple implicits of the same type in scope) as warnings, without changing the resolution semantics.

Distinct from explicit implicit application via `@`, which is a mechanism for choosing which implicit to apply — the `@` annotation means explicit application of an implicit argument, not a coherence override or selection mechanism. These are separate concepts (see [[implicits]], [[annotations]]).

Related: [[typeclass-emulation]], [[implicit-resolution]], [[implicit-resolution-solver]], [[implicits]], [[annotations]].

<!-- connections:start -->

## Connections

**Outgoing**
- APPLIES_TO → [[typeclass-emulation]] — Coherence concerns for implicit records
- APPLIES_TO → [[implicit-resolution]] — First-match semantics
- APPLIES_TO → [[implicit-resolution-solver]] — Solver selection policy
- CONTRASTS_WITH → [[ghc-influence]] — Haskell enforces global coherence

<!-- connections:end -->

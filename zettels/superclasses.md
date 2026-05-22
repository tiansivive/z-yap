---
tags:
- concept
- type-system
- inference
- exploration
- mechanism
- elaboration
- solver
- row-types
- language
- pattern
- speculative
- principle
- sugar
- dependent
refs:
- session: e6fb44e5-9be1-41cd-a13d-0b6363cf0dec
  note: "Type system concepts exploration session"
---
# Superclasses

In Haskell: `class Eq a => Ord a` — `Ord` implies `Eq`. When an `Ord` instance is in scope, `Eq` is automatically available.

In Yap's record-based [[typeclass-emulation]], superclass relationships are expressible as nested records or as functions. An `Ord` record can contain an `Eq` field; or a function `(using eq : Eq a) => Ord a` can thread the dependency. The encoding is a lambda — no dedicated mechanism needed.

The trade-off is ergonomic: explicit nesting requires the user to project out the superclass (`ord.eq`), while Haskell makes it implicit. Whether this friction matters in practice depends on how often superclass constraints appear in Yap code.

Automatic propagation ("if this implicit is in scope, these others are too") could be added as an [[implicit-resolution-solver]] feature without changing the type system — it would be an elaboration convenience, not a new type-formation mechanism. This connects to the broader question of how much the solver should infer versus how much the user should thread explicitly.

Related: [[typeclass-emulation]], [[typeclass-coherence]], [[implicit-resolution]], [[dictionary-passing]], [[implicits]].

---
tags:
- concept
- type-system
- syntax
- language
- row-types
- exploration
- needs-design
- speculative
- parser
- sugar
- principle
- structural
- elaboration
- inference
- pattern
refs:
- session: e6fb44e5-9be1-41cd-a13d-0b6363cf0dec
  note: "Type system concepts exploration session"
---
# Data declarations

Yap encodes all user-defined types structurally: variants (`| #tag payload`), records, and recursive types via `let Name : Type = ...`. There is no dedicated `data` keyword.

One approach would treat data declarations as sugar over structural rows. A declaration like `data List a = Nil | Cons a (List a)` could desugar to the existing `let List : Type -> Type = \a -> | #Nil Unit | #Cons { a, List a }`, gaining syntactic convenience without introducing a new type-formation mechanism.

This fits Yap's [[structural-typing]] philosophy: the underlying type is still a row, [[unification]] still works structurally, and [[row-polymorphism]] applies. Whether to later add specific semantics (scoped constructor names, closed-by-default variants) is a separate exploration.

The relationship between data declarations and [[nominal-identity]] is worth exploring but should not be conflated — sugar syntax over rows does not require nominal typing, and nominal typing does not require dedicated declaration syntax. How data declarations interact with [[open-closed-variants]] (inferring closed variants from complete declarations vs leaving row tails open) connects to [[exhaustiveness-checking]].

Related: [[variant-types]], [[structural-records]], [[rows-universal-substrate]], [[nominal-identity]], [[mu-types]], [[inductive-types]].

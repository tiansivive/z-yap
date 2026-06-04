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

<!-- connections:start -->

## Connections

**Outgoing**
- DESUGARS_TO → [[variant-types]] — Data decls are sugar over row variants
- DESUGARS_TO → [[structural-records]] — Product parts desugar to struct rows
- RELIES_ON → [[rows-universal-substrate]] — Desugars into row machinery
- USES → [[row-polymorphism]] — Structural identity via rows
- INFORMS → [[open-closed-variants]] — Data decl could default to closed
- INFORMS → [[nominal-identity]] — Sugar syntax does not require nominality
- COMPOSES_WITH → [[mu-types]] — Recursive data uses mu wrapping
- ENABLES → [[exhaustiveness-checking]] — Named constructors enable coverage
- CONTRASTS_WITH → [[nominal-typing]] — Structural sugar vs nominal declaration

**Incoming**
- [[inductive-types]] ← INFORMS — Constructor-based definition motivates data syntax
- [[nominal-identity]] ← INFORMS — Whether data decls carry nominal identity
- [[pattern-synonyms]] ← INFORMS — Pattern names supplement data decls
- [[open-closed-variants]] ← INFORMS — Data decls produce closed variants
- [[opaque-types]] ← COMPOSES_WITH — Opaque wrappers for data types
- [[row-types.thread]] ← INCLUDES

<!-- connections:end -->

---
tags:
- concept
- type-system
- recursion
- speculative
- needs-design
- exploration
- elaboration
- normalization
- verification
- pattern
- dependent
- language
- principle
- evaluation
- inference
refs:
- session: e6fb44e5-9be1-41cd-a13d-0b6363cf0dec
  note: "Type system concepts exploration session"
---
# Inductive types

Types defined by a finite set of constructors with a well-foundedness guarantee: every value is built from base cases in finitely many steps. The standard framework in Martin-Löf type theory, Agda, Coq, Lean, Idris.

Yap currently uses equirecursive [[mu-types]] with a step budget instead of a termination proof. Proper inductive types with [[termination-checking]] may be added in the future, but they depend on other features landing first — in particular, a more complete story for recursive types ([[bisimulation-type-equality]]), and likely [[data-declarations]] or some form of constructor scoping.

The gap matters for: [[verification]] (termination is unprovable without inductive structure), [[exhaustiveness-checking]] (can't guarantee coverage without a known constructor set), and optimization (finite data enables more aggressive compilation).

Whether Yap adopts full inductive types (à la Agda) or a lighter-weight termination-checked variant over [[equirecursive-types]] is an open exploration area. The tension is between expressiveness and Yap's philosophy of minimalism — full inductive types pull in [[indexed-families]], universe hierarchies, and strict positivity, all of which add significant complexity.

Related: [[mu-types]], [[equirecursive-types]], [[termination-checking]], [[data-declarations]], [[coinductivity]].

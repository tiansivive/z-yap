---
tags:
- concept
- type-system
- dependent
- elaboration
- hub
- implemented
- normalization
- unification
- syntax
- quantifiers
- inference
- ast
- row-types
- modality
---
# Dependent types (hub)

Types that may mention values — the organizing principle of Yap's type theory. A dependent type is one where the type of a later component can refer to the value of an earlier component: a function's return type can depend on its argument (Pi), a record field's type can depend on earlier fields (Sigma), a recursive type can refer to itself (Mu).

In Yap, dependent types are realized through several interlocking design decisions:

- **Unified binder**: All binder types (Pi, Sigma, Lambda, Mu, Let) share a single `Abs` node, discriminated by `binding.type`. See unified-binder for the rationale.
- **Types as terms**: Types and programs share the same syntax (EB.Term) and semantic domain (NF.Value). There is no separate type language. See types-as-terms.
- **Type : Type**: A single universe classifier with no hierarchy. See type-type.
- **NbE equality**: Definitional type equality is decided by normalizing both sides to NF.Value and comparing structurally via unification — not by name tables or nominal identity.

The dependent binder types:
- **Pi** — dependent function space (universal quantifier). See pi-types.
- **Sigma** — dependent record type (existential quantifier). See sigma-types.
- **Mu** — equirecursive types (self-reference). See mu-types.

Composition: dependent types interact with row polymorphism (dependent rows), modalities (graded domain multiplicities), and refinement types (liquid predicates on dependent function domains/codomains).

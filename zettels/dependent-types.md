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

<!-- connections:start -->

## Connections

**Outgoing**
- EXTENDS → [[system-f]] — Types that depend on values
- FORMS → [[pi-types]] — Universal quantification with dependency
- FORMS → [[sigma-types]] — Existential quantification with dependency
- NORMALIZES_TO → [[nf-value]] — Types compute as terms
- COMPOSES_WITH → [[row-polymorphism]] — Dependent rows
- ENABLES → [[type-type]] — Types live in same universe as terms
- RELIES_ON → [[unified-binder]] — All binders share Abs
- RELIES_ON → [[types-as-terms]] — Types and terms share syntax
- RELIES_ON → [[type-type]] — Single universe classifier
- INCLUDES → [[pi-types]] — Universal quantifier
- INCLUDES → [[sigma-types]] — Existential quantifier
- INCLUDES → [[mu-types]] — Recursive self-reference

**Incoming**
- [[yap]] ← USES — Pi types with value dependencies
- [[bidirectional-checking]] ← ENABLES — Natural fit for dependent types with annotations
- [[pi-types]] ← EXTENDS — Universal quantification with dependency
- [[sigma-types]] ← EXTENDS — Existential with row dependency
- [[type-type]] ← ENABLES — Types compute as terms
- [[type-type]] ← COMPOSES_WITH — Types in same universe
- [[types-as-terms]] ← RELIES_ON — Dependency required
- [[idris-2-influence]] ← INSPIRES — Dependent TT
- [[agda-influence]] ← INSPIRES — Dependent types
- [[sigma-bindings]] ← IMPLEMENTS — Field-to-field dependency
- [[nbe]] ← PRESERVES — Beta-eta equivalence
- [[lambda-synthesis-fix]] ← ADDRESSES — Dependent Pi return closure was capturing values not types
- [[sized-types]] ← EXTENDS — Size indices are dependent type params
- [[gadts]] ← EMULATES — Dependent types subsume GADT refinement
- [[indexed-families]] ← USES — Indices are dependent type params
- [[functional-dependencies]] ← USES — Expressed as dependent functions
- [[type-level-computation]] ← EXTENDS — Types computed from values
- [[dependent-pattern-matching]] ← USES — Types refined by pattern
- [[ast-pipeline]] ← RELIES_ON — Types-as-terms requires shared representation
- [[unified-binder]] ← ENABLES — Types and terms in one binder node

<!-- connections:end -->

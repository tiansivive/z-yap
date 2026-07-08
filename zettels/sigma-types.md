---
tags:
- concept
- type-system
- dependent
- row-types
- elaboration
- implemented
- normalization
- unification
- inference
- context
---
# Sigma types

Dependent record type — the existential quantifier in Yap's type theory. A Sigma type packages a row-typed witness together with a body type that can depend on the witness fields. This is how Yap types structural records with inter-field dependencies: later fields can reference earlier fields by label.

Sigma shares the `Abs` node with all other binders, discriminated by `binding.type === "Sigma"`. Checking a surface struct at Type produces a Sigma wrapping the row and a Schema body. The dual of Pi — Pi is universal (functions), Sigma is existential (records).

Sigma closures differ from Pi closures in how they handle substitution: the sigma body lives in an extended row context rather than a standard de Bruijn binder. Quoting applies the sigma closure to its annotation (the row) rather than bumping the de Bruijn level, because dependency flows through field labels, not positional binding.

Unification of Sigma types unifies annotations first, then applies each sigma closure to its annotation before unifying bodies. A special case relates Schema and Sigma by applying the sigma closure to the schema's row argument.

The label-reference mechanism that makes field-to-field dependency work at elaboration time is ctx.sigma — see sigma-bindings for that mechanism.

ctx.sigma is a flat map. Nested dependent records (a record whose field is itself a dependent record) require a sigma stack to properly scope inner field references — the flat map cannot distinguish inner from outer label bindings.

<!-- connections:start -->

## Connections

**Outgoing**
- EXTENDS → [[dependent-types]] — Existential with row dependency
- USES → [[row-polymorphism]] — Row-backed dependent records
- FORMS → [[structural-records]] — Σ forms dependent record types
- COMPOSES_WITH → [[variant-types]] — Dependent elimination produces variants
- RELIES_ON → [[sigma-bindings]] — ctx.sigma provides field references

**Incoming**
- [[pi-types]] ← DUAL_OF — Universal vs existential
- [[pi-types]] ← COMPOSES_WITH — Dependent function returning dependent record
- [[refinement-types]] ← COMPOSES_WITH — :fst in predicates
- [[projection]] ← ELIMINATES — Dependent field access
- [[missing-spec-sigma-types]] ← IMPLEMENTS — No spec formalization
- [[sigma-bindings]] ← APPLIES_TO — Σ field dependency
- [[unification-algorithm]] ← IMPLEMENTS — Sigma-Sigma equality checking case
- [[sigma-bindings]] ← IMPLEMENTS — Dependent field references
- [[dependent-types]] ← FORMS — Existential quantification with dependency
- [[dependent-pattern-matching]] ← RELIES_ON — Dependent pairs carry evidence
- [[unified-binder]] ← APPLIES_TO — Sigma uses Abs with binding.type Sigma
- [[standard-closure]] ← ENABLES — Sigma bodies are standard closures
- [[dependent-types]] ← INCLUDES — Existential quantifier
- [[type-type]] ← ENABLES — Row types classified by Type
- [[sigma-quoting-match]] ← APPLIES_TO — Sigma body quoting
- [[sigma-quoting-field-ref]] ← APPLIES_TO — Field ref substitution
- [[sigma-architecture]] ← DETAILS — Two-step row abstraction mechanics
- [[sigma-value-semantics]] ← DETAILS — Clarifies field ref semantics
- [[singleton-types]] ← COMPOSES_WITH — Singleton + sigma interaction
- [[sigma-checking-infer-constrain]] ← APPLIES_TO — Affects sigma checking
- [[sigma-vs-codata-label-refs]] ← DETAILS — Sigma side of the duality
- [[sigma-codata-syntax-proposal]] ← APPLIES_TO — Sigma sigil
- [[verification-label-scope]] ← APPLIES_TO — Record boundaries opened during checking and subtyping

<!-- connections:end -->

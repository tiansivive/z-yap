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

Known limitation: ctx.sigma is a flat map. Nested row types (a record whose field is itself a dependent record) would need a sigma stack to properly scope inner field references.

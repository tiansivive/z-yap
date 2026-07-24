---
tags:
- concept
- type-system
- dependent
- row-types
- elaboration
- normalization
- closure
- ast
- principle
- implemented
---
# Sigma architecture: row abstraction via closure

Sigma types in Yap are abstractions over rows. A sigma type `Σ($sig: Row). Body` captures a row as its binder annotation and a body (always a Schema) that can reference fields from that row by label. The two-step mechanics:

1. **Formation**: checking a struct literal at `Type` produces `Σ($sig: [field₁: T₁, field₂: T₂, ...]). Schema [field₁: T₁, field₂: T₂, ...]`. The row appears in both binder annotation and body. Field references like `:field₁` in other field positions create dependencies — the body Schema carries those references as label variables.

2. **Application**: when a concrete struct is checked against the sigma type, the closure is applied with the struct's value row. `extendSigmaEnv` populates `ctx.sigma` with each field's concrete value. The body evaluates with label references resolving to those values, yielding a concrete Schema type against which the struct is then checked.

This differs from Pi/Lambda/Forall abstractions, which bind a single positional variable via de Bruijn indices. Sigma binds a *row of labels* — dependency flows through named field lookups into `ctx.sigma`, not through de Bruijn variable resolution. The binder variable `$sig` is phantom; it exists to satisfy the `Abs` node shape but carries no de Bruijn semantics.

Sharing the `Abs` node with Pi/Lambda is intentional: sigma needs closure capture for the body to remain unevaluated until a concrete row is provided. The closure mechanism is standard — only the substitution path (row-of-labels vs single variable) is non-standard.

The flat row representation means fields have no intrinsic ordering — `{ a: :b, b: :a }` is a valid row, analogous to mutually recursive definitions in a module. Whether such definitions are semantically meaningful is the user's responsibility; the type system supports them. Standard sigma implementations use telescopic binding order (each field sees only prior fields); Yap's flat rows with label-based lookup side-step this restriction.

<!-- connections:start -->

## Connections

**Outgoing**
- DETAILS → [[sigma-types]] — Two-step row abstraction mechanics
- DETAILS → [[sigma-bindings]] — How ctx.sigma implements the abstraction
- RELIES_ON → [[standard-closure]] — Reuses closure capture from Abs
- CONTRASTS_WITH → [[pi-types]] — Row-of-labels vs single de Bruijn variable
- APPLIES_TO → [[unified-binder]] — Why sigma shares the Abs node

**Incoming**
- [[sigma-quoting-field-ref]] ← GROUNDED_IN — Symbolic row mirrors Pi's Rigid(lvl) in the two-step architecture
- [[sigma-quoting-match]] ← GROUNDED_IN — StuckMatch requires symbolic neutrals from the row abstraction
- [[nested-refinement-outer-label-capture.bug]] ← RELIES_ON — Nested Sigma dependencies are represented by closure capture

<!-- connections:end -->

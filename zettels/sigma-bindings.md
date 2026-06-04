---
tags:
- mechanism
- elaboration
- dependent
- row-types
- context
- implemented
- inference
- normalization
- unification
- type-system
---
# Sigma bindings (ctx.sigma)

The elaboration mechanism that makes dependent field references work in structural records. When elaborating a row (struct or schema), each field's value is registered in `ctx.sigma` — a map from label names to their elaborated term, normal form, annotation, and multiplicity. Subsequent fields can then reference earlier fields by `:label` syntax, which resolves through ctx.sigma during variable lookup.

Population happens via `extendSigma`, called during row inference and struct inference. The `inSigmaContext` helper extracts row bindings and extends the sigma context before running elaboration of the row body, threading the extended context through the V2 monad's local scope.

NbE reads ctx.sigma for label variables during evaluation: `extendSigmaEnv` merges row values into the sigma context when reducing struct/schema-like values, enabling dependent computation at the type level.

ctx.sigma is a flat map keyed by label. Nested dependent records (a record with a field that is itself a dependent record) cannot properly scope inner field references without shadowing outer ones. The resolution is a sigma stack — scoped context frames rather than a single flat namespace.

<!-- connections:start -->

## Connections

**Outgoing**
- IMPLEMENTS → [[dependent-types]] — Field-to-field dependency
- APPLIES_TO → [[structural-records]] — Record field references
- APPLIES_TO → [[sigma-types]] — Σ field dependency
- INSTANTIATES → [[meta-variables]] — Fresh metas per field
- THREADS_THROUGH → [[elaboration-context]] — ctx.sigma map
- IMPLEMENTS → [[sigma-types]] — Dependent field references
- ENABLES → [[structural-records]] — Field-to-field dependency
- IMPLEMENTS → [[typing-rules]] — Sigma typing (impl ahead of spec)
- RELIES_ON → [[elaboration-context]] — ctx.sigma is a context component
- ENABLES → [[nbe]] — extendSigmaEnv for label vars during eval

**Incoming**
- [[label-lookup]] ← USES — :label → sigma entry
- [[label-lookup]] ← RESOLVES — Label references
- [[sigma-types]] ← RELIES_ON — ctx.sigma provides field references
- [[quoting]] ← RELIES_ON — Sigma applies annotation not fresh rigid
- [[variable-evaluation-dispatch]] ← RELIES_ON — Label variables → ctx.sigma
- [[sigma-quoting-match]] ← RELIES_ON — Sigma binding strategy
- [[sigma-quoting-field-ref]] ← RELIES_ON — Same binding strategy
- [[sigma-architecture]] ← DETAILS — How ctx.sigma implements the abstraction
- [[sigma-checking-infer-constrain]] ← APPLIES_TO — Sigma apply in check path

<!-- connections:end -->

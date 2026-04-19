---
tags: [concept, type-system, mechanism, elaboration]
---
# Bidirectional Type Checking

A type inference strategy with two modes:
- **Infer (synthesis)** — bottom-up: given a term, produce its type
- **Check** — top-down: given a term and an expected type, verify compatibility

The key insight: some terms are easy to infer (variables, applications, annotations) while others need guidance (lambdas, literals in polymorphic contexts). Bidirectional checking routes each case to the appropriate mode.

In yap, the [[elaboration]] pipeline dispatches by term shape at the top level, then by type shape within modules. `check` pushes expected types inward; `infer` synthesises and unifies when checking fails.

Natural fit for [[dependent-types|dependent types]] — annotations provide the type information that cannot be inferred from structure alone.

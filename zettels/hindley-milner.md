---
tags: [concept, type-system, mechanism]
---
# Hindley-Milner Type Inference

A classical type inference system for the polymorphic lambda calculus (ML family).

Key properties:
- **Principal types** — every well-typed expression has a most-general type inferred automatically
- **Let-polymorphism** — generalization at let-bindings introduces universal quantification
- **Unification** — constraint solving via Robinson's algorithm
- **Decidable** — inference is complete and terminates (for rank-1)

Yap extends HM with:
- Row variables and [[row-unification]] ([[structural-typing|structural types]])
- [[dependent-types|Dependent types]] (Pi binders with value dependencies)
- [[bidirectional-checking|Bidirectional checking]] (annotations guide where inference falls short)
- Deferred [[constraint-solving]] (constraints collected during inference, solved per let-binding)

The foundation remains: unification-based constraint solving with generalization at binding sites.

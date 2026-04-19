---
tags: [concept, type-system]
---
# System F

System F (Girard 1971, Reynolds 1974) extends the simply typed lambda calculus with universal quantification over types:

```
Λa. λx:a. x   : ∀a. a → a   (polymorphic identity)
```

Key concepts:
- **Rank-1** — ∀ appears only at the top level; the fragment that HM inference covers
- **Higher-rank** — ∀ can appear nested in arguments; requires annotations
- **Impredicativity** — type variables can be instantiated to polymorphic types

Yap's parametric polymorphism builds on System F, extended with [[dependent-types|dependent types]] (Pi binders where the codomain references the domain variable). This goes beyond System F into the lambda cube — specifically, types depending on values.

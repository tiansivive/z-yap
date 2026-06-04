---
tags:
- concept
- type-system
- dependent
- exploration
- reference
- speculative
- normalization
- elaboration
- row-types
- inference
- language
- principle
- question
- evaluation
refs:
- title: "Type Families in Haskell"
  authors: Chakravarty, Keller, Peyton Jones, Marlow
  year: 2005
  url: https://doi.org/10.1145/1090189.1086383
- title: "Closed Type Families with Overlapping Equations"
  authors: Eisenberg, Vytiniotis, Peyton Jones, Weirich
  year: 2014
  url: https://doi.org/10.1145/2535838.2535856
- session: e6fb44e5-9be1-41cd-a13d-0b6363cf0dec
  note: "Type system concepts exploration session"
---
# Type families

Haskell/GHC feature: type-level functions defined by equations, evaluated during type checking. Open type families allow post-hoc extension; closed type families are defined in one place.

Yap's [[dependent-types]] subsume closed type families: a function `Type -> Type` reduced by [[nbe]] achieves the same effect. The interesting question is whether open type families — adding new type-level equations without modifying the original definition — can be reproduced using Yap's existing mechanisms.

One path: open variants at the type level. A type family `F` is an open variant of type equations; extending it means injecting a new case. This interacts with how Yap handles [[row-polymorphism]] and open rows at the type level (see [[type-level-computation]]).

The exploration is less about adding type families as a feature and more about understanding the capabilities they provide and how Yap's type system can or cannot express them. Trade-offs include decidability of type-level reduction, coherence of overlapping type-level cases, and whether the ergonomics of `let F : Type -> Type = ...` are sufficient for the use cases type families serve.

Related: [[type-level-computation]], [[dependent-types]], [[functional-dependencies]], [[nbe]], [[row-polymorphism]], [[open-closed-variants]].

<!-- connections:start -->

## Connections

**Outgoing**
- EMULATES → [[type-level-computation]] — Type families as type-level functions
- CONTRASTS_WITH → [[type-level-computation]] — Separate mechanism vs unified terms
- USES → [[nbe]] — Type-level reduction via evaluation
- INFORMS → [[type-level-computation]] — Capabilities Yap should reproduce
- COMPOSES_WITH → [[open-closed-variants]] — Open type families as open rows
- INFORMS → [[functional-dependencies]] — Overlapping solution space
- INFORMS → [[ghc-influence]] — GHC's primary type-level mechanism
- INFORMS → [[ghc-influence]] — GHC's type families

**Incoming**
- [[type-level-computation]] ← SUBSUMES — Dependent functions subsume closed families
- [[open-closed-variants]] ← COMPOSES_WITH — Open families as open rows

<!-- connections:end -->

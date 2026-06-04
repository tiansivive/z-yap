---
tags:
- concept
- type-system
- dependent
- pattern
- exploration
- reference
- paper
- principle
- language
- elaboration
- inference
- speculative
- question
- unification
refs:
- title: "Guarded Recursive Datatype Constructors"
  authors: Xi, Chen, Chen
  year: 2003
  url: https://doi.org/10.1145/604131.604150
- title: "Polymorphic Typed Defunctionalization and Concretization"
  authors: Pottier, Gauthier
  year: 2004
  url: https://doi.org/10.1007/978-3-540-24725-8_19
- title: "First-Class Phantom Types"
  authors: Cheney, Hinze
  year: 2003
  url: https://doi.org/10.1007/978-3-540-45070-6_16
- session: e6fb44e5-9be1-41cd-a13d-0b6363cf0dec
  note: "Type system concepts exploration session"
---
# GADTs

Generalized Algebraic Data Types: constructors can refine type indices. `VCons : a -> Vec n a -> Vec (n+1) a` — matching on `VCons` learns `n = k+1`.

In a dependently typed language like Yap, GADTs are likely subsumable. Yap already has [[dependent-types]] and can encode length-indexed vectors via [[sigma-types]] and refinements. The automatic type refinement that GADTs provide in pattern matching is essentially [[dependent-pattern-matching]] — an active exploration area in Yap, with or without a dedicated GADT surface form.

Yap's philosophy favors minimal surface area: a dedicated GADT mechanism is worth exploring only where [[dependent-types]] alone lack ergonomics. Since dependent types are more general than GADTs, one approach would be to invest in [[dependent-pattern-matching]] and [[exhaustiveness-checking]] rather than a separate GADT elaboration path.

The subsumption is not free — GADTs in Haskell come with a well-engineered elaboration story (OutsideIn(X), constraint-based inference) that handles the common cases ergonomically. Reproducing that ergonomics in a dependent setting requires solving [[dependent-pattern-matching]] and [[exhaustiveness-checking]], which are the harder problems.

Related: [[dependent-types]], [[dependent-pattern-matching]], [[indexed-families]], [[inductive-types]], [[exhaustiveness-checking]].

<!-- connections:start -->

## Connections

**Outgoing**
- SPECIALIZES → [[indexed-families]] — GADTs are a special case of indexed families
- RELIES_ON → [[dependent-pattern-matching]] — Constructor matching refines indices
- EMULATES → [[dependent-types]] — Dependent types subsume GADT refinement
- USES → [[unification]] — Index unification during matching
- INFORMS → [[exhaustiveness-checking]] — Impossible branches via index constraints
- INFORMS → [[ghc-influence]] — GHC's GADT extension

**Incoming**
- [[dependent-pattern-matching]] ← COMPOSES_WITH — GADT matching is dependent matching

<!-- connections:end -->

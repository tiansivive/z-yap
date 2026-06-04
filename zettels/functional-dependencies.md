---
tags:
- concept
- type-system
- inference
- exploration
- reference
- dependent
- speculative
- solver
- elaboration
- normalization
- mechanism
- language
- question
- evaluation
refs:
- title: "Type Classes with Functional Dependencies"
  authors: Jones
  year: 2000
  url: https://doi.org/10.1007/3-540-46425-5_15
- session: e6fb44e5-9be1-41cd-a13d-0b6363cf0dec
  note: "Type system concepts exploration session"
---
# Functional dependencies

Haskell typeclass feature: declare that some type parameters determine others. `class C a b | a -> b` means knowing `a` fixes `b`. Guides inference when multiple parameters are involved.

In a dependently typed setting, the functional dependency `a -> b` is expressible as a dependent function `(a : Type) -> Type` that computes `b` from `a`. The question is whether this is ergonomic enough to serve the same role in practice, or whether the [[implicit-resolution]] mechanism needs its own notion of determinacy.

The interaction with Yap's implicit search is relevant: if an implicit record has type `C a b` and the [[implicit-resolution-solver]] knows `a`, can it determine `b` via the dependent type? This would require the solver to evaluate dependent functions during resolution — which it may already do through [[nbe]], but the ergonomics and error messages differ from Haskell's fundep story.

Understanding how [[dependent-types]] subsume functional dependencies is part of the broader exploration of what [[type-families]] and fundeps achieve in Haskell and how Yap's type system reproduces those capabilities without dedicated mechanisms (see [[type-level-computation]]).

Related: [[type-families]], [[type-level-computation]], [[implicit-resolution]], [[implicit-resolution-solver]], [[dependent-types]], [[typeclass-emulation]].

<!-- connections:start -->

## Connections

**Outgoing**
- EMULATES → [[type-level-computation]] — Determinacy via dependent functions
- CONTRASTS_WITH → [[type-level-computation]] — Annotation vs computation
- INFORMS → [[implicit-resolution]] — Determinacy in implicit search
- INFORMS → [[implicit-resolution-solver]] — Solver determinacy
- COMPOSES_WITH → [[typeclass-emulation]] — Fundeps on implicit records
- USES → [[dependent-types]] — Expressed as dependent functions
- INFORMS → [[ghc-influence]] — GHC's fundeps

**Incoming**
- [[type-families]] ← INFORMS — Overlapping solution space

<!-- connections:end -->

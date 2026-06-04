---
tags:
- concept
- type-system
- recursion
- speculative
- needs-design
- elaboration
- normalization
- unification
- exploration
- principle
- language
- dependent
- evaluation
refs:
- title: "Copatterns: Programming Infinite Structures by Observations"
  authors: Abel, Pientka, Thibodeau, Setzer
  year: 2013
  url: https://doi.org/10.1145/2480359.2462233
- title: "A Categorical Approach to Data Types"
  authors: Hagino
  year: 1987
- title: "Subtyping Recursive Types"
  authors: Amadio, Cardelli
  year: 1993
  url: https://doi.org/10.1145/155183.155231
---
# Coinductivity (hub)

Dual of induction: where inductive types are defined by constructors (how to build), coinductive types are defined by observations (how to consume). Inductive data is finite and must terminate; coinductive data can be infinite and must be productive.

Yap has explored coinductivity through the idea of a `nu` abstraction for recursive data. The approach avoids a finite/infinite distinction at the type level — [[nu-types]] would handle recursive data using the same [[unification]] and [[nbe]] machinery as [[mu-types]], with the semantic distinction being that `nu` wraps coinductive (potentially infinite) data while `mu` wraps inductive (well-founded) data.

The conceptual foundation draws from [[codata]]: types defined by observations rather than constructors. Copatterns — defining functions by what each observation returns — are the natural elimination form. Whether Yap's [[structural-records]] (already defined by projections, i.e. observations) plus `nu` already capture codata semantics, or whether copatterns add something that records-as-observations miss, is an open question.

Coinductivity also connects to [[bisimulation-type-equality]]: bisimulation is itself a coinductive proof method — two recursive types are equal when they produce the same observations at every step.

Hub: [[nu-types]], [[codata]], [[bisimulation-type-equality]], [[productivity-checking]].

<!-- connections:start -->

## Connections

**Outgoing**
- DUAL_OF → [[inductive-types]] — Coinduction is the dual of induction
- INFORMS → [[nu-types]] — Nu abstraction is Yap's coinductivity mechanism
- USES → [[bisimulation-type-equality]] — Bisimulation is a coinductive proof method
- EXTENDS → [[recursion.thread]] — Coinductivity extends the recursion story
- INFORMS → [[agda-influence]] — Agda's coinductive types

**Incoming**
- [[inductive-types]] ← DUAL_OF — Coinduction is the dual of induction
- [[codata]] ← INFORMS — Observation-defined types ground coinductivity
- [[bisimulation-type-equality]] ← USES — Bisimulation is itself coinductive
- [[productivity-checking]] ← APPLIES_TO — Static guarantee for coinductive data
- [[recursion.thread]] ← INCLUDES — Coinductivity is part of recursion thread
- [[codata-vs-coinductive-types]] ← DETAILS — Coinductive type theory side

<!-- connections:end -->

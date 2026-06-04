---
tags:
- concept
- type-system
- recursion
- unification
- needs-design
- normalization
- elaboration
- solver
- mechanism
- exploration
- principle
- evaluation
- dependent
- inference
- goal
refs:
- title: "Subtyping Recursive Types"
  authors: Amadio, Cardelli
  year: 1993
  url: https://doi.org/10.1145/155183.155231
- title: "Coinductive Axiomatization of Recursive Type Equality and Subtyping"
  authors: Brandt, Henglein
  year: 1998
  url: https://doi.org/10.1007/BFb0053558
- title: "Types and Programming Languages"
  authors: Pierce
  year: 2002
  note: "Chapter 21: equirecursive types"
- src: src/elaboration/unification/unification.ts
  note: "Current mu-unfolding heuristics in unify"
---
# Bisimulation-based type equality

Equirecursive type equality via bisimulation: two recursive types are equal if their infinite unfoldings are bisimilar — they produce the same observations at every step. This gives a complete decision procedure for equirecursive equality.

Current Yap approach: ad-hoc `mu`-unfolding in [[unification]] (unfold one side when comparing mu vs non-mu). Moving to bisimulation-based equality is a goal — it would replace the current unfolding heuristics with a principled algorithm.

Bisimulation is itself a coinductive method, connecting this to [[nu-types]] and [[coinductivity]]. The algorithms are well-understood: Amadio & Cardelli (1993) give the subtyping case; Brandt & Henglein (1998) give an efficient coinductive algorithm; Pierce TAPL ch. 21 surveys the space.

Trade-off: bisimulation is more complete but more expensive than syntactic unfolding. The current approach works for common cases; bisimulation would handle corner cases (e.g. structurally equal types reached via different unfolding paths). The gap is documented in [[equirecursive-types]]: no separate bisimulation module exists yet.

Related: [[equirecursive-types]], [[mu-types]], [[nu-types]], [[coinductivity]], [[nbe]].

<!-- connections:start -->

## Connections

**Outgoing**
- ADDRESSES → [[equirecursive-types]] — Principled equality for recursive types
- EXTENDS → [[unification]] — Would replace ad-hoc mu unfolding
- USES → [[coinductivity]] — Bisimulation is itself coinductive
- USES → [[nbe]] — Unfolding via evaluation
- ADDRESSES → [[mu-types]] — Proper equality for mu-wrapped types
- INFORMS → [[nu-types]] — Foundation for nu type equality

**Incoming**
- [[coinductivity]] ← USES — Bisimulation is a coinductive proof method
- [[nu-types]] ← RELIES_ON — Nu equality needs bisimulation
- [[inductive-types]] ← RELIES_ON — Needs proper recursive equality first
- [[recursion.thread]] ← RELIES_ON — Concept: coinductive type equality
- [[design-bisimulation-equality]] ← ADDRESSES — Design task for the concept

<!-- connections:end -->

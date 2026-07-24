---
tags:
- concept
- type-system
- dependent
- pattern
- needs-design
- exploration
- elaboration
- unification
- inference
- problem
- question
- speculative
- normalization
- language
- solver
refs:
- session: e6fb44e5-9be1-41cd-a13d-0b6363cf0dec
  note: "Type system concepts exploration session"
---
# Dependent pattern matching (hub)

Pattern matching where matching on a constructor refines type indices in the context. Matching on `VCons x xs` where the scrutinee has type `Vec (S n) a` should refine `n` to `S n` in the branch body.

[[match]] elaboration today infers arms against a shared result type without refining downstream variable types from the scrutinee shape. Limited dependent matching exists (`match b | true -> Num | false -> String`); full index refinement under constructors is the open design space.

Possible approaches include [[with-abstraction]] (Agda-style), elaboration to eliminators (Coq-style), or [[case-tree-elaboration]] (Idris/Lean-style). It's not clear which approach fits Yap's philosophy best, or whether a lighter-weight solution exists that handles the common cases without the full machinery.

Dependent pattern matching intersects [[exhaustiveness-checking]], [[unification]], [[sigma-types]], and the evaluator. It may be that Yap never fully implements it, instead relying on explicit proofs or refinement-based narrowing for the cases where it matters. The question is one of pragmatics: how often do Yap programs need type-refined branches, and what is the minimal machinery that covers those cases?

Hub: [[with-abstraction]], [[case-tree-elaboration]], [[match]], [[exhaustiveness-checking]], [[gadts]].

<!-- connections:start -->

## Connections

**Outgoing**
- EXTENDS → [[match]] — Adds type refinement to matching
- REQUIRES → [[unification]] — Index unification during matching
- RELIES_ON → [[sigma-types]] — Dependent pairs carry evidence
- INFORMS → [[exhaustiveness-checking]] — Refined types affect coverage
- USES → [[dependent-types]] — Types refined by pattern
- RELIES_ON → [[nbe]] — Evaluate types under refinement
- COMPOSES_WITH → [[gadts]] — GADT matching is dependent matching
- INFORMS → [[agda-influence]] — Agda's DPM
- INFORMS → [[idris-2-influence]] — Idris 2's DPM

**Incoming**
- [[gadts]] ← RELIES_ON — Constructor matching refines indices
- [[indexed-families]] ← RELIES_ON — Index-refined matching
- [[with-abstraction]] ← ADDRESSES — User-directed type refinement
- [[case-tree-elaboration]] ← ADDRESSES — Compiler-directed type refinement
- [[exhaustiveness-checking]] ← INFORMS — Refined types affect coverage
- [[pattern-matching.thread]] ← INCLUDES
- [[maplist-schema-unification]] ← APPLIES_TO — Scrutinee narrowing preserved by fix
- [[neutral-semantics-dependent-regression.bug]] ← REGRESSES — Misclassified symbolic scrutinees select match branches prematurely

<!-- connections:end -->

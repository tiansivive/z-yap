---
tags:
- concept
- type-system
- dependent
- pattern
- exploration
- reference
- paper
- elaboration
- mechanism
- speculative
- language
- syntax
- unification
- inference
refs:
- title: "Towards a practical programming language based on dependent type theory"
  authors: Norell
  year: 2007
  url: https://doi.org/10.5555/1352128
- title: "The View from the Left"
  authors: McBride, McKinna
  year: 2004
  url: https://doi.org/10.1017/S0956796803004829
- session: e6fb44e5-9be1-41cd-a13d-0b6363cf0dec
  note: "Type system concepts exploration session"
---
# With-abstraction

Agda's mechanism for dependent pattern matching on intermediate expressions. `with f x ... | p = ...` abstracts over the result of `f x` and matches on it, propagating type equalities into the branch context.

With-abstraction is the primary mechanism that makes [[dependent-pattern-matching]] work in Agda — it allows the type checker to see that a match result constrains other types in scope. Without it, dependent matching requires explicit `subst`/`rewrite` proofs.

One of several approaches to the [[dependent-pattern-matching]] problem. Alternatives include elaboration to eliminators (Coq-style) and [[case-tree-elaboration]] (Idris/Lean-style). Each has different trade-offs in expressiveness, ergonomics, and implementation complexity. With-abstraction is user-directed (the programmer chooses what to abstract over), while [[case-tree-elaboration]] is compiler-directed (the elaborator decides how to split).

The mechanism could interact with Yap's existing [[match]] syntax: a `with` clause inside a match arm that introduces additional scrutinees whose types refine the context.

Related: [[dependent-pattern-matching]], [[case-tree-elaboration]], [[match]], [[agda-influence]], [[unification]].

<!-- connections:start -->

## Connections

**Outgoing**
- ADDRESSES → [[dependent-pattern-matching]] — User-directed type refinement
- CONTRASTS_WITH → [[case-tree-elaboration]] — User-directed vs compiler-directed
- EXTENDS → [[match]] — Additional scrutinees in match arms
- INFORMS → [[agda-influence]] — Agda's primary DPM mechanism
- USES → [[unification]] — Type equalities from with-matching
- INFORMS → [[agda-influence]] — Agda's with mechanism

**Incoming**
- [[case-tree-elaboration]] ← CONTRASTS_WITH — Compiler-directed vs user-directed
- [[pattern-matching.thread]] ← INCLUDES

<!-- connections:end -->

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
- compiler
- unification
- inference
- language
refs:
- title: "Idris, a general-purpose dependently typed programming language: Design and implementation"
  authors: Brady
  year: 2013
  url: https://doi.org/10.1017/S095679681300018X
- title: "The Lean Theorem Prover (system description)"
  authors: de Moura, Kong, Avigad, van Doorn, von Raumer
  year: 2015
  url: https://doi.org/10.1007/978-3-319-21401-6_26
- session: e6fb44e5-9be1-41cd-a13d-0b6363cf0dec
  note: "Type system concepts exploration session"
---
# Case-tree elaboration

Approach to [[dependent-pattern-matching]] where the elaborator builds a decision tree that tracks type equalities at each branch point. Used by Idris 2 and Lean 4. Pattern clauses elaborate into a case tree where each split unifies constructor indices with type variables, propagating equalities into sub-trees.

Contrast with Agda's [[with-abstraction]] (user-directed) and Coq's elimination principles (proof-term-directed). Case-tree elaboration is compiler-directed: the elaborator decides how to split, and the user writes flat pattern clauses.

Advantages: user doesn't need to think about with-abstractions or elimination order. Disadvantages: the elaborator must solve [[unification]] problems during case splitting, which can fail in non-obvious ways.

This connects to Yap's existing [[pattern-matching-compilation]]: the Maranget-style decision trees in lowering are operational (choosing branches efficiently), while case-tree elaboration is semantic (propagating type equalities). A dependent Yap might need both — case trees for type checking, decision trees for code generation.

Related: [[dependent-pattern-matching]], [[with-abstraction]], [[pattern-matching-compilation]], [[pattern-algorithm-choice]], [[idris-2-influence]], [[lean-4-influence]].

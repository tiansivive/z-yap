---
tags:
- concept
- type-system
- dependent
- recursion
- exploration
- reference
- speculative
- principle
- elaboration
- normalization
- language
- pattern
- inference
- unification
- question
refs:
- session: e6fb44e5-9be1-41cd-a13d-0b6363cf0dec
  note: "Type system concepts exploration session"
---
# Indexed families

Inductive types parameterized by indices that vary across constructors — the general form of which [[gadts]] are a special case. In Agda: `data Vec (A : Set) : Nat → Set where ...`.

Closely related to [[inductive-types]]. What indexed families enable — [[dependent-pattern-matching]], structural recursion with termination, unification of indices — overlaps Yap's active exploration areas whether or not indexed families appear as a dedicated surface form.

The complexity cost is significant: indexed families interact with universe hierarchies (which are an anti-goal for Yap's [[type-type]] design), strict positivity checking, and a notion of strict constructor form. These interact poorly with Yap's `Type : Type` and [[equirecursive-types]].

As knowledge: indexed families are the gold standard for dependently typed data in the Martin-Löf tradition. Yap's challenge is reproducing the useful capabilities (type-refined matching, termination) without the complexity overhead, using the structural row-based machinery ([[rows-universal-substrate]]) that already exists.

Related: [[inductive-types]], [[gadts]], [[dependent-types]], [[dependent-pattern-matching]], [[type-type]], [[equirecursive-types]].

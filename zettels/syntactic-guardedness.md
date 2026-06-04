---
tags:
- concept
- type-system
- recursion
- exploration
- speculative
- reference
- paper
- verification
- mechanism
- normalization
- elaboration
- principle
- language
- evaluation
refs:
- title: "Codifying Guarded Definitions with Recursive Schemes"
  authors: Giménez
  year: 1995
  url: https://doi.org/10.1007/3-540-60579-7_3
- title: "Infinite Objects in Type Theory"
  authors: Coquand
  year: 1994
  url: https://doi.org/10.1007/3-540-57826-9_125
- session: e6fb44e5-9be1-41cd-a13d-0b6363cf0dec
  note: "Type system concepts exploration session"
---
# Syntactic guardedness

Coq-style approach to ensuring termination (inductive) and productivity (coinductive): recursive calls must appear in structurally decreasing positions (for termination) or under constructors (for productivity). Checked syntactically by inspecting the definition's structure.

Simpler to implement than [[sized-types]]: a single syntactic pass over the definition body. But less expressive — rejects some programs that are actually terminating/productive because the syntactic criterion is conservative.

Trade-offs versus [[sized-types]]: syntactic guardedness is easier to understand, easier to implement, and gives clearer error messages, but blocks more valid programs. Sized types handle mutual recursion and higher-order recursion better.

Whether Yap would adopt syntactic guardedness, [[sized-types]], or some hybrid depends on how [[inductive-types]] and [[nu-types]] are eventually designed. A minimal approach might start with syntactic guardedness for its simplicity and upgrade to sized types if the restrictions prove too limiting.

Related: [[sized-types]], [[termination-checking]], [[productivity-checking]], [[inductive-types]], [[nu-types]], [[equirecursive-types]].

<!-- connections:start -->

## Connections

**Outgoing**
- ADDRESSES → [[productivity-checking]] — Syntactic criterion for productivity
- ADDRESSES → [[termination-checking]] — Syntactic criterion for termination
- CONTRASTS_WITH → [[sized-types]] — Simpler but less expressive
- APPLIES_TO → [[inductive-types]] — Structural decrease for induction
- APPLIES_TO → [[nu-types]] — Constructor guarding for coinduction
- INFORMS → [[agda-influence]] — Agda's guardedness checker

**Incoming**
- [[productivity-checking]] ← RELIES_ON — Alternative approach to productivity
- [[sized-types]] ← CONTRASTS_WITH — More expressive but more complex
- [[recursion.thread]] ← INCLUDES

<!-- connections:end -->

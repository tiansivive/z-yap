---
tags: [concept, type-system, mechanism]
---
# Structural Subtyping

A subtyping discipline where compatibility is determined by structure rather than declared names. A type A is a subtype of B if A has at least the members B requires.

Yap does NOT use structural subtyping. Its structural flexibility comes from [[row-polymorphism]] (parametric quantification) rather than implicit coercion. Contrasts with [[nominal-subtyping]]. This zettel exists for contrast and reference.

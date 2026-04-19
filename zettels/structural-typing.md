---
tags: [concept, type-system, mechanism]
---
# Structural Typing

A type discipline where type equivalence and compatibility are determined by structure (fields, methods, shape) rather than declared name. Two types with identical structure are interchangeable regardless of what they're called.

Encompasses two related concepts:
- **Structural equivalence** — symmetric: two types are the same if they have the same structure
- **[[structural-subtyping|Structural subtyping]]** — asymmetric: a type with more features can substitute for one with fewer

In practice, 'structural typing' and 'structural subtyping' are often used interchangeably. The distinction matters in type theory: equivalence is symmetric, subtyping is directional.

Yap uses structural typing via rows — type identity is determined by row structure. It does NOT use [[structural-subtyping|structural subtyping]]; flexibility comes from [[row-polymorphism|row polymorphism]] instead. Contrasts with [[nominal-typing|nominal typing]].

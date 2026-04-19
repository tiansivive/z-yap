---
tags: [project, language]
---
# Yap

A small dependently typed language with structural types, implicits, and code verification semantics via modalities (QTT-based multiplicities and liquid type refinements).

Key properties:
- **[[structural-typing|Structural types]] via rows** — structs, tuples, variants, arrays are all row-based
- **[[row-polymorphism|Row polymorphism]]** — parametric quantification over row tails, no subtyping
- **[[dependent-types|Dependent types]]** — Pi types with value dependencies
- **[[bidirectional-checking|Bidirectional inference]]** — infer synthesises, check pushes expected types inward
- **[[nbe|NbE]]** — definitional equality via normalisation by evaluation
- **QTT multiplicities** — resource tracking via quantitative type theory
- **Liquid refinements** — verification via SMT (Z3)

The compiler pipeline: Parser → [[elaboration|Elaboration]] → Normalization → Verification → Lowering (MIR).

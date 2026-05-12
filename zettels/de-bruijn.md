---
tags: [mechanism, concept, type-system, normalization, elaboration]
---
# De Bruijn Representation

Yap uses a split de Bruijn representation:

- **Levels** (NF.Value / semantic domain) — count from the outermost binder inward. Stable under context extension: adding a new binding doesn't shift existing levels.
- **Indices** (EB.Term / syntactic domain) — count from the innermost binder outward. Canonical for α-equivalence: structurally equal terms are α-equivalent.

Conversion during quote: `index = depth - level - 1`

The split avoids expensive shifting during evaluation (levels don't change when the environment grows) while giving canonical syntax terms for comparison. This is standard in modern NbE implementations (Kovács, Abel).

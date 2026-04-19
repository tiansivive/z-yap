---
tags: [concept, type-system, mechanism, normalization]
---
# Normalisation by Evaluation (NbE)

A technique for computing normal forms by evaluating terms into a semantic domain (values) and then reading back to syntax.

Two phases:
1. **Evaluate** — interpret syntax into values (closures, neutrals, canonical forms)
2. **Quote/Read-back** — convert values back to syntactic normal forms

In yap, NbE provides definitional equality: two terms are equal iff they evaluate to the same value. The semantic domain uses de Bruijn levels (not indices) to avoid shifting during weakening.

Key components:
- **Closures** — capture an environment and an unevaluated EB.Term
- **Neutrals** — stuck computations (application to a variable)
- **Values** — Pi, Lambda, Mu, Sigma with annotations that are already evaluated

NbE is essential for [[dependent-types|dependent types]] — type equality must evaluate under binders to compare types that contain computations.

---
tags:
- decision
- type-system
- dependent
- elaboration
- implemented
- normalization
- inference
- syntax
- ast
- unification
---
# Type : Type

Yap uses a single universe classifier: `Type` is typed by `Type`. There is no predicative hierarchy of universe levels (Type₀ : Type₁ : Type₂ : …).

The classifier is the literal atom `Lit(Atom("Type"))` in both EB.Term and NF.Value. Pi formation checks domain and codomain against this same constant. Checking branches for type-level constructs (tuples, variants, schemas) also key off this constant.

This design choice collapses all universe levels into one, simplifying the type theory and the elaborator at the cost of logical consistency — `Type : Type` introduces Girard's paradox, making the type theory inconsistent as a logic. For Yap's purposes (a practical programming language with verification, not a proof assistant), this trade-off is acceptable: the verification layer handles logical reasoning through refinement types and SMT, not through the universe structure.

A predicative hierarchy would require tracking universe levels on Pi, Sigma, and other type-forming operations, propagating level constraints through unification, and either explicit level annotations or level inference.

<!-- connections:start -->

## Connections

**Outgoing**
- ENABLES → [[dependent-types]] — Types compute as terms
- GENERALIZES → [[system-f]] — Collapses all universe levels
- COMPOSES_WITH → [[dependent-types]] — Types in same universe
- CONTRASTS_WITH → [[system-f]] — Single universe vs stratified
- ENABLES → [[pi-types]] — Domain/codomain checked at Type
- ENABLES → [[sigma-types]] — Row types classified by Type

**Incoming**
- [[types-as-terms]] ← ENABLES — Types compute as terms
- [[dependent-types]] ← ENABLES — Types live in same universe as terms
- [[indexed-families]] ← CONTRASTS_WITH — Families need universe hierarchy
- [[type-level-computation]] ← USES — Type : Type enables type-level functions
- [[dependent-types]] ← RELIES_ON — Single universe classifier

<!-- connections:end -->

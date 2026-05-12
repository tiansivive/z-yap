# z-yap Catalog (23 zettels)

## Bidirectional Type Checking
`bidirectional-checking` — tags: concept, type-system, mechanism, elaboration

**Outgoing:**
- [ENABLES] → [[dependent-types]] — Natural fit for dependent types with annotations

**Incoming:**
- [[yap]] [USES] → — Inference strategy
- [[elaboration]] [USES] → — Infer synthesises, check pushes inward

## Closures (NbE)
`closures` — tags: mechanism, concept, normalization, type-system

**Outgoing:**
- [RELIES_ON] → [[de-bruijn]] — Closures capture de Bruijn level-indexed environments

**Incoming:**
- [[neutrals]] [CONTRASTS_WITH] → — Closures reduce; neutrals are stuck — dual roles in NbE

## Constraint Solving
`constraint-solving` — tags: mechanism, type-system, elaboration

**Outgoing:**
- [USES] → [[row-unification]] — Row variables unified alongside type variables

**Incoming:**
- [[elaboration]] [USES] → — Deferred constraints solved per let-binding

## De Bruijn Representation
`de-bruijn` — tags: mechanism, concept, type-system, normalization, elaboration

**Incoming:**
- [[closures]] [RELIES_ON] → — Closures capture de Bruijn level-indexed environments
- [[system-f]] [INFORMS] → — System F's binding structure motivates de Bruijn representation

## Dependent Types
`dependent-types` — tags: concept, type-system, dependent

**Outgoing:**
- [EXTENDS] → [[system-f]] — Types that depend on values

**Incoming:**
- [[yap]] [USES] → — Pi types with value dependencies
- [[bidirectional-checking]] [ENABLES] → — Natural fit for dependent types with annotations

## Elaboration Monad (V2 Do)
`elaboration-monad` — tags: mechanism, elaboration, pattern, code

**Outgoing:**
- [USES] → [[meta-variables]] — Monad state component manages the meta store
- [USES] → [[unification]] — Monad writer accumulates constraints consumed by unification

## Elaboration
`elaboration` — tags: mechanism, elaboration, project

**Outgoing:**
- [USES] → [[bidirectional-checking]] — Infer synthesises, check pushes inward
- [USES] → [[nbe]] — Evaluate to values, compare structurally
- [USES] → [[constraint-solving]] — Deferred constraints solved per let-binding

**Incoming:**
- [[yap]] [INCLUDES] → — Core pipeline stage

## Generalization (Let-Polymorphism)
`generalization` — tags: mechanism, type-system, elaboration

**Outgoing:**
- [USES] → [[meta-variables]] — Generalizes unsolved metas into implicit Pis
- [IMPLEMENTS] → [[hindley-milner]] — Yap's implementation of HM let-generalization
- [PRODUCES] → [[implicits]] — Generalization wraps terms in implicit lambdas

## Hindley-Milner Type Inference
`hindley-milner` — tags: concept, type-system, mechanism

**Incoming:**
- [[yap]] [EXTENDS] → — HM + row variables + dependent types
- [[row-polymorphism]] [EXTENDS] → — Parametric extension via row variables
- [[generalization]] [IMPLEMENTS] → — Yap's implementation of HM let-generalization

## Implicit Arguments
`implicits` — tags: mechanism, type-system, elaboration, language

**Outgoing:**
- [USES] → [[meta-variables]] — Inserts metas at call sites for implicit params
- [RELIES_ON] → [[unification]] — Unification-driven resolution solves implicit metas

**Incoming:**
- [[generalization]] [PRODUCES] → — Generalization wraps terms in implicit lambdas

## Meta-variables
`meta-variables` — tags: mechanism, concept, type-system, elaboration

**Outgoing:**
- [RELIES_ON] → [[unification]] — Metas are solved by unification
- [PRODUCES] → [[neutrals]] — Unsolved metas produce neutral terms

**Incoming:**
- [[unification]] [SOLVES] → — Unification resolves metas to concrete types
- [[generalization]] [USES] → — Generalizes unsolved metas into implicit Pis
- [[implicits]] [USES] → — Inserts metas at call sites for implicit params
- [[elaboration-monad]] [USES] → — Monad state component manages the meta store

## Mu-types (Equi-recursive)
`mu-types` — tags: concept, type-system, elaboration, normalization, language

**Incoming:**
- [[unification]] [USES] → — Unfolds mu during structural comparison

## Normalisation by Evaluation (NbE)
`nbe` — tags: concept, type-system, mechanism, normalization

**Incoming:**
- [[yap]] [USES] → — Definitional equality via normalization
- [[elaboration]] [USES] → — Evaluate to values, compare structurally

## Neutral Terms
`neutrals` — tags: mechanism, concept, normalization, type-system

**Outgoing:**
- [CONTRASTS_WITH] → [[closures]] — Closures reduce; neutrals are stuck — dual roles in NbE

**Incoming:**
- [[meta-variables]] [PRODUCES] → — Unsolved metas produce neutral terms

## Nominal Subtyping
`nominal-subtyping` — tags: concept, type-system, mechanism

**Outgoing:**
- [CONTRASTS_WITH] → [[structural-subtyping]] — Subtype compatibility mechanisms

**Incoming:**
- [[structural-subtyping]] [CONTRASTS_WITH] → — Subtype compatibility mechanisms

## Nominal Typing
`nominal-typing` — tags: concept, type-system, mechanism

**Outgoing:**
- [CONTRASTS_WITH] → [[structural-typing]] — Name-based vs structure-based identity

**Incoming:**
- [[structural-typing]] [CONTRASTS_WITH] → — Name-based vs structure-based identity

## Row Polymorphism
`row-polymorphism` — tags: concept, type-system, mechanism, row-types

**Outgoing:**
- [EXTENDS] → [[hindley-milner]] — Parametric extension via row variables
- [DISTINGUISHES] → [[structural-subtyping]] — Not subtyping: parametric, not coercive

**Incoming:**
- [[yap]] [USES] → — Structural flexibility via row variables
- [[unification]] [EXTENDS] → — Row rewriting extends Robinson unification for row types

## Row Unification
`row-unification` — tags: mechanism, type-system, row-types, elaboration

**Incoming:**
- [[yap]] [USES] → — Row variable unification in constraint solving
- [[constraint-solving]] [USES] → — Row variables unified alongside type variables

## Structural Subtyping
`structural-subtyping` — tags: concept, type-system, mechanism

**Outgoing:**
- [CONTRASTS_WITH] → [[nominal-subtyping]] — Subtype compatibility mechanisms
- [APPLIES_TO] → [[structural-typing]] — Asymmetric aspect of structural type systems

**Incoming:**
- [[nominal-subtyping]] [CONTRASTS_WITH] → — Subtype compatibility mechanisms
- [[row-polymorphism]] [DISTINGUISHES] → — Not subtyping: parametric, not coercive

## Structural Typing
`structural-typing` — tags: concept, type-system, mechanism

**Outgoing:**
- [CONTRASTS_WITH] → [[nominal-typing]] — Name-based vs structure-based identity

**Incoming:**
- [[yap]] [USES] → — All compound types are row-based
- [[nominal-typing]] [CONTRASTS_WITH] → — Name-based vs structure-based identity
- [[structural-subtyping]] [APPLIES_TO] → — Asymmetric aspect of structural type systems

## System F
`system-f` — tags: concept, type-system

**Outgoing:**
- [INFORMS] → [[de-bruijn]] — System F's binding structure motivates de Bruijn representation

**Incoming:**
- [[yap]] [EXTENDS] → — Parametric polymorphism foundation
- [[dependent-types]] [EXTENDS] → — Types that depend on values

## Unification
`unification` — tags: mechanism, type-system, elaboration

**Outgoing:**
- [SOLVES] → [[meta-variables]] — Unification resolves metas to concrete types
- [USES] → [[mu-types]] — Unfolds mu during structural comparison
- [EXTENDS] → [[row-polymorphism]] — Row rewriting extends Robinson unification for row types

**Incoming:**
- [[meta-variables]] [RELIES_ON] → — Metas are solved by unification
- [[implicits]] [RELIES_ON] → — Unification-driven resolution solves implicit metas
- [[elaboration-monad]] [USES] → — Monad writer accumulates constraints consumed by unification

## Yap
`yap` — tags: project, language

**Outgoing:**
- [USES] → [[structural-typing]] — All compound types are row-based
- [USES] → [[row-polymorphism]] — Structural flexibility via row variables
- [EXTENDS] → [[hindley-milner]] — HM + row variables + dependent types
- [EXTENDS] → [[system-f]] — Parametric polymorphism foundation
- [USES] → [[dependent-types]] — Pi types with value dependencies
- [USES] → [[bidirectional-checking]] — Inference strategy
- [USES] → [[nbe]] — Definitional equality via normalization
- [USES] → [[row-unification]] — Row variable unification in constraint solving
- [INCLUDES] → [[elaboration]] — Core pipeline stage


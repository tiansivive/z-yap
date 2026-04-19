# z-yap Catalog (14 zettels)

## Bidirectional Type Checking
`bidirectional-checking` — tags: concept, type-system, mechanism, elaboration

**Outgoing:**
- [ENABLES] → [[dependent-types]] — Natural fit for dependent types with annotations

**Incoming:**
- [[yap]] [USES] → — Inference strategy
- [[elaboration]] [USES] → — Infer synthesises, check pushes inward

## Constraint Solving
`constraint-solving` — tags: mechanism, type-system, elaboration

**Outgoing:**
- [USES] → [[row-unification]] — Row variables unified alongside type variables

**Incoming:**
- [[elaboration]] [USES] → — Deferred constraints solved per let-binding

## Dependent Types
`dependent-types` — tags: concept, type-system, dependent

**Outgoing:**
- [EXTENDS] → [[system-f]] — Types that depend on values

**Incoming:**
- [[yap]] [USES] → — Pi types with value dependencies
- [[bidirectional-checking]] [ENABLES] → — Natural fit for dependent types with annotations

## Elaboration
`elaboration` — tags: mechanism, elaboration, project

**Outgoing:**
- [USES] → [[bidirectional-checking]] — Infer synthesises, check pushes inward
- [USES] → [[nbe]] — Evaluate to values, compare structurally
- [USES] → [[constraint-solving]] — Deferred constraints solved per let-binding

**Incoming:**
- [[yap]] [INCLUDES] → — Core pipeline stage

## Hindley-Milner Type Inference
`hindley-milner` — tags: concept, type-system, mechanism

**Incoming:**
- [[yap]] [EXTENDS] → — HM + row variables + dependent types
- [[row-polymorphism]] [EXTENDS] → — Parametric extension via row variables

## Normalisation by Evaluation (NbE)
`nbe` — tags: concept, type-system, mechanism, normalization

**Incoming:**
- [[yap]] [USES] → — Definitional equality via normalization
- [[elaboration]] [USES] → — Evaluate to values, compare structurally

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

**Incoming:**
- [[yap]] [EXTENDS] → — Parametric polymorphism foundation
- [[dependent-types]] [EXTENDS] → — Types that depend on values

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


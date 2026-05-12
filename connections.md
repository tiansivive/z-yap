# z-yap connections
# Format: [[source]] --[:LABEL]--> [[target]]  -- note  @timestamp
# Bidirectional: [[a]] --[:LABEL]-- [[b]]  -- note

## Type System Foundations

[[yap]] --[:USES]--> [[structural-typing]]  -- All compound types are row-based  @2026-04-18
[[yap]] --[:USES]--> [[row-polymorphism]]  -- Structural flexibility via row variables  @2026-04-18
[[yap]] --[:EXTENDS]--> [[hindley-milner]]  -- HM + row variables + dependent types  @2026-04-18
[[yap]] --[:EXTENDS]--> [[system-f]]  -- Parametric polymorphism foundation  @2026-04-18
[[yap]] --[:USES]--> [[dependent-types]]  -- Pi types with value dependencies  @2026-04-18
[[yap]] --[:USES]--> [[bidirectional-checking]]  -- Inference strategy  @2026-04-18
[[yap]] --[:USES]--> [[nbe]]  -- Definitional equality via normalization  @2026-04-18

## Type Discipline Contrasts

[[structural-typing]] --[:CONTRASTS_WITH]-- [[nominal-typing]]  -- Name-based vs structure-based identity
[[structural-subtyping]] --[:CONTRASTS_WITH]-- [[nominal-subtyping]]  -- Subtype compatibility mechanisms
[[structural-subtyping]] --[:APPLIES_TO]--> [[structural-typing]]  -- Asymmetric aspect of structural type systems

## Row Polymorphism

[[row-polymorphism]] --[:EXTENDS]--> [[hindley-milner]]  -- Parametric extension via row variables
[[row-polymorphism]] --[:DISTINGUISHES]--> [[structural-subtyping]]  -- Not subtyping: parametric, not coercive
[[yap]] --[:USES]--> [[row-unification]]  -- Row variable unification in constraint solving  @2026-04-18

## Elaboration Pipeline

[[yap]] --[:INCLUDES]--> [[elaboration]]  -- Core pipeline stage
[[elaboration]] --[:USES]--> [[bidirectional-checking]]  -- Infer synthesises, check pushes inward
[[elaboration]] --[:USES]--> [[nbe]]  -- Evaluate to values, compare structurally
[[elaboration]] --[:USES]--> [[constraint-solving]]  -- Deferred constraints solved per let-binding
[[constraint-solving]] --[:USES]--> [[row-unification]]  -- Row variables unified alongside type variables

## Dependent Types

[[dependent-types]] --[:EXTENDS]--> [[system-f]]  -- Types that depend on values
[[bidirectional-checking]] --[:ENABLES]--> [[dependent-types]]  -- Natural fit for dependent types with annotations

## Core Elaboration Mechanisms

[[meta-variables]] --[:RELIES_ON]--> [[unification]]  -- Metas are solved by unification  @2026-04-18
[[unification]] --[:SOLVES]--> [[meta-variables]]  -- Unification resolves metas to concrete types  @2026-04-18
[[generalization]] --[:USES]--> [[meta-variables]]  -- Generalizes unsolved metas into implicit Pis  @2026-04-18
[[generalization]] --[:IMPLEMENTS]--> [[hindley-milner]]  -- Yap's implementation of HM let-generalization  @2026-04-18
[[generalization]] --[:PRODUCES]--> [[implicits]]  -- Generalization wraps terms in implicit lambdas  @2026-04-18
[[implicits]] --[:USES]--> [[meta-variables]]  -- Inserts metas at call sites for implicit params  @2026-04-18
[[implicits]] --[:RELIES_ON]--> [[unification]]  -- Unification-driven resolution solves implicit metas  @2026-04-18
[[unification]] --[:USES]--> [[mu-types]]  -- Unfolds mu during structural comparison  @2026-04-18
[[unification]] --[:EXTENDS]--> [[row-polymorphism]]  -- Row rewriting extends Robinson unification for row types  @2026-04-18
[[elaboration-monad]] --[:USES]--> [[meta-variables]]  -- Monad state component manages the meta store  @2026-04-18
[[elaboration-monad]] --[:USES]--> [[unification]]  -- Monad writer accumulates constraints consumed by unification  @2026-04-18

## NbE Mechanisms

[[closures]] --[:RELIES_ON]--> [[de-bruijn]]  -- Closures capture de Bruijn level-indexed environments  @2026-04-18
[[meta-variables]] --[:PRODUCES]--> [[neutrals]]  -- Unsolved metas produce neutral terms  @2026-04-18
[[neutrals]] --[:CONTRASTS_WITH]--> [[closures]]  -- Closures reduce; neutrals are stuck — dual roles in NbE  @2026-04-18
[[system-f]] --[:INFORMS]--> [[de-bruijn]]  -- System F's binding structure motivates de Bruijn representation  @2026-04-18

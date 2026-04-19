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

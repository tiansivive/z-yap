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

## Sessions

[[session-lowering-branch-split]] --[:ADDRESSES]--> [[closures]]  -- Closure conversion and shared bundle primitive  @2026-05-13
[[session-lowering-branch-split]] --[:ADDRESSES]--> [[elaboration]]  -- FFI arity computation piped from elaboration to lowering  @2026-05-13

## Imported Connections  @2026-05-17

[[yap]] --[:INCLUDES]--> [[nearley-parser]]  -- Parser component
[[yap]] --[:INCLUDES]--> [[verification-pipeline]]  -- Verification component
[[yap]] --[:INCLUDES]--> [[mir-lowering]]  -- Lowering component
[[yap]] --[:INCLUDES]--> [[js-codegen]]  -- JS backend
[[yap]] --[:INCLUDES]--> [[c-codegen]]  -- C backend
[[yap]] --[:INCLUDES]--> [[erlang-codegen]]  -- Erlang backend
[[yap]] --[:INCLUDES]--> [[module-system]]  -- Module component
[[yap]] --[:INCLUDES]--> [[compile-orchestration]]  -- Orchestration
[[nearley-parser]] --[:PRODUCES]--> [[elaboration]]  -- Src.Term
[[nearley-parser]] --[:TRANSLATES_TO]--> [[src-term]]  -- Token stream → AST
[[tree-sitter-parser]] --[:SUPERSEDES]--> [[nearley-parser]]  -- Incremental replaces ambiguous CFG
[[tree-sitter-parser]] --[:PRODUCES]--> [[v2-elaboration-pipeline]]  -- CST.SyntaxNode
[[v2-elaboration-pipeline]] --[:SUPERSEDES]--> [[v1-elaboration-pipeline]]  -- Fresh implementation
[[v2-elaboration-pipeline]] --[:MIRRORS]--> [[v1-elaboration-pipeline]]  -- Same theory, new code
[[v1-elaboration-pipeline]] --[:PRODUCES]--> [[eb-term]]  -- EB.Term output
[[v1-elaboration-pipeline]] --[:NORMALIZES_TO]--> [[nf-value]]  -- Types → normal forms
[[v1-elaboration-pipeline]] --[:DISPATCHES_ON]--> [[src-term]]  -- Source shape drives dispatch
[[verification-pipeline]] --[:VALIDATES]--> [[v1-elaboration-pipeline]]  -- On-demand, not pipeline stage
[[verification-pipeline]] --[:TRANSLATES_TO]--> [[smt-translation]]  -- Types → Z3 assertions
[[verification-pipeline]] --[:COMPOSES_WITH]--> [[v1-elaboration-pipeline]]  -- Post-hoc validation
[[mir-lowering]] --[:CONSUMES]--> [[v1-elaboration-pipeline]]  -- EB.Term input
[[mir-lowering]] --[:PRODUCES]--> [[js-codegen]]  -- MIR → JS
[[mir-lowering]] --[:PRODUCES]--> [[c-codegen]]  -- MIR → C
[[mir-lowering]] --[:PRODUCES]--> [[erlang-codegen]]  -- MIR → Erlang
[[mir-lowering]] --[:TRANSLATES_TO]--> [[eb-term]]  -- EB.Term → SSA blocks
[[mir-lowering]] --[:ERASES]--> [[pi-types]]  -- Types not preserved in MIR
[[mir-lowering]] --[:TRAVERSES]--> [[eb-term]]  -- Pattern-match walk
[[tmp-pipeline-stub]] --[:BLOCKS]--> [[v2-elaboration-pipeline]]  -- Stubs prevent integration
[[verification-modal-phase]] --[:FOLLOWS]--> [[elaboration]]  -- Modal checking after full inference
[[module-system]] --[:RELIES_ON]--> [[v1-elaboration-pipeline]]  -- Not yet wired to v2
[[compile-orchestration]] --[:DELEGATES_TO]--> [[v1-elaboration-pipeline]]  -- Current delegation
[[compile-orchestration]] --[:DELEGATES_TO]--> [[verification-pipeline]]  -- On-demand
[[compile-orchestration]] --[:DELEGATES_TO]--> [[mir-lowering]]  -- Lowering step
[[pi-types]] --[:EXTENDS]--> [[dependent-types]]  -- Universal quantification with dependency
[[pi-types]] --[:GENERALIZES]--> [[lambda]]  -- Arrow → is non-dependent Pi
[[pi-types]] --[:FORMS]--> [[lambda]]  -- Π is formation rule for functions
[[pi-types]] --[:DUAL_OF]--> [[sigma-types]]  -- Universal vs existential
[[pi-types]] --[:COMPOSES_WITH]--> [[sigma-types]]  -- Dependent function returning dependent record
[[pi-types]] --[:COMPOSES_WITH]--> [[refinement-types]]  -- Refined domains/codomains
[[sigma-types]] --[:EXTENDS]--> [[dependent-types]]  -- Existential with row dependency
[[sigma-types]] --[:USES]--> [[row-polymorphism]]  -- Row-backed dependent records
[[sigma-types]] --[:FORMS]--> [[structural-records]]  -- Σ forms dependent record types
[[refinement-types]] --[:RELIES_ON]--> [[verification-pipeline]]  -- Z3 discharges VCs
[[refinement-types]] --[:COMPOSES_WITH]--> [[sigma-types]]  -- :fst in predicates
[[refinement-types]] --[:SUBSUMES]--> [[pi-types]]  -- Refined T subtype of T
[[refinement-types]] --[:COERCES_TO]--> [[pi-types]]  -- Forget rule strips predicate
[[modalities]] --[:APPLIES_TO]--> [[pi-types]]  -- Quantity on domain
[[modalities]] --[:COMPOSES_WITH]--> [[refinement-types]]  -- Modal + refined
[[modalities]] --[:COERCES_TO]--> [[pi-types]]  -- Modal stripping during inference
[[variant-types]] --[:USES]--> [[row-polymorphism]]  -- Row-backed unions
[[variant-types]] --[:DUAL_OF]--> [[structural-records]]  -- Sum vs product over rows
[[variant-types]] --[:MIRRORS]--> [[structural-records]]  -- Row-backed dual
[[verification-modal-phase]] --[:ADDRESSES]--> [[modalities]]  -- How modal obligations are discharged
[[modality-polymorphism]] --[:EXTENDS]--> [[modalities]]  -- Polymorphism over modalities
[[modality-polymorphism]] --[:REQUIRES]--> [[verification-modal-phase]]  -- Depends on enforcement being functional
[[refinement-inference]] --[:EXTENDS]--> [[refinement-types]]  -- Inferred refinements
[[refinement-inference]] --[:REVISES]--> [[modalities]]  -- Strip → template revision
[[structural-records]] --[:USES]--> [[row-polymorphism]]  -- Open-tail row structure
[[tuples]] --[:DESUGARS_TO]--> [[structural-records]]  -- Positional labels
[[tuples]] --[:SPECIALIZES]--> [[structural-records]]  -- Numeric labels only
[[lists]] --[:ENCODES]--> [[ffi]]  -- Indexed Num T defaultArray (foreign)
[[dictionaries]] --[:ENCODES]--> [[ffi]]  -- Indexed String T defaultHashMap (foreign)
[[dictionaries]] --[:MIRRORS]--> [[lists]]  -- Same Indexed encoding, different index
[[projection]] --[:ELIMINATES]--> [[structural-records]]  -- Field access
[[projection]] --[:ELIMINATES]--> [[sigma-types]]  -- Dependent field access
[[projection]] --[:DUAL_OF]--> [[injection]]  -- Elim vs intro for row-backed types
[[injection]] --[:INTRODUCES]--> [[structural-records]]  -- Field extension
[[injection]] --[:INTRODUCES]--> [[variant-types]]  -- Tag injection
[[rows-universal-substrate]] --[:MOTIVATES]--> [[row-polymorphism]]  -- All data is row-based
[[rows-universal-substrate]] --[:MOTIVATES]--> [[structural-records]]  -- Uniform substrate
[[dedicated-row-constructors]] --[:REVISES]--> [[structural-records]]  -- Dedicated AST nodes
[[dedicated-row-constructors]] --[:ADDRESSES]--> [[rows-universal-substrate]]  -- Cognitive overhead
[[lambda]] --[:INTRODUCES]--> [[pi-types]]  -- Intro form for functions
[[lambda]] --[:DUAL_OF]--> [[application]]  -- Intro/elim pair for Pi
[[application]] --[:ELIMINATES]--> [[pi-types]]  -- Elim form for functions
[[application]] --[:USES]--> [[implicit-resolution]]  -- Implicit insertion
[[tagged-values]] --[:INTRODUCES]--> [[variant-types]]  -- Intro form for variants
[[match]] --[:ELIMINATES]--> [[variant-types]]  -- Elim form for variants
[[match]] --[:LOWERS_TO]--> [[pattern-matching-compilation]]  -- Decision trees
[[match]] --[:DUAL_OF]--> [[tagged-values]]  -- Intro/elim pair for variants
[[blocks]] --[:USES]--> [[generalization]]  -- Let-polymorphism at boundaries
[[holes]] --[:INSTANTIATES]--> [[meta-variables]]  -- Fresh meta per hole
[[where-clauses]] --[:DESUGARS_TO]--> [[blocks]]  -- Let bindings
[[loop-sugar]] --[:DESUGARS_TO]--> [[lambda]]  -- Tail-recursive functions
[[spineful-applications]] --[:REVISES]--> [[application]]  -- Head + spine
[[exhaustiveness-checking]] --[:EXTENDS]--> [[match]]  -- Safety gap
[[type-erasure]] --[:ERASES]--> [[pi-types]]  -- Removes type information
[[annotations]] --[:COERCES_TO]--> [[pi-types]]  -- Term validated against annotation
[[shift-reset]] --[:USES]--> [[answer-type-polymorphism]]  -- k has polymorphic answer type
[[shift-reset]] --[:USES]--> [[continuation-binders]]  -- Resume encoded via metas
[[shift-reset]] --[:INTRODUCES]--> [[continuation-binders]]  -- Shift captures k
[[shift-reset]] --[:COMPOSES_WITH]--> [[pi-types]]  -- k has Pi type
[[answer-type-polymorphism]] --[:GENERALIZES]--> [[pi-types]]  -- Monomorphic → polymorphic answer
[[continuation-binders]] --[:USES]--> [[meta-variables]]  -- Skolem-like metas
[[continuation-binders]] --[:RELIES_ON]--> [[nondeterminism]]  -- Multishot semantics
[[continuation-binders]] --[:THREADS_THROUGH]--> [[elaboration-monad]]  -- Via MutState
[[shift-reset-mir-lowering]] --[:LOWERS_TO]--> [[mir-lowering]]  -- State machines
[[shift-reset-mir-lowering]] --[:IMPLEMENTS]--> [[shift-reset]]  -- Runtime story
[[multishot-serialization]] --[:CONSTRAINS]--> [[shift-reset-mir-lowering]]  -- Replay challenge
[[selective-cps]] --[:ADDRESSES]--> [[multishot-serialization]]  -- Evidence passing alternative
[[selective-cps]] --[:CONTRASTS_WITH]--> [[shift-reset-mir-lowering]]  -- Closure vs state machine
[[koka-influence]] --[:INSPIRES]--> [[selective-cps]]  -- Evidence passing model
[[koka-influence]] --[:CONTRASTS_WITH]--> [[shift-reset]]  -- Evidence passing vs direct capture
[[effects-as-modality]] --[:EXTENDS]--> [[modalities]]  -- Effects tracked as modalities
[[effects-as-modality]] --[:EXTENDS]--> [[shift-reset]]  -- Effect system over continuations
[[petricek-orchard]] --[:INSPIRES]--> [[effects-as-modality]]  -- Coeffect framework
[[petricek-orchard]] --[:INSPIRES]--> [[implicits-as-coeffects]]  -- Context-dependence calculus
[[danvy-filinski]] --[:INFORMS]--> [[shift-reset]]  -- Foundational theory
[[danvy-filinski]] --[:INFORMS]--> [[answer-type-polymorphism]]  -- Answer type modification
[[implicit-resolution]] --[:EXTENDS]--> [[implicits]]  -- Resolver mechanism
[[implicit-resolution]] --[:RESOLVES]--> [[constraint-types]]  -- Δ lookup for resolve constraints
[[implicit-resolution]] --[:COMPOSES_WITH]--> [[pi-types]]  -- Implicit Pi triggers insertion
[[implicit-environment]] --[:ENABLES]--> [[implicit-resolution]]  -- Provides Δ
[[implicit-environment]] --[:THREADS_THROUGH]--> [[elaboration-context]]  -- ctx.implicits
[[typeclass-emulation]] --[:EMULATES]--> [[nominal-typing]]  -- Structural alternative to classes
[[typeclass-emulation]] --[:USES]--> [[implicit-resolution]]  -- Instance lookup via Δ
[[typeclass-emulation]] --[:USES]--> [[structural-records]]  -- Instances are records
[[typeclass-emulation]] --[:CONTRASTS_WITH]--> [[nominal-typing]]  -- No class hierarchy
[[implicits-as-coeffects]] --[:REVISES]--> [[implicit-resolution]]  -- Coeffect-based approach
[[ffi]] --[:RELIES_ON]--> [[mir-lowering]]  -- Saturation
[[ffi]] --[:LACKS]--> [[type-erasure]]  -- Needs dummy type args
[[ffi]] --[:TRANSLATES_TO]--> [[js-codegen]]  -- Curried JS functions
[[ffi-saturation-gram]] --[:EXTENDS]--> [[ffi]]  -- GRAM saturation pass for foreign/primop refs
[[ffi-saturation-gram]] --[:RELIES_ON]--> [[gram]]  -- Operates on enriched GRAM graph
[[ffi-saturation-gram]] --[:PRESERVES]--> [[lambda]]  -- Calling convention via closures
[[ffi-saturation-gram]] --[:SUPERSEDES]--> [[ffi-saturation-mir]]  -- GRAM pass replaces MIR lowering mechanism
[[ffi-saturation-mir]] --[:EXTENDS]--> [[ffi]]  -- Deprecated MIR lowering saturation
[[ffi-saturation-mir]] --[:RELIES_ON]--> [[mir-lowering]]  -- Part of deprecated direct lowering path
[[module-system]] --[:PRODUCES]--> [[elaboration-context]]  -- Interface tables
[[mutual-recursion]] --[:EXTENDS]--> [[module-system]]  -- Multi-pass elaboration
[[cbv-evaluation]] --[:IMPLEMENTS]--> [[yap]]  -- Runtime semantics
[[cbv-evaluation]] --[:PRESERVES]--> [[application]]  -- Left-to-right evaluation order
[[cbv-evaluation]] --[:NORMALIZES_TO]--> [[nf-value]]  -- Closed terms fully reduce
[[primitive-signature]] --[:USES]--> [[cbv-evaluation]]  -- δ-rules on literals
[[type-type]] --[:ENABLES]--> [[dependent-types]]  -- Types compute as terms
[[type-type]] --[:GENERALIZES]--> [[system-f]]  -- Collapses all universe levels
[[type-type]] --[:COMPOSES_WITH]--> [[dependent-types]]  -- Types in same universe
[[strict-vs-lazy]] --[:CONTRASTS_WITH]--> [[cbv-evaluation]]  -- Lazy alternative
[[cas-instead-of-smt]] --[:CONTRASTS_WITH]--> [[smt-translation]]  -- CAS alternative
[[gram]] --[:SUPERSEDES]--> [[mir-lowering]]  -- As IR approach
[[gram]] --[:REWRITES]--> [[dpo-rewriting]]  -- DPO rules refine graph
[[gram]] --[:PRESERVES]--> [[nbe]]  -- Semantic equivalence per pass
[[dpo-rewriting]] --[:IMPLEMENTS]--> [[gram]]  -- Rewriting engine
[[dpo-rewriting]] --[:TRAVERSES]--> [[gram]]  -- Pattern matching for rule LHS
[[structural-vs-representational-passes]] --[:CONSTRAINS]--> [[gram]]  -- Ordering principle
[[closure-conversion]] --[:CONTRASTS_WITH]--> [[defunctionalization]]  -- Different lowering strategies
[[closure-conversion]] --[:CONTRASTS_WITH]--> [[native-lambda-hvm]]  -- Different targets
[[closure-conversion]] --[:TRANSLATES_TO]--> [[mir-lowering]]  -- Env + function pointer
[[closure-conversion]] --[:ERASES]--> [[lambda]]  -- Flattens lexical scope
[[defunctionalization]] --[:SPECIALIZES]--> [[mir-lowering]]  -- GPU/HVM targets
[[native-lambda-hvm]] --[:REJECTS]--> [[closure-conversion]]  -- HVM needs raw λ
[[native-lambda-hvm]] --[:PRESERVES]--> [[nbe]]  -- Optimal reduction
[[mir-retrospective]] --[:INFORMS]--> [[gram]]  -- Lessons learned
[[mir-retrospective]] --[:MOTIVATES]--> [[gram]]  -- Why GRAM exists
[[gram-step-1]] --[:IMPLEMENTS]--> [[gram]]  -- Partial — first step
[[gram-as-s-expressions]] --[:REJECTS]--> [[gram]]  -- Rejected representation
[[logram]] --[:EXTENDS]--> [[gram]]  -- Speculative substrate
[[typed-pass-composition]] --[:EXTENDS]--> [[gram]]  -- Type-safe passes
[[passes-in-yap]] --[:EXTENDS]--> [[gram]]  -- Self-hosting passes
[[pattern-matching-compilation]] --[:LOWERS_TO]--> [[mir-lowering]]  -- Decision trees → MIR
[[pattern-matching-compilation]] --[:DISPATCHES_ON]--> [[match]]  -- Pattern shape
[[saturation]] --[:REWRITES]--> [[application]]  -- App chains → primop nodes
[[zonking]] --[:RELIES_ON]--> [[meta-variables]]  -- Applies subst to metas
[[zonking]] --[:FOLLOWS]--> [[constraint-solver]]  -- After solving
[[zonking]] --[:ZONKS]--> [[meta-variables]]  -- Resolves unknowns
[[zonking]] --[:TRAVERSES]--> [[eb-term]]  -- Walks replacing metas
[[constraint-solver]] --[:USES]--> [[unification]]  -- Assign constraints → unify
[[constraint-solver]] --[:USES]--> [[nondeterminism]]  -- Multishot replay
[[constraint-solver]] --[:RESOLVES]--> [[constraint-types]]  -- Processes queue
[[constraint-solver]] --[:DELEGATES_TO]--> [[unification-algorithm]]  -- Assign constraints
[[constraint-solver]] --[:DELEGATES_TO]--> [[implicit-resolution-solver]]  -- Resolve constraints
[[nondeterminism]] --[:ENABLES]--> [[shift-reset]]  -- Multishot continuations
[[nondeterminism]] --[:INSTANTIATES]--> [[meta-variables]]  -- Solution combinations
[[whnf-vs-full-normalization]] --[:CONSTRAINS]--> [[elaboration]]  -- WHNF only in elab
[[whnf-vs-full-normalization]] --[:CONSTRAINS]--> [[unification]]  -- Full NF in unification
[[smt-translation]] --[:IMPLEMENTS]--> [[verification-pipeline]]  -- Z3 translation
[[smt-translation]] --[:TRANSLATES_TO]--> [[verification-pipeline]]  -- Z3 sorts/assertions
[[smt-translation]] --[:TRAVERSES]--> [[eb-term]]  -- Walks producing Z3
[[smt-translation]] --[:ERASES]--> [[pi-types]]  -- Functions → uninterpreted
[[vc-provenance]] --[:EXTENDS]--> [[verification-pipeline]]  -- Error quality
[[vc-provenance]] --[:REPORTS]--> [[verification-pipeline]]  -- Provenance-annotated failures
[[elaboration-context]] --[:ENABLES]--> [[elaboration]]  -- Central context
[[elaboration-context]] --[:INCLUDES]--> [[implicit-environment]]  -- Δ in context
[[elaboration-context]] --[:THREADS_THROUGH]--> [[elaboration-monad]]  -- Reader component
[[monad-split]] --[:REVISES]--> [[elaboration-monad]]  -- Addresses coupling
[[verification-modal-phase]] --[:DELEGATES_TO]--> [[verification-pipeline]]  -- Modal obligations discharged in verification
[[types-as-terms]] --[:ENABLES]--> [[type-type]]  -- Types compute as terms
[[types-as-terms]] --[:RELIES_ON]--> [[dependent-types]]  -- Dependency required
[[types-as-terms]] --[:NORMALIZES_TO]--> [[nf-value]]  -- Types evaluate like terms
[[levels-vs-indices]] --[:APPLIES_TO]--> [[de-bruijn]]  -- Representation split
[[levels-vs-indices]] --[:APPLIES_TO]--> [[nbe]]  -- Levels for evaluation
[[deferred-constraint-solving]] --[:ENABLES]--> [[generalization]]  -- Metas generalized before solving
[[deferred-constraint-solving]] --[:ENABLES]--> [[implicit-resolution]]  -- Full context for resolution
[[deferred-constraint-solving]] --[:RELIES_ON]--> [[constraint-solver]]  -- Batch processing at let boundaries
[[deferred-constraint-solving]] --[:RESOLVES]--> [[constraint-types]]  -- At let boundaries
[[deferred-constraint-solving]] --[:CONTRASTS_WITH]--> [[eager-constraint-solving]]  -- Deferred vs classical eager approach
[[eager-constraint-solving]] --[:CONTRASTS_WITH]--> [[deferred-constraint-solving]]  -- Classical vs deferred approach

## Constraint solver design

[[constraint-solving]] --[:DELEGATES_TO]--> [[constraint-solver]]  -- Concept realized by the solver
[[constraint-solver]] --[:IMPLEMENTS]--> [[constraint-solving]]  -- Solver realizes the concept
[[assign-before-resolve]] --[:CONSTRAINS]--> [[constraint-solver]]  -- Ordering invariant
[[empty-subst-guard]] --[:CONSTRAINS]--> [[constraint-solver]]  -- Resolution acceptance rule
[[empty-subst-guard]] --[:CONSTRAINS]--> [[implicit-resolution-solver]]  -- Selection-not-computation semantics
[[assign-before-resolve]] --[:COMPOSES_WITH]--> [[empty-subst-guard]]  -- Complementary invariants
[[implicit-resolution-solver]] --[:IMPLEMENTS]--> [[constraint-solving]]  -- Resolution as proof search via unification
[[implicit-resolution-solver]] --[:USES]--> [[unification-algorithm]]  -- Candidate matching by unification
[[idris-2-influence]] --[:INSPIRES]--> [[empty-subst-guard]]  -- Empty-subst invariant
[[idris-2-influence]] --[:INSPIRES]--> [[assign-before-resolve]]  -- Ordering discipline
[[branded-types]] --[:CONSTRAINS]--> [[eb-term]]  -- Type-level separation
[[branded-types]] --[:CONSTRAINS]--> [[nf-value]]  -- Prevents mixing
[[generator-monad]] --[:IMPLEMENTS]--> [[elaboration-monad]]  -- Generator yield protocol
[[generator-monad]] --[:ENCODES]--> [[elaboration-monad]]  -- RWSE as generator
[[structural-row-based-types]] --[:MOTIVATES]--> [[row-polymorphism]]  -- All composite = rows
[[structural-row-based-types]] --[:FORMS]--> [[structural-records]]  -- Records, variants, tuples, lists, dicts
[[bidirectional-checking-decision]] --[:DISPATCHES_ON]--> [[elaboration]]  -- Mode drives path
[[bidirectional-checking-decision]] --[:COMPOSES_WITH]--> [[implicit-resolution]]  -- Mode switch triggers insertion
[[equirecursive-types]] --[:EXTENDS]--> [[mu-types]]  -- Beyond simple unfolding
[[equirecursive-types]] --[:REVISES]--> [[mu-type-unification]]  -- Toward full bisimulation
[[equirecursive-types]] --[:PRESERVES]--> [[unification]]  -- Type equality under finite unfolding
[[termination-checking]] --[:EXTENDS]--> [[equirecursive-types]]  -- Guardedness
[[termination-checking]] --[:DETECTS]--> [[nbe]]  -- Non-termination
[[dynamic-reflection]] --[:COMPOSES_WITH]--> [[verification-pipeline]]  -- Proof-gated casts
[[dynamic-reflection]] --[:COERCES_TO]--> [[pi-types]]  -- Safe cast via proof
[[mlir-influence]] --[:INSPIRES]--> [[gram]]  -- Open vocabulary / dialects
[[mlir-influence]] --[:INSPIRES]--> [[structural-vs-representational-passes]]  -- Pass scheduling
[[nanopass-influence]] --[:INSPIRES]--> [[gram]]  -- Composable passes
[[nanopass-influence]] --[:CONTRASTS_WITH]--> [[mir-lowering]]  -- Many vs monolithic
[[compcert-cakeml-influence]] --[:INSPIRES]--> [[gram]]  -- Refinement terminology
[[compcert-cakeml-influence]] --[:INSPIRES]--> [[verification-pipeline]]  -- Verified compilation aspiration
[[egglog-influence]] --[:INSPIRES]--> [[logram]]  -- Equality saturation
[[egglog-influence]] --[:INSPIRES]--> [[dpo-rewriting]]  -- E-graph rewriting
[[stratego-influence]] --[:INSPIRES]--> [[dpo-rewriting]]  -- Strategy combinators
[[stratego-influence]] --[:INSPIRES]--> [[passes-in-yap]]  -- Rewrite rule API
[[thorin-mimir-influence]] --[:INSPIRES]--> [[mir-retrospective]]  -- Calls = jumps
[[thorin-mimir-influence]] --[:CONTRASTS_WITH]--> [[mir-lowering]]  -- CPS vs direct
[[documentation-debt]] --[:APPLIES_TO]--> [[yap]]  -- README/FAQ drift
[[documentation-debt]] --[:DETECTS]--> [[yap]]  -- Drift between docs and impl
[[idris-2-influence]] --[:INSPIRES]--> [[meta-variables]]  -- Contextual metas
[[idris-2-influence]] --[:INSPIRES]--> [[bidirectional-checking]]  -- TT core
[[idris-2-influence]] --[:INSPIRES]--> [[dependent-types]]  -- Dependent TT
[[idris-2-influence]] --[:INSPIRES]--> [[constraint-solver]]  -- Unification approach
[[agda-influence]] --[:INSPIRES]--> [[meta-variables]]  -- Pattern unification
[[agda-influence]] --[:INSPIRES]--> [[dependent-types]]  -- Dependent types
[[agda-influence]] --[:INSPIRES]--> [[nbe]]  -- Evaluation-based normalization
[[agda-influence]] --[:INSPIRES]--> [[implicit-resolution]]  -- Instance resolution
[[lean-4-influence]] --[:INSPIRES]--> [[nbe]]  -- NbE architecture
[[lean-4-influence]] --[:INSPIRES]--> [[meta-variables]]  -- Instantiation strategy
[[lean-4-influence]] --[:INSPIRES]--> [[elaboration-monad]]  -- Pipeline discipline
[[lean-4-influence]] --[:INSPIRES]--> [[zonking]]  -- Substitution application
[[ghc-influence]] --[:INSPIRES]--> [[generalization]]  -- Let-polymorphism
[[ghc-influence]] --[:INSPIRES]--> [[deferred-constraint-solving]]  -- Constraint deferral
[[ghc-influence]] --[:INSPIRES]--> [[modalities]]  -- Levity polymorphism precedent
[[elm-ocaml-influence]] --[:INSPIRES]--> [[row-polymorphism]]  -- Row types approach
[[elm-ocaml-influence]] --[:INSPIRES]--> [[variant-types]]  -- Polymorphic variants
[[liquid-haskell-influence]] --[:INSPIRES]--> [[refinement-types]]  -- SMT automation
[[liquid-haskell-influence]] --[:INSPIRES]--> [[smt-translation]]  -- VC generation pipeline
[[liquid-haskell-influence]] --[:INSPIRES]--> [[vc-ir]]  -- Formula fragment
[[dunfield-krishnaswami]] --[:INFORMS]--> [[bidirectional-checking]]  -- Declarative → algorithmic
[[dunfield-krishnaswami]] --[:INFORMS]--> [[implicit-resolution]]  -- Subsumption in bidir
[[mcbride-nuttin]] --[:INFORMS]--> [[meta-variables]]  -- Contextual metavariables
[[mcbride-nuttin]] --[:INFORMS]--> [[zonking]]  -- Postponed substitution
[[abel-pientka]] --[:INFORMS]--> [[nbe]]  -- Higher-order pattern unification
[[abel-pientka]] --[:INFORMS]--> [[unification]]  -- Pattern fragment analysis
[[idris-1-qtt-paper]] --[:INSPIRES]--> [[modalities]]  -- Quantity tracking
[[maranget-paper]] --[:INFORMS]--> [[pattern-matching-compilation]]  -- Decision-tree construction
[[typing-rules]] --[:ENCODES]--> [[yap]]  -- Formal rules in spec.md
[[typing-rules]] --[:FORMS]--> [[pi-types]]  -- Type-theoretic foundation
[[typing-rules]] --[:COMPOSES_WITH]--> [[bidirectional-checking]]  -- Mode drives rule selection
[[usage-semantics]] --[:IMPLEMENTS]--> [[modal-type-theory]]  -- QTT semiring in Yap
[[modality-system]] --[:IMPLEMENTS]--> [[modal-type-theory]]  -- Multi-dimension modal design
[[block-level-using-gap]] --[:APPLIES_TO]--> [[blocks]]  -- Using in block scope
[[block-level-using-gap]] --[:APPLIES_TO]--> [[implicit-environment]]  -- Block-local Δ
[[block-level-using-gap]] --[:DETECTS]--> [[module-system]]  -- Gap in implementation
[[missing-spec-shift-reset]] --[:IMPLEMENTS]--> [[shift-reset]]  -- Impl ahead of spec
[[missing-spec-let-polymorphism]] --[:IMPLEMENTS]--> [[generalization]]  -- No spec formalization
[[missing-spec-sigma-types]] --[:IMPLEMENTS]--> [[sigma-types]]  -- No spec formalization
[[missing-spec-recursive-types]] --[:IMPLEMENTS]--> [[mu-type-unification]]  -- No spec formalization
[[unification-algorithm]] --[:IMPLEMENTS]--> [[unification]]  -- Core algorithm
[[unification-algorithm]] --[:USES]--> [[occurs-check]]  -- Prevents infinite types
[[unification-algorithm]] --[:USES]--> [[row-unification-mechanism]]  -- Row case delegation
[[unification-algorithm]] --[:USES]--> [[substitution-system]]  -- Accumulates solutions
[[unification-algorithm]] --[:DISPATCHES_ON]--> [[nf-value]]  -- Pattern match on pairs
[[unification-algorithm]] --[:TRAVERSES]--> [[nf-value]]  -- Recursive walk
[[flex-flex-unification]] --[:SPECIALIZES]--> [[unification-algorithm]]  -- Both unsolved
[[flex-flex-unification]] --[:RESOLVES]--> [[meta-variables]]  -- Binds left to right
[[flex-rigid-unification]] --[:SPECIALIZES]--> [[unification-algorithm]]  -- Meta vs rigid
[[flex-rigid-unification]] --[:RESOLVES]--> [[meta-variables]]  -- Binds to rigid
[[flex-rigid-unification]] --[:RECOVERS_FROM]--> [[substitution-system]]  -- Chases solved metas
[[mu-type-unification]] --[:SPECIALIZES]--> [[unification-algorithm]]  -- Mu case
[[mu-type-unification]] --[:IMPLEMENTS]--> [[equirecursive-types]]  -- Current approach
[[mu-type-unification]] --[:REWRITES]--> [[mu-types]]  -- Unfolds and recurses
[[occurs-check]] --[:CONSTRAINS]--> [[unification-algorithm]]  -- Prevents cycles
[[occurs-check]] --[:TRAVERSES]--> [[nf-value]]  -- Walks checking meta presence
[[occurs-check]] --[:DETECTS]--> [[mu-types]]  -- Cyclic types
[[row-unification-mechanism]] --[:EXTENDS]--> [[unification-algorithm]]  -- Row extension
[[row-unification-mechanism]] --[:DELEGATES_TO]--> [[row-rewriting]]  -- Label lookup
[[row-unification-mechanism]] --[:INSTANTIATES]--> [[meta-variables]]  -- Fresh row metas
[[constraint-types]] --[:ENABLES]--> [[constraint-solver]]  -- Typed constraints
[[constraint-types]] --[:DISPATCHES_ON]--> [[constraint-solver]]  -- Assign vs resolve
[[constraint-solver]] --[:USES]--> [[implicit-resolution-solver]]  -- Resolve → Δ lookup
[[implicit-resolution-solver]] --[:IMPLEMENTS]--> [[implicit-resolution]]  -- Solver-side mechanism
[[implicit-resolution-solver]] --[:USES]--> [[unification-algorithm]]  -- Candidate matching
[[implicit-resolution-solver]] --[:PRESERVES]--> [[generalization]]  -- Rejects subst-producing candidates
[[substitution-system]] --[:ENABLES]--> [[zonking]]  -- Subst for resolution
[[substitution-system]] --[:ENABLES]--> [[unification-algorithm]]  -- Solution accumulation
[[substitution-system]] --[:ZONKS]--> [[meta-variables]]  -- Maps IDs to solutions
[[row-data-structure]] --[:ENABLES]--> [[row-rewriting]]  -- Rewrite over rows
[[row-data-structure]] --[:ENABLES]--> [[row-polymorphism]]  -- Shared data type
[[row-data-structure]] --[:FORMS]--> [[structural-records]]  -- Basis of row-backed types
[[row-rewriting]] --[:ENABLES]--> [[projection]]  -- Label lookup for field access
[[row-rewriting]] --[:ENABLES]--> [[injection]]  -- Row extension
[[row-rewriting]] --[:ENABLES]--> [[row-unification-mechanism]]  -- Restructuring for unification
[[row-rewriting]] --[:REWRITES]--> [[row-data-structure]]  -- Moves label to head
[[row-rewriting]] --[:TRAVERSES]--> [[row-data-structure]]  -- Recursive tail descent
[[sigma-bindings]] --[:IMPLEMENTS]--> [[dependent-types]]  -- Field-to-field dependency
[[sigma-bindings]] --[:APPLIES_TO]--> [[structural-records]]  -- Record field references
[[sigma-bindings]] --[:APPLIES_TO]--> [[sigma-types]]  -- Σ field dependency
[[sigma-bindings]] --[:INSTANTIATES]--> [[meta-variables]]  -- Fresh metas per field
[[sigma-bindings]] --[:THREADS_THROUGH]--> [[elaboration-context]]  -- ctx.sigma map
[[label-lookup]] --[:USES]--> [[sigma-bindings]]  -- :label → sigma entry
[[label-lookup]] --[:RESOLVES]--> [[sigma-bindings]]  -- Label references
[[de-bruijn-indices]] --[:CONTRASTS_WITH]--> [[de-bruijn-levels]]  -- Dual representations
[[de-bruijn-indices]] --[:EXTENDS]--> [[de-bruijn]]  -- EB-level detail
[[de-bruijn-levels]] --[:EXTENDS]--> [[de-bruijn]]  -- NF-level detail
[[level-to-index-conversion]] --[:USES]--> [[de-bruijn-indices]]  -- Target representation
[[level-to-index-conversion]] --[:USES]--> [[de-bruijn-levels]]  -- Source representation
[[quoting]] --[:USES]--> [[level-to-index-conversion]]  -- Core conversion
[[quoting]] --[:USES]--> [[closures]]  -- Apply closure for readback
[[quoting]] --[:QUOTES_TO]--> [[eb-term]]  -- NF.Value → EB.Term
[[quoting]] --[:TRAVERSES]--> [[nf-value]]  -- Recursive descent
[[context-operations]] --[:ENABLES]--> [[elaboration-context]]  -- Bind, extend, augment, prune
[[context-operations]] --[:THREADS_THROUGH]--> [[elaboration-monad]]  -- All phases
[[nondeterminism-multishot]] --[:ENABLES]--> [[shift-reset]]  -- Multishot continuations
[[nondeterminism-multishot]] --[:USES]--> [[constraint-solver]]  -- Runs after solving
[[nondeterminism-multishot]] --[:INSTANTIATES]--> [[meta-variables]]  -- Solution combinations
[[trampoline-evaluator]] --[:IMPLEMENTS]--> [[nbe]]  -- Stack-safe evaluation
[[trampoline-evaluator]] --[:ADDRESSES]--> [[nbe]]  -- Stack overflow prevention
[[trampoline-evaluator]] --[:WRAPS]--> [[nbe]]  -- Heap-allocated frames
[[trampoline-evaluator]] --[:PRESERVES]--> [[cbv-evaluation]]  -- Same results
[[evaluation-step-limit]] --[:CONSTRAINS]--> [[trampoline-evaluator]]  -- Prevents non-termination
[[evaluation-step-limit]] --[:DETECTS]--> [[nbe]]  -- Infinite loops
[[variable-evaluation-dispatch]] --[:IMPLEMENTS]--> [[nbe]]  -- (Var) at NF level
[[variable-evaluation-dispatch]] --[:RESOLVES]--> [[meta-variables]]  -- Skolems → zonker → neutral
[[application-evaluation]] --[:IMPLEMENTS]--> [[nbe]]  -- (App) at NF level
[[application-evaluation]] --[:DELEGATES_TO]--> [[closures]]  -- Abs case
[[knot-tying]] --[:ENABLES]--> [[generalization]]  -- Recursive let evaluation
[[knot-tying]] --[:ENABLES]--> [[mu-type-unification]]  -- Recursive self-reference
[[knot-tying]] --[:INSTANTIATES]--> [[nbe]]  -- Placeholder entry
[[error-causes]] --[:REPORTS]--> [[unification-algorithm]]  -- Type error rendering
[[error-causes]] --[:USES]--> [[pretty-printing]]  -- Zonked NF in error messages
[[error-propagation]] --[:USES]--> [[error-causes]]  -- Lifts into monad
[[error-propagation]] --[:USES]--> [[provenance-system]]  -- Carries trace
[[error-propagation]] --[:PROPAGATES_VIA]--> [[elaboration-monad]]  -- V2.fail + yield
[[provenance-system]] --[:ENABLES]--> [[error-propagation]]  -- Meaningful errors need context
[[provenance-system]] --[:THREADS_THROUGH]--> [[elaboration-context]]  -- ctx.trace stack
[[v2-track]] --[:IMPLEMENTS]--> [[provenance-system]]  -- Track function
[[v2-track]] --[:EXTENDS]--> [[elaboration-monad]]  -- Trace extension
[[provenance-display]] --[:USES]--> [[provenance-system]]  -- Stack rendering
[[provenance-display]] --[:USES]--> [[pretty-printing]]  -- Term display
[[provenance-display]] --[:REPORTS]--> [[error-causes]]  -- Error paths
[[pretty-printing]] --[:USES]--> [[nf-value]]  -- Renders normal forms
[[pretty-printing]] --[:REPORTS]--> [[elaboration]]  -- Human-readable output
[[pretty-printing]] --[:USES]--> [[quoting]]  -- NF → EB → render
[[pretty-printing]] --[:USES]--> [[zonking]]  -- Resolves metas before display
[[src-term]] --[:PRODUCES]--> [[eb-term]]  -- Via elaboration
[[eb-term]] --[:NORMALIZES_TO]--> [[nf-value]]  -- Via evaluation
[[nf-value]] --[:QUOTES_TO]--> [[eb-term]]  -- Via quoting
[[src-term]] --[:CONTRASTS_WITH]--> [[eb-term]]  -- Surface vs core
[[eb-term]] --[:CONTRASTS_WITH]--> [[nf-value]]  -- Syntax vs semantic domain
[[parser-processors]] --[:PRODUCES]--> [[src-term]]  -- Grammar → AST
[[src-to-eb-transformation]] --[:CONSUMES]--> [[src-term]]  -- Source input
[[src-to-eb-transformation]] --[:PRODUCES]--> [[eb-term]]  -- Elaborated output
[[src-to-eb-transformation]] --[:INSTANTIATES]--> [[meta-variables]]  -- Holes, implicit args
[[test-utility]] --[:USES]--> [[parser-processors]]  -- Parses input
[[test-utility]] --[:USES]--> [[elaboration-monad]]  -- V2.Do pipeline
[[test-utility]] --[:USES]--> [[constraint-solver]]  -- Solve constraints
[[test-utility]] --[:SNAPSHOTS]--> [[elaboration]]  -- Pretty + structure output
[[snapshot-testing]] --[:USES]--> [[test-utility]]  -- elaborateFrom
[[snapshot-testing]] --[:SNAPSHOTS]--> [[pretty-printing]]  -- Inline snapshots
[[snapshot-testing]] --[:PRESERVES]--> [[test-utility]]  -- Determinism via resets
[[repl]] --[:USES]--> [[parser-processors]]  -- Parses each input
[[repl]] --[:USES]--> [[v1-elaboration-pipeline]]  -- Elaborates
[[repl]] --[:USES]--> [[mir-lowering]]  -- Optional MIR mode
[[repl]] --[:THREADS_THROUGH]--> [[elaboration-context]]  -- Persistent ctx
[[pipeline-explorer]] --[:REPORTS]--> [[yap]]  -- Visualizes pipeline stages
[[brainstorming-artifacts]] --[:INFORMS]--> [[yap]]  -- Roadmap decisions
[[vc-ir]] --[:SUPERSEDES]--> [[smt-translation]]  -- Backend-neutral replaces Z3
[[vc-ir]] --[:TRANSLATES_TO]--> [[verification-pipeline]]  -- NF.Value → formulas
[[vc-normalization]] --[:NORMALIZES_TO]--> [[vc-ir]]  -- Simplifies formulas
[[vc-normalization]] --[:FOLLOWS]--> [[translation-boundary-vc]]  -- After translation
[[quantifier-preparation]] --[:FOLLOWS]--> [[vc-normalization]]  -- After normalization
[[quantifier-preparation]] --[:REWRITES]--> [[vc-ir]]  -- Prenex + skolemize + triggers
[[boolean-lowering-cnf]] --[:FOLLOWS]--> [[quantifier-preparation]]  -- After quantifier prep
[[boolean-lowering-cnf]] --[:TRANSLATES_TO]--> [[vc-ir]]  -- Formula → clauses
[[boolean-lowering-cnf]] --[:PRESERVES]--> [[vc-ir]]  -- Theory atoms untouched
[[translation-boundary-vc]] --[:SUPERSEDES]--> [[smt-translation]]  -- New translation tools
[[translation-boundary-vc]] --[:CONSUMES]--> [[nf-value]]  -- NF.Value input
[[translation-boundary-vc]] --[:DELEGATES_TO]--> [[vc-ir]]  -- Produces VC types
[[ivl-boundary]] --[:DEFINES]--> [[vc-ir]]  -- IVL IR contract
[[cdcl-t-solver]] --[:IMPLEMENTS]--> [[verification-pipeline]]  -- Replaces Z3
[[cdcl-t-solver]] --[:CONSUMES]--> [[boolean-lowering-cnf]]  -- CNF clauses
[[cdcl-t-solver]] --[:DELEGATES_TO]--> [[theory-plugin-interface]]  -- Theory propagation
[[theory-plugin-interface]] --[:ENABLES]--> [[cdcl-t-solver]]  -- Modular theories
[[verification-backend]] --[:SPECIALIZES]--> [[verification-pipeline]]  -- Backend subsystem of the pipeline
[[verification-backend]] --[:WRAPS]--> [[cdcl-t-solver]]  -- Simple API
[[euf-theory]] --[:IMPLEMENTS]--> [[theory-plugin-interface]]  -- Congruence closure
[[euf-theory]] --[:ENABLES]--> [[quantifier-engine]]  -- Trigger matching
[[arithmetic-theory]] --[:IMPLEMENTS]--> [[theory-plugin-interface]]  -- Simplex
[[arithmetic-theory]] --[:COMPOSES_WITH]--> [[string-theory]]  -- Length coupling
[[string-theory]] --[:IMPLEMENTS]--> [[theory-plugin-interface]]  -- Word equations
[[string-theory]] --[:DELEGATES_TO]--> [[arithmetic-theory]]  -- Length lemmas
[[row-theory]] --[:IMPLEMENTS]--> [[theory-plugin-interface]]  -- Row containment
[[row-theory]] --[:MIRRORS]--> [[row-unification-mechanism]]  -- Same label decomposition
[[row-theory]] --[:PRESERVES]--> [[verification-pipeline]]  -- subtype.contains() semantics
[[quantifier-engine]] --[:IMPLEMENTS]--> [[theory-plugin-interface]]  -- Instantiation
[[quantifier-engine]] --[:DELEGATES_TO]--> [[euf-theory]]  -- E-matching
[[z3-replacement-decision]] --[:MOTIVATES]--> [[vc-ir]]  -- Backend-neutral IR needed
[[z3-replacement-decision]] --[:MOTIVATES]--> [[cdcl-t-solver]]  -- Own solver needed
[[z3-replacement-decision]] --[:SUPERSEDES]--> [[smt-translation]]  -- Z3 dependency removed
[[z3-replacement-decision]] --[:PRESERVES]--> [[verification-pipeline]]  -- Shape unchanged
[[num-sort-semantics]] --[:APPLIES_TO]--> [[arithmetic-theory]]  -- Int vs Real
[[non-linear-arithmetic]] --[:CONSTRAINS]--> [[arithmetic-theory]]  -- Linearizable subset first
[[non-linear-arithmetic]] --[:COMPOSES_WITH]--> [[nbe]]  -- Constant-folding removes ground arith
[[higher-order-in-formulas]] --[:CONSTRAINS]--> [[quantifier-engine]]  -- No HO quantification
[[milestone-1-ir-boundary]] --[:PRODUCES]--> [[vc-ir]]  -- First deliverable
[[milestone-1-ir-boundary]] --[:PRODUCES]--> [[translation-boundary-vc]]  -- Translation tools
[[milestone-1-ir-boundary]] --[:FOLLOWS]--> [[z3-replacement-decision]]  -- First step
[[milestone-2-euf-quant-lia]] --[:PRODUCES]--> [[cdcl-t-solver]]  -- Core solver
[[milestone-2-euf-quant-lia]] --[:PRODUCES]--> [[euf-theory]]  -- EUF module
[[milestone-2-euf-quant-lia]] --[:PRODUCES]--> [[arithmetic-theory]]  -- Arithmetic module
[[milestone-2-euf-quant-lia]] --[:FOLLOWS]--> [[milestone-1-ir-boundary]]  -- After IR
[[milestone-3-strings]] --[:PRODUCES]--> [[string-theory]]  -- String module
[[milestone-3-strings]] --[:FOLLOWS]--> [[milestone-2-euf-quant-lia]]  -- After core
[[milestone-4-rows]] --[:PRODUCES]--> [[row-theory]]  -- Row module
[[milestone-4-rows]] --[:FOLLOWS]--> [[milestone-3-strings]]  -- After strings
[[milestone-5-explanations]] --[:FOLLOWS]--> [[milestone-4-rows]]  -- After rows
[[required-formula-forms]] --[:CONSTRAINS]--> [[vc-ir]]  -- IR must express all forms
[[required-theory-support]] --[:CONSTRAINS]--> [[theory-plugin-interface]]  -- All theories needed
[[cas-instead-of-smt]] --[:CONTRASTS_WITH]--> [[z3-replacement-decision]]  -- Alternative rejected
[[nieuwenhuis-oliveras]] --[:INFORMS]--> [[cdcl-t-solver]]  -- DPLL(T) architecture
[[nelson-oppen]] --[:INFORMS]--> [[theory-plugin-interface]]  -- Cooperating procedures
[[de-moura-bjorner-z3]] --[:INFORMS]--> [[cdcl-t-solver]]  -- Industrial reference
[[barbosa-cvc5]] --[:INFORMS]--> [[cdcl-t-solver]]  -- Modern reference
[[liang-strings]] --[:INFORMS]--> [[string-theory]]  -- DPLL(T) string solver
[[reynolds-strings]] --[:INFORMS]--> [[string-theory]]  -- Context-dependent simplification
[[ge-de-moura-quantifiers]] --[:INFORMS]--> [[quantifier-engine]]  -- Complete instantiation
[[dutertre-arithmetic]] --[:INFORMS]--> [[arithmetic-theory]]  -- Fast linear arithmetic
[[neutrals]] --[:WRAPS]--> [[nf-value]]  -- Unsolved computations wrapped
[[neutrals]] --[:ENABLES]--> [[nbe]]  -- Stuck terms represent unknowns
[[nbe]] --[:USES]--> [[closures]]  -- Lazy substitution
[[nbe]] --[:USES]--> [[neutrals]]  -- Stuck computations
[[nbe]] --[:NORMALIZES_TO]--> [[nf-value]]  -- Evaluation direction
[[nbe]] --[:QUOTES_TO]--> [[eb-term]]  -- Readback direction
[[nbe]] --[:PRESERVES]--> [[dependent-types]]  -- Beta-eta equivalence
[[hindley-milner]] --[:INFORMS]--> [[generalization]]  -- Let-polymorphism theory
[[hindley-milner]] --[:INFORMS]--> [[meta-variables]]  -- Unification-based inference
[[system-f]] --[:INFORMS]--> [[pi-types]]  -- Parametric polymorphism foundation
[[system-f]] --[:INFORMS]--> [[hindley-milner]]  -- Explicit polymorphism
[[structural-typing]] --[:ENABLES]--> [[row-polymorphism]]  -- Structure-based identity
[[structural-subtyping]] --[:CONTRASTS_WITH]--> [[row-polymorphism]]  -- Subtyping vs parametric
[[nominal-typing]] --[:CONTRASTS_WITH]--> [[typeclass-emulation]]  -- Class hierarchy vs structural

## Cross-Batch Connections  @2026-05-17

### 8 ↔ 2 (Implementation internals ↔ Language features)

[[unification-algorithm]] --[:IMPLEMENTS]--> [[pi-types]]  -- Pi-Pi equality checking case
[[unification-algorithm]] --[:IMPLEMENTS]--> [[sigma-types]]  -- Sigma-Sigma equality checking case
[[unification-algorithm]] --[:IMPLEMENTS]--> [[variant-types]]  -- Variant-Variant equality checking case
[[row-unification-mechanism]] --[:IMPLEMENTS]--> [[row-polymorphism]]  -- Type-level row unification
[[constraint-solver]] --[:ENABLES]--> [[deferred-constraint-solving]]  -- Batch processing at let boundaries
[[substitution-system]] --[:ZONKS]--> [[holes]]  -- Fresh metas after solving
[[sigma-bindings]] --[:IMPLEMENTS]--> [[sigma-types]]  -- Dependent field references
[[sigma-bindings]] --[:ENABLES]--> [[structural-records]]  -- Field-to-field dependency
[[de-bruijn-levels]] --[:ENABLES]--> [[lambda]]  -- Evaluation under binders
[[closures]] --[:IMPLEMENTS]--> [[lambda]]  -- Closure = captured env + body
[[quoting]] --[:ENABLES]--> [[pretty-printing]]  -- NF values → readable terms
[[nondeterminism-multishot]] --[:IMPLEMENTS]--> [[continuation-binders]]  -- Multishot resume semantics
[[trampoline-evaluator]] --[:IMPLEMENTS]--> [[cbv-evaluation]]  -- Without stack overflow
[[knot-tying]] --[:IMPLEMENTS]--> [[blocks]]  -- Recursive let self-referential evaluation
[[variable-evaluation-dispatch]] --[:IMPLEMENTS]--> [[ffi]]  -- Foreign variable lookup
[[provenance-system]] --[:THREADS_THROUGH]--> [[bidirectional-checking]]  -- Checking/inference trace

### 8 ↔ 7 (Implementation internals ↔ Typing rules)

[[unification-algorithm]] --[:IMPLEMENTS]--> [[typing-rules]]  -- (Conv) rule: assignment → unify
[[variable-evaluation-dispatch]] --[:IMPLEMENTS]--> [[typing-rules]]  -- (Var) rule: context lookup
[[application-evaluation]] --[:IMPLEMENTS]--> [[typing-rules]]  -- (App) rule at NF level
[[sigma-bindings]] --[:IMPLEMENTS]--> [[typing-rules]]  -- Sigma typing (impl ahead of spec)
[[knot-tying]] --[:IMPLEMENTS]--> [[typing-rules]]  -- Recursive types (Mu) typing (no spec)
[[occurs-check]] --[:DETECTS]--> [[typing-rules]]  -- Failures producing Mu wrapping
[[trampoline-evaluator]] --[:IMPLEMENTS]--> [[typing-rules]]  -- Operational semantics via NbE

### 5 ↔ 8 (Decisions ↔ Implementation internals)

[[levels-vs-indices]] --[:MOTIVATES]--> [[de-bruijn-indices]]  -- Index representation choice
[[levels-vs-indices]] --[:MOTIVATES]--> [[de-bruijn-levels]]  -- Level representation choice
[[types-as-terms]] --[:ENABLES]--> [[trampoline-evaluator]]  -- Evaluate types like values
[[whnf-vs-full-normalization]] --[:CONSTRAINS]--> [[trampoline-evaluator]]  -- Evaluation depth
[[bidirectional-checking-decision]] --[:DISPATCHES_ON]--> [[src-to-eb-transformation]]  -- Mode drives Src → EB
[[structural-row-based-types]] --[:MOTIVATES]--> [[row-data-structure]]  -- Row structure choice
[[structural-row-based-types]] --[:MOTIVATES]--> [[row-rewriting]]  -- Row mechanism choice

### 4 ↔ 2 (Mechanisms ↔ Language features)

[[zonking]] --[:ZONKS]--> [[holes]]  -- Metas after constraint solving
[[zonking]] --[:RESOLVES]--> [[application]]  -- Meta-variables from implicit insertion
[[elaboration-context]] --[:THREADS_THROUGH]--> [[lambda]]  -- Binder extension
[[elaboration-context]] --[:THREADS_THROUGH]--> [[pi-types]]  -- Binder extension
[[elaboration-context]] --[:THREADS_THROUGH]--> [[match]]  -- Binder extension
[[elaboration-monad]] --[:ENABLES]--> [[shift-reset]]  -- Via MutState.skolems
[[constraint-solver]] --[:ENABLES]--> [[implicit-resolution]]  -- Δ lookup phase
[[smt-translation]] --[:TRANSLATES_TO]--> [[refinement-types]]  -- Verification conditions

### 1 ↔ 8 (Pipeline ↔ Implementation)

[[mir-lowering]] --[:CONSUMES]--> [[eb-term]]  -- EB.Term for IR translation

### 9 ↔ 1 (SMT solver ↔ Pipeline)

[[verification-pipeline]] --[:DELEGATES_TO]--> [[verification-backend]]  -- Satisfiability checking
[[verification-pipeline]] --[:PRODUCES]--> [[vc-ir]]  -- VC.Formula via translation boundary
[[cdcl-t-solver]] --[:SUPERSEDES]--> [[smt-translation]]  -- Replaces Z3 invocation

### 9 ↔ 2 (SMT solver ↔ Language features)

[[vc-ir]] --[:ENCODES]--> [[refinement-types]]  -- Predicates as VC.Formula
[[row-theory]] --[:IMPLEMENTS]--> [[row-polymorphism]]  -- Width subtyping, containment
[[arithmetic-theory]] --[:VALIDATES]--> [[primitive-signature]]  -- Arithmetic operations
[[string-theory]] --[:VALIDATES]--> [[primitive-signature]]  -- String primitives
[[quantifier-engine]] --[:IMPLEMENTS]--> [[refinement-types]]  -- Guarded universal quantification
[[vc-ir]] --[:ENCODES]--> [[modalities]]  -- Modal verification constraints

### 9 ↔ 4 (SMT solver ↔ Mechanisms)

[[verification-backend]] --[:ENABLES]--> [[vc-provenance]]  -- Unsat-core reporting

### 9 ↔ 8 (SMT solver ↔ Implementation internals)

[[euf-theory]] --[:MIRRORS]--> [[unification-algorithm]]  -- Term equality ↔ type equality
[[milestone-5-explanations]] --[:COMPOSES_WITH]--> [[provenance-system]]  -- End-to-end error reporting
[[milestone-5-explanations]] --[:PRODUCES]--> [[vc-provenance]]  -- Explanation/model infrastructure

## Semantic Enrichment — Parallel Edges  @2026-05-17

### NbE pipeline

[[nbe]] --[:DELEGATES_TO]--> [[closures]]  -- Lazy substitution mechanism
[[nbe]] --[:DELEGATES_TO]--> [[trampoline-evaluator]]  -- Stack-safe execution

### Elaboration monad

[[elaboration-monad]] --[:THREADS_THROUGH]--> [[elaboration-context]]  -- Reader component
[[elaboration-monad]] --[:PROPAGATES_VIA]--> [[generator-monad]]  -- Generator yield protocol
[[elaboration-monad]] --[:WRAPS]--> [[generator-monad]]  -- ReaderWriterStateEither algebraic structure
[[elaboration-monad]] --[:DELEGATES_TO]--> [[nondeterminism]]  -- MutState for skolems, metas
[[elaboration-monad]] --[:ENABLES]--> [[elaboration]]  -- Monadic pipeline
[[elaboration-monad]] --[:ENABLES]--> [[v2-elaboration-pipeline]]  -- V2 pipeline

### Row polymorphism

[[row-polymorphism]] --[:DELEGATES_TO]--> [[row-rewriting]]  -- Label lookup mechanism
[[row-polymorphism]] --[:INSTANTIATES]--> [[meta-variables]]  -- Fresh row variables (open tails)
[[row-polymorphism]] --[:SUBSUMES]--> [[structural-records]]  -- Rows generalize fixed-field records
[[row-polymorphism]] --[:SUBSUMES]--> [[variant-types]]  -- Rows generalize fixed-tag unions

### Meta-variables

[[meta-variables]] --[:THREADS_THROUGH]--> [[elaboration-monad]]  -- MutState.supply, ctx.metas

### Dependent types

[[dependent-types]] --[:FORMS]--> [[pi-types]]  -- Universal quantification with dependency
[[dependent-types]] --[:FORMS]--> [[sigma-types]]  -- Existential quantification with dependency
[[dependent-types]] --[:NORMALIZES_TO]--> [[nf-value]]  -- Types compute as terms
[[dependent-types]] --[:COMPOSES_WITH]--> [[row-polymorphism]]  -- Dependent rows
[[dependent-types]] --[:ENABLES]--> [[type-type]]  -- Types live in same universe as terms

### Implicit resolution

[[implicit-resolution]] --[:DISPATCHES_ON]--> [[constraint-types]]  -- Resolve → Δ, assign → unify
[[implicit-resolution]] --[:DELEGATES_TO]--> [[constraint-solver]]  -- Batch processing
[[implicit-resolution]] --[:PRESERVES]--> [[generalization]]  -- Rejects subst-producing candidates
[[implicit-resolution]] --[:INSTANTIATES]--> [[meta-variables]]  -- Insertion creates fresh unknowns
[[implicit-resolution]] --[:RESOLVES]--> [[deferred-constraint-solving]]  -- At let boundaries

### Verification pipeline

[[verification-pipeline]] --[:ERASES]--> [[pi-types]]  -- Functions → uninterpreted
[[verification-pipeline]] --[:DETECTS]--> [[refinement-types]]  -- Counterexample generation
[[verification-pipeline]] --[:REPORTS]--> [[provenance-system]]  -- Provenance-annotated failures

### GRAM

[[gram]] --[:TRANSLATES_TO]--> [[js-codegen]]  -- Target-specific passes
[[gram]] --[:TRANSLATES_TO]--> [[c-codegen]]  -- Target-specific passes
[[gram]] --[:TRANSLATES_TO]--> [[erlang-codegen]]  -- Target-specific passes
[[gram]] --[:DELEGATES_TO]--> [[dpo-rewriting]]  -- Graph transformation engine

### Pattern matching compilation

[[pattern-matching-compilation]] --[:ERASES]--> [[match]]  -- Patterns removed after compilation
[[pattern-matching-compilation]] --[:USES]--> [[maranget-paper]]  -- Decision-tree algorithm

### Bidirectional checking

[[bidirectional-checking]] --[:INTRODUCES]--> [[pi-types]]  -- Types in check mode
[[bidirectional-checking]] --[:ELIMINATES]--> [[pi-types]]  -- Types in infer mode
[[bidirectional-checking]] --[:DISPATCHES_ON]--> [[elaboration]]  -- Check vs infer mode
[[bidirectional-checking]] --[:DELEGATES_TO]--> [[constraint-solver]]  -- At let boundaries
[[bidirectional-checking]] --[:COERCES_TO]--> [[pi-types]]  -- Infer to check mode switch

### Equirecursive types

[[equirecursive-types]] --[:REWRITES]--> [[mu-types]]  -- Unfold-and-recurse during unification
[[equirecursive-types]] --[:DETECTS]--> [[nbe]]  -- Infinite unfolding (step limit)
[[equirecursive-types]] --[:DELEGATES_TO]--> [[mu-type-unification]]  -- Checking delegation

### Delimited continuations

[[shift-reset]] --[:INSTANTIATES]--> [[continuation-binders]]  -- Via skolem-like metas
[[shift-reset]] --[:DELEGATES_TO]--> [[nondeterminism]]  -- Multishot replay
[[shift-reset]] --[:NORMALIZES_TO]--> [[closures]]  -- Continuation closure (captured frames)
[[shift-reset]] --[:TRANSLATES_TO]--> [[mir-lowering]]  -- State machines (planned)

## Multi-target Expansion + Orphan Fixes  @2026-05-17

### Batch section expansions

[[lambda]] --[:ENCODES]--> [[closures]]  -- Function values as closures
[[effects-as-modality]] --[:COMPOSES_WITH]--> [[verification-pipeline]]  -- Effect verification
[[type-erasure]] --[:ADDRESSES]--> [[ffi]]  -- Dummy type args
[[type-erasure]] --[:ENABLES]--> [[js-codegen]]  -- Cleaner codegen
[[multishot-serialization]] --[:MOTIVATES]--> [[selective-cps]]  -- Alternative approach
[[usage-semantics]] --[:GROUNDED_IN]--> [[idris-1-qtt-paper]]  -- Idris 2 implementation precedent
[[structural-row-based-types]] --[:REJECTS]--> [[nominal-typing]]  -- Not primary type discipline
[[koka-influence]] --[:INSPIRES]--> [[effects-as-modality]]  -- Effect tracking model
[[closures]] --[:ENABLES]--> [[nbe]]  -- Evaluation without substitution
[[repl]] --[:USES]--> [[js-codegen]]  -- Code generation
[[src-to-eb-transformation]] --[:DISPATCHES_ON]--> [[src-term]]  -- Src.Term type drives dispatch
[[parser-processors]] --[:DISPATCHES_ON]--> [[src-term]]  -- Grammar rule postprocessors
[[parser-processors]] --[:TRANSLATES_TO]--> [[src-term]]  -- Token arrays → AST nodes
[[repl]] --[:DISPATCHES_ON]--> [[mir-lowering]]  -- Standard, --mir, --codegen modes
[[whnf-codification]] --[:ADDRESSES]--> [[whnf-vs-full-normalization]]  -- Formalize the WHNF boundary

### Orphan zettel connections

[[functional-patterns]] --[:EXTENDS]--> [[match]]  -- Curry-style patterns, view patterns
[[functional-patterns]] --[:REQUIRES]--> [[elaboration]]  -- Elaboration redesign needed
[[logic-programming]] --[:INSPIRES]--> [[elaboration]]  -- miniKanren-like relational fragments
[[logic-programming]] --[:USES]--> [[unification]]  -- Relational reasoning via unification
[[lsp]] --[:REPORTS]--> [[yap]]  -- Language server protocol
[[lsp]] --[:USES]--> [[v2-elaboration-pipeline]]  -- Incremental analysis
[[lsp]] --[:USES]--> [[tree-sitter-parser]]  -- Incremental parsing
[[records-indexed-separation]] --[:ADDRESSES]--> [[structural-records]]  -- Syntax confusion with indexed types
[[records-indexed-separation]] --[:ADDRESSES]--> [[lists]]  -- Indexed vs plain record clarity
[[records-indexed-separation]] --[:ADDRESSES]--> [[dictionaries]]  -- Indexed vs plain record clarity
[[solver-module-layout]] --[:APPLIES_TO]--> [[cdcl-t-solver]]  -- Internal module structure
[[solver-module-layout]] --[:APPLIES_TO]--> [[theory-plugin-interface]]  -- Separation of concerns
[[yap-explore]] --[:REPORTS]--> [[yap]]  -- Web dashboard for pipeline stages
[[yap-explore]] --[:USES]--> [[v1-elaboration-pipeline]]  -- Displays elaboration output
[[yap-explore]] --[:USES]--> [[pretty-printing]]  -- Term rendering
[[yap-explore]] --[:MIRRORS]--> [[pipeline-explorer]]  -- Same tool, alternate zettel

## Batch-Internal Expansion (Round 2)  @2026-05-17

### Batch 1 — Pipeline

[[nearley-parser]] --[:CONTRASTS_WITH]--> [[tree-sitter-parser]]  -- Ambiguous CFG vs error-recovering incremental
[[tree-sitter-parser]] --[:TRANSLATES_TO]--> [[src-term]]  -- Incremental parse tree → CST
[[v2-elaboration-pipeline]] --[:FOLLOWS]--> [[v1-elaboration-pipeline]]  -- Sequential development
[[js-codegen]] --[:TRANSLATES_TO]--> [[ffi]]  -- JavaScript source output
[[c-codegen]] --[:TRANSLATES_TO]--> [[ffi]]  -- C source output
[[erlang-codegen]] --[:TRANSLATES_TO]--> [[ffi]]  -- Erlang source output

### Batch 2a — Type formers

[[modalities]] --[:COMPOSES_WITH]--> [[pi-types]]  -- Graded function arguments
[[sigma-types]] --[:COMPOSES_WITH]--> [[variant-types]]  -- Dependent elimination produces variants
[[refinement-types]] --[:COMPOSES_WITH]--> [[pi-types]]  -- Refined function domains/codomains

### Batch 2b — Data structures

[[projection]] --[:DISPATCHES_ON]--> [[nf-value]]  -- Schema, Sigma, Neutral, Flex
[[injection]] --[:DISPATCHES_ON]--> [[nf-value]]  -- Neutral, Var, Schema, Variant, Sigma
[[lists]] --[:CONTRASTS_WITH]--> [[tuples]]  -- Homogeneous indexed vs heterogeneous positional

### Batch 2c — Expressions

[[application]] --[:DUAL_OF]--> [[lambda]]  -- Intro/elim pair for Pi
[[spineful-applications]] --[:ADDRESSES]--> [[application]]  -- Nested App complexity
[[answer-type-polymorphism]] --[:USES]--> [[pi-types]]  -- Polymorphic answer type is a Pi

### Batch 2d — Continuations

[[nondeterminism]] --[:IMPLEMENTS]--> [[shift-reset]]  -- Multishot continuation semantics
[[effects-as-modality]] --[:COMPOSES_WITH]--> [[shift-reset]]  -- Effect system over continuations

### Batch 2g — Semantics

[[cbv-evaluation]] --[:IMPLEMENTS]--> [[nbe]]  -- Spec vs implementation
[[cbv-evaluation]] --[:CONTRASTS_WITH]--> [[strict-vs-lazy]]  -- Evaluation strategy contrast
[[primitive-signature]] --[:USES]--> [[ffi]]  -- Foreign δ-rules
[[primitive-signature]] --[:ENCODES]--> [[cbv-evaluation]]  -- Arithmetic/boolean/comparison as built-in δ-rules

### Batch 3 — Lowering

[[saturation]] --[:DISPATCHES_ON]--> [[ffi]]  -- Known-arity foreign/ref functions
[[saturation]] --[:ADDRESSES]--> [[application]]  -- Collapse App chains into primop nodes
[[gram-step-1]] --[:FOLLOWS]--> [[mir-retrospective]]  -- Lessons learned inform first step
[[gram-step-1]] --[:TRANSLATES_TO]--> [[gram]]  -- EB.Term → GRAM nodes
[[logram]] --[:TRANSLATES_TO]--> [[gram]]  -- Triple store / Datalog facts
[[logram]] --[:USES]--> [[egglog-influence]]  -- Equality saturation substrate
[[mir-retrospective]] --[:REJECTS]--> [[mir-lowering]]  -- Closure conversion mistake identified

### Batch 4 — Mechanisms

[[elaboration-monad]] --[:THREADS_THROUGH]--> [[meta-variables]]  -- MutState manages meta store
[[smt-translation]] --[:ERASES]--> [[pi-types]]  -- Functions → uninterpreted in SMT

### Batch 5 — Decisions

[[modality-system]] --[:EXTENDS]--> [[modalities]]  -- Design details of the modal wrapper
[[mutual-recursion]] --[:REQUIRES]--> [[constraint-solver]]  -- Multi-pass constraint solving

### Batch 8b — Sigma/De Bruijn/Closures

[[closures]] --[:WRAPS]--> [[eb-term]]  -- Deferred substitution (EB.Term + Context)
[[closures]] --[:PRESERVES]--> [[lambda]]  -- Lexical scope captured at binding site
[[closures]] --[:RELIES_ON]--> [[de-bruijn-levels]]  -- Level-indexed environments

### Batch 8c — Nondeterminism/Evaluation

[[variable-evaluation-dispatch]] --[:DISPATCHES_ON]--> [[nf-value]]  -- Meta, Bound, Free, Label, Foreign
[[application-evaluation]] --[:DISPATCHES_ON]--> [[nf-value]]  -- Abs → closure, External → partial, PrimOp → δ
[[nondeterminism-multishot]] --[:THREADS_THROUGH]--> [[elaboration-monad]]  -- MutState.nondeterminism
[[nondeterminism-multishot]] --[:DISPATCHES_ON]--> [[constraint-solver]]  -- Solution emptiness check
[[knot-tying]] --[:WRAPS]--> [[nbe]]  -- Placeholder entry mutated after evaluation
[[evaluation-step-limit]] --[:ADDRESSES]--> [[nbe]]  -- Non-termination prevention

### Batch 8d — Errors/Provenance

[[error-causes]] --[:DISPATCHES_ON]--> [[nf-value]]  -- UnificationFailure, RowMismatch, etc.
[[v2-track]] --[:THREADS_THROUGH]--> [[elaboration-context]]  -- Extends ctx.trace per step

### Batch 9 — SMT Solver

[[solver-module-layout]] --[:ENCODES]--> [[cdcl-t-solver]]  -- IR / SAT / theories / explanation separation
[[milestone-5-explanations]] --[:ADDRESSES]--> [[verification-pipeline]]  -- Error quality improvement

## Batch-Internal Expansion (Round 3)  @2026-05-17

### 2c — Expressions

[[lambda]] --[:DISPATCHES_ON]--> [[pi-types]]  -- Explicit λ vs implicit λ{} icit matching
[[lambda]] --[:COMPOSES_WITH]--> [[application]]  -- β-redex pair
[[application]] --[:COMPOSES_WITH]--> [[lambda]]  -- β-redex pair
[[application]] --[:DISPATCHES_ON]--> [[src-term]]  -- Explicit app vs @-implicit app
[[tagged-values]] --[:ENCODES]--> [[row-polymorphism]]  -- Open row tail on TYPE, closed on term
[[match]] --[:DISPATCHES_ON]--> [[variant-types]]  -- Variant, Struct, Lit, List, Wildcard, Binder
[[match]] --[:COMPOSES_WITH]--> [[tagged-values]]  -- Intro/elim pair for variants
[[blocks]] --[:INTRODUCES]--> [[elaboration-context]]  -- Local scope via let bindings
[[pattern-matching-compilation]] --[:TRANSLATES_TO]--> [[mir-lowering]]  -- Maranget decision trees

### 2d — Continuations

[[continuation-binders]] --[:ENCODES]--> [[meta-variables]]  -- Resumption as meta in MutState.skolems
[[shift-reset]] --[:ELIMINATES]--> [[continuation-binders]]  -- Resume applies k
[[shift-reset-mir-lowering]] --[:TRANSLATES_TO]--> [[mir-lowering]]  -- State machine (heap-allocated frames)

### 2e — Implicits

[[implicit-resolution]] --[:COMPOSES_WITH]--> [[generalization]]  -- Deferred resolution preserves generality
[[typeclass-emulation]] --[:ENCODES]--> [[implicit-environment]]  -- Instances as record values in Δ

### 2f — FFI/modules

[[ffi]] --[:ENCODES]--> [[elaboration-context]]  -- External functions as Var(Foreign)
[[ffi]] --[:TRANSLATES_TO]--> [[js-codegen]]  -- Curried JS functions (.ffi.js companions)
[[module-system]] --[:THREADS_THROUGH]--> [[elaboration-context]]  -- ctx.imports

### 3 — Lowering

[[dpo-rewriting]] --[:REWRITES]--> [[gram]]  -- L ← K → R rule application on nodes
[[gram]] --[:REJECTS]--> [[gram-as-s-expressions]]  -- Cycles break tree model
[[defunctionalization]] --[:TRANSLATES_TO]--> [[mir-lowering]]  -- Tagged dispatch on function identity
[[closure-conversion]] --[:TRANSLATES_TO]--> [[mir-lowering]]  -- Environment + function pointer
[[closure-conversion]] --[:ERASES]--> [[lambda]]  -- Flattens lexical scope to heap allocation
[[mlir-influence]] --[:MIRRORS]--> [[gram]]  -- Dialects ↔ tag vocabularies, passes ↔ rewrites
[[structural-vs-representational-passes]] --[:DISTINGUISHES]--> [[gram]]  -- Eta/beta/fold before closure-conv/defunc
[[egglog-influence]] --[:MIRRORS]--> [[logram]]  -- Equality saturation ↔ graph saturation

### 5 — Decisions

[[usage-semantics]] --[:EXTENDS]--> [[modalities]]  -- Quantity dimension of the modal system

## Batch-Internal Expansion (Round 4)  @2026-05-17

### Batch 7 — Typing rules

[[typing-rules]] --[:DISPATCHES_ON]--> [[bidirectional-checking]]  -- Γ ⊢ e ⇐ A vs Γ ⊢ e ⇒ A
[[missing-spec-shift-reset]] --[:ADDRESSES]--> [[documentation-debt]]  -- Spec gap
[[missing-spec-let-polymorphism]] --[:ADDRESSES]--> [[documentation-debt]]  -- Spec gap
[[missing-spec-sigma-types]] --[:ADDRESSES]--> [[documentation-debt]]  -- Spec gap
[[missing-spec-recursive-types]] --[:ADDRESSES]--> [[documentation-debt]]  -- Spec gap

### Batch 9b — CDCL(T) solver internals

[[cdcl-t-solver]] --[:DISPATCHES_ON]--> [[theory-plugin-interface]]  -- EUF, arithmetic, strings, rows, quantifiers
[[cdcl-t-solver]] --[:TRAVERSES]--> [[boolean-lowering-cnf]]  -- SAT decides boolean skeleton
[[cdcl-t-solver]] --[:PRODUCES]--> [[verification-backend]]  -- SolveResult (sat/unsat/unknown)
[[theory-plugin-interface]] --[:SPECIALIZES]--> [[nelson-oppen]]  -- Cooperating decision procedures
[[theory-plugin-interface]] --[:DISPATCHES_ON]--> [[cdcl-t-solver]]  -- Theories receive literals from SAT

### Batch 9c — Theory modules

[[euf-theory]] --[:RESOLVES]--> [[unification]]  -- Congruence propagation
[[euf-theory]] --[:WRAPS]--> [[cdcl-t-solver]]  -- Hash-consed term arena shared across theories
[[euf-theory]] --[:TRAVERSES]--> [[cdcl-t-solver]]  -- Trigger matching over e-class arena
[[arithmetic-theory]] --[:RESOLVES]--> [[cdcl-t-solver]]  -- Simplex feasibility for linear constraints
[[arithmetic-theory]] --[:DISPATCHES_ON]--> [[cdcl-t-solver]]  -- Int → branch-and-bound, Real → simplex
[[string-theory]] --[:REWRITES]--> [[cdcl-t-solver]]  -- Contains/prefix/suffix → concat equalities
[[string-theory]] --[:INSTANTIATES]--> [[meta-variables]]  -- Fresh witnesses for decomposition
[[string-theory]] --[:USES]--> [[arithmetic-theory]]  -- Length coupling
[[row-theory]] --[:USES]--> [[cdcl-t-solver]]  -- Emits child obligations for field values
[[row-theory]] --[:DELEGATES_TO]--> [[cdcl-t-solver]]  -- Nested obligation emission
[[quantifier-engine]] --[:DISPATCHES_ON]--> [[euf-theory]]  -- Triggers → E-match, none → bounded MBQI
[[quantifier-engine]] --[:INSTANTIATES]--> [[cdcl-t-solver]]  -- Ground substitutions asserted
[[quantifier-engine]] --[:USES]--> [[euf-theory]]  -- E-matching over arena

### Batch 9a — VC IR internals

[[vc-ir]] --[:ENCODES]--> [[verification-pipeline]]  -- All formula forms from current verification
[[vc-normalization]] --[:TRAVERSES]--> [[vc-ir]]  -- Walk and simplify formulas
[[boolean-lowering-cnf]] --[:ENCODES]--> [[vc-ir]]  -- Origin metadata for provenance
[[ivl-boundary]] --[:ENCODES]--> [[vc-ir]]  -- IVL.Formula replaces Expr
[[ivl-boundary]] --[:INCLUDES]--> [[vc-ir]]  -- vc field is IVL.Formula
[[required-formula-forms]] --[:ENCODES]--> [[verification-pipeline]]  -- Existing verification capabilities

### Batch 1 — Pipeline

[[v2-elaboration-pipeline]] --[:MIRRORS]--> [[v1-elaboration-pipeline]]  -- Same theory, fresh implementation

### Remaining multi-target expansions

[[closures]] --[:PRESERVES]--> [[nbe]]  -- Lexical scope captured at binding site
[[nondeterminism]] --[:THREADS_THROUGH]--> [[elaboration-monad]]  -- MutState.nondeterminism.solution
[[nondeterminism]] --[:DISPATCHES_ON]--> [[constraint-solver]]  -- Solution emptiness (single vs replay)

## GRAM Architecture Principles  @2026-05-18

[[gram-additive-enrichment]] --[:CONSTRAINS]--> [[gram]]  -- All passes must follow
[[gram-additive-enrichment]] --[:CONTRASTS_WITH]--> [[mir-lowering]]  -- MIR erases/replaces; GRAM accumulates
[[gram-additive-enrichment]] --[:ENABLES]--> [[compilation-by-selection]]  -- Multiple views enable selection
[[gram-additive-enrichment]] --[:MIRRORS]--> [[mlir-influence]]  -- Multi-dialect coexistence pattern
[[gram-dataflow-semantics]] --[:CONSTRAINS]--> [[gram]]  -- No forced sequencing in graph
[[gram-dataflow-semantics]] --[:CONTRASTS_WITH]--> [[mir-lowering]]  -- Partial order vs total order (blocks)
[[gram-dataflow-semantics]] --[:CONTRASTS_WITH]--> [[shift-reset-mir-lowering]]  -- Dependency edges vs jump sequences
[[gram-dataflow-semantics]] --[:ENABLES]--> [[native-lambda-hvm]]  -- Parallel reduction compatible
[[gram-dataflow-semantics]] --[:ENABLES]--> [[compilation-by-selection]]  -- Independence enables selectivity
[[compilation-by-selection]] --[:RELIES_ON]--> [[gram-additive-enrichment]]  -- Requires accumulated views
[[compilation-by-selection]] --[:RELIES_ON]--> [[gram-dataflow-semantics]]  -- Requires independence
[[compilation-by-selection]] --[:ADDRESSES]--> [[closure-conversion]]  -- Backend-specific (C yes, JS no)
[[compilation-by-selection]] --[:ADDRESSES]--> [[defunctionalization]]  -- Backend-specific (GPU yes, JS no)
[[compilation-by-selection]] --[:ADDRESSES]--> [[native-lambda-hvm]]  -- Backend-specific (HVM skips all)
[[compilation-by-selection]] --[:CONTRASTS_WITH]--> [[mir-lowering]]  -- Pass selection vs fixed representation

## GRAM Passes  @2026-05-18

[[gram-shift-reset-pass]] --[:IMPLEMENTS]--> [[gram]]  -- Pipeline pass
[[gram-shift-reset-pass]] --[:IMPLEMENTS]--> [[shift-reset]]  -- In GRAM context
[[gram-shift-reset-pass]] --[:CONTRASTS_WITH]--> [[shift-reset-mir-lowering]]  -- Annotation vs state machine
[[gram-shift-reset-pass]] --[:PRESERVES]--> [[shift-reset]]  -- reset/shift nodes unchanged
[[gram-shift-reset-pass]] --[:INSTANTIATES]--> [[gram-additive-enrichment]]  -- Adds bubble/continuation/resumption alongside existing nodes
[[gram-shift-reset-pass]] --[:INSTANTIATES]--> [[gram-dataflow-semantics]]  -- Resumptions unordered
[[gram-shift-reset-pass]] --[:FOLLOWS]--> [[saturation]]  -- Pipeline order

## GRAM Pattern Matching  @2026-05-18

[[pattern-matching-compilation]] --[:INCLUDES]--> [[gram-pattern-translation]]  -- Representation phase
[[pattern-matching-compilation]] --[:INCLUDES]--> [[gram-pattern-pass]]  -- Compilation phase
[[gram-pattern-pass]] --[:RELIES_ON]--> [[gram-pattern-translation]]  -- Reads pat:* nodes as input
[[gram-pattern-translation]] --[:IMPLEMENTS]--> [[gram]]  -- Part of translate.ts
[[gram-pattern-translation]] --[:TRANSLATES_TO]--> [[match]]  -- EB.Pattern → pat:* graph nodes
[[gram-pattern-translation]] --[:ENABLES]--> [[gram-pattern-pass]]  -- Makes patterns graph-queryable
[[gram-pattern-translation]] --[:COMPOSES_WITH]--> [[closure-conversion]]  -- pat:binder pushes onto binder stack
[[gram-pattern-pass]] --[:IMPLEMENTS]--> [[gram]]  -- Pipeline pass
[[gram-pattern-pass]] --[:USES]--> [[maranget-paper]]  -- Decision tree algorithm
[[gram-pattern-pass]] --[:PRESERVES]--> [[match]]  -- match/case/pat nodes unchanged
[[gram-pattern-pass]] --[:INSTANTIATES]--> [[gram-additive-enrichment]]  -- :decision_tree edge exemplifies principle
[[gram-pattern-pass]] --[:FOLLOWS]--> [[gram-shift-reset-pass]]  -- Pipeline ordering
[[gram]] --[:INCLUDES]--> [[gram-shift-reset-pass]]  -- Pipeline pass
[[gram]] --[:INCLUDES]--> [[gram-pattern-translation]]  -- Translation phase
[[gram]] --[:INCLUDES]--> [[gram-pattern-pass]]  -- Pipeline pass

## GRAM → MIR Bridge  @2026-05-18

[[gram-to-mir-bridge]] --[:CONSUMES]--> [[gram]]  -- Reads enriched graph
[[gram-to-mir-bridge]] --[:PRODUCES]--> [[mir-lowering]]  -- Emits MIR Module
[[gram-to-mir-bridge]] --[:VALIDATES]--> [[gram-additive-enrichment]]  -- Tests if enrichment is sufficient
[[gram-to-mir-bridge]] --[:RELIES_ON]--> [[gram-shift-reset-pass]]  -- Needs continuation structure
[[gram-to-mir-bridge]] --[:RELIES_ON]--> [[gram-pattern-pass]]  -- Needs decision trees
[[gram-to-mir-bridge]] --[:RELIES_ON]--> [[saturation]]  -- Needs external/primop
[[gram-to-mir-bridge]] --[:RELIES_ON]--> [[closure-conversion]]  -- Needs env/fn nodes
[[gram]] --[:GENERALIZES]--> [[mir-lowering]]  -- Richer representation subsumes sequential form

## GRAM Interpreter (Speculative)  @2026-05-18

[[gram-interpreter]] --[:EXTENDS]--> [[gram]]  -- Execution semantics for graph
[[gram-interpreter]] --[:MIRRORS]--> [[compilation-by-selection]]  -- Interpretation-by-selection dual
[[gram-interpreter]] --[:REQUIRES]--> [[logram]]  -- Practical with indexed queries
[[gram-interpreter]] --[:ENABLES]--> [[gram-pattern-pass]]  -- Tests decision tree semantics
[[gram-interpreter]] --[:ENABLES]--> [[gram-shift-reset-pass]]  -- Tests continuation semantics
[[gram-interpreter]] --[:ENABLES]--> [[closure-conversion]]  -- Tests closure semantics

## GRAM Next Steps  @2026-05-18

[[gram-next-steps]] --[:APPLIES_TO]--> [[gram]]  -- Near-term roadmap
[[gram-to-mir-bridge]] --[:FOLLOWS]--> [[gram-next-steps]]  -- Step 1: regression + CFG extraction
[[defunctionalization]] --[:FOLLOWS]--> [[gram-to-mir-bridge]]  -- Step 2: after bridge validates graph
[[gram-next-steps]] --[:INCLUDES]--> [[defunctionalization]]  -- Planned pass
[[gram-next-steps]] --[:INCLUDES]--> [[gram-to-mir-bridge]]  -- Planned translation

## Pattern Algorithm Design  @2026-05-18

[[augustsson-paper]] --[:INFORMS]--> [[pattern-matching-compilation]]  -- Original algorithm (1985)
[[pettersson-paper]] --[:INFORMS]--> [[pattern-matching-compilation]]  -- DAG variant (1992)
[[maranget-paper]] --[:SUPERSEDES]--> [[augustsson-paper]]  -- Better column selection, no body duplication
[[pettersson-paper]] --[:EXTENDS]--> [[maranget-paper]]  -- DAG sharing over trees (deferred)
[[pattern-algorithm-choice]] --[:USES]--> [[maranget-paper]]  -- Chosen algorithm
[[pattern-algorithm-choice]] --[:REJECTS]--> [[augustsson-paper]]  -- Body duplication unsuitable for graph IR
[[pattern-algorithm-choice]] --[:DEFERS]--> [[pettersson-paper]]  -- DAG optimization possible later
[[pattern-algorithm-choice]] --[:CONSTRAINS]--> [[gram-pattern-pass]]  -- Algorithm for the pass
[[pattern-algorithm-choice]] --[:CONSTRAINS]--> [[pattern-matching-compilation]]  -- Algorithm for MIR too

## STG Analogy  @2026-05-18

[[stg-analogy]] --[:INFORMS]--> [[gram]]  -- Pipeline layering inspiration
[[stg-analogy]] --[:DISTINGUISHES]--> [[gram-pattern-translation]]  -- Translation = STG-level (semantic)
[[stg-analogy]] --[:DISTINGUISHES]--> [[gram-pattern-pass]]  -- Pass = Cmm-level (operational)
[[stg-analogy]] --[:CONTRASTS_WITH]--> [[mir-lowering]]  -- Monolithic (STG->Cmm) vs composable (GRAM passes)
[[stg-analogy]] --[:INSPIRES]--> [[compilation-by-selection]]  -- Selective = improvement over GHC's fused approach

## DPO vs Imperative  @2026-05-18

[[dpo-vs-imperative-passes]] --[:CONSTRAINS]--> [[dpo-rewriting]]  -- Defines when DPO applies
[[dpo-vs-imperative-passes]] --[:CONSTRAINS]--> [[gram]]  -- Pass implementation guide
[[dpo-vs-imperative-passes]] --[:APPLIES_TO]--> [[gram-pattern-pass]]  -- Pattern pass is imperative/aggregate
[[dpo-vs-imperative-passes]] --[:APPLIES_TO]--> [[gram-shift-reset-pass]]  -- Shift-reset pass is imperative/aggregate
[[dpo-vs-imperative-passes]] --[:APPLIES_TO]--> [[closure-conversion]]  -- Capture is aggregate
[[dpo-vs-imperative-passes]] --[:ENABLES]--> [[gram-pattern-pass]]  -- Downstream optimizations on decision tree are DPO

## Work Layer: Thread & Queue System  @2026-05-18

[[thread-queue-system]] --[:INFORMS]--> [[delimited-continuations.thread]]  -- System design
[[thread-queue-system]] --[:INFORMS]--> [[row-types.thread]]  -- System design
[[thread-queue-system]] --[:INFORMS]--> [[usage-semantics.thread]]  -- System design
[[thread-queue-system]] --[:INFORMS]--> [[recursion.thread]]  -- System design
[[thread-queue-system]] --[:INFORMS]--> [[pattern-matching.thread]]  -- System design
[[thread-queue-system]] --[:INFORMS]--> [[verification-backend.thread]]  -- System design
[[thread-queue-system]] --[:INFORMS]--> [[gram-evolution.thread]]  -- System design
[[thread-queue-system]] --[:INFORMS]--> [[elaboration-v2.thread]]  -- System design
[[thread-queue-system]] --[:INFORMS]--> [[parser-migration.thread]]  -- System design
[[thread-queue-system]] --[:INFORMS]--> [[global-pending-queue]]  -- System design

## Thread: Delimited Continuations  @2026-05-18

[[delimited-continuations.thread]] --[:INCLUDES]--> [[shift-reset]]
[[delimited-continuations.thread]] --[:INCLUDES]--> [[answer-type-polymorphism]]
[[delimited-continuations.thread]] --[:INCLUDES]--> [[continuation-binders]]
[[delimited-continuations.thread]] --[:INCLUDES]--> [[nondeterminism]]
[[delimited-continuations.thread]] --[:INCLUDES]--> [[nondeterminism-multishot]]
[[delimited-continuations.thread]] --[:INCLUDES]--> [[multishot-serialization]]
[[delimited-continuations.thread]] --[:INCLUDES]--> [[shift-reset-mir-lowering]]
[[delimited-continuations.thread]] --[:INCLUDES]--> [[selective-cps]]
[[delimited-continuations.thread]] --[:INCLUDES]--> [[missing-spec-shift-reset]]
[[delimited-continuations.thread]] --[:INCLUDES]--> [[gram-shift-reset-pass]]
[[delimited-continuations.thread]] --[:INCLUDES]--> [[session-lowering-branch-split]]

## Thread: Row Types  @2026-05-18

[[row-types.thread]] --[:INCLUDES]--> [[row-polymorphism]]
[[row-types.thread]] --[:INCLUDES]--> [[row-data-structure]]
[[row-types.thread]] --[:INCLUDES]--> [[row-rewriting]]
[[row-types.thread]] --[:INCLUDES]--> [[row-unification]]
[[row-types.thread]] --[:INCLUDES]--> [[row-unification-mechanism]]
[[row-types.thread]] --[:INCLUDES]--> [[rows-universal-substrate]]
[[row-types.thread]] --[:INCLUDES]--> [[structural-row-based-types]]
[[row-types.thread]] --[:INCLUDES]--> [[structural-records]]
[[row-types.thread]] --[:INCLUDES]--> [[tuples]]
[[row-types.thread]] --[:INCLUDES]--> [[variant-types]]
[[row-types.thread]] --[:INCLUDES]--> [[injection]]
[[row-types.thread]] --[:INCLUDES]--> [[projection]]
[[row-types.thread]] --[:INCLUDES]--> [[tagged-values]]
[[row-types.thread]] --[:INCLUDES]--> [[lists]]
[[row-types.thread]] --[:INCLUDES]--> [[dedicated-row-constructors]]
[[row-types.thread]] --[:RELIES_ON]--> [[row-theory]]  -- Structural row reasoning principle
[[row-types.thread]] --[:INCLUDES]--> [[label-lookup]]

## Thread: Usage Semantics  @2026-05-18

[[usage-semantics.thread]] --[:RELIES_ON]--> [[modalities]]  -- Hub concept
[[usage-semantics.thread]] --[:RELIES_ON]--> [[modal-type-theory]]  -- Foundational theory
[[usage-semantics.thread]] --[:RELIES_ON]--> [[modality-system]]  -- Yap's modality design
[[usage-semantics.thread]] --[:INCLUDES]--> [[usage-semantics]]
[[usage-semantics.thread]] --[:RELIES_ON]--> [[verification-modal-phase]]  -- Modal phase decision
[[usage-semantics.thread]] --[:INCLUDES]--> [[modality-polymorphism]]
[[usage-semantics.thread]] --[:INCLUDES]--> [[effects-as-modality]]
[[usage-semantics.thread]] --[:REFERENCES]--> [[idris-1-qtt-paper]]  -- QTT paper reference

## Thread: Recursion  @2026-05-18

[[recursion.thread]] --[:INCLUDES]--> [[mu-types]]
[[recursion.thread]] --[:INCLUDES]--> [[mu-type-unification]]
[[recursion.thread]] --[:INCLUDES]--> [[equirecursive-types]]
[[recursion.thread]] --[:INCLUDES]--> [[mutual-recursion]]
[[recursion.thread]] --[:INCLUDES]--> [[missing-spec-recursive-types]]
[[recursion.thread]] --[:INCLUDES]--> [[loop-sugar]]

## Thread: Pattern Matching  @2026-05-18

[[pattern-matching.thread]] --[:INCLUDES]--> [[match]]
[[pattern-matching.thread]] --[:INCLUDES]--> [[pattern-matching-compilation]]
[[pattern-matching.thread]] --[:INCLUDES]--> [[gram-pattern-translation]]
[[pattern-matching.thread]] --[:INCLUDES]--> [[gram-pattern-pass]]
[[pattern-matching.thread]] --[:RELIES_ON]--> [[pattern-algorithm-choice]]  -- Settled Maranget decision
[[pattern-matching.thread]] --[:INCLUDES]--> [[maranget-paper]]
[[pattern-matching.thread]] --[:INCLUDES]--> [[exhaustiveness-checking]]
[[pattern-matching.thread]] --[:INCLUDES]--> [[functional-patterns]]

## Thread: Verification Backend  @2026-05-18

[[verification-backend.thread]] --[:INCLUDES]--> [[verification-pipeline]]
[[verification-backend.thread]] --[:INCLUDES]--> [[verification-artefacts-revised]]
[[verification-backend.thread]] --[:INCLUDES]--> [[smt-translation]]
[[verification-backend.thread]] --[:INCLUDES]--> [[refinement-types]]
[[verification-backend.thread]] --[:INCLUDES]--> [[refinement-inference]]
[[verification-backend.thread]] --[:INCLUDES]--> [[translation-boundary-vc]]
[[verification-backend.thread]] --[:INCLUDES]--> [[milestone-1-ir-boundary]]
[[verification-backend.thread]] --[:INCLUDES]--> [[milestone-2-euf-quant-lia]]
[[verification-backend.thread]] --[:INCLUDES]--> [[milestone-3-strings]]
[[verification-backend.thread]] --[:INCLUDES]--> [[milestone-4-rows]]
[[verification-backend.thread]] --[:INCLUDES]--> [[milestone-5-explanations]]
[[verification-backend.thread]] --[:INCLUDES]--> [[constraint-solver]]
[[verification-backend.thread]] --[:INCLUDES]--> [[solver-module-layout]]
[[verification-backend.thread]] --[:INCLUDES]--> [[vc-ir]]
[[verification-backend.thread]] --[:RELIES_ON]--> [[vc-normalization]]  -- Normalization mechanism
[[verification-backend.thread]] --[:INCLUDES]--> [[vc-provenance]]
[[verification-backend.thread]] --[:INCLUDES]--> [[z3-replacement-decision]]
[[verification-backend.thread]] --[:REFERENCES]--> [[required-formula-forms]]  -- Deprecated Z3-era reference
[[verification-backend.thread]] --[:RELIES_ON]--> [[required-theory-support]]  -- Theory requirements
[[verification-backend.thread]] --[:RELIES_ON]--> [[verification-backend]]  -- Hub zettel
[[verification-backend.thread]] --[:INCLUDES]--> [[ivl-boundary]]
[[verification-backend.thread]] --[:INCLUDES]--> [[bidir-subtype-verification]]
[[verification-backend.thread]] --[:INCLUDES]--> [[z3-adapter-strategy]]
[[verification-backend.thread]] --[:INCLUDES]--> [[inline-theory-assert]]
[[verification-backend.thread]] --[:INCLUDES]--> [[dual-polarity-registration]]
[[verification-backend.thread]] --[:INCLUDES]--> [[complementary-atom-encoding]]

## Thread: GRAM Evolution  @2026-05-18

[[gram-evolution.thread]] --[:INCLUDES]--> [[gram]]
[[gram-evolution.thread]] --[:RELIES_ON]--> [[gram-additive-enrichment]]  -- Foundational invariant
[[gram-evolution.thread]] --[:INCLUDES]--> [[gram-as-s-expressions]]
[[gram-evolution.thread]] --[:RELIES_ON]--> [[gram-dataflow-semantics]]  -- Partial-order principle
[[gram-evolution.thread]] --[:INCLUDES]--> [[gram-interpreter]]
[[gram-evolution.thread]] --[:INCLUDES]--> [[gram-next-steps]]
[[gram-evolution.thread]] --[:INCLUDES]--> [[gram-step-1]]
[[gram-evolution.thread]] --[:INCLUDES]--> [[gram-to-mir-bridge]]
[[gram-evolution.thread]] --[:INCLUDES]--> [[gram-pattern-pass]]
[[gram-evolution.thread]] --[:INCLUDES]--> [[gram-pattern-translation]]
[[gram-evolution.thread]] --[:INCLUDES]--> [[gram-shift-reset-pass]]
[[gram-evolution.thread]] --[:INCLUDES]--> [[dpo-rewriting]]
[[gram-evolution.thread]] --[:RELIES_ON]--> [[dpo-vs-imperative-passes]]  -- Pass classification decision
[[gram-evolution.thread]] --[:INCLUDES]--> [[logram]]
[[gram-evolution.thread]] --[:RELIES_ON]--> [[compilation-by-selection]]  -- Backend selection architecture

## Thread: Elaboration V2  @2026-05-18

[[elaboration-v2.thread]] --[:INCLUDES]--> [[elaboration]]
[[elaboration-v2.thread]] --[:INCLUDES]--> [[v2-elaboration-pipeline]]
[[elaboration-v2.thread]] --[:INCLUDES]--> [[v1-elaboration-pipeline]]
[[elaboration-v2.thread]] --[:INCLUDES]--> [[elaboration-monad]]
[[elaboration-v2.thread]] --[:INCLUDES]--> [[elaboration-context]]
[[elaboration-v2.thread]] --[:INCLUDES]--> [[eb-term]]
[[elaboration-v2.thread]] --[:INCLUDES]--> [[src-term]]
[[elaboration-v2.thread]] --[:INCLUDES]--> [[src-to-eb-transformation]]
[[elaboration-v2.thread]] --[:INCLUDES]--> [[generator-monad]]
[[elaboration-v2.thread]] --[:INCLUDES]--> [[monad-split]]
[[elaboration-v2.thread]] --[:INCLUDES]--> [[missing-spec-let-polymorphism]]
[[elaboration-v2.thread]] --[:INCLUDES]--> [[missing-spec-sigma-types]]
[[elaboration-v2.thread]] --[:USES]--> [[constraint-solver]]
[[elaboration-v2.thread]] --[:RELIES_ON]--> [[constraint-solving]]
[[elaboration-v2.thread]] --[:RELIES_ON]--> [[deferred-constraint-solving]]
[[elaboration-v2.thread]] --[:CONTRASTS_WITH]--> [[eager-constraint-solving]]
[[elaboration-v2.thread]] --[:RELIES_ON]--> [[assign-before-resolve]]
[[elaboration-v2.thread]] --[:RELIES_ON]--> [[empty-subst-guard]]
[[elaboration-v2.thread]] --[:USES]--> [[implicit-resolution-solver]]

## Thread: Parser Migration  @2026-05-18

[[parser-migration.thread]] --[:INCLUDES]--> [[nearley-parser]]
[[parser-migration.thread]] --[:INCLUDES]--> [[parser-processors]]
[[parser-migration.thread]] --[:INCLUDES]--> [[tree-sitter-parser]]

## Cross-Thread Shared Items  @2026-05-18

[[gram-evolution.thread]] --[:SHARED_WITH]--> [[delimited-continuations.thread]]  -- gram-shift-reset-pass
[[gram-evolution.thread]] --[:SHARED_WITH]--> [[pattern-matching.thread]]  -- gram-pattern-pass, gram-pattern-translation
[[verification-backend.thread]] --[:SHARED_WITH]--> [[row-types.thread]]  -- milestone-4-rows / row-theory
[[pattern-matching.thread]] --[:SHARED_WITH]--> [[row-types.thread]]  -- exhaustiveness-checking depends on row/variant structure
[[elaboration-v2.thread]] --[:SHARED_WITH]--> [[recursion.thread]]  -- missing-spec-let-polymorphism (mu recovery at let boundaries)

## Queue Membership  @2026-05-18

[[global-pending-queue]] --[:INCLUDES]--> [[spineful-applications]]
[[global-pending-queue]] --[:INCLUDES]--> [[where-clauses]]
[[global-pending-queue]] --[:INCLUDES]--> [[lsp]]
[[global-pending-queue]] --[:INCLUDES]--> [[repl]]
[[global-pending-queue]] --[:INCLUDES]--> [[module-system]]
[[global-pending-queue]] --[:INCLUDES]--> [[block-level-using-gap]]
[[global-pending-queue]] --[:INCLUDES]--> [[documentation-debt]]
[[global-pending-queue]] --[:INCLUDES]--> [[type-erasure]]
[[global-pending-queue]] --[:INCLUDES]--> [[dynamic-reflection]]
[[global-pending-queue]] --[:INCLUDES]--> [[ffi-saturation-gram]]
[[global-pending-queue]] --[:INCLUDES]--> [[whnf-codification]]

## CRUD enrichment, strategies, and research references  @2026-05-18

### GRAM CRUD enrichment — core edges
[[gram-crud-enrichment]] --[:ENRICHES]--> [[gram]]  -- Adds access mode annotation to proj/inj nodes
[[gram-crud-enrichment]] --[:CONSUMES]--> [[modalities]]  -- Multiplicity drives mode selection
[[gram-crud-enrichment]] --[:ANNOTATES]--> [[projection]]  -- proj → Read (always safe, no mode needed)
[[gram-crud-enrichment]] --[:ANNOTATES]--> [[injection]]  -- inj → Update (mode from multiplicity)
[[gram-crud-enrichment]] --[:RELIES_ON]--> [[verification-modal-phase]]  -- Conservative defaults until enforcement works
[[gram-crud-enrichment]] --[:INSTANTIATES]--> [[gram-additive-enrichment]]  -- Adds edges, never replaces
[[gram-crud-enrichment]] --[:INSTANTIATES]--> [[compilation-by-selection]]  -- Backends choose whether to read modes
[[gram-crud-enrichment]] --[:MIRRORS]--> [[mir-lowering]]  -- MIR §6.4 Read/Update is the same concept in CFG form
[[gram-crud-enrichment]] --[:FOLLOWS]--> [[gram-to-mir-bridge]]  -- After bridge validates graph
[[gram-crud-enrichment]] --[:INSTANTIATES]--> [[gram-dataflow-semantics]]  -- Mode flows with data, not control
[[gram-crud-enrichment]] --[:LOWERS_TO]--> [[mir-lowering]]  -- Update{mode} in MIR

### CRUD strategy choice — decision hub
[[crud-strategy-choice]] --[:CONSTRAINS]--> [[gram-crud-enrichment]]  -- Strategy determines pass design
[[crud-strategy-choice]] --[:USES]--> [[mode-annotation-strategy]]  -- Phase A: chosen first
[[crud-strategy-choice]] --[:DEFERS]--> [[reuse-analysis-strategy]]  -- Phase B: after mode annotation proves arch
[[crud-strategy-choice]] --[:DEFERS]--> [[constructor-context-strategy]]  -- Phase C: speculative/post-LoGRAM
[[crud-strategy-choice]] --[:CONTRASTS_WITH]--> [[pattern-algorithm-choice]]  -- Same pattern: pick strategy, defer alternatives
[[crud-strategy-choice]] --[:RELIES_ON]--> [[modalities]]  -- Strategy depends on multiplicity system
[[crud-strategy-choice]] --[:RELIES_ON]--> [[verification-modal-phase]]  -- Full benefit requires modal enforcement

### Mode annotation strategy (Phase A)
[[mode-annotation-strategy]] --[:APPLIES_TO]--> [[gram-crud-enrichment]]  -- Simplest enrichment pass
[[mode-annotation-strategy]] --[:CONSUMES]--> [[modalities]]  -- Reads quantity from modal nodes
[[mode-annotation-strategy]] --[:PRODUCES]--> [[gram]]  -- access_mode edges on inj nodes
[[mode-annotation-strategy]] --[:RELIES_ON]--> [[verification-modal-phase]]  -- Conservative defaults without enforcement
[[mode-annotation-strategy]] --[:INSTANTIATES]--> [[gram-additive-enrichment]]  -- Pure annotation, no deletion
[[mode-annotation-strategy]] --[:CONTRASTS_WITH]--> [[reuse-analysis-strategy]]  -- Different concern: ownership vs allocation
[[mode-annotation-strategy]] --[:CONTRASTS_WITH]--> [[constructor-context-strategy]]  -- Different concern: ownership vs construction pattern

### Reuse analysis strategy (Phase B)
[[reuse-analysis-strategy]] --[:APPLIES_TO]--> [[gram-crud-enrichment]]  -- Enrichment layer B
[[reuse-analysis-strategy]] --[:COMPOSES_WITH]--> [[mode-annotation-strategy]]  -- Orthogonal enrichments; both compose
[[reuse-analysis-strategy]] --[:COMPOSES_WITH]--> [[constructor-context-strategy]]  -- Both address allocation
[[reuse-analysis-strategy]] --[:FOLLOWS]--> [[mode-annotation-strategy]]  -- Phase B after Phase A
[[reuse-analysis-strategy]] --[:RELIES_ON]--> [[gram-pattern-pass]]  -- Reuse sites occur at match boundaries

### Constructor context strategy (Phase C)
[[constructor-context-strategy]] --[:APPLIES_TO]--> [[gram-crud-enrichment]]  -- Enrichment layer C
[[constructor-context-strategy]] --[:COMPOSES_WITH]--> [[mode-annotation-strategy]]  -- Contexts are always exclusive
[[constructor-context-strategy]] --[:COMPOSES_WITH]--> [[reuse-analysis-strategy]]  -- Context might reuse memory
[[constructor-context-strategy]] --[:FOLLOWS]--> [[reuse-analysis-strategy]]  -- Phase C after Phase B
[[constructor-context-strategy]] --[:RELIES_ON]--> [[logram]]  -- Benefits from indexed graph traversal

### Research references — Perceus
[[perceus-reuse-analysis]] --[:INSPIRES]--> [[crud-strategy-choice]]  -- Research input to strategy decision
[[perceus-reuse-analysis]] --[:INSPIRES]--> [[reuse-analysis-strategy]]  -- Reuse tokens concept
[[perceus-reuse-analysis]] --[:INSPIRES]--> [[constructor-context-strategy]]  -- Constructor contexts concept
[[perceus-reuse-analysis]] --[:INSPIRES]--> [[gram-crud-enrichment]]  -- FBIP concept adapted for graph IR
[[perceus-reuse-analysis]] --[:EXTENDS]--> [[koka-influence]]  -- Perceus is part of Koka ecosystem
[[perceus-reuse-analysis]] --[:CONTRASTS_WITH]--> [[modalities]]  -- Runtime refcount vs compile-time QTT
[[perceus-reuse-analysis]] --[:CONTRASTS_WITH]--> [[counting-immutable-beans]]  -- Same problem, different mechanisms

### Research references — Counting Immutable Beans
[[counting-immutable-beans]] --[:INSPIRES]--> [[crud-strategy-choice]]  -- Research input
[[counting-immutable-beans]] --[:INSPIRES]--> [[reuse-analysis-strategy]]  -- reset/reuse model
[[counting-immutable-beans]] --[:INSPIRES]--> [[gram-crud-enrichment]]  -- Graph-level reuse edges
[[counting-immutable-beans]] --[:CONTRASTS_WITH]--> [[modalities]]  -- Runtime uniqueness vs compile-time QTT
[[counting-immutable-beans]] --[:CONTRASTS_WITH]--> [[perceus-reuse-analysis]]  -- Lean vs Koka: different RC strategies
[[counting-immutable-beans]] --[:CONTRASTS_WITH]--> [[clean-uniqueness-types]]  -- Runtime analysis vs type-level guarantee

### Research references — Clean uniqueness types
[[clean-uniqueness-types]] --[:INSPIRES]--> [[crud-strategy-choice]]  -- Research input
[[clean-uniqueness-types]] --[:INSPIRES]--> [[mode-annotation-strategy]]  -- Whole-object uniqueness → per-field in Yap
[[clean-uniqueness-types]] --[:INSPIRES]--> [[gram-crud-enrichment]]  -- Uniqueness → safe mutation precedent
[[clean-uniqueness-types]] --[:INSPIRES]--> [[modalities]]  -- Uniqueness typing as prior art for QTT
[[clean-uniqueness-types]] --[:CONTRASTS_WITH]--> [[modalities]]  -- Whole-object binary vs per-binding graded
[[clean-uniqueness-types]] --[:CONTRASTS_WITH]--> [[perceus-reuse-analysis]]  -- Type-level vs runtime analysis
[[clean-uniqueness-types]] --[:CONTRASTS_WITH]--> [[counting-immutable-beans]]  -- Type-level vs runtime analysis

### Lambda lifting
[[lambda-lifting]] --[:COMPOSES_WITH]--> [[closure-conversion]]  -- Builds on identified captures
[[lambda-lifting]] --[:FOLLOWS]--> [[closure-conversion]]  -- Strictly further in pipeline
[[lambda-lifting]] --[:CONTRASTS_WITH]--> [[defunctionalization]]  -- Lifting keeps fns; defunc replaces with data
[[lambda-lifting]] --[:APPLIES_TO]--> [[gram]]  -- GRAM enrichment pass
[[lambda-lifting]] --[:ENABLES]--> [[compilation-by-selection]]  -- C/GPU need it, JS/Erlang skip it
[[lambda-lifting]] --[:INSTANTIATES]--> [[gram-additive-enrichment]]  -- lifts_to edge, original closure remains
[[lambda-lifting]] --[:MIRRORS]--> [[mir-lowering]]  -- MIR expects top-level functions

### Thread and roadmap edges
[[gram-next-steps]] --[:INCLUDES]--> [[gram-crud-enrichment]]  -- Planned pass (phase 5)
[[gram-next-steps]] --[:INCLUDES]--> [[lambda-lifting]]  -- Planned pass (phase 4)
[[gram-evolution.thread]] --[:INCLUDES]--> [[gram-crud-enrichment]]
[[gram-evolution.thread]] --[:RELIES_ON]--> [[crud-strategy-choice]]  -- Phased decision informing CRUD enrichment
[[gram-evolution.thread]] --[:INCLUDES]--> [[lambda-lifting]]
[[gram-evolution.thread]] --[:SHARED_WITH]--> [[usage-semantics.thread]]  -- CRUD depends on multiplicity

### Cross-domain edges
[[verification-modal-phase]] --[:BLOCKS]--> [[gram-crud-enrichment]]  -- Conservative defaults until modal enforcement lands
[[koka-influence]] --[:INSPIRES]--> [[perceus-reuse-analysis]]  -- Same ecosystem
[[koka-influence]] --[:INSPIRES]--> [[gram-crud-enrichment]]  -- FBIP concept origin
[[koka-influence]] --[:INSPIRES]--> [[constructor-context-strategy]]  -- FP² constructor contexts
[[idris-1-qtt-paper]] --[:INSPIRES]--> [[mode-annotation-strategy]]  -- QTT multiplicities drive access mode
[[idris-1-qtt-paper]] --[:INSPIRES]--> [[gram-crud-enrichment]]  -- Compile-time uniqueness from types
[[projection]] --[:TRANSLATES_TO]--> [[gram-crud-enrichment]]  -- Proj → Read in GRAM
[[injection]] --[:TRANSLATES_TO]--> [[gram-crud-enrichment]]  -- Inj → Update in GRAM
[[rows-universal-substrate]] --[:ENABLES]--> [[gram-crud-enrichment]]  -- Row structure = per-field access
[[stg-analogy]] --[:INFORMS]--> [[gram-crud-enrichment]]  -- STG case = semantic; operational compiled later

## Glossary  @2026-05-18

[[glossary]] --[:EXTENDS]--> [[smt-solver-glossary]]  -- Global glossary references domain-specific glossary
[[yap]] --[:INCLUDES]--> [[glossary]]  -- Project-level reference

## M1 + M2 implementation  @2026-05-20

### Session

[[session-m2-completion]] --[:PRODUCED]--> [[m1-implementation]]  -- Session delivered M1
[[session-m2-completion]] --[:PRODUCED]--> [[m2-implementation]]  -- Session delivered M2
[[session-m2-completion]] --[:FOLLOWS]--> [[z3-replacement-decision]]  -- Continues Z3 replacement

### M1 implementation → milestone & concepts

[[m1-implementation]] --[:IMPLEMENTS]--> [[milestone-1-ir-boundary]]  -- Realizes the milestone
[[m1-implementation]] --[:ADDRESSES]--> [[milestone-1-ir-boundary]]  -- Closes the open work item

[[m1-implementation]] --[:IMPLEMENTS]--> [[vc-ir]]  -- IVL types/builder realize the VC IR concept
[[m1-implementation]] --[:INSTANTIATES]--> [[vc-ir]]  -- Concrete TypeScript module from abstract design

[[m1-implementation]] --[:IMPLEMENTS]--> [[translation-boundary-vc]]  -- z3.adapter.ts realizes the boundary
[[m1-implementation]] --[:PRESERVES]--> [[translation-boundary-vc]]  -- Keeps Z3 working during transition

[[m1-implementation]] --[:IMPLEMENTS]--> [[boolean-lowering-cnf]]  -- cnf.ts realizes Tseitin pass
[[m1-implementation]] --[:IMPLEMENTS]--> [[vc-normalization]]  -- normalize.ts realizes formula simplification
[[m1-implementation]] --[:IMPLEMENTS]--> [[quantifier-preparation]]  -- skolem.ts realizes skolemization
[[m1-implementation]] --[:USES]--> [[tseitin-cnf]]  -- Tseitin algorithm used in cnf.ts

[[m1-implementation]] --[:SUPERSEDES]--> [[smt-translation]]  -- IVL replaces direct Z3 encoding
[[m1-implementation]] --[:DEPRECATES]--> [[smt-translation]]  -- translate.ts path now legacy

[[m1-implementation]] --[:VALIDATES]--> [[required-formula-forms]]  -- IVL covers all required formula shapes
[[m1-implementation]] --[:FOLLOWS]--> [[z3-replacement-decision]]  -- First concrete step after the decision

### M2 implementation → milestone & concepts

[[m2-implementation]] --[:IMPLEMENTS]--> [[milestone-2-euf-quant-lia]]  -- Realizes the milestone
[[m2-implementation]] --[:ADDRESSES]--> [[milestone-2-euf-quant-lia]]  -- Closes the open work item

[[m2-implementation]] --[:DEPENDS_ON]--> [[m1-implementation]]  -- Structurally built on IVL
[[m2-implementation]] --[:CONSUMES]--> [[m1-implementation]]  -- Solver ingests IVL formulas

[[m2-implementation]] --[:IMPLEMENTS]--> [[cdcl-t-solver]]  -- Realizes the CDCL(T) concept
[[m2-implementation]] --[:INSTANTIATES]--> [[cdcl-t-solver]]  -- Concrete core.ts from abstract design

[[m2-implementation]] --[:IMPLEMENTS]--> [[euf-theory]]  -- Realizes EUF via CC
[[m2-implementation]] --[:ENCODES]--> [[euf-theory]]  -- Hash-consed arena representation

[[m2-implementation]] --[:IMPLEMENTS]--> [[arithmetic-theory]]  -- Realizes simplex arithmetic
[[m2-implementation]] --[:ENCODES]--> [[arithmetic-theory]]  -- Rational bounds + fixed tableau representation

[[m2-implementation]] --[:IMPLEMENTS]--> [[quantifier-engine]]  -- Realizes quantifier instantiation
[[m2-implementation]] --[:DELEGATES_TO]--> [[quantifier-engine]]  -- Solver delegates rounds to quantifier loop

[[m2-implementation]] --[:IMPLEMENTS]--> [[theory-plugin-interface]]  -- Realizes the Theory API contract
[[m2-implementation]] --[:IMPLEMENTS]--> [[watched-literals]]  -- Two-watch in watched.ts
[[m2-implementation]] --[:IMPLEMENTS]--> [[bcp]]  -- Unit propagation in core.ts
[[m2-implementation]] --[:IMPLEMENTS]--> [[one-uip]]  -- 1UIP conflict analysis in core.ts
[[m2-implementation]] --[:IMPLEMENTS]--> [[congruence-closure]]  -- CC in euf/cc.ts
[[m2-implementation]] --[:IMPLEMENTS]--> [[e-matching]]  -- Trigger matching in quantifiers/ematch.ts
[[m2-implementation]] --[:VALIDATES]--> [[required-theory-support]]  -- Covers EUF + arithmetic + quantifiers

### M2 implementation → papers (algorithms directly implemented)

[[m2-implementation]] --[:USES]--> [[nieuwenhuis-oliveras]]  -- DPLL(T) architecture directly implemented
[[m2-implementation]] --[:USES]--> [[dutertre-arithmetic]]  -- Fixed-tableau simplex directly implemented
[[m2-implementation]] --[:USES]--> [[ge-de-moura-quantifiers]]  -- E-matching directly implemented
[[m2-implementation]] --[:USES]--> [[nelson-oppen]]  -- Theory combination via shared equalities

### Thread inclusion

[[verification-backend.thread]] --[:INCLUDES]--> [[session-m2-completion]]
[[verification-backend.thread]] --[:INCLUDES]--> [[m1-implementation]]
[[verification-backend.thread]] --[:INCLUDES]--> [[m2-implementation]]

## Trace & observability session  @2026-05-21

### Session

[[session-trace-observability]] --[:FOLLOWS]--> [[session-m2-completion]]  -- Continuation of solver development
[[session-trace-observability]] --[:PRODUCED]--> [[solver-trace]]  -- Session delivered the trace system
[[session-trace-observability]] --[:PRODUCED]--> [[build-simplify-toggle]]  -- Session delivered the simplify toggle
[[session-trace-observability]] --[:PRODUCED]--> [[lambda-synthesis-fix]]  -- Session discovered and fixed the bug
[[session-trace-observability]] --[:DEPENDS_ON]--> [[m2-implementation]]  -- Built on top of the M2 solver
[[session-trace-observability]] --[:ADDRESSES]--> [[pipeline-explorer]]  -- Integrated solver into the explorer

### Solver trace → solver internals

[[solver-trace]] --[:EXPOSES]--> [[cdcl-t-solver]]  -- Makes CDCL(T) execution steps observable
[[solver-trace]] --[:EXPOSES]--> [[euf-theory]]  -- EUFTrace.Step reveals merge/congruence/scan internals
[[solver-trace]] --[:EXPOSES]--> [[arithmetic-theory]]  -- ArithTrace.Step reveals bound/pivot/feasibility internals
[[solver-trace]] --[:EXPOSES]--> [[quantifier-engine]]  -- Quantifier round events visible in trace
[[solver-trace]] --[:EXPOSES]--> [[bcp]]  -- Propagation steps rendered in trace output
[[solver-trace]] --[:EXPOSES]--> [[one-uip]]  -- Conflict analysis + backjump steps rendered
[[solver-trace]] --[:EXPOSES]--> [[watched-literals]]  -- Clause satisfaction tracking in trace
[[solver-trace]] --[:DEPENDS_ON]--> [[m2-implementation]]  -- Structurally built on the M2 solver
[[solver-trace]] --[:CONSUMES]--> [[m2-implementation]]  -- Trace consumes solver generator output
[[solver-trace]] --[:EXTENDS]--> [[theory-plugin-interface]]  -- Added assertTrace/checkTrace generator methods
[[solver-trace]] --[:USES]--> [[pretty-printing]]  -- prettier-printer for structured output
[[solver-trace]] --[:REPORTS]--> [[cdcl-t-solver]]  -- Human-readable execution replay
[[solver-trace]] --[:REPORTS]--> [[euf-theory]]  -- Renders equivalence classes after merges
[[solver-trace]] --[:REPORTS]--> [[arithmetic-theory]]  -- Renders bound intervals after updates
[[solver-trace]] --[:TRANSLATES_TO]--> [[pipeline-explorer]]  -- Trace output displayed in Trace tab
[[solver-trace]] --[:SNAPSHOTS]--> [[cdcl-t-solver]]  -- 14 snapshot tests capture trace output
[[solver-trace]] --[:RESOLVES]--> [[vc-ir]]  -- Tseitin proxy variables resolved back to IVL subformulas
[[solver-trace]] --[:RESOLVES]--> [[congruence-closure]]  -- Enode IDs resolved to term names
[[solver-trace]] --[:DISPATCHES_ON]--> [[theory-plugin-interface]]  -- Step rendering dispatches on theory name

### Solver trace → IVL

[[solver-trace]] --[:CONSUMES]--> [[vc-ir]]  -- Reads IVL formulas for display
[[solver-trace]] --[:USES]--> [[m1-implementation]]  -- Uses IVL printer for formula rendering
[[solver-trace]] --[:DEPENDS_ON]--> [[boolean-lowering-cnf]]  -- Trace reads atom table + proxy table from Tseitin

### Build simplify toggle → IVL constructors

[[build-simplify-toggle]] --[:GATES]--> [[vc-ir]]  -- Controls whether Build constructors simplify formulas
[[build-simplify-toggle]] --[:GATES]--> [[vc-normalization]]  -- Algebraic simplification is a form of normalization
[[build-simplify-toggle]] --[:APPLIES_TO]--> [[m1-implementation]]  -- Modifies Build module from M1
[[build-simplify-toggle]] --[:ENABLES]--> [[solver-trace]]  -- Unsimplified formulas reveal full VC structure in trace
[[build-simplify-toggle]] --[:ENABLES]--> [[pipeline-explorer]]  -- Togglable via explorer UI checkbox
[[build-simplify-toggle]] --[:USES]--> [[pipeline-explorer]]  -- Config persisted in localStorage, sent per /run request
[[build-simplify-toggle]] --[:DISCOVERED_BY]--> [[lambda-synthesis-fix]]  -- Need emerged from debugging the Lambda bug

### Lambda synthesis fix

[[lambda-synthesis-fix]] --[:FIXES]--> [[verification-pipeline]]  -- Corrects Pi type construction in V2 synth
[[lambda-synthesis-fix]] --[:FIXES]--> [[smt-translation]]  -- Incorrect VC formula was downstream of wrong type
[[lambda-synthesis-fix]] --[:ADDRESSES]--> [[dependent-types]]  -- Dependent Pi return closure was capturing values not types
[[lambda-synthesis-fix]] --[:USES]--> [[nbe]]  -- Fix uses NF.quote to convert synthesized type back to term
[[lambda-synthesis-fix]] --[:USES]--> [[whnf-vs-full-normalization]]  -- Quotes NF.Value at correct de Bruijn level
[[lambda-synthesis-fix]] --[:DEPENDS_ON]--> [[bidirectional-checking]]  -- Fix is in the synth direction
[[lambda-synthesis-fix]] --[:DEPENDS_ON]--> [[pi-types]]  -- Pi type return closure construction
[[lambda-synthesis-fix]] --[:DISCOVERED_BY]--> [[solver-trace]]  -- Incorrect formula visible in trace output
[[lambda-synthesis-fix]] --[:DISCOVERED_BY]--> [[pipeline-explorer]]  -- Bug reproduced via explorer's IVL tab
[[lambda-synthesis-fix]] --[:VALIDATES]--> [[build-simplify-toggle]]  -- Post-fix simplification behaviour confirmed the fix was correct

### Explorer integration updates

[[pipeline-explorer]] --[:USES]--> [[solver-trace]]  -- Trace tab displays solver replay
[[pipeline-explorer]] --[:USES]--> [[vc-ir]]  -- IVL tab displays s-expression formula
[[pipeline-explorer]] --[:USES]--> [[m1-implementation]]  -- IVLPrint for formula rendering
[[pipeline-explorer]] --[:USES]--> [[m2-implementation]]  -- Solver.createTraced() for trace generation
[[pipeline-explorer]] --[:USES]--> [[build-simplify-toggle]]  -- ivlSimplify config option
[[pipeline-explorer]] --[:SUPERSEDES]--> [[smt-translation]]  -- IVL + Trace tabs replaced Z3 Verify tab
[[pipeline-explorer]] --[:DELEGATES_TO]--> [[verification-pipeline]]  -- Calls VerificationServiceV2 directly
[[pipeline-explorer]] --[:REPORTS]--> [[solver-trace]]  -- Renders trace output in Trace tab
[[pipeline-explorer]] --[:REPORTS]--> [[vc-ir]]  -- Renders IVL formula in IVL tab

### Thread inclusion

[[verification-backend.thread]] --[:INCLUDES]--> [[session-trace-observability]]
[[verification-backend.thread]] --[:INCLUDES]--> [[solver-trace]]
[[verification-backend.thread]] --[:INCLUDES]--> [[build-simplify-toggle]]
[[verification-backend.thread]] --[:INCLUDES]--> [[lambda-synthesis-fix]]

## session:bubble-verification-design — 2026-05-21

### Bubble semantics

[[bubble-semantics]] --[:SUPERSEDES]--> [[continuation-binders]]  -- Replaces skolem-meta indirection with explicit Bubble node
[[bubble-semantics]] --[:ADDRESSES]--> [[missing-spec-shift-reset]]  -- Makes nondeterministic semantics explicit in AST
[[bubble-semantics]] --[:ENABLES]--> [[shift-reset-verification]]  -- Carries values for VC generation
[[bubble-semantics]] --[:APPLIES_TO]--> [[shift-reset]]  -- New EB.Term constructor at shift use sites
[[bubble-semantics]] --[:COMPOSES_WITH]--> [[gram-shift-reset-pass]]  -- GRAM already has bubble concept; aligns vocabulary
[[bubble-semantics]] --[:USES]--> [[nondeterminism]]  -- Resume values from nondeterminism.solution
[[bubble-semantics]] --[:USES]--> [[answer-type-polymorphism]]  -- ann carries answer type A

### Verification stub

[[shift-reset-verification-stub]] --[:IMPLEMENTS]--> [[shift-reset]]  -- Dummy verification pass-through
[[shift-reset-verification-stub]] --[:EXTENDS]--> [[verification-pipeline]]  -- Adds Reset/Shift cases (transparent/opaque)
[[shift-reset-verification-stub]] --[:USES]--> [[vc-ir]]  -- Build.true_() for shift VC

### Full verification

[[shift-reset-verification]] --[:SUPERSEDES]--> [[shift-reset-verification-stub]]  -- Replaces dummy with real verification
[[shift-reset-verification]] --[:EXTENDS]--> [[verification-pipeline]]  -- Adds Reset/Bubble cases with quantification
[[shift-reset-verification]] --[:USES]--> [[vc-ir]]  -- IVL Bubble term constructor
[[shift-reset-verification]] --[:USES]--> [[answer-type-polymorphism]]  -- Bubble type = answer type A
[[shift-reset-verification]] --[:RELIES_ON]--> [[bubble-semantics]]  -- Needs Bubble in EB.Term
[[shift-reset-verification]] --[:ADDRESSES]--> [[open-shift-verification]]  -- Symbolic mode handles open shifts

### Open shifts

[[open-shift-verification]] --[:MOTIVATES]--> [[bubble-semantics]]  -- Design for symbolic mode upfront
[[open-shift-verification]] --[:EXTENDS]--> [[shift-reset-verification]]  -- Symbolic generalization of concrete expansion
[[open-shift-verification]] --[:COMPOSES_WITH]--> [[effects-as-modality]]  -- Effect annotations needed for cross-module

### Papers

[[arm-paper]] --[:INFORMS]--> [[shift-reset-verification]]  -- ARM = symbolic answer refinement tracking
[[arm-paper]] --[:EXTENDS]--> [[danvy-filinski]]  -- Refinement dimension of ATM
[[arm-paper]] --[:INFORMS]--> [[open-shift-verification]]  -- Theoretical foundation for symbolic mode
[[arm-paper]] --[:INFORMS]--> [[answer-type-polymorphism]]  -- Extends ATM to refinement level

[[sekiyama-unno-temporal]] --[:INFORMS]--> [[arm-paper]]  -- Prior work by same first author
[[sekiyama-unno-temporal]] --[:INFORMS]--> [[shift-reset-verification]]  -- Temporal effects + delimited control

### Session

[[session-bubble-verification-design]] --[:PRODUCES]--> [[bubble-semantics]]
[[session-bubble-verification-design]] --[:PRODUCES]--> [[shift-reset-verification]]
[[session-bubble-verification-design]] --[:PRODUCES]--> [[shift-reset-verification-stub]]
[[session-bubble-verification-design]] --[:PRODUCES]--> [[arm-paper]]
[[session-bubble-verification-design]] --[:PRODUCES]--> [[sekiyama-unno-temporal]]
[[session-bubble-verification-design]] --[:PRODUCES]--> [[open-shift-verification]]
[[session-bubble-verification-design]] --[:FOLLOWS]--> [[session-trace-observability]]  -- Same branch, next session

### Thread inclusion

[[delimited-continuations.thread]] --[:INCLUDES]--> [[bubble-semantics]]
[[delimited-continuations.thread]] --[:INCLUDES]--> [[shift-reset-verification]]
[[delimited-continuations.thread]] --[:INCLUDES]--> [[open-shift-verification]]
[[verification-backend.thread]] --[:INCLUDES]--> [[shift-reset-verification-stub]]

### Cross-thread

[[verification-backend.thread]] --[:SHARED_WITH]--> [[delimited-continuations.thread]]  -- shift-reset-verification, shift-reset-verification-stub
[[delimited-continuations.thread]] --[:SHARED_WITH]--> [[verification-backend.thread]]  -- shift-reset-verification

## session:type-system-concepts — 2026-05-22

### Coinductivity & Codata

[[coinductivity]] --[:DUAL_OF]-- [[inductive-types]]  -- Coinduction is the dual of induction
[[coinductivity]] --[:INFORMS]--> [[nu-types]]  -- Nu abstraction is Yap's coinductivity mechanism
[[coinductivity]] --[:USES]--> [[bisimulation-type-equality]]  -- Bisimulation is a coinductive proof method
[[coinductivity]] --[:EXTENDS]--> [[recursion.thread]]  -- Coinductivity extends the recursion story
[[codata]] --[:INFORMS]--> [[coinductivity]]  -- Observation-defined types ground coinductivity
[[codata]] --[:EXTENDS]--> [[structural-records]]  -- Records as observations = codata
[[codata]] --[:COMPOSES_WITH]--> [[row-polymorphism]]  -- Codata observations as extensible rows
[[codata]] --[:CONTRASTS_WITH]--> [[variant-types]]  -- Constructors (data) vs observations (codata)
[[codata]] --[:INFORMS]--> [[nu-types]]  -- Codata semantics for nu-wrapped recursive types
[[nu-types]] --[:EXTENDS]--> [[mu-types]]  -- Greatest fixed point dual to least fixed point
[[nu-types]] --[:RELIES_ON]--> [[bisimulation-type-equality]]  -- Nu equality needs bisimulation
[[nu-types]] --[:RELIES_ON]--> [[unification]]  -- Shares mu's unification infrastructure
[[nu-types]] --[:RELIES_ON]--> [[nbe]]  -- Shares mu's evaluation infrastructure
[[nu-types]] --[:USES]--> [[equirecursive-types]]  -- Extends equirecursive machinery with polarity
[[nu-types]] --[:REQUIRES]--> [[productivity-checking]]  -- Coinductive definitions must be productive
[[nu-types]] --[:COMPOSES_WITH]--> [[structural-records]]  -- Coinductive records via nu + projections
[[bisimulation-type-equality]] --[:ADDRESSES]--> [[equirecursive-types]]  -- Principled equality for recursive types
[[bisimulation-type-equality]] --[:EXTENDS]--> [[unification]]  -- Would replace ad-hoc mu unfolding
[[bisimulation-type-equality]] --[:USES]--> [[coinductivity]]  -- Bisimulation is itself coinductive
[[bisimulation-type-equality]] --[:USES]--> [[nbe]]  -- Unfolding via evaluation
[[bisimulation-type-equality]] --[:ADDRESSES]--> [[mu-types]]  -- Proper equality for mu-wrapped types
[[bisimulation-type-equality]] --[:INFORMS]--> [[nu-types]]  -- Foundation for nu type equality

### Productivity & Termination

[[productivity-checking]] --[:DUAL_OF]--> [[termination-checking]]  -- Productivity is the coinductive dual of termination
[[productivity-checking]] --[:APPLIES_TO]--> [[nu-types]]  -- Ensures coinductive defs are productive
[[productivity-checking]] --[:APPLIES_TO]--> [[coinductivity]]  -- Static guarantee for coinductive data
[[productivity-checking]] --[:RELIES_ON]--> [[sized-types]]  -- One approach to productivity
[[productivity-checking]] --[:RELIES_ON]--> [[syntactic-guardedness]]  -- Alternative approach to productivity
[[sized-types]] --[:ADDRESSES]--> [[productivity-checking]]  -- Size annotations ensure productivity
[[sized-types]] --[:ADDRESSES]--> [[termination-checking]]  -- Size annotations ensure termination
[[sized-types]] --[:CONTRASTS_WITH]--> [[syntactic-guardedness]]  -- More expressive but more complex
[[sized-types]] --[:EXTENDS]--> [[dependent-types]]  -- Size indices are dependent type params
[[sized-types]] --[:ADDRESSES]--> [[equirecursive-types]]  -- Bounds unfolding depth type-theoretically
[[sized-types]] --[:USES]--> [[nbe]]  -- Size reduction via evaluation
[[syntactic-guardedness]] --[:ADDRESSES]--> [[productivity-checking]]  -- Syntactic criterion for productivity
[[syntactic-guardedness]] --[:ADDRESSES]--> [[termination-checking]]  -- Syntactic criterion for termination
[[syntactic-guardedness]] --[:CONTRASTS_WITH]--> [[sized-types]]  -- Simpler but less expressive
[[syntactic-guardedness]] --[:APPLIES_TO]--> [[inductive-types]]  -- Structural decrease for induction
[[syntactic-guardedness]] --[:APPLIES_TO]--> [[nu-types]]  -- Constructor guarding for coinduction

### Inductive Types & Data

[[inductive-types]] --[:EXTENDS]--> [[mu-types]]  -- Adds well-foundedness to recursive types
[[inductive-types]] --[:REQUIRES]--> [[termination-checking]]  -- Inductive types need termination proofs
[[inductive-types]] --[:INFORMS]--> [[data-declarations]]  -- Constructor-based definition motivates data syntax
[[inductive-types]] --[:INFORMS]--> [[exhaustiveness-checking]]  -- Known constructors enable coverage
[[inductive-types]] --[:RELIES_ON]--> [[bisimulation-type-equality]]  -- Needs proper recursive equality first
[[inductive-types]] --[:CONTRASTS_WITH]--> [[equirecursive-types]]  -- Well-founded vs equirecursive
[[data-declarations]] --[:DESUGARS_TO]--> [[variant-types]]  -- Data decls are sugar over row variants
[[data-declarations]] --[:DESUGARS_TO]--> [[structural-records]]  -- Product parts desugar to struct rows
[[data-declarations]] --[:RELIES_ON]--> [[rows-universal-substrate]]  -- Desugars into row machinery
[[data-declarations]] --[:USES]--> [[row-polymorphism]]  -- Structural identity via rows
[[data-declarations]] --[:INFORMS]--> [[open-closed-variants]]  -- Data decl could default to closed
[[data-declarations]] --[:INFORMS]--> [[nominal-identity]]  -- Sugar syntax does not require nominality
[[data-declarations]] --[:COMPOSES_WITH]--> [[mu-types]]  -- Recursive data uses mu wrapping
[[data-declarations]] --[:ENABLES]--> [[exhaustiveness-checking]]  -- Named constructors enable coverage
[[data-declarations]] --[:CONTRASTS_WITH]--> [[nominal-typing]]  -- Structural sugar vs nominal declaration

### Nominal Identity

[[nominal-identity]] --[:CONTRASTS_WITH]--> [[structural-typing]]  -- Two notions of type identity
[[nominal-identity]] --[:INFORMS]--> [[data-declarations]]  -- Whether data decls carry nominal identity
[[nominal-identity]] --[:INFORMS]--> [[opaque-types]]  -- Opacity requires some nominal notion
[[nominal-identity]] --[:INFORMS]--> [[module-system-exploration]]  -- Module boundaries as abstraction
[[nominal-identity]] --[:EXTENDS]--> [[nominal-typing]]  -- Explores adding nominal identity to Yap
[[nominal-identity]] --[:CONTRASTS_WITH]--> [[row-polymorphism]]  -- Nominal fights structural extensibility

### Indexed Families & GADTs

[[gadts]] --[:SPECIALIZES]--> [[indexed-families]]  -- GADTs are a special case of indexed families
[[gadts]] --[:RELIES_ON]--> [[dependent-pattern-matching]]  -- Constructor matching refines indices
[[gadts]] --[:EMULATES]--> [[dependent-types]]  -- Dependent types subsume GADT refinement
[[gadts]] --[:USES]--> [[unification]]  -- Index unification during matching
[[gadts]] --[:INFORMS]--> [[exhaustiveness-checking]]  -- Impossible branches via index constraints
[[indexed-families]] --[:EXTENDS]--> [[inductive-types]]  -- Inductive types with varying indices
[[indexed-families]] --[:RELIES_ON]--> [[dependent-pattern-matching]]  -- Index-refined matching
[[indexed-families]] --[:USES]--> [[dependent-types]]  -- Indices are dependent type params
[[indexed-families]] --[:CONTRASTS_WITH]--> [[type-type]]  -- Families need universe hierarchy
[[indexed-families]] --[:CONTRASTS_WITH]--> [[equirecursive-types]]  -- Strict positivity vs equirecursion

### Type Families & Functional Dependencies

[[type-families]] --[:EMULATES]--> [[type-level-computation]]  -- Type families as type-level functions
[[type-families]] --[:CONTRASTS_WITH]--> [[type-level-computation]]  -- Separate mechanism vs unified terms
[[type-families]] --[:USES]--> [[nbe]]  -- Type-level reduction via evaluation
[[type-families]] --[:INFORMS]--> [[type-level-computation]]  -- Capabilities Yap should reproduce
[[type-families]] --[:COMPOSES_WITH]--> [[open-closed-variants]]  -- Open type families as open rows
[[type-families]] --[:INFORMS]--> [[functional-dependencies]]  -- Overlapping solution space
[[type-families]] --[:INFORMS]--> [[ghc-influence]]  -- GHC's primary type-level mechanism
[[functional-dependencies]] --[:EMULATES]--> [[type-level-computation]]  -- Determinacy via dependent functions
[[functional-dependencies]] --[:CONTRASTS_WITH]--> [[type-level-computation]]  -- Annotation vs computation
[[functional-dependencies]] --[:INFORMS]--> [[implicit-resolution]]  -- Determinacy in implicit search
[[functional-dependencies]] --[:INFORMS]--> [[implicit-resolution-solver]]  -- Solver determinacy
[[functional-dependencies]] --[:COMPOSES_WITH]--> [[typeclass-emulation]]  -- Fundeps on implicit records
[[functional-dependencies]] --[:USES]--> [[dependent-types]]  -- Expressed as dependent functions
[[type-level-computation]] --[:USES]--> [[types-as-terms]]  -- Types are terms foundation
[[type-level-computation]] --[:USES]--> [[type-type]]  -- Type : Type enables type-level functions
[[type-level-computation]] --[:USES]--> [[nbe]]  -- NbE evaluates type-level functions
[[type-level-computation]] --[:USES]--> [[unification]]  -- Type equality for computed types
[[type-level-computation]] --[:SUBSUMES]--> [[type-families]]  -- Dependent functions subsume closed families
[[type-level-computation]] --[:CONSTRAINS]--> [[equirecursive-types]]  -- Step budget limits computation
[[type-level-computation]] --[:EXTENDS]--> [[dependent-types]]  -- Types computed from values
[[type-level-computation]] --[:CONTRASTS_WITH]--> [[ghc-influence]]  -- No promotion needed

### Typeclass Emulation & Implicits

[[typeclass-coherence]] --[:APPLIES_TO]--> [[typeclass-emulation]]  -- Coherence concerns for implicit records
[[typeclass-coherence]] --[:APPLIES_TO]--> [[implicit-resolution]]  -- First-match semantics
[[typeclass-coherence]] --[:APPLIES_TO]--> [[implicit-resolution-solver]]  -- Solver selection policy
[[typeclass-coherence]] --[:INFORMS]--> [[annotations]]  -- @ means implicit application, not override
[[typeclass-coherence]] --[:CONTRASTS_WITH]--> [[ghc-influence]]  -- Haskell enforces global coherence
[[superclasses]] --[:APPLIES_TO]--> [[typeclass-emulation]]  -- Superclass encoding pattern
[[superclasses]] --[:USES]--> [[structural-records]]  -- Nested records encode hierarchy
[[superclasses]] --[:USES]--> [[implicits]]  -- Implicit threading of superclass deps
[[superclasses]] --[:INFORMS]--> [[implicit-resolution-solver]]  -- Auto-propagation of superclass implicits
[[superclasses]] --[:ENCODES]--> [[lambda]]  -- Superclass is just a lambda
[[dictionary-passing]] --[:IMPLEMENTS]--> [[typeclass-emulation]]  -- Records as dictionaries
[[dictionary-passing]] --[:RELIES_ON]--> [[implicit-resolution]]  -- Dictionaries threaded via implicits
[[dictionary-passing]] --[:RELIES_ON]--> [[implicits]]  -- Implicit Pi binders carry dictionaries
[[dictionary-passing]] --[:USES]--> [[structural-records]]  -- Dictionaries are records
[[dictionary-passing]] --[:APPLIES_TO]--> [[ffi]]  -- FFI arity includes dictionary args
[[dictionary-passing]] --[:APPLIES_TO]--> [[ffi-saturation-gram]]  -- Saturation must account for dictionaries
[[dictionary-passing]] --[:INFORMS]--> [[indexing-strategies]]  -- Strategies as implicit dictionaries
[[dictionary-passing]] --[:CONTRASTS_WITH]--> [[ghc-influence]]  -- GHC compiles to dictionaries; Yap starts with them

### Implicits as Coeffects

[[implicits-as-coeffects-exploration]] --[:EXTENDS]--> [[implicits-as-coeffects]]  -- Deeper exploration of the design sketch
[[implicits-as-coeffects-exploration]] --[:EXTENDS]--> [[implicit-resolution]]  -- Coeffect model for implicit requirements
[[implicits-as-coeffects-exploration]] --[:USES]--> [[petricek-orchard]]  -- Foundational coeffect paper
[[implicits-as-coeffects-exploration]] --[:COMPOSES_WITH]--> [[shift-reset]]  -- Coeffects meet delimited continuations
[[implicits-as-coeffects-exploration]] --[:INFORMS]--> [[modality-polymorphism]]  -- Graded modalities from coeffects
[[implicits-as-coeffects-exploration]] --[:INFORMS]--> [[typeclass-emulation]]  -- Coeffect-based implicit model
[[implicits-as-coeffects-exploration]] --[:CONTRASTS_WITH]--> [[implicits]]  -- Ad-hoc vs principled implicit tracking

### Dependent Pattern Matching

[[dependent-pattern-matching]] --[:EXTENDS]--> [[match]]  -- Adds type refinement to matching
[[dependent-pattern-matching]] --[:REQUIRES]--> [[unification]]  -- Index unification during matching
[[dependent-pattern-matching]] --[:RELIES_ON]--> [[sigma-types]]  -- Dependent pairs carry evidence
[[dependent-pattern-matching]] --[:INFORMS]--> [[exhaustiveness-checking]]  -- Refined types affect coverage
[[dependent-pattern-matching]] --[:USES]--> [[dependent-types]]  -- Types refined by pattern
[[dependent-pattern-matching]] --[:RELIES_ON]--> [[nbe]]  -- Evaluate types under refinement
[[dependent-pattern-matching]] --[:COMPOSES_WITH]--> [[gadts]]  -- GADT matching is dependent matching
[[with-abstraction]] --[:ADDRESSES]--> [[dependent-pattern-matching]]  -- User-directed type refinement
[[with-abstraction]] --[:CONTRASTS_WITH]--> [[case-tree-elaboration]]  -- User-directed vs compiler-directed
[[with-abstraction]] --[:EXTENDS]--> [[match]]  -- Additional scrutinees in match arms
[[with-abstraction]] --[:INFORMS]--> [[agda-influence]]  -- Agda's primary DPM mechanism
[[with-abstraction]] --[:USES]--> [[unification]]  -- Type equalities from with-matching
[[case-tree-elaboration]] --[:ADDRESSES]--> [[dependent-pattern-matching]]  -- Compiler-directed type refinement
[[case-tree-elaboration]] --[:CONTRASTS_WITH]--> [[with-abstraction]]  -- Compiler-directed vs user-directed
[[case-tree-elaboration]] --[:EXTENDS]--> [[pattern-matching-compilation]]  -- Semantic decision trees for types
[[case-tree-elaboration]] --[:CONTRASTS_WITH]--> [[pattern-matching-compilation]]  -- Type checking vs code generation
[[case-tree-elaboration]] --[:USES]--> [[unification]]  -- Index unification during splitting
[[case-tree-elaboration]] --[:INFORMS]--> [[idris-2-influence]]  -- Idris 2's DPM approach
[[case-tree-elaboration]] --[:INFORMS]--> [[lean-4-influence]]  -- Lean 4's DPM approach

### Pattern Matching Extensions

[[view-patterns]] --[:EXTENDS]--> [[match]]  -- Function-applied matching
[[view-patterns]] --[:CONTRASTS_WITH]--> [[pattern-synonyms]]  -- Runtime computation vs static alias
[[view-patterns]] --[:CONTRASTS_WITH]--> [[active-patterns]]  -- No failure protocol vs explicit failure
[[view-patterns]] --[:INFORMS]--> [[exhaustiveness-checking]]  -- Views can simplify coverage
[[view-patterns]] --[:DESUGARS_TO]--> [[pattern-matching-compilation]]  -- Desugars before clause matrix
[[view-patterns]] --[:INFORMS]--> [[ghc-influence]]  -- Haskell ViewPatterns extension
[[pattern-synonyms]] --[:EXTENDS]--> [[match]]  -- Named patterns for structural types
[[pattern-synonyms]] --[:COMPOSES_WITH]--> [[structural-typing]]  -- Naming structural shapes
[[pattern-synonyms]] --[:COMPOSES_WITH]--> [[variant-types]]  -- Named variant patterns
[[pattern-synonyms]] --[:COMPOSES_WITH]--> [[structural-records]]  -- Named record patterns
[[pattern-synonyms]] --[:INFORMS]--> [[data-declarations]]  -- Pattern names supplement data decls
[[pattern-synonyms]] --[:DESUGARS_TO]--> [[pattern-matching-compilation]]  -- Desugars to structural patterns
[[active-patterns]] --[:EXTENDS]--> [[match]]  -- User-defined recognizers
[[active-patterns]] --[:EXTENDS]--> [[view-patterns]]  -- View patterns with failure protocol
[[active-patterns]] --[:USES]--> [[variant-types]]  -- Partial patterns return option variant
[[active-patterns]] --[:INFORMS]--> [[open-closed-variants]]  -- Complete vs partial active patterns
[[active-patterns]] --[:INFORMS]--> [[exhaustiveness-checking]]  -- Complete patterns preserve coverage

### Open/Closed Variants & Exhaustiveness

[[open-closed-variants]] --[:APPLIES_TO]--> [[variant-types]]  -- Open vs closed row tails
[[open-closed-variants]] --[:RELIES_ON]--> [[row-polymorphism]]  -- Row variables determine openness
[[open-closed-variants]] --[:INFORMS]--> [[exhaustiveness-checking]]  -- Primary discriminant for coverage
[[open-closed-variants]] --[:USES]--> [[unification]]  -- Row solving determines open/closed
[[open-closed-variants]] --[:INFORMS]--> [[data-declarations]]  -- Data decls produce closed variants
[[open-closed-variants]] --[:COMPOSES_WITH]--> [[type-families]]  -- Open families as open rows
[[open-closed-variants]] --[:INFORMS]--> [[match]]  -- Fallback required for open variants
[[exhaustiveness-checking]] --[:RELIES_ON]--> [[open-closed-variants]]  -- Open vs closed determines strategy
[[exhaustiveness-checking]] --[:RELIES_ON]--> [[pattern-matching-compilation]]  -- Coverage from decision tree
[[exhaustiveness-checking]] --[:APPLIES_TO]--> [[match]]  -- Surface match coverage
[[exhaustiveness-checking]] --[:USES]--> [[variant-types]]  -- Tag sets determine coverage
[[exhaustiveness-checking]] --[:INFORMS]--> [[dependent-pattern-matching]]  -- Refined types affect coverage

### Customizable Data & Modules

[[customizable-data-types]] --[:RELIES_ON]--> [[indexing-strategies]]  -- Pluggable backends
[[customizable-data-types]] --[:RELIES_ON]--> [[rows-universal-substrate]]  -- Records as base abstraction
[[customizable-data-types]] --[:USES]--> [[implicits]]  -- Strategy threading via implicits
[[customizable-data-types]] --[:USES]--> [[dictionary-passing]]  -- Strategies as implicit dictionaries
[[customizable-data-types]] --[:COMPOSES_WITH]--> [[ffi]]  -- FFI-specified backends
[[customizable-data-types]] --[:EXTENDS]--> [[structural-records]]  -- Custom records with pluggable backends
[[customizable-data-types]] --[:INFORMS]--> [[module-system-exploration]]  -- Abstraction boundaries for strategies
[[indexing-strategies]] --[:APPLIES_TO]--> [[customizable-data-types]]  -- Strategy application
[[indexing-strategies]] --[:USES]--> [[implicits]]  -- Strategies as implicit parameters
[[indexing-strategies]] --[:USES]--> [[dictionary-passing]]  -- Strategy records as dictionaries
[[indexing-strategies]] --[:COMPOSES_WITH]--> [[ffi]]  -- FFI-specified indexing
[[indexing-strategies]] --[:INFORMS]--> [[structural-typing]]  -- Same type, different representation
[[opaque-types]] --[:RELIES_ON]--> [[nominal-identity]]  -- Opacity requires nominal notion
[[opaque-types]] --[:CONTRASTS_WITH]--> [[structural-typing]]  -- Hiding structure from consumers
[[opaque-types]] --[:INFORMS]--> [[module-system-exploration]]  -- Module boundaries for opacity
[[opaque-types]] --[:EXTENDS]--> [[nominal-typing]]  -- Layering nominal abstraction
[[opaque-types]] --[:COMPOSES_WITH]--> [[data-declarations]]  -- Opaque wrappers for data types
[[module-system-exploration]] --[:EXTENDS]--> [[module-system]]  -- Beyond file-level imports
[[module-system-exploration]] --[:INFORMS]--> [[opaque-types]]  -- Module boundaries as abstraction
[[module-system-exploration]] --[:INFORMS]--> [[nominal-identity]]  -- Modules introduce nominal boundaries
[[module-system-exploration]] --[:USES]--> [[structural-typing]]  -- Row-typed signatures
[[module-system-exploration]] --[:USES]--> [[row-polymorphism]]  -- Interface polymorphism via rows
[[module-system-exploration]] --[:COMPOSES_WITH]--> [[typeclass-emulation]]  -- Modules as capability records
[[module-system-exploration]] --[:INFORMS]--> [[customizable-data-types]]  -- Abstraction for strategies

### Influence connections

[[coinductivity]] --[:INFORMS]--> [[agda-influence]]  -- Agda's coinductive types
[[codata]] --[:INFORMS]--> [[agda-influence]]  -- Agda's codata and copatterns
[[inductive-types]] --[:INFORMS]--> [[agda-influence]]  -- Agda's core type former
[[inductive-types]] --[:INFORMS]--> [[lean-4-influence]]  -- Lean's inductive types
[[indexed-families]] --[:INFORMS]--> [[agda-influence]]  -- Agda's indexed data
[[gadts]] --[:INFORMS]--> [[ghc-influence]]  -- GHC's GADT extension
[[type-families]] --[:INFORMS]--> [[ghc-influence]]  -- GHC's type families
[[functional-dependencies]] --[:INFORMS]--> [[ghc-influence]]  -- GHC's fundeps
[[dictionary-passing]] --[:INFORMS]--> [[ghc-influence]]  -- GHC dictionary compilation
[[dictionary-passing]] --[:INFORMS]--> [[idris-2-influence]]  -- Idris 2 dictionary passing
[[pattern-synonyms]] --[:INFORMS]--> [[ghc-influence]]  -- GHC PatternSynonyms extension
[[dependent-pattern-matching]] --[:INFORMS]--> [[agda-influence]]  -- Agda's DPM
[[dependent-pattern-matching]] --[:INFORMS]--> [[idris-2-influence]]  -- Idris 2's DPM
[[with-abstraction]] --[:INFORMS]--> [[agda-influence]]  -- Agda's with mechanism
[[case-tree-elaboration]] --[:INFORMS]--> [[idris-2-influence]]  -- Idris 2's case trees
[[case-tree-elaboration]] --[:INFORMS]--> [[lean-4-influence]]  -- Lean 4's case trees
[[sized-types]] --[:INFORMS]--> [[agda-influence]]  -- Agda's sized types
[[syntactic-guardedness]] --[:INFORMS]--> [[agda-influence]]  -- Agda's guardedness checker

### Thread/queue connections

[[recursion.thread]] --[:INCLUDES]--> [[coinductivity]]  -- Coinductivity is part of recursion thread
[[recursion.thread]] --[:INCLUDES]--> [[nu-types]]  -- Nu types are part of recursion thread
[[recursion.thread]] --[:RELIES_ON]--> [[bisimulation-type-equality]]  -- Concept: coinductive type equality
[[recursion.thread]] --[:INCLUDES]--> [[productivity-checking]]
[[recursion.thread]] --[:INCLUDES]--> [[sized-types]]
[[recursion.thread]] --[:INCLUDES]--> [[syntactic-guardedness]]
[[recursion.thread]] --[:INCLUDES]--> [[inductive-types]]
[[pattern-matching.thread]] --[:INCLUDES]--> [[dependent-pattern-matching]]
[[pattern-matching.thread]] --[:INCLUDES]--> [[with-abstraction]]
[[pattern-matching.thread]] --[:INCLUDES]--> [[case-tree-elaboration]]
[[pattern-matching.thread]] --[:INCLUDES]--> [[view-patterns]]
[[pattern-matching.thread]] --[:INCLUDES]--> [[pattern-synonyms]]
[[pattern-matching.thread]] --[:INCLUDES]--> [[active-patterns]]
[[pattern-matching.thread]] --[:RELIES_ON]--> [[open-closed-variants]]  -- Concept: variant openness
[[row-types.thread]] --[:INCLUDES]--> [[data-declarations]]
[[row-types.thread]] --[:RELIES_ON]--> [[open-closed-variants]]  -- Concept: variant openness
[[row-types.thread]] --[:INCLUDES]--> [[customizable-data-types]]
[[row-types.thread]] --[:INCLUDES]--> [[indexing-strategies]]

## Z3 → IVL transition

[[z3-replacement-decision]] --[:SUPERSEDES]--> [[verification-artefacts-revised]]
[[z3-replacement-decision]] --[:SUPERSEDES]--> [[solver-module-layout]]
[[z3-replacement-decision]] --[:SUPERSEDES]--> [[milestone-5-explanations]]
[[z3-replacement-decision]] --[:MOTIVATES]--> [[cdcl-t-solver]]
[[z3-replacement-decision]] --[:MOTIVATES]--> [[vc-ir]]
[[z3-replacement-decision]] --[:PRODUCES]--> [[m1-implementation]]
[[z3-replacement-decision]] --[:PRODUCES]--> [[m2-implementation]]
[[vc-ir]] --[:SUPERSEDES]--> [[verification-artefacts-revised]]  -- IVL replaces Z3 Expr-based artefacts
[[cdcl-t-solver]] --[:IMPLEMENTS]--> [[z3-replacement-decision]]  -- Custom CDCL(T) replaces Z3
[[m1-implementation]] --[:IMPLEMENTS]--> [[z3-replacement-decision]]  -- M1 delivered IVL boundary
[[m2-implementation]] --[:IMPLEMENTS]--> [[z3-replacement-decision]]  -- M2 delivered EUF + quantifiers + LIA
[[required-theory-support]] --[:MOTIVATES]--> [[z3-replacement-decision]]  -- Row theory gap drove the decision

## Verification backend design

[[ivl-boundary]] --[:IMPLEMENTS]--> [[z3-replacement-decision]]  -- IVL is the core deliverable
[[ivl-boundary]] --[:SUPERSEDES]--> [[verification-artefacts-revised]]  -- Replaces the artefact shape record
[[ivl-boundary]] --[:ENABLES]--> [[verification-backend]]  -- Pluggable boundary for backend swap
[[m1-implementation]] --[:PRODUCES]--> [[ivl-boundary]]  -- M1 delivered IVL types

[[bidir-subtype-verification]] --[:IMPLEMENTS]--> [[verification-backend]]  -- VC generation strategy
[[bidir-subtype-verification]] --[:USES]--> [[ivl-boundary]]  -- Emits IVL.Formula obligations
[[bidir-subtype-verification]] --[:PRODUCES]--> [[vc-provenance]]  -- Obligations carry provenance
[[bidir-subtype-verification]] --[:GROUNDED_IN]--> [[refinement-types]]  -- Liquid type theory

[[z3-adapter-strategy]] --[:CONSUMES]--> [[ivl-boundary]]  -- Translates IVL to Z3
[[z3-adapter-strategy]] --[:IMPLEMENTS]--> [[verification-backend]]  -- One backend consumer
[[z3-adapter-strategy]] --[:ENABLES]--> [[solver-testing]]  -- Differential testing
[[m1-implementation]] --[:PRODUCES]--> [[z3-adapter-strategy]]  -- Adapter built in M1

## Implementation decisions (ADRs from M2)

[[inline-theory-assert]] --[:CONSTRAINS]--> [[theory-plugin-interface]]  -- How theories receive literals
[[inline-theory-assert]] --[:DETAILS]--> [[m2-implementation]]  -- Extracted from M2 record
[[cdcl-t-solver]] --[:FOLLOWS]--> [[inline-theory-assert]]  -- Core loop follows this pattern

[[dual-polarity-registration]] --[:CONSTRAINS]--> [[theory-plugin-interface]]  -- Atom registration rule
[[dual-polarity-registration]] --[:DETAILS]--> [[m2-implementation]]  -- Extracted from M2 record
[[dual-polarity-registration]] --[:APPLIES_TO]--> [[arithmetic-theory]]  -- Specific to arithmetic

[[complementary-atom-encoding]] --[:CONSTRAINS]--> [[theory-plugin-interface]]  -- Lemma encoding rule
[[complementary-atom-encoding]] --[:DETAILS]--> [[m2-implementation]]  -- Extracted from M2 record
[[complementary-atom-encoding]] --[:APPLIES_TO]--> [[quantifier-engine]]  -- Specific to quantifiers

## Testing domain

[[testing-strategy]] --[:INCLUDES]--> [[snapshot-testing]]
[[testing-strategy]] --[:INCLUDES]--> [[fuzz-testing]]
[[testing-strategy]] --[:INCLUDES]--> [[property-based-testing]]
[[testing-strategy]] --[:INCLUDES]--> [[ci-pipeline]]
[[testing-strategy]] --[:INCLUDES]--> [[integration-testing]]
[[testing-strategy]] --[:INCLUDES]--> [[negative-testing]]
[[testing-strategy]] --[:INCLUDES]--> [[solver-testing]]

[[testing.thread]] --[:INCLUDES]--> [[testing-strategy]]
[[testing.thread]] --[:INCLUDES]--> [[fuzz-testing]]
[[testing.thread]] --[:INCLUDES]--> [[property-based-testing]]
[[testing.thread]] --[:INCLUDES]--> [[integration-testing]]
[[testing.thread]] --[:INCLUDES]--> [[negative-testing]]

[[fuzz-testing]] --[:TARGETS]--> [[nearley-parser]]
[[fuzz-testing]] --[:TARGETS]--> [[tree-sitter-parser]]
[[fuzz-testing]] --[:TARGETS]--> [[cdcl-t-solver]]
[[fuzz-testing]] --[:TARGETS]--> [[nbe]]
[[fuzz-testing]] --[:INFORMS]--> [[exhaustiveness-checking]]

[[property-based-testing]] --[:TARGETS]--> [[unification]]
[[property-based-testing]] --[:TARGETS]--> [[nbe]]
[[property-based-testing]] --[:TARGETS]--> [[cdcl-t-solver]]
[[property-based-testing]] --[:TARGETS]--> [[row-types]]
[[property-based-testing]] --[:EXTENDS]--> [[snapshot-testing]]

[[integration-testing]] --[:USES]--> [[yap]]  -- REPL pipeline end-to-end
[[integration-testing]] --[:CONCERNS]--> [[ffi]]
[[integration-testing]] --[:CONCERNS]--> [[js-codegen]]
[[integration-testing]] --[:CONCERNS]--> [[c-codegen]]
[[integration-testing]] --[:CONCERNS]--> [[erlang-codegen]]

[[negative-testing]] --[:TARGETS]--> [[match]]
[[negative-testing]] --[:TARGETS]--> [[refinement-types]]
[[negative-testing]] --[:TARGETS]--> [[termination-checking]]
[[negative-testing]] --[:INFORMS]--> [[exhaustiveness-checking]]

[[solver-testing]] --[:DETAILS]--> [[cdcl-t-solver]]
[[solver-testing]] --[:DETAILS]--> [[e-matching]]
[[solver-testing]] --[:DETAILS]--> [[arithmetic-theory]]
[[solver-testing]] --[:USES]--> [[vc-ir]]

[[ci-pipeline]] --[:USES]--> [[snapshot-testing]]
[[ci-pipeline]] --[:SUPPORTS]--> [[testing-strategy]]

[[snapshot-testing]] --[:DETAILS]--> [[testing-strategy]]

## Test coverage gaps

[[test-coverage-gaps]] --[:DETECTS]--> [[v2-elaboration-pipeline]]  -- Missing modal inference (22/23), missing checking.v2 match
[[test-coverage-gaps]] --[:DETECTS]--> [[nearley-parser]]  -- Bool literal grammar gap
[[test-coverage-gaps]] --[:DEFERS]--> [[shift-reset]]  -- Elaboration-level tests skipped; GRAM tests pass
[[test-coverage-gaps]] --[:DEFERS]--> [[repl]]  -- Integration test skipped (infrastructure)
[[test-coverage-gaps]] --[:BLOCKS]--> [[modalities]]  -- Modal test blocked until inference.v2 modal.ts exists
[[test-coverage-gaps]] --[:BLOCKS]--> [[pi-types]]  -- Dependent arg test blocked by Bool parsing + checking.v2 match
[[test-coverage-gaps]] --[:DETAILS]--> [[testing-strategy]]  -- Inventory of skipped suites
[[test-coverage-gaps]] --[:DISCOVERED_BY]--> [[v1-test-cleanup]]  -- Audit that created the gaps inventory
[[testing-strategy]] --[:INCLUDES]--> [[test-coverage-gaps]]  -- Gap tracking
[[testing-strategy]] --[:INCLUDES]--> [[v1-test-cleanup]]  -- Cleanup event

## Selfification

[[selfification]] --[:COMPOSES_WITH]--> [[modalities]]  -- Conjoins self-equality into existing liquid predicate  @2026-05-22
[[selfification]] --[:RELIES_ON]--> [[verification-pipeline]]  -- Called from synth (Bound var path)  @2026-05-22
[[selfification]] --[:CONSTRAINS]--> [[first-order-restriction]]  -- Guarded by isFirstOrder  @2026-05-22

## First-order restriction

[[first-order-restriction]] --[:CONSTRAINS]--> [[refinement-types]]  -- Restricts self-equality and quantification to first-order types  @2026-05-22
[[first-order-restriction]] --[:CONSTRAINS]--> [[selfification]]  -- isFirstOrder top-level guard  @2026-05-22
[[first-order-restriction]] --[:PRESERVES]--> [[vc-ir]]  -- Keeps IVL formulas in decidable QF-EUFLIA fragment  @2026-05-22
[[first-order-restriction]] --[:RELIES_ON]--> [[verification-pipeline]]  -- Used in synth (selfify) and subtype (Pi parameter)  @2026-05-22
[[first-order-restriction]] --[:IMPLEMENTS]--> [[liquid-haskell-influence]]  -- Standard Liquid Types convention  @2026-05-22

## Syn-App-Ex modification

[[syn-app-ex-modification]] --[:REVISES]--> [[application]]  -- Uses check instead of synth+subtype for arguments  @2026-05-24
[[syn-app-ex-modification]] --[:RELIES_ON]--> [[bidirectional-checking]]  -- check provides expected type for extrinsic terms  @2026-05-24
[[syn-app-ex-modification]] --[:RELIES_ON]--> [[verification-pipeline]]  -- incorporate fn in synth.ts  @2026-05-24
[[syn-app-ex-modification]] --[:USES]--> [[selfification]]  -- check returns selfified nf for precision  @2026-05-24
[[syn-app-ex-modification]] --[:INFORMS]--> [[knowles-flanagan-2010]]  -- Modifies their Syn-App-Ex rule  @2026-05-24
[[syn-app-ex-modification]] --[:INCLUDES]--> [[verification-backend.thread]]  -- Thread item  @2026-05-24

## Industrial SMT ↔ IVL / CDCL(T) context

[[de-moura-bjorner-z3]] --[:INFORMS]--> [[vc-ir]]  -- Z3 architectural template parallels IR + theory stack  @2026-05-25
[[barbosa-cvc5]] --[:INFORMS]--> [[vc-ir]]  -- Modern DPLL(T) survey parallels in-tree CDCL(T) shape  @2026-05-25
[[liang-strings]] --[:INFORMS]--> [[milestone-3-strings]]  -- Target string-theory milestone  @2026-05-25
[[reynolds-strings]] --[:INFORMS]--> [[milestone-3-strings]]  -- Context-dependent rewrites as future plugin  @2026-05-25
[[nelson-oppen]] --[:DOCUMENTS]--> [[euf-theory]]  -- Theory combination behind EUF+LIA cooperation  @2026-05-25

## Selfification papers

[[ou-et-al-2004]] --[:INFORMS]--> [[selfification]]  -- Coined the term  @2026-05-22
[[knowles-flanagan-2010]] --[:INFORMS]--> [[selfification]]  -- T-Var formalization  @2026-05-22
[[knowles-flanagan-2010]] --[:INFORMS]--> [[first-order-restriction]]  -- Restricts selfification to base types  @2026-05-22
[[vazou-mechanizing-refinement-types-2024]] --[:INFORMS]--> [[selfification]]  -- Mechanized self() function  @2026-05-22
[[vazou-mechanizing-refinement-types-2024]] --[:INFORMS]--> [[first-order-restriction]]  -- Formal proof of restriction  @2026-05-22
[[vazou-refinement-reflection-2018]] --[:GENERALIZES]--> [[selfification]]  -- T-Exact generalizes T-Var to reflected definitions  @2026-05-22
[[vazou-refinement-reflection-2018]] --[:INFORMS]--> [[liquid-haskell-influence]]  -- Core LH paper  @2026-05-22
[[ou-et-al-2004]] --[:INFORMS]--> [[knowles-flanagan-2010]]  -- Original selfification idea  @2026-05-22

## V1 test cleanup

[[v1-test-cleanup]] --[:REVISES]--> [[snapshot-testing]]  -- Old tests used v1 API; ported coverage to v2 suites
[[v1-test-cleanup]] --[:DEPRECATES]--> [[v1-elaboration-pipeline]]  -- Last v1 API test consumers removed
[[v1-test-cleanup]] --[:MOTIVATES]--> [[test-coverage-gaps]]  -- Audit revealed skipped suites
[[v1-test-cleanup]] --[:ADDRESSES]--> [[testing-strategy]]  -- Closes v1/v2 test drift
[[v1-test-cleanup]] --[:ENRICHES]--> [[match]]  -- 8 pattern matching tests ported
[[v1-test-cleanup]] --[:USES]--> [[test-utility]]  -- Ported tests use elaborateFrom
[[v1-test-cleanup]] --[:FIXES]--> [[snapshot-testing]]  -- Removed stale vitest exclusions
[[v1-test-cleanup]] --[:DETAILS]--> [[testing.thread]]  -- Thread item

## Explorer evolution thread

[[explorer-evolution.thread]] --[:EXTENDS]--> [[pipeline-explorer]]  -- Evolution roadmap for the explorer
[[explorer-evolution.thread]] --[:SHARED_WITH]--> [[gram-evolution.thread]]  -- Graph viz depends on GRAM substrate
[[pipeline-explorer]] --[:INCLUDES]--> [[explorer-evolution.thread]]  -- Roadmap thread

[[explorer-provenance-trace]] --[:EXTENDS]--> [[pipeline-explorer]]  -- New explorer capability
[[explorer-provenance-trace]] --[:USES]--> [[provenance-system]]  -- Renders provenance stack as tree
[[explorer-provenance-trace]] --[:USES]--> [[provenance-display]]  -- Replaces flat text with tree UI
[[explorer-provenance-trace]] --[:ADDRESSES]--> [[error-causes]]  -- Traces errors to their elaboration origin
[[explorer-provenance-trace]] --[:ENABLES]--> [[vc-provenance]]  -- Visual provenance enables richer VC debugging
[[explorer-provenance-trace]] --[:PRECEDES]--> [[explorer-cross-highlighting]]  -- Provenance tree before cross-referencing

[[explorer-cross-highlighting]] --[:EXTENDS]--> [[pipeline-explorer]]  -- New explorer capability
[[explorer-cross-highlighting]] --[:USES]--> [[meta-variables]]  -- Meta IDs as cross-tab join keys
[[explorer-cross-highlighting]] --[:USES]--> [[de-bruijn]]  -- Variable indices/levels as join keys
[[explorer-cross-highlighting]] --[:COMPOSES_WITH]--> [[explorer-provenance-trace]]  -- Click provenance node → highlight in tabs
[[explorer-cross-highlighting]] --[:COMPOSES_WITH]--> [[explorer-graph-viz]]  -- Selection synced with graph view
[[explorer-cross-highlighting]] --[:FOLLOWS]--> [[explorer-provenance-trace]]  -- Sequence order

[[explorer-diff-mode]] --[:EXTENDS]--> [[pipeline-explorer]]  -- New explorer capability
[[explorer-diff-mode]] --[:COMPOSES_WITH]--> [[snapshot-testing]]  -- Diff mode complements snapshot-based testing
[[explorer-diff-mode]] --[:ENABLES]--> [[gram]]  -- Visualize what a GRAM pass changed
[[explorer-diff-mode]] --[:ENABLES]--> [[dpo-rewriting]]  -- Visualize DPO rule application effects
[[explorer-diff-mode]] --[:FOLLOWS]--> [[explorer-cross-highlighting]]  -- Sequence order

[[explorer-snippet-library]] --[:EXTENDS]--> [[pipeline-explorer]]  -- New explorer capability
[[explorer-snippet-library]] --[:COMPOSES_WITH]--> [[integration-testing]]  -- Snippets double as smoke tests
[[explorer-snippet-library]] --[:COMPOSES_WITH]--> [[repl]]  -- Similar curated-input concept
[[explorer-snippet-library]] --[:FOLLOWS]--> [[explorer-diff-mode]]  -- Sequence order

[[explorer-timing]] --[:EXTENDS]--> [[pipeline-explorer]]  -- New explorer capability
[[explorer-timing]] --[:ADDRESSES]--> [[performance]]  -- Identifies pipeline bottlenecks
[[explorer-timing]] --[:REPORTS]--> [[gram]]  -- Per-pass timing within GRAM
[[explorer-timing]] --[:REPORTS]--> [[constraint-solver]]  -- Solver timing breakdown
[[explorer-timing]] --[:FOLLOWS]--> [[explorer-snippet-library]]  -- Sequence order

[[explorer-graph-viz]] --[:EXTENDS]--> [[pipeline-explorer]]  -- New explorer capability
[[explorer-graph-viz]] --[:USES]--> [[gram]]  -- Renders GRAM property graph
[[explorer-graph-viz]] --[:USES]--> [[mir-lowering]]  -- Renders MIR CFG
[[explorer-graph-viz]] --[:USES]--> [[dpo-rewriting]]  -- Animates DPO rule application
[[explorer-graph-viz]] --[:COMPOSES_WITH]--> [[explorer-cross-highlighting]]  -- Graph selection synced with tabs
[[explorer-graph-viz]] --[:ADDRESSES]--> [[gram-additive-enrichment]]  -- Visualizes enrichment layers
[[explorer-graph-viz]] --[:SHARED_WITH]--> [[gram-evolution.thread]]  -- Graph viz depends on GRAM substrate
[[explorer-graph-viz]] --[:FOLLOWS]--> [[explorer-timing]]  -- Sequence order

## Explorer Audit

[[explorer-audit.thread]] --[:INCLUDES]--> [[stuck-quoting-fix]]  -- Thread member
[[explorer-audit.thread]] --[:INCLUDES]--> [[explorer-snippet-syntax-fixes]]  -- Thread member
[[explorer-audit.thread]] --[:INCLUDES]--> [[bridge-type-erasure]]  -- Thread member
[[explorer-audit.thread]] --[:INCLUDES]--> [[bridge-label-resolution]]  -- Thread member
[[explorer-audit.thread]] --[:INCLUDES]--> [[pattern-row-binder-fix]]  -- Thread member
[[explorer-audit.thread]] --[:INCLUDES]--> [[wraplambda-fix]]  -- Thread member
[[explorer-audit.thread]] --[:DOCUMENTS]--> [[implicit-generalization-semantics]]  -- Decision from audit
[[explorer-audit.thread]] --[:INCLUDES]--> [[module-zonker-fix]]  -- Thread member
[[explorer-audit.thread]] --[:INCLUDES]--> [[bridge-closure-capture]]  -- Thread member
[[explorer-audit.thread]] --[:INCLUDES]--> [[bridge-struct-dispatch]]  -- Thread member
[[explorer-audit.thread]] --[:INCLUDES]--> [[verification-unconstrained-meta]]  -- Thread member
[[explorer-audit.thread]] --[:INCLUDES]--> [[verification-rigid-mismatch]]  -- Thread member
[[explorer-audit.thread]] --[:SHARED_WITH]--> [[gram-evolution.thread]]  -- Bridge fixes
[[explorer-audit.thread]] --[:SHARED_WITH]--> [[elaboration-v2.thread]]  -- Monad/zonker fixes
[[explorer-audit.thread]] --[:SHARED_WITH]--> [[pattern-matching.thread]]  -- Struct dispatch, row binders
[[explorer-audit.thread]] --[:SHARED_WITH]--> [[explorer-evolution.thread]]  -- Snippet fixes, pipeline

[[stuck-quoting-fix]] --[:FIXES]--> [[pipeline-explorer]]  -- Segfault on stuck projection/injection quoting
[[stuck-quoting-fix]] --[:MODIFIES]--> [[normalization]]  -- New StuckProj/StuckInj patterns in quoting

[[explorer-snippet-syntax-fixes]] --[:FIXES]--> [[explorer-snippet-library]]  -- Four snippets had wrong syntax

[[bridge-type-erasure]] --[:FIXES]--> [[gram-to-mir-bridge]]  -- PI/SIGMA/VAR_META dispatch
[[bridge-type-erasure]] --[:ADDRESSES]--> [[type-erasure]]  -- Interim erasure until QTT

[[bridge-label-resolution]] --[:FIXES]--> [[gram-to-mir-bridge]]  -- VAR_LABEL dispatch
[[bridge-label-resolution]] --[:USES]--> [[row-types]]  -- Dependent struct field references

[[pattern-row-binder-fix]] --[:FIXES]--> [[gram]]  -- walkPatternRow de Bruijn alignment
[[pattern-row-binder-fix]] --[:USES]--> [[row-types]]  -- Row variable tail in patterns

[[wraplambda-fix]] --[:FIXES]--> [[implicits]]  -- Rigid(0) + unextended ctx
[[wraplambda-fix]] --[:REVEALS]--> [[implicit-generalization-semantics]]  -- Bug only triggers with dependent annotations

[[implicit-generalization-semantics]] --[:INFORMS]--> [[implicits]]  -- Unconstrained implicits generalize
[[implicit-generalization-semantics]] --[:INFORMS]--> [[let-polymorphism]]  -- Consistent with let-generalization

[[module-zonker-fix]] --[:FIXES]--> [[elaboration-monad]]  -- Told zonker dropped by listen()
[[module-zonker-fix]] --[:ADDRESSES]--> [[meta-variables]]  -- Prevents leaked meta re-generalization

[[bridge-closure-capture]] --[:ADDRESSES]--> [[gram-to-mir-bridge]]  -- Curried return calling convention
[[bridge-closure-capture]] --[:ADDRESSES]--> [[closures]]  -- Capture threading for nested closures

[[bridge-struct-dispatch]] --[:ADDRESSES]--> [[gram-to-mir-bridge]]  -- Struct pattern compilation
[[bridge-struct-dispatch]] --[:ADDRESSES]--> [[pattern-matching]]  -- Struct vs variant dispatch paths

[[verification-unconstrained-meta]] --[:ADDRESSES]--> [[verification-pipeline]]  -- Unsolved meta reaches IVL
[[verification-unconstrained-meta]] --[:MAY_RESOLVE_VIA]--> [[module-zonker-fix]]  -- Zonker fix may solve it

[[verification-rigid-mismatch]] --[:ADDRESSES]--> [[verification-pipeline]]  -- Rigid comparison failure
[[verification-rigid-mismatch]] --[:MAY_RESOLVE_VIA]--> [[module-zonker-fix]]  -- Zonker fix may solve it

## Tag-based worklist edges

[[type-erasure]] --[:INCLUDED_IN]--> [[usage-semantics.thread]]  -- QTT drives principled erasure
[[type-erasure]] --[:INCLUDED_IN]--> [[gram-evolution.thread]]  -- GRAM bridge handles interim erasure
[[ffi-saturation-gram]] --[:INCLUDED_IN]--> [[gram-evolution.thread]]  -- GRAM saturation pass
[[vacuous-ivl-vcs]] --[:ADDRESSES]--> [[verification-pipeline]]  -- Tautological VCs from selfification
[[nf-closure-display]] --[:ADDRESSES]--> [[normalization]]  -- Closure display in NbE output

## Elaboration core / AST quality rework  @2026-05-28

### AST pipeline
[[ast-pipeline]] --[:DEFINES]--> [[src-term]]  -- Surface layer of three-layer design
[[ast-pipeline]] --[:DEFINES]--> [[eb-term]]  -- Core layer of three-layer design
[[ast-pipeline]] --[:DEFINES]--> [[nf-value]]  -- Semantic layer of three-layer design
[[ast-pipeline]] --[:RELIES_ON]--> [[nbe]]  -- Eval/quote cycle is the engine
[[ast-pipeline]] --[:RELIES_ON]--> [[dependent-types]]  -- Types-as-terms requires shared representation
[[ast-pipeline]] --[:RELIES_ON]--> [[unified-binder]]  -- Single Abs node across all layers
[[ast-pipeline]] --[:ENABLES]--> [[unification-algorithm]]  -- NF.Value is the comparison currency
[[ast-pipeline]] --[:ENABLES]--> [[quoting]]  -- NF → EB readback
[[ast-pipeline]] --[:ENABLES]--> [[bidirectional-checking]]  -- Expected types are NF.Value

### Unified binder
[[unified-binder]] --[:CONSTRAINS]--> [[eb-term]]  -- All binders share Abs in EB.Term
[[unified-binder]] --[:CONSTRAINS]--> [[nf-value]]  -- All binders share Abs in NF.Value
[[unified-binder]] --[:ENABLES]--> [[dependent-types]]  -- Types and terms in one binder node
[[unified-binder]] --[:RELIES_ON]--> [[types-as-terms]]  -- Follows from types-as-terms principle
[[unified-binder]] --[:APPLIES_TO]--> [[pi-types]]  -- Pi uses Abs with binding.type Pi
[[unified-binder]] --[:APPLIES_TO]--> [[sigma-types]]  -- Sigma uses Abs with binding.type Sigma
[[unified-binder]] --[:APPLIES_TO]--> [[lambda]]  -- Lambda uses Abs with binding.type Lambda
[[unified-binder]] --[:APPLIES_TO]--> [[mu-types]]  -- Mu uses Abs with binding.type Mu
[[unified-binder]] --[:ENABLES]--> [[nbe]]  -- Uniform closure construction for all binders
[[unified-binder]] --[:ENABLES]--> [[unification-algorithm]]  -- Structural comparison under fresh rigids

### Closure type zettels
[[closures]] --[:INCLUDES]--> [[standard-closure]]  -- Core NbE closure
[[closures]] --[:INCLUDES]--> [[primop-closure]]  -- FFI/primitive closure
[[closures]] --[:INCLUDES]--> [[continuation-closure]]  -- Delimited continuation closure
[[standard-closure]] --[:IMPLEMENTS]--> [[nbe]]  -- Lazy substitution for all binders
[[standard-closure]] --[:RELIES_ON]--> [[elaboration-context]]  -- Captures ctx at binding time
[[standard-closure]] --[:RELIES_ON]--> [[eb-term]]  -- Body is an EB.Term
[[standard-closure]] --[:ENABLES]--> [[lambda]]  -- Lambda bodies are standard closures
[[standard-closure]] --[:ENABLES]--> [[pi-types]]  -- Pi codomains are standard closures
[[standard-closure]] --[:ENABLES]--> [[sigma-types]]  -- Sigma bodies are standard closures
[[standard-closure]] --[:ENABLES]--> [[mu-types]]  -- Mu bodies are standard closures
[[primop-closure]] --[:IMPLEMENTS]--> [[ffi]]  -- Built-in and foreign operations
[[primop-closure]] --[:RELIES_ON]--> [[nf-value]]  -- Args and result are NF.Value
[[primop-closure]] --[:PRODUCES]--> [[neutrals]]  -- Neutral when arg is stuck
[[continuation-closure]] --[:IMPLEMENTS]--> [[shift-reset]]  -- Captured delimited continuation
[[continuation-closure]] --[:RELIES_ON]--> [[nf-value]]  -- Captured frames and results
[[continuation-closure]] --[:ENABLES]--> [[nondeterminism-multishot]]  -- Multishot via reapplication
[[continuation-closure]] --[:RELIES_ON]--> [[cbv-evaluation]]  -- Captures work stack frames

### Application evaluation dispatch
[[application-evaluation]] --[:DISPATCHES_ON]--> [[standard-closure]]  -- Extend ctx and evaluate body
[[application-evaluation]] --[:DISPATCHES_ON]--> [[primop-closure]]  -- Accumulate and fire when saturated
[[application-evaluation]] --[:DISPATCHES_ON]--> [[continuation-closure]]  -- Restore frames and replay
[[application-evaluation]] --[:DISPATCHES_ON]--> [[neutrals]]  -- Grow spine when head is stuck
[[application-evaluation]] --[:DISPATCHES_ON]--> [[mu-types]]  -- Mu stays neutral, no unfold
[[application-evaluation]] --[:IMPLEMENTS]--> [[cbv-evaluation]]  -- Drives CBV discipline

### Holes and metas relationship
[[holes]] --[:INSTANTIATES]--> [[meta-variables]]  -- Each hole allocates fresh metas
[[holes]] --[:CONTRASTS_WITH]--> [[meta-variables]]  -- User-facing vs internal machinery
[[holes]] --[:RELIES_ON]--> [[unification-algorithm]]  -- Solving fills hole metas
[[holes]] --[:RELIES_ON]--> [[constraint-solving]]  -- Constraint solving fills hole metas
[[holes]] --[:DESUGARS_TO]--> [[eb-term]]  -- Holes become meta Var nodes in core

### Annotations as bidirectional hook
[[annotations]] --[:ENABLES]--> [[bidirectional-checking]]  -- Switches infer → check mode
[[annotations]] --[:RELIES_ON]--> [[nf-value]]  -- Annotation evaluated to NF before checking
[[annotations]] --[:RELIES_ON]--> [[pi-types]]  -- Annotation often provides expected Pi type
[[annotations]] --[:COMPOSES_WITH]--> [[modalities]]  -- stripModalities preserves user modalities

### Block generalization
[[blocks]] --[:RELIES_ON]--> [[generalization]]  -- Let-dec runs NF.generalize/instantiate
[[blocks]] --[:RELIES_ON]--> [[meta-variables]]  -- Generalization operates on unsolved metas
[[blocks]] --[:RELIES_ON]--> [[elaboration-context]]  -- Statement threading extends context

### Match elaboration
[[match]] --[:RELIES_ON]--> [[unification-algorithm]]  -- Arm types unified via assign constraints
[[match]] --[:RELIES_ON]--> [[nf-value]]  -- Scrutinee evaluated to NF for matching
[[match]] --[:LOWERS_TO]--> [[pattern-matching-compilation]]  -- Maranget clause-matrix at MIR level

### Dependent types hub connections
[[dependent-types]] --[:RELIES_ON]--> [[unified-binder]]  -- All binders share Abs
[[dependent-types]] --[:RELIES_ON]--> [[types-as-terms]]  -- Types and terms share syntax
[[dependent-types]] --[:RELIES_ON]--> [[type-type]]  -- Single universe classifier
[[dependent-types]] --[:INCLUDES]--> [[pi-types]]  -- Universal quantifier
[[dependent-types]] --[:INCLUDES]--> [[sigma-types]]  -- Existential quantifier
[[dependent-types]] --[:INCLUDES]--> [[mu-types]]  -- Recursive self-reference

### Sigma types and bindings
[[sigma-types]] --[:RELIES_ON]--> [[sigma-bindings]]  -- ctx.sigma provides field references
[[sigma-bindings]] --[:RELIES_ON]--> [[elaboration-context]]  -- ctx.sigma is a context component
[[sigma-bindings]] --[:ENABLES]--> [[nbe]]  -- extendSigmaEnv for label vars during eval

### Closures hub ↔ lowering
[[closure-conversion]] --[:CONSUMES]--> [[closures]]  -- Lifts closures to MIR functions
[[closure-conversion]] --[:CONSUMES]--> [[standard-closure]]  -- Standard closures become MIR env+fn pairs
[[closure-conversion]] --[:RELIES_ON]--> [[lambda]]  -- Only lambda closures survive to lowering

### Type : Type connections
[[type-type]] --[:CONTRASTS_WITH]--> [[system-f]]  -- Single universe vs stratified
[[type-type]] --[:ENABLES]--> [[pi-types]]  -- Domain/codomain checked at Type
[[type-type]] --[:ENABLES]--> [[sigma-types]]  -- Row types classified by Type

### AST layer contrasts
[[src-term]] --[:RELIES_ON]--> [[ast-pipeline]]  -- First layer of the pipeline
[[eb-term]] --[:RELIES_ON]--> [[ast-pipeline]]  -- Second layer of the pipeline
[[nf-value]] --[:RELIES_ON]--> [[ast-pipeline]]  -- Third layer of the pipeline

## Normalization / evaluation quality rework  @2026-05-28

### NbE hub children
[[nbe]] --[:INCLUDES]--> [[cbv-evaluation]]  -- Evaluation strategy
[[nbe]] --[:INCLUDES]--> [[quoting]]  -- Readback direction
[[nbe]] --[:INCLUDES]--> [[trampoline-evaluator]]  -- Stack-safe architecture
[[nbe]] --[:INCLUDES]--> [[knot-tying]]  -- Recursive evaluation pattern
[[nbe]] --[:INCLUDES]--> [[variable-evaluation-dispatch]]  -- Variable resolution
[[nbe]] --[:INCLUDES]--> [[whnf-vs-full-normalization]]  -- One evaluator, emergent WHNF
[[nbe]] --[:INCLUDES]--> [[evaluation-step-limit]]  -- Non-termination guard
[[nbe]] --[:INCLUDES]--> [[application-evaluation]]  -- Application dispatch
[[nbe]] --[:INCLUDES]--> [[closures]]  -- Deferred substitution
[[nbe]] --[:INCLUDES]--> [[neutrals]]  -- Stuck computation

### CBV evaluation
[[cbv-evaluation]] --[:RELIES_ON]--> [[trampoline-evaluator]]  -- Frame scheduling encodes CBV order
[[cbv-evaluation]] --[:RELIES_ON]--> [[shift-reset]]  -- Continuations require strict order
[[cbv-evaluation]] --[:CONTRASTS_WITH]--> [[strict-vs-lazy]]  -- Compile-time settled, runtime open
[[cbv-evaluation]] --[:ENABLES]--> [[nf-value]]  -- Produces predictable normal forms
[[cbv-evaluation]] --[:ENABLES]--> [[unification-algorithm]]  -- Deterministic comparison

### Quoting
[[quoting]] --[:RELIES_ON]--> [[de-bruijn-levels]]  -- Levels in NF.Value
[[quoting]] --[:RELIES_ON]--> [[de-bruijn-indices]]  -- Indices in EB.Term
[[quoting]] --[:RELIES_ON]--> [[level-to-index-conversion]]  -- Level → index at the boundary
[[quoting]] --[:RELIES_ON]--> [[meta-variables]]  -- Chases zonker for solved metas
[[quoting]] --[:RELIES_ON]--> [[sigma-bindings]]  -- Sigma applies annotation not fresh rigid
[[quoting]] --[:CONTRASTS_WITH]--> [[cbv-evaluation]]  -- Quote is inverse of evaluate

### WHNF design
[[whnf-vs-full-normalization]] --[:RELIES_ON]--> [[neutrals]]  -- WHNF is emergent from neutral blocking
[[whnf-vs-full-normalization]] --[:RELIES_ON]--> [[mu-types]]  -- Mu stays neutral
[[whnf-vs-full-normalization]] --[:RELIES_ON]--> [[evaluation-step-limit]]  -- Safety net for one-evaluator design

### Variable dispatch connections
[[variable-evaluation-dispatch]] --[:RELIES_ON]--> [[sigma-bindings]]  -- Label variables → ctx.sigma
[[variable-evaluation-dispatch]] --[:RELIES_ON]--> [[knot-tying]]  -- Free variables use placeholder pattern
[[variable-evaluation-dispatch]] --[:RELIES_ON]--> [[meta-variables]]  -- Meta resolution: skolem/zonker/neutral
[[variable-evaluation-dispatch]] --[:RELIES_ON]--> [[neutrals]]  -- Unsolved metas → neutral
[[variable-evaluation-dispatch]] --[:RELIES_ON]--> [[ffi]]  -- Foreign variables → ctx.ffi

### Trampoline architecture
[[trampoline-evaluator]] --[:RELIES_ON]--> [[evaluation-step-limit]]  -- Step limit complements trampoline
[[trampoline-evaluator]] --[:ENABLES]--> [[shift-reset]]  -- Delimiter frames on work stack
[[trampoline-evaluator]] --[:ENABLES]--> [[continuation-closure]]  -- Frame capture from work stack

### Knot-tying
[[knot-tying]] --[:ENABLES]--> [[blocks]]  -- Recursive let-bindings
[[knot-tying]] --[:ENABLES]--> [[mu-types]]  -- Mu bindings wrap in Neutral
[[knot-tying]] --[:RELIES_ON]--> [[nf-value]]  -- Placeholder mutation in env entries
[[knot-tying]] --[:RELIES_ON]--> [[elaboration-context]]  -- Environment extension for placeholders

### Strict vs lazy (updated)
[[strict-vs-lazy]] --[:RELIES_ON]--> [[cbv-evaluation]]  -- NbE is settled as CBV
[[strict-vs-lazy]] --[:COMPOSES_WITH]--> [[modalities]]  -- Modality system could encode eval strategy
[[strict-vs-lazy]] --[:APPLIES_TO]--> [[lowering]]  -- Lowering preserves source order
[[strict-vs-lazy]] --[:APPLIES_TO]--> [[codegen]]  -- Backend eval strategy

## Pipeline Stabilization  @2026-05-29

### Thread structure
[[pipeline-stabilization.thread]] --[:INCLUDES]--> [[eq-normalization-bug]]  -- $eq returns wrong result on equal literals
[[pipeline-stabilization.thread]] --[:INCLUDES]--> [[letpoly-implicit-escape]]  -- Generalization leaks block-internal metas
[[pipeline-stabilization.thread]] --[:INCLUDES]--> [[maplist-schema-unification]]  -- Mu-type schema row order mismatch
[[pipeline-stabilization.thread]] --[:INCLUDES]--> [[length-recursive-debruijn]]  -- Recursive call resolves as wrong de Bruijn index
[[pipeline-stabilization.thread]] --[:INCLUDES]--> [[fst-closure-annotation]]  -- Annotation swaps type parameters
[[pipeline-stabilization.thread]] --[:INCLUDES]--> [[sigma-quoting-match]]  -- Sigma body match can't reduce on symbolic binder
[[pipeline-stabilization.thread]] --[:INCLUDES]--> [[sigma-quoting-field-ref]]  -- Sigma body field ref resolves to type not value
[[pipeline-stabilization.thread]] --[:INCLUDES]--> [[bridge-free-var-unknown]]  -- Bridge var:free → unknown
[[pipeline-stabilization.thread]] --[:INCLUDES]--> [[bridge-label-closure-gap]]  -- Label self-ref under match scope
[[pipeline-stabilization.thread]] --[:INCLUDES]--> [[bridge-struct-dispatch]]  -- Backlog: struct pattern dispatch
[[pipeline-stabilization.thread]] --[:INCLUDES]--> [[bridge-closure-capture]]  -- Backlog: curried closure capture
[[pipeline-stabilization.thread]] --[:INCLUDES]--> [[type-erasure]]  -- Backlog: type-only let erasure

### Thread cross-references
[[pipeline-stabilization.thread]] --[:SHARED_WITH]--> [[gram-evolution.thread]]  -- Bridge bugs overlap
[[pipeline-stabilization.thread]] --[:SHARED_WITH]--> [[recursion.thread]]  -- Recursive binding bugs overlap
[[pipeline-stabilization.thread]] --[:SHARED_WITH]--> [[row-types.thread]]  -- Row/schema unification bug

### $eq normalization bug
[[eq-normalization-bug]] --[:APPLIES_TO]--> [[primitive-signature]]  -- $eq is a registered primop
[[eq-normalization-bug]] --[:RELIES_ON]--> [[nbe]]  -- Bug fires during normalization
[[eq-normalization-bug]] --[:RELIES_ON]--> [[cbv-evaluation]]  -- Primop compute runs under CBV evaluation
[[eq-normalization-bug]] --[:RELIES_ON]--> [[application-evaluation]]  -- PrimOps dispatch is application evaluation

### Let-poly implicit escape
[[letpoly-implicit-escape]] --[:APPLIES_TO]--> [[generalization]]  -- Meta escape at block boundary
[[letpoly-implicit-escape]] --[:APPLIES_TO]--> [[blocks]]  -- Block scoping of let-bound metas
[[letpoly-implicit-escape]] --[:RELIES_ON]--> [[missing-spec-let-polymorphism]]  -- Area with spec gaps
[[letpoly-implicit-escape]] --[:RELIES_ON]--> [[implicit-generalization-semantics]]  -- Implicit wrapping decision
[[module-zonker-fix]] --[:FIXES]--> [[letpoly-implicit-escape]]  -- Zonker propagation stopped meta escape  @2026-05-29
[[fst-closure-annotation]] --[:FIXES]--> [[letpoly-implicit-escape]]  -- Ann EB.Term fix resolved stale closure annotations  @2026-05-29

### mapList Schema unification
[[maplist-schema-unification]] --[:APPLIES_TO]--> [[row-unification]]  -- Row comparison step fails
[[maplist-schema-unification]] --[:APPLIES_TO]--> [[mu-types]]  -- Mu-type unfolding is likely upstream
[[maplist-schema-unification]] --[:RELIES_ON]--> [[nbe]]  -- Unfolding happens during evaluation

### length recursive de Bruijn
[[length-recursive-debruijn]] --[:RELIES_ON]--> [[knot-tying]]  -- Recursive binder pattern
[[length-recursive-debruijn]] --[:RELIES_ON]--> [[elaboration-context]]  -- De Bruijn depth management
[[length-recursive-debruijn]] --[:APPLIES_TO]--> [[blocks]]  -- Block-level recursive bindings
[[length-recursive-debruijn]] --[:FIXES]--> [[gram]]  -- Variant pattern rest row binder + parent binder stack  @2026-05-29
[[length-recursive-debruijn]] --[:APPLIES_TO]--> [[gram-to-mir-bridge]]  -- Unresolved var:bound cascaded to unknown in MIR  @2026-05-29
[[length-recursive-debruijn]] --[:DISCOVERED_BY]--> [[pipeline-stabilization.thread]]  @2026-05-29

### fst closure annotation
[[fst-closure-annotation]] --[:FOLLOWS]--> [[wraplambda-fix]]  -- Same problem space: stale closure context after implicit wrapping  @2026-05-29
[[fst-closure-annotation]] --[:RELIES_ON]--> [[implicit-generalization-semantics]]  -- Implicit parameter ordering
[[fst-closure-annotation]] --[:FIXES]--> [[annotations]]  -- Ann now carries EB.Term instead of NF.Value  @2026-05-29
[[fst-closure-annotation]] --[:APPLIES_TO]--> [[quoting]]  -- Fix quotes Pi to EB.Term at construction site
[[fst-closure-annotation]] --[:APPLIES_TO]--> [[nf-closure-display]]  -- Stale closure annotations no longer appear in Ann nodes
[[fst-closure-annotation]] --[:APPLIES_TO]--> [[eb-term]]  -- Changed Ann.ann field from NF.Value to EB.Term  @2026-05-29
[[fst-closure-annotation]] --[:APPLIES_TO]--> [[nf-value]]  -- Ann no longer captures NF.Value closures  @2026-05-29
[[fst-closure-annotation]] --[:DISCOVERED_BY]--> [[pipeline-stabilization.thread]]  @2026-05-29

### Sigma quoting limitations
[[sigma-quoting-match]] --[:APPLIES_TO]--> [[sigma-types]]  -- Sigma body quoting
[[sigma-quoting-match]] --[:APPLIES_TO]--> [[quoting]]  -- Readback limitation
[[sigma-quoting-match]] --[:RELIES_ON]--> [[sigma-bindings]]  -- Sigma binding strategy
[[sigma-quoting-field-ref]] --[:APPLIES_TO]--> [[sigma-types]]  -- Field ref substitution
[[sigma-quoting-field-ref]] --[:APPLIES_TO]--> [[quoting]]  -- Readback type-for-value
[[sigma-quoting-field-ref]] --[:RELIES_ON]--> [[sigma-bindings]]  -- Same binding strategy
[[sigma-quoting-match]] --[:COMPOSES_WITH]--> [[sigma-quoting-field-ref]]  -- Same root cause, different manifestation

### Bridge bugs
[[bridge-free-var-unknown]] --[:APPLIES_TO]--> [[gram-to-mir-bridge]]  -- Var resolution gap
[[bridge-label-closure-gap]] --[:EXTENDS]--> [[bridge-label-resolution]]  -- Edge case of prior fix
[[bridge-label-closure-gap]] --[:APPLIES_TO]--> [[gram-to-mir-bridge]]  -- Scope resolution under match

### Bridge forward label references
[[bridge-forward-label-refs]] --[:DISCOVERED_BY]--> [[bridge-label-closure-gap]]  -- Surfaced during #9 investigation  @2026-05-29
[[bridge-label-resolution]] --[:LACKS]--> [[bridge-forward-label-refs]]  -- Current left-to-right pass handles backward refs only  @2026-05-29
[[bridge-forward-label-refs]] --[:APPLIES_TO]--> [[gram-to-mir-bridge]]  -- Struct field emission ordering  @2026-05-29

### GRAM type uniformity
[[gram-type-uniformity]] --[:APPLIES_TO]--> [[gram]]  -- Uniform type representation across GRAM nodes  @2026-05-29
[[gram-type-uniformity]] --[:APPLIES_TO]--> [[gram-to-mir-bridge]]  -- Bridge needs consistent type format for type-driven lowering  @2026-05-29
[[gram-type-uniformity]] --[:MOTIVATES]--> [[eb-term]]  -- EB.Term as candidate uniform representation  @2026-05-29
[[gram-type-uniformity]] --[:MOTIVATES]--> [[nf-value]]  -- NF.Value as candidate uniform representation  @2026-05-29
[[fst-closure-annotation]] --[:MOTIVATES]--> [[gram-type-uniformity]]  -- Fix demonstrated stale-closure risk of NF.Value in type slots  @2026-05-29

### mapList Schema unification
[[maplist-schema-unification]] --[:FIXES]--> [[bidirectional-checking]]  -- Match-check quoted return type at wrong de Bruijn level  @2026-05-29
[[maplist-schema-unification]] --[:RELIES_ON]--> [[quoting]]  -- Quote-evaluate round-trip for scrutinee narrowing  @2026-05-29
[[maplist-schema-unification]] --[:RELIES_ON]--> [[de-bruijn-indices]]  -- Indices shift when pattern binders extend context  @2026-05-29
[[maplist-schema-unification]] --[:RELIES_ON]--> [[de-bruijn-levels]]  -- Levels are stable; NF.Value unaffected by binder extension  @2026-05-29
[[maplist-schema-unification]] --[:APPLIES_TO]--> [[match]]  -- Checked match branches with polymorphic return type  @2026-05-29
[[maplist-schema-unification]] --[:APPLIES_TO]--> [[dependent-pattern-matching]]  -- Scrutinee narrowing preserved by fix  @2026-05-29
[[maplist-schema-unification]] --[:DISCOVERED_BY]--> [[pipeline-stabilization.thread]]  @2026-05-29
[[maplist-schema-unification]] --[:FOLLOWS]--> [[fst-closure-annotation]]  -- Same class of bug: stale de Bruijn context in type slots  @2026-05-29

### Sigma architecture and mechanics
[[sigma-architecture]] --[:DETAILS]--> [[sigma-types]]  -- Two-step row abstraction mechanics  @2026-05-31
[[sigma-architecture]] --[:DETAILS]--> [[sigma-bindings]]  -- How ctx.sigma implements the abstraction  @2026-05-31
[[sigma-architecture]] --[:RELIES_ON]--> [[standard-closure]]  -- Reuses closure capture from Abs  @2026-05-31
[[sigma-architecture]] --[:CONTRASTS_WITH]--> [[pi-types]]  -- Row-of-labels vs single de Bruijn variable  @2026-05-31
[[sigma-architecture]] --[:APPLIES_TO]--> [[unified-binder]]  -- Why sigma shares the Abs node  @2026-05-31

### Sigma value semantics
[[sigma-value-semantics]] --[:DETAILS]--> [[sigma-types]]  -- Clarifies field ref semantics  @2026-05-31
[[sigma-value-semantics]] --[:MIRRORS]--> [[pi-types]]  -- Pi codomain analogy  @2026-05-31
[[sigma-value-semantics]] --[:RELIES_ON]--> [[singleton-types]]  -- Numbers as types make Num-dependent sigma coherent  @2026-05-31
[[sigma-value-semantics]] --[:COMPOSES_WITH]--> [[refinement-types]]  -- Field refs in refinement predicates  @2026-05-31

### Singleton types
[[singleton-types]] --[:ENABLES]--> [[sigma-value-semantics]]  -- Singletons give sigma over Num its meaning  @2026-05-31
[[singleton-types]] --[:RELIES_ON]--> [[bidirectional-checking]]  -- Emerges from bidir checking cases  @2026-05-31
[[singleton-types]] --[:COMPOSES_WITH]--> [[sigma-types]]  -- Singleton + sigma interaction  @2026-05-31

### Sigma checking bug
[[sigma-checking-infer-constrain]] --[:APPLIES_TO]--> [[sigma-types]]  -- Affects sigma checking  @2026-05-31
[[sigma-checking-infer-constrain]] --[:APPLIES_TO]--> [[sigma-bindings]]  -- Sigma apply in check path  @2026-05-31
[[sigma-checking-infer-constrain]] --[:RELIES_ON]--> [[singleton-types]]  -- Singletons expose the bug  @2026-05-31
[[sigma-checking-infer-constrain]] --[:APPLIES_TO]--> [[bidirectional-checking]]  -- Infer-then-constrain loses bidir info  @2026-05-31

### Sigma vs codata label refs
[[sigma-vs-codata-label-refs]] --[:DETAILS]--> [[sigma-types]]  -- Sigma side of the duality  @2026-05-31
[[sigma-vs-codata-label-refs]] --[:DETAILS]--> [[codata]]  -- Codata side of the duality  @2026-05-31
[[sigma-vs-codata-label-refs]] --[:APPLIES_TO]--> [[label-lookup]]  -- Both route through ctx.sigma  @2026-05-31
[[sigma-vs-codata-label-refs]] --[:MOTIVATES]--> [[nu-types]]  -- Codata refs motivate nu adoption  @2026-05-31
[[sigma-vs-codata-label-refs]] --[:MOTIVATES]--> [[sigma-codata-syntax-proposal]]  -- Motivates syntax split  @2026-05-31
[[sigma-vs-codata-label-refs]] --[:COMPOSES_WITH]--> [[mutual-recursion]]  -- Flat-row sigma parallels mutual letrec  @2026-05-31

### Codata vs coinductive types
[[codata-vs-coinductive-types]] --[:DETAILS]--> [[codata]]  -- Distinguishes codata paradigm from coinductive types  @2026-05-31
[[codata-vs-coinductive-types]] --[:DETAILS]--> [[coinductivity]]  -- Coinductive type theory side  @2026-05-31
[[codata-vs-coinductive-types]] --[:DETAILS]--> [[nu-types]]  -- Where nu sits between codata and coinductivity  @2026-05-31
[[codata-vs-coinductive-types]] --[:APPLIES_TO]--> [[structural-records]]  -- Records as codata via projections  @2026-05-31

### Syntax proposal
[[sigma-codata-syntax-proposal]] --[:APPLIES_TO]--> [[sigma-types]]  -- Sigma sigil  @2026-05-31
[[sigma-codata-syntax-proposal]] --[:APPLIES_TO]--> [[codata]]  -- Codata sigil  @2026-05-31
[[sigma-codata-syntax-proposal]] --[:APPLIES_TO]--> [[label-lookup]]  -- Parser and lookup changes  @2026-05-31
[[sigma-codata-syntax-proposal]] --[:RELIES_ON]--> [[sigma-vs-codata-label-refs]]  -- Theoretical basis  @2026-05-31
[[sigma-codata-syntax-proposal]] --[:RELIES_ON]--> [[codata-vs-coinductive-types]]  -- Codata vs full coinductivity informs scope  @2026-05-31

### Thread membership
[[row-types.thread]] --[:INCLUDES]--> [[sigma-checking-infer-constrain]]  -- Sigma checking bug  @2026-05-31
[[row-types.thread]] --[:INCLUDES]--> [[sigma-codata-syntax-proposal]]  -- Syntax proposal  @2026-05-31
[[recursion.thread]] --[:INCLUDES]--> [[codata-vs-coinductive-types]]  -- Codata vs coinductive types  @2026-05-31
[[recursion.thread]] --[:DOCUMENTS]--> [[sigma-vs-codata-label-refs]]  -- Knowledge: sigma/codata duality  @2026-05-31

### Sigma quoting fix  @2026-05-31
[[sigma-quoting-field-ref]] --[:GROUNDED_IN]--> [[sigma-architecture]]  -- Symbolic row mirrors Pi's Rigid(lvl) in the two-step architecture
[[sigma-quoting-match]] --[:GROUNDED_IN]--> [[sigma-architecture]]  -- StuckMatch requires symbolic neutrals from the row abstraction
[[sigma-quoting-field-ref]] --[:MIRRORS]--> [[quoting]]  -- Symbolic application during readback, analogous to Pi quoting
[[sigma-quoting-match]] --[:MIRRORS]--> [[quoting]]  -- Symbolic application during readback, analogous to Pi quoting

## Thread cleanup: concept → design zettel splits  @2026-06-01

### Design zettels and their concept targets
[[design-open-closed-variant-semantics]] --[:ADDRESSES]--> [[open-closed-variants]]  -- Design task for the concept
[[design-bisimulation-equality]] --[:ADDRESSES]--> [[bisimulation-type-equality]]  -- Design task for the concept
[[design-row-theory-verification]] --[:ADDRESSES]--> [[row-theory]]  -- Design task for the concept
[[design-vc-normalization]] --[:ADDRESSES]--> [[vc-normalization]]  -- Design task for the concept
[[design-sigma-codata-label-refs]] --[:ADDRESSES]--> [[sigma-vs-codata-label-refs]]  -- Design task for the concept
[[design-sigma-codata-label-refs]] --[:RELIES_ON]--> [[sigma-codata-syntax-proposal]]  -- Syntax proposal feeds this design

### Thread membership for new design zettels
[[pattern-matching.thread]] --[:INCLUDES]--> [[design-open-closed-variant-semantics]]  -- Design work item  @2026-06-01
[[row-types.thread]] --[:INCLUDES]--> [[design-open-closed-variant-semantics]]  -- Design work item  @2026-06-01
[[recursion.thread]] --[:INCLUDES]--> [[design-bisimulation-equality]]  -- Design work item  @2026-06-01
[[row-types.thread]] --[:INCLUDES]--> [[design-row-theory-verification]]  -- Design work item  @2026-06-01
[[verification-backend.thread]] --[:INCLUDES]--> [[design-vc-normalization]]  -- Design work item  @2026-06-01
[[recursion.thread]] --[:INCLUDES]--> [[design-sigma-codata-label-refs]]  -- Design work item  @2026-06-01

## Bubble Semantics Phase 1  @2026-06-01

[[bubble-semantics-phase1.implementation]] --[:IMPLEMENTS]--> [[bubble-semantics]]  -- Phase 1 implementation
[[bubble-semantics-phase1.implementation]] --[:RELIES_ON]--> [[shift-reset-verification-stub]]  -- Verification stub preserved
[[bubble-semantics-phase1.queue]] --[:APPLIES_TO]--> [[bubble-semantics-phase1.implementation]]  -- Queue tracks phase 1
[[delimited-continuations.thread]] --[:INCLUDES]--> [[bubble-semantics-phase1.implementation]]  -- Phase 1 work item  @2026-06-01

## tell/listen resumption refactor  @2026-06-01

[[tell-listen-resumption-refactor]] --[:ADDRESSES]--> [[bubble-semantics]]  -- Refactors how resumption values flow to Bubble
[[tell-listen-resumption-refactor]] --[:MOTIVATES]--> [[bubble-semantics-phase1.implementation]]  -- Discovered during phase 1 values injection
[[delimited-continuations.thread]] --[:INCLUDES]--> [[tell-listen-resumption-refactor]]  -- Tech debt work item  @2026-06-01

## Programmable GRAM passes  @2026-06-02

### Design hub composition
[[programmable-gram-passes]] --[:INCLUDES]--> [[gram-kernel-pass]]  -- Kernel meta-pass mechanism
[[programmable-gram-passes]] --[:INCLUDES]--> [[gram-rule-as-yap-value]]  -- Surface type for user rules
[[programmable-gram-passes]] --[:INCLUDES]--> [[pass-activation-by-reference]]  -- Discovery-by-reference principle

### Substrate dependencies
[[programmable-gram-passes]] --[:RELIES_ON]--> [[gram-additive-enrichment]]  -- Static passes ignore unfamiliar modal tags
[[programmable-gram-passes]] --[:RELIES_ON]--> [[typed-pass-composition]]  -- Reuses Descriptor requires/delta for topological sort
[[programmable-gram-passes]] --[:RELIES_ON]--> [[dpo-rewriting]]  -- Existing match/rewrite engine runs user rules
[[programmable-gram-passes]] --[:RELIES_ON]--> [[modality-system]]  -- Carrier is a new gram field on Modal.Annotations
[[programmable-gram-passes]] --[:RELIES_ON]--> [[gram-pattern-translation]]  -- Modal node emitted by EB→GRAM translation
[[gram-kernel-pass]] --[:CONSUMES]--> [[gram-rule-as-yap-value]]  -- Reads Rule values from modal annotations
[[gram-kernel-pass]] --[:USES]--> [[dpo-rewriting]]  -- Delegates execution to the engine
[[gram-kernel-pass]] --[:RELIES_ON]--> [[gram-additive-enrichment]]  -- RHS constructors only add structure
[[gram-rule-as-yap-value]] --[:MIRRORS]--> [[dpo-rewriting]]  -- Surface type maps engine-side Rule

### Architectural positioning
[[programmable-gram-passes]] --[:MOTIVATED_BY]--> [[extensibility-via-modalities.adr]]  -- ADR for the broader stance
[[extensibility-via-modalities.adr]] --[:GENERALIZES]--> [[verification-modal-phase]]  -- Verification reads liquid dimension
[[extensibility-via-modalities.adr]] --[:GENERALIZES]--> [[gram-crud-enrichment]]  -- CRUD reads multiplicity dimension
[[extensibility-via-modalities.adr]] --[:GENERALIZES]--> [[usage-semantics]]  -- Usage pass reads quantity dimension
[[extensibility-via-modalities.adr]] --[:RELIES_ON]--> [[modality-system]]  -- Modal layer is the extension surface
[[modality-system]] --[:MOTIVATES]--> [[programmable-gram-passes]]  -- Third dimension consumer
[[pass-activation-by-reference]] --[:CONTRASTS_WITH]--> [[koka-influence]]  -- Handler-as-value as architectural dual to attribute databases

### Prior art
[[programmable-gram-passes]] --[:GROUNDED_IN]--> [[mlir-transform-dialect]]  -- Transformations as ops in the IR being transformed
[[programmable-gram-passes]] --[:GROUNDED_IN]--> [[t-linq]]  -- Restricted host sublanguage normalizing to a domain residual
[[gram-rule-as-yap-value]] --[:GROUNDED_IN]--> [[t-linq]]  -- Stuck terms as well-formedness boundary
[[gram-kernel-pass]] --[:GROUNDED_IN]--> [[mlir-transform-dialect]]  -- Controlled primitive set interpreted by pass manager
[[mlir-transform-dialect]] --[:INFORMS]--> [[programmable-gram-passes]]
[[t-linq]] --[:INFORMS]--> [[gram-rule-as-yap-value]]

### Boundary
[[programmable-gram-passes]] --[:DEFERS_TO]--> [[logram]]  -- Whole-graph queries await richer substrate
[[gram-rule-as-yap-value]] --[:DEFERS_TO]--> [[logram]]  -- Capture-set analysis, ancestor walks need it

### Thread + session membership
[[gram-evolution.thread]] --[:INCLUDES]--> [[programmable-gram-passes]]  -- Sequence item 19  @2026-06-02
[[sessions.hub]] --[:INCLUDES]--> [[programmable-gram-passes-design.session]]  -- Session record  @2026-06-02
[[programmable-gram-passes-design.session]] --[:PRODUCED]--> [[programmable-gram-passes]]
[[programmable-gram-passes-design.session]] --[:PRODUCED]--> [[gram-kernel-pass]]
[[programmable-gram-passes-design.session]] --[:PRODUCED]--> [[gram-rule-as-yap-value]]
[[programmable-gram-passes-design.session]] --[:PRODUCED]--> [[pass-activation-by-reference]]
[[programmable-gram-passes-design.session]] --[:PRODUCED]--> [[extensibility-via-modalities.adr]]
[[programmable-gram-passes-design.session]] --[:PRODUCED]--> [[mlir-transform-dialect]]
[[programmable-gram-passes-design.session]] --[:PRODUCED]--> [[t-linq]]

### Passes-in-yap revision
[[programmable-gram-passes]] --[:REVISES]--> [[passes-in-yap]]  -- Replaces speculative self-hosted-passes paragraph

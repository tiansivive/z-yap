# z-yap Catalog (227 zettels)

## Abel & Pientka
`abel-pientka` — tags: normalization, unification, research, paper

**Outgoing:**
- [INFORMS] → [[nbe]] — Higher-order pattern unification
- [INFORMS] → [[unification]] — Pattern fragment analysis

## Agda (Influence)
`agda-influence` — tags: elaboration, dependent, research

**Outgoing:**
- [INSPIRES] → [[meta-variables]] — Pattern unification
- [INSPIRES] → [[dependent-types]] — Dependent types
- [INSPIRES] → [[nbe]] — Evaluation-based normalization
- [INSPIRES] → [[implicit-resolution]] — Instance resolution

## Annotations
`annotations` — tags: syntax, elaboration, concept, implemented

**Outgoing:**
- [COERCES_TO] → [[pi-types]] — Term validated against annotation

## Answer-type Polymorphism
`answer-type-polymorphism` — tags: continuation, type-system, concept, implemented

**Outgoing:**
- [GENERALIZES] → [[pi-types]] — Monomorphic → polymorphic answer

**Incoming:**
- [[shift-reset]] [USES] → — k has polymorphic answer type
- [[danvy-filinski]] [INFORMS] → — Answer type modification

## Application Evaluation
`application-evaluation` — tags: normalization, mechanism, implemented

**Outgoing:**
- [IMPLEMENTS] → [[nbe]] — (App) at NF level
- [DELEGATES_TO] → [[closures]] — Abs case

## Application
`application` — tags: type-system, syntax, concept, mechanism, implemented

**Outgoing:**
- [ELIMINATES] → [[pi-types]] — Elim form for functions
- [USES] → [[implicit-resolution]] — Implicit insertion

**Incoming:**
- [[lambda]] [DUAL_OF] → — Intro/elim pair for Pi
- [[spineful-applications]] [REVISES] → — Head + spine
- [[cbv-evaluation]] [PRESERVES] → — Left-to-right evaluation order
- [[saturation]] [REWRITES] → — App chains → primop nodes

## Arithmetic Theory
`arithmetic-theory` — tags: verification, arithmetic, mechanism, planned

**Outgoing:**
- [IMPLEMENTS] → [[theory-plugin-interface]] — Simplex
- [COMPOSES_WITH] → [[string-theory]] — Length coupling

**Incoming:**
- [[string-theory]] [DELEGATES_TO] → — Length lemmas
- [[num-sort-semantics]] [APPLIES_TO] → — Int vs Real
- [[non-linear-arithmetic]] [CONSTRAINS] → — Linearizable subset first
- [[milestone-2-euf-quant-lia]] [PRODUCES] → — Arithmetic module
- [[dutertre-arithmetic]] [INFORMS] → — Fast linear arithmetic

## Barbosa et al. "cvc5"
`barbosa-cvc5` — tags: verification, research, paper

**Outgoing:**
- [INFORMS] → [[cdcl-t-solver]] — Modern reference

## Bidirectional Checking (Decision)
`bidirectional-checking-decision` — tags: elaboration, inference, decision

**Outgoing:**
- [DISPATCHES_ON] → [[elaboration]] — Mode drives path
- [COMPOSES_WITH] → [[implicit-resolution]] — Mode switch triggers insertion

## Bidirectional Type Checking
`bidirectional-checking` — tags: concept, type-system, mechanism, elaboration

**Outgoing:**
- [ENABLES] → [[dependent-types]] — Natural fit for dependent types with annotations

**Incoming:**
- [[yap]] [USES] → — Inference strategy
- [[elaboration]] [USES] → — Infer synthesises, check pushes inward
- [[idris-2-influence]] [INSPIRES] → — TT core
- [[dunfield-krishnaswami]] [INFORMS] → — Declarative → algorithmic
- [[typing-rules]] [COMPOSES_WITH] → — Mode drives rule selection

## Block-level Using Gap
`block-level-using-gap` — tags: elaboration, inference, problem, incomplete

**Outgoing:**
- [APPLIES_TO] → [[blocks]] — Using in block scope
- [APPLIES_TO] → [[implicit-environment]] — Block-local Δ
- [DETECTS] → [[module-system]] — Gap in implementation

## Blocks
`blocks` — tags: syntax, elaboration, concept, implemented

**Outgoing:**
- [USES] → [[generalization]] — Let-polymorphism at boundaries

**Incoming:**
- [[where-clauses]] [DESUGARS_TO] → — Let bindings
- [[block-level-using-gap]] [APPLIES_TO] → — Using in block scope

## Boolean Lowering (CNF)
`boolean-lowering-cnf` — tags: verification, sat, planned

**Outgoing:**
- [FOLLOWS] → [[quantifier-preparation]] — After quantifier prep
- [TRANSLATES_TO] → [[vc-ir]] — Formula → clauses
- [PRESERVES] → [[vc-ir]] — Theory atoms untouched

**Incoming:**
- [[cdcl-t-solver]] [CONSUMES] → — CNF clauses

## Brainstorming Artifacts
`brainstorming-artifacts` — tags: research, infrastructure, reference

**Outgoing:**
- [INFORMS] → [[yap]] — Roadmap decisions

## Branded Types (Decision)
`branded-types` — tags: elaboration, normalization, decision

**Outgoing:**
- [CONSTRAINS] → [[eb-term]] — Type-level separation
- [CONSTRAINS] → [[nf-value]] — Prevents mixing

## C Codegen
`c-codegen` — tags: compiler, codegen, backend, in-progress

**Incoming:**
- [[yap]] [INCLUDES] → — C backend
- [[mir-lowering]] [PRODUCES] → — MIR → C

## CAS instead of SMT
`cas-instead-of-smt` — tags: verification, speculative

**Outgoing:**
- [CONTRASTS_WITH] → [[smt-translation]] — CAS alternative
- [CONTRASTS_WITH] → [[z3-replacement-decision]] — Alternative rejected

## CBV Evaluation
`cbv-evaluation` — tags: runtime, type-system, concept, implemented

**Outgoing:**
- [IMPLEMENTS] → [[yap]] — Runtime semantics
- [PRESERVES] → [[application]] — Left-to-right evaluation order
- [NORMALIZES_TO] → [[nf-value]] — Closed terms fully reduce

**Incoming:**
- [[primitive-signature]] [USES] → — δ-rules on literals
- [[strict-vs-lazy]] [CONTRASTS_WITH] → — Lazy alternative
- [[trampoline-evaluator]] [PRESERVES] → — Same results

## CDCL(T) Solver
`cdcl-t-solver` — tags: verification, sat, mechanism, planned

**Outgoing:**
- [IMPLEMENTS] → [[verification-pipeline]] — Replaces Z3
- [CONSUMES] → [[boolean-lowering-cnf]] — CNF clauses
- [DELEGATES_TO] → [[theory-plugin-interface]] — Theory propagation

**Incoming:**
- [[theory-plugin-interface]] [ENABLES] → — Modular theories
- [[verification-backend]] [WRAPS] → — Simple API
- [[z3-replacement-decision]] [MOTIVATES] → — Own solver needed
- [[milestone-2-euf-quant-lia]] [PRODUCES] → — Core solver
- [[nieuwenhuis-oliveras]] [INFORMS] → — DPLL(T) architecture
- [[de-moura-bjorner-z3]] [INFORMS] → — Industrial reference
- [[barbosa-cvc5]] [INFORMS] → — Modern reference

## Closure Conversion
`closure-conversion` — tags: lowering, mechanism, implemented

**Outgoing:**
- [CONTRASTS_WITH] → [[defunctionalization]] — Different lowering strategies
- [CONTRASTS_WITH] → [[native-lambda-hvm]] — Different targets
- [TRANSLATES_TO] → [[mir-lowering]] — Env + function pointer
- [ERASES] → [[lambda]] — Flattens lexical scope

**Incoming:**
- [[native-lambda-hvm]] [REJECTS] → — HVM needs raw λ

## Closures (NbE)
`closures` — tags: mechanism, concept, normalization, type-system

**Outgoing:**
- [RELIES_ON] → [[de-bruijn]] — Closures capture de Bruijn level-indexed environments

**Incoming:**
- [[neutrals]] [CONTRASTS_WITH] → — Closures reduce; neutrals are stuck — dual roles in NbE
- [[session-lowering-branch-split]] [ADDRESSES] → — Closure conversion and shared bundle primitive
- [[quoting]] [USES] → — Apply closure for readback
- [[application-evaluation]] [DELEGATES_TO] → — Abs case
- [[nbe]] [USES] → — Lazy substitution

## CompCert/CakeML (Influence)
`compcert-cakeml-influence` — tags: lowering, verification, research

**Outgoing:**
- [INSPIRES] → [[gram]] — Refinement terminology
- [INSPIRES] → [[verification-pipeline]] — Verified compilation aspiration

## Compile Orchestration
`compile-orchestration` — tags: compiler, infrastructure, implemented

**Outgoing:**
- [DELEGATES_TO] → [[v1-elaboration-pipeline]] — Current delegation
- [DELEGATES_TO] → [[verification-pipeline]] — On-demand
- [DELEGATES_TO] → [[mir-lowering]] — Lowering step

**Incoming:**
- [[yap]] [INCLUDES] → — Orchestration

## Constraint Solving
`constraint-solving` — tags: mechanism, type-system, elaboration

**Outgoing:**
- [USES] → [[row-unification]] — Row variables unified alongside type variables

**Incoming:**
- [[elaboration]] [USES] → — Deferred constraints solved per let-binding

## Constraint Types
`constraint-types` — tags: unification, elaboration, concept, implemented

**Outgoing:**
- [ENABLES] → [[solver-dispatch]] — Typed constraints
- [DISPATCHES_ON] → [[solver-dispatch]] — Assign vs resolve

**Incoming:**
- [[implicit-resolution]] [RESOLVES] → — Δ lookup for resolve constraints
- [[solver]] [RESOLVES] → — Processes queue
- [[deferred-constraint-solving]] [RESOLVES] → — At let boundaries
- [[solver-dispatch]] [RESOLVES] → — Processes queue

## Context Operations
`context-operations` — tags: elaboration, mechanism, implemented

**Outgoing:**
- [ENABLES] → [[elaboration-context]] — Bind, extend, augment, prune
- [THREADS_THROUGH] → [[elaboration-monad]] — All phases

## Continuation Binders
`continuation-binders` — tags: continuation, elaboration, mechanism, implemented

**Outgoing:**
- [USES] → [[meta-variables]] — Skolem-like metas
- [RELIES_ON] → [[nondeterminism]] — Multishot semantics
- [THREADS_THROUGH] → [[elaboration-monad]] — Via MutState

**Incoming:**
- [[shift-reset]] [USES] → — Resume encoded via metas
- [[shift-reset]] [INTRODUCES] → — Shift captures k

## Danvy & Filinski
`danvy-filinski` — tags: continuation, research, paper

**Outgoing:**
- [INFORMS] → [[shift-reset]] — Foundational theory
- [INFORMS] → [[answer-type-polymorphism]] — Answer type modification

## De Bruijn Indices (EB)
`de-bruijn-indices` — tags: elaboration, normalization, mechanism, implemented

**Outgoing:**
- [CONTRASTS_WITH] → [[de-bruijn-levels]] — Dual representations
- [EXTENDS] → [[de-bruijn]] — EB-level detail

**Incoming:**
- [[level-to-index-conversion]] [USES] → — Target representation

## De Bruijn Levels (NF)
`de-bruijn-levels` — tags: normalization, mechanism, implemented

**Outgoing:**
- [EXTENDS] → [[de-bruijn]] — NF-level detail

**Incoming:**
- [[de-bruijn-indices]] [CONTRASTS_WITH] → — Dual representations
- [[level-to-index-conversion]] [USES] → — Source representation

## De Bruijn Representation
`de-bruijn` — tags: mechanism, concept, type-system, normalization, elaboration

**Incoming:**
- [[closures]] [RELIES_ON] → — Closures capture de Bruijn level-indexed environments
- [[system-f]] [INFORMS] → — System F's binding structure motivates de Bruijn representation
- [[levels-vs-indices]] [APPLIES_TO] → — Representation split
- [[de-bruijn-indices]] [EXTENDS] → — EB-level detail
- [[de-bruijn-levels]] [EXTENDS] → — NF-level detail

## de Moura & Bjørner "Z3"
`de-moura-bjorner-z3` — tags: verification, research, paper

**Outgoing:**
- [INFORMS] → [[cdcl-t-solver]] — Industrial reference

## Dedicated Row Constructors
`dedicated-row-constructors` — tags: syntax, row-types, planned

**Outgoing:**
- [REVISES] → [[structural-records]] — Dedicated AST nodes
- [ADDRESSES] → [[rows-universal-substrate]] — Cognitive overhead

## Deferred Constraint Solving
`deferred-constraint-solving` — tags: elaboration, inference, decision

**Outgoing:**
- [ENABLES] → [[generalization]] — Metas generalized before solving
- [ENABLES] → [[implicit-resolution]] — Full context for resolution
- [RELIES_ON] → [[solver-dispatch]] — Batch processing at let boundaries
- [RESOLVES] → [[constraint-types]] — At let boundaries

**Incoming:**
- [[ghc-influence]] [INSPIRES] → — Constraint deferral

## Defunctionalization
`defunctionalization` — tags: lowering, mechanism, speculative

**Outgoing:**
- [SPECIALIZES] → [[mir-lowering]] — GPU/HVM targets

**Incoming:**
- [[closure-conversion]] [CONTRASTS_WITH] → — Different lowering strategies

## Dependent Types
`dependent-types` — tags: concept, type-system, dependent

**Outgoing:**
- [EXTENDS] → [[system-f]] — Types that depend on values

**Incoming:**
- [[yap]] [USES] → — Pi types with value dependencies
- [[bidirectional-checking]] [ENABLES] → — Natural fit for dependent types with annotations
- [[pi-types]] [EXTENDS] → — Universal quantification with dependency
- [[sigma-types]] [EXTENDS] → — Existential with row dependency
- [[type-type]] [ENABLES] → — Types compute as terms
- [[type-type]] [COMPOSES_WITH] → — Types in same universe
- [[types-as-terms]] [RELIES_ON] → — Dependency required
- [[idris-2-influence]] [INSPIRES] → — Dependent TT
- [[agda-influence]] [INSPIRES] → — Dependent types
- [[sigma-bindings]] [IMPLEMENTS] → — Field-to-field dependency
- [[nbe]] [PRESERVES] → — Beta-eta equivalence

## Dictionaries
`dictionaries` — tags: type-system, row-types, concept, implemented

**Outgoing:**
- [ENCODES] → [[ffi]] — Indexed String T defaultHashMap (foreign)
- [MIRRORS] → [[lists]] — Same Indexed encoding, different index

## Documentation Debt Registry
`documentation-debt` — tags: project, infrastructure, problem

**Outgoing:**
- [APPLIES_TO] → [[yap]] — README/FAQ drift
- [DETECTS] → [[yap]] — Drift between docs and impl

## DPO Rewriting
`dpo-rewriting` — tags: rewriting, lowering, mechanism, in-progress

**Outgoing:**
- [IMPLEMENTS] → [[gram]] — Rewriting engine
- [TRAVERSES] → [[gram]] — Pattern matching for rule LHS

**Incoming:**
- [[gram]] [REWRITES] → — DPO rules refine graph
- [[egglog-influence]] [INSPIRES] → — E-graph rewriting
- [[stratego-influence]] [INSPIRES] → — Strategy combinators

## Dunfield & Krishnaswami
`dunfield-krishnaswami` — tags: inference, type-system, research, paper

**Outgoing:**
- [INFORMS] → [[bidirectional-checking]] — Declarative → algorithmic
- [INFORMS] → [[implicit-resolution]] — Subsumption in bidir

## Dutertre & de Moura (Linear Arithmetic)
`dutertre-arithmetic` — tags: verification, arithmetic, research, paper

**Outgoing:**
- [INFORMS] → [[arithmetic-theory]] — Fast linear arithmetic

## Dynamic / Reflection
`dynamic-reflection` — tags: type-system, runtime, speculative

**Outgoing:**
- [COMPOSES_WITH] → [[verification-pipeline]] — Proof-gated casts
- [COERCES_TO] → [[pi-types]] — Safe cast via proof

## EB.Term (Elaborated Term)
`eb-term` — tags: elaboration, ast, concept, implemented

**Outgoing:**
- [NORMALIZES_TO] → [[nf-value]] — Via evaluation
- [CONTRASTS_WITH] → [[nf-value]] — Syntax vs semantic domain

**Incoming:**
- [[v1-elaboration-pipeline]] [PRODUCES] → — EB.Term output
- [[mir-lowering]] [TRANSLATES_TO] → — EB.Term → SSA blocks
- [[mir-lowering]] [TRAVERSES] → — Pattern-match walk
- [[zonking]] [TRAVERSES] → — Walks replacing metas
- [[smt-translation]] [TRAVERSES] → — Walks producing Z3
- [[branded-types]] [CONSTRAINS] → — Type-level separation
- [[quoting]] [QUOTES_TO] → — NF.Value → EB.Term
- [[src-term]] [PRODUCES] → — Via elaboration
- [[nf-value]] [QUOTES_TO] → — Via quoting
- [[src-term]] [CONTRASTS_WITH] → — Surface vs core
- [[src-to-eb-transformation]] [PRODUCES] → — Elaborated output
- [[nbe]] [QUOTES_TO] → — Readback direction

## Effects as Modality
`effects-as-modality` — tags: effect, modality, continuation, speculative

**Outgoing:**
- [EXTENDS] → [[modalities]] — Effects tracked as modalities
- [EXTENDS] → [[shift-reset]] — Effect system over continuations

**Incoming:**
- [[petricek-orchard]] [INSPIRES] → — Coeffect framework

## egglog (Influence)
`egglog-influence` — tags: rewriting, research

**Outgoing:**
- [INSPIRES] → [[logram]] — Equality saturation
- [INSPIRES] → [[dpo-rewriting]] — E-graph rewriting

## Elaboration Context
`elaboration-context` — tags: elaboration, mechanism, implemented

**Outgoing:**
- [ENABLES] → [[elaboration]] — Central context
- [INCLUDES] → [[implicit-environment]] — Δ in context
- [THREADS_THROUGH] → [[elaboration-monad]] — Reader component

**Incoming:**
- [[implicit-environment]] [THREADS_THROUGH] → — ctx.implicits
- [[module-system]] [PRODUCES] → — Interface tables
- [[sigma-bindings]] [THREADS_THROUGH] → — ctx.sigma map
- [[context-operations]] [ENABLES] → — Bind, extend, augment, prune
- [[provenance-system]] [THREADS_THROUGH] → — ctx.trace stack
- [[repl]] [THREADS_THROUGH] → — Persistent ctx

## Elaboration Monad (V2 Do)
`elaboration-monad` — tags: mechanism, elaboration, pattern, code

**Outgoing:**
- [USES] → [[meta-variables]] — Monad state component manages the meta store
- [USES] → [[unification]] — Monad writer accumulates constraints consumed by unification

**Incoming:**
- [[continuation-binders]] [THREADS_THROUGH] → — Via MutState
- [[elaboration-context]] [THREADS_THROUGH] → — Reader component
- [[monad-split]] [REVISES] → — Addresses coupling
- [[generator-monad]] [IMPLEMENTS] → — Generator yield protocol
- [[generator-monad]] [ENCODES] → — RWSE as generator
- [[lean-4-influence]] [INSPIRES] → — Pipeline discipline
- [[context-operations]] [THREADS_THROUGH] → — All phases
- [[error-propagation]] [PROPAGATES_VIA] → — V2.fail + yield
- [[v2-track]] [EXTENDS] → — Trace extension
- [[test-utility]] [USES] → — V2.Do pipeline

## Elaboration
`elaboration` — tags: mechanism, elaboration, project

**Outgoing:**
- [USES] → [[bidirectional-checking]] — Infer synthesises, check pushes inward
- [USES] → [[nbe]] — Evaluate to values, compare structurally
- [USES] → [[constraint-solving]] — Deferred constraints solved per let-binding

**Incoming:**
- [[yap]] [INCLUDES] → — Core pipeline stage
- [[session-lowering-branch-split]] [ADDRESSES] → — FFI arity computation piped from elaboration to lowering
- [[nearley-parser]] [PRODUCES] → — Src.Term
- [[whnf-vs-full-normalization]] [CONSTRAINS] → — WHNF only in elab
- [[elaboration-context]] [ENABLES] → — Central context
- [[bidirectional-checking-decision]] [DISPATCHES_ON] → — Mode drives path
- [[pretty-printing]] [REPORTS] → — Human-readable output
- [[test-utility]] [SNAPSHOTS] → — Pretty + structure output

## Elm/OCaml (Influence)
`elm-ocaml-influence` — tags: row-types, type-system, research

**Outgoing:**
- [INSPIRES] → [[row-polymorphism]] — Row types approach
- [INSPIRES] → [[variant-types]] — Polymorphic variants

## Equirecursive Types (Coinduction)
`equirecursive-types` — tags: type-system, recursion, planned

**Outgoing:**
- [EXTENDS] → [[mu-types]] — Beyond simple unfolding
- [REVISES] → [[mu-type-unification]] — Toward full bisimulation
- [PRESERVES] → [[unification]] — Type equality under finite unfolding

**Incoming:**
- [[termination-checking]] [EXTENDS] → — Guardedness
- [[mu-type-unification]] [IMPLEMENTS] → — Current approach

## Erlang Codegen
`erlang-codegen` — tags: compiler, codegen, backend, in-progress

**Incoming:**
- [[yap]] [INCLUDES] → — Erlang backend
- [[mir-lowering]] [PRODUCES] → — MIR → Erlang

## Error Causes (Err.Cause)
`error-causes` — tags: error-handling, elaboration, mechanism, implemented

**Outgoing:**
- [REPORTS] → [[unification-algorithm]] — Type error rendering
- [USES] → [[nf-display]] — Zonked NF in messages

**Incoming:**
- [[error-propagation]] [USES] → — Lifts into monad
- [[provenance-display]] [REPORTS] → — Error paths

## Error Propagation (V2.fail)
`error-propagation` — tags: error-handling, elaboration, monad, mechanism, implemented

**Outgoing:**
- [USES] → [[error-causes]] — Lifts into monad
- [USES] → [[provenance-system]] — Carries trace
- [PROPAGATES_VIA] → [[elaboration-monad]] — V2.fail + yield

**Incoming:**
- [[provenance-system]] [ENABLES] → — Meaningful errors need context

## EUF Theory
`euf-theory` — tags: verification, unification, mechanism, planned

**Outgoing:**
- [IMPLEMENTS] → [[theory-plugin-interface]] — Congruence closure
- [ENABLES] → [[quantifier-engine]] — Trigger matching

**Incoming:**
- [[quantifier-engine]] [DELEGATES_TO] → — E-matching
- [[milestone-2-euf-quant-lia]] [PRODUCES] → — EUF module

## Evaluation Step Limit
`evaluation-step-limit` — tags: normalization, performance, mechanism, implemented

**Outgoing:**
- [CONSTRAINS] → [[trampoline-evaluator]] — Prevents non-termination
- [DETECTS] → [[nbe]] — Infinite loops

## Exhaustiveness Checking
`exhaustiveness-checking` — tags: type-system, elaboration, planned

**Outgoing:**
- [EXTENDS] → [[match]] — Safety gap

## FFI Saturation
`ffi-saturation` — tags: ffi, lowering, mechanism, implemented

**Outgoing:**
- [EXTENDS] → [[ffi]] — Partial application handling
- [RELIES_ON] → [[mir-lowering]] — Lowering step
- [PRESERVES] → [[lambda]] — Calling convention via closures

## FFI
`ffi` — tags: ffi, language, implemented

**Outgoing:**
- [RELIES_ON] → [[mir-lowering]] — Saturation
- [LACKS] → [[type-erasure]] — Needs dummy type args
- [TRANSLATES_TO] → [[js-codegen]] — Curried JS functions

**Incoming:**
- [[lists]] [ENCODES] → — Indexed Num T defaultArray (foreign)
- [[dictionaries]] [ENCODES] → — Indexed String T defaultHashMap (foreign)
- [[ffi-saturation]] [EXTENDS] → — Partial application handling

## Flex-Flex Unification
`flex-flex-unification` — tags: unification, elaboration, mechanism, implemented

**Outgoing:**
- [SPECIALIZES] → [[unification-algorithm]] — Both unsolved
- [RESOLVES] → [[meta-variables]] — Binds left to right

## Flex-Rigid Unification
`flex-rigid-unification` — tags: unification, elaboration, mechanism, implemented

**Outgoing:**
- [SPECIALIZES] → [[unification-algorithm]] — Meta vs rigid
- [RESOLVES] → [[meta-variables]] — Binds to rigid
- [RECOVERS_FROM] → [[substitution-system]] — Chases solved metas

## Functional Patterns
`functional-patterns` — tags: syntax, elaboration, speculative

## Ge & de Moura (Quantifier Instantiation)
`ge-de-moura-quantifiers` — tags: verification, quantifiers, research, paper

**Outgoing:**
- [INFORMS] → [[quantifier-engine]] — Complete instantiation

## Generalization (Let-Polymorphism)
`generalization` — tags: mechanism, type-system, elaboration

**Outgoing:**
- [USES] → [[meta-variables]] — Generalizes unsolved metas into implicit Pis
- [IMPLEMENTS] → [[hindley-milner]] — Yap's implementation of HM let-generalization
- [PRODUCES] → [[implicits]] — Generalization wraps terms in implicit lambdas

**Incoming:**
- [[blocks]] [USES] → — Let-polymorphism at boundaries
- [[deferred-constraint-solving]] [ENABLES] → — Metas generalized before solving
- [[ghc-influence]] [INSPIRES] → — Let-polymorphism
- [[missing-spec-let-polymorphism]] [IMPLEMENTS] → — No spec formalization
- [[implicit-resolution-solver]] [PRESERVES] → — Rejects subst-producing candidates
- [[knot-tying]] [ENABLES] → — Recursive let evaluation
- [[hindley-milner]] [INFORMS] → — Let-polymorphism theory

## Generator Monad (Decision)
`generator-monad` — tags: elaboration, mechanism, decision

**Outgoing:**
- [IMPLEMENTS] → [[elaboration-monad]] — Generator yield protocol
- [ENCODES] → [[elaboration-monad]] — RWSE as generator

## GHC (Influence)
`ghc-influence` — tags: inference, type-system, research

**Outgoing:**
- [INSPIRES] → [[generalization]] — Let-polymorphism
- [INSPIRES] → [[deferred-constraint-solving]] — Constraint deferral
- [INSPIRES] → [[modalities]] — Levity polymorphism precedent

## GRAM as S-expressions (Rejected)
`gram-as-s-expressions` — tags: lowering, rewriting, rejected

**Outgoing:**
- [REJECTS] → [[gram]] — Rejected representation

## GRAM Step 1
`gram-step-1` — tags: lowering, rewriting, in-progress

**Outgoing:**
- [IMPLEMENTS] → [[gram]] — Partial — first step

## GRAM
`gram` — tags: lowering, rewriting, compiler, in-progress

**Outgoing:**
- [SUPERSEDES] → [[mir-lowering]] — As IR approach
- [REWRITES] → [[dpo-rewriting]] — DPO rules refine graph
- [PRESERVES] → [[nbe]] — Semantic equivalence per pass

**Incoming:**
- [[dpo-rewriting]] [IMPLEMENTS] → — Rewriting engine
- [[dpo-rewriting]] [TRAVERSES] → — Pattern matching for rule LHS
- [[structural-vs-representational-passes]] [CONSTRAINS] → — Ordering principle
- [[mir-retrospective]] [INFORMS] → — Lessons learned
- [[mir-retrospective]] [MOTIVATES] → — Why GRAM exists
- [[gram-step-1]] [IMPLEMENTS] → — Partial — first step
- [[gram-as-s-expressions]] [REJECTS] → — Rejected representation
- [[logram]] [EXTENDS] → — Speculative substrate
- [[typed-pass-composition]] [EXTENDS] → — Type-safe passes
- [[passes-in-yap]] [EXTENDS] → — Self-hosting passes
- [[mlir-influence]] [INSPIRES] → — Open vocabulary / dialects
- [[nanopass-influence]] [INSPIRES] → — Composable passes
- [[compcert-cakeml-influence]] [INSPIRES] → — Refinement terminology

## Higher-order in Formulas (Decision)
`higher-order-in-formulas` — tags: verification, type-system, decision

**Outgoing:**
- [CONSTRAINS] → [[quantifier-engine]] — No HO quantification

## Hindley-Milner Type Inference
`hindley-milner` — tags: concept, type-system, mechanism

**Outgoing:**
- [INFORMS] → [[generalization]] — Let-polymorphism theory
- [INFORMS] → [[meta-variables]] — Unification-based inference

**Incoming:**
- [[yap]] [EXTENDS] → — HM + row variables + dependent types
- [[row-polymorphism]] [EXTENDS] → — Parametric extension via row variables
- [[generalization]] [IMPLEMENTS] → — Yap's implementation of HM let-generalization
- [[system-f]] [INFORMS] → — Explicit polymorphism

## Holes
`holes` — tags: syntax, elaboration, inference, concept, implemented

**Outgoing:**
- [INSTANTIATES] → [[meta-variables]] — Fresh meta per hole

## Idris 1 QTT Paper
`idris-1-qtt-paper` — tags: modality, type-system, research, paper

**Outgoing:**
- [INSPIRES] → [[modalities]] — Quantity tracking

## Idris 2 (Influence)
`idris-2-influence` — tags: elaboration, dependent, research

**Outgoing:**
- [INSPIRES] → [[meta-variables]] — Contextual metas
- [INSPIRES] → [[bidirectional-checking]] — TT core
- [INSPIRES] → [[dependent-types]] — Dependent TT
- [INSPIRES] → [[solver]] — Unification approach

## Implicit Environment
`implicit-environment` — tags: inference, elaboration, mechanism, implemented

**Outgoing:**
- [ENABLES] → [[implicit-resolution]] — Provides Δ
- [THREADS_THROUGH] → [[elaboration-context]] — ctx.implicits

**Incoming:**
- [[elaboration-context]] [INCLUDES] → — Δ in context
- [[block-level-using-gap]] [APPLIES_TO] → — Block-local Δ

## Implicit Resolution (Solver)
`implicit-resolution-solver` — tags: inference, unification, mechanism, implemented

**Outgoing:**
- [IMPLEMENTS] → [[implicit-resolution]] — Solver-side mechanism
- [USES] → [[unification-algorithm]] — Candidate matching
- [PRESERVES] → [[generalization]] — Rejects subst-producing candidates

**Incoming:**
- [[solver]] [DELEGATES_TO] → — Resolve constraints
- [[solver-dispatch]] [USES] → — Resolve → Δ lookup

## Implicit Resolution
`implicit-resolution` — tags: inference, elaboration, mechanism, implemented

**Outgoing:**
- [EXTENDS] → [[implicits]] — Resolver mechanism
- [RESOLVES] → [[constraint-types]] — Δ lookup for resolve constraints
- [COMPOSES_WITH] → [[pi-types]] — Implicit Pi triggers insertion

**Incoming:**
- [[application]] [USES] → — Implicit insertion
- [[implicit-environment]] [ENABLES] → — Provides Δ
- [[typeclass-emulation]] [USES] → — Instance lookup via Δ
- [[implicits-as-coeffects]] [REVISES] → — Coeffect-based approach
- [[deferred-constraint-solving]] [ENABLES] → — Full context for resolution
- [[bidirectional-checking-decision]] [COMPOSES_WITH] → — Mode switch triggers insertion
- [[agda-influence]] [INSPIRES] → — Instance resolution
- [[dunfield-krishnaswami]] [INFORMS] → — Subsumption in bidir
- [[implicit-resolution-solver]] [IMPLEMENTS] → — Solver-side mechanism

## Implicits as Coeffects
`implicits-as-coeffects` — tags: inference, effect, speculative

**Outgoing:**
- [REVISES] → [[implicit-resolution]] — Coeffect-based approach

**Incoming:**
- [[petricek-orchard]] [INSPIRES] → — Context-dependence calculus

## Implicit Arguments
`implicits` — tags: mechanism, type-system, elaboration, language

**Outgoing:**
- [USES] → [[meta-variables]] — Inserts metas at call sites for implicit params
- [RELIES_ON] → [[unification]] — Unification-driven resolution solves implicit metas

**Incoming:**
- [[generalization]] [PRODUCES] → — Generalization wraps terms in implicit lambdas
- [[implicit-resolution]] [EXTENDS] → — Resolver mechanism

## Injection
`injection` — tags: type-system, row-types, concept, mechanism, implemented

**Outgoing:**
- [INTRODUCES] → [[structural-records]] — Field extension
- [INTRODUCES] → [[variant-types]] — Tag injection

**Incoming:**
- [[projection]] [DUAL_OF] → — Elim vs intro for row-backed types
- [[row-rewriting]] [ENABLES] → — Row extension

## JS Codegen
`js-codegen` — tags: compiler, codegen, backend, implemented, incomplete

**Incoming:**
- [[yap]] [INCLUDES] → — JS backend
- [[mir-lowering]] [PRODUCES] → — MIR → JS
- [[ffi]] [TRANSLATES_TO] → — Curried JS functions

## Knot-tying (Recursive Evaluation)
`knot-tying` — tags: normalization, recursion, mechanism, implemented

**Outgoing:**
- [ENABLES] → [[generalization]] — Recursive let evaluation
- [ENABLES] → [[mu-type-unification]] — Recursive self-reference
- [INSTANTIATES] → [[nbe]] — Placeholder entry

## Koka (Influence)
`koka-influence` — tags: continuation, effect, research

**Outgoing:**
- [INSPIRES] → [[selective-cps]] — Evidence passing model
- [CONTRASTS_WITH] → [[shift-reset]] — Evidence passing vs direct capture

## Label Lookup
`label-lookup` — tags: elaboration, row-types, mechanism, implemented

**Outgoing:**
- [USES] → [[sigma-bindings]] — :label → sigma entry
- [RESOLVES] → [[sigma-bindings]] — Label references

## Lambda
`lambda` — tags: type-system, syntax, concept, mechanism, implemented

**Outgoing:**
- [INTRODUCES] → [[pi-types]] — Intro form for functions
- [DUAL_OF] → [[application]] — Intro/elim pair for Pi

**Incoming:**
- [[pi-types]] [GENERALIZES] → — Arrow → is non-dependent Pi
- [[pi-types]] [FORMS] → — Π is formation rule for functions
- [[loop-sugar]] [DESUGARS_TO] → — Tail-recursive functions
- [[ffi-saturation]] [PRESERVES] → — Calling convention via closures
- [[closure-conversion]] [ERASES] → — Flattens lexical scope

## Lean 4 (Influence)
`lean-4-influence` — tags: elaboration, normalization, compiler, research

**Outgoing:**
- [INSPIRES] → [[nbe]] — NbE architecture
- [INSPIRES] → [[meta-variables]] — Instantiation strategy
- [INSPIRES] → [[elaboration-monad]] — Pipeline discipline
- [INSPIRES] → [[zonking]] — Substitution application

## Level-to-Index Conversion
`level-to-index-conversion` — tags: normalization, elaboration, mechanism, implemented

**Outgoing:**
- [USES] → [[de-bruijn-indices]] — Target representation
- [USES] → [[de-bruijn-levels]] — Source representation

**Incoming:**
- [[quoting]] [USES] → — Core conversion

## Levels vs Indices (Decision)
`levels-vs-indices` — tags: normalization, elaboration, decision

**Outgoing:**
- [APPLIES_TO] → [[de-bruijn]] — Representation split
- [APPLIES_TO] → [[nbe]] — Levels for evaluation

## Liang et al. (String Theory)
`liang-strings` — tags: verification, strings, research, paper

**Outgoing:**
- [INFORMS] → [[string-theory]] — DPLL(T) string solver

## Liquid Haskell (Influence)
`liquid-haskell-influence` — tags: verification, type-system, research

**Outgoing:**
- [INSPIRES] → [[refinement-types]] — SMT automation
- [INSPIRES] → [[smt-translation]] — VC generation pipeline
- [INSPIRES] → [[vc-ir]] — Formula fragment

## Lists
`lists` — tags: type-system, row-types, concept, implemented

**Outgoing:**
- [ENCODES] → [[ffi]] — Indexed Num T defaultArray (foreign)

**Incoming:**
- [[dictionaries]] [MIRRORS] → — Same Indexed encoding, different index

## Logic Programming
`logic-programming` — tags: elaboration, research, speculative

## LoGRAM
`logram` — tags: lowering, rewriting, speculative

**Outgoing:**
- [EXTENDS] → [[gram]] — Speculative substrate

**Incoming:**
- [[egglog-influence]] [INSPIRES] → — Equality saturation

## Loop Sugar
`loop-sugar` — tags: syntax, sugar, deferred

**Outgoing:**
- [DESUGARS_TO] → [[lambda]] — Tail-recursive functions

## LSP
`lsp` — tags: tooling, planned

## Maranget (Pattern Compilation)
`maranget-paper` — tags: lowering, research, paper

**Outgoing:**
- [INFORMS] → [[pattern-matching-compilation]] — Decision-tree construction

## Match
`match` — tags: type-system, syntax, concept, mechanism, implemented

**Outgoing:**
- [ELIMINATES] → [[variant-types]] — Elim form for variants
- [LOWERS_TO] → [[pattern-matching-compilation]] — Decision trees
- [DUAL_OF] → [[tagged-values]] — Intro/elim pair for variants

**Incoming:**
- [[exhaustiveness-checking]] [EXTENDS] → — Safety gap
- [[pattern-matching-compilation]] [DISPATCHES_ON] → — Pattern shape

## McBride "I Got Plenty of Nuttin"
`mcbride-nuttin` — tags: elaboration, inference, research, paper

**Outgoing:**
- [INFORMS] → [[meta-variables]] — Contextual metavariables
- [INFORMS] → [[zonking]] — Postponed substitution

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
- [[holes]] [INSTANTIATES] → — Fresh meta per hole
- [[continuation-binders]] [USES] → — Skolem-like metas
- [[zonking]] [RELIES_ON] → — Applies subst to metas
- [[zonking]] [ZONKS] → — Resolves unknowns
- [[nondeterminism]] [INSTANTIATES] → — Solution combinations
- [[idris-2-influence]] [INSPIRES] → — Contextual metas
- [[agda-influence]] [INSPIRES] → — Pattern unification
- [[lean-4-influence]] [INSPIRES] → — Instantiation strategy
- [[mcbride-nuttin]] [INFORMS] → — Contextual metavariables
- [[flex-flex-unification]] [RESOLVES] → — Binds left to right
- [[flex-rigid-unification]] [RESOLVES] → — Binds to rigid
- [[row-unification-mechanism]] [INSTANTIATES] → — Fresh row metas
- [[substitution-system]] [ZONKS] → — Maps IDs to solutions
- [[sigma-bindings]] [INSTANTIATES] → — Fresh metas per field
- [[nondeterminism-multishot]] [INSTANTIATES] → — Solution combinations
- [[variable-evaluation-dispatch]] [RESOLVES] → — Skolems → zonker → neutral
- [[src-to-eb-transformation]] [INSTANTIATES] → — Holes, implicit args
- [[hindley-milner]] [INFORMS] → — Unification-based inference

## Milestone 1: IR Boundary
`milestone-1-ir-boundary` — tags: verification, milestone, planned

**Outgoing:**
- [PRODUCES] → [[vc-ir]] — First deliverable
- [PRODUCES] → [[translation-boundary-vc]] — Translation tools
- [FOLLOWS] → [[z3-replacement-decision]] — First step

**Incoming:**
- [[milestone-2-euf-quant-lia]] [FOLLOWS] → — After IR

## Milestone 2: EUF + Quantifiers + LIA
`milestone-2-euf-quant-lia` — tags: verification, milestone, planned

**Outgoing:**
- [PRODUCES] → [[cdcl-t-solver]] — Core solver
- [PRODUCES] → [[euf-theory]] — EUF module
- [PRODUCES] → [[arithmetic-theory]] — Arithmetic module
- [FOLLOWS] → [[milestone-1-ir-boundary]] — After IR

**Incoming:**
- [[milestone-3-strings]] [FOLLOWS] → — After core

## Milestone 3: String Theory
`milestone-3-strings` — tags: verification, milestone, planned

**Outgoing:**
- [PRODUCES] → [[string-theory]] — String module
- [FOLLOWS] → [[milestone-2-euf-quant-lia]] — After core

**Incoming:**
- [[milestone-4-rows]] [FOLLOWS] → — After strings

## Milestone 4: Row Theory
`milestone-4-rows` — tags: verification, milestone, planned

**Outgoing:**
- [PRODUCES] → [[row-theory]] — Row module
- [FOLLOWS] → [[milestone-3-strings]] — After strings

**Incoming:**
- [[milestone-5-explanations]] [FOLLOWS] → — After rows

## Milestone 5: Explanations and Models
`milestone-5-explanations` — tags: verification, milestone, planned

**Outgoing:**
- [FOLLOWS] → [[milestone-4-rows]] — After rows

## MIR Lowering
`mir-lowering` — tags: compiler, lowering, implemented

**Outgoing:**
- [CONSUMES] → [[v1-elaboration-pipeline]] — EB.Term input
- [PRODUCES] → [[js-codegen]] — MIR → JS
- [PRODUCES] → [[c-codegen]] — MIR → C
- [PRODUCES] → [[erlang-codegen]] — MIR → Erlang
- [TRANSLATES_TO] → [[eb-term]] — EB.Term → SSA blocks
- [ERASES] → [[pi-types]] — Types not preserved in MIR
- [TRAVERSES] → [[eb-term]] — Pattern-match walk

**Incoming:**
- [[yap]] [INCLUDES] → — Lowering component
- [[compile-orchestration]] [DELEGATES_TO] → — Lowering step
- [[shift-reset-mir-lowering]] [LOWERS_TO] → — State machines
- [[ffi]] [RELIES_ON] → — Saturation
- [[ffi-saturation]] [RELIES_ON] → — Lowering step
- [[gram]] [SUPERSEDES] → — As IR approach
- [[closure-conversion]] [TRANSLATES_TO] → — Env + function pointer
- [[defunctionalization]] [SPECIALIZES] → — GPU/HVM targets
- [[pattern-matching-compilation]] [LOWERS_TO] → — Decision trees → MIR
- [[nanopass-influence]] [CONTRASTS_WITH] → — Many vs monolithic
- [[thorin-mimir-influence]] [CONTRASTS_WITH] → — CPS vs direct
- [[repl]] [USES] → — Optional MIR mode

## MIR Retrospective
`mir-retrospective` — tags: lowering, decision

**Outgoing:**
- [INFORMS] → [[gram]] — Lessons learned
- [MOTIVATES] → [[gram]] — Why GRAM exists

**Incoming:**
- [[thorin-mimir-influence]] [INSPIRES] → — Calls = jumps

## Missing Spec: Let-Polymorphism
`missing-spec-let-polymorphism` — tags: inference, type-system, incomplete

**Outgoing:**
- [IMPLEMENTS] → [[generalization]] — No spec formalization

## Missing Spec: Recursive Types (Mu)
`missing-spec-recursive-types` — tags: type-system, recursion, incomplete

**Outgoing:**
- [IMPLEMENTS] → [[mu-type-unification]] — No spec formalization

## Missing Spec: Shift/Reset Typing
`missing-spec-shift-reset` — tags: continuation, type-system, incomplete

**Outgoing:**
- [IMPLEMENTS] → [[shift-reset]] — Impl ahead of spec

## Missing Spec: Sigma Types
`missing-spec-sigma-types` — tags: type-system, dependent, row-types, incomplete

**Outgoing:**
- [IMPLEMENTS] → [[sigma-types]] — No spec formalization

## MLIR (Influence)
`mlir-influence` — tags: lowering, compiler, research

**Outgoing:**
- [INSPIRES] → [[gram]] — Open vocabulary / dialects
- [INSPIRES] → [[structural-vs-representational-passes]] — Pass scheduling

## Modalities (Quantities)
`modalities` — tags: type-system, modality, concept, syntax, incomplete

**Outgoing:**
- [APPLIES_TO] → [[pi-types]] — Quantity on domain
- [COMPOSES_WITH] → [[refinement-types]] — Modal + refined
- [COERCES_TO] → [[pi-types]] — Modal stripping during inference

**Incoming:**
- [[modality-enforcement]] [FOLLOWS] → — Requires modality definitions
- [[modality-enforcement]] [ADDRESSES] → — Enforcement gap
- [[modality-polymorphism]] [EXTENDS] → — Polymorphism over modalities
- [[refinement-inference]] [REVISES] → — Strip → template revision
- [[effects-as-modality]] [EXTENDS] → — Effects tracked as modalities
- [[ghc-influence]] [INSPIRES] → — Levity polymorphism precedent
- [[idris-1-qtt-paper]] [INSPIRES] → — Quantity tracking
- [[modality-drift]] [ADDRESSES] → — Annotation vs type former

## Modality Drift: Annotation vs Type Former
`modality-drift` — tags: type-system, modality, elaboration, decision, drift

**Outgoing:**
- [ADDRESSES] → [[modalities]] — Annotation vs type former
- [MOTIVATES] → [[modality-enforcement]] — Gap needs fixing

## Modality Enforcement
`modality-enforcement` — tags: type-system, modality, verification, planned

**Outgoing:**
- [FOLLOWS] → [[modalities]] — Requires modality definitions
- [ADDRESSES] → [[modalities]] — Enforcement gap

**Incoming:**
- [[modality-polymorphism]] [REQUIRES] → — Depends on enforcement
- [[modality-drift]] [MOTIVATES] → — Gap needs fixing

## Modality Polymorphism
`modality-polymorphism` — tags: type-system, modality, inference, planned

**Outgoing:**
- [EXTENDS] → [[modalities]] — Polymorphism over modalities
- [REQUIRES] → [[modality-enforcement]] — Depends on enforcement

## Module System
`module-system` — tags: compiler, syntax, inference, implemented, incomplete

**Outgoing:**
- [RELIES_ON] → [[v1-elaboration-pipeline]] — Not yet wired to v2
- [PRODUCES] → [[elaboration-context]] — Interface tables

**Incoming:**
- [[yap]] [INCLUDES] → — Module component
- [[mutual-recursion]] [EXTENDS] → — Multi-pass elaboration
- [[block-level-using-gap]] [DETECTS] → — Gap in implementation

## Monad Split
`monad-split` — tags: elaboration, mechanism, planned

**Outgoing:**
- [REVISES] → [[elaboration-monad]] — Addresses coupling

## Mu-type Unification (Equirecursive)
`mu-type-unification` — tags: unification, recursion, type-system, mechanism, implemented

**Outgoing:**
- [SPECIALIZES] → [[unification-algorithm]] — Mu case
- [IMPLEMENTS] → [[equirecursive-types]] — Current approach
- [REWRITES] → [[mu-types]] — Unfolds and recurses

**Incoming:**
- [[equirecursive-types]] [REVISES] → — Toward full bisimulation
- [[missing-spec-recursive-types]] [IMPLEMENTS] → — No spec formalization
- [[knot-tying]] [ENABLES] → — Recursive self-reference

## Mu-types (Equi-recursive)
`mu-types` — tags: concept, type-system, elaboration, normalization, language

**Incoming:**
- [[unification]] [USES] → — Unfolds mu during structural comparison
- [[equirecursive-types]] [EXTENDS] → — Beyond simple unfolding
- [[mu-type-unification]] [REWRITES] → — Unfolds and recurses
- [[occurs-check]] [DETECTS] → — Cyclic types

## Multishot Serialization
`multishot-serialization` — tags: continuation, lowering, problem

**Outgoing:**
- [CONSTRAINS] → [[shift-reset-mir-lowering]] — Replay challenge

**Incoming:**
- [[selective-cps]] [ADDRESSES] → — Evidence passing alternative

## Mutual Recursion (Modules)
`mutual-recursion` — tags: compiler, inference, planned

**Outgoing:**
- [EXTENDS] → [[module-system]] — Multi-pass elaboration

## Nanopass (Influence)
`nanopass-influence` — tags: lowering, compiler, research

**Outgoing:**
- [INSPIRES] → [[gram]] — Composable passes
- [CONTRASTS_WITH] → [[mir-lowering]] — Many vs monolithic

## Native λ (HVM)
`native-lambda-hvm` — tags: lowering, backend, speculative

**Outgoing:**
- [REJECTS] → [[closure-conversion]] — HVM needs raw λ
- [PRESERVES] → [[nbe]] — Optimal reduction

**Incoming:**
- [[closure-conversion]] [CONTRASTS_WITH] → — Different targets

## Normalisation by Evaluation (NbE)
`nbe` — tags: concept, type-system, mechanism, normalization

**Outgoing:**
- [USES] → [[closures]] — Lazy substitution
- [USES] → [[neutrals]] — Stuck computations
- [NORMALIZES_TO] → [[nf-value]] — Evaluation direction
- [QUOTES_TO] → [[eb-term]] — Readback direction
- [PRESERVES] → [[dependent-types]] — Beta-eta equivalence

**Incoming:**
- [[yap]] [USES] → — Definitional equality via normalization
- [[elaboration]] [USES] → — Evaluate to values, compare structurally
- [[gram]] [PRESERVES] → — Semantic equivalence per pass
- [[native-lambda-hvm]] [PRESERVES] → — Optimal reduction
- [[levels-vs-indices]] [APPLIES_TO] → — Levels for evaluation
- [[termination-checking]] [DETECTS] → — Non-termination
- [[agda-influence]] [INSPIRES] → — Evaluation-based normalization
- [[lean-4-influence]] [INSPIRES] → — NbE architecture
- [[abel-pientka]] [INFORMS] → — Higher-order pattern unification
- [[trampoline-evaluator]] [IMPLEMENTS] → — Stack-safe evaluation
- [[trampoline-evaluator]] [ADDRESSES] → — Stack overflow prevention
- [[trampoline-evaluator]] [WRAPS] → — Heap-allocated frames
- [[evaluation-step-limit]] [DETECTS] → — Infinite loops
- [[variable-evaluation-dispatch]] [IMPLEMENTS] → — (Var) at NF level
- [[application-evaluation]] [IMPLEMENTS] → — (App) at NF level
- [[knot-tying]] [INSTANTIATES] → — Placeholder entry
- [[non-linear-arithmetic]] [COMPOSES_WITH] → — Constant-folding removes ground arith
- [[neutrals]] [ENABLES] → — Stuck terms represent unknowns

## Nearley Parser
`nearley-parser` — tags: compiler, syntax, implemented, deprecated

**Outgoing:**
- [PRODUCES] → [[elaboration]] — Src.Term
- [TRANSLATES_TO] → [[src-term]] — Token stream → AST

**Incoming:**
- [[yap]] [INCLUDES] → — Parser component
- [[tree-sitter-parser]] [SUPERSEDES] → — Incremental replaces ambiguous CFG

## Nelson & Oppen
`nelson-oppen` — tags: verification, research, paper

**Outgoing:**
- [INFORMS] → [[theory-plugin-interface]] — Cooperating procedures

## Neutral Terms
`neutrals` — tags: mechanism, concept, normalization, type-system

**Outgoing:**
- [CONTRASTS_WITH] → [[closures]] — Closures reduce; neutrals are stuck — dual roles in NbE
- [WRAPS] → [[nf-value]] — Unsolved computations wrapped
- [ENABLES] → [[nbe]] — Stuck terms represent unknowns

**Incoming:**
- [[meta-variables]] [PRODUCES] → — Unsolved metas produce neutral terms
- [[nbe]] [USES] → — Stuck computations

## NF.display
`nf-display` — tags: display, normalization, mechanism, implemented

**Outgoing:**
- [USES] → [[quoting]] — NF → EB → render
- [USES] → [[zonking]] — Resolves metas before display

**Incoming:**
- [[error-causes]] [USES] → — Zonked NF in messages
- [[pretty-printing]] [USES] → — NF rendering

## NF.Value (Normal Form)
`nf-value` — tags: normalization, ast, concept, implemented

**Outgoing:**
- [QUOTES_TO] → [[eb-term]] — Via quoting

**Incoming:**
- [[v1-elaboration-pipeline]] [NORMALIZES_TO] → — Types → normal forms
- [[cbv-evaluation]] [NORMALIZES_TO] → — Closed terms fully reduce
- [[types-as-terms]] [NORMALIZES_TO] → — Types evaluate like terms
- [[branded-types]] [CONSTRAINS] → — Prevents mixing
- [[unification-algorithm]] [DISPATCHES_ON] → — Pattern match on pairs
- [[unification-algorithm]] [TRAVERSES] → — Recursive walk
- [[occurs-check]] [TRAVERSES] → — Walks checking meta presence
- [[quoting]] [TRAVERSES] → — Recursive descent
- [[eb-term]] [NORMALIZES_TO] → — Via evaluation
- [[eb-term]] [CONTRASTS_WITH] → — Syntax vs semantic domain
- [[translation-boundary-vc]] [CONSUMES] → — NF.Value input
- [[neutrals]] [WRAPS] → — Unsolved computations wrapped
- [[nbe]] [NORMALIZES_TO] → — Evaluation direction

## Nieuwenhuis & Oliveras "DPLL(T)"
`nieuwenhuis-oliveras` — tags: verification, sat, research, paper

**Outgoing:**
- [INFORMS] → [[cdcl-t-solver]] — DPLL(T) architecture

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
- [CONTRASTS_WITH] → [[typeclass-emulation]] — Class hierarchy vs structural

**Incoming:**
- [[structural-typing]] [CONTRASTS_WITH] → — Name-based vs structure-based identity
- [[typeclass-emulation]] [EMULATES] → — Structural alternative to classes
- [[typeclass-emulation]] [CONTRASTS_WITH] → — No class hierarchy

## Non-linear Arithmetic (Open)
`non-linear-arithmetic` — tags: verification, arithmetic, decision, speculative

**Outgoing:**
- [CONSTRAINS] → [[arithmetic-theory]] — Linearizable subset first
- [COMPOSES_WITH] → [[nbe]] — Constant-folding removes ground arith

## Nondeterminism (Multishot Replay)
`nondeterminism-multishot` — tags: continuation, unification, mechanism, implemented

**Outgoing:**
- [ENABLES] → [[shift-reset]] — Multishot continuations
- [USES] → [[solver-dispatch]] — Runs after solving
- [INSTANTIATES] → [[meta-variables]] — Solution combinations

## Nondeterminism (Solver)
`nondeterminism` — tags: continuation, unification, mechanism, implemented

**Outgoing:**
- [ENABLES] → [[shift-reset]] — Multishot continuations
- [INSTANTIATES] → [[meta-variables]] — Solution combinations

**Incoming:**
- [[continuation-binders]] [RELIES_ON] → — Multishot semantics
- [[solver]] [USES] → — Multishot replay

## Num Sort Semantics (Open)
`num-sort-semantics` — tags: verification, arithmetic, decision, speculative

**Outgoing:**
- [APPLIES_TO] → [[arithmetic-theory]] — Int vs Real

## Occurs Check
`occurs-check` — tags: unification, mechanism, implemented

**Outgoing:**
- [CONSTRAINS] → [[unification-algorithm]] — Prevents cycles
- [TRAVERSES] → [[nf-value]] — Walks checking meta presence
- [DETECTS] → [[mu-types]] — Cyclic types

**Incoming:**
- [[unification-algorithm]] [USES] → — Prevents infinite types

## Parser Processors
`parser-processors` — tags: syntax, mechanism, implemented

**Outgoing:**
- [PRODUCES] → [[src-term]] — Grammar → AST

**Incoming:**
- [[test-utility]] [USES] → — Parses input
- [[repl]] [USES] → — Parses each input

## Passes in Yap
`passes-in-yap` — tags: lowering, rewriting, speculative

**Outgoing:**
- [EXTENDS] → [[gram]] — Self-hosting passes

**Incoming:**
- [[stratego-influence]] [INSPIRES] → — Rewrite rule API

## Pattern Matching Compilation
`pattern-matching-compilation` — tags: lowering, mechanism, implemented

**Outgoing:**
- [LOWERS_TO] → [[mir-lowering]] — Decision trees → MIR
- [DISPATCHES_ON] → [[match]] — Pattern shape

**Incoming:**
- [[match]] [LOWERS_TO] → — Decision trees
- [[maranget-paper]] [INFORMS] → — Decision-tree construction

## Petricek & Orchard Coeffects
`petricek-orchard` — tags: effect, modality, research, paper

**Outgoing:**
- [INSPIRES] → [[effects-as-modality]] — Coeffect framework
- [INSPIRES] → [[implicits-as-coeffects]] — Context-dependence calculus

## Pi Types
`pi-types` — tags: type-system, dependent, concept, syntax, implemented

**Outgoing:**
- [EXTENDS] → [[dependent-types]] — Universal quantification with dependency
- [GENERALIZES] → [[lambda]] — Arrow → is non-dependent Pi
- [FORMS] → [[lambda]] — Π is formation rule for functions
- [DUAL_OF] → [[sigma-types]] — Universal vs existential
- [COMPOSES_WITH] → [[sigma-types]] — Dependent function returning dependent record
- [COMPOSES_WITH] → [[refinement-types]] — Refined domains/codomains

**Incoming:**
- [[mir-lowering]] [ERASES] → — Types not preserved in MIR
- [[refinement-types]] [SUBSUMES] → — Refined T subtype of T
- [[refinement-types]] [COERCES_TO] → — Forget rule strips predicate
- [[modalities]] [APPLIES_TO] → — Quantity on domain
- [[modalities]] [COERCES_TO] → — Modal stripping during inference
- [[lambda]] [INTRODUCES] → — Intro form for functions
- [[application]] [ELIMINATES] → — Elim form for functions
- [[type-erasure]] [ERASES] → — Removes type information
- [[annotations]] [COERCES_TO] → — Term validated against annotation
- [[shift-reset]] [COMPOSES_WITH] → — k has Pi type
- [[answer-type-polymorphism]] [GENERALIZES] → — Monomorphic → polymorphic answer
- [[implicit-resolution]] [COMPOSES_WITH] → — Implicit Pi triggers insertion
- [[smt-translation]] [ERASES] → — Functions → uninterpreted
- [[dynamic-reflection]] [COERCES_TO] → — Safe cast via proof
- [[typing-rules]] [FORMS] → — Type-theoretic foundation
- [[system-f]] [INFORMS] → — Parametric polymorphism foundation

## Pipeline Explorer
`pipeline-explorer` — tags: tooling, infrastructure, implemented

**Outgoing:**
- [REPORTS] → [[yap]] — Visualizes pipeline stages

## Pretty Printing (EB.Display)
`pretty-printing` — tags: display, elaboration, mechanism, implemented

**Outgoing:**
- [USES] → [[nf-display]] — NF rendering
- [REPORTS] → [[elaboration]] — Human-readable output

**Incoming:**
- [[provenance-display]] [USES] → — Term display
- [[snapshot-testing]] [SNAPSHOTS] → — Inline snapshots

## Primitive Signature
`primitive-signature` — tags: runtime, elaboration, mechanism, implemented

**Outgoing:**
- [USES] → [[cbv-evaluation]] — δ-rules on literals

## Projection
`projection` — tags: type-system, row-types, concept, mechanism, implemented

**Outgoing:**
- [ELIMINATES] → [[structural-records]] — Field access
- [ELIMINATES] → [[sigma-types]] — Dependent field access
- [DUAL_OF] → [[injection]] — Elim vs intro for row-backed types

**Incoming:**
- [[row-rewriting]] [ENABLES] → — Label lookup for field access

## Provenance Display
`provenance-display` — tags: tracing, error-handling, mechanism, implemented

**Outgoing:**
- [USES] → [[provenance-system]] — Stack rendering
- [USES] → [[pretty-printing]] — Term display
- [REPORTS] → [[error-causes]] — Error paths

## Provenance System
`provenance-system` — tags: tracing, elaboration, mechanism, implemented

**Outgoing:**
- [ENABLES] → [[error-propagation]] — Meaningful errors need context
- [THREADS_THROUGH] → [[elaboration-context]] — ctx.trace stack

**Incoming:**
- [[error-propagation]] [USES] → — Carries trace
- [[v2-track]] [IMPLEMENTS] → — Track function
- [[provenance-display]] [USES] → — Stack rendering

## QTT Usage Collection
`qtt-usage-collection` — tags: elaboration, modality, deprecated

**Incoming:**
- [[usages-deferred]] [DEPRECATES] → — Move to verification

## Quantifier Engine
`quantifier-engine` — tags: verification, quantifiers, mechanism, planned

**Outgoing:**
- [IMPLEMENTS] → [[theory-plugin-interface]] — Instantiation
- [DELEGATES_TO] → [[euf-theory]] — E-matching

**Incoming:**
- [[euf-theory]] [ENABLES] → — Trigger matching
- [[higher-order-in-formulas]] [CONSTRAINS] → — No HO quantification
- [[ge-de-moura-quantifiers]] [INFORMS] → — Complete instantiation

## Quantifier Preparation
`quantifier-preparation` — tags: verification, quantifiers, planned

**Outgoing:**
- [FOLLOWS] → [[vc-normalization]] — After normalization
- [REWRITES] → [[vc-ir]] — Prenex + skolemize + triggers

**Incoming:**
- [[boolean-lowering-cnf]] [FOLLOWS] → — After quantifier prep

## Quoting (Readback)
`quoting` — tags: normalization, mechanism, implemented

**Outgoing:**
- [USES] → [[level-to-index-conversion]] — Core conversion
- [USES] → [[closures]] — Apply closure for readback
- [QUOTES_TO] → [[eb-term]] — NF.Value → EB.Term
- [TRAVERSES] → [[nf-value]] — Recursive descent

**Incoming:**
- [[nf-display]] [USES] → — NF → EB → render

## Records vs Indexed Separation
`records-indexed-separation` — tags: syntax, row-types, planned

## Refinement Inference
`refinement-inference` — tags: type-system, modality, verification, inference, speculative

**Outgoing:**
- [EXTENDS] → [[refinement-types]] — Inferred refinements
- [REVISES] → [[modalities]] — Strip → template revision

## Refinement Types
`refinement-types` — tags: type-system, verification, concept, modality, implemented

**Outgoing:**
- [RELIES_ON] → [[verification-pipeline]] — Z3 discharges VCs
- [COMPOSES_WITH] → [[sigma-types]] — :fst in predicates
- [SUBSUMES] → [[pi-types]] — Refined T subtype of T
- [COERCES_TO] → [[pi-types]] — Forget rule strips predicate

**Incoming:**
- [[pi-types]] [COMPOSES_WITH] → — Refined domains/codomains
- [[modalities]] [COMPOSES_WITH] → — Modal + refined
- [[refinement-inference]] [EXTENDS] → — Inferred refinements
- [[liquid-haskell-influence]] [INSPIRES] → — SMT automation

## REPL
`repl` — tags: cli, infrastructure, implemented

**Outgoing:**
- [USES] → [[parser-processors]] — Parses each input
- [USES] → [[v1-elaboration-pipeline]] — Elaborates
- [USES] → [[mir-lowering]] — Optional MIR mode
- [THREADS_THROUGH] → [[elaboration-context]] — Persistent ctx

## Required Formula Forms
`required-formula-forms` — tags: verification, concept, implemented

**Outgoing:**
- [CONSTRAINS] → [[vc-ir]] — IR must express all forms

## Required Theory Support
`required-theory-support` — tags: verification, concept, planned

**Outgoing:**
- [CONSTRAINS] → [[theory-plugin-interface]] — All theories needed

## Reynolds et al. (String Scaling)
`reynolds-strings` — tags: verification, strings, research, paper

**Outgoing:**
- [INFORMS] → [[string-theory]] — Context-dependent simplification

## Row Data Structure
`row-data-structure` — tags: row-types, concept, implemented

**Outgoing:**
- [ENABLES] → [[row-rewriting]] — Rewrite over rows
- [ENABLES] → [[row-polymorphism]] — Shared data type
- [FORMS] → [[structural-records]] — Basis of row-backed types

**Incoming:**
- [[row-rewriting]] [REWRITES] → — Moves label to head
- [[row-rewriting]] [TRAVERSES] → — Recursive tail descent

## Row Polymorphism
`row-polymorphism` — tags: concept, type-system, mechanism, row-types

**Outgoing:**
- [EXTENDS] → [[hindley-milner]] — Parametric extension via row variables
- [DISTINGUISHES] → [[structural-subtyping]] — Not subtyping: parametric, not coercive

**Incoming:**
- [[yap]] [USES] → — Structural flexibility via row variables
- [[unification]] [EXTENDS] → — Row rewriting extends Robinson unification for row types
- [[sigma-types]] [USES] → — Row-backed dependent records
- [[variant-types]] [USES] → — Row-backed unions
- [[structural-records]] [USES] → — Open-tail row structure
- [[rows-universal-substrate]] [MOTIVATES] → — All data is row-based
- [[structural-row-based-types]] [MOTIVATES] → — All composite = rows
- [[elm-ocaml-influence]] [INSPIRES] → — Row types approach
- [[row-data-structure]] [ENABLES] → — Shared data type
- [[structural-typing]] [ENABLES] → — Structure-based identity
- [[structural-subtyping]] [CONTRASTS_WITH] → — Subtyping vs parametric

## Row Rewriting (Label Lookup)
`row-rewriting` — tags: row-types, unification, mechanism, implemented

**Outgoing:**
- [ENABLES] → [[projection]] — Label lookup for field access
- [ENABLES] → [[injection]] — Row extension
- [ENABLES] → [[row-unification-mechanism]] — Restructuring for unification
- [REWRITES] → [[row-data-structure]] — Moves label to head
- [TRAVERSES] → [[row-data-structure]] — Recursive tail descent

**Incoming:**
- [[row-unification-mechanism]] [DELEGATES_TO] → — Label lookup
- [[row-data-structure]] [ENABLES] → — Rewrite over rows

## Row Theory
`row-theory` — tags: verification, row-types, mechanism, planned

**Outgoing:**
- [IMPLEMENTS] → [[theory-plugin-interface]] — Row containment
- [MIRRORS] → [[row-unification-mechanism]] — Same label decomposition
- [PRESERVES] → [[verification-pipeline]] — subtype.contains() semantics

**Incoming:**
- [[milestone-4-rows]] [PRODUCES] → — Row module

## Row Unification
`row-unification-mechanism` — tags: unification, row-types, mechanism, implemented

**Outgoing:**
- [EXTENDS] → [[unification-algorithm]] — Row extension
- [DELEGATES_TO] → [[row-rewriting]] — Label lookup
- [INSTANTIATES] → [[meta-variables]] — Fresh row metas

**Incoming:**
- [[unification-algorithm]] [USES] → — Row case delegation
- [[row-rewriting]] [ENABLES] → — Restructuring for unification
- [[row-theory]] [MIRRORS] → — Same label decomposition

## Row Unification
`row-unification` — tags: mechanism, type-system, row-types, elaboration

**Incoming:**
- [[yap]] [USES] → — Row variable unification in constraint solving
- [[constraint-solving]] [USES] → — Row variables unified alongside type variables

## Rows as Universal Substrate
`rows-universal-substrate` — tags: type-system, row-types, principle, decision

**Outgoing:**
- [MOTIVATES] → [[row-polymorphism]] — All data is row-based
- [MOTIVATES] → [[structural-records]] — Uniform substrate

**Incoming:**
- [[dedicated-row-constructors]] [ADDRESSES] → — Cognitive overhead

## Saturation (Lowering)
`saturation` — tags: lowering, ffi, mechanism, implemented

**Outgoing:**
- [REWRITES] → [[application]] — App chains → primop nodes

## Selective CPS
`selective-cps` — tags: continuation, lowering, speculative

**Outgoing:**
- [ADDRESSES] → [[multishot-serialization]] — Evidence passing alternative
- [CONTRASTS_WITH] → [[shift-reset-mir-lowering]] — Closure vs state machine

**Incoming:**
- [[koka-influence]] [INSPIRES] → — Evidence passing model

## Session: Lowering branch split from lowering-mir-v1
`session-lowering-branch-split` — tags: mir, infrastructure, code

**Outgoing:**
- [ADDRESSES] → [[closures]] — Closure conversion and shared bundle primitive
- [ADDRESSES] → [[elaboration]] — FFI arity computation piped from elaboration to lowering

## Shift/Reset MIR Lowering
`shift-reset-mir-lowering` — tags: continuation, lowering, mechanism, implemented

**Outgoing:**
- [LOWERS_TO] → [[mir-lowering]] — State machines
- [IMPLEMENTS] → [[shift-reset]] — Runtime story

**Incoming:**
- [[multishot-serialization]] [CONSTRAINS] → — Replay challenge
- [[selective-cps]] [CONTRASTS_WITH] → — Closure vs state machine

## Shift/Reset
`shift-reset` — tags: continuation, type-system, mechanism, implemented

**Outgoing:**
- [USES] → [[answer-type-polymorphism]] — k has polymorphic answer type
- [USES] → [[continuation-binders]] — Resume encoded via metas
- [INTRODUCES] → [[continuation-binders]] — Shift captures k
- [COMPOSES_WITH] → [[pi-types]] — k has Pi type

**Incoming:**
- [[shift-reset-mir-lowering]] [IMPLEMENTS] → — Runtime story
- [[koka-influence]] [CONTRASTS_WITH] → — Evidence passing vs direct capture
- [[effects-as-modality]] [EXTENDS] → — Effect system over continuations
- [[danvy-filinski]] [INFORMS] → — Foundational theory
- [[nondeterminism]] [ENABLES] → — Multishot continuations
- [[missing-spec-shift-reset]] [IMPLEMENTS] → — Impl ahead of spec
- [[nondeterminism-multishot]] [ENABLES] → — Multishot continuations

## Sigma Bindings (:fieldName)
`sigma-bindings` — tags: elaboration, row-types, dependent, mechanism, implemented

**Outgoing:**
- [IMPLEMENTS] → [[dependent-types]] — Field-to-field dependency
- [APPLIES_TO] → [[structural-records]] — Record field references
- [APPLIES_TO] → [[sigma-types]] — Σ field dependency
- [INSTANTIATES] → [[meta-variables]] — Fresh metas per field
- [THREADS_THROUGH] → [[elaboration-context]] — ctx.sigma map

**Incoming:**
- [[label-lookup]] [USES] → — :label → sigma entry
- [[label-lookup]] [RESOLVES] → — Label references

## Sigma Types
`sigma-types` — tags: type-system, dependent, row-types, concept, implemented

**Outgoing:**
- [EXTENDS] → [[dependent-types]] — Existential with row dependency
- [USES] → [[row-polymorphism]] — Row-backed dependent records
- [FORMS] → [[structural-records]] — Σ forms dependent record types

**Incoming:**
- [[pi-types]] [DUAL_OF] → — Universal vs existential
- [[pi-types]] [COMPOSES_WITH] → — Dependent function returning dependent record
- [[refinement-types]] [COMPOSES_WITH] → — :fst in predicates
- [[projection]] [ELIMINATES] → — Dependent field access
- [[missing-spec-sigma-types]] [IMPLEMENTS] → — No spec formalization
- [[sigma-bindings]] [APPLIES_TO] → — Σ field dependency

## SMT Translation
`smt-translation` — tags: verification, mechanism, implemented

**Outgoing:**
- [IMPLEMENTS] → [[verification-pipeline]] — Z3 translation
- [TRANSLATES_TO] → [[verification-pipeline]] — Z3 sorts/assertions
- [TRAVERSES] → [[eb-term]] — Walks producing Z3
- [ERASES] → [[pi-types]] — Functions → uninterpreted

**Incoming:**
- [[verification-pipeline]] [TRANSLATES_TO] → — Types → Z3 assertions
- [[cas-instead-of-smt]] [CONTRASTS_WITH] → — CAS alternative
- [[liquid-haskell-influence]] [INSPIRES] → — VC generation pipeline
- [[vc-ir]] [SUPERSEDES] → — Backend-neutral replaces Z3
- [[translation-boundary-vc]] [SUPERSEDES] → — New translation tools
- [[z3-replacement-decision]] [SUPERSEDES] → — Z3 dependency removed

## Snapshot Testing Pattern
`snapshot-testing` — tags: testing, infrastructure, concept, implemented

**Outgoing:**
- [USES] → [[test-utility]] — elaborateFrom
- [SNAPSHOTS] → [[pretty-printing]] — Inline snapshots
- [PRESERVES] → [[test-utility]] — Determinism via resets

## Solver Dispatch
`solver-dispatch` — tags: unification, elaboration, mechanism, implemented

**Outgoing:**
- [USES] → [[unification-algorithm]] — Assign → unify
- [USES] → [[implicit-resolution-solver]] — Resolve → Δ lookup
- [RESOLVES] → [[constraint-types]] — Processes queue

**Incoming:**
- [[deferred-constraint-solving]] [RELIES_ON] → — Batch processing at let boundaries
- [[constraint-types]] [ENABLES] → — Typed constraints
- [[constraint-types]] [DISPATCHES_ON] → — Assign vs resolve
- [[nondeterminism-multishot]] [USES] → — Runs after solving
- [[test-utility]] [USES] → — Solve constraints

## Solver Module Layout
`solver-module-layout` — tags: verification, infrastructure, planned

## Solver
`solver` — tags: elaboration, unification, mechanism, implemented

**Outgoing:**
- [USES] → [[unification]] — Assign constraints → unify
- [USES] → [[nondeterminism]] — Multishot replay
- [RESOLVES] → [[constraint-types]] — Processes queue
- [DELEGATES_TO] → [[unification-algorithm]] — Assign constraints
- [DELEGATES_TO] → [[implicit-resolution-solver]] — Resolve constraints

**Incoming:**
- [[zonking]] [FOLLOWS] → — After solving
- [[idris-2-influence]] [INSPIRES] → — Unification approach

## Spineful Applications
`spineful-applications` — tags: syntax, elaboration, planned

**Outgoing:**
- [REVISES] → [[application]] — Head + spine

## Src.Term (Source AST)
`src-term` — tags: syntax, ast, concept, implemented

**Outgoing:**
- [PRODUCES] → [[eb-term]] — Via elaboration
- [CONTRASTS_WITH] → [[eb-term]] — Surface vs core

**Incoming:**
- [[nearley-parser]] [TRANSLATES_TO] → — Token stream → AST
- [[v1-elaboration-pipeline]] [DISPATCHES_ON] → — Source shape drives dispatch
- [[parser-processors]] [PRODUCES] → — Grammar → AST
- [[src-to-eb-transformation]] [CONSUMES] → — Source input

## Src → EB Transformation
`src-to-eb-transformation` — tags: elaboration, syntax, mechanism, implemented

**Outgoing:**
- [CONSUMES] → [[src-term]] — Source input
- [PRODUCES] → [[eb-term]] — Elaborated output
- [INSTANTIATES] → [[meta-variables]] — Holes, implicit args

## Stratego/XT (Influence)
`stratego-influence` — tags: rewriting, research

**Outgoing:**
- [INSPIRES] → [[dpo-rewriting]] — Strategy combinators
- [INSPIRES] → [[passes-in-yap]] — Rewrite rule API

## Strict vs Lazy
`strict-vs-lazy` — tags: runtime, decision, speculative

**Outgoing:**
- [CONTRASTS_WITH] → [[cbv-evaluation]] — Lazy alternative

## String Theory
`string-theory` — tags: verification, strings, mechanism, planned

**Outgoing:**
- [IMPLEMENTS] → [[theory-plugin-interface]] — Word equations
- [DELEGATES_TO] → [[arithmetic-theory]] — Length lemmas

**Incoming:**
- [[arithmetic-theory]] [COMPOSES_WITH] → — Length coupling
- [[milestone-3-strings]] [PRODUCES] → — String module
- [[liang-strings]] [INFORMS] → — DPLL(T) string solver
- [[reynolds-strings]] [INFORMS] → — Context-dependent simplification

## Structural Records
`structural-records` — tags: type-system, row-types, concept, implemented

**Outgoing:**
- [USES] → [[row-polymorphism]] — Open-tail row structure

**Incoming:**
- [[sigma-types]] [FORMS] → — Σ forms dependent record types
- [[variant-types]] [DUAL_OF] → — Sum vs product over rows
- [[variant-types]] [MIRRORS] → — Row-backed dual
- [[tuples]] [DESUGARS_TO] → — Positional labels
- [[tuples]] [SPECIALIZES] → — Numeric labels only
- [[projection]] [ELIMINATES] → — Field access
- [[injection]] [INTRODUCES] → — Field extension
- [[rows-universal-substrate]] [MOTIVATES] → — Uniform substrate
- [[dedicated-row-constructors]] [REVISES] → — Dedicated AST nodes
- [[typeclass-emulation]] [USES] → — Instances are records
- [[structural-row-based-types]] [FORMS] → — Records, variants, tuples, lists, dicts
- [[row-data-structure]] [FORMS] → — Basis of row-backed types
- [[sigma-bindings]] [APPLIES_TO] → — Record field references

## Structural Row-Based Types (Decision)
`structural-row-based-types` — tags: type-system, row-types, decision

**Outgoing:**
- [MOTIVATES] → [[row-polymorphism]] — All composite = rows
- [FORMS] → [[structural-records]] — Records, variants, tuples, lists, dicts

## Structural Subtyping
`structural-subtyping` — tags: concept, type-system, mechanism

**Outgoing:**
- [CONTRASTS_WITH] → [[nominal-subtyping]] — Subtype compatibility mechanisms
- [APPLIES_TO] → [[structural-typing]] — Asymmetric aspect of structural type systems
- [CONTRASTS_WITH] → [[row-polymorphism]] — Subtyping vs parametric

**Incoming:**
- [[nominal-subtyping]] [CONTRASTS_WITH] → — Subtype compatibility mechanisms
- [[row-polymorphism]] [DISTINGUISHES] → — Not subtyping: parametric, not coercive

## Structural Typing
`structural-typing` — tags: concept, type-system, mechanism

**Outgoing:**
- [CONTRASTS_WITH] → [[nominal-typing]] — Name-based vs structure-based identity
- [ENABLES] → [[row-polymorphism]] — Structure-based identity

**Incoming:**
- [[yap]] [USES] → — All compound types are row-based
- [[nominal-typing]] [CONTRASTS_WITH] → — Name-based vs structure-based identity
- [[structural-subtyping]] [APPLIES_TO] → — Asymmetric aspect of structural type systems

## Structural vs Representational Passes
`structural-vs-representational-passes` — tags: lowering, compiler, concept, in-progress

**Outgoing:**
- [CONSTRAINS] → [[gram]] — Ordering principle

**Incoming:**
- [[mlir-influence]] [INSPIRES] → — Pass scheduling

## Substitution System
`substitution-system` — tags: unification, elaboration, mechanism, implemented

**Outgoing:**
- [ENABLES] → [[zonking]] — Subst for resolution
- [ENABLES] → [[unification-algorithm]] — Solution accumulation
- [ZONKS] → [[meta-variables]] — Maps IDs to solutions

**Incoming:**
- [[unification-algorithm]] [USES] → — Accumulates solutions
- [[flex-rigid-unification]] [RECOVERS_FROM] → — Chases solved metas

## System F
`system-f` — tags: concept, type-system

**Outgoing:**
- [INFORMS] → [[de-bruijn]] — System F's binding structure motivates de Bruijn representation
- [INFORMS] → [[pi-types]] — Parametric polymorphism foundation
- [INFORMS] → [[hindley-milner]] — Explicit polymorphism

**Incoming:**
- [[yap]] [EXTENDS] → — Parametric polymorphism foundation
- [[dependent-types]] [EXTENDS] → — Types that depend on values
- [[type-type]] [GENERALIZES] → — Collapses all universe levels

## Tagged Values
`tagged-values` — tags: type-system, row-types, syntax, concept, implemented

**Outgoing:**
- [INTRODUCES] → [[variant-types]] — Intro form for variants

**Incoming:**
- [[match]] [DUAL_OF] → — Intro/elim pair for variants

## Termination Checking
`termination-checking` — tags: type-system, verification, speculative

**Outgoing:**
- [EXTENDS] → [[equirecursive-types]] — Guardedness
- [DETECTS] → [[nbe]] — Non-termination

## Test Utility (elaborateFrom)
`test-utility` — tags: testing, elaboration, infrastructure, implemented

**Outgoing:**
- [USES] → [[parser-processors]] — Parses input
- [USES] → [[elaboration-monad]] — V2.Do pipeline
- [USES] → [[solver-dispatch]] — Solve constraints
- [SNAPSHOTS] → [[elaboration]] — Pretty + structure output

**Incoming:**
- [[snapshot-testing]] [USES] → — elaborateFrom
- [[snapshot-testing]] [PRESERVES] → — Determinism via resets

## Theory Plugin Interface
`theory-plugin-interface` — tags: verification, mechanism, planned

**Outgoing:**
- [ENABLES] → [[cdcl-t-solver]] — Modular theories

**Incoming:**
- [[cdcl-t-solver]] [DELEGATES_TO] → — Theory propagation
- [[euf-theory]] [IMPLEMENTS] → — Congruence closure
- [[arithmetic-theory]] [IMPLEMENTS] → — Simplex
- [[string-theory]] [IMPLEMENTS] → — Word equations
- [[row-theory]] [IMPLEMENTS] → — Row containment
- [[quantifier-engine]] [IMPLEMENTS] → — Instantiation
- [[required-theory-support]] [CONSTRAINS] → — All theories needed
- [[nelson-oppen]] [INFORMS] → — Cooperating procedures

## Thorin/MimIR (Influence)
`thorin-mimir-influence` — tags: lowering, research

**Outgoing:**
- [INSPIRES] → [[mir-retrospective]] — Calls = jumps
- [CONTRASTS_WITH] → [[mir-lowering]] — CPS vs direct

## tmp.ts Pipeline Stub
`tmp-pipeline-stub` — tags: compiler, migration, problem, in-progress

**Outgoing:**
- [BLOCKS] → [[v2-elaboration-pipeline]] — Stubs prevent integration

## Trampoline Evaluator
`trampoline-evaluator` — tags: normalization, performance, mechanism, implemented

**Outgoing:**
- [IMPLEMENTS] → [[nbe]] — Stack-safe evaluation
- [ADDRESSES] → [[nbe]] — Stack overflow prevention
- [WRAPS] → [[nbe]] — Heap-allocated frames
- [PRESERVES] → [[cbv-evaluation]] — Same results

**Incoming:**
- [[evaluation-step-limit]] [CONSTRAINS] → — Prevents non-termination

## Translation Boundary (VC)
`translation-boundary-vc` — tags: verification, elaboration, planned

**Outgoing:**
- [SUPERSEDES] → [[smt-translation]] — New translation tools
- [CONSUMES] → [[nf-value]] — NF.Value input
- [DELEGATES_TO] → [[vc-ir]] — Produces VC types

**Incoming:**
- [[vc-normalization]] [FOLLOWS] → — After translation
- [[milestone-1-ir-boundary]] [PRODUCES] → — Translation tools

## Tree-sitter Parser
`tree-sitter-parser` — tags: compiler, syntax, migration, in-progress

**Outgoing:**
- [SUPERSEDES] → [[nearley-parser]] — Incremental replaces ambiguous CFG
- [PRODUCES] → [[v2-elaboration-pipeline]] — CST.SyntaxNode

## Tuples
`tuples` — tags: type-system, row-types, concept, implemented

**Outgoing:**
- [DESUGARS_TO] → [[structural-records]] — Positional labels
- [SPECIALIZES] → [[structural-records]] — Numeric labels only

## Type Erasure
`type-erasure` — tags: codegen, type-system, performance, planned

**Outgoing:**
- [ERASES] → [[pi-types]] — Removes type information

**Incoming:**
- [[ffi]] [LACKS] → — Needs dummy type args

## Type : Type
`type-type` — tags: type-system, dependent, concept, decision

**Outgoing:**
- [ENABLES] → [[dependent-types]] — Types compute as terms
- [GENERALIZES] → [[system-f]] — Collapses all universe levels
- [COMPOSES_WITH] → [[dependent-types]] — Types in same universe

**Incoming:**
- [[types-as-terms]] [ENABLES] → — Types compute as terms

## Typeclass Emulation
`typeclass-emulation` — tags: inference, type-system, pattern, implemented

**Outgoing:**
- [EMULATES] → [[nominal-typing]] — Structural alternative to classes
- [USES] → [[implicit-resolution]] — Instance lookup via Δ
- [USES] → [[structural-records]] — Instances are records
- [CONTRASTS_WITH] → [[nominal-typing]] — No class hierarchy

**Incoming:**
- [[nominal-typing]] [CONTRASTS_WITH] → — Class hierarchy vs structural

## Typed Pass Composition
`typed-pass-composition` — tags: lowering, rewriting, type-system, speculative

**Outgoing:**
- [EXTENDS] → [[gram]] — Type-safe passes

## Types as Terms
`types-as-terms` — tags: type-system, dependent, decision

**Outgoing:**
- [ENABLES] → [[type-type]] — Types compute as terms
- [RELIES_ON] → [[dependent-types]] — Dependency required
- [NORMALIZES_TO] → [[nf-value]] — Types evaluate like terms

## Typing Rules (Spec)
`typing-rules` — tags: type-system, elaboration, concept, implemented

**Outgoing:**
- [ENCODES] → [[yap]] — Formal rules in spec.md
- [FORMS] → [[pi-types]] — Type-theoretic foundation
- [COMPOSES_WITH] → [[bidirectional-checking]] — Mode drives rule selection

## Unification Algorithm
`unification-algorithm` — tags: unification, elaboration, mechanism, implemented

**Outgoing:**
- [IMPLEMENTS] → [[unification]] — Core algorithm
- [USES] → [[occurs-check]] — Prevents infinite types
- [USES] → [[row-unification-mechanism]] — Row case delegation
- [USES] → [[substitution-system]] — Accumulates solutions
- [DISPATCHES_ON] → [[nf-value]] — Pattern match on pairs
- [TRAVERSES] → [[nf-value]] — Recursive walk

**Incoming:**
- [[solver]] [DELEGATES_TO] → — Assign constraints
- [[flex-flex-unification]] [SPECIALIZES] → — Both unsolved
- [[flex-rigid-unification]] [SPECIALIZES] → — Meta vs rigid
- [[mu-type-unification]] [SPECIALIZES] → — Mu case
- [[occurs-check]] [CONSTRAINS] → — Prevents cycles
- [[row-unification-mechanism]] [EXTENDS] → — Row extension
- [[solver-dispatch]] [USES] → — Assign → unify
- [[implicit-resolution-solver]] [USES] → — Candidate matching
- [[substitution-system]] [ENABLES] → — Solution accumulation
- [[error-causes]] [REPORTS] → — Type error rendering

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
- [[solver]] [USES] → — Assign constraints → unify
- [[whnf-vs-full-normalization]] [CONSTRAINS] → — Full NF in unification
- [[equirecursive-types]] [PRESERVES] → — Type equality under finite unfolding
- [[abel-pientka]] [INFORMS] → — Pattern fragment analysis
- [[unification-algorithm]] [IMPLEMENTS] → — Core algorithm

## Usages Deferred to Verification
`usages-deferred` — tags: modality, verification, decision

**Outgoing:**
- [DEPRECATES] → [[qtt-usage-collection]] — Move to verification
- [DELEGATES_TO] → [[verification-pipeline]] — Analysis moves post-elab

## V1 Elaboration Pipeline
`v1-elaboration-pipeline` — tags: compiler, elaboration, implemented, deprecated

**Outgoing:**
- [PRODUCES] → [[eb-term]] — EB.Term output
- [NORMALIZES_TO] → [[nf-value]] — Types → normal forms
- [DISPATCHES_ON] → [[src-term]] — Source shape drives dispatch

**Incoming:**
- [[v2-elaboration-pipeline]] [SUPERSEDES] → — Fresh implementation
- [[v2-elaboration-pipeline]] [MIRRORS] → — Same theory, new code
- [[verification-pipeline]] [VALIDATES] → — On-demand, not pipeline stage
- [[verification-pipeline]] [COMPOSES_WITH] → — Post-hoc validation
- [[mir-lowering]] [CONSUMES] → — EB.Term input
- [[module-system]] [RELIES_ON] → — Not yet wired to v2
- [[compile-orchestration]] [DELEGATES_TO] → — Current delegation
- [[repl]] [USES] → — Elaborates

## V2 Elaboration Pipeline
`v2-elaboration-pipeline` — tags: compiler, elaboration, migration, in-progress

**Outgoing:**
- [SUPERSEDES] → [[v1-elaboration-pipeline]] — Fresh implementation
- [MIRRORS] → [[v1-elaboration-pipeline]] — Same theory, new code

**Incoming:**
- [[tree-sitter-parser]] [PRODUCES] → — CST.SyntaxNode
- [[tmp-pipeline-stub]] [BLOCKS] → — Stubs prevent integration

## V2.track (Provenance Threading)
`v2-track` — tags: tracing, elaboration, monad, mechanism, implemented

**Outgoing:**
- [IMPLEMENTS] → [[provenance-system]] — Track function
- [EXTENDS] → [[elaboration-monad]] — Trace extension

## Variable Evaluation Dispatch
`variable-evaluation-dispatch` — tags: normalization, mechanism, implemented

**Outgoing:**
- [IMPLEMENTS] → [[nbe]] — (Var) at NF level
- [RESOLVES] → [[meta-variables]] — Skolems → zonker → neutral

## Variant Types
`variant-types` — tags: type-system, row-types, concept, implemented

**Outgoing:**
- [USES] → [[row-polymorphism]] — Row-backed unions
- [DUAL_OF] → [[structural-records]] — Sum vs product over rows
- [MIRRORS] → [[structural-records]] — Row-backed dual

**Incoming:**
- [[injection]] [INTRODUCES] → — Tag injection
- [[tagged-values]] [INTRODUCES] → — Intro form for variants
- [[match]] [ELIMINATES] → — Elim form for variants
- [[elm-ocaml-influence]] [INSPIRES] → — Polymorphic variants

## VC IR
`vc-ir` — tags: verification, ir, planned

**Outgoing:**
- [SUPERSEDES] → [[smt-translation]] — Backend-neutral replaces Z3
- [TRANSLATES_TO] → [[verification-pipeline]] — NF.Value → formulas

**Incoming:**
- [[liquid-haskell-influence]] [INSPIRES] → — Formula fragment
- [[vc-normalization]] [NORMALIZES_TO] → — Simplifies formulas
- [[quantifier-preparation]] [REWRITES] → — Prenex + skolemize + triggers
- [[boolean-lowering-cnf]] [TRANSLATES_TO] → — Formula → clauses
- [[boolean-lowering-cnf]] [PRESERVES] → — Theory atoms untouched
- [[translation-boundary-vc]] [DELEGATES_TO] → — Produces VC types
- [[z3-replacement-decision]] [MOTIVATES] → — Backend-neutral IR needed
- [[milestone-1-ir-boundary]] [PRODUCES] → — First deliverable
- [[required-formula-forms]] [CONSTRAINS] → — IR must express all forms

## VC Normalization
`vc-normalization` — tags: verification, normalization, planned

**Outgoing:**
- [NORMALIZES_TO] → [[vc-ir]] — Simplifies formulas
- [FOLLOWS] → [[translation-boundary-vc]] — After translation

**Incoming:**
- [[quantifier-preparation]] [FOLLOWS] → — After normalization

## VC Provenance
`vc-provenance` — tags: verification, tracing, mechanism, planned

**Outgoing:**
- [EXTENDS] → [[verification-pipeline]] — Error quality
- [REPORTS] → [[verification-pipeline]] — Provenance-annotated failures

## VerificationArtefacts (Revised)
`verification-artefacts-revised` — tags: verification, concept, planned

**Outgoing:**
- [SUPERSEDES] → [[verification-pipeline]] — New artefact type

## VerificationBackend
`verification-backend` — tags: verification, infrastructure, planned

**Outgoing:**
- [SUPERSEDES] → [[verification-pipeline]] — New backend API
- [WRAPS] → [[cdcl-t-solver]] — Simple API

## Verification Pipeline
`verification-pipeline` — tags: compiler, verification, implemented

**Outgoing:**
- [VALIDATES] → [[v1-elaboration-pipeline]] — On-demand, not pipeline stage
- [TRANSLATES_TO] → [[smt-translation]] — Types → Z3 assertions
- [COMPOSES_WITH] → [[v1-elaboration-pipeline]] — Post-hoc validation

**Incoming:**
- [[yap]] [INCLUDES] → — Verification component
- [[compile-orchestration]] [DELEGATES_TO] → — On-demand
- [[refinement-types]] [RELIES_ON] → — Z3 discharges VCs
- [[smt-translation]] [IMPLEMENTS] → — Z3 translation
- [[smt-translation]] [TRANSLATES_TO] → — Z3 sorts/assertions
- [[vc-provenance]] [EXTENDS] → — Error quality
- [[vc-provenance]] [REPORTS] → — Provenance-annotated failures
- [[usages-deferred]] [DELEGATES_TO] → — Analysis moves post-elab
- [[dynamic-reflection]] [COMPOSES_WITH] → — Proof-gated casts
- [[compcert-cakeml-influence]] [INSPIRES] → — Verified compilation aspiration
- [[vc-ir]] [TRANSLATES_TO] → — NF.Value → formulas
- [[verification-artefacts-revised]] [SUPERSEDES] → — New artefact type
- [[cdcl-t-solver]] [IMPLEMENTS] → — Replaces Z3
- [[verification-backend]] [SUPERSEDES] → — New backend API
- [[row-theory]] [PRESERVES] → — subtype.contains() semantics
- [[z3-replacement-decision]] [PRESERVES] → — Shape unchanged

## Where Clauses
`where-clauses` — tags: syntax, sugar, implemented

**Outgoing:**
- [DESUGARS_TO] → [[blocks]] — Let bindings

## WHNF Codification
`whnf-codification` — tags: normalization, elaboration, planned

## WHNF vs Full Normalization
`whnf-vs-full-normalization` — tags: normalization, elaboration, concept, decision

**Outgoing:**
- [CONSTRAINS] → [[elaboration]] — WHNF only in elab
- [CONSTRAINS] → [[unification]] — Full NF in unification

## yap explore
`yap-explore` — tags: tooling, project, implemented, in-progress

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
- [INCLUDES] → [[nearley-parser]] — Parser component
- [INCLUDES] → [[verification-pipeline]] — Verification component
- [INCLUDES] → [[mir-lowering]] — Lowering component
- [INCLUDES] → [[js-codegen]] — JS backend
- [INCLUDES] → [[c-codegen]] — C backend
- [INCLUDES] → [[erlang-codegen]] — Erlang backend
- [INCLUDES] → [[module-system]] — Module component
- [INCLUDES] → [[compile-orchestration]] — Orchestration

**Incoming:**
- [[cbv-evaluation]] [IMPLEMENTS] → — Runtime semantics
- [[documentation-debt]] [APPLIES_TO] → — README/FAQ drift
- [[documentation-debt]] [DETECTS] → — Drift between docs and impl
- [[typing-rules]] [ENCODES] → — Formal rules in spec.md
- [[pipeline-explorer]] [REPORTS] → — Visualizes pipeline stages
- [[brainstorming-artifacts]] [INFORMS] → — Roadmap decisions

## Z3 Replacement Decision
`z3-replacement-decision` — tags: verification, decision

**Outgoing:**
- [MOTIVATES] → [[vc-ir]] — Backend-neutral IR needed
- [MOTIVATES] → [[cdcl-t-solver]] — Own solver needed
- [SUPERSEDES] → [[smt-translation]] — Z3 dependency removed
- [PRESERVES] → [[verification-pipeline]] — Shape unchanged

**Incoming:**
- [[milestone-1-ir-boundary]] [FOLLOWS] → — First step
- [[cas-instead-of-smt]] [CONTRASTS_WITH] → — Alternative rejected

## Zonking
`zonking` — tags: elaboration, unification, mechanism, implemented

**Outgoing:**
- [RELIES_ON] → [[meta-variables]] — Applies subst to metas
- [FOLLOWS] → [[solver]] — After solving
- [ZONKS] → [[meta-variables]] — Resolves unknowns
- [TRAVERSES] → [[eb-term]] — Walks replacing metas

**Incoming:**
- [[lean-4-influence]] [INSPIRES] → — Substitution application
- [[mcbride-nuttin]] [INFORMS] → — Postponed substitution
- [[substitution-system]] [ENABLES] → — Subst for resolution
- [[nf-display]] [USES] → — Resolves metas before display


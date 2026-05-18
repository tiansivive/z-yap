# z-yap Catalog (239 zettels)

## Abel & Pientka — Higher-order dynamic pattern unification
`abel-pientka` — tags: unification, elaboration, normalization, dependent, row-types, mechanism, research, paper, reference, monad, implemented, inference

**Outgoing:**
- [INFORMS] → [[nbe]] — Higher-order pattern unification
- [INFORMS] → [[unification]] — Pattern fragment analysis

## Agda (Influence)
`agda-influence` — tags: research, reference, dependent, type-system, elaboration, normalization, ffi, compiler, paper, migration, in-progress

**Outgoing:**
- [INSPIRES] → [[meta-variables]] — Pattern unification
- [INSPIRES] → [[dependent-types]] — Dependent types
- [INSPIRES] → [[nbe]] — Evaluation-based normalization
- [INSPIRES] → [[implicit-resolution]] — Instance resolution

## Annotations
`annotations` — tags: syntax, elaboration, inference, checking, type-system, parser, ast, mechanism, dependent, normalization, monad, implemented, compiler, error-handling

**Outgoing:**
- [COERCES_TO] → [[pi-types]] — Term validated against annotation

## Answer-type Polymorphism
`answer-type-polymorphism` — tags: continuation, type-system, elaboration, inference, unification, concept, mechanism, implemented, dependent, pattern, effect, normalization, mir, migration, principle, codegen, lowering

**Outgoing:**
- [GENERALIZES] → [[pi-types]] — Monomorphic → polymorphic answer
- [USES] → [[pi-types]] — Polymorphic answer type is a Pi

**Incoming:**
- [[shift-reset]] [USES] → — k has polymorphic answer type
- [[danvy-filinski]] [INFORMS] → — Answer type modification

## Application Evaluation
`application-evaluation` — tags: normalization, elaboration, mechanism, implemented, inference, dependent, continuation, ffi, ir, ast, monad, runtime, code

**Outgoing:**
- [IMPLEMENTS] → [[nbe]] — (App) at NF level
- [DELEGATES_TO] → [[closures]] — Abs case
- [IMPLEMENTS] → [[typing-rules]] — (App) rule at NF level
- [DISPATCHES_ON] → [[nf-value]] — Abs → closure, External → partial, PrimOp → δ

## Application
`application` — tags: syntax, elaboration, inference, type-system, dependent, mechanism, parser, ast, implemented, monad, normalization, codegen

**Outgoing:**
- [ELIMINATES] → [[pi-types]] — Elim form for functions
- [USES] → [[implicit-resolution]] — Implicit insertion
- [DUAL_OF] → [[lambda]] — Intro/elim pair for Pi
- [COMPOSES_WITH] → [[lambda]] — β-redex pair

**Incoming:**
- [[lambda]] [DUAL_OF] → — Intro/elim pair for Pi
- [[spineful-applications]] [REVISES] → — Head + spine
- [[cbv-evaluation]] [PRESERVES] → — Left-to-right evaluation order
- [[saturation]] [REWRITES] → — App chains → primop nodes
- [[zonking]] [RESOLVES] → — Meta-variables from implicit insertion
- [[spineful-applications]] [ADDRESSES] → — Nested App complexity
- [[saturation]] [ADDRESSES] → — Collapse App chains into primop nodes
- [[lambda]] [COMPOSES_WITH] → — β-redex pair

## Arithmetic theory
`arithmetic-theory` — tags: verification, arithmetic, mechanism, planned, backend, reference, project, normalization, ast, ir, sat, ffi, milestone, inference

**Outgoing:**
- [IMPLEMENTS] → [[theory-plugin-interface]] — Simplex
- [COMPOSES_WITH] → [[string-theory]] — Length coupling
- [VALIDATES] → [[primitive-signature]] — Arithmetic operations
- [RESOLVES] → [[cdcl-t-solver]] — Simplex feasibility for linear constraints
- [DISPATCHES_ON] → [[cdcl-t-solver]] — Int → branch-and-bound, Real → simplex

**Incoming:**
- [[string-theory]] [DELEGATES_TO] → — Length lemmas
- [[num-sort-semantics]] [APPLIES_TO] → — Int vs Real
- [[non-linear-arithmetic]] [CONSTRAINS] → — Linearizable subset first
- [[milestone-2-euf-quant-lia]] [PRODUCES] → — Arithmetic module
- [[dutertre-arithmetic]] [INFORMS] → — Fast linear arithmetic
- [[string-theory]] [USES] → — Length coupling

## Augustsson — compiling pattern matching (1985)
`augustsson-paper` — tags: paper, reference, lowering, compiler

**Outgoing:**
- [INFORMS] → [[pattern-matching-compilation]] — Original algorithm (1985)

**Incoming:**
- [[maranget-paper]] [SUPERSEDES] → — Better column selection, no body duplication
- [[pattern-algorithm-choice]] [REJECTS] → — Body duplication unsuitable for graph IR

## Barbosa et al. — cvc5 system overview
`barbosa-cvc5` — tags: verification, sat, backend, compiler, tooling, infrastructure, strings, quantifiers, research, paper, reference, planned, performance

**Outgoing:**
- [INFORMS] → [[cdcl-t-solver]] — Modern reference

## Bidirectional checking (design)
`bidirectional-checking-decision` — tags: decision, elaboration, type-system, inference, dependent, row-types, modality, principle, pattern, migration, implemented

**Outgoing:**
- [DISPATCHES_ON] → [[elaboration]] — Mode drives path
- [COMPOSES_WITH] → [[implicit-resolution]] — Mode switch triggers insertion
- [DISPATCHES_ON] → [[src-to-eb-transformation]] — Mode drives Src → EB

## Bidirectional checking
`bidirectional-checking` — tags: concept, mechanism, elaboration, type-system, inference, parser, dependent, principle, ast, modality, implemented

**Outgoing:**
- [ENABLES] → [[dependent-types]] — Natural fit for dependent types with annotations
- [INTRODUCES] → [[pi-types]] — Types in check mode
- [ELIMINATES] → [[pi-types]] — Types in infer mode
- [DISPATCHES_ON] → [[elaboration]] — Check vs infer mode
- [DELEGATES_TO] → [[solver]] — At let boundaries
- [COERCES_TO] → [[pi-types]] — Infer to check mode switch

**Incoming:**
- [[yap]] [USES] → — Inference strategy
- [[elaboration]] [USES] → — Infer synthesises, check pushes inward
- [[idris-2-influence]] [INSPIRES] → — TT core
- [[dunfield-krishnaswami]] [INFORMS] → — Declarative → algorithmic
- [[typing-rules]] [COMPOSES_WITH] → — Mode drives rule selection
- [[provenance-system]] [THREADS_THROUGH] → — Checking/inference trace
- [[typing-rules]] [DISPATCHES_ON] → — Γ ⊢ e ⇐ A vs Γ ⊢ e ⇒ A

## Block-level `using` gap
`block-level-using-gap` — tags: elaboration, inference, normalization, syntax, ast, problem, incomplete, migration, compiler, context, mechanism, tooling, cli, testing

**Outgoing:**
- [APPLIES_TO] → [[blocks]] — Using in block scope
- [APPLIES_TO] → [[implicit-environment]] — Block-local Δ
- [DETECTS] → [[module-system]] — Gap in implementation

## Blocks
`blocks` — tags: syntax, elaboration, parser, ast, polymorphism, generalization, monad, tracing, implemented, migration, inference, dependent

**Outgoing:**
- [USES] → [[generalization]] — Let-polymorphism at boundaries
- [INTRODUCES] → [[elaboration-context]] — Local scope via let bindings

**Incoming:**
- [[where-clauses]] [DESUGARS_TO] → — Let bindings
- [[block-level-using-gap]] [APPLIES_TO] → — Using in block scope
- [[knot-tying]] [IMPLEMENTS] → — Recursive let self-referential evaluation

## Boolean lowering (CNF)
`boolean-lowering-cnf` — tags: verification, sat, mechanism, planned, backend, ir, reference, project, milestone, lowering, inference, arithmetic, codegen, principle, problem, ffi

**Outgoing:**
- [FOLLOWS] → [[quantifier-preparation]] — After quantifier prep
- [TRANSLATES_TO] → [[vc-ir]] — Formula → clauses
- [PRESERVES] → [[vc-ir]] — Theory atoms untouched
- [ENCODES] → [[vc-ir]] — Origin metadata for provenance

**Incoming:**
- [[cdcl-t-solver]] [CONSUMES] → — CNF clauses
- [[cdcl-t-solver]] [TRAVERSES] → — SAT decides boolean skeleton

## Brainstorming artifacts (`brainstorming/yap/`)
`brainstorming-artifacts` — tags: project, infrastructure, reference, migration, mir, lowering, parser, continuation, decision, problem, speculative, display

**Outgoing:**
- [INFORMS] → [[yap]] — Roadmap decisions

## Branded types
`branded-types` — tags: type-system, elaboration, syntax, ast, decision, pattern, implemented, dependent, ir, code, language, inference

**Outgoing:**
- [CONSTRAINS] → [[eb-term]] — Type-level separation
- [CONSTRAINS] → [[nf-value]] — Prevents mixing

## C Codegen
`c-codegen` — tags: codegen, backend, mir, compiler, lowering, runtime, testing, ir, project, reference, performance, in-progress

**Outgoing:**
- [TRANSLATES_TO] → [[ffi]] — C source output

**Incoming:**
- [[yap]] [INCLUDES] → — C backend
- [[mir-lowering]] [PRODUCES] → — MIR → C
- [[gram]] [TRANSLATES_TO] → — Target-specific passes

## CAS instead of SMT
`cas-instead-of-smt` — tags: verification, decision, rejected, inference, elaboration, reference, project, backend, arithmetic, normalization, milestone, tooling, infrastructure, error-handling, type-system, ffi, migration

**Outgoing:**
- [CONTRASTS_WITH] → [[smt-translation]] — CAS alternative
- [CONTRASTS_WITH] → [[z3-replacement-decision]] — Alternative rejected

## CBV Evaluation
`cbv-evaluation` — tags: normalization, elaboration, mechanism, implemented, inference, lowering, runtime, ir, dependent, continuation, evaluation, code, reference

**Outgoing:**
- [IMPLEMENTS] → [[yap]] — Runtime semantics
- [PRESERVES] → [[application]] — Left-to-right evaluation order
- [NORMALIZES_TO] → [[nf-value]] — Closed terms fully reduce
- [IMPLEMENTS] → [[nbe]] — Spec vs implementation
- [CONTRASTS_WITH] → [[strict-vs-lazy]] — Evaluation strategy contrast

**Incoming:**
- [[primitive-signature]] [USES] → — δ-rules on literals
- [[strict-vs-lazy]] [CONTRASTS_WITH] → — Lazy alternative
- [[trampoline-evaluator]] [PRESERVES] → — Same results
- [[trampoline-evaluator]] [IMPLEMENTS] → — Without stack overflow
- [[primitive-signature]] [ENCODES] → — Arithmetic/boolean/comparison as built-in δ-rules

## CDCL(T) solver
`cdcl-t-solver` — tags: verification, sat, mechanism, planned, backend, reference, project, milestone, ffi, arithmetic, quantifiers, strings, row-types, inference, tooling

**Outgoing:**
- [IMPLEMENTS] → [[verification-pipeline]] — Replaces Z3
- [CONSUMES] → [[boolean-lowering-cnf]] — CNF clauses
- [DELEGATES_TO] → [[theory-plugin-interface]] — Theory propagation
- [SUPERSEDES] → [[smt-translation]] — Replaces Z3 invocation
- [DISPATCHES_ON] → [[theory-plugin-interface]] — EUF, arithmetic, strings, rows, quantifiers
- [TRAVERSES] → [[boolean-lowering-cnf]] — SAT decides boolean skeleton
- [PRODUCES] → [[verification-backend]] — SolveResult (sat/unsat/unknown)

**Incoming:**
- [[theory-plugin-interface]] [ENABLES] → — Modular theories
- [[verification-backend]] [WRAPS] → — Simple API
- [[z3-replacement-decision]] [MOTIVATES] → — Own solver needed
- [[milestone-2-euf-quant-lia]] [PRODUCES] → — Core solver
- [[nieuwenhuis-oliveras]] [INFORMS] → — DPLL(T) architecture
- [[de-moura-bjorner-z3]] [INFORMS] → — Industrial reference
- [[barbosa-cvc5]] [INFORMS] → — Modern reference
- [[solver-module-layout]] [APPLIES_TO] → — Internal module structure
- [[solver-module-layout]] [ENCODES] → — IR / SAT / theories / explanation separation
- [[theory-plugin-interface]] [DISPATCHES_ON] → — Theories receive literals from SAT
- [[euf-theory]] [WRAPS] → — Hash-consed term arena shared across theories
- [[euf-theory]] [TRAVERSES] → — Trigger matching over e-class arena
- [[arithmetic-theory]] [RESOLVES] → — Simplex feasibility for linear constraints
- [[arithmetic-theory]] [DISPATCHES_ON] → — Int → branch-and-bound, Real → simplex
- [[string-theory]] [REWRITES] → — Contains/prefix/suffix → concat equalities
- [[row-theory]] [USES] → — Emits child obligations for field values
- [[row-theory]] [DELEGATES_TO] → — Nested obligation emission
- [[quantifier-engine]] [INSTANTIATES] → — Ground substitutions asserted

## Closure conversion
`closure-conversion` — tags: lowering, mechanism, implemented, mir, compiler, codegen, closure, runtime, ir, elaboration, dependent, reference

**Outgoing:**
- [CONTRASTS_WITH] → [[defunctionalization]] — Different lowering strategies
- [CONTRASTS_WITH] → [[native-lambda-hvm]] — Different targets
- [TRANSLATES_TO] → [[mir-lowering]] — Env + function pointer
- [ERASES] → [[lambda]] — Flattens lexical scope
- [TRANSLATES_TO] → [[mir-lowering]] — Environment + function pointer
- [ERASES] → [[lambda]] — Flattens lexical scope to heap allocation

**Incoming:**
- [[native-lambda-hvm]] [REJECTS] → — HVM needs raw λ
- [[compilation-by-selection]] [ADDRESSES] → — Backend-specific (C yes, JS no)
- [[gram-pattern-translation]] [COMPOSES_WITH] → — pat:binder pushes onto binder stack
- [[gram-to-mir-bridge]] [RELIES_ON] → — Needs env/fn nodes
- [[dpo-vs-imperative-passes]] [APPLIES_TO] → — Capture is aggregate

## Closures (NbE)
`closures` — tags: normalization, elaboration, mechanism, implemented, ir, dependent, inference, continuation, ffi, lowering, ast, runtime, code

**Outgoing:**
- [RELIES_ON] → [[de-bruijn]] — Closures capture de Bruijn level-indexed environments
- [IMPLEMENTS] → [[lambda]] — Closure = captured env + body
- [ENABLES] → [[nbe]] — Evaluation without substitution
- [WRAPS] → [[eb-term]] — Deferred substitution (EB.Term + Context)
- [PRESERVES] → [[lambda]] — Lexical scope captured at binding site
- [RELIES_ON] → [[de-bruijn-levels]] — Level-indexed environments
- [PRESERVES] → [[nbe]] — Lexical scope captured at binding site

**Incoming:**
- [[neutrals]] [CONTRASTS_WITH] → — Closures reduce; neutrals are stuck — dual roles in NbE
- [[session-lowering-branch-split]] [ADDRESSES] → — Closure conversion and shared bundle primitive
- [[quoting]] [USES] → — Apply closure for readback
- [[application-evaluation]] [DELEGATES_TO] → — Abs case
- [[nbe]] [USES] → — Lazy substitution
- [[nbe]] [DELEGATES_TO] → — Lazy substitution mechanism
- [[shift-reset]] [NORMALIZES_TO] → — Continuation closure (captured frames)
- [[lambda]] [ENCODES] → — Function values as closures

## CompCert / CakeML (Influence)
`compcert-cakeml-influence` — tags: research, reference, verification, compiler, codegen, backend, milestone, principle, project, infrastructure, planned

**Outgoing:**
- [INSPIRES] → [[gram]] — Refinement terminology
- [INSPIRES] → [[verification-pipeline]] — Verified compilation aspiration

## Compilation by selection
`compilation-by-selection` — tags: concept, compiler, backend, codegen, decision, graph, ir

**Outgoing:**
- [RELIES_ON] → [[gram-additive-enrichment]] — Requires accumulated views
- [RELIES_ON] → [[gram-dataflow-semantics]] — Requires independence
- [ADDRESSES] → [[closure-conversion]] — Backend-specific (C yes, JS no)
- [ADDRESSES] → [[defunctionalization]] — Backend-specific (GPU yes, JS no)
- [ADDRESSES] → [[native-lambda-hvm]] — Backend-specific (HVM skips all)
- [CONTRASTS_WITH] → [[mir-lowering]] — Pass selection vs fixed representation

**Incoming:**
- [[gram-additive-enrichment]] [ENABLES] → — Multiple views enable selection
- [[gram-dataflow-semantics]] [ENABLES] → — Independence enables selectivity
- [[stg-analogy]] [INSPIRES] → — Selective = improvement over GHC's fused approach

## Compile Orchestration
`compile-orchestration` — tags: compiler, infrastructure, cli, codegen, parser, elaboration, verification, mir, backend, tooling, project, ffi, implemented

**Outgoing:**
- [DELEGATES_TO] → [[v1-elaboration-pipeline]] — Current delegation
- [DELEGATES_TO] → [[verification-pipeline]] — On-demand
- [DELEGATES_TO] → [[mir-lowering]] — Lowering step

**Incoming:**
- [[yap]] [INCLUDES] → — Orchestration

## Constraint solving
`constraint-solving` — tags: mechanism, elaboration, unification, normalization, inference, monad, compiler, row-types, quantifiers, error-handling, tracing, implemented

**Outgoing:**
- [USES] → [[row-unification]] — Row variables unified alongside type variables

**Incoming:**
- [[elaboration]] [USES] → — Deferred constraints solved per let-binding

## Constraint types
`constraint-types` — tags: concept, elaboration, unification, code, ast, inference, dependent, monad, tracing, performance, reference, implemented

**Outgoing:**
- [ENABLES] → [[solver-dispatch]] — Typed constraints
- [DISPATCHES_ON] → [[solver-dispatch]] — Assign vs resolve

**Incoming:**
- [[implicit-resolution]] [RESOLVES] → — Δ lookup for resolve constraints
- [[solver]] [RESOLVES] → — Processes queue
- [[deferred-constraint-solving]] [RESOLVES] → — At let boundaries
- [[solver-dispatch]] [RESOLVES] → — Processes queue
- [[implicit-resolution]] [DISPATCHES_ON] → — Resolve → Δ, assign → unify

## Context operations
`context-operations` — tags: elaboration, type-system, mechanism, inference, unification, normalization, syntax, ast, ffi, infrastructure, reference, implemented

**Outgoing:**
- [ENABLES] → [[elaboration-context]] — Bind, extend, augment, prune
- [THREADS_THROUGH] → [[elaboration-monad]] — All phases

## Continuation Binders
`continuation-binders` — tags: continuation, elaboration, inference, mechanism, implemented, ast, monad, type-system, normalization, testing, codegen, lowering, reference, display, rewriting, unification, effect, backend, code

**Outgoing:**
- [USES] → [[meta-variables]] — Skolem-like metas
- [RELIES_ON] → [[nondeterminism]] — Multishot semantics
- [THREADS_THROUGH] → [[elaboration-monad]] — Via MutState
- [ENCODES] → [[meta-variables]] — Resumption as meta in MutState.skolems

**Incoming:**
- [[shift-reset]] [USES] → — Resume encoded via metas
- [[shift-reset]] [INTRODUCES] → — Shift captures k
- [[nondeterminism-multishot]] [IMPLEMENTS] → — Multishot resume semantics
- [[shift-reset]] [INSTANTIATES] → — Via skolem-like metas
- [[shift-reset]] [ELIMINATES] → — Resume applies k

## Danvy & Filinski — shift and reset
`danvy-filinski` — tags: continuation, lowering, mir, compiler, mechanism, principle, research, paper, reference, implemented, codegen, runtime

**Outgoing:**
- [INFORMS] → [[shift-reset]] — Foundational theory
- [INFORMS] → [[answer-type-polymorphism]] — Answer type modification

## De Bruijn Indices (`EB.Term`)
`de-bruijn-indices` — tags: elaboration, syntax, ast, mechanism, implemented, inference, dependent, normalization, type-system, migration, parser, reference, code

**Outgoing:**
- [CONTRASTS_WITH] → [[de-bruijn-levels]] — Dual representations
- [EXTENDS] → [[de-bruijn]] — EB-level detail

**Incoming:**
- [[level-to-index-conversion]] [USES] → — Target representation
- [[levels-vs-indices]] [MOTIVATES] → — Index representation choice

## De Bruijn Levels (`NF.Value`)
`de-bruijn-levels` — tags: normalization, ir, mechanism, implemented, elaboration, type-system, inference, unification, dependent, ast, syntax, reference, code

**Outgoing:**
- [EXTENDS] → [[de-bruijn]] — NF-level detail
- [ENABLES] → [[lambda]] — Evaluation under binders

**Incoming:**
- [[de-bruijn-indices]] [CONTRASTS_WITH] → — Dual representations
- [[level-to-index-conversion]] [USES] → — Source representation
- [[levels-vs-indices]] [MOTIVATES] → — Level representation choice
- [[closures]] [RELIES_ON] → — Level-indexed environments

## De Bruijn Representation (hub)
`de-bruijn` — tags: elaboration, normalization, concept, implemented, type-system, inference, dependent, syntax, ast, ir, mechanism, reference

**Incoming:**
- [[closures]] [RELIES_ON] → — Closures capture de Bruijn level-indexed environments
- [[system-f]] [INFORMS] → — System F's binding structure motivates de Bruijn representation
- [[levels-vs-indices]] [APPLIES_TO] → — Representation split
- [[de-bruijn-indices]] [EXTENDS] → — EB-level detail
- [[de-bruijn-levels]] [EXTENDS] → — NF-level detail

## de Moura & Bjørner — Z3 overview
`de-moura-bjorner-z3` — tags: verification, sat, backend, arithmetic, tooling, infrastructure, research, paper, reference, implemented, compiler, ffi

**Outgoing:**
- [INFORMS] → [[cdcl-t-solver]] — Industrial reference

## Dedicated row constructors (internal EB)
`dedicated-row-constructors` — tags: planned, elaboration, syntax, ast, row-types, type-system, lowering, normalization, inference, parser, mir, pattern, mechanism, display, migration

**Outgoing:**
- [REVISES] → [[structural-records]] — Dedicated AST nodes
- [ADDRESSES] → [[rows-universal-substrate]] — Cognitive overhead

## Deferred constraint solving
`deferred-constraint-solving` — tags: mechanism, elaboration, inference, unification, monad, pattern, dependent, compiler, normalization, error-handling, reference, implemented

**Outgoing:**
- [ENABLES] → [[generalization]] — Metas generalized before solving
- [ENABLES] → [[implicit-resolution]] — Full context for resolution
- [RELIES_ON] → [[solver-dispatch]] — Batch processing at let boundaries
- [RESOLVES] → [[constraint-types]] — At let boundaries

**Incoming:**
- [[ghc-influence]] [INSPIRES] → — Constraint deferral
- [[solver-dispatch]] [ENABLES] → — Batch processing at let boundaries
- [[implicit-resolution]] [RESOLVES] → — At let boundaries

## Defunctionalization
`defunctionalization` — tags: lowering, concept, speculative, mir, codegen, runtime, closure, compiler, ir, backend, planned, reference

**Outgoing:**
- [SPECIALIZES] → [[mir-lowering]] — GPU/HVM targets
- [TRANSLATES_TO] → [[mir-lowering]] — Tagged dispatch on function identity

**Incoming:**
- [[closure-conversion]] [CONTRASTS_WITH] → — Different lowering strategies
- [[compilation-by-selection]] [ADDRESSES] → — Backend-specific (GPU yes, JS no)

## Dependent types
`dependent-types` — tags: concept, type-system, elaboration, normalization, unification, verification, syntax, dependent, quantifiers, inference, implemented, ast, monad, parser, row-types

**Outgoing:**
- [EXTENDS] → [[system-f]] — Types that depend on values
- [FORMS] → [[pi-types]] — Universal quantification with dependency
- [FORMS] → [[sigma-types]] — Existential quantification with dependency
- [NORMALIZES_TO] → [[nf-value]] — Types compute as terms
- [COMPOSES_WITH] → [[row-polymorphism]] — Dependent rows
- [ENABLES] → [[type-type]] — Types live in same universe as terms

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
`dictionaries` — tags: type-system, elaboration, inference, ffi, syntax, sugar, ast, mechanism, implemented, reference, parser, error-handling

**Outgoing:**
- [ENCODES] → [[ffi]] — Indexed String T defaultHashMap (foreign)
- [MIRRORS] → [[lists]] — Same Indexed encoding, different index

**Incoming:**
- [[records-indexed-separation]] [ADDRESSES] → — Indexed vs plain record clarity

## Documentation debt
`documentation-debt` — tags: project, infrastructure, problem, drift, parser, migration, tooling, testing, cli, incomplete, display, continuation, error-handling, verification

**Outgoing:**
- [APPLIES_TO] → [[yap]] — README/FAQ drift
- [DETECTS] → [[yap]] — Drift between docs and impl

**Incoming:**
- [[missing-spec-shift-reset]] [ADDRESSES] → — Spec gap
- [[missing-spec-let-polymorphism]] [ADDRESSES] → — Spec gap
- [[missing-spec-sigma-types]] [ADDRESSES] → — Spec gap
- [[missing-spec-recursive-types]] [ADDRESSES] → — Spec gap

## DPO rewriting
`dpo-rewriting` — tags: rewriting, mechanism, implemented, graph, compiler, infrastructure, reference, ir, pattern, project, testing

**Outgoing:**
- [IMPLEMENTS] → [[gram]] — Rewriting engine
- [TRAVERSES] → [[gram]] — Pattern matching for rule LHS
- [REWRITES] → [[gram]] — L ← K → R rule application on nodes

**Incoming:**
- [[gram]] [REWRITES] → — DPO rules refine graph
- [[egglog-influence]] [INSPIRES] → — E-graph rewriting
- [[stratego-influence]] [INSPIRES] → — Strategy combinators
- [[gram]] [DELEGATES_TO] → — Graph transformation engine
- [[dpo-vs-imperative-passes]] [CONSTRAINS] → — Defines when DPO applies

## DPO vs imperative passes
`dpo-vs-imperative-passes` — tags: rewriting, decision, graph, compiler, pattern, mechanism

**Outgoing:**
- [CONSTRAINS] → [[dpo-rewriting]] — Defines when DPO applies
- [CONSTRAINS] → [[gram]] — Pass implementation guide
- [APPLIES_TO] → [[gram-pattern-pass]] — Pattern pass is imperative/aggregate
- [APPLIES_TO] → [[gram-shift-reset-pass]] — Shift-reset pass is imperative/aggregate
- [APPLIES_TO] → [[closure-conversion]] — Capture is aggregate
- [ENABLES] → [[gram-pattern-pass]] — Downstream optimizations on decision tree are DPO

## Dunfield & Krishnaswami — bidirectional checking for higher-rank polymorphism
`dunfield-krishnaswami` — tags: inference, elaboration, type-system, dependent, mechanism, pattern, research, paper, reference, implemented, monad, syntax

**Outgoing:**
- [INFORMS] → [[bidirectional-checking]] — Declarative → algorithmic
- [INFORMS] → [[implicit-resolution]] — Subsumption in bidir

## Dutertre & de Moura — linear arithmetic inside DPLL(T)
`dutertre-arithmetic` — tags: verification, arithmetic, sat, backend, mechanism, research, paper, reference, implemented, compiler, performance, infrastructure

**Outgoing:**
- [INFORMS] → [[arithmetic-theory]] — Fast linear arithmetic

## Dynamic / Reflection
`dynamic-reflection` — tags: type-system, verification, runtime, ffi, speculative, concept, principle, normalization, dependent, modality, infrastructure, migration, sat, language, problem

**Outgoing:**
- [COMPOSES_WITH] → [[verification-pipeline]] — Proof-gated casts
- [COERCES_TO] → [[pi-types]] — Safe cast via proof

## EB.Term
`eb-term` — tags: ast, ir, elaboration, code, dependent, row-types, modality, continuation, recursion, syntax, inference, implemented

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
- [[mir-lowering]] [CONSUMES] → — EB.Term for IR translation
- [[closures]] [WRAPS] → — Deferred substitution (EB.Term + Context)

## Effects as modality
`effects-as-modality` — tags: modality, effect, continuation, type-system, speculative, pattern, principle, lowering, mir, runtime, codegen, project, research

**Outgoing:**
- [EXTENDS] → [[modalities]] — Effects tracked as modalities
- [EXTENDS] → [[shift-reset]] — Effect system over continuations
- [COMPOSES_WITH] → [[verification-pipeline]] — Effect verification
- [COMPOSES_WITH] → [[shift-reset]] — Effect system over continuations

**Incoming:**
- [[petricek-orchard]] [INSPIRES] → — Coeffect framework
- [[koka-influence]] [INSPIRES] → — Effect tracking model

## egglog (Influence)
`egglog-influence` — tags: research, reference, rewriting, sat, mir, lowering, compiler, pattern, infrastructure, planned

**Outgoing:**
- [INSPIRES] → [[logram]] — Equality saturation
- [INSPIRES] → [[dpo-rewriting]] — E-graph rewriting
- [MIRRORS] → [[logram]] — Equality saturation ↔ graph saturation

**Incoming:**
- [[logram]] [USES] → — Equality saturation substrate

## Elaboration context
`elaboration-context` — tags: mechanism, elaboration, monad, ffi, tracing, inference, normalization, unification, display, error-handling, infrastructure, implemented

**Outgoing:**
- [ENABLES] → [[elaboration]] — Central context
- [INCLUDES] → [[implicit-environment]] — Δ in context
- [THREADS_THROUGH] → [[elaboration-monad]] — Reader component
- [THREADS_THROUGH] → [[lambda]] — Binder extension
- [THREADS_THROUGH] → [[pi-types]] — Binder extension
- [THREADS_THROUGH] → [[match]] — Binder extension

**Incoming:**
- [[implicit-environment]] [THREADS_THROUGH] → — ctx.implicits
- [[module-system]] [PRODUCES] → — Interface tables
- [[sigma-bindings]] [THREADS_THROUGH] → — ctx.sigma map
- [[context-operations]] [ENABLES] → — Bind, extend, augment, prune
- [[provenance-system]] [THREADS_THROUGH] → — ctx.trace stack
- [[repl]] [THREADS_THROUGH] → — Persistent ctx
- [[elaboration-monad]] [THREADS_THROUGH] → — Reader component
- [[v2-track]] [THREADS_THROUGH] → — Extends ctx.trace per step
- [[blocks]] [INTRODUCES] → — Local scope via let bindings
- [[ffi]] [ENCODES] → — External functions as Var(Foreign)
- [[module-system]] [THREADS_THROUGH] → — ctx.imports

## Elaboration monad (V2)
`elaboration-monad` — tags: mechanism, pattern, monad, elaboration, code, inference, unification, tracing, error-handling, continuation, performance, implemented

**Outgoing:**
- [USES] → [[meta-variables]] — Monad state component manages the meta store
- [USES] → [[unification]] — Monad writer accumulates constraints consumed by unification
- [ENABLES] → [[shift-reset]] — Via MutState.skolems
- [THREADS_THROUGH] → [[elaboration-context]] — Reader component
- [PROPAGATES_VIA] → [[generator-monad]] — Generator yield protocol
- [WRAPS] → [[generator-monad]] — ReaderWriterStateEither algebraic structure
- [DELEGATES_TO] → [[nondeterminism]] — MutState for skolems, metas
- [ENABLES] → [[elaboration]] — Monadic pipeline
- [ENABLES] → [[v2-elaboration-pipeline]] — V2 pipeline
- [THREADS_THROUGH] → [[meta-variables]] — MutState manages meta store

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
- [[meta-variables]] [THREADS_THROUGH] → — MutState.supply, ctx.metas
- [[nondeterminism-multishot]] [THREADS_THROUGH] → — MutState.nondeterminism
- [[nondeterminism]] [THREADS_THROUGH] → — MutState.nondeterminism.solution

## Elaboration (hub)
`elaboration` — tags: elaboration, mechanism, parser, inference, normalization, verification, lowering, project, reference, milestone, migration, implemented

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
- [[elaboration-monad]] [ENABLES] → — Monadic pipeline
- [[bidirectional-checking]] [DISPATCHES_ON] → — Check vs infer mode
- [[functional-patterns]] [REQUIRES] → — Elaboration redesign needed
- [[logic-programming]] [INSPIRES] → — miniKanren-like relational fragments

## Elm / OCaml (Influence)
`elm-ocaml-influence` — tags: research, reference, row-types, type-system, elaboration, inference, pattern, language, implemented, syntax

**Outgoing:**
- [INSPIRES] → [[row-polymorphism]] — Row types approach
- [INSPIRES] → [[variant-types]] — Polymorphic variants

## Equirecursive types (μ in Yap)
`equirecursive-types` — tags: type-system, recursion, incomplete, elaboration, normalization, unification, concept, mechanism, problem, inference, solver, performance, testing, decision, drift

**Outgoing:**
- [EXTENDS] → [[mu-types]] — Beyond simple unfolding
- [REVISES] → [[mu-type-unification]] — Toward full bisimulation
- [PRESERVES] → [[unification]] — Type equality under finite unfolding
- [REWRITES] → [[mu-types]] — Unfold-and-recurse during unification
- [DETECTS] → [[nbe]] — Infinite unfolding (step limit)
- [DELEGATES_TO] → [[mu-type-unification]] — Checking delegation

**Incoming:**
- [[termination-checking]] [EXTENDS] → — Guardedness
- [[mu-type-unification]] [IMPLEMENTS] → — Current approach

## Erlang Codegen
`erlang-codegen` — tags: codegen, backend, mir, compiler, lowering, runtime, testing, ir, project, reference, cli, in-progress

**Outgoing:**
- [TRANSLATES_TO] → [[ffi]] — Erlang source output

**Incoming:**
- [[yap]] [INCLUDES] → — Erlang backend
- [[mir-lowering]] [PRODUCES] → — MIR → Erlang
- [[gram]] [TRANSLATES_TO] → — Target-specific passes

## Error causes (`Err.Cause`)
`error-causes` — tags: error-handling, elaboration, inference, unification, verification, problem, mechanism, display, row-types, modality, infrastructure, implemented

**Outgoing:**
- [REPORTS] → [[unification-algorithm]] — Type error rendering
- [USES] → [[nf-display]] — Zonked NF in messages
- [DISPATCHES_ON] → [[nf-value]] — UnificationFailure, RowMismatch, etc.

**Incoming:**
- [[error-propagation]] [USES] → — Lifts into monad
- [[provenance-display]] [REPORTS] → — Error paths

## Error propagation (`V2.fail`, `V2.Do`)
`error-propagation` — tags: monad, elaboration, error-handling, inference, mechanism, continuation, tracing, pattern, code, performance, tooling, implemented

**Outgoing:**
- [USES] → [[error-causes]] — Lifts into monad
- [USES] → [[provenance-system]] — Carries trace
- [PROPAGATES_VIA] → [[elaboration-monad]] — V2.fail + yield

**Incoming:**
- [[provenance-system]] [ENABLES] → — Meaningful errors need context

## EUF theory
`euf-theory` — tags: verification, mechanism, planned, backend, reference, project, unification, ast, ir, sat, ffi, normalization, inference, milestone, arithmetic

**Outgoing:**
- [IMPLEMENTS] → [[theory-plugin-interface]] — Congruence closure
- [ENABLES] → [[quantifier-engine]] — Trigger matching
- [MIRRORS] → [[unification-algorithm]] — Term equality ↔ type equality
- [RESOLVES] → [[unification]] — Congruence propagation
- [WRAPS] → [[cdcl-t-solver]] — Hash-consed term arena shared across theories
- [TRAVERSES] → [[cdcl-t-solver]] — Trigger matching over e-class arena

**Incoming:**
- [[quantifier-engine]] [DELEGATES_TO] → — E-matching
- [[milestone-2-euf-quant-lia]] [PRODUCES] → — EUF module
- [[quantifier-engine]] [DISPATCHES_ON] → — Triggers → E-match, none → bounded MBQI
- [[quantifier-engine]] [USES] → — E-matching over arena

## Evaluation step limit
`evaluation-step-limit` — tags: normalization, elaboration, performance, mechanism, error-handling, implemented, recursion, runtime, inference, tracing, testing, ir

**Outgoing:**
- [CONSTRAINS] → [[trampoline-evaluator]] — Prevents non-termination
- [DETECTS] → [[nbe]] — Infinite loops
- [ADDRESSES] → [[nbe]] — Non-termination prevention

## Exhaustiveness checking
`exhaustiveness-checking` — tags: type-system, elaboration, inference, pattern, problem, incomplete, testing, syntax, ast, migration, dependent, recursion, tooling

**Outgoing:**
- [EXTENDS] → [[match]] — Safety gap

## FFI Saturation
`ffi-saturation` — tags: ffi, lowering, mir, mechanism, codegen, backend, runtime, continuation, monad, testing, primitive, implemented

**Outgoing:**
- [EXTENDS] → [[ffi]] — Partial application handling
- [RELIES_ON] → [[mir-lowering]] — Lowering step
- [PRESERVES] → [[lambda]] — Calling convention via closures

## FFI
`ffi` — tags: ffi, elaboration, syntax, lowering, codegen, runtime, mir, dependent, strings, arithmetic, project, parser, implemented

**Outgoing:**
- [RELIES_ON] → [[mir-lowering]] — Saturation
- [LACKS] → [[type-erasure]] — Needs dummy type args
- [TRANSLATES_TO] → [[js-codegen]] — Curried JS functions
- [ENCODES] → [[elaboration-context]] — External functions as Var(Foreign)
- [TRANSLATES_TO] → [[js-codegen]] — Curried JS functions (.ffi.js companions)

**Incoming:**
- [[lists]] [ENCODES] → — Indexed Num T defaultArray (foreign)
- [[dictionaries]] [ENCODES] → — Indexed String T defaultHashMap (foreign)
- [[ffi-saturation]] [EXTENDS] → — Partial application handling
- [[variable-evaluation-dispatch]] [IMPLEMENTS] → — Foreign variable lookup
- [[type-erasure]] [ADDRESSES] → — Dummy type args
- [[js-codegen]] [TRANSLATES_TO] → — JavaScript source output
- [[c-codegen]] [TRANSLATES_TO] → — C source output
- [[erlang-codegen]] [TRANSLATES_TO] → — Erlang source output
- [[primitive-signature]] [USES] → — Foreign δ-rules
- [[saturation]] [DISPATCHES_ON] → — Known-arity foreign/ref functions

## Flex–flex unification
`flex-flex-unification` — tags: type-system, elaboration, normalization, unification, inference, dependent, metavariable, mechanism, pattern, code, monad, tracing, implemented

**Outgoing:**
- [SPECIALIZES] → [[unification-algorithm]] — Both unsolved
- [RESOLVES] → [[meta-variables]] — Binds left to right

## Flex–rigid unification
`flex-rigid-unification` — tags: type-system, elaboration, normalization, unification, inference, dependent, modality, mechanism, principle, code, error-handling, implemented

**Outgoing:**
- [SPECIALIZES] → [[unification-algorithm]] — Meta vs rigid
- [RESOLVES] → [[meta-variables]] — Binds to rigid
- [RECOVERS_FROM] → [[substitution-system]] — Chases solved metas

## Functional patterns
`functional-patterns` — tags: speculative, elaboration, inference, syntax, pattern, dependent, modality, effect, problem, ast, migration, language, verification, principle

**Outgoing:**
- [EXTENDS] → [[match]] — Curry-style patterns, view patterns
- [REQUIRES] → [[elaboration]] — Elaboration redesign needed

## Ge & de Moura — complete instantiation for quantified SMT
`ge-de-moura-quantifiers` — tags: verification, quantifiers, sat, mechanism, research, paper, reference, implemented, compiler, inference, backend

**Outgoing:**
- [INFORMS] → [[quantifier-engine]] — Complete instantiation

## Generalization (let bindings)
`generalization` — tags: type-system, elaboration, normalization, unification, inference, mechanism, concept, dependent, monad, compiler, code, polymorphism, metavariable, reference, implemented

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
- [[implicit-resolution]] [PRESERVES] → — Rejects subst-producing candidates
- [[implicit-resolution]] [COMPOSES_WITH] → — Deferred resolution preserves generality

## Generator monad
`generator-monad` — tags: elaboration, monad, inference, mechanism, decision, implemented, continuation, tracing, code, unification, verification, migration

**Outgoing:**
- [IMPLEMENTS] → [[elaboration-monad]] — Generator yield protocol
- [ENCODES] → [[elaboration-monad]] — RWSE as generator

**Incoming:**
- [[elaboration-monad]] [PROPAGATES_VIA] → — Generator yield protocol
- [[elaboration-monad]] [WRAPS] → — ReaderWriterStateEither algebraic structure

## GHC (Influence)
`ghc-influence` — tags: research, reference, type-system, inference, elaboration, constraint, solver, monad, compiler, in-progress

**Outgoing:**
- [INSPIRES] → [[generalization]] — Let-polymorphism
- [INSPIRES] → [[deferred-constraint-solving]] — Constraint deferral
- [INSPIRES] → [[modalities]] — Levity polymorphism precedent

## Additive enrichment (GRAM)
`gram-additive-enrichment` — tags: principle, graph, ir, compiler, lowering, decision

**Outgoing:**
- [CONSTRAINS] → [[gram]] — All passes must follow
- [CONTRASTS_WITH] → [[mir-lowering]] — MIR erases/replaces; GRAM accumulates
- [ENABLES] → [[compilation-by-selection]] — Multiple views enable selection
- [MIRRORS] → [[mlir-influence]] — Multi-dialect coexistence pattern

**Incoming:**
- [[compilation-by-selection]] [RELIES_ON] → — Requires accumulated views
- [[gram-shift-reset-pass]] [INSTANTIATES] → — Adds bubble/continuation/resumption alongside existing nodes
- [[gram-pattern-pass]] [INSTANTIATES] → — :decision_tree edge exemplifies principle
- [[gram-to-mir-bridge]] [VALIDATES] → — Tests if enrichment is sufficient

## GRAM as S-expressions
`gram-as-s-expressions` — tags: lowering, decision, rejected, graph, ir, ast, syntax, rewriting, compiler, infrastructure, reference, display, migration

**Outgoing:**
- [REJECTS] → [[gram]] — Rejected representation

**Incoming:**
- [[gram]] [REJECTS] → — Cycles break tree model

## Dataflow semantics (GRAM)
`gram-dataflow-semantics` — tags: concept, graph, ir, compiler, principle, performance, backend

**Outgoing:**
- [CONSTRAINS] → [[gram]] — No forced sequencing in graph
- [CONTRASTS_WITH] → [[mir-lowering]] — Partial order vs total order (blocks)
- [CONTRASTS_WITH] → [[shift-reset-mir-lowering]] — Dependency edges vs jump sequences
- [ENABLES] → [[native-lambda-hvm]] — Parallel reduction compatible
- [ENABLES] → [[compilation-by-selection]] — Independence enables selectivity

**Incoming:**
- [[compilation-by-selection]] [RELIES_ON] → — Requires independence
- [[gram-shift-reset-pass]] [INSTANTIATES] → — Resumptions unordered

## Pattern decision tree pass (GRAM)
`gram-pattern-pass` — tags: lowering, graph, ir, mechanism, implemented, rewriting

**Outgoing:**
- [RELIES_ON] → [[gram-pattern-translation]] — Reads pat:* nodes as input
- [IMPLEMENTS] → [[gram]] — Pipeline pass
- [USES] → [[maranget-paper]] — Decision tree algorithm
- [PRESERVES] → [[match]] — match/case/pat nodes unchanged
- [INSTANTIATES] → [[gram-additive-enrichment]] — :decision_tree edge exemplifies principle
- [FOLLOWS] → [[gram-shift-reset-pass]] — Pipeline ordering

**Incoming:**
- [[pattern-matching-compilation]] [INCLUDES] → — Compilation phase
- [[gram-pattern-translation]] [ENABLES] → — Makes patterns graph-queryable
- [[gram]] [INCLUDES] → — Pipeline pass
- [[gram-to-mir-bridge]] [RELIES_ON] → — Needs decision trees
- [[pattern-algorithm-choice]] [CONSTRAINS] → — Algorithm for the pass
- [[stg-analogy]] [DISTINGUISHES] → — Pass = Cmm-level (operational)
- [[dpo-vs-imperative-passes]] [APPLIES_TO] → — Pattern pass is imperative/aggregate
- [[dpo-vs-imperative-passes]] [ENABLES] → — Downstream optimizations on decision tree are DPO

## Pattern graph translation (GRAM)
`gram-pattern-translation` — tags: lowering, graph, ir, mechanism, implemented, ast

**Outgoing:**
- [IMPLEMENTS] → [[gram]] — Part of translate.ts
- [TRANSLATES_TO] → [[match]] — EB.Pattern → pat:* graph nodes
- [ENABLES] → [[gram-pattern-pass]] — Makes patterns graph-queryable
- [COMPOSES_WITH] → [[closure-conversion]] — pat:binder pushes onto binder stack

**Incoming:**
- [[pattern-matching-compilation]] [INCLUDES] → — Representation phase
- [[gram-pattern-pass]] [RELIES_ON] → — Reads pat:* nodes as input
- [[gram]] [INCLUDES] → — Translation phase
- [[stg-analogy]] [DISTINGUISHES] → — Translation = STG-level (semantic)

## Shift/reset enrichment pass (GRAM)
`gram-shift-reset-pass` — tags: continuation, lowering, graph, ir, mechanism, implemented

**Outgoing:**
- [IMPLEMENTS] → [[gram]] — Pipeline pass
- [IMPLEMENTS] → [[shift-reset]] — In GRAM context
- [CONTRASTS_WITH] → [[shift-reset-mir-lowering]] — Annotation vs state machine
- [PRESERVES] → [[shift-reset]] — reset/shift nodes unchanged
- [INSTANTIATES] → [[gram-additive-enrichment]] — Adds bubble/continuation/resumption alongside existing nodes
- [INSTANTIATES] → [[gram-dataflow-semantics]] — Resumptions unordered
- [FOLLOWS] → [[saturation]] — Pipeline order

**Incoming:**
- [[gram-pattern-pass]] [FOLLOWS] → — Pipeline ordering
- [[gram]] [INCLUDES] → — Pipeline pass
- [[gram-to-mir-bridge]] [RELIES_ON] → — Needs continuation structure
- [[dpo-vs-imperative-passes]] [APPLIES_TO] → — Shift-reset pass is imperative/aggregate

## GRAM step 1 (substrate)
`gram-step-1` — tags: lowering, migration, implemented, graph, ir, elaboration, parser, mir, compiler, infrastructure, milestone, project, testing

**Outgoing:**
- [IMPLEMENTS] → [[gram]] — Partial — first step
- [FOLLOWS] → [[mir-retrospective]] — Lessons learned inform first step
- [TRANSLATES_TO] → [[gram]] — EB.Term → GRAM nodes

## GRAM → MIR bridge
`gram-to-mir-bridge` — tags: lowering, speculative, ir, graph, compiler, mir, planned

**Outgoing:**
- [CONSUMES] → [[gram]] — Reads enriched graph
- [PRODUCES] → [[mir-lowering]] — Emits MIR Module
- [VALIDATES] → [[gram-additive-enrichment]] — Tests if enrichment is sufficient
- [RELIES_ON] → [[gram-shift-reset-pass]] — Needs continuation structure
- [RELIES_ON] → [[gram-pattern-pass]] — Needs decision trees
- [RELIES_ON] → [[saturation]] — Needs external/primop
- [RELIES_ON] → [[closure-conversion]] — Needs env/fn nodes

## GRAM (hub)
`gram` — tags: lowering, rewriting, compiler, implemented, graph, ir, project, infrastructure, mir, tooling, cli, display

**Outgoing:**
- [SUPERSEDES] → [[mir-lowering]] — As IR approach
- [REWRITES] → [[dpo-rewriting]] — DPO rules refine graph
- [PRESERVES] → [[nbe]] — Semantic equivalence per pass
- [TRANSLATES_TO] → [[js-codegen]] — Target-specific passes
- [TRANSLATES_TO] → [[c-codegen]] — Target-specific passes
- [TRANSLATES_TO] → [[erlang-codegen]] — Target-specific passes
- [DELEGATES_TO] → [[dpo-rewriting]] — Graph transformation engine
- [REJECTS] → [[gram-as-s-expressions]] — Cycles break tree model
- [INCLUDES] → [[gram-shift-reset-pass]] — Pipeline pass
- [INCLUDES] → [[gram-pattern-translation]] — Translation phase
- [INCLUDES] → [[gram-pattern-pass]] — Pipeline pass
- [GENERALIZES] → [[mir-lowering]] — Richer representation subsumes sequential form

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
- [[gram-step-1]] [TRANSLATES_TO] → — EB.Term → GRAM nodes
- [[logram]] [TRANSLATES_TO] → — Triple store / Datalog facts
- [[dpo-rewriting]] [REWRITES] → — L ← K → R rule application on nodes
- [[mlir-influence]] [MIRRORS] → — Dialects ↔ tag vocabularies, passes ↔ rewrites
- [[structural-vs-representational-passes]] [DISTINGUISHES] → — Eta/beta/fold before closure-conv/defunc
- [[gram-additive-enrichment]] [CONSTRAINS] → — All passes must follow
- [[gram-dataflow-semantics]] [CONSTRAINS] → — No forced sequencing in graph
- [[gram-shift-reset-pass]] [IMPLEMENTS] → — Pipeline pass
- [[gram-pattern-translation]] [IMPLEMENTS] → — Part of translate.ts
- [[gram-pattern-pass]] [IMPLEMENTS] → — Pipeline pass
- [[gram-to-mir-bridge]] [CONSUMES] → — Reads enriched graph
- [[stg-analogy]] [INFORMS] → — Pipeline layering inspiration
- [[dpo-vs-imperative-passes]] [CONSTRAINS] → — Pass implementation guide

## Higher-order in formulas
`higher-order-in-formulas` — tags: verification, type-system, decision, implemented, elaboration, dependent, modality, backend, ast, ffi, quantifiers, inference, reference, project, recursion

**Outgoing:**
- [CONSTRAINS] → [[quantifier-engine]] — No HO quantification

## Hindley–Milner (and what Yap actually does)
`hindley-milner` — tags: concept, type-system, mechanism, unification, elaboration, inference, incomplete, reference, monad, constraint, generalization, row-types, dependent, solver, migration

**Outgoing:**
- [INFORMS] → [[generalization]] — Let-polymorphism theory
- [INFORMS] → [[meta-variables]] — Unification-based inference

**Incoming:**
- [[yap]] [EXTENDS] → — HM + row variables + dependent types
- [[row-polymorphism]] [EXTENDS] → — Parametric extension via row variables
- [[generalization]] [IMPLEMENTS] → — Yap's implementation of HM let-generalization
- [[system-f]] [INFORMS] → — Explicit polymorphism

## Holes
`holes` — tags: syntax, elaboration, inference, unification, metavariable, solver, mechanism, parser, ast, dependent, implemented, monad, constraint, testing, codegen, drift

**Outgoing:**
- [INSTANTIATES] → [[meta-variables]] — Fresh meta per hole

**Incoming:**
- [[substitution-system]] [ZONKS] → — Fresh metas after solving
- [[zonking]] [ZONKS] → — Metas after constraint solving

## Brady — Quantitative Type Theory in Idris 2
`idris-1-qtt-paper` — tags: modality, type-system, elaboration, dependent, syntax, parser, mechanism, research, paper, reference, implemented, language, concept

**Outgoing:**
- [INSPIRES] → [[modalities]] — Quantity tracking

## Idris 2 (Influence)
`idris-2-influence` — tags: research, reference, dependent, elaboration, unification, inference, solver, metavariable, language, implemented

**Outgoing:**
- [INSPIRES] → [[meta-variables]] — Contextual metas
- [INSPIRES] → [[bidirectional-checking]] — TT core
- [INSPIRES] → [[dependent-types]] — Dependent TT
- [INSPIRES] → [[solver]] — Unification approach

## Implicit environment (`ctx.implicits`)
`implicit-environment` — tags: elaboration, inference, type-system, normalization, context, mechanism, row-types, compiler, code, reference, display, monad, unification, parser, implemented

**Outgoing:**
- [ENABLES] → [[implicit-resolution]] — Provides Δ
- [THREADS_THROUGH] → [[elaboration-context]] — ctx.implicits

**Incoming:**
- [[elaboration-context]] [INCLUDES] → — Δ in context
- [[block-level-using-gap]] [APPLIES_TO] → — Block-local Δ
- [[typeclass-emulation]] [ENCODES] → — Instances as record values in Δ

## Solver: `resolve` constraints
`implicit-resolution-solver` — tags: elaboration, solver, unification, inference, mechanism, normalization, type-system, compiler, code, performance, principle, testing, monad, implemented

**Outgoing:**
- [IMPLEMENTS] → [[implicit-resolution]] — Solver-side mechanism
- [USES] → [[unification-algorithm]] — Candidate matching
- [PRESERVES] → [[generalization]] — Rejects subst-producing candidates

**Incoming:**
- [[solver]] [DELEGATES_TO] → — Resolve constraints
- [[solver-dispatch]] [USES] → — Resolve → Δ lookup

## Implicit resolution (constraints)
`implicit-resolution` — tags: elaboration, inference, unification, solver, mechanism, constraint, dependent, compiler, code, ast, normalization, monad, error-handling, implemented

**Outgoing:**
- [EXTENDS] → [[implicits]] — Resolver mechanism
- [RESOLVES] → [[constraint-types]] — Δ lookup for resolve constraints
- [COMPOSES_WITH] → [[pi-types]] — Implicit Pi triggers insertion
- [DISPATCHES_ON] → [[constraint-types]] — Resolve → Δ, assign → unify
- [DELEGATES_TO] → [[solver-dispatch]] — Batch processing
- [PRESERVES] → [[generalization]] — Rejects subst-producing candidates
- [INSTANTIATES] → [[meta-variables]] — Insertion creates fresh unknowns
- [RESOLVES] → [[deferred-constraint-solving]] — At let boundaries
- [COMPOSES_WITH] → [[generalization]] — Deferred resolution preserves generality

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
- [[solver-dispatch]] [RESOLVES] → — Resolve type → Δ lookup
- [[solver]] [ENABLES] → — Δ lookup phase

## Implicits as coeffects (design sketch)
`implicits-as-coeffects` — tags: elaboration, inference, modality, effect, dependent, type-system, principle, rewriting, compiler, pattern, migration, tracing, monad, reference, infrastructure, tooling

**Outgoing:**
- [REVISES] → [[implicit-resolution]] — Coeffect-based approach

**Incoming:**
- [[petricek-orchard]] [INSPIRES] → — Context-dependence calculus

## Implicit arguments
`implicits` — tags: elaboration, inference, type-system, normalization, checking, syntax, parser, codegen, compiler, dependent, ast, mechanism, pattern, language, migration

**Outgoing:**
- [USES] → [[meta-variables]] — Inserts metas at call sites for implicit params
- [RELIES_ON] → [[unification]] — Unification-driven resolution solves implicit metas

**Incoming:**
- [[generalization]] [PRODUCES] → — Generalization wraps terms in implicit lambdas
- [[implicit-resolution]] [EXTENDS] → — Resolver mechanism

## Injection
`injection` — tags: type-system, elaboration, inference, syntax, ast, mechanism, implemented, pattern, parser, row-types, dependent, sugar

**Outgoing:**
- [INTRODUCES] → [[structural-records]] — Field extension
- [INTRODUCES] → [[variant-types]] — Tag injection
- [DISPATCHES_ON] → [[nf-value]] — Neutral, Var, Schema, Variant, Sigma

**Incoming:**
- [[projection]] [DUAL_OF] → — Elim vs intro for row-backed types
- [[row-rewriting]] [ENABLES] → — Row extension

## JS Codegen
`js-codegen` — tags: codegen, backend, mir, elaboration, compiler, lowering, runtime, ast, ir, cli, testing, incomplete, implemented

**Outgoing:**
- [TRANSLATES_TO] → [[ffi]] — JavaScript source output

**Incoming:**
- [[yap]] [INCLUDES] → — JS backend
- [[mir-lowering]] [PRODUCES] → — MIR → JS
- [[ffi]] [TRANSLATES_TO] → — Curried JS functions
- [[gram]] [TRANSLATES_TO] → — Target-specific passes
- [[type-erasure]] [ENABLES] → — Cleaner codegen
- [[repl]] [USES] → — Code generation
- [[ffi]] [TRANSLATES_TO] → — Curried JS functions (.ffi.js companions)

## Knot-Tying (Recursive Evaluation)
`knot-tying` — tags: normalization, mechanism, implemented, recursion, elaboration, inference, dependent, runtime, ir, ast, error-handling, performance, reference

**Outgoing:**
- [ENABLES] → [[generalization]] — Recursive let evaluation
- [ENABLES] → [[mu-type-unification]] — Recursive self-reference
- [INSTANTIATES] → [[nbe]] — Placeholder entry
- [IMPLEMENTS] → [[blocks]] — Recursive let self-referential evaluation
- [IMPLEMENTS] → [[typing-rules]] — Recursive types (Mu) typing (no spec)
- [WRAPS] → [[nbe]] — Placeholder entry mutated after evaluation

## Koka (Influence)
`koka-influence` — tags: research, reference, effect, continuation, cps, lowering, mir, codegen, principle, runtime, speculative

**Outgoing:**
- [INSPIRES] → [[selective-cps]] — Evidence passing model
- [CONTRASTS_WITH] → [[shift-reset]] — Evidence passing vs direct capture
- [INSPIRES] → [[effects-as-modality]] — Effect tracking model

## Label lookup (`:field`)
`label-lookup` — tags: elaboration, row-types, dependent, inference, syntax, parser, mechanism, ast, normalization, unification, display, implemented

**Outgoing:**
- [USES] → [[sigma-bindings]] — :label → sigma entry
- [RESOLVES] → [[sigma-bindings]] — Label references

## Lambda
`lambda` — tags: syntax, elaboration, dependent, inference, mechanism, parser, ast, normalization, implemented, monad, lowering, codegen

**Outgoing:**
- [INTRODUCES] → [[pi-types]] — Intro form for functions
- [DUAL_OF] → [[application]] — Intro/elim pair for Pi
- [ENCODES] → [[closures]] — Function values as closures
- [DISPATCHES_ON] → [[pi-types]] — Explicit λ vs implicit λ{} icit matching
- [COMPOSES_WITH] → [[application]] — β-redex pair

**Incoming:**
- [[pi-types]] [GENERALIZES] → — Arrow → is non-dependent Pi
- [[pi-types]] [FORMS] → — Π is formation rule for functions
- [[loop-sugar]] [DESUGARS_TO] → — Tail-recursive functions
- [[ffi-saturation]] [PRESERVES] → — Calling convention via closures
- [[closure-conversion]] [ERASES] → — Flattens lexical scope
- [[de-bruijn-levels]] [ENABLES] → — Evaluation under binders
- [[closures]] [IMPLEMENTS] → — Closure = captured env + body
- [[elaboration-context]] [THREADS_THROUGH] → — Binder extension
- [[application]] [DUAL_OF] → — Intro/elim pair for Pi
- [[closures]] [PRESERVES] → — Lexical scope captured at binding site
- [[application]] [COMPOSES_WITH] → — β-redex pair
- [[closure-conversion]] [ERASES] → — Flattens lexical scope to heap allocation

## Lean 4 (Influence)
`lean-4-influence` — tags: research, reference, elaboration, normalization, unification, monad, metavariable, compiler, inference, tracing, implemented

**Outgoing:**
- [INSPIRES] → [[nbe]] — NbE architecture
- [INSPIRES] → [[meta-variables]] — Instantiation strategy
- [INSPIRES] → [[elaboration-monad]] — Pipeline discipline
- [INSPIRES] → [[zonking]] — Substitution application

## Level-to-Index Conversion
`level-to-index-conversion` — tags: normalization, elaboration, mechanism, implemented, syntax, ast, ir, inference, dependent, type-system, migration, reference, code

**Outgoing:**
- [USES] → [[de-bruijn-indices]] — Target representation
- [USES] → [[de-bruijn-levels]] — Source representation

**Incoming:**
- [[quoting]] [USES] → — Core conversion

## Levels vs Indices
`levels-vs-indices` — tags: elaboration, normalization, decision, implemented, type-system, inference, dependent, syntax, ast, ir, mechanism, migration, reference

**Outgoing:**
- [APPLIES_TO] → [[de-bruijn]] — Representation split
- [APPLIES_TO] → [[nbe]] — Levels for evaluation
- [MOTIVATES] → [[de-bruijn-indices]] — Index representation choice
- [MOTIVATES] → [[de-bruijn-levels]] — Level representation choice

## Liang et al. — DPLL(T) string + regex theory (CAV 2014)
`liang-strings` — tags: verification, sat, strings, research, paper, reference, quantifiers, backend, incomplete, performance

**Outgoing:**
- [INFORMS] → [[string-theory]] — DPLL(T) string solver

## Liquid Haskell (Influence)
`liquid-haskell-influence` — tags: research, reference, verification, sat, quantifiers, arithmetic, solver, implemented, modality, type-system

**Outgoing:**
- [INSPIRES] → [[refinement-types]] — SMT automation
- [INSPIRES] → [[smt-translation]] — VC generation pipeline
- [INSPIRES] → [[vc-ir]] — Formula fragment

## Lists
`lists` — tags: type-system, elaboration, inference, syntax, ast, mechanism, ffi, implemented, sugar, row-types, normalization, testing

**Outgoing:**
- [ENCODES] → [[ffi]] — Indexed Num T defaultArray (foreign)
- [CONTRASTS_WITH] → [[tuples]] — Homogeneous indexed vs heterogeneous positional

**Incoming:**
- [[dictionaries]] [MIRRORS] → — Same Indexed encoding, different index
- [[records-indexed-separation]] [ADDRESSES] → — Indexed vs plain record clarity

## Logic Programming
`logic-programming` — tags: research, speculative, elaboration, inference, unification, solver, recursion, quantifiers, decision, problem, language

**Outgoing:**
- [INSPIRES] → [[elaboration]] — miniKanren-like relational fragments
- [USES] → [[unification]] — Relational reasoning via unification

## LoGRAM
`logram` — tags: lowering, speculative, rewriting, graph, planned, infrastructure, compiler, reference, ffi, tooling, project

**Outgoing:**
- [EXTENDS] → [[gram]] — Speculative substrate
- [TRANSLATES_TO] → [[gram]] — Triple store / Datalog facts
- [USES] → [[egglog-influence]] — Equality saturation substrate

**Incoming:**
- [[egglog-influence]] [INSPIRES] → — Equality saturation
- [[egglog-influence]] [MIRRORS] → — Equality saturation ↔ graph saturation

## Loop sugar
`loop-sugar` — tags: deferred, syntax, sugar, recursion, language, parser, elaboration, compiler, migration, backend, principle, decision, infrastructure, lowering

**Outgoing:**
- [DESUGARS_TO] → [[lambda]] — Tail-recursive functions

## Language Server Protocol (LSP)
`lsp` — tags: planned, tooling, cli, migration, elaboration, inference, parser, infrastructure, reference, display, error-handling, drift, ast, project, normalization

**Outgoing:**
- [REPORTS] → [[yap]] — Language server protocol
- [USES] → [[v2-elaboration-pipeline]] — Incremental analysis
- [USES] → [[tree-sitter-parser]] — Incremental parsing

## Maranget — compiling pattern matching to decision trees (2008)
`maranget-paper` — tags: lowering, mir, pattern, mechanism, compiler, research, paper, reference, implemented, ast, codegen

**Outgoing:**
- [INFORMS] → [[pattern-matching-compilation]] — Decision-tree construction
- [SUPERSEDES] → [[augustsson-paper]] — Better column selection, no body duplication

**Incoming:**
- [[pattern-matching-compilation]] [USES] → — Decision-tree algorithm
- [[gram-pattern-pass]] [USES] → — Decision tree algorithm
- [[pettersson-paper]] [EXTENDS] → — DAG sharing over trees (deferred)
- [[pattern-algorithm-choice]] [USES] → — Chosen algorithm

## Match
`match` — tags: syntax, elaboration, lowering, mir, mechanism, parser, ast, dependent, implemented, codegen, compiler, inference, monad, error-handling

**Outgoing:**
- [ELIMINATES] → [[variant-types]] — Elim form for variants
- [LOWERS_TO] → [[pattern-matching-compilation]] — Decision trees
- [DUAL_OF] → [[tagged-values]] — Intro/elim pair for variants
- [DISPATCHES_ON] → [[variant-types]] — Variant, Struct, Lit, List, Wildcard, Binder
- [COMPOSES_WITH] → [[tagged-values]] — Intro/elim pair for variants

**Incoming:**
- [[exhaustiveness-checking]] [EXTENDS] → — Safety gap
- [[pattern-matching-compilation]] [DISPATCHES_ON] → — Pattern shape
- [[elaboration-context]] [THREADS_THROUGH] → — Binder extension
- [[pattern-matching-compilation]] [ERASES] → — Patterns removed after compilation
- [[functional-patterns]] [EXTENDS] → — Curry-style patterns, view patterns
- [[gram-pattern-translation]] [TRANSLATES_TO] → — EB.Pattern → pat:* graph nodes
- [[gram-pattern-pass]] [PRESERVES] → — match/case/pat nodes unchanged

## McBride — “I Got Plenty o’ Nuttin’” (2016)
`mcbride-nuttin` — tags: elaboration, type-system, modality, dependent, research, paper, reference, principle, quantifiers, monad, in-progress, inference

**Outgoing:**
- [INFORMS] → [[meta-variables]] — Contextual metavariables
- [INFORMS] → [[zonking]] — Postponed substitution

## Meta-variables
`meta-variables` — tags: elaboration, inference, unification, normalization, type-system, mechanism, concept, ast, compiler, code, substitution, dependent, metavariable, reference, implemented

**Outgoing:**
- [RELIES_ON] → [[unification]] — Metas are solved by unification
- [PRODUCES] → [[neutrals]] — Unsolved metas produce neutral terms
- [THREADS_THROUGH] → [[elaboration-monad]] — MutState.supply, ctx.metas

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
- [[row-polymorphism]] [INSTANTIATES] → — Fresh row variables (open tails)
- [[implicit-resolution]] [INSTANTIATES] → — Insertion creates fresh unknowns
- [[elaboration-monad]] [THREADS_THROUGH] → — MutState manages meta store
- [[continuation-binders]] [ENCODES] → — Resumption as meta in MutState.skolems
- [[string-theory]] [INSTANTIATES] → — Fresh witnesses for decomposition

## Milestone 1: IR boundary
`milestone-1-ir-boundary` — tags: verification, milestone, planned, reference, ir, normalization, sat, dependent, backend, project, inference, tooling, principle

**Outgoing:**
- [PRODUCES] → [[vc-ir]] — First deliverable
- [PRODUCES] → [[translation-boundary-vc]] — Translation tools
- [FOLLOWS] → [[z3-replacement-decision]] — First step

**Incoming:**
- [[milestone-2-euf-quant-lia]] [FOLLOWS] → — After IR

## Milestone 2: EUF + guarded quantifiers + linear arithmetic
`milestone-2-euf-quant-lia` — tags: verification, milestone, planned, reference, sat, arithmetic, quantifiers, backend, compiler, infrastructure, project, mechanism, inference, tracing

**Outgoing:**
- [PRODUCES] → [[cdcl-t-solver]] — Core solver
- [PRODUCES] → [[euf-theory]] — EUF module
- [PRODUCES] → [[arithmetic-theory]] — Arithmetic module
- [FOLLOWS] → [[milestone-1-ir-boundary]] — After IR

**Incoming:**
- [[milestone-3-strings]] [FOLLOWS] → — After core

## Milestone 3: String theory
`milestone-3-strings` — tags: verification, milestone, planned, strings, reference, sat, arithmetic, backend, compiler, mechanism, normalization, testing, project, drift, modality, tooling

**Outgoing:**
- [PRODUCES] → [[string-theory]] — String module
- [FOLLOWS] → [[milestone-2-euf-quant-lia]] — After core

**Incoming:**
- [[milestone-4-rows]] [FOLLOWS] → — After strings

## Milestone 4: Row theory
`milestone-4-rows` — tags: verification, milestone, planned, row-types, dependent, reference, sat, normalization, backend, inference, mechanism, pattern, project, migration, principle

**Outgoing:**
- [PRODUCES] → [[row-theory]] — Row module
- [FOLLOWS] → [[milestone-3-strings]] — After strings

**Incoming:**
- [[milestone-5-explanations]] [FOLLOWS] → — After rows

## Milestone 5: Explanations and models
`milestone-5-explanations` — tags: verification, milestone, planned, reference, sat, display, error-handling, tracing, backend, inference, tooling, testing, project, mechanism, principle, cli

**Outgoing:**
- [FOLLOWS] → [[milestone-4-rows]] — After rows
- [COMPOSES_WITH] → [[provenance-system]] — End-to-end error reporting
- [PRODUCES] → [[vc-provenance]] — Explanation/model infrastructure
- [ADDRESSES] → [[verification-pipeline]] — Error quality improvement

## MIR lowering (hub)
`mir-lowering` — tags: lowering, implemented, mir, compiler, codegen, backend, ir, elaboration, reference, continuation, ffi, testing

**Outgoing:**
- [CONSUMES] → [[v1-elaboration-pipeline]] — EB.Term input
- [PRODUCES] → [[js-codegen]] — MIR → JS
- [PRODUCES] → [[c-codegen]] — MIR → C
- [PRODUCES] → [[erlang-codegen]] — MIR → Erlang
- [TRANSLATES_TO] → [[eb-term]] — EB.Term → SSA blocks
- [ERASES] → [[pi-types]] — Types not preserved in MIR
- [TRAVERSES] → [[eb-term]] — Pattern-match walk
- [CONSUMES] → [[eb-term]] — EB.Term for IR translation

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
- [[shift-reset]] [TRANSLATES_TO] → — State machines (planned)
- [[repl]] [DISPATCHES_ON] → — Standard, --mir, --codegen modes
- [[mir-retrospective]] [REJECTS] → — Closure conversion mistake identified
- [[pattern-matching-compilation]] [TRANSLATES_TO] → — Maranget decision trees
- [[shift-reset-mir-lowering]] [TRANSLATES_TO] → — State machine (heap-allocated frames)
- [[defunctionalization]] [TRANSLATES_TO] → — Tagged dispatch on function identity
- [[closure-conversion]] [TRANSLATES_TO] → — Environment + function pointer
- [[gram-additive-enrichment]] [CONTRASTS_WITH] → — MIR erases/replaces; GRAM accumulates
- [[gram-dataflow-semantics]] [CONTRASTS_WITH] → — Partial order vs total order (blocks)
- [[compilation-by-selection]] [CONTRASTS_WITH] → — Pass selection vs fixed representation
- [[gram-to-mir-bridge]] [PRODUCES] → — Emits MIR Module
- [[gram]] [GENERALIZES] → — Richer representation subsumes sequential form
- [[stg-analogy]] [CONTRASTS_WITH] → — Monolithic (STG->Cmm) vs composable (GRAM passes)

## MIR retrospective
`mir-retrospective` — tags: lowering, decision, reference, mir, compiler, migration, graph, infrastructure, pattern, ir, project, display, testing

**Outgoing:**
- [INFORMS] → [[gram]] — Lessons learned
- [MOTIVATES] → [[gram]] — Why GRAM exists
- [REJECTS] → [[mir-lowering]] — Closure conversion mistake identified

**Incoming:**
- [[thorin-mimir-influence]] [INSPIRES] → — Calls = jumps
- [[gram-step-1]] [FOLLOWS] → — Lessons learned inform first step

## Missing spec: let-polymorphism
`missing-spec-let-polymorphism` — tags: type-system, elaboration, inference, normalization, infrastructure, problem, incomplete, migration, compiler, polymorphism, dependent, monad, solver, testing, reference, drift

**Outgoing:**
- [IMPLEMENTS] → [[generalization]] — No spec formalization
- [ADDRESSES] → [[documentation-debt]] — Spec gap

## Missing spec: recursive (`μ`) types
`missing-spec-recursive-types` — tags: recursion, type-system, elaboration, normalization, incomplete, problem, specification, ast, inference, dependent, compiler, testing, reference, drift, language

**Outgoing:**
- [IMPLEMENTS] → [[mu-type-unification]] — No spec formalization
- [ADDRESSES] → [[documentation-debt]] — Spec gap

## Missing Spec: Shift/Reset Typing
`missing-spec-shift-reset` — tags: continuation, type-system, elaboration, lowering, drift, incomplete, reference, inference, mir, compiler, backend, effect, ast, ir, project, migration, testing, verification, unification, problem, infrastructure

**Outgoing:**
- [IMPLEMENTS] → [[shift-reset]] — Impl ahead of spec
- [ADDRESSES] → [[documentation-debt]] — Spec gap

## Missing spec: Sigma (dependent records)
`missing-spec-sigma-types` — tags: dependent, row-types, type-system, elaboration, incomplete, specification, ast, inference, normalization, compiler, reference, problem, language

**Outgoing:**
- [IMPLEMENTS] → [[sigma-types]] — No spec formalization
- [ADDRESSES] → [[documentation-debt]] — Spec gap

## MLIR (Influence)
`mlir-influence` — tags: research, reference, mir, ir, lowering, codegen, backend, compiler, pattern, infrastructure, implemented

**Outgoing:**
- [INSPIRES] → [[gram]] — Open vocabulary / dialects
- [INSPIRES] → [[structural-vs-representational-passes]] — Pass scheduling
- [MIRRORS] → [[gram]] — Dialects ↔ tag vocabularies, passes ↔ rewrites

**Incoming:**
- [[gram-additive-enrichment]] [MIRRORS] → — Multi-dialect coexistence pattern

## Modalities (multiplicity + liquid)
`modalities` — tags: type-system, elaboration, inference, normalization, verification, syntax, modality, multiplicity, dependent, concept, pattern, incomplete, project

**Outgoing:**
- [APPLIES_TO] → [[pi-types]] — Quantity on domain
- [COMPOSES_WITH] → [[refinement-types]] — Modal + refined
- [COERCES_TO] → [[pi-types]] — Modal stripping during inference
- [COMPOSES_WITH] → [[pi-types]] — Graded function arguments

**Incoming:**
- [[modality-enforcement]] [FOLLOWS] → — Requires modality definitions
- [[modality-enforcement]] [ADDRESSES] → — Enforcement gap
- [[modality-polymorphism]] [EXTENDS] → — Polymorphism over modalities
- [[refinement-inference]] [REVISES] → — Strip → template revision
- [[effects-as-modality]] [EXTENDS] → — Effects tracked as modalities
- [[ghc-influence]] [INSPIRES] → — Levity polymorphism precedent
- [[idris-1-qtt-paper]] [INSPIRES] → — Quantity tracking
- [[modality-drift]] [ADDRESSES] → — Annotation vs type former
- [[vc-ir]] [ENCODES] → — Modal verification constraints
- [[modality-drift]] [DETECTS] → — Type former vs annotation inconsistency

## Modality drift: where shape lives vs what survives inference
`modality-drift` — tags: modality, type-system, elaboration, verification, inference, ast, drift, problem, pattern, unification, display, monad, project, incomplete

**Outgoing:**
- [ADDRESSES] → [[modalities]] — Annotation vs type former
- [MOTIVATES] → [[modality-enforcement]] — Gap needs fixing
- [CONTRASTS_WITH] → [[typing-rules]] — Type former vs annotation inconsistency
- [DETECTS] → [[modalities]] — Type former vs annotation inconsistency

## Modality enforcement
`modality-enforcement` — tags: modality, multiplicity, verification, elaboration, planned, constraint, solver, sat, type-system, mechanism, compiler, inference, cli, migration

**Outgoing:**
- [FOLLOWS] → [[modalities]] — Requires modality definitions
- [ADDRESSES] → [[modalities]] — Enforcement gap

**Incoming:**
- [[modality-polymorphism]] [REQUIRES] → — Depends on enforcement
- [[modality-drift]] [MOTIVATES] → — Gap needs fixing
- [[usages-deferred]] [ADDRESSES] → — Enforcement gap

## Modality polymorphism
`modality-polymorphism` — tags: modality, type-system, inference, elaboration, unification, planned, polymorphism, concept, solver, ast, compiler, reference, migration

**Outgoing:**
- [EXTENDS] → [[modalities]] — Polymorphism over modalities
- [REQUIRES] → [[modality-enforcement]] — Depends on enforcement

## Module system
`module-system` — tags: incomplete, compiler, syntax, inference, elaboration, parser, ffi, project, migration, ast, infrastructure, verification, normalization, monad, reference

**Outgoing:**
- [RELIES_ON] → [[v1-elaboration-pipeline]] — Not yet wired to v2
- [PRODUCES] → [[elaboration-context]] — Interface tables
- [THREADS_THROUGH] → [[elaboration-context]] — ctx.imports

**Incoming:**
- [[yap]] [INCLUDES] → — Module component
- [[mutual-recursion]] [EXTENDS] → — Multi-pass elaboration
- [[block-level-using-gap]] [DETECTS] → — Gap in implementation

## Monad split
`monad-split` — tags: elaboration, monad, problem, speculative, inference, migration, infrastructure, drift, normalization, unification, verification, lowering, continuation

**Outgoing:**
- [REVISES] → [[elaboration-monad]] — Addresses coupling

## Mu-type unification
`mu-type-unification` — tags: type-system, elaboration, normalization, unification, recursion, dependent, mechanism, ast, code, reference, migration, implemented

**Outgoing:**
- [SPECIALIZES] → [[unification-algorithm]] — Mu case
- [IMPLEMENTS] → [[equirecursive-types]] — Current approach
- [REWRITES] → [[mu-types]] — Unfolds and recurses

**Incoming:**
- [[equirecursive-types]] [REVISES] → — Toward full bisimulation
- [[missing-spec-recursive-types]] [IMPLEMENTS] → — No spec formalization
- [[knot-tying]] [ENABLES] → — Recursive self-reference
- [[equirecursive-types]] [DELEGATES_TO] → — Checking delegation

## Mu types
`mu-types` — tags: concept, type-system, elaboration, normalization, unification, recursion, ast, incomplete, inference, solver, substitution, evaluation, syntax, migration, reference

**Incoming:**
- [[unification]] [USES] → — Unfolds mu during structural comparison
- [[equirecursive-types]] [EXTENDS] → — Beyond simple unfolding
- [[mu-type-unification]] [REWRITES] → — Unfolds and recurses
- [[occurs-check]] [DETECTS] → — Cyclic types
- [[equirecursive-types]] [REWRITES] → — Unfold-and-recurse during unification

## Multishot Serialization
`multishot-serialization` — tags: continuation, lowering, mir, compiler, codegen, performance, deferred, mechanism, ir, runtime, infrastructure, testing, backend, reference, pattern, effect, elaboration, normalization, project, problem

**Outgoing:**
- [CONSTRAINS] → [[shift-reset-mir-lowering]] — Replay challenge
- [MOTIVATES] → [[selective-cps]] — Alternative approach

**Incoming:**
- [[selective-cps]] [ADDRESSES] → — Evidence passing alternative

## Mutual recursion
`mutual-recursion` — tags: recursion, row-types, dependent, elaboration, inference, testing, type-system, mir, compiler, incomplete, project, syntax

**Outgoing:**
- [EXTENDS] → [[module-system]] — Multi-pass elaboration
- [REQUIRES] → [[solver]] — Multi-pass constraint solving

## Nanopass (Influence)
`nanopass-influence` — tags: research, reference, compiler, mir, lowering, rewriting, migration, pattern, decision, infrastructure, implemented

**Outgoing:**
- [INSPIRES] → [[gram]] — Composable passes
- [CONTRASTS_WITH] → [[mir-lowering]] — Many vs monolithic

## Native λ (HVM)
`native-lambda-hvm` — tags: lowering, backend, codegen, runtime, speculative, syntax, recursion, ffi, mir, performance, rewriting, continuation, ir, reference

**Outgoing:**
- [REJECTS] → [[closure-conversion]] — HVM needs raw λ
- [PRESERVES] → [[nbe]] — Optimal reduction

**Incoming:**
- [[closure-conversion]] [CONTRASTS_WITH] → — Different targets
- [[gram-dataflow-semantics]] [ENABLES] → — Parallel reduction compatible
- [[compilation-by-selection]] [ADDRESSES] → — Backend-specific (HVM skips all)

## Normalisation by Evaluation (NbE) (hub)
`nbe` — tags: normalization, elaboration, concept, implemented, inference, verification, dependent, type-system, ir, ast, monad, testing, reference, mechanism

**Outgoing:**
- [USES] → [[closures]] — Lazy substitution
- [USES] → [[neutrals]] — Stuck computations
- [NORMALIZES_TO] → [[nf-value]] — Evaluation direction
- [QUOTES_TO] → [[eb-term]] — Readback direction
- [PRESERVES] → [[dependent-types]] — Beta-eta equivalence
- [DELEGATES_TO] → [[closures]] — Lazy substitution mechanism
- [DELEGATES_TO] → [[trampoline-evaluator]] — Stack-safe execution

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
- [[equirecursive-types]] [DETECTS] → — Infinite unfolding (step limit)
- [[closures]] [ENABLES] → — Evaluation without substitution
- [[cbv-evaluation]] [IMPLEMENTS] → — Spec vs implementation
- [[knot-tying]] [WRAPS] → — Placeholder entry mutated after evaluation
- [[evaluation-step-limit]] [ADDRESSES] → — Non-termination prevention
- [[closures]] [PRESERVES] → — Lexical scope captured at binding site

## Nearley parser
`nearley-parser` — tags: parser, syntax, ast, implemented, migration, testing, tooling, cli, tracing, compiler, elaboration, mir, inference, project

**Outgoing:**
- [PRODUCES] → [[elaboration]] — Src.Term
- [TRANSLATES_TO] → [[src-term]] — Token stream → AST
- [CONTRASTS_WITH] → [[tree-sitter-parser]] — Ambiguous CFG vs error-recovering incremental

**Incoming:**
- [[yap]] [INCLUDES] → — Parser component
- [[tree-sitter-parser]] [SUPERSEDES] → — Incremental replaces ambiguous CFG

## Nelson & Oppen — cooperating decision procedures (1979)
`nelson-oppen` — tags: verification, sat, backend, research, paper, reference, principle, arithmetic, quantifiers, implemented, solver

**Outgoing:**
- [INFORMS] → [[theory-plugin-interface]] — Cooperating procedures

**Incoming:**
- [[theory-plugin-interface]] [SPECIALIZES] → — Cooperating decision procedures

## Neutrals (`NF.Neutral`)
`neutrals` — tags: normalization, mechanism, implemented, elaboration, inference, unification, dependent, type-system, ir, ast, modality, ffi, recursion, reference, code

**Outgoing:**
- [CONTRASTS_WITH] → [[closures]] — Closures reduce; neutrals are stuck — dual roles in NbE
- [WRAPS] → [[nf-value]] — Unsolved computations wrapped
- [ENABLES] → [[nbe]] — Stuck terms represent unknowns

**Incoming:**
- [[meta-variables]] [PRODUCES] → — Unsolved metas produce neutral terms
- [[nbe]] [USES] → — Stuck computations

## NF.display
`nf-display` — tags: normalization, display, mechanism, implemented, elaboration, syntax, error-handling, testing, infrastructure, dependent, modality, recursion, inference

**Outgoing:**
- [USES] → [[quoting]] — NF → EB → render
- [USES] → [[zonking]] — Resolves metas before display

**Incoming:**
- [[error-causes]] [USES] → — Zonked NF in messages
- [[pretty-printing]] [USES] → — NF rendering

## `NF.Value` (Normal Form AST)
`nf-value` — tags: normalization, ir, ast, implemented, elaboration, inference, verification, ffi, modality, dependent, row-types, syntax, reference, code

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
- [[dependent-types]] [NORMALIZES_TO] → — Types compute as terms
- [[projection]] [DISPATCHES_ON] → — Schema, Sigma, Neutral, Flex
- [[injection]] [DISPATCHES_ON] → — Neutral, Var, Schema, Variant, Sigma
- [[variable-evaluation-dispatch]] [DISPATCHES_ON] → — Meta, Bound, Free, Label, Foreign
- [[application-evaluation]] [DISPATCHES_ON] → — Abs → closure, External → partial, PrimOp → δ
- [[error-causes]] [DISPATCHES_ON] → — UnificationFailure, RowMismatch, etc.

## Nieuwenhuis, Oliveras & Tinelli — Abstract DPLL → DPLL(T) (2006)
`nieuwenhuis-oliveras` — tags: verification, sat, backend, research, paper, reference, principle, quantifiers, arithmetic, implemented, solver

**Outgoing:**
- [INFORMS] → [[cdcl-t-solver]] — DPLL(T) architecture

## Nominal subtyping (contrast)
`nominal-subtyping` — tags: type-system, concept, principle, verification, elaboration, reference, row-types, dependent, sat, decision, problem, rejected

**Outgoing:**
- [CONTRASTS_WITH] → [[structural-subtyping]] — Subtype compatibility mechanisms

**Incoming:**
- [[structural-subtyping]] [CONTRASTS_WITH] → — Subtype compatibility mechanisms

## Nominal typing (contrast)
`nominal-typing` — tags: type-system, concept, principle, elaboration, row-types, syntax, ast, dependent, inference, normalization, reference, rejected

**Outgoing:**
- [CONTRASTS_WITH] → [[structural-typing]] — Name-based vs structure-based identity
- [CONTRASTS_WITH] → [[typeclass-emulation]] — Class hierarchy vs structural

**Incoming:**
- [[structural-typing]] [CONTRASTS_WITH] → — Name-based vs structure-based identity
- [[typeclass-emulation]] [EMULATES] → — Structural alternative to classes
- [[typeclass-emulation]] [CONTRASTS_WITH] → — No class hierarchy
- [[structural-row-based-types]] [REJECTS] → — Not primary type discipline

## Non-linear arithmetic
`non-linear-arithmetic` — tags: verification, arithmetic, decision, planned, normalization, ast, backend, reference, project, inference, sat, ffi, milestone, elaboration, dependent, syntax

**Outgoing:**
- [CONSTRAINS] → [[arithmetic-theory]] — Linearizable subset first
- [COMPOSES_WITH] → [[nbe]] — Constant-folding removes ground arith

## Nondeterminism (Multishot Replay)
`nondeterminism-multishot` — tags: continuation, elaboration, inference, unification, mechanism, implemented, effect, monad, type-system, normalization, lowering, codegen, testing, migration, compiler, backend, ast, reference, pattern, infrastructure

**Outgoing:**
- [ENABLES] → [[shift-reset]] — Multishot continuations
- [USES] → [[solver-dispatch]] — Runs after solving
- [INSTANTIATES] → [[meta-variables]] — Solution combinations
- [IMPLEMENTS] → [[continuation-binders]] — Multishot resume semantics
- [THREADS_THROUGH] → [[elaboration-monad]] — MutState.nondeterminism
- [DISPATCHES_ON] → [[solver-dispatch]] — Solution emptiness check

## Nondeterminism (Solver)
`nondeterminism` — tags: continuation, elaboration, unification, inference, mechanism, implemented, monad, normalization, type-system, effect, lowering, codegen, migration, testing, backend, problem, reference, infrastructure, rewriting, display

**Outgoing:**
- [ENABLES] → [[shift-reset]] — Multishot continuations
- [INSTANTIATES] → [[meta-variables]] — Solution combinations
- [IMPLEMENTS] → [[shift-reset]] — Multishot continuation semantics
- [THREADS_THROUGH] → [[elaboration-monad]] — MutState.nondeterminism.solution
- [DISPATCHES_ON] → [[solver-dispatch]] — Solution emptiness (single vs replay)

**Incoming:**
- [[continuation-binders]] [RELIES_ON] → — Multishot semantics
- [[solver]] [USES] → — Multishot replay
- [[elaboration-monad]] [DELEGATES_TO] → — MutState for skolems, metas
- [[shift-reset]] [DELEGATES_TO] → — Multishot replay

## Num sort semantics
`num-sort-semantics` — tags: verification, arithmetic, decision, deferred, backend, reference, type-system, elaboration, ast, ffi, inference, sat, normalization, project, performance

**Outgoing:**
- [APPLIES_TO] → [[arithmetic-theory]] — Int vs Real

## Occurs check
`occurs-check` — tags: type-system, elaboration, unification, normalization, dependent, problem, mechanism, code, error-handling, tracing, monad, implemented

**Outgoing:**
- [CONSTRAINS] → [[unification-algorithm]] — Prevents cycles
- [TRAVERSES] → [[nf-value]] — Walks checking meta presence
- [DETECTS] → [[mu-types]] — Cyclic types
- [DETECTS] → [[typing-rules]] — Failures producing Mu wrapping

**Incoming:**
- [[unification-algorithm]] [USES] → — Prevents infinite types

## Parser processors
`parser-processors` — tags: parser, mechanism, syntax, ast, implemented, tracing, codegen, elaboration, mir, sugar, row-types, continuation, lowering, testing, reference, infrastructure, migration

**Outgoing:**
- [PRODUCES] → [[src-term]] — Grammar → AST
- [DISPATCHES_ON] → [[src-term]] — Grammar rule postprocessors
- [TRANSLATES_TO] → [[src-term]] — Token arrays → AST nodes

**Incoming:**
- [[test-utility]] [USES] → — Parses input
- [[repl]] [USES] → — Parses each input

## Passes in Yap
`passes-in-yap` — tags: compiler, speculative, graph, tooling, migration, syntax, elaboration, project, cli, backend, language, infrastructure

**Outgoing:**
- [EXTENDS] → [[gram]] — Self-hosting passes

**Incoming:**
- [[stratego-influence]] [INSPIRES] → — Rewrite rule API

## Pattern algorithm choice: Maranget
`pattern-algorithm-choice` — tags: decision, lowering, compiler, graph, ir

**Outgoing:**
- [USES] → [[maranget-paper]] — Chosen algorithm
- [REJECTS] → [[augustsson-paper]] — Body duplication unsuitable for graph IR
- [DEFERS] → [[pettersson-paper]] — DAG optimization possible later
- [CONSTRAINS] → [[gram-pattern-pass]] — Algorithm for the pass
- [CONSTRAINS] → [[pattern-matching-compilation]] — Algorithm for MIR too

## Pattern matching compilation (hub)
`pattern-matching-compilation` — tags: lowering, mechanism, implemented, mir, compiler, ir, elaboration, row-types, codegen, backend, dependent, testing, graph

**Outgoing:**
- [LOWERS_TO] → [[mir-lowering]] — Decision trees → MIR
- [DISPATCHES_ON] → [[match]] — Pattern shape
- [ERASES] → [[match]] — Patterns removed after compilation
- [USES] → [[maranget-paper]] — Decision-tree algorithm
- [TRANSLATES_TO] → [[mir-lowering]] — Maranget decision trees
- [INCLUDES] → [[gram-pattern-translation]] — Representation phase
- [INCLUDES] → [[gram-pattern-pass]] — Compilation phase

**Incoming:**
- [[match]] [LOWERS_TO] → — Decision trees
- [[maranget-paper]] [INFORMS] → — Decision-tree construction
- [[augustsson-paper]] [INFORMS] → — Original algorithm (1985)
- [[pettersson-paper]] [INFORMS] → — DAG variant (1992)
- [[pattern-algorithm-choice]] [CONSTRAINS] → — Algorithm for MIR too

## Petricek, Orchard & Mycroft — coeffects (ICFP 2014)
`petricek-orchard` — tags: elaboration, modality, effect, inference, research, paper, reference, pattern, speculative, type-system, dependent

**Outgoing:**
- [INSPIRES] → [[effects-as-modality]] — Coeffect framework
- [INSPIRES] → [[implicits-as-coeffects]] — Context-dependence calculus

## Pettersson — pattern match compiler via automata (1992)
`pettersson-paper` — tags: paper, reference, lowering, compiler

**Outgoing:**
- [INFORMS] → [[pattern-matching-compilation]] — DAG variant (1992)
- [EXTENDS] → [[maranget-paper]] — DAG sharing over trees (deferred)

**Incoming:**
- [[pattern-algorithm-choice]] [DEFERS] → — DAG optimization possible later

## Pi types
`pi-types` — tags: type-system, dependent, concept, syntax, implemented, elaboration, inference, parser, modality, ast, quantifiers, checking, normalization, sugar, display, testing

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
- [[unification-algorithm]] [IMPLEMENTS] → — Pi-Pi equality checking case
- [[elaboration-context]] [THREADS_THROUGH] → — Binder extension
- [[dependent-types]] [FORMS] → — Universal quantification with dependency
- [[verification-pipeline]] [ERASES] → — Functions → uninterpreted
- [[bidirectional-checking]] [INTRODUCES] → — Types in check mode
- [[bidirectional-checking]] [ELIMINATES] → — Types in infer mode
- [[bidirectional-checking]] [COERCES_TO] → — Infer to check mode switch
- [[modalities]] [COMPOSES_WITH] → — Graded function arguments
- [[refinement-types]] [COMPOSES_WITH] → — Refined function domains/codomains
- [[answer-type-polymorphism]] [USES] → — Polymorphic answer type is a Pi
- [[smt-translation]] [ERASES] → — Functions → uninterpreted in SMT
- [[lambda]] [DISPATCHES_ON] → — Explicit λ vs implicit λ{} icit matching

## Pipeline explorer
`pipeline-explorer` — tags: in-progress, cli, tooling, mir, compiler, lowering, codegen, verification, parser, inference, sat, display, backend, infrastructure, normalization, elaboration

**Outgoing:**
- [REPORTS] → [[yap]] — Visualizes pipeline stages

**Incoming:**
- [[yap-explore]] [MIRRORS] → — Same tool, alternate zettel

## Pretty printing (`EB.Display`)
`pretty-printing` — tags: display, elaboration, ast, syntax, normalization, testing, tooling, inference, modality, continuation, codegen, infrastructure, implemented

**Outgoing:**
- [USES] → [[nf-display]] — NF rendering
- [REPORTS] → [[elaboration]] — Human-readable output

**Incoming:**
- [[provenance-display]] [USES] → — Term display
- [[snapshot-testing]] [SNAPSHOTS] → — Inline snapshots
- [[quoting]] [ENABLES] → — NF values → readable terms
- [[yap-explore]] [USES] → — Term rendering

## Primitive Signature
`primitive-signature` — tags: elaboration, normalization, ffi, primitive, arithmetic, strings, runtime, lowering, mir, type-system, unification, project, implemented

**Outgoing:**
- [USES] → [[cbv-evaluation]] — δ-rules on literals
- [USES] → [[ffi]] — Foreign δ-rules
- [ENCODES] → [[cbv-evaluation]] — Arithmetic/boolean/comparison as built-in δ-rules

**Incoming:**
- [[arithmetic-theory]] [VALIDATES] → — Arithmetic operations
- [[string-theory]] [VALIDATES] → — String primitives

## Projection
`projection` — tags: type-system, elaboration, inference, syntax, ast, mechanism, implemented, row-types, dependent, normalization, error-handling

**Outgoing:**
- [ELIMINATES] → [[structural-records]] — Field access
- [ELIMINATES] → [[sigma-types]] — Dependent field access
- [DUAL_OF] → [[injection]] — Elim vs intro for row-backed types
- [DISPATCHES_ON] → [[nf-value]] — Schema, Sigma, Neutral, Flex

**Incoming:**
- [[row-rewriting]] [ENABLES] → — Label lookup for field access

## Provenance Display
`provenance-display` — tags: tracing, display, error-handling, elaboration, mechanism, implemented, normalization, unification, syntax, ast, infrastructure, dependent

**Outgoing:**
- [USES] → [[provenance-system]] — Stack rendering
- [USES] → [[pretty-printing]] — Term display
- [REPORTS] → [[error-causes]] — Error paths

## Provenance System
`provenance-system` — tags: tracing, elaboration, mechanism, implemented, monad, normalization, unification, ast, type-system, code, reference, row-types

**Outgoing:**
- [ENABLES] → [[error-propagation]] — Meaningful errors need context
- [THREADS_THROUGH] → [[elaboration-context]] — ctx.trace stack
- [THREADS_THROUGH] → [[bidirectional-checking]] — Checking/inference trace

**Incoming:**
- [[error-propagation]] [USES] → — Carries trace
- [[v2-track]] [IMPLEMENTS] → — Track function
- [[provenance-display]] [USES] → — Stack rendering
- [[milestone-5-explanations]] [COMPOSES_WITH] → — End-to-end error reporting
- [[verification-pipeline]] [REPORTS] → — Provenance-annotated failures

## QTT-style usage collection
`qtt-usage-collection` — tags: modality, multiplicity, elaboration, inference, monad, mechanism, deferred, testing, solver, ast, code, project, migration

**Incoming:**
- [[usages-deferred]] [DEPRECATES] → — Move to verification

## Quantifier engine
`quantifier-engine` — tags: verification, quantifiers, mechanism, planned, backend, sat, reference, project, milestone, ffi, arithmetic, inference, ast, ir, tracing, pattern

**Outgoing:**
- [IMPLEMENTS] → [[theory-plugin-interface]] — Instantiation
- [DELEGATES_TO] → [[euf-theory]] — E-matching
- [IMPLEMENTS] → [[refinement-types]] — Guarded universal quantification
- [DISPATCHES_ON] → [[euf-theory]] — Triggers → E-match, none → bounded MBQI
- [INSTANTIATES] → [[cdcl-t-solver]] — Ground substitutions asserted
- [USES] → [[euf-theory]] — E-matching over arena

**Incoming:**
- [[euf-theory]] [ENABLES] → — Trigger matching
- [[higher-order-in-formulas]] [CONSTRAINS] → — No HO quantification
- [[ge-de-moura-quantifiers]] [INFORMS] → — Complete instantiation

## Quantifier preparation
`quantifier-preparation` — tags: verification, quantifiers, mechanism, planned, backend, reference, normalization, ast, ir, sat, strings, row-types, milestone, inference, project, codegen

**Outgoing:**
- [FOLLOWS] → [[vc-normalization]] — After normalization
- [REWRITES] → [[vc-ir]] — Prenex + skolemize + triggers

**Incoming:**
- [[boolean-lowering-cnf]] [FOLLOWS] → — After quantifier prep

## Quoting
`quoting` — tags: normalization, elaboration, mechanism, implemented, ast, ir, dependent, row-types, modality, continuation, recursion, inference, unification

**Outgoing:**
- [USES] → [[level-to-index-conversion]] — Core conversion
- [USES] → [[closures]] — Apply closure for readback
- [QUOTES_TO] → [[eb-term]] — NF.Value → EB.Term
- [TRAVERSES] → [[nf-value]] — Recursive descent
- [ENABLES] → [[pretty-printing]] — NF values → readable terms

**Incoming:**
- [[nf-display]] [USES] → — NF → EB → render

## Records vs indexed separation
`records-indexed-separation` — tags: planned, syntax, row-types, parser, type-system, elaboration, ast, inference, dependent, language, migration, problem, testing, reference

**Outgoing:**
- [ADDRESSES] → [[structural-records]] — Syntax confusion with indexed types
- [ADDRESSES] → [[lists]] — Indexed vs plain record clarity
- [ADDRESSES] → [[dictionaries]] — Indexed vs plain record clarity

## Refinement inference
`refinement-inference` — tags: verification, inference, elaboration, modality, speculative, normalization, constraint, compiler, testing, tooling, pattern, dependent

**Outgoing:**
- [EXTENDS] → [[refinement-types]] — Inferred refinements
- [REVISES] → [[modalities]] — Strip → template revision

## Refinement types (liquid modalities)
`refinement-types` — tags: type-system, verification, elaboration, normalization, sat, modality, dependent, row-types, concept, mechanism, inference, incomplete, reference, display

**Outgoing:**
- [RELIES_ON] → [[verification-pipeline]] — Z3 discharges VCs
- [COMPOSES_WITH] → [[sigma-types]] — :fst in predicates
- [SUBSUMES] → [[pi-types]] — Refined T subtype of T
- [COERCES_TO] → [[pi-types]] — Forget rule strips predicate
- [COMPOSES_WITH] → [[pi-types]] — Refined function domains/codomains

**Incoming:**
- [[pi-types]] [COMPOSES_WITH] → — Refined domains/codomains
- [[modalities]] [COMPOSES_WITH] → — Modal + refined
- [[refinement-inference]] [EXTENDS] → — Inferred refinements
- [[liquid-haskell-influence]] [INSPIRES] → — SMT automation
- [[smt-translation]] [TRANSLATES_TO] → — Verification conditions
- [[vc-ir]] [ENCODES] → — Predicates as VC.Formula
- [[quantifier-engine]] [IMPLEMENTS] → — Guarded universal quantification
- [[verification-pipeline]] [DETECTS] → — Counterexample generation

## REPL
`repl` — tags: implemented, cli, tooling, parser, inference, normalization, mir, codegen, lowering, runtime, ffi, backend, elaboration, monad

**Outgoing:**
- [USES] → [[parser-processors]] — Parses each input
- [USES] → [[v1-elaboration-pipeline]] — Elaborates
- [USES] → [[mir-lowering]] — Optional MIR mode
- [THREADS_THROUGH] → [[elaboration-context]] — Persistent ctx
- [USES] → [[js-codegen]] — Code generation
- [DISPATCHES_ON] → [[mir-lowering]] — Standard, --mir, --codegen modes

## Required formula forms
`required-formula-forms` — tags: verification, concept, incomplete, inference, elaboration, dependent, row-types, modality, ast, backend, strings, arithmetic, quantifiers, project, reference

**Outgoing:**
- [CONSTRAINS] → [[vc-ir]] — IR must express all forms
- [ENCODES] → [[verification-pipeline]] — Existing verification capabilities

## Required theory support
`required-theory-support` — tags: verification, concept, incomplete, backend, sat, arithmetic, strings, row-types, quantifiers, reference, milestone, inference, ffi, project, unification, migration, principle

**Outgoing:**
- [CONSTRAINS] → [[theory-plugin-interface]] — All theories needed

## Reynolds et al. — scaling DPLL(T) string solvers (CAV 2017)
`reynolds-strings` — tags: verification, strings, sat, research, paper, reference, rewriting, backend, incomplete, performance, migration

**Outgoing:**
- [INFORMS] → [[string-theory]] — Context-dependent simplification

## Row Data Structure
`row-data-structure` — tags: type-system, elaboration, concept, ast, ir, implemented, pattern, row-types, reference, display, performance, infrastructure

**Outgoing:**
- [ENABLES] → [[row-rewriting]] — Rewrite over rows
- [ENABLES] → [[row-polymorphism]] — Shared data type
- [FORMS] → [[structural-records]] — Basis of row-backed types

**Incoming:**
- [[row-rewriting]] [REWRITES] → — Moves label to head
- [[row-rewriting]] [TRAVERSES] → — Recursive tail descent
- [[structural-row-based-types]] [MOTIVATES] → — Row structure choice

## Row Polymorphism
`row-polymorphism` — tags: type-system, elaboration, inference, unification, concept, mechanism, principle, row-types, implemented, migration, reference

**Outgoing:**
- [EXTENDS] → [[hindley-milner]] — Parametric extension via row variables
- [DISTINGUISHES] → [[structural-subtyping]] — Not subtyping: parametric, not coercive
- [DELEGATES_TO] → [[row-rewriting]] — Label lookup mechanism
- [INSTANTIATES] → [[meta-variables]] — Fresh row variables (open tails)
- [SUBSUMES] → [[structural-records]] — Rows generalize fixed-field records
- [SUBSUMES] → [[variant-types]] — Rows generalize fixed-tag unions

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
- [[row-unification-mechanism]] [IMPLEMENTS] → — Type-level row unification
- [[row-theory]] [IMPLEMENTS] → — Width subtyping, containment
- [[dependent-types]] [COMPOSES_WITH] → — Dependent rows
- [[tagged-values]] [ENCODES] → — Open row tail on TYPE, closed on term

## Row rewriting
`row-rewriting` — tags: row-types, unification, elaboration, normalization, rewriting, mechanism, dependent, ir, code, error-handling, reference, implemented

**Outgoing:**
- [ENABLES] → [[projection]] — Label lookup for field access
- [ENABLES] → [[injection]] — Row extension
- [ENABLES] → [[row-unification-mechanism]] — Restructuring for unification
- [REWRITES] → [[row-data-structure]] — Moves label to head
- [TRAVERSES] → [[row-data-structure]] — Recursive tail descent

**Incoming:**
- [[row-unification-mechanism]] [DELEGATES_TO] → — Label lookup
- [[row-data-structure]] [ENABLES] → — Rewrite over rows
- [[structural-row-based-types]] [MOTIVATES] → — Row mechanism choice
- [[row-polymorphism]] [DELEGATES_TO] → — Label lookup mechanism

## Row theory (solver)
`row-theory` — tags: verification, row-types, dependent, planned, mechanism, sat, normalization, inference, reference, backend, compiler, migration, pattern, principle, performance, tracing

**Outgoing:**
- [IMPLEMENTS] → [[theory-plugin-interface]] — Row containment
- [MIRRORS] → [[row-unification-mechanism]] — Same label decomposition
- [PRESERVES] → [[verification-pipeline]] — subtype.contains() semantics
- [IMPLEMENTS] → [[row-polymorphism]] — Width subtyping, containment
- [USES] → [[cdcl-t-solver]] — Emits child obligations for field values
- [DELEGATES_TO] → [[cdcl-t-solver]] — Nested obligation emission

**Incoming:**
- [[milestone-4-rows]] [PRODUCES] → — Row module

## Row unification mechanism
`row-unification-mechanism` — tags: row-types, unification, elaboration, normalization, dependent, mechanism, ast, code, reference, tracing, implemented

**Outgoing:**
- [EXTENDS] → [[unification-algorithm]] — Row extension
- [DELEGATES_TO] → [[row-rewriting]] — Label lookup
- [INSTANTIATES] → [[meta-variables]] — Fresh row metas
- [IMPLEMENTS] → [[row-polymorphism]] — Type-level row unification

**Incoming:**
- [[unification-algorithm]] [USES] → — Row case delegation
- [[row-rewriting]] [ENABLES] → — Restructuring for unification
- [[row-theory]] [MIRRORS] → — Same label decomposition

## Row unification
`row-unification` — tags: row-types, type-system, elaboration, normalization, unification, inference, dependent, mechanism, pattern, code, compiler, implemented

**Incoming:**
- [[yap]] [USES] → — Row variable unification in constraint solving
- [[constraint-solving]] [USES] → — Row variables unified alongside type variables

## Rows as Universal Substrate
`rows-universal-substrate` — tags: type-system, elaboration, inference, unification, normalization, lowering, principle, decision, row-types, implemented, mir, compiler

**Outgoing:**
- [MOTIVATES] → [[row-polymorphism]] — All data is row-based
- [MOTIVATES] → [[structural-records]] — Uniform substrate

**Incoming:**
- [[dedicated-row-constructors]] [ADDRESSES] → — Cognitive overhead

## Saturation (Lowering)
`saturation` — tags: lowering, mir, ffi, mechanism, codegen, primitive, rewriting, graph, compiler, backend, testing, implemented

**Outgoing:**
- [REWRITES] → [[application]] — App chains → primop nodes
- [DISPATCHES_ON] → [[ffi]] — Known-arity foreign/ref functions
- [ADDRESSES] → [[application]] — Collapse App chains into primop nodes

**Incoming:**
- [[gram-shift-reset-pass]] [FOLLOWS] → — Pipeline order
- [[gram-to-mir-bridge]] [RELIES_ON] → — Needs external/primop

## Selective CPS
`selective-cps` — tags: continuation, lowering, codegen, compiler, mir, speculative, pattern, principle, effect, type-system, elaboration, inference, backend, code, migration, reference, problem, performance, rewriting, decision

**Outgoing:**
- [ADDRESSES] → [[multishot-serialization]] — Evidence passing alternative
- [CONTRASTS_WITH] → [[shift-reset-mir-lowering]] — Closure vs state machine

**Incoming:**
- [[koka-influence]] [INSPIRES] → — Evidence passing model
- [[multishot-serialization]] [MOTIVATES] → — Alternative approach

## Session: Lowering Branch Split from lowering-mir-v1
`session-lowering-branch-split` — tags: mir, lowering, compiler, infrastructure, reference, migration, tooling, project, testing, codegen, ffi, continuation, backend, elaboration, parser, milestone, drift, incomplete, code, pattern, decision

**Outgoing:**
- [ADDRESSES] → [[closures]] — Closure conversion and shared bundle primitive
- [ADDRESSES] → [[elaboration]] — FFI arity computation piped from elaboration to lowering

## Shift/Reset MIR Lowering
`shift-reset-mir-lowering` — tags: continuation, lowering, mir, compiler, codegen, mechanism, implemented, ir, backend, inference, elaboration, ast, effect, testing, reference, migration, runtime, pattern, infrastructure, performance, rewriting

**Outgoing:**
- [LOWERS_TO] → [[mir-lowering]] — State machines
- [IMPLEMENTS] → [[shift-reset]] — Runtime story
- [TRANSLATES_TO] → [[mir-lowering]] — State machine (heap-allocated frames)

**Incoming:**
- [[multishot-serialization]] [CONSTRAINS] → — Replay challenge
- [[selective-cps]] [CONTRASTS_WITH] → — Closure vs state machine
- [[gram-dataflow-semantics]] [CONTRASTS_WITH] → — Dependency edges vs jump sequences
- [[gram-shift-reset-pass]] [CONTRASTS_WITH] → — Annotation vs state machine

## Shift/Reset
`shift-reset` — tags: continuation, elaboration, lowering, inference, mir, compiler, type-system, effect, mechanism, implemented, monad, codegen, normalization, reference, ast

**Outgoing:**
- [USES] → [[answer-type-polymorphism]] — k has polymorphic answer type
- [USES] → [[continuation-binders]] — Resume encoded via metas
- [INTRODUCES] → [[continuation-binders]] — Shift captures k
- [COMPOSES_WITH] → [[pi-types]] — k has Pi type
- [INSTANTIATES] → [[continuation-binders]] — Via skolem-like metas
- [DELEGATES_TO] → [[nondeterminism]] — Multishot replay
- [NORMALIZES_TO] → [[closures]] — Continuation closure (captured frames)
- [TRANSLATES_TO] → [[mir-lowering]] — State machines (planned)
- [ELIMINATES] → [[continuation-binders]] — Resume applies k

**Incoming:**
- [[shift-reset-mir-lowering]] [IMPLEMENTS] → — Runtime story
- [[koka-influence]] [CONTRASTS_WITH] → — Evidence passing vs direct capture
- [[effects-as-modality]] [EXTENDS] → — Effect system over continuations
- [[danvy-filinski]] [INFORMS] → — Foundational theory
- [[nondeterminism]] [ENABLES] → — Multishot continuations
- [[missing-spec-shift-reset]] [IMPLEMENTS] → — Impl ahead of spec
- [[nondeterminism-multishot]] [ENABLES] → — Multishot continuations
- [[elaboration-monad]] [ENABLES] → — Via MutState.skolems
- [[nondeterminism]] [IMPLEMENTS] → — Multishot continuation semantics
- [[effects-as-modality]] [COMPOSES_WITH] → — Effect system over continuations
- [[gram-shift-reset-pass]] [IMPLEMENTS] → — In GRAM context
- [[gram-shift-reset-pass]] [PRESERVES] → — reset/shift nodes unchanged

## Sigma bindings (`ctx.sigma`)
`sigma-bindings` — tags: row-types, dependent, elaboration, inference, normalization, type-system, unification, context, mechanism, syntax, parser, implemented

**Outgoing:**
- [IMPLEMENTS] → [[dependent-types]] — Field-to-field dependency
- [APPLIES_TO] → [[structural-records]] — Record field references
- [APPLIES_TO] → [[sigma-types]] — Σ field dependency
- [INSTANTIATES] → [[meta-variables]] — Fresh metas per field
- [THREADS_THROUGH] → [[elaboration-context]] — ctx.sigma map
- [IMPLEMENTS] → [[sigma-types]] — Dependent field references
- [ENABLES] → [[structural-records]] — Field-to-field dependency
- [IMPLEMENTS] → [[typing-rules]] — Sigma typing (impl ahead of spec)

**Incoming:**
- [[label-lookup]] [USES] → — :label → sigma entry
- [[label-lookup]] [RESOLVES] → — Label references

## Sigma types
`sigma-types` — tags: type-system, dependent, row-types, concept, implemented, elaboration, syntax, ast, normalization, unification, inference, context, mir, codegen, error-handling

**Outgoing:**
- [EXTENDS] → [[dependent-types]] — Existential with row dependency
- [USES] → [[row-polymorphism]] — Row-backed dependent records
- [FORMS] → [[structural-records]] — Σ forms dependent record types
- [COMPOSES_WITH] → [[variant-types]] — Dependent elimination produces variants

**Incoming:**
- [[pi-types]] [DUAL_OF] → — Universal vs existential
- [[pi-types]] [COMPOSES_WITH] → — Dependent function returning dependent record
- [[refinement-types]] [COMPOSES_WITH] → — :fst in predicates
- [[projection]] [ELIMINATES] → — Dependent field access
- [[missing-spec-sigma-types]] [IMPLEMENTS] → — No spec formalization
- [[sigma-bindings]] [APPLIES_TO] → — Σ field dependency
- [[unification-algorithm]] [IMPLEMENTS] → — Sigma-Sigma equality checking case
- [[sigma-bindings]] [IMPLEMENTS] → — Dependent field references
- [[dependent-types]] [FORMS] → — Existential quantification with dependency

## SMT translation (current)
`smt-translation` — tags: verification, normalization, implemented, backend, sat, arithmetic, strings, row-types, quantifiers, inference, elaboration, code, testing, drift, reference, monad, performance

**Outgoing:**
- [IMPLEMENTS] → [[verification-pipeline]] — Z3 translation
- [TRANSLATES_TO] → [[verification-pipeline]] — Z3 sorts/assertions
- [TRAVERSES] → [[eb-term]] — Walks producing Z3
- [ERASES] → [[pi-types]] — Functions → uninterpreted
- [TRANSLATES_TO] → [[refinement-types]] — Verification conditions
- [ERASES] → [[pi-types]] — Functions → uninterpreted in SMT

**Incoming:**
- [[verification-pipeline]] [TRANSLATES_TO] → — Types → Z3 assertions
- [[cas-instead-of-smt]] [CONTRASTS_WITH] → — CAS alternative
- [[liquid-haskell-influence]] [INSPIRES] → — VC generation pipeline
- [[vc-ir]] [SUPERSEDES] → — Backend-neutral replaces Z3
- [[translation-boundary-vc]] [SUPERSEDES] → — New translation tools
- [[z3-replacement-decision]] [SUPERSEDES] → — Z3 dependency removed
- [[cdcl-t-solver]] [SUPERSEDES] → — Replaces Z3 invocation

## Snapshot testing
`snapshot-testing` — tags: implemented, testing, inference, elaboration, normalization, display, parser, migration, infrastructure, reference, drift, project, compiler

**Outgoing:**
- [USES] → [[test-utility]] — elaborateFrom
- [SNAPSHOTS] → [[pretty-printing]] — Inline snapshots
- [PRESERVES] → [[test-utility]] — Determinism via resets

## Solver dispatch
`solver-dispatch` — tags: elaboration, inference, unification, normalization, tooling, mechanism, decision, code, polymorphism, reference, tracing, implemented

**Outgoing:**
- [USES] → [[unification-algorithm]] — Assign → unify
- [USES] → [[implicit-resolution-solver]] — Resolve → Δ lookup
- [RESOLVES] → [[constraint-types]] — Processes queue
- [RESOLVES] → [[implicit-resolution]] — Resolve type → Δ lookup
- [ENABLES] → [[deferred-constraint-solving]] — Batch processing at let boundaries

**Incoming:**
- [[deferred-constraint-solving]] [RELIES_ON] → — Batch processing at let boundaries
- [[constraint-types]] [ENABLES] → — Typed constraints
- [[constraint-types]] [DISPATCHES_ON] → — Assign vs resolve
- [[nondeterminism-multishot]] [USES] → — Runs after solving
- [[test-utility]] [USES] → — Solve constraints
- [[implicit-resolution]] [DELEGATES_TO] → — Batch processing
- [[nondeterminism-multishot]] [DISPATCHES_ON] → — Solution emptiness check
- [[nondeterminism]] [DISPATCHES_ON] → — Solution emptiness (single vs replay)

## Solver module layout (planned)
`solver-module-layout` — tags: verification, infrastructure, planned, reference, backend, compiler, sat, normalization, mir, migration, project, tooling, testing, milestone, principle, pattern, drift

**Outgoing:**
- [APPLIES_TO] → [[cdcl-t-solver]] — Internal module structure
- [APPLIES_TO] → [[theory-plugin-interface]] — Separation of concerns
- [ENCODES] → [[cdcl-t-solver]] — IR / SAT / theories / explanation separation

## Solver
`solver` — tags: elaboration, inference, unification, normalization, tooling, mechanism, code, monad, polymorphism, project, testing, implemented

**Outgoing:**
- [USES] → [[unification]] — Assign constraints → unify
- [USES] → [[nondeterminism]] — Multishot replay
- [RESOLVES] → [[constraint-types]] — Processes queue
- [DELEGATES_TO] → [[unification-algorithm]] — Assign constraints
- [DELEGATES_TO] → [[implicit-resolution-solver]] — Resolve constraints
- [ENABLES] → [[implicit-resolution]] — Δ lookup phase

**Incoming:**
- [[zonking]] [FOLLOWS] → — After solving
- [[idris-2-influence]] [INSPIRES] → — Unification approach
- [[bidirectional-checking]] [DELEGATES_TO] → — At let boundaries
- [[mutual-recursion]] [REQUIRES] → — Multi-pass constraint solving

## Spineful applications
`spineful-applications` — tags: planned, elaboration, ast, normalization, inference, lowering, mir, pattern, mechanism, compiler, unification, display, migration, type-system

**Outgoing:**
- [REVISES] → [[application]] — Head + spine
- [ADDRESSES] → [[application]] — Nested App complexity

## Src.Term (source AST)
`src-term` — tags: syntax, ast, concept, parser, elaboration, implemented, tracing, dependent, row-types, modality, continuation, inference, migration, lowering, codegen, testing, reference, mir, compiler

**Outgoing:**
- [PRODUCES] → [[eb-term]] — Via elaboration
- [CONTRASTS_WITH] → [[eb-term]] — Surface vs core

**Incoming:**
- [[nearley-parser]] [TRANSLATES_TO] → — Token stream → AST
- [[v1-elaboration-pipeline]] [DISPATCHES_ON] → — Source shape drives dispatch
- [[parser-processors]] [PRODUCES] → — Grammar → AST
- [[src-to-eb-transformation]] [CONSUMES] → — Source input
- [[src-to-eb-transformation]] [DISPATCHES_ON] → — Src.Term type drives dispatch
- [[parser-processors]] [DISPATCHES_ON] → — Grammar rule postprocessors
- [[parser-processors]] [TRANSLATES_TO] → — Token arrays → AST nodes
- [[tree-sitter-parser]] [TRANSLATES_TO] → — Incremental parse tree → CST

## Src → EB transformation
`src-to-eb-transformation` — tags: mechanism, elaboration, syntax, ast, parser, sugar, inference, dependent, row-types, modality, codegen, implemented

**Outgoing:**
- [CONSUMES] → [[src-term]] — Source input
- [PRODUCES] → [[eb-term]] — Elaborated output
- [INSTANTIATES] → [[meta-variables]] — Holes, implicit args
- [DISPATCHES_ON] → [[src-term]] — Src.Term type drives dispatch

**Incoming:**
- [[bidirectional-checking-decision]] [DISPATCHES_ON] → — Mode drives Src → EB

## STG analogy
`stg-analogy` — tags: concept, compiler, graph, ir, lowering, reference, pattern

**Outgoing:**
- [INFORMS] → [[gram]] — Pipeline layering inspiration
- [DISTINGUISHES] → [[gram-pattern-translation]] — Translation = STG-level (semantic)
- [DISTINGUISHES] → [[gram-pattern-pass]] — Pass = Cmm-level (operational)
- [CONTRASTS_WITH] → [[mir-lowering]] — Monolithic (STG->Cmm) vs composable (GRAM passes)
- [INSPIRES] → [[compilation-by-selection]] — Selective = improvement over GHC's fused approach

## Stratego (Influence)
`stratego-influence` — tags: research, reference, rewriting, pattern, ast, mir, lowering, tooling, decision, implemented

**Outgoing:**
- [INSPIRES] → [[dpo-rewriting]] — Strategy combinators
- [INSPIRES] → [[passes-in-yap]] — Rewrite rule API

## Strict vs Lazy
`strict-vs-lazy` — tags: normalization, elaboration, runtime, evaluation, inference, lowering, codegen, dependent, modality, speculative, implemented

**Outgoing:**
- [CONTRASTS_WITH] → [[cbv-evaluation]] — Lazy alternative

**Incoming:**
- [[cbv-evaluation]] [CONTRASTS_WITH] → — Evaluation strategy contrast

## String theory (solver)
`string-theory` — tags: verification, strings, planned, mechanism, sat, arithmetic, normalization, backend, compiler, reference, inference, migration, quantifiers, sugar, testing, project, principle, recursion

**Outgoing:**
- [IMPLEMENTS] → [[theory-plugin-interface]] — Word equations
- [DELEGATES_TO] → [[arithmetic-theory]] — Length lemmas
- [VALIDATES] → [[primitive-signature]] — String primitives
- [REWRITES] → [[cdcl-t-solver]] — Contains/prefix/suffix → concat equalities
- [INSTANTIATES] → [[meta-variables]] — Fresh witnesses for decomposition
- [USES] → [[arithmetic-theory]] — Length coupling

**Incoming:**
- [[arithmetic-theory]] [COMPOSES_WITH] → — Length coupling
- [[milestone-3-strings]] [PRODUCES] → — String module
- [[liang-strings]] [INFORMS] → — DPLL(T) string solver
- [[reynolds-strings]] [INFORMS] → — Context-dependent simplification

## Structural Records
`structural-records` — tags: type-system, elaboration, inference, syntax, ast, dependent, row-types, concept, implemented, parser, unification, normalization

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
- [[sigma-bindings]] [ENABLES] → — Field-to-field dependency
- [[row-polymorphism]] [SUBSUMES] → — Rows generalize fixed-field records
- [[records-indexed-separation]] [ADDRESSES] → — Syntax confusion with indexed types

## Structural Row-Based Types (Decision)
`structural-row-based-types` — tags: type-system, elaboration, decision, principle, row-types, inference, unification, parser, implemented, concept, dependent, mir

**Outgoing:**
- [MOTIVATES] → [[row-polymorphism]] — All composite = rows
- [FORMS] → [[structural-records]] — Records, variants, tuples, lists, dicts
- [MOTIVATES] → [[row-data-structure]] — Row structure choice
- [MOTIVATES] → [[row-rewriting]] — Row mechanism choice
- [REJECTS] → [[nominal-typing]] — Not primary type discipline

## Structural subtyping
`structural-subtyping` — tags: concept, type-system, mechanism, rejected, elaboration, unification, row-types, reference, principle, decision, inference, normalization, parser, migration, ffi

**Outgoing:**
- [CONTRASTS_WITH] → [[nominal-subtyping]] — Subtype compatibility mechanisms
- [APPLIES_TO] → [[structural-typing]] — Asymmetric aspect of structural type systems
- [CONTRASTS_WITH] → [[row-polymorphism]] — Subtyping vs parametric

**Incoming:**
- [[nominal-subtyping]] [CONTRASTS_WITH] → — Subtype compatibility mechanisms
- [[row-polymorphism]] [DISTINGUISHES] → — Not subtyping: parametric, not coercive

## Structural typing (shape-based types, without subtyping)
`structural-typing` — tags: concept, type-system, mechanism, elaboration, unification, row-types, inference, normalization, lowering, ast, implemented, pattern, parser, mir, codegen, testing, reference

**Outgoing:**
- [CONTRASTS_WITH] → [[nominal-typing]] — Name-based vs structure-based identity
- [ENABLES] → [[row-polymorphism]] — Structure-based identity

**Incoming:**
- [[yap]] [USES] → — All compound types are row-based
- [[nominal-typing]] [CONTRASTS_WITH] → — Name-based vs structure-based identity
- [[structural-subtyping]] [APPLIES_TO] → — Asymmetric aspect of structural type systems

## Structural vs Representational Passes
`structural-vs-representational-passes` — tags: lowering, compiler, rewriting, graph, mir, closure, performance, codegen, tooling, type-system, implemented, decision

**Outgoing:**
- [CONSTRAINS] → [[gram]] — Ordering principle
- [DISTINGUISHES] → [[gram]] — Eta/beta/fold before closure-conv/defunc

**Incoming:**
- [[mlir-influence]] [INSPIRES] → — Pass scheduling

## Substitution system
`substitution-system` — tags: unification, elaboration, normalization, infrastructure, mechanism, ir, code, display, monad, performance, implemented

**Outgoing:**
- [ENABLES] → [[zonking]] — Subst for resolution
- [ENABLES] → [[unification-algorithm]] — Solution accumulation
- [ZONKS] → [[meta-variables]] — Maps IDs to solutions
- [ZONKS] → [[holes]] — Fresh metas after solving

**Incoming:**
- [[unification-algorithm]] [USES] → — Accumulates solutions
- [[flex-rigid-unification]] [RECOVERS_FROM] → — Chases solved metas

## System F (background)
`system-f` — tags: concept, type-system, reference, elaboration, generalization, inference, quantifiers, dependent, incomplete, principle, parser, normalization, monad, decision, migration

**Outgoing:**
- [INFORMS] → [[de-bruijn]] — System F's binding structure motivates de Bruijn representation
- [INFORMS] → [[pi-types]] — Parametric polymorphism foundation
- [INFORMS] → [[hindley-milner]] — Explicit polymorphism

**Incoming:**
- [[yap]] [EXTENDS] → — Parametric polymorphism foundation
- [[dependent-types]] [EXTENDS] → — Types that depend on values
- [[type-type]] [GENERALIZES] → — Collapses all universe levels

## Tagged Values
`tagged-values` — tags: type-system, elaboration, inference, syntax, ast, parser, row-types, concept, implemented, sugar, mir, pattern

**Outgoing:**
- [INTRODUCES] → [[variant-types]] — Intro form for variants
- [ENCODES] → [[row-polymorphism]] — Open row tail on TYPE, closed on term

**Incoming:**
- [[match]] [DUAL_OF] → — Intro/elim pair for variants
- [[match]] [COMPOSES_WITH] → — Intro/elim pair for variants

## Termination checking
`termination-checking` — tags: recursion, verification, normalization, speculative, dependent, compiler, runtime, evaluation, performance, problem, language, testing, reference

**Outgoing:**
- [EXTENDS] → [[equirecursive-types]] — Guardedness
- [DETECTS] → [[nbe]] — Non-termination

## Test utility (`elaborateFrom`)
`test-utility` — tags: implemented, testing, inference, elaboration, monad, parser, migration, infrastructure, reference, normalization, display, unification, verification, lowering

**Outgoing:**
- [USES] → [[parser-processors]] — Parses input
- [USES] → [[elaboration-monad]] — V2.Do pipeline
- [USES] → [[solver-dispatch]] — Solve constraints
- [SNAPSHOTS] → [[elaboration]] — Pretty + structure output

**Incoming:**
- [[snapshot-testing]] [USES] → — elaborateFrom
- [[snapshot-testing]] [PRESERVES] → — Determinism via resets

## Theory plugin interface (planned)
`theory-plugin-interface` — tags: verification, mechanism, planned, pattern, backend, sat, compiler, reference, elaboration, inference, normalization, tracing, migration, infrastructure, milestone, principle, recursion

**Outgoing:**
- [ENABLES] → [[cdcl-t-solver]] — Modular theories
- [SPECIALIZES] → [[nelson-oppen]] — Cooperating decision procedures
- [DISPATCHES_ON] → [[cdcl-t-solver]] — Theories receive literals from SAT

**Incoming:**
- [[cdcl-t-solver]] [DELEGATES_TO] → — Theory propagation
- [[euf-theory]] [IMPLEMENTS] → — Congruence closure
- [[arithmetic-theory]] [IMPLEMENTS] → — Simplex
- [[string-theory]] [IMPLEMENTS] → — Word equations
- [[row-theory]] [IMPLEMENTS] → — Row containment
- [[quantifier-engine]] [IMPLEMENTS] → — Instantiation
- [[required-theory-support]] [CONSTRAINS] → — All theories needed
- [[nelson-oppen]] [INFORMS] → — Cooperating procedures
- [[solver-module-layout]] [APPLIES_TO] → — Separation of concerns
- [[cdcl-t-solver]] [DISPATCHES_ON] → — EUF, arithmetic, strings, rows, quantifiers

## Thorin / MimIR (Influence)
`thorin-mimir-influence` — tags: research, reference, lowering, mir, continuation, codegen, backend, ir, cps, principle, implemented

**Outgoing:**
- [INSPIRES] → [[mir-retrospective]] — Calls = jumps
- [CONTRASTS_WITH] → [[mir-lowering]] — CPS vs direct

## tmp.ts Pipeline Stub (doc vs tree)
`tmp-pipeline-stub` — tags: migration, drift, reference, problem, elaboration, inference, compiler, project, incomplete, tooling, ast, mir

**Outgoing:**
- [BLOCKS] → [[v2-elaboration-pipeline]] — Stubs prevent integration

## Trampoline evaluator
`trampoline-evaluator` — tags: normalization, elaboration, mechanism, implemented, performance, runtime, recursion, continuation, lowering, ir, inference, ffi, rewriting

**Outgoing:**
- [IMPLEMENTS] → [[nbe]] — Stack-safe evaluation
- [ADDRESSES] → [[nbe]] — Stack overflow prevention
- [WRAPS] → [[nbe]] — Heap-allocated frames
- [PRESERVES] → [[cbv-evaluation]] — Same results
- [IMPLEMENTS] → [[cbv-evaluation]] — Without stack overflow
- [IMPLEMENTS] → [[typing-rules]] — Operational semantics via NbE

**Incoming:**
- [[evaluation-step-limit]] [CONSTRAINS] → — Prevents non-termination
- [[types-as-terms]] [ENABLES] → — Evaluate types like values
- [[whnf-vs-full-normalization]] [CONSTRAINS] → — Evaluation depth
- [[nbe]] [DELEGATES_TO] → — Stack-safe execution

## Translation boundary (VC IR)
`translation-boundary-vc` — tags: verification, elaboration, normalization, planned, reference, ir, inference, backend, sat, quantifiers, dependent, modality, migration, testing, project, principle, codegen, ffi

**Outgoing:**
- [SUPERSEDES] → [[smt-translation]] — New translation tools
- [CONSUMES] → [[nf-value]] — NF.Value input
- [DELEGATES_TO] → [[vc-ir]] — Produces VC types

**Incoming:**
- [[vc-normalization]] [FOLLOWS] → — After translation
- [[milestone-1-ir-boundary]] [PRODUCES] → — Translation tools

## Tree-sitter parser
`tree-sitter-parser` — tags: parser, migration, in-progress, syntax, ast, tooling, codegen, elaboration, inference, compiler, drift, infrastructure, reference, project, testing, performance

**Outgoing:**
- [SUPERSEDES] → [[nearley-parser]] — Incremental replaces ambiguous CFG
- [PRODUCES] → [[v2-elaboration-pipeline]] — CST.SyntaxNode
- [TRANSLATES_TO] → [[src-term]] — Incremental parse tree → CST

**Incoming:**
- [[lsp]] [USES] → — Incremental parsing
- [[nearley-parser]] [CONTRASTS_WITH] → — Ambiguous CFG vs error-recovering incremental

## Tuples
`tuples` — tags: type-system, elaboration, inference, syntax, ast, row-types, sugar, concept, implemented, parser, language, dependent

**Outgoing:**
- [DESUGARS_TO] → [[structural-records]] — Positional labels
- [SPECIALIZES] → [[structural-records]] — Numeric labels only

**Incoming:**
- [[lists]] [CONTRASTS_WITH] → — Homogeneous indexed vs heterogeneous positional

## Type Erasure
`type-erasure` — tags: lowering, mir, codegen, type-system, elaboration, ast, ir, compiler, dependent, verification, normalization, incomplete, runtime

**Outgoing:**
- [ERASES] → [[pi-types]] — Removes type information
- [ADDRESSES] → [[ffi]] — Dummy type args
- [ENABLES] → [[js-codegen]] — Cleaner codegen

**Incoming:**
- [[ffi]] [LACKS] → — Needs dummy type args

## `Type` and `Type : Type`
`type-type` — tags: type-system, dependent, concept, decision, elaboration, inference, normalization, syntax, implemented, ast, parser, unification, verification, display, error-handling

**Outgoing:**
- [ENABLES] → [[dependent-types]] — Types compute as terms
- [GENERALIZES] → [[system-f]] — Collapses all universe levels
- [COMPOSES_WITH] → [[dependent-types]] — Types in same universe

**Incoming:**
- [[types-as-terms]] [ENABLES] → — Types compute as terms
- [[dependent-types]] [ENABLES] → — Types live in same universe as terms

## Typeclass emulation (dictionary style)
`typeclass-emulation` — tags: elaboration, inference, type-system, row-types, dependent, pattern, mechanism, normalization, compiler, codegen, language, infrastructure, reference, implemented

**Outgoing:**
- [EMULATES] → [[nominal-typing]] — Structural alternative to classes
- [USES] → [[implicit-resolution]] — Instance lookup via Δ
- [USES] → [[structural-records]] — Instances are records
- [CONTRASTS_WITH] → [[nominal-typing]] — No class hierarchy
- [ENCODES] → [[implicit-environment]] — Instances as record values in Δ

**Incoming:**
- [[nominal-typing]] [CONTRASTS_WITH] → — Class hierarchy vs structural

## Typed pass composition
`typed-pass-composition` — tags: type-system, in-progress, graph, compiler, infrastructure, pattern, verification, elaboration, reference, migration, error-handling, project

**Outgoing:**
- [EXTENDS] → [[gram]] — Type-safe passes

## Types as terms
`types-as-terms` — tags: type-system, dependent, decision, concept, elaboration, normalization, ast, ir, implemented, unification, verification, lowering, codegen, monad, reference, performance

**Outgoing:**
- [ENABLES] → [[type-type]] — Types compute as terms
- [RELIES_ON] → [[dependent-types]] — Dependency required
- [NORMALIZES_TO] → [[nf-value]] — Types evaluate like terms
- [ENABLES] → [[trampoline-evaluator]] — Evaluate types like values

## Typing rules (documentation)
`typing-rules` — tags: concept, elaboration, type-system, reference, inference, dependent, principle, drift, problem, pattern, testing, incomplete

**Outgoing:**
- [ENCODES] → [[yap]] — Formal rules in spec.md
- [FORMS] → [[pi-types]] — Type-theoretic foundation
- [COMPOSES_WITH] → [[bidirectional-checking]] — Mode drives rule selection
- [DISPATCHES_ON] → [[bidirectional-checking]] — Γ ⊢ e ⇐ A vs Γ ⊢ e ⇒ A

**Incoming:**
- [[unification-algorithm]] [IMPLEMENTS] → — (Conv) rule: assignment → unify
- [[variable-evaluation-dispatch]] [IMPLEMENTS] → — (Var) rule: context lookup
- [[application-evaluation]] [IMPLEMENTS] → — (App) rule at NF level
- [[sigma-bindings]] [IMPLEMENTS] → — Sigma typing (impl ahead of spec)
- [[knot-tying]] [IMPLEMENTS] → — Recursive types (Mu) typing (no spec)
- [[occurs-check]] [DETECTS] → — Failures producing Mu wrapping
- [[trampoline-evaluator]] [IMPLEMENTS] → — Operational semantics via NbE
- [[modality-drift]] [CONTRASTS_WITH] → — Type former vs annotation inconsistency

## Unification algorithm
`unification-algorithm` — tags: type-system, elaboration, normalization, unification, inference, dependent, mechanism, ast, code, ffi, modality, implemented

**Outgoing:**
- [IMPLEMENTS] → [[unification]] — Core algorithm
- [USES] → [[occurs-check]] — Prevents infinite types
- [USES] → [[row-unification-mechanism]] — Row case delegation
- [USES] → [[substitution-system]] — Accumulates solutions
- [DISPATCHES_ON] → [[nf-value]] — Pattern match on pairs
- [TRAVERSES] → [[nf-value]] — Recursive walk
- [IMPLEMENTS] → [[pi-types]] — Pi-Pi equality checking case
- [IMPLEMENTS] → [[sigma-types]] — Sigma-Sigma equality checking case
- [IMPLEMENTS] → [[variant-types]] — Variant-Variant equality checking case
- [IMPLEMENTS] → [[typing-rules]] — (Conv) rule: assignment → unify

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
- [[euf-theory]] [MIRRORS] → — Term equality ↔ type equality

## Unification
`unification` — tags: type-system, elaboration, normalization, unification, inference, verification, dependent, row-types, concept, reference, compiler, implemented

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
- [[logic-programming]] [USES] → — Relational reasoning via unification
- [[euf-theory]] [RESOLVES] → — Congruence propagation

## Usages deferred relative to solver constraints
`usages-deferred` — tags: modality, multiplicity, elaboration, verification, deferred, solver, inference, decision, constraint, compiler, incomplete, migration, reference, code

**Outgoing:**
- [DEPRECATES] → [[qtt-usage-collection]] — Move to verification
- [DELEGATES_TO] → [[verification-pipeline]] — Analysis moves post-elab
- [ADDRESSES] → [[modality-enforcement]] — Enforcement gap

## V1 Elaboration Pipeline (terminology vs this tree)
`v1-elaboration-pipeline` — tags: elaboration, deprecated, migration, inference, compiler, monad, type-system, normalization, modality, project, reference, syntax, parser

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
- [[yap-explore]] [USES] → — Displays elaboration output
- [[v2-elaboration-pipeline]] [FOLLOWS] → — Sequential development
- [[v2-elaboration-pipeline]] [MIRRORS] → — Same theory, fresh implementation

## V2 Elaboration Pipeline (verified layout)
`v2-elaboration-pipeline` — tags: elaboration, inference, monad, implemented, type-system, normalization, unification, continuation, codegen, compiler, dependent, parser, migration

**Outgoing:**
- [SUPERSEDES] → [[v1-elaboration-pipeline]] — Fresh implementation
- [MIRRORS] → [[v1-elaboration-pipeline]] — Same theory, new code
- [FOLLOWS] → [[v1-elaboration-pipeline]] — Sequential development
- [MIRRORS] → [[v1-elaboration-pipeline]] — Same theory, fresh implementation

**Incoming:**
- [[tree-sitter-parser]] [PRODUCES] → — CST.SyntaxNode
- [[tmp-pipeline-stub]] [BLOCKS] → — Stubs prevent integration
- [[elaboration-monad]] [ENABLES] → — V2 pipeline
- [[lsp]] [USES] → — Incremental analysis

## V2.track
`v2-track` — tags: tracing, elaboration, monad, mechanism, implemented, error-handling, inference, code, performance, type-system, normalization, project, continuation

**Outgoing:**
- [IMPLEMENTS] → [[provenance-system]] — Track function
- [EXTENDS] → [[elaboration-monad]] — Trace extension
- [THREADS_THROUGH] → [[elaboration-context]] — Extends ctx.trace per step

## Variable evaluation dispatch
`variable-evaluation-dispatch` — tags: normalization, elaboration, mechanism, implemented, ast, ffi, unification, inference, syntax, dependent, row-types, modality, runtime, continuation

**Outgoing:**
- [IMPLEMENTS] → [[nbe]] — (Var) at NF level
- [RESOLVES] → [[meta-variables]] — Skolems → zonker → neutral
- [IMPLEMENTS] → [[ffi]] — Foreign variable lookup
- [IMPLEMENTS] → [[typing-rules]] — (Var) rule: context lookup
- [DISPATCHES_ON] → [[nf-value]] — Meta, Bound, Free, Label, Foreign

## Variant Types
`variant-types` — tags: type-system, elaboration, inference, syntax, ast, row-types, concept, implemented, mir, pattern, lowering, normalization

**Outgoing:**
- [USES] → [[row-polymorphism]] — Row-backed unions
- [DUAL_OF] → [[structural-records]] — Sum vs product over rows
- [MIRRORS] → [[structural-records]] — Row-backed dual

**Incoming:**
- [[injection]] [INTRODUCES] → — Tag injection
- [[tagged-values]] [INTRODUCES] → — Intro form for variants
- [[match]] [ELIMINATES] → — Elim form for variants
- [[elm-ocaml-influence]] [INSPIRES] → — Polymorphic variants
- [[unification-algorithm]] [IMPLEMENTS] → — Variant-Variant equality checking case
- [[row-polymorphism]] [SUBSUMES] → — Rows generalize fixed-tag unions
- [[sigma-types]] [COMPOSES_WITH] → — Dependent elimination produces variants
- [[match]] [DISPATCHES_ON] → — Variant, Struct, Lit, List, Wildcard, Binder

## VC IR
`vc-ir` — tags: verification, ir, planned, sat, arithmetic, strings, quantifiers, row-types, dependent, backend, codegen, principle, milestone, project

**Outgoing:**
- [SUPERSEDES] → [[smt-translation]] — Backend-neutral replaces Z3
- [TRANSLATES_TO] → [[verification-pipeline]] — NF.Value → formulas
- [ENCODES] → [[refinement-types]] — Predicates as VC.Formula
- [ENCODES] → [[modalities]] — Modal verification constraints
- [ENCODES] → [[verification-pipeline]] — All formula forms from current verification

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
- [[verification-pipeline]] [PRODUCES] → — VC.Formula via translation boundary
- [[vc-normalization]] [TRAVERSES] → — Walk and simplify formulas
- [[boolean-lowering-cnf]] [ENCODES] → — Origin metadata for provenance
- [[verification-artefacts-revised]] [ENCODES] → — VC.Formula replaces Expr
- [[verification-artefacts-revised]] [INCLUDES] → — vc field is VC.Formula

## VC Normalization
`vc-normalization` — tags: verification, normalization, planned, sat, backend, ir, arithmetic, strings, row-types, principle, milestone, compiler, quantifiers

**Outgoing:**
- [NORMALIZES_TO] → [[vc-ir]] — Simplifies formulas
- [FOLLOWS] → [[translation-boundary-vc]] — After translation
- [TRAVERSES] → [[vc-ir]] — Walk and simplify formulas

**Incoming:**
- [[quantifier-preparation]] [FOLLOWS] → — After normalization

## VC Provenance
`vc-provenance` — tags: verification, tracing, planned, sat, backend, ir, error-handling, display, milestone, infrastructure, principle, dependent, testing, cli

**Outgoing:**
- [EXTENDS] → [[verification-pipeline]] — Error quality
- [REPORTS] → [[verification-pipeline]] — Provenance-annotated failures

**Incoming:**
- [[verification-backend]] [ENABLES] → — Unsat-core reporting
- [[milestone-5-explanations]] [PRODUCES] → — Explanation/model infrastructure

## VerificationArtefacts (revised shape)
`verification-artefacts-revised` — tags: verification, concept, planned, ir, normalization, dependent, backend, sat, milestone, migration, type-system, language, arithmetic, strings

**Outgoing:**
- [SUPERSEDES] → [[verification-pipeline]] — New artefact type
- [ENCODES] → [[vc-ir]] — VC.Formula replaces Expr
- [INCLUDES] → [[vc-ir]] — vc field is VC.Formula

## VerificationBackend
`verification-backend` — tags: verification, infrastructure, planned, backend, sat, ffi, compiler, milestone, principle, codegen, testing, dependent, arithmetic, row-types

**Outgoing:**
- [SUPERSEDES] → [[verification-pipeline]] — New backend API
- [WRAPS] → [[cdcl-t-solver]] — Simple API
- [ENABLES] → [[vc-provenance]] — Unsat-core reporting

**Incoming:**
- [[verification-pipeline]] [DELEGATES_TO] → — Satisfiability checking
- [[cdcl-t-solver]] [PRODUCES] → — SolveResult (sat/unsat/unknown)

## Verification pipeline (hub)
`verification-pipeline` — tags: verification, normalization, inference, elaboration, implemented, backend, sat, dependent, row-types, strings, quantifiers, cli, compiler, testing, reference, milestone, tracing, error-handling

**Outgoing:**
- [VALIDATES] → [[v1-elaboration-pipeline]] — On-demand, not pipeline stage
- [TRANSLATES_TO] → [[smt-translation]] — Types → Z3 assertions
- [COMPOSES_WITH] → [[v1-elaboration-pipeline]] — Post-hoc validation
- [DELEGATES_TO] → [[verification-backend]] — Satisfiability checking
- [PRODUCES] → [[vc-ir]] — VC.Formula via translation boundary
- [ERASES] → [[pi-types]] — Functions → uninterpreted
- [DETECTS] → [[refinement-types]] — Counterexample generation
- [REPORTS] → [[provenance-system]] — Provenance-annotated failures

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
- [[effects-as-modality]] [COMPOSES_WITH] → — Effect verification
- [[milestone-5-explanations]] [ADDRESSES] → — Error quality improvement
- [[vc-ir]] [ENCODES] → — All formula forms from current verification
- [[required-formula-forms]] [ENCODES] → — Existing verification capabilities

## Where clauses
`where-clauses` — tags: syntax, sugar, deferred, parser, elaboration, decision, language, drift, migration, tooling, concept, row-types, dependent, infrastructure, reference, compiler, problem, ast

**Outgoing:**
- [DESUGARS_TO] → [[blocks]] — Let bindings

## WHNF codification
`whnf-codification` — tags: normalization, elaboration, planned, inference, unification, decision, problem, migration, dependent, drift, testing, reference, principle, pattern

**Outgoing:**
- [ADDRESSES] → [[whnf-vs-full-normalization]] — Formalize the WHNF boundary

## WHNF vs full normalization
`whnf-vs-full-normalization` — tags: normalization, elaboration, concept, inference, unification, mechanism, implemented, dependent, recursion, decision, performance, problem, ir, testing

**Outgoing:**
- [CONSTRAINS] → [[elaboration]] — WHNF only in elab
- [CONSTRAINS] → [[unification]] — Full NF in unification
- [CONSTRAINS] → [[trampoline-evaluator]] — Evaluation depth

**Incoming:**
- [[whnf-codification]] [ADDRESSES] → — Formalize the WHNF boundary

## yap explore
`yap-explore` — tags: tooling, cli, parser, elaboration, verification, mir, codegen, display, testing, infrastructure, implemented

**Outgoing:**
- [REPORTS] → [[yap]] — Web dashboard for pipeline stages
- [USES] → [[v1-elaboration-pipeline]] — Displays elaboration output
- [USES] → [[pretty-printing]] — Term rendering
- [MIRRORS] → [[pipeline-explorer]] — Same tool, alternate zettel

## Yap (language hub)
`yap` — tags: project, language, dependent, row-types, elaboration, normalization, verification, lowering, mir, parser, inference, implemented, ffi, continuation, testing

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
- [[lsp]] [REPORTS] → — Language server protocol
- [[yap-explore]] [REPORTS] → — Web dashboard for pipeline stages

## Z3 replacement decision
`z3-replacement-decision` — tags: verification, decision, planned, sat, backend, milestone, ffi, ir, codegen, dependent, quantifiers, arithmetic, strings, project, principle

**Outgoing:**
- [MOTIVATES] → [[vc-ir]] — Backend-neutral IR needed
- [MOTIVATES] → [[cdcl-t-solver]] — Own solver needed
- [SUPERSEDES] → [[smt-translation]] — Z3 dependency removed
- [PRESERVES] → [[verification-pipeline]] — Shape unchanged

**Incoming:**
- [[milestone-1-ir-boundary]] [FOLLOWS] → — First step
- [[cas-instead-of-smt]] [CONTRASTS_WITH] → — Alternative rejected

## Zonking
`zonking` — tags: elaboration, unification, mechanism, implemented, inference, normalization, syntax, ast, ir, display, error-handling, dependent, verification, tooling, type-system, migration

**Outgoing:**
- [RELIES_ON] → [[meta-variables]] — Applies subst to metas
- [FOLLOWS] → [[solver]] — After solving
- [ZONKS] → [[meta-variables]] — Resolves unknowns
- [TRAVERSES] → [[eb-term]] — Walks replacing metas
- [ZONKS] → [[holes]] — Metas after constraint solving
- [RESOLVES] → [[application]] — Meta-variables from implicit insertion

**Incoming:**
- [[lean-4-influence]] [INSPIRES] → — Substitution application
- [[mcbride-nuttin]] [INFORMS] → — Postponed substitution
- [[substitution-system]] [ENABLES] → — Subst for resolution
- [[nf-display]] [USES] → — Resolves metas before display


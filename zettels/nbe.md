---
tags:
- concept
- nbe
- normalization
- elaboration
- hub
- implemented
- inference
- verification
- dependent
- type-system
- unification
- evaluation
---
# Normalisation by Evaluation (NbE) (hub)

Yap's approach to definitional type equality: evaluate terms into a semantic domain (NF.Value), then compare structurally via unification. NbE replaces syntactic normalization (rewrite rules on syntax) with semantic normalization (interpret into a domain, read back to syntax).

The two directions:
- **Evaluate** (`NF.evaluate`): EB.Term → NF.Value. Performs computation — beta reduction, delta expansion, row operations — producing closures for binders and neutrals for stuck computation.
- **Quote** (`NF.quote`): NF.Value → EB.Term. Reads back semantic values into syntax, converting de Bruijn levels to indices and chasing the zonker for solved metas. See quoting.

The eval/quote cycle is the engine of the elaborator: evaluate to compare semantically (unification operates on NF.Values), quote to produce syntactic output (for display, further elaboration, or lowering).

Evaluation strategy is call-by-value — see cbv-evaluation. The evaluator uses a trampoline architecture (explicit work/result stacks) for stack safety — see trampoline-evaluator. Recursive definitions use a knot-tying pattern — see knot-tying.

The semantic domain (NF.Value) consists of closures (deferred computation under binders) and neutrals (stuck computation on unknown heads). See closures, neutrals, nf-value.

Children: cbv-evaluation, quoting, trampoline-evaluator, knot-tying, variable-evaluation-dispatch, whnf-vs-full-normalization, evaluation-step-limit, application-evaluation, closures, neutrals.

<!-- connections:start -->

## Connections

**Outgoing**
- USES → [[closures]] — Lazy substitution
- USES → [[neutrals]] — Stuck computations
- NORMALIZES_TO → [[nf-value]] — Evaluation direction
- QUOTES_TO → [[eb-term]] — Readback direction
- PRESERVES → [[dependent-types]] — Beta-eta equivalence
- DELEGATES_TO → [[closures]] — Lazy substitution mechanism
- DELEGATES_TO → [[trampoline-evaluator]] — Stack-safe execution
- INCLUDES → [[cbv-evaluation]] — Evaluation strategy
- INCLUDES → [[quoting]] — Readback direction
- INCLUDES → [[trampoline-evaluator]] — Stack-safe architecture
- INCLUDES → [[knot-tying]] — Recursive evaluation pattern
- INCLUDES → [[variable-evaluation-dispatch]] — Variable resolution
- INCLUDES → [[whnf-vs-full-normalization]] — One evaluator, emergent WHNF
- INCLUDES → [[evaluation-step-limit]] — Non-termination guard
- INCLUDES → [[application-evaluation]] — Application dispatch
- INCLUDES → [[closures]] — Deferred substitution
- INCLUDES → [[neutrals]] — Stuck computation
- INCLUDES → [[nbe-acceleration]] — JIT-ideas-applied-to-elaborator design discussion
- INCLUDES → [[nbe-performance-profile]] — Empirical grounding for any acceleration decision
- INCLUDES → [[glued-evaluation]] — Dual-rep evaluation strategy
- INCLUDES → [[compiled-nbe]] — Compile the evaluator itself

**Incoming**
- [[yap]] ← USES — Definitional equality via normalization
- [[elaboration]] ← USES — Evaluate to values, compare structurally
- [[gram]] ← PRESERVES — Semantic equivalence per pass
- [[native-lambda-hvm]] ← PRESERVES — Optimal reduction
- [[levels-vs-indices]] ← APPLIES_TO — Levels for evaluation
- [[termination-checking]] ← DETECTS — Non-termination
- [[agda-influence]] ← INSPIRES — Evaluation-based normalization
- [[lean-4-influence]] ← INSPIRES — NbE architecture
- [[abel-pientka]] ← INFORMS — Higher-order pattern unification
- [[trampoline-evaluator]] ← IMPLEMENTS — Stack-safe evaluation
- [[trampoline-evaluator]] ← ADDRESSES — Stack overflow prevention
- [[trampoline-evaluator]] ← WRAPS — Heap-allocated frames
- [[evaluation-step-limit]] ← DETECTS — Infinite loops
- [[variable-evaluation-dispatch]] ← IMPLEMENTS — (Var) at NF level
- [[application-evaluation]] ← IMPLEMENTS — (App) at NF level
- [[knot-tying]] ← INSTANTIATES — Placeholder entry
- [[non-linear-arithmetic]] ← COMPOSES_WITH — Constant-folding removes ground arith
- [[neutrals]] ← ENABLES — Stuck terms represent unknowns
- [[equirecursive-types]] ← DETECTS — Infinite unfolding (step limit)
- [[closures]] ← ENABLES — Evaluation without substitution
- [[cbv-evaluation]] ← IMPLEMENTS — Spec vs implementation
- [[knot-tying]] ← WRAPS — Placeholder entry mutated after evaluation
- [[evaluation-step-limit]] ← ADDRESSES — Non-termination prevention
- [[closures]] ← PRESERVES — Lexical scope captured at binding site
- [[lambda-synthesis-fix]] ← USES — Fix uses NF.quote to convert synthesized type back to term
- [[nu-types]] ← RELIES_ON — Shares mu's evaluation infrastructure
- [[bisimulation-type-equality]] ← USES — Unfolding via evaluation
- [[sized-types]] ← USES — Size reduction via evaluation
- [[type-families]] ← USES — Type-level reduction via evaluation
- [[type-level-computation]] ← USES — NbE evaluates type-level functions
- [[dependent-pattern-matching]] ← RELIES_ON — Evaluate types under refinement
- [[fuzz-testing]] ← TARGETS
- [[property-based-testing]] ← TARGETS
- [[ast-pipeline]] ← RELIES_ON — Eval/quote cycle is the engine
- [[unified-binder]] ← ENABLES — Uniform closure construction for all binders
- [[standard-closure]] ← IMPLEMENTS — Lazy substitution for all binders
- [[sigma-bindings]] ← ENABLES — extendSigmaEnv for label vars during eval
- [[eq-normalization-bug]] ← RELIES_ON — Bug fires during normalization
- [[maplist-schema-unification]] ← RELIES_ON — Unfolding happens during evaluation
- [[static-partial-evaluation]] ← RELIES_ON — Type-level PE site

<!-- connections:end -->

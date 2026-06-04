---
tags:
- concept
- nbe
- normalization
- elaboration
- ast
- dependent
- ir
- inference
- verification
- ffi
- modality
- row-types
- syntax
- implemented
---
# NF.Value

The semantic domain of Yap's normalization-by-evaluation. NF.Value is what EB.Term evaluates into — the normal-form representation where computation has been performed and only stuck (neutral) terms remain unevaluated.

Like EB.Term, NF.Value is branded with monotonic IDs for identity. The constructors reflect the semantic layer rather than syntactic forms: `Var`, `Lit`, `App`, `Row`, `Abs` (carrying a binder and a closure), `Neutral` (stuck computation), `Modal`, `External` (foreign function with partial arguments), and `Existential` (verification only).

Key structural features:

- **Closures under Abs**: every binder carries an `NF.Closure` rather than a substituted body — NbE defers substitution until elimination. Closures come in three kinds (standard, PrimOp, Continuation), each serving a different purpose.
- **Neutral wrapping**: stuck computation uses a single `Neutral(value)` wrapper rather than a separate head+spine representation. This keeps the type simple at the cost of nested wrapping for deeply stuck spines.
- **Type and Any sentinels**: `NF.Type` is `Lit(Atom("Type"))` — the universe classifier. `NF.Any` is a fallback for unresolved types.
- **No Reset/Shift**: delimited control constructs exist only in EB.Term. NbE evaluates through them during reduction; the result is always a standard NF.Value.

NF.Value is the currency of unification (compared structurally), type checking (expected types are NF), and quoting (readback to EB.Term).

<!-- connections:start -->

## Connections

**Outgoing**
- QUOTES_TO → [[eb-term]] — Via quoting
- RELIES_ON → [[ast-pipeline]] — Third layer of the pipeline

**Incoming**
- [[v1-elaboration-pipeline]] ← NORMALIZES_TO — Types → normal forms
- [[cbv-evaluation]] ← NORMALIZES_TO — Closed terms fully reduce
- [[types-as-terms]] ← NORMALIZES_TO — Types evaluate like terms
- [[branded-types]] ← CONSTRAINS — Prevents mixing
- [[unification-algorithm]] ← DISPATCHES_ON — Pattern match on pairs
- [[unification-algorithm]] ← TRAVERSES — Recursive walk
- [[occurs-check]] ← TRAVERSES — Walks checking meta presence
- [[quoting]] ← TRAVERSES — Recursive descent
- [[pretty-printing]] ← USES — Renders normal forms
- [[eb-term]] ← NORMALIZES_TO — Via evaluation
- [[eb-term]] ← CONTRASTS_WITH — Syntax vs semantic domain
- [[translation-boundary-vc]] ← CONSUMES — NF.Value input
- [[neutrals]] ← WRAPS — Unsolved computations wrapped
- [[nbe]] ← NORMALIZES_TO — Evaluation direction
- [[dependent-types]] ← NORMALIZES_TO — Types compute as terms
- [[projection]] ← DISPATCHES_ON — Schema, Sigma, Neutral, Flex
- [[injection]] ← DISPATCHES_ON — Neutral, Var, Schema, Variant, Sigma
- [[variable-evaluation-dispatch]] ← DISPATCHES_ON — Meta, Bound, Free, Label, Foreign
- [[application-evaluation]] ← DISPATCHES_ON — Abs → closure, External → partial, PrimOp → δ
- [[error-causes]] ← DISPATCHES_ON — UnificationFailure, RowMismatch, etc.
- [[ast-pipeline]] ← DEFINES — Semantic layer of three-layer design
- [[unified-binder]] ← CONSTRAINS — All binders share Abs in NF.Value
- [[primop-closure]] ← RELIES_ON — Args and result are NF.Value
- [[continuation-closure]] ← RELIES_ON — Captured frames and results
- [[annotations]] ← RELIES_ON — Annotation evaluated to NF before checking
- [[match]] ← RELIES_ON — Scrutinee evaluated to NF for matching
- [[cbv-evaluation]] ← ENABLES — Produces predictable normal forms
- [[knot-tying]] ← RELIES_ON — Placeholder mutation in env entries
- [[fst-closure-annotation]] ← APPLIES_TO — Ann no longer captures NF.Value closures
- [[gram-type-uniformity]] ← MOTIVATES — NF.Value as candidate uniform representation

<!-- connections:end -->

---
tags:
- decision
- nbe
- normalization
- elaboration
- evaluation
- implemented
- inference
- dependent
- continuation
- effect
---
# CBV evaluation

Yap's NbE evaluator uses call-by-value: composite subterms are evaluated eagerly in a fixed order before reduction. Application evaluates function and argument before dispatching. Match evaluates the scrutinee before alternatives. Row extensions evaluate field values before tails. Block let-bindings evaluate the bound value before continuing.

The evaluation order is fixed by explicit `Eval` / `Cont` frame scheduling on the work stack — deterministic and independent of host-language evaluation order.

The justification for CBV in NbE:
- **Delimited continuations**: shift/reset semantics are evaluation-order-dependent. The frames captured by shift, and the point at which reset delimits, depend on which subterms have been evaluated. A lazy evaluator would capture different frames, producing incorrect normal forms.
- **Effects and modalities**: Yap has effectful computation where the order of evaluation matters for type-level reasoning. Strict evaluation gives predictable, reproducible types.
- **Predictability**: CBV produces normal forms that match programmer intuition — arguments are evaluated before being passed, fields are evaluated before being stored.

This is the **compile-time** (NbE) evaluation strategy, not a statement about runtime behavior. The NbE evaluator models the language's intended semantics for the purpose of type comparison. See strict-vs-lazy for the runtime evaluation strategy question.

<!-- connections:start -->

## Connections

**Outgoing**
- IMPLEMENTS → [[yap]] — Runtime semantics
- PRESERVES → [[application]] — Left-to-right evaluation order
- NORMALIZES_TO → [[nf-value]] — Closed terms fully reduce
- IMPLEMENTS → [[nbe]] — Spec vs implementation
- CONTRASTS_WITH → [[strict-vs-lazy]] — Evaluation strategy contrast
- RELIES_ON → [[trampoline-evaluator]] — Frame scheduling encodes CBV order
- RELIES_ON → [[shift-reset]] — Continuations require strict order
- CONTRASTS_WITH → [[strict-vs-lazy]] — Compile-time settled, runtime open
- ENABLES → [[nf-value]] — Produces predictable normal forms
- ENABLES → [[unification-algorithm]] — Deterministic comparison

**Incoming**
- [[primitive-signature]] ← USES — δ-rules on literals
- [[strict-vs-lazy]] ← CONTRASTS_WITH — Lazy alternative
- [[trampoline-evaluator]] ← PRESERVES — Same results
- [[trampoline-evaluator]] ← IMPLEMENTS — Without stack overflow
- [[primitive-signature]] ← ENCODES — Arithmetic/boolean/comparison as built-in δ-rules
- [[continuation-closure]] ← RELIES_ON — Captures work stack frames
- [[application-evaluation]] ← IMPLEMENTS — Drives CBV discipline
- [[nbe]] ← INCLUDES — Evaluation strategy
- [[quoting]] ← CONTRASTS_WITH — Quote is inverse of evaluate
- [[strict-vs-lazy]] ← RELIES_ON — NbE is settled as CBV
- [[eq-normalization-bug]] ← RELIES_ON — Primop compute runs under CBV evaluation
- [[evaluation-monad-rework]] ← MODIFIES — Rework target is the imperative work-stack evaluator

<!-- connections:end -->

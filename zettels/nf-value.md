---
tags:
- concept
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

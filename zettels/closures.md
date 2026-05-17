---
tags:
- normalization
- elaboration
- mechanism
- implemented
- ir
- dependent
- inference
- continuation
- ffi
- lowering
- ast
- runtime
- code
---
# Closures (NbE)

`NF.Closure` (`src/elaboration/normalization/syntax/term.ts`) is a tagged union:

- **`{ type: "Closure"; ctx: EB.Context; term: EB.Term }`** — body not evaluated until elimination; constructed for λ/Π/Σ/µ binders in `evaluateTerm` via `NF.Constructors.Closure(ctx, body)`.
- **`{ type: "PrimOp"; ctx; term; arity; compute }`** — saturated via `extend`-style env slicing and `compute(...args)` in `reduceAndPushStack` / `apply`.
- **`{ type: "Continuation"; ctx; term; frames: NF.StackFrame[]; results: NF.Value[] }`** — built when evaluating `EB.Shift`: captures suffix of `globalWorkStack` until the nearest `Delimiter`, plus `globalResultStack` suffix (`evaluation.v2.ts`).

Applying an `Abs` closure calls `EB.extend` for ordinary binders or `EB.extendSigmaEnv` when the binder is `Sigma` (requires argument `NF.Value` with `type: "Row"`).

`NF.closeVal` (`quoting.ts`) quotes a value at `ctx.env.length + 1` into a `Closure` carrying the current context.

See also: [[application-evaluation.md]], [[knot-tying.md]], [[nf-value.md]], [[nbe.md]].

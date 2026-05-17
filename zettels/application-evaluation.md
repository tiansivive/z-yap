---
tags:
- normalization
- elaboration
- mechanism
- implemented
- inference
- dependent
- continuation
- ffi
- ir
- ast
- monad
- runtime
- code
---
# Application Evaluation

`EB.Term` application (`{ type: "App", func, arg, icit }`) is evaluated in `evaluateTerm` (`src/elaboration/normalization/evaluation.v2.ts`) by pushing two `Eval` frames (stack is LIFO: **function head is evaluated before the argument**), then a `Cont` with `arity: 2` that calls `reduceAndPushStack(funcVal, argVal, icit)`.

`reduceAndPushStack` dispatches on `funcVal`:

- **`Neutral`** — pushes `NF.Constructors.Neutral(NF.Constructors.App(head, arg, icit))` (spine grows under a neutral head).
- **`Abs` with `Mu` binder** — does not unfold; pushes neutral `App` (same idea as `reduce` / `apply` for µ).
- **`Abs` with other binders** — `NF.Closure`: `EB.extend` / `EB.extendSigmaEnv` then `Eval` on the body; **`PrimOp`**: collects `nf` from the first `arity` env slots and calls `compute`; **`Continuation`**: restores stored `results`, pushes `arg`, replays captured `frames` on the work stack.
- **`Modal`** — logs a warning and recurses on the inner value (see source).
- **`External`** — accumulates `args` until `arity`, then `compute(...)` if no argument is neutral; otherwise neutral `External`.
- **`App` nested value** — uses `reduce` to re-associate before continuing.
- **`Lit` with atom** — builds value-level `NF.Constructors.App` of that literal to the argument (not a δ-step for arbitrary atoms in this match).

Also re-exported: non-stack `reduce` and `apply` in the same module (recursive `evaluate` path for continuations).

See also: [[nbe.md]], [[cbv-evaluation.md]], [[neutrals.md]], [[closures.md]].

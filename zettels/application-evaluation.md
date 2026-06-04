---
tags:
- mechanism
- nbe
- normalization
- elaboration
- evaluation
- closure
- implemented
- dependent
- continuation
- ffi
- ir
---
# Application evaluation

How values respond to application in Yap's NbE evaluator. Application is the central elimination form — it drives computation by dispatching on the kind of value being applied. The evaluator pushes function and argument onto the work stack, then `reduceAndPushStack` dispatches on the function value:

- **Neutral** head: no reduction possible. Grows the spine by wrapping in `Neutral(App(head, arg, icit))`. The application is stuck until the head is resolved.
- **Abs with Mu binder**: does not unfold. Produces a neutral App, same as a stuck application. This prevents infinite unfolding of recursive types during normalization.
- **Abs with standard closure**: extends the captured context with the argument, then evaluates the body. This is the beta-reduction case — the core of NbE computation.
- **Abs with PrimOp closure**: accumulates the argument. If arity is reached and no argument is neutral, fires the compute function. Otherwise stays partially applied.
- **Abs with Continuation closure**: restores captured frames and results, pushes the argument, and replays — resuming a previously captured delimited continuation.
- **Modal**: logs a warning and recurses on the inner value. Modalities on function values are stripped during application.
- **External**: accumulates arguments toward arity. If saturated with no neutral arguments, invokes compute. Otherwise produces a neutral External.
- **Lit (atom)**: builds a value-level `App(atom, arg)`. Not a delta reduction — atoms applied to arguments produce data (this is how container types like Schema, Variant, Array are constructed at the value level).
- **Nested App**: re-associates via `reduce` before continuing.

This dispatch is the operational semantics of Yap's CBV evaluation. It determines what "computation" means at the NF level.

<!-- connections:start -->

## Connections

**Outgoing**
- IMPLEMENTS → [[nbe]] — (App) at NF level
- DELEGATES_TO → [[closures]] — Abs case
- IMPLEMENTS → [[typing-rules]] — (App) rule at NF level
- DISPATCHES_ON → [[nf-value]] — Abs → closure, External → partial, PrimOp → δ
- DISPATCHES_ON → [[standard-closure]] — Extend ctx and evaluate body
- DISPATCHES_ON → [[primop-closure]] — Accumulate and fire when saturated
- DISPATCHES_ON → [[continuation-closure]] — Restore frames and replay
- DISPATCHES_ON → [[neutrals]] — Grow spine when head is stuck
- DISPATCHES_ON → [[mu-types]] — Mu stays neutral, no unfold
- IMPLEMENTS → [[cbv-evaluation]] — Drives CBV discipline

**Incoming**
- [[nbe]] ← INCLUDES — Application dispatch
- [[eq-normalization-bug]] ← RELIES_ON — PrimOps dispatch is application evaluation

<!-- connections:end -->

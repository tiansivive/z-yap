---
tags:
- concept
- normalization
- elaboration
- closure
- hub
- implemented
- dependent
- inference
- continuation
- ffi
- ir
---
# Closures (hub)

NF.Closure is the deferred-substitution mechanism at the heart of Yap's NbE. Every binder in the semantic domain (`NF.Abs`) carries a closure rather than a substituted body — computation is delayed until the binder is eliminated (applied, projected, matched against).

Yap's closure representation is a three-variant tagged union, each serving a distinct domain:

- **Standard closure** (`type: "Closure"`) — an EB.Term body paired with a captured elaboration context. The core NbE mechanism: lambda, Pi, Sigma, and Mu binders all produce standard closures during evaluation. See standard-closure.
- **PrimOp closure** (`type: "PrimOp"`) — a closure for primitive/external operations that accumulates arguments until saturated, then invokes a native compute function. The FFI and built-in operation mechanism. See primop-closure.
- **Continuation closure** (`type: "Continuation"`) — a closure that captures evaluation stack frames and result values from a delimited shift. The multishot continuation mechanism. See continuation-closure.

Application dispatches on closure kind: standard closures extend the context and evaluate the body; PrimOps collect arguments and fire when saturated; continuations restore captured frames and replay. This dispatch taxonomy is detailed in application-evaluation.

`NF.closeVal` (in quoting) provides the inverse: given an NF.Value, quote it into an EB.Term and wrap it as a standard closure with the current context — used for readback under binders.

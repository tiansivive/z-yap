---
tags:
- concept
- nbe
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

<!-- connections:start -->

## Connections

**Outgoing**
- RELIES_ON → [[de-bruijn]] — Closures capture de Bruijn level-indexed environments
- IMPLEMENTS → [[lambda]] — Closure = captured env + body
- ENABLES → [[nbe]] — Evaluation without substitution
- WRAPS → [[eb-term]] — Deferred substitution (EB.Term + Context)
- PRESERVES → [[lambda]] — Lexical scope captured at binding site
- RELIES_ON → [[de-bruijn-levels]] — Level-indexed environments
- PRESERVES → [[nbe]] — Lexical scope captured at binding site
- INCLUDES → [[standard-closure]] — Core NbE closure
- INCLUDES → [[primop-closure]] — FFI/primitive closure
- INCLUDES → [[continuation-closure]] — Delimited continuation closure

**Incoming**
- [[neutrals]] ← CONTRASTS_WITH — Closures reduce; neutrals are stuck — dual roles in NbE
- [[session-lowering-branch-split]] ← ADDRESSES — Closure conversion and shared bundle primitive
- [[quoting]] ← USES — Apply closure for readback
- [[application-evaluation]] ← DELEGATES_TO — Abs case
- [[nbe]] ← USES — Lazy substitution
- [[nbe]] ← DELEGATES_TO — Lazy substitution mechanism
- [[shift-reset]] ← NORMALIZES_TO — Continuation closure (captured frames)
- [[lambda]] ← ENCODES — Function values as closures
- [[bridge-closure-capture]] ← ADDRESSES — Capture threading for nested closures
- [[closure-conversion]] ← CONSUMES — Lifts closures to MIR functions
- [[nbe]] ← INCLUDES — Deferred substitution
- [[glued-evaluation]] ← APPLIES_TO — Closures gain a lazy value cell beside body/context

<!-- connections:end -->

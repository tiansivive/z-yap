---
tags:
- concept
- normalization
- closure
- elaboration
- dependent
- implemented
- inference
- evaluation
- ir
---
# Standard closure

The core NbE closure: an EB.Term body paired with a captured elaboration context (`{ type: "Closure"; ctx: EB.Context; term: EB.Term }`). This is how Yap implements lazy substitution — rather than substituting into a body at binding time, the body is stored alongside its environment and evaluated only when the binder is eliminated.

Every lambda, Pi, Sigma, and Mu binder produces a standard closure during NbE evaluation. The closure captures the full elaboration context at the point of binding, including the environment, zonker, metas, and sigma map.

Application of a standard closure extends the captured context with the argument value (via `EB.extend` for ordinary binders, or `EB.extendSigmaEnv` for Sigma binders where the argument must be a row value), then schedules the body for evaluation.

This is the most common closure kind by far — it handles all user-written functions and type-level binders. The other two closure kinds (PrimOp, Continuation) handle specialized domains.

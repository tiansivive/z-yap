---
tags:
  [
    design,
    nbe,
    normalization,
    evaluation,
    elaboration,
    closure,
    representation,
    dual-rep,
    performance,
    optimization,
    speculative,
    principle,
  ]
---
# Glued evaluation

A representation strategy for NbE where every binding carries **both** an `EB.Term` (the syntactic form) and a lazy `NF.Value` (the semantic form). Unification and definitional equality consult the value; display, quote, and error reporting can use the syntax directly without a readback round-trip; unfolding is lazy — the value is computed on demand and cached.

The duality is the point. A pure-value representation forces every readback through `NF.quote`, which is expensive when the syntactic form was already available upstream. A pure-syntax representation forces every comparison through re-evaluation, which is expensive when unification asks the same question many times. Glued keeps both forms and lets each operation pick the cheaper one:

- **Unification** — consult the value form; force the lazy `NF.Value` thunk on demand.
- **Display / quote / error reporting** — consult the syntax form; no readback needed.
- **Unfolding for definitional equality** — when comparing applied heads, prefer the syntactic form first (cheap structural match); fall back to value comparison only when the syntax forms diverge.
- **Reversibility** — because the syntax is preserved, a failed unification can roll back to the original term without reconstructing it. This is the closest functional-language analog of JIT speculation: speculate that the value form is needed, keep the syntax as the recovery path.

The cost is memory — every binding now carries two representations. The trade-off pays when the value-form computation is expensive relative to the extra memory, which is typical in dependently-typed elaborators where unfolding can blow up term size.

Prior art: Coq's kernel uses glued evaluation for definitional equality checking. Lean 4's elaborator uses a similar dual representation to keep elaboration responsive on large dependent contexts. The pattern is well-trodden in production proof assistants; what's open in Yap is whether the current evaluator's bottleneck profile (`[[nbe-performance-profile]]`) actually justifies the migration cost.

Implementation surface in Yap would touch `NF.Closure` (the three-variant taxonomy in `[[closures]]`) — closures already capture a body and a context; glued evaluation adds a lazy value cell beside that. The `[[variable-evaluation-dispatch]]` taxonomy is the second touch-point: each variable kind would resolve to a glued cell, with the lazy `NF.Value` forced on first inspection. `NF.quote` (`[[quoting]]`) becomes a fallback rather than a default — when the syntactic form is present, quote becomes a no-op.

This is design-space, not implementation. The migration depends on `[[nbe-performance-profile]]` confirming that value computation and quote round-trips dominate compile time.

<!-- connections:start -->

## Connections

**Outgoing**
- APPLIES_TO → [[closures]] — Closures gain a lazy value cell beside body/context
- APPLIES_TO → [[quoting]] — Quote becomes a fallback when syntax is preserved
- APPLIES_TO → [[variable-evaluation-dispatch]] — Each variable kind resolves to a glued cell

**Incoming**
- [[nbe]] ← INCLUDES — Dual-rep evaluation strategy
- [[nbe-acceleration]] ← GROUNDED_IN — The main artefact of JIT-ideas-in-NbE
- [[lean-4-influence]] ← INFORMS — Lean's elaborator uses dual-rep

<!-- connections:end -->

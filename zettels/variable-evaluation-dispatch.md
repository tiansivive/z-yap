---
tags:
- mechanism
- nbe
- normalization
- elaboration
- evaluation
- implemented
- ffi
- unification
- inference
- dependent
- metavariable
- row-types
- modality
- continuation
---
# Variable evaluation dispatch

How each variable kind resolves to an NF.Value during NbE evaluation. Variables are the entry points from syntax into the semantic domain — each kind has a distinct resolution path reflecting its origin and semantics:

- **Bound** — looked up in the environment (`ctx.env`). If the binder head is Mu, the result is wrapped in Neutral to block recursive unfolding. Otherwise the stored NF.Value is used directly.
- **Free** — resolved via `ctx.imports`. The imported definition is evaluated in an extended context using the knot-tying pattern (placeholder mutation for recursive imports).
- **Meta** — three-way dispatch: (1) if present in skolems (`V2.MutState`), re-evaluate the skolem term; (2) if present in `ctx.zonker`, quote the solution and re-evaluate; (3) otherwise produce `Neutral(Var(meta))` — the meta is unsolved and computation is stuck.
- **Label** — resolved via `ctx.sigma` (the sigma bindings map). Returns the cached normal form for the field, or evaluates the stored term if not yet evaluated.
- **Foreign** — resolved via `ctx.ffi`. If arity is 0, the compute function fires immediately. Otherwise an `NF.External` value is produced, awaiting arguments.

The Meta path is the most consequential: it determines whether a type-level computation can proceed (zonked), needs to be deferred (neutral), or is in a skolem-checking context (re-evaluate). This is where the elaborator's incremental solving interacts with normalization.

<!-- connections:start -->

## Connections

**Outgoing**
- IMPLEMENTS → [[nbe]] — (Var) at NF level
- RESOLVES → [[meta-variables]] — Skolems → zonker → neutral
- IMPLEMENTS → [[ffi]] — Foreign variable lookup
- IMPLEMENTS → [[typing-rules]] — (Var) rule: context lookup
- DISPATCHES_ON → [[nf-value]] — Meta, Bound, Free, Label, Foreign
- RELIES_ON → [[sigma-bindings]] — Label variables → ctx.sigma
- RELIES_ON → [[knot-tying]] — Free variables use placeholder pattern
- RELIES_ON → [[meta-variables]] — Meta resolution: skolem/zonker/neutral
- RELIES_ON → [[neutrals]] — Unsolved metas → neutral
- RELIES_ON → [[ffi]] — Foreign variables → ctx.ffi

**Incoming**
- [[nbe]] ← INCLUDES — Variable resolution
- [[glued-evaluation]] ← APPLIES_TO — Each variable kind resolves to a glued cell
- [[compiled-nbe]] ← APPLIES_TO — Principal dispatch hot path

<!-- connections:end -->

---
tags:
- elaboration
- inference
- unification
- solver
- mechanism
- constraint
- dependent
- compiler
- code
- ast
- normalization
- monad
- error-handling
- implemented
status: implemented
---
# Implicit resolution (constraints)

Insertion: `src/elaboration/implicits.ts` `insert` — when an expected type is an implicit `Pi`, yields `freshMeta`, builds `App("Implicit", …)`, emits `V2.tell("constraint", { type: "resolve", meta, value: pi.binder.annotation, implicits: ctx.implicits })`. Recursive `insert.gen` walks nested implicit domains.

`resolve` pairs live beside `assign` unification constraints (`src/elaboration/solver/solver.ts` `Constraint`).

Solving: after `_solve` processes `assign` constraints into `zonker`, `resolve` runs with zonked context (`NF.force(ctx, value)` before lookup).

`EB.resolveImplicit` (`context.ts`) — head-first scan of `ctx.implicits`: `U.unify(goal, candidateType, …)` and return the first `[term, subst]` with `Either` success; the constraint solver in `solver.ts` performs the analogous resolution when processing `resolve` constraints.

Instantiate pass: `EB.Icit.instantiate` (`implicits.ts`) substitutes `resolutions` for meta `Var`s when traversing terms.

Hub: [[implicit-resolution-solver.md]], [[implicit-environment.md]], [[implicits.md]], [[typeclass-coherence]], [[functional-dependencies]].

<!-- connections:start -->

## Connections

**Outgoing**
- EXTENDS → [[implicits]] — Resolver mechanism
- RESOLVES → [[constraint-types]] — Δ lookup for resolve constraints
- COMPOSES_WITH → [[pi-types]] — Implicit Pi triggers insertion
- DISPATCHES_ON → [[constraint-types]] — Resolve → Δ, assign → unify
- DELEGATES_TO → [[constraint-solver]] — Batch processing
- PRESERVES → [[generalization]] — Rejects subst-producing candidates
- INSTANTIATES → [[meta-variables]] — Insertion creates fresh unknowns
- RESOLVES → [[deferred-constraint-solving]] — At let boundaries
- COMPOSES_WITH → [[generalization]] — Deferred resolution preserves generality

**Incoming**
- [[application]] ← USES — Implicit insertion
- [[implicit-environment]] ← ENABLES — Provides Δ
- [[typeclass-emulation]] ← USES — Instance lookup via Δ
- [[implicits-as-coeffects]] ← REVISES — Coeffect-based approach
- [[deferred-constraint-solving]] ← ENABLES — Full context for resolution
- [[bidirectional-checking-decision]] ← COMPOSES_WITH — Mode switch triggers insertion
- [[agda-influence]] ← INSPIRES — Instance resolution
- [[dunfield-krishnaswami]] ← INFORMS — Subsumption in bidir
- [[implicit-resolution-solver]] ← IMPLEMENTS — Solver-side mechanism
- [[constraint-solver]] ← ENABLES — Δ lookup phase
- [[functional-dependencies]] ← INFORMS — Determinacy in implicit search
- [[typeclass-coherence]] ← APPLIES_TO — First-match semantics
- [[dictionary-passing]] ← RELIES_ON — Dictionaries threaded via implicits
- [[implicits-as-coeffects-exploration]] ← EXTENDS — Coeffect model for implicit requirements
- [[implicit-hole-syntax]] ← INFORMS — Surface marker for existing implicit resolution behavior
- [[implicit-calculus]] ← INFORMS — Prior art for principled implicit values

<!-- connections:end -->

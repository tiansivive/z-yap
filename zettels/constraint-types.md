---
tags:
  [
    concept,
    elaboration,
    unification,
    code,
    ast,
    inference,
    dependent,
    monad,
    tracing,
    performance,
    reference,
    implemented,
  ]
---
# Constraint types

Defined in `src/elaboration/solver/solver.ts` as `Constraint` (re-exported through `src/elaboration/solver/index.ts` → `src/elaboration/index.ts`):

- **`{ type: "assign"; left: NF.Value; right: NF.Value; lvl: number }`** — disequality solved by `U.unify` inside `solve`’s `_solve` loop.
- **`{ type: "resolve"; meta: EB.Meta; value: NF.Value; implicits: EB.Context["implicits"] }`** — emitted from `src/elaboration/implicits.ts` when inserting a fresh meta for an implicit argument; `resolve` later picks a `using`-scope implicit by unifying `NF.force(ctx, value)` against successive `implicits` entries.

A commented `usage` variant is absent from the active sum; usage-related `tell` calls in `check.ts` / `statements.ts` remain commented.

Solver entry `solve(cs: Array<WithProvenance<Constraint>>)` returns `{ zonker: Subst; resolutions: Resolutions }` with `Resolutions = Record<number, EB.Term>` keyed by meta `val`.

<!-- connections:start -->

## Connections

**Outgoing**
- ENABLES → [[constraint-solver]] — Typed constraints
- DISPATCHES_ON → [[constraint-solver]] — Assign vs resolve

**Incoming**
- [[implicit-resolution]] ← RESOLVES — Δ lookup for resolve constraints
- [[constraint-solver]] ← RESOLVES — Processes queue
- [[deferred-constraint-solving]] ← RESOLVES — At let boundaries
- [[implicit-resolution]] ← DISPATCHES_ON — Resolve → Δ, assign → unify

<!-- connections:end -->

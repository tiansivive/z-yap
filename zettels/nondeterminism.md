---
tags:
  [
    continuation,
    elaboration,
    unification,
    inference,
    mechanism,
    implemented,
    monad,
    normalization,
    type-system,
    effect,
    lowering,
    codegen,
    migration,
    testing,
    backend,
    problem,
    reference,
    infrastructure,
    rewriting,
    display,
  ]
---
# Nondeterminism (Solver)

Name is historical: `MutState.nondeterminism` in `src/elaboration/shared/monad.v2.ts` holds `solution: Record<number, NF.Value[]>`—**lists of candidate resume arguments** keyed by resumption meta id (`src/elaboration/inference/shift.ts` updates this in `resume`).

`replay` (`src/elaboration/solver/nondeterminism.ts`) runs only when that map is non-empty. It uses `fp-ts` `Record.sequence` on those arrays—Cartesian product of every meta’s candidate list—mapping each tuple to a partial zonker `Record<number, NF.Value>`.

For each zonker fragment it invokes the supplied elaboration thunk (currently `_letdec` in `src/elaboration/inference/statements.ts`), collects answers, then `letdec` unifies instantiated types pairwise via `unify` across the remainder (`statements.ts` loop after `replay`).

Empty map → single run with the ambient zonker (`replay` early return).

Scope is continuation-specific: `replay` branches only on resumption-meta candidate lists accumulated during shift/reset elaboration, not on unrelated metavariable branching elsewhere in the solver.

<!-- connections:start -->

## Connections

**Outgoing**
- ENABLES → [[shift-reset]] — Multishot continuations
- INSTANTIATES → [[meta-variables]] — Solution combinations
- IMPLEMENTS → [[shift-reset]] — Multishot continuation semantics
- THREADS_THROUGH → [[elaboration-monad]] — MutState.nondeterminism.solution
- DISPATCHES_ON → [[constraint-solver]] — Solution emptiness (single vs replay)

**Incoming**
- [[continuation-binders]] ← RELIES_ON — Multishot semantics
- [[constraint-solver]] ← USES — Multishot replay
- [[elaboration-monad]] ← DELEGATES_TO — MutState for skolems, metas
- [[shift-reset]] ← DELEGATES_TO — Multishot replay
- [[delimited-continuations.thread]] ← INCLUDES
- [[bubble-semantics]] ← USES — Resume values from nondeterminism.solution

<!-- connections:end -->

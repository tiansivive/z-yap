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

Not general solver nondeterminism: no comparable machinery for unrelated metavariable branching outside this continuation hook.

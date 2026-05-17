---
tags:
  [
    continuation,
    elaboration,
    inference,
    unification,
    mechanism,
    implemented,
    effect,
    monad,
    type-system,
    normalization,
    lowering,
    codegen,
    testing,
    migration,
    compiler,
    backend,
    ast,
    reference,
    pattern,
    infrastructure,
  ]
---
# Nondeterminism (Multishot Replay)

Each `resume` appends one evaluated argument `va` to `state.nondeterminism.solution[binder.resumption.meta.val]` (`src/elaboration/inference/shift.ts`), newest first.

End of a `let` declaration (`src/elaboration/inference/statements.ts` `letdec`): if `nondeterminism.solution` is empty, `_letdec({}, …)` runs once. Otherwise `yield* replay(_letdec)` expands the Cartesian product (`src/elaboration/solver/nondeterminism.ts`).

Each replay arm composes `nondet = update(withMetas, "zonker", old => ({ ...old, ...z }))`, calls `EB.solve` under that zonker, runs `NF.generalize` with the same `skolems` snapshot, returns `[instantiated, next, resolutions]`. The first arm’s `instantiated` is kept; subsequent arms’ types are unified into the final context via `unify` + composed substitution.

Purpose: multishot programs type `k` applications under mutually exclusive argument choices without committing to a single resume value during the first pass.

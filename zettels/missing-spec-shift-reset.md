---
tags:
  [
    continuation,
    type-system,
    elaboration,
    lowering,
    drift,
    incomplete,
    needs-design,
    reference,
    inference,
    mir,
    compiler,
    backend,
    effect,
    ast,
    ir,
    project,
    migration,
    testing,
    verification,
    unification,
    problem,
    infrastructure,
  ]
---
# Missing Spec: Shift/Reset Typing

Authoritative behavior today lives in **implementation sources**:

- Inference: `src/elaboration/inference/shift.ts`, `src/elaboration/inference/reset.ts`; mutable delimiter state and `nondeterminism.solution` in `src/elaboration/shared/monad.v2.ts`.
- Multishot replay at declarations: `src/elaboration/inference/statements.ts` (`letdec`) + `src/elaboration/solver/nondeterminism.ts`.
- NbE semantics sketch: `src/elaboration/normalization/evaluation.v2.ts`.
- Lowering: `src/lowering/continuations/{reset,shift,kcall}.ts` — block graphs, `Alloc`/`Read`/`Jump`/`Branch`, multishot via shared resume block + indexed `Jump`.

One approach for onboarding would be a single typed-rule write-up (answer types, `Continuation` binder, replay invariant, lowering prerequisites such as enclosing `Reset`) aligned with those files.

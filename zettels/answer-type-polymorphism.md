---
tags:
  [
    continuation,
    type-system,
    elaboration,
    inference,
    unification,
    concept,
    mechanism,
    implemented,
    dependent,
    pattern,
    effect,
    normalization,
    mir,
    migration,
    principle,
    codegen,
    lowering,
  ]
---
# Answer-type Polymorphism

`reset` allocates **two** type metas (`metaA`, `metaR` in `src/elaboration/inference/reset.ts`) exposed as `Delimitation.answer.initial` and `answer.final`. Intuition (from comments there): initial answer is what the reset body would return without shifts; final is the reset expression’s type after shifts.

While `shifted` stays false, `reset` emits `yield* V2.tell("constraint", { type: "assign", left: d.answer.initial, right: d.answer.final })`, forcing both metas to unify.

When `shift` runs (`src/elaboration/inference/shift.ts`), it sets `delimitations.0.shifted` and temporarily assigns `answer.initial := answer.final` before checking the shift body, then restores `answer.initial`—so the continuation’s codomain tracks the evolving answer type across the delimiter.

This is orthogonal to multishot recording: repeated `resume` still only fills `nondeterminism.solution`; answer metas concern the **type** of the delimiter, not the replay machinery (`src/elaboration/solver/nondeterminism.ts`).

<!-- connections:start -->

## Connections

**Outgoing**
- GENERALIZES → [[pi-types]] — Monomorphic → polymorphic answer
- USES → [[pi-types]] — Polymorphic answer type is a Pi

**Incoming**
- [[shift-reset]] ← USES — k has polymorphic answer type
- [[danvy-filinski]] ← INFORMS — Answer type modification
- [[delimited-continuations.thread]] ← INCLUDES
- [[bubble-semantics]] ← USES — ann carries answer type A
- [[shift-reset-verification]] ← USES — Bubble type = answer type A
- [[arm-paper]] ← INFORMS — Extends ATM to refinement level

<!-- connections:end -->

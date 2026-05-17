---
tags:
  [
    modality,
    type-system,
    elaboration,
    verification,
    inference,
    ast,
    drift,
    problem,
    pattern,
    unification,
    display,
    monad,
    project,
    incomplete,
  ]
---
# Modality drift: where shape lives vs what survives inference

**Core AST:** modalities are not a separate erasable layer in `EB.Term`: they are the `Modal` constructor with `Modal.Annotations<EB.Term>` (`src/elaboration/syntax/term.ts`).

**Inference output:** `EB.infer` rewrites the synthesized `NF.Value` with `stripModalities`, removing nested `NF.Modal` wrappers from types produced by inference (`src/elaboration/elaborate.ts`). The surrounding comment says verification should handle modalities separately and flags a future refinement-template story.

**Tracking without enforcement:** `V2` elaboration state still records `{ nf, modalities }` per term id (`src/elaboration/shared/monad.v2.ts` collector `types` / `tell("type", …)` payload), while constraint solving ignores usage constraints (`src/elaboration/solver/solver.ts`).

**Verification path:** `NF.Modal` with `quantity` + `liquid` is consumed for subtyping and extraction (`src/verification/V2/utils/refinements.ts`, `src/verification/V2/subtype.ts`), but multiplicity checking is explicitly unfinished (`src/verification/ARCHITECTURE.md`).

Net: modalities are fully represented in AST and NF, partially tracked in elaboration metadata, weakened on inferred types, and checked logically (liquid) without QTT enforcement.

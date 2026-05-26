---
tags:
  [
    type-system,
    verification,
    elaboration,
    normalization,
    sat,
    modality,
    dependent,
    row-types,
    concept,
    mechanism,
    inference,
    incomplete,
    reference,
    display,
  ]
---
# Refinement types (liquid modalities)

Refinements live in the same `Modal.Annotations<_>` spine as multiplicities: a modal type carries `liquid` as an `EB.Term` predicate and `quantity` as `Q.Multiplicity` (`src/verification/modalities/shared.ts`, `NF.Value` / `EB.Term` modal constructors).

Surface modal terms elaborate through `EB.Modal.infer`, which typechecks `liquid` against `Liquid.Predicate.Kind(ctx, nf)` (`src/elaboration/inference/modal.ts`, `src/elaboration/modalities.ts`).

The verification subsystem (`VerificationServiceV2` in `src/verification/V2/service.ts`) checks elaborated terms against types by generating **IVL** verification conditions (`check`, `synth`, `subtype`). Translation is `src/verification/V2/logic/translate.ts`; refinement helpers include `selfify`, `meet`, `extractModalities` in `src/verification/V2/utils/refinements.ts`. (Z3-class solvers still enter via **`z3.adapter.ts`** when tooling uses them — [[verification-pipeline]].)
Modal subtyping relates liquid predicates (with neutral lift for non-modal sides) in `src/verification/V2/subtype.ts`.

**Gaps:** multiplicity checking is not part of the verification pass today. `VerificationArtefacts = { vc; nf? }` (`src/verification/V2/types.ts`) carries VC formulas only; usage vectors live in the separate `Artefacts` shape in `modalities/shared.ts` and are not threaded through `VerificationServiceV2`.

**Gaps:** elaboration strips modal wrappers from inferred types via `stripModalities` (`src/elaboration/elaborate.ts`), so inferred refinements are not preserved for downstream phases unless types stay explicitly modal.

End-to-end refinement tests live under `src/verification/__tests__/check.test.ts` (snapshots under `__snapshots__/`).

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

<!-- connections:start -->

## Connections

**Outgoing**
- RELIES_ON → [[verification-pipeline]] — Z3 discharges VCs
- COMPOSES_WITH → [[sigma-types]] — :fst in predicates
- SUBSUMES → [[pi-types]] — Refined T subtype of T
- COERCES_TO → [[pi-types]] — Forget rule strips predicate
- COMPOSES_WITH → [[pi-types]] — Refined function domains/codomains

**Incoming**
- [[pi-types]] ← COMPOSES_WITH — Refined domains/codomains
- [[modalities]] ← COMPOSES_WITH — Modal + refined
- [[refinement-inference]] ← EXTENDS — Inferred refinements
- [[liquid-haskell-influence]] ← INSPIRES — SMT automation
- [[smt-translation]] ← TRANSLATES_TO — Verification conditions
- [[vc-ir]] ← ENCODES — Predicates as VC.Formula
- [[quantifier-engine]] ← IMPLEMENTS — Guarded universal quantification
- [[verification-pipeline]] ← DETECTS — Counterexample generation
- [[verification-backend.thread]] ← INCLUDES
- [[bidir-subtype-verification]] ← GROUNDED_IN — Liquid type theory
- [[negative-testing]] ← TARGETS
- [[first-order-restriction.adr]] ← CONSTRAINS — Restricts self-equality and quantification to first-order types
- [[sigma-value-semantics]] ← COMPOSES_WITH — Field refs in refinement predicates

<!-- connections:end -->

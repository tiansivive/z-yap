---
tags:
  [
    verification,
    normalization,
    inference,
    elaboration,
    implemented,
    backend,
    sat,
    validity,
    liquid,
    dependent,
    row-types,
    strings,
    quantifiers,
    cli,
    compiler,
    testing,
    reference,
    milestone,
    tracing,
    error-handling,
  ]
---
# Verification pipeline (hub)

## Implemented path

`VerificationServiceV2` (`src/verification/V2/service.ts`): `createRuntime` → `createTranslationTools` (`src/verification/V2/logic/translate.ts`) → `createSubtype`, `createCheck`, `createSynth`. Public API: `check`, `synth`, `subtype`, `getObligations` (`src/verification/V2/types.ts`).

**Artefacts (today):** `VerificationArtefacts.vc` and obligation `expr` are **`IVL.Formula`** (`src/verification/V2/types.ts`). Obligation **labels/context** still come from `VerificationRuntime`.

**Previously:** the same pipeline stored **`vc`** as **`z3-solver` `Expr`** and built Z3 values directly in `translate.ts` — see [[smt-translation]] for that encoding record.

**Elaboration hook:** `src/elaboration/module.ts` **`letdec`** runs **`Verification.check`**. VC construction is solver-neutral IVL via `translate.ts`; verifier-facing results should pass through [[vc-validity-discharge]] before raw SAT output is reported.

Tests snapshot VC s-expressions (IVL printer): `src/verification/__tests__/check.test.ts`.

## Solver stack (`src/verification/solver/`)

`src/verification/solver/`: **IVL** (`solver/ivl/`), validity discharge (`src/verification/validity.ts`), v2 **normalization**, **Skolemization**, **CNF**, **CDCL**, **EUF**, linear **arithmetic**, and **quantifiers**. Primary raw satisfiability follows the v2 stack ([[m1-implementation]], [[m2-implementation]], [[solver-v2-monadic-port.implementation]]); verification verdicts use D-009 validity polarity before that raw solver result is exposed.

**Still open:** dedicated **string** and **row** solver theories ([[milestone-3-strings]], [[milestone-4-rows]]), complete validity wrapper use across CLI/explorer/module verdict paths ([[vc-validity-discharge]]), obligation-linked UNSAT / counterexample UX ([[milestone-5-explanations]]), pluggable **`VerificationBackend`** abstraction — merging the IVL/CDCL milestones did **not** close that roadmap ([[verification-backend.thread]]).

Related zettels: `milestone-1-ir-boundary.md`, `milestone-2-euf-quant-lia.md`, `milestone-3-strings.md`, `milestone-4-rows.md`, `milestone-5-explanations.md`, `translation-boundary-vc.md`, `solver-module-layout.md`, `smt-translation.md`, `euf-theory.md`, `arithmetic-theory.md`, `string-theory.md`, `row-theory.md`, `theory-plugin-interface.md`, `cdcl-t-solver.md`, `vc-ir.md`.

<!-- connections:start -->

## Connections

**Outgoing**
- VALIDATES → [[v1-elaboration-pipeline]] — On-demand, not pipeline stage
- TRANSLATES_TO → [[smt-translation]] — Types → Z3 assertions
- COMPOSES_WITH → [[v1-elaboration-pipeline]] — Post-hoc validation
- DELEGATES_TO → [[verification-backend]] — Satisfiability checking
- PRODUCES → [[vc-ir]] — VC.Formula via translation boundary
- ERASES → [[pi-types]] — Functions → uninterpreted
- DETECTS → [[refinement-types]] — Counterexample generation
- REPORTS → [[provenance-system]] — Provenance-annotated failures

**Incoming**
- [[yap]] ← INCLUDES — Verification component
- [[compile-orchestration]] ← DELEGATES_TO — On-demand
- [[refinement-types]] ← RELIES_ON — Z3 discharges VCs
- [[smt-translation]] ← IMPLEMENTS — Z3 translation
- [[smt-translation]] ← TRANSLATES_TO — Z3 sorts/assertions
- [[vc-provenance]] ← EXTENDS — Error quality
- [[vc-provenance]] ← REPORTS — Provenance-annotated failures
- [[verification-modal-phase]] ← DELEGATES_TO — Modal obligations discharged in verification
- [[dynamic-reflection]] ← COMPOSES_WITH — Proof-gated casts
- [[compcert-cakeml-influence]] ← INSPIRES — Verified compilation aspiration
- [[vc-ir]] ← TRANSLATES_TO — NF.Value → formulas
- [[cdcl-t-solver]] ← IMPLEMENTS — Replaces Z3
- [[verification-backend]] ← SPECIALIZES — Backend subsystem of the pipeline
- [[row-theory]] ← PRESERVES — subtype.contains() semantics
- [[z3-replacement.adr]] ← PRESERVES — Shape unchanged
- [[effects-as-modality]] ← COMPOSES_WITH — Effect verification
- [[milestone-5-explanations]] ← ADDRESSES — Error quality improvement
- [[vc-ir]] ← ENCODES — All formula forms from current verification
- [[required-formula-forms]] ← ENCODES — Existing verification capabilities
- [[verification-backend.thread]] ← INCLUDES
- [[lambda-synthesis-fix]] ← FIXES — Corrects Pi type construction in V2 synth
- [[pipeline-explorer]] ← DELEGATES_TO — Calls VerificationServiceV2 directly
- [[shift-reset-verification-stub]] ← EXTENDS — Adds Reset/Shift cases (transparent/opaque)
- [[shift-reset-verification]] ← EXTENDS — Adds Reset/Bubble cases with quantification
- [[selfification]] ← RELIES_ON — Called from synth (Bound var path)
- [[first-order-restriction.adr]] ← RELIES_ON — Used in synth (selfify) and subtype (Pi parameter)
- [[syn-app-ex-modification]] ← RELIES_ON — incorporate fn in synth.ts
- [[verification-unconstrained-meta]] ← ADDRESSES — Unsolved meta reaches IVL
- [[verification-rigid-mismatch]] ← ADDRESSES — Rigid comparison failure
- [[vacuous-ivl-vcs]] ← ADDRESSES — Tautological VCs from selfification
- [[vc-validity-before-sat.adr]] ← CLARIFIES — Pipeline boundary between VC generation and raw SAT

<!-- connections:end -->

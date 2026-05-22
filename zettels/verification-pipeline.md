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

Artefacts: `VerificationArtefacts` with `vc: Expr` (Z3), optional `nf`. Obligations record labeled Z3 booleans via `VerificationRuntime`.

Elaboration hook: `src/elaboration/module.ts` `letdec` calls `Verification.check` after binding; on success pushes `artefacts.vc` into `zCtx.Solver()` (async logging/diagnostics).

Tests snapshot VC S-exprs: `src/verification/__tests__/check.test.ts`.

## In-house solver (partial / branch-dependent)

`src/verification/solver/` exists on the ivl worktree path: IVL (`solver/ivl/`), formula normalization and Skolemization, CNF (`cnf.ts`), CDCL core (`cdcl/`), EUF (`theories/euf/`), linear arithmetic (`theories/arithmetic/`), quantifier engine (`quantifiers/`). **main** still emits Z3 `Expr` from `translate.ts` by default; wiring IVL end-to-end is branch/worktree dependent (see [[vc-ir.md]], [[verification-backend.md]]).

**Still open:** dedicated string and row theories, obligation-linked UNSAT cores / counterexample UX (Milestone 5), pluggable `VerificationBackend` abstraction.

Related zettels: `milestone-1-ir-boundary.md`, `milestone-2-euf-quant-lia.md`, `milestone-3-strings.md`, `milestone-4-rows.md`, `milestone-5-explanations.md`, `translation-boundary-vc.md`, `solver-module-layout.md`, `smt-translation.md`, `euf-theory.md`, `arithmetic-theory.md`, `string-theory.md`, `row-theory.md`, `theory-plugin-interface.md`, `cdcl-t-solver.md`, `vc-ir.md`.

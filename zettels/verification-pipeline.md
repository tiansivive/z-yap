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

**Artefacts (today):** `VerificationArtefacts.vc` and obligation `expr` are **`IVL.Formula`** (`src/verification/V2/types.ts`). Obligation **labels/context** still come from `VerificationRuntime`.

**Previously:** the same pipeline stored **`vc`** as **`z3-solver` `Expr`** and built Z3 values directly in `translate.ts` — see [[smt-translation]] for that encoding record.

**Elaboration hook:** `src/elaboration/module.ts` **`letdec`** runs **`Verification.check`**; downstream code may still construct **`z3-solver`** `Solver` instances for diagnostics or adapter-driven checks — that is separate from **how VCs are built** (IVL via `translate.ts`).

Tests snapshot VC s-expressions (IVL printer): `src/verification/__tests__/check.test.ts`.

## Solver stack (`src/verification/solver/`)

`src/verification/solver/`: **IVL** (`solver/ivl/`), **normalize**, **Skolem**, **CNF** (`cnf.ts`), **CDCL** (`cdcl/`), **EUF** (`theories/euf/`), linear **arithmetic** (`theories/arithmetic/`), **quantifiers** (`quantifiers/`). Primary satisfiability follows this stack ([[m1-implementation]], [[m2-implementation]]). **`z3.adapter.ts`** translates **IVL → Z3** when a Z3-side oracle or comparison is desired.

**Still open:** dedicated **string** and **row** solver theories ([[milestone-3-strings]], [[milestone-4-rows]]), obligation-linked UNSAT / counterexample UX ([[milestone-5-explanations]]), pluggable **`VerificationBackend`** abstraction — merging the IVL/CDCL milestones did **not** close that roadmap ([[verification-backend.thread]]).

Related zettels: `milestone-1-ir-boundary.md`, `milestone-2-euf-quant-lia.md`, `milestone-3-strings.md`, `milestone-4-rows.md`, `milestone-5-explanations.md`, `translation-boundary-vc.md`, `solver-module-layout.md`, `smt-translation.md`, `euf-theory.md`, `arithmetic-theory.md`, `string-theory.md`, `row-theory.md`, `theory-plugin-interface.md`, `cdcl-t-solver.md`, `vc-ir.md`.

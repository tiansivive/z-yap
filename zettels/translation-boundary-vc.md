---
tags:
- verification
- elaboration
- normalization
- incomplete
- reference
- ir
- inference
- backend
- sat
- quantifiers
- dependent
- modality
- migration
- testing
- project
- principle
- codegen
- ffi
---
# Translation boundary (VC IR)

**Intent:** VC generation (`TranslationTools`: `mkSort`, term/formula builders, `quantify`) targets a **solver-neutral IR** (**IVL**) so `createCheck` / `createSynth` / `createSubtype` stay stable when the proving engine changes. Earlier Yap built **`z3-solver`** `Expr` directly from `NF.Value` — superseded encoding lives under [[smt-translation]].

**Shape today:** `src/verification/V2/logic/translate.ts` emits **`IVL.Sort`**, **`IVL.Term`**, **`IVL.Formula`** via **`Build`**; **`quantify`** wraps modal/refinement payloads with **`Build.forall`** + **`Build.implies`** (see [[vc-ir]]).

**Z3 bridging:** **`z3.adapter.ts`** encodes IVL formulas into Z3 for cross-checking, regressions, and tooling paths that still allocate a **`z3-solver`** `Context`.

**Open design:** a small **`VerificationBackend`** (`solve` over IVL + obligations → result) formalizes swapping in-house **`solve`** vs external engines without rewriting VC emission ([[verification-backend]], [[verification-backend.thread]]).

<!-- connections:start -->

## Connections

**Outgoing**
- SUPERSEDES → [[smt-translation]] — New translation tools
- CONSUMES → [[nf-value]] — NF.Value input
- DELEGATES_TO → [[vc-ir]] — Produces VC types

**Incoming**
- [[vc-normalization]] ← FOLLOWS — After translation
- [[milestone-1-ir-boundary]] ← PRODUCES — Translation tools
- [[verification-backend.thread]] ← INCLUDES
- [[m1-implementation]] ← IMPLEMENTS — z3.adapter.ts realizes the boundary
- [[m1-implementation]] ← PRESERVES — Keeps Z3 working during transition

<!-- connections:end -->

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

**External solver boundary:** IVL keeps external-oracle adapters possible without changing VC emission. The active repository path uses the in-tree solver; the removed Z3 adapter belongs to the superseded translation era.

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
- [[m1-implementation]] ← IMPLEMENTS — IVL builder and translation tools realize the boundary
- [[m1-implementation]] ← PRESERVES — Kept the solver boundary stable during transition
- [[block-scoped-let-vc-parity-bug]] ← AFFECTS — Generated IVL shape appears suspicious

<!-- connections:end -->

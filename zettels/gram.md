---
tags:
- lowering
- rewriting
- compiler
- in-progress
- graph
- ir
- project
- infrastructure
- mir
- tooling
- cli
- display
---

# GRAM (hub)

**Graph Rewriting Abstract Machine** — compilation IR as an open-vocabulary **property graph** refined by passes (`src/GRAM/README.md`).

**Core code:** `graph.ts` (immutable graph ops), `vocabulary.ts` (tag/label constants), `translate.ts` (`EB.Term` → graph), `display.ts`, `grs/` (DPO engine), `pipeline/` (`Descriptor`, `configure`, `verify`), `passes/` (η, saturate, closure). Public API surface: `src/GRAM/index.ts`, path alias `@yap/gram`.

**Default pipeline:** `pipeline/index.ts` — `configure(eta, saturate, closure)` after `translate`; `compile` runs verification (`verify.ts`). Exploration CLI prints GRAM beside MIR (`src/cli/explore/pipeline.ts`).

**Tests:** Shift/reset GRAM scenarios are explicitly skipped pending lowering (`src/GRAM/__tests__/pipeline.test.ts`).

**Planning doc:** `.cursor/plans/gram-implementation.md` scopes translation + graph substrate.

**Related zettels:** `mir-lowering.md` (implemented EB→MIR path), `dpo-rewriting.md`, `logram.md`, `gram-step-1.md`, `closure-conversion.md`.

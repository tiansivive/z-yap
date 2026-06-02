---
tags:
- compiler
- speculative
- graph
- tooling
- migration
- syntax
- elaboration
- project
- cli
- backend
- language
- infrastructure
---

# Passes in Yap

**Implemented today:** GRAM passes are TypeScript modules under `src/GRAM/passes/` (e.g. `eta.ts`, `saturate.ts`, `closure.ts`), composed through `pipeline/configure.ts` descriptors. MIR lowering “pass” is the `lowerToMir` driver plus submodules under `src/lowering/`.

**CLI wiring:** `src/cli/explore/pipeline.ts` imports GRAM translate, η, saturate, closure, and MIR `lowerToMir` for side-by-side artifacts.

**Self-hosted passes:** [[programmable-gram-passes]] provides the design — user-written DPO rewrite rules as Yap values, dispatched by a Kernel meta-pass that walks modal annotations on `EB.Term`. Rule definitions evaluate via NbE; the existing match/rewrite engine in `src/GRAM/grs/` runs them. The architectural choice that puts extensibility at the modal layer rather than in the elaborator is captured in [[extensibility-via-modalities.adr]].

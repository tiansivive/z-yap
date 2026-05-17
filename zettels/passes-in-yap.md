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

**Self-hosted passes (speculative):** No compiler package loads Yap-authored rewrite rules from `.yap` sources; all graph pass logic ships as TS in this repository. Any future surface-language pass DSL would need a separate bootstrap story.

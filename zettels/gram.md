---
tags:
- lowering
- rewriting
- compiler
- implemented
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

**Core principles:** Additive enrichment (passes add, never delete), dataflow semantics (partial order, not total order), compilation by selection (backends choose which views to consume).

**Core code:** `graph.ts` (immutable graph ops), `vocabulary.ts` (tag/label constants), `translate.ts` (`EB.Term` → graph, including pattern graph nodes), `display.ts`, `grs/` (DPO engine), `pipeline/` (`Descriptor`, `configure`, `verify`), `passes/` (η, saturate, shift-reset, pattern, closure). Public API surface: `src/GRAM/index.ts`, path alias `@yap/gram`.

**Default pipeline:** `pipeline/index.ts` — `configure(eta, saturate, shiftReset, pattern, closure)` after `translate`; `compile` runs verification (`verify.ts`). Exploration CLI prints GRAM beside MIR (`src/cli/explore/pipeline.ts`).

**Tests:** Full coverage across all passes: `src/GRAM/__tests__/` (translate, pipeline, pattern, shift-reset, saturate, eta, closure, dpo, graph).

**Related zettels:** `gram-additive-enrichment` (principle), `gram-dataflow-semantics` (principle), `compilation-by-selection` (architecture), `gram-shift-reset-pass`, `gram-pattern-translation`, `gram-pattern-pass`, `gram-to-mir-bridge` (speculative), `dpo-rewriting`, `logram`, `closure-conversion`.

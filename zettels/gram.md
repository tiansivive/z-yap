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

> Canonical role: per D-006 ([[gram-canonical-ir.adr]]), GRAM is the canonical compilation IR; the pipeline flows `EB.Term → GRAM → MIR → codegen` via `GRAM.Bridge.emit`. The "GRAM runs in parallel to MIR" framing in older zettels predates that decision.

**Graph Rewriting Abstract Machine** — compilation IR as an open-vocabulary **property graph** refined by passes (`src/GRAM/README.md`).

**Core principles:** Additive enrichment (passes add, never delete), dataflow semantics (partial order, not total order), compilation by selection (backends choose which views to consume).

**Core code:** `graph.ts` (immutable graph ops), `vocabulary.ts` (tag/label constants), `translate.ts` (`EB.Term` → graph, including pattern graph nodes), `display.ts`, `grs/` (DPO engine), `pipeline/` (`Descriptor`, `configure`, `verify`), `passes/` (η, saturate, shift-reset, pattern, closure). Public API surface: `src/GRAM/index.ts`, path alias `@yap/gram`.

**Default pipeline:** `pipeline/index.ts` — `configure(eta, saturate, shiftReset, pattern, closure)` after `translate`; `compile` runs verification (`verify.ts`). Exploration CLI prints GRAM beside MIR (`src/cli/explore/pipeline.ts`).

**Tests:** Full coverage across all passes: `src/GRAM/__tests__/` (translate, pipeline, pattern, shift-reset, saturate, eta, closure, dpo, graph).

**Related zettels:** `gram-additive-enrichment` (principle), `gram-dataflow-semantics` (principle), `compilation-by-selection` (architecture), `gram-shift-reset-pass`, `gram-pattern-translation`, `gram-pattern-pass`, `gram-to-mir-bridge` (speculative), `dpo-rewriting`, `logram`, `closure-conversion`.

<!-- connections:start -->

## Connections

**Outgoing**
- SUPERSEDES → [[mir-lowering]] — As IR approach
- REWRITES → [[dpo-rewriting]] — DPO rules refine graph
- PRESERVES → [[nbe]] — Semantic equivalence per pass
- TRANSLATES_TO → [[js-codegen]] — Target-specific passes
- TRANSLATES_TO → [[c-codegen]] — Target-specific passes
- TRANSLATES_TO → [[erlang-codegen]] — Target-specific passes
- DELEGATES_TO → [[dpo-rewriting]] — Graph transformation engine
- IMPLEMENTS → [[gram-graph-ir.adr]] — The hub realizes the IR decision
- INCLUDES → [[gram-shift-reset-pass]] — Pipeline pass
- INCLUDES → [[gram-pattern-translation]] — Translation phase
- INCLUDES → [[gram-pattern-pass]] — Pipeline pass
- GENERALIZES → [[mir-lowering]] — Richer representation subsumes sequential form
- IMPLEMENTS → [[gram-canonical-ir.adr]] — src/GRAM materialises the canonical pipeline
- INCLUDES → [[shift-reset-bridge-lowering]] — Bridge-resident continuation lowering
- INCLUDES → [[multishot-bridge-serialization]] — Bridge-resident multishot serialisation

**Incoming**
- [[ffi-saturation-gram]] ← RELIES_ON — Operates on enriched GRAM graph
- [[dpo-rewriting]] ← IMPLEMENTS — Rewriting engine
- [[dpo-rewriting]] ← TRAVERSES — Pattern matching for rule LHS
- [[structural-vs-representational-passes]] ← CONSTRAINS — Ordering principle
- [[mir-retrospective]] ← INFORMS — Lessons learned
- [[mir-retrospective]] ← MOTIVATES — Why GRAM exists
- [[gram-step-1]] ← IMPLEMENTS — Partial — first step
- [[logram]] ← EXTENDS — Speculative substrate
- [[typed-pass-composition]] ← EXTENDS — Type-safe passes
- [[passes-in-yap]] ← EXTENDS — Self-hosting passes
- [[mlir-influence]] ← INSPIRES — Open vocabulary / dialects
- [[nanopass-influence]] ← INSPIRES — Composable passes
- [[compcert-cakeml-influence]] ← INSPIRES — Refinement terminology
- [[gram-step-1]] ← TRANSLATES_TO — EB.Term → GRAM nodes
- [[logram]] ← TRANSLATES_TO — Triple store / Datalog facts
- [[dpo-rewriting]] ← REWRITES — L ← K → R rule application on nodes
- [[gram-graph-ir.adr]] ← DOCUMENTS — The IR substrate decision
- [[mlir-influence]] ← MIRRORS — Dialects ↔ tag vocabularies, passes ↔ rewrites
- [[structural-vs-representational-passes]] ← DISTINGUISHES — Eta/beta/fold before closure-conv/defunc
- [[gram-additive-enrichment]] ← CONSTRAINS — All passes must follow
- [[gram-dataflow-semantics]] ← CONSTRAINS — No forced sequencing in graph
- [[gram-shift-reset-pass]] ← IMPLEMENTS — Pipeline pass
- [[gram-pattern-translation]] ← IMPLEMENTS — Part of translate.ts
- [[gram-pattern-pass]] ← IMPLEMENTS — Pipeline pass
- [[gram-to-mir-bridge]] ← CONSUMES — Reads enriched graph
- [[gram-interpreter]] ← EXTENDS — Execution semantics for graph
- [[gram-next-steps]] ← APPLIES_TO — Near-term roadmap
- [[stg-analogy]] ← INFORMS — Pipeline layering inspiration
- [[dpo-vs-imperative-passes]] ← CONSTRAINS — Pass implementation guide
- [[gram-evolution.thread]] ← INCLUDES
- [[gram-crud-enrichment]] ← ENRICHES — Adds access mode annotation to proj/inj nodes
- [[mode-annotation-strategy]] ← PRODUCES — access_mode edges on inj nodes
- [[lambda-lifting]] ← APPLIES_TO — GRAM enrichment pass
- [[explorer-diff-mode]] ← ENABLES — Visualize what a GRAM pass changed
- [[explorer-timing]] ← REPORTS — Per-pass timing within GRAM
- [[explorer-graph-viz]] ← USES — Renders GRAM property graph
- [[pattern-row-binder-fix]] ← FIXES — walkPatternRow de Bruijn alignment
- [[length-recursive-debruijn]] ← FIXES — Variant pattern rest row binder + parent binder stack
- [[gram-type-uniformity]] ← APPLIES_TO — Uniform type representation across GRAM nodes
- [[gram-canonical-ir.adr]] ← DOCUMENTS — D-006 documents GRAM's canonical-IR role

<!-- connections:end -->

---
tags:
  - concept
  - graph
  - ir
  - compiler
  - lowering
  - modality
  - multiplicity
  - mutation
  - data-access
  - ownership
  - planned
---
# GRAM CRUD enrichment

A GRAM pass that annotates `proj` and `inj` nodes with access modes derived from multiplicity annotations in the elaborated term.

## Semantics

- **`proj` → Read.** Always safe regardless of multiplicity. No mode annotation needed.
- **`inj` → Update.** Mode depends on multiplicity of the target value:
  - `exclusive` (One) — in-place mutation is safe; the value has no other references.
  - `shared` (Many/unknown) — structural sharing; allocate a new copy with the updated field.

## GRAM representation

The pass adds an `:access_mode` edge from `inj` nodes to a payload node carrying `{ mode: "shared" | "exclusive" }`. This is pure additive enrichment — the original `inj` node retains all its semantic edges (`:target`, `:value`). Backends that don't care about modes ignore the annotation entirely.

## Compile-time uniqueness

Multiplicity is a *type-system property* from elaboration (QTT), not a runtime analysis. When the elaborator says `One`, the compiler knows at compile time that mutation is safe — no runtime refcount check needed. This is Yap's advantage over Lean/Koka which derive uniqueness at runtime via reference counting.

## Conservative default

When elaboration leaves multiplicity unknown or Many, the pass defaults to `"shared"`. This is always sound (never mutates unsafely), with `"exclusive"` opening up as usage constraints land in the verification modal phase ([[verification-modal-phase]]).

<!-- connections:start -->

## Connections

**Outgoing**
- ENRICHES → [[gram]] — Adds access mode annotation to proj/inj nodes
- CONSUMES → [[modalities]] — Multiplicity drives mode selection
- ANNOTATES → [[projection]] — proj → Read (always safe, no mode needed)
- ANNOTATES → [[injection]] — inj → Update (mode from multiplicity)
- RELIES_ON → [[verification-modal-phase]] — Conservative defaults until enforcement works
- INSTANTIATES → [[gram-additive-enrichment]] — Adds edges, never replaces
- INSTANTIATES → [[compilation-by-selection]] — Backends choose whether to read modes
- MIRRORS → [[mir-lowering]] — MIR §6.4 Read/Update is the same concept in CFG form
- FOLLOWS → [[gram-to-mir-bridge]] — After bridge validates graph
- INSTANTIATES → [[gram-dataflow-semantics]] — Mode flows with data, not control
- LOWERS_TO → [[mir-lowering]] — Update{mode} in MIR

**Incoming**
- [[crud-strategy-choice]] ← CONSTRAINS — Strategy determines pass design
- [[mode-annotation-strategy]] ← APPLIES_TO — Simplest enrichment pass
- [[reuse-analysis-strategy]] ← APPLIES_TO — Enrichment layer B
- [[constructor-context-strategy]] ← APPLIES_TO — Enrichment layer C
- [[perceus-reuse-analysis]] ← INSPIRES — FBIP concept adapted for graph IR
- [[counting-immutable-beans]] ← INSPIRES — Graph-level reuse edges
- [[clean-uniqueness-types]] ← INSPIRES — Uniqueness → safe mutation precedent
- [[gram-next-steps]] ← INCLUDES — Planned pass (phase 5)
- [[gram-evolution.thread]] ← INCLUDES
- [[verification-modal-phase]] ← BLOCKS — Conservative defaults until modal enforcement lands
- [[koka-influence]] ← INSPIRES — FBIP concept origin
- [[idris-1-qtt-paper]] ← INSPIRES — Compile-time uniqueness from types
- [[projection]] ← TRANSLATES_TO — Proj → Read in GRAM
- [[injection]] ← TRANSLATES_TO — Inj → Update in GRAM
- [[rows-universal-substrate]] ← ENABLES — Row structure = per-field access
- [[stg-analogy]] ← INFORMS — STG case = semantic; operational compiled later
- [[extensibility-via-modalities.adr]] ← GENERALIZES — CRUD reads multiplicity dimension

<!-- connections:end -->

---
tags:
- project
- planned
- graph
- ir
- compiler
- lowering
- milestone
- rewriting
---

# GRAM next steps

Near-term roadmap after reaching translation + analysis parity with MIR:

1. **GRAM → MIR translation** — ✅ Done. Implemented as `GRAM.Bridge.emit` in `src/GRAM/bridge/` (not `src/lowering/` as originally scoped); per D-006 ([[gram-canonical-ir.adr]]) it is the canonical MIR producer for explorer, REPL, and file-compile, reusing the existing JS/C/Erlang codegen backends. Originally scoped as a regression/CFG-extraction proof; now the production path.

2. **Defunctionalization pass** — GRAM enrichment that replaces indirect calls (closures) with tagged dispatch. Adds `apply` switch nodes keyed by function identity. Backend-specific: GPU/HVM backends need this; JS/Erlang skip it.

3. **Lambda lifting pass** — GRAM enrichment that promotes closures to top-level functions with extra captured-variable parameters. Backend-specific: C/GPU backends need this; JS/Erlang skip it. Builds on the closure pass (which already identifies captures).

4. **CRUD data access enrichment (phased)** — Annotate `inj` nodes with access modes from multiplicity. Three phases:
   - Phase A: mode annotation (`shared`/`exclusive` from multiplicity). Works with conservative defaults.
   - Phase B: reuse analysis (same-shape destruct/construct → `:reuse` edges). Lean-inspired.
   - Phase C: constructor contexts (top-down building with holes). Koka-inspired, likely post-LoGRAM.
   Phase A works without complete multiplicity enforcement. Phases compose additively.

**Longer-term:**
- LoGRAM substrate (triple-store, Datalog queries)
- GRAM interpreter with swappable strategies
- Self-hosted passes (passes written in Yap)

<!-- connections:start -->

## Connections

**Outgoing**
- APPLIES_TO → [[gram]] — Near-term roadmap
- INCLUDES → [[defunctionalization]] — Planned pass
- INCLUDES → [[gram-to-mir-bridge]] — Step 1, implemented (canonical MIR producer per D-006)
- INCLUDES → [[gram-crud-enrichment]] — Planned pass (roadmap item 4)
- INCLUDES → [[lambda-lifting]] — Planned pass (roadmap item 3)

**Incoming**
- [[gram-to-mir-bridge]] ← FOLLOWS — Step 1 (done): now the canonical MIR producer per D-006
- [[gram-evolution.thread]] ← INCLUDES

<!-- connections:end -->

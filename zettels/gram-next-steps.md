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

1. **GRAM -> MIR translation** — a direct translation module that reads the enriched GRAM graph and emits MIR `Module`. Lives alongside MIR code (`src/lowering/`), decoupled from GRAM itself. Purpose: regression test, proof that GRAM captures enough for CFG extraction, reuse existing codegen backends (JS/C/Erlang) without rewriting them.

2. **Defunctionalization pass** — GRAM enrichment that replaces indirect calls (closures) with tagged dispatch. Adds `apply` switch nodes keyed by function identity. Backend-specific: GPU/HVM backends need this; JS/Erlang skip it.

3. **Lambda lifting pass** — GRAM enrichment that promotes closures to top-level functions with extra captured-variable parameters. Backend-specific: C backend needs this; JS skips it. Builds on the closure pass (which already identifies captures).

4. **Lambda lifting pass** — GRAM enrichment that promotes closures to top-level functions with extra captured-variable parameters. Backend-specific: C/GPU backends need this; JS/Erlang skip it. Builds on the closure pass (which already identifies captures).

5. **CRUD data access enrichment (phased)** — Annotate `inj` nodes with access modes from multiplicity. Three phases:
   - Phase A: mode annotation (`shared`/`exclusive` from multiplicity). Works with conservative defaults.
   - Phase B: reuse analysis (same-shape destruct/construct → `:reuse` edges). Lean-inspired.
   - Phase C: constructor contexts (top-down building with holes). Koka-inspired, likely post-LoGRAM.
   Phase A works without complete multiplicity enforcement. Phases compose additively.

**Longer-term:**
- LoGRAM substrate (triple-store, Datalog queries)
- GRAM interpreter with swappable strategies
- Self-hosted passes (passes written in Yap)

---
tags:
- project
- planned
- graph
- ir
- compiler
- lowering
- milestone
---

# GRAM next steps

Near-term roadmap after reaching translation + analysis parity with MIR:

1. **GRAM -> MIR translation** — a direct translation module that reads the enriched GRAM graph and emits MIR `Module`. Lives alongside MIR code (`src/lowering/`), decoupled from GRAM itself. Purpose: regression test, proof that GRAM captures enough for CFG extraction, reuse existing codegen backends (JS/C/Erlang) without rewriting them.

2. **Defunctionalization pass** — GRAM enrichment that replaces indirect calls (closures) with tagged dispatch. Adds `apply` switch nodes keyed by function identity. Backend-specific: GPU/HVM backends need this; JS/Erlang skip it.

3. **Lambda lifting pass** — GRAM enrichment that promotes closures to top-level functions with extra captured-variable parameters. Backend-specific: C backend needs this; JS skips it. Builds on the closure pass (which already identifies captures).

4. **CRUD data access enrichment** — Explicit `read`/`update` nodes with multiplicity-derived modes (`immutable` structural sharing vs `fbip` mutation). Proj -> Read, Inj -> Update. Multiplicity information from elaboration drives mode selection. Enables FBIP optimization without backend-specific analysis.

**Longer-term:**
- LoGRAM substrate (triple-store, Datalog queries)
- GRAM interpreter with swappable strategies
- Self-hosted passes (passes written in Yap)

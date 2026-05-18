---
tags:
- lowering
- speculative
- ir
- graph
- compiler
- mir
- planned
---

# GRAM → MIR bridge

Speculative direction: the enriched GRAM graph (after all passes) contains enough information to mechanically emit MIR's `Module` structure.

**Mapping:**
- `closure` + `env` + `func` nodes → MIR `Function` (lifted, with `[env, x]` params)
- `switch`/`leaf`/`fail` (decision tree) → MIR `Branch` terminators + case blocks
- `continuation`/`resumption`/`bubble` → MIR state machine (entry/s_init/r/s_i/reset_exit blocks)
- `external`/`primop` (from saturation) → MIR `Call(direct)` / `PrimOp` instructions
- Block statements → MIR `Let` instruction sequences

**Purpose:**
1. Validates that GRAM enrichments capture everything MIR needs — if the bridge struggles, that reveals gaps in the graph.
2. Clarifies architectural roles: GRAM = canonical semantic graph with multiple views; MIR = one sequential operational materialization.
3. Provides a migration path: existing codegen (JS/C/Erlang) already consumes MIR. The bridge lets them work unchanged while GRAM becomes the source of truth upstream.

**Status:** Not implemented. Current codegen still goes through `lowerToMir` directly from `EB.Term`.

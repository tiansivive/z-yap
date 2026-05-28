---
tags:
- lowering
- ir
- graph
- compiler
- mir
- implemented
- codegen
---

# GRAM → MIR bridge

The enriched GRAM graph (after all passes) contains enough information to mechanically emit MIR's `Module` structure. Implemented in `src/GRAM/bridge/`; the explorer uses `GRAM.Bridge.emit` as the canonical MIR source.

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

**Status:** Implemented. The bridge (`src/GRAM/bridge/emit.ts`) is the canonical MIR source for the explorer pipeline. The old direct `lowerToMir` path (`src/lowering/`) is deprecated.

**Known gaps:** Closure capture for curried returns ([[bridge-closure-capture]]), struct match dispatch ([[bridge-struct-dispatch]]).

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

The enriched GRAM graph (after all passes) contains enough information to mechanically emit MIR's `Module` structure. Implemented in `src/GRAM/bridge/`; `GRAM.Bridge.emit` is the canonical MIR source for the explorer, REPL, and file-compile pipelines.

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

**Status:** Implemented. The bridge (`src/GRAM/bridge/emit.ts`) is the canonical MIR source across the explorer, REPL, and file-compile pipelines. The direct `lowerToMir` path ([[mir-lowering]]) is deprecated and has no production callers.

**Known gaps:** Closure capture for curried returns ([[bridge-closure-capture]]), struct match dispatch ([[bridge-struct-dispatch]]).

<!-- connections:start -->

## Connections

**Outgoing**
- CONSUMES → [[gram]] — Reads enriched graph
- PRODUCES → [[mir]] — Emits MIR Module
- VALIDATES → [[gram-additive-enrichment]] — Tests if enrichment is sufficient
- RELIES_ON → [[gram-shift-reset-pass]] — Needs continuation structure
- RELIES_ON → [[gram-pattern-pass]] — Needs decision trees
- RELIES_ON → [[saturation]] — Needs external/primop
- RELIES_ON → [[closure-conversion]] — Needs env/fn nodes
- FOLLOWS → [[gram-next-steps]] — Step 1: regression + CFG extraction
- SUPERSEDES → [[mir-lowering]] — Bridge replaced the direct lowerToMir route as the canonical EB→MIR producer
- DEPRECATES → [[mir-lowering]] — Lifecycle: direct lowering marked deprecated

**Incoming**
- [[compile-orchestration]] ← DELEGATES_TO — Lowering step (Pipeline.lowerTerm → bridge)
- [[defunctionalization]] ← FOLLOWS — Step 2: after bridge validates graph
- [[gram-next-steps]] ← INCLUDES — Planned translation
- [[gram-evolution.thread]] ← INCLUDES
- [[gram-crud-enrichment]] ← FOLLOWS — After bridge validates graph
- [[bridge-type-erasure]] ← FIXES — PI/SIGMA/VAR_META dispatch
- [[bridge-label-resolution]] ← FIXES — VAR_LABEL dispatch
- [[bridge-closure-capture]] ← ADDRESSES — Curried return calling convention
- [[bridge-struct-dispatch]] ← ADDRESSES — Struct pattern compilation
- [[bridge-unsaturated-external]] ← ADDRESSES — Bridge lacks partial application handling
- [[gram-pap-pass]] ← PRESERVES — Keeps bridge mechanical: GRAM adds semantics, bridge translates
- [[length-recursive-debruijn]] ← APPLIES_TO — Unresolved var:bound cascaded to unknown in MIR
- [[bridge-free-var-unknown]] ← APPLIES_TO — Var resolution gap
- [[bridge-label-closure-gap]] ← APPLIES_TO — Scope resolution under match
- [[bridge-forward-label-refs]] ← APPLIES_TO — Struct field emission ordering
- [[gram-type-uniformity]] ← APPLIES_TO — Bridge needs consistent type format for type-driven lowering

<!-- connections:end -->

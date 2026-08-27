---
tags:
  - mir
  - ir
  - representation
  - compiler
  - codegen
  - backend
  - implemented
  - reference
  - continuation
  - ffi
  - observability
  - debugging
---
# MIR

MIR is Yap's sequential operational intermediate representation — the block-structured SSA form that code generation consumes. Defined in `src/lowering/mir.ts`.

**Structure.** Functions are lifted to top level with explicit `[env, x]` parameters. Bodies are basic blocks in SSA form with `Jump` / `Branch` / `Return` terminators, `Alloc` / `Read` / `Update` for heap cells, and `Call` distinguishing direct (known function) from indirect (closure / function pointer) dispatch. Block statements are `Let` instruction sequences. Continuations materialize as a state machine (entry / s_init / resume / reset_exit blocks); FFI appears as `External` / `Call` once saturated.

**Type erasure.** MIR drops the dependent type information carried by EB.Term; it is an untyped operational form. [[pi-types]] are not preserved.

**Debug metadata.** Every MIR node may carry a structured `debug` payload. It records provenance and diagnostic explanation without changing operational semantics: interpreters and target emitters ignore it, while the MIR display renders it. Interim erased type placeholders use this channel to state the erased graph form and source binding rather than encoding that information in their runtime record.

**Production.** MIR is emitted from the enriched GRAM graph by `GRAM.Bridge.emit` (see [[gram-to-mir-bridge]]) — the canonical producer for the explorer, REPL, and file-compile pipelines. The direct `lowerToMir` route ([[mir-lowering]]) emitted the same IR and is deprecated.

**Consumption.** The JS, C, and Erlang backends under `src/Codegen/v2/` emit target code from MIR; the explorer renders its CFG.

<!-- connections:start -->

## Connections

**Outgoing**
- ERASES → [[pi-types]] — Types not preserved in MIR

**Incoming**
- [[yap]] ← INCLUDES — Operational IR
- [[js-codegen]] ← CONSUMES — Emits JS from MIR
- [[c-codegen]] ← CONSUMES — Emits C from MIR
- [[erlang-codegen]] ← CONSUMES — Emits Erlang from MIR
- [[gram]] ← SUPERSEDES — As the canonical IR
- [[repl]] ← USES — Optional MIR display mode
- [[repl]] ← DISPATCHES_ON — Standard, --mir, --codegen modes
- [[gram-additive-enrichment]] ← CONTRASTS_WITH — MIR erases/replaces; GRAM accumulates
- [[gram-dataflow-semantics]] ← CONTRASTS_WITH — Partial order vs total order (blocks)
- [[compilation-by-selection]] ← CONTRASTS_WITH — Pass selection vs fixed representation
- [[gram-to-mir-bridge]] ← PRODUCES — Emits MIR Module
- [[gram]] ← GENERALIZES — Richer representation subsumes sequential form
- [[gram-crud-enrichment]] ← MIRRORS — MIR §6.4 Read/Update is the same concept in CFG form
- [[gram-crud-enrichment]] ← LOWERS_TO — Update{mode} in MIR
- [[lambda-lifting]] ← MIRRORS — MIR expects top-level functions
- [[explorer-graph-viz]] ← USES — Renders MIR CFG
- [[mir-lowering]] ← PRODUCES — Direct path emitted the MIR IR (now produced by the bridge)
- [[compilation-abi-selection]] ← CONTRASTS_WITH — Single MIR contract vs per-target conventions
- [[pipeline-explorer]] ← USES — MIR interpretation remains an opt-in diagnostic

<!-- connections:end -->

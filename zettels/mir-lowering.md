---
tags:
- lowering
- implemented
- mir
- compiler
- codegen
- backend
- ir
- elaboration
- reference
- continuation
- ffi
- testing
---

# MIR lowering (hub)

**Entry:** `lowerToMir` in `src/lowering/lower.ts` returns `MIR.Module`; re-exported via `src/lowering/index.ts`. Driver layout and pass responsibilities are documented in the `lower.ts` header comment and submodules below.

**Dispatch modules:** `leaf.ts`, `struct.ts`, `block.ts`, `functions/` (lambda closure conversion, app, materialize), `continuations/` (reset, shift, k-call), `matching/` (Maranget-style decision trees for `Match`). Driver: worklist + `monad.ts` RWSE (`lower.ts` header comment lists layout).

**Outputs:** Block-SSA MIR (`mir.ts`) with `Jump` / `Branch` / `Return`, `Alloc`/`Read`/`Update`, `Call` direct vs indirect. **Backends:** JS, C, Erlang emitters under `Codegen/v2/`; `src/cli/explore/pipeline.ts` runs `lowerToMir` then codegen.

**Coexistence:** GRAM translate + passes run in parallel in the same CLI for inspection; MIR remains the path to executable codegen today.

**Related zettels:** `gram.md`, `closure-conversion.md`, `pattern-matching-compilation.md`, `shift-reset` / kontinuation notes under `src/lowering/continuations/`.

<!-- connections:start -->

## Connections

**Outgoing**
- CONSUMES → [[v1-elaboration-pipeline]] — EB.Term input
- PRODUCES → [[js-codegen]] — MIR → JS
- PRODUCES → [[c-codegen]] — MIR → C
- PRODUCES → [[erlang-codegen]] — MIR → Erlang
- TRANSLATES_TO → [[eb-term]] — EB.Term → SSA blocks
- ERASES → [[pi-types]] — Types not preserved in MIR
- TRAVERSES → [[eb-term]] — Pattern-match walk
- CONSUMES → [[eb-term]] — EB.Term for IR translation

**Incoming**
- [[yap]] ← INCLUDES — Lowering component
- [[compile-orchestration]] ← DELEGATES_TO — Lowering step
- [[shift-reset-mir-lowering]] ← LOWERS_TO — State machines
- [[ffi]] ← RELIES_ON — Saturation
- [[ffi-saturation-mir]] ← RELIES_ON — Part of deprecated direct lowering path
- [[gram]] ← SUPERSEDES — As IR approach
- [[closure-conversion]] ← TRANSLATES_TO — Env + function pointer
- [[defunctionalization]] ← SPECIALIZES — GPU/HVM targets
- [[pattern-matching-compilation]] ← LOWERS_TO — Decision trees → MIR
- [[nanopass-influence]] ← CONTRASTS_WITH — Many vs monolithic
- [[thorin-mimir-influence]] ← CONTRASTS_WITH — CPS vs direct
- [[repl]] ← USES — Optional MIR mode
- [[shift-reset]] ← TRANSLATES_TO — State machines (planned)
- [[repl]] ← DISPATCHES_ON — Standard, --mir, --codegen modes
- [[mir-retrospective]] ← REJECTS — Closure conversion mistake identified
- [[pattern-matching-compilation]] ← TRANSLATES_TO — Maranget decision trees
- [[shift-reset-mir-lowering]] ← TRANSLATES_TO — State machine (heap-allocated frames)
- [[defunctionalization]] ← TRANSLATES_TO — Tagged dispatch on function identity
- [[closure-conversion]] ← TRANSLATES_TO — Environment + function pointer
- [[gram-additive-enrichment]] ← CONTRASTS_WITH — MIR erases/replaces; GRAM accumulates
- [[gram-dataflow-semantics]] ← CONTRASTS_WITH — Partial order vs total order (blocks)
- [[compilation-by-selection]] ← CONTRASTS_WITH — Pass selection vs fixed representation
- [[gram-to-mir-bridge]] ← PRODUCES — Emits MIR Module
- [[gram]] ← GENERALIZES — Richer representation subsumes sequential form
- [[stg-analogy]] ← CONTRASTS_WITH — Monolithic (STG->Cmm) vs composable (GRAM passes)
- [[gram-crud-enrichment]] ← MIRRORS — MIR §6.4 Read/Update is the same concept in CFG form
- [[gram-crud-enrichment]] ← LOWERS_TO — Update{mode} in MIR
- [[lambda-lifting]] ← MIRRORS — MIR expects top-level functions
- [[explorer-graph-viz]] ← USES — Renders MIR CFG

<!-- connections:end -->

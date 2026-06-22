---
tags:
- lowering
- deprecated
- legacy
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

# Direct MIR lowering (`lowerToMir`)

**Superseded by the GRAM → MIR bridge — see [[gram-to-mir-bridge]] and [[mir]].** Original content preserved below for reference.

`lowerToMir` (`src/lowering/lower.ts`, re-exported via `src/lowering/index.ts`) is the direct EB.Term → `MIR.Module` lowerer. It has no production callers — the canonical EB→MIR route is `GRAM.Bridge.emit`. It is retained only for direct-lowering and backend snapshot tests; retiring those tests removes it ([[legacy-file-compile]]).

**Dispatch modules:** `leaf.ts`, `struct.ts`, `block.ts`, `functions/` (lambda closure conversion, app, materialize), `continuations/` (reset, shift, k-call), `matching/` (Maranget-style decision trees for `Match`). Driver: worklist + `monad.ts` RWSE (`lower.ts` header comment lists the layout).

**Output:** the [[mir]] IR — block-SSA with `Jump` / `Branch` / `Return`, `Alloc` / `Read` / `Update`, and direct vs indirect `Call`.

<!-- connections:start -->

## Connections

**Outgoing**
- CONSUMES → [[v1-elaboration-pipeline]] — EB.Term input
- TRANSLATES_TO → [[eb-term]] — EB.Term → SSA blocks
- TRAVERSES → [[eb-term]] — Pattern-match walk
- CONSUMES → [[eb-term]] — EB.Term for IR translation
- PRODUCES → [[mir]] — Direct path emitted the MIR IR (now produced by the bridge)

**Incoming**
- [[shift-reset-mir-lowering]] ← LOWERS_TO — State machines
- [[ffi]] ← RELIES_ON — Saturation
- [[ffi-saturation-mir]] ← RELIES_ON — Part of deprecated direct lowering path
- [[closure-conversion]] ← TRANSLATES_TO — Env + function pointer
- [[defunctionalization]] ← SPECIALIZES — GPU/HVM targets
- [[pattern-matching-compilation]] ← LOWERS_TO — Decision trees → MIR
- [[nanopass-influence]] ← CONTRASTS_WITH — Many vs monolithic
- [[thorin-mimir-influence]] ← CONTRASTS_WITH — CPS vs direct
- [[shift-reset]] ← TRANSLATES_TO — State machines (planned)
- [[mir-retrospective]] ← REJECTS — Closure conversion mistake identified
- [[pattern-matching-compilation]] ← TRANSLATES_TO — Maranget decision trees
- [[shift-reset-mir-lowering]] ← TRANSLATES_TO — State machine (heap-allocated frames)
- [[defunctionalization]] ← TRANSLATES_TO — Tagged dispatch on function identity
- [[closure-conversion]] ← TRANSLATES_TO — Environment + function pointer
- [[stg-analogy]] ← CONTRASTS_WITH — Monolithic (STG->Cmm) vs composable (GRAM passes)
- [[gram-to-mir-bridge]] ← SUPERSEDES — Bridge replaced the direct lowerToMir route as the canonical EB→MIR producer
- [[gram-to-mir-bridge]] ← DEPRECATES — Lifecycle: direct lowering marked deprecated

<!-- connections:end -->

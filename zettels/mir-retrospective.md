---
tags:
- lowering
- decision
- reference
- mir
- compiler
- migration
- graph
- infrastructure
- pattern
- ir
- project
- display
- testing
- deprecated
- legacy
---

# MIR retrospective

**Superseded by [[gram-canonical-ir.adr]] (D-006).** The "GRAM and MIR run in parallel" framing no longer matches the canonical pipeline. The current shape is `EB.Term → GRAM → MIR → codegen`, with `GRAM.Bridge.emit` producing the `MIR.Module` consumed by all three backends. The original retrospective is preserved below as a snapshot of the parallel-IR phase that preceded D-006.

**Facts:** MIR lowering is a **single worklist pass** from `EB.Term` to `MIR.Module` (`src/lowering/lower.ts`). Intermediate MIR is textualized by `src/lowering/pretty.ts` and surfaced in `yap explore` alongside other pipeline stages (`src/cli/explore/pipeline.ts`).

**GRAM contrast (structural):** GRAM keeps an explicit mutable graph artifact with separate named passes (`src/GRAM/pipeline/index.ts`: translate, then η / saturate / closure) and a DPO rule engine (`src/GRAM/grs/`). Some GRAM concerns split across **rules vs imperative helpers**—e.g. closure `capture` cannot be one GRS rule (`src/GRAM/passes/closure.ts`).

**Current roles:** MIR drives `Codegen/v2/`; GRAM runs in parallel for translation, rewriting passes, display, and `verify.ts`. Shift/reset GRAM coverage in `src/GRAM/__tests__/pipeline.test.ts` is deferred while GRAM lowering for continuations matures.

<!-- connections:start -->

## Connections

**Outgoing**
- INFORMS → [[gram]] — Lessons learned
- MOTIVATES → [[gram]] — Why GRAM exists
- REJECTS → [[mir-lowering]] — Closure conversion mistake identified

**Incoming**
- [[thorin-mimir-influence]] ← INSPIRES — Calls = jumps
- [[gram-step-1]] ← FOLLOWS — Lessons learned inform first step
- [[gram-canonical-ir.adr]] ← SUPERSEDES — Replaces the parallel-IR retrospective framing
- [[gram-canonical-ir.adr]] ← DEPRECATES — Lifecycle event: parallel-IR description retired

<!-- connections:end -->

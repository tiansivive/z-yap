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
---

# MIR retrospective

**Facts:** MIR lowering is a **single worklist pass** from `EB.Term` to `MIR.Module` (`src/lowering/lower.ts`). Intermediate MIR is textualized by `src/lowering/pretty.ts` and surfaced in `yap explore` alongside other pipeline stages (`src/cli/explore/pipeline.ts`).

**GRAM contrast (structural):** GRAM keeps an explicit mutable graph artifact with separate named passes (`src/GRAM/pipeline/index.ts`: translate, then η / saturate / closure) and a DPO rule engine (`src/GRAM/grs/`). Some GRAM concerns split across **rules vs imperative helpers**—e.g. closure `capture` cannot be one GRS rule (`src/GRAM/passes/closure.ts`).

**Current roles:** MIR drives `Codegen/v2/`; GRAM runs in parallel for translation, rewriting passes, display, and `verify.ts`. Shift/reset GRAM coverage in `src/GRAM/__tests__/pipeline.test.ts` is deferred while GRAM lowering for continuations matures.

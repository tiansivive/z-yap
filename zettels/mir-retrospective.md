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

**Facts:** MIR lowering is a **single worklist pass** from `EB.Term` to `MIR.Module` (`src/lowering/lower.ts`, `docs/MIR-LOWERING.md` §4–5). Intermediate MIR is textualized by `src/lowering/pretty.ts` and surfaced in `yap explore` alongside other pipeline stages (`src/cli/explore/pipeline.ts`).

**GRAM contrast (structural):** GRAM keeps an explicit mutable graph artifact with separate named passes (`src/GRAM/pipeline/index.ts`: translate, then η / saturate / closure) and a DPO rule engine (`src/GRAM/grs/`). Some GRAM concerns split across **rules vs imperative helpers**—e.g. closure `capture` cannot be one GRS rule (`src/GRAM/passes/closure.ts`).

**Current roles:** MIR drives `Codegen/v2/`; GRAM is integrated for translation, rewriting passes, and display, with verification (`verify.ts`) but without replacing MIR-backed codegen. Shift/reset GRAM tests are skipped pending GRAM lowering (`src/GRAM/__tests__/pipeline.test.ts`).

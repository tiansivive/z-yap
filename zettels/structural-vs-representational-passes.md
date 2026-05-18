---
tags:
- lowering
- compiler
- rewriting
- graph
- mir
- closure
- performance
- codegen
- tooling
- type-system
- implemented
- decision
---
# Structural vs Representational Passes

**GRAM (`src/GRAM/`):** Graph rewrite passes over translations of `EB.Term`. Configured default pipeline `configure(eta, saturate, shiftReset, pattern, closure)` (`src/GRAM/pipeline/index.ts`) sequences eta contraction (`passes/eta.ts`), FFI/prim arity folding (`passes/saturate.ts` -> `EXTERNAL` nodes), shift-reset enrichment (`passes/shift-reset.ts` -> `bubble`/`continuation`/`resumption`), pattern decision tree compilation (`passes/pattern.ts` -> `switch`/`leaf`/`fail`), then closure preparation/conversion (`passes/closure.ts`, env capture helpers).

**Ordering principle:** Structural passes (eta, saturation) simplify the graph's term structure. Representational passes (shift-reset, pattern, closure) add operational views. Structural must precede representational -- eta-reduced terms have correct arities for saturation, saturated terms have correct references for continuation analysis.

**MIR lowering (`src/lowering/`):** Single worklist pass producing `MIR.Module` (`lowerToMir`, `docs/MIR-LOWERING.md`). Closure conversion, call saturation, pattern compilation, and shift/reset state machines all happen in one fused traversal. Eta-reduction of `App(Lambda,.)` is intentionally NOT done in lowering (preserving program-to-MIR mapping; NbE handles admin beta when desired).

**Key contrast:** GRAM separates concerns into composable passes with explicit ordering tracked by descriptors. MIR fuses everything into one traversal. GRAM's approach enables compilation-by-selection; MIR's approach enables a single canonical output.

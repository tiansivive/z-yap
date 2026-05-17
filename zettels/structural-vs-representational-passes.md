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
- in-progress
---
# Structural vs Representational Passes

**GRAM (`src/GRAM/`):** Graph rewrite passes over translations of `EB.Term`. Configured default pipeline `configure(eta, saturate, closure)` (`src/GRAM/pipeline/index.ts`) sequences η contraction (`passes/eta.ts`), FFI/prim arity folding (`passes/saturate.ts` → `EXTERNAL` nodes), then closure preparation/conversion (`passes/closure.ts`, env capture helpers).

The explorer stitches passes manually after `GRAM.translate`: `closureConvert(saturate(eta(rawGraph)))` (`src/cli/explore/pipeline.ts`) — same η → saturate → closure idea as `defaultPipeline`.

**MIR lowering (`src/lowering/`):** Separate worklist passes produce `MIR.Module` (`lowerToMir`, `docs/MIR-LOWERING.md`). Closure conversion and call saturation live here (`functions/lambda.ts`, `functions/app.ts`, `functions/materialize.ts`). η-reduction of `App(Lambda,·)` is intentionally **not** done in lowering (doc calls out preserving program↔MIR mapping; NbE handles admin β when desired).

Practical rule verified in-repo: do not assume GRAM ordering and MIR lowering are one fused stage — explorer shows both side by side; file `compile.ts` uses neither GRAM nor MIR emit.

---
tags:
  [
    concept,
    reference,
    compilation,
    compiler,
    aot,
    strategy,
    pipeline,
    codegen,
    principle,
    infrastructure,
    implemented,
  ]
---
# AOT compilation

Yap is ahead-of-time compiled. Every artefact from parser to codegen is built before the program runs; the output is **target source** consumed by the target's normal toolchain (Node.js for JavaScript, a C compiler for C, an Erlang/OTP toolchain for BEAM). There is no Yap-controlled bytecode, no Yap-controlled interpreter, no Yap-controlled virtual machine.

The pipeline is `EB.Term → GRAM → MIR → codegen`. `src/cli/explore/pipeline.ts` is the canonical integration site; `GRAM.Pipeline.compile` produces an enriched property graph, `GRAM.Bridge.emit` lowers it to a `MIR.Module`, the JS/C/Erlang emitters in `src/Codegen/v2/` produce target source. Each stage runs once per build with deterministic inputs and outputs.

Concrete consequences of the AOT shape:

- **Compilation determinism.** The same source elaborates to the same MIR to the same target source. There is no per-execution feedback loop reshaping artefacts.
- **Target source is the deployment unit.** What ships is what the target runtime consumes — JS files for Node, C files for cc, BEAM modules for the Erlang runtime. No Yap runtime travels alongside the program.
- **Static analysis is exhaustive by construction.** Liquid refinement checking, usage analysis, and modal-pass dispatch all run against the full program before codegen; their results bake into the emitted source rather than influencing runtime behaviour.
- **Optimisation is pass-shaped.** Every Yap-specific optimisation is a pass in the GRAM pipeline or the bridge. There is no separate optimisation phase that runs differently from non-optimised compilation — passes are the optimisation surface.
- **Runtime concerns are inherited.** Anything the target runtime does at runtime (V8's JIT, BEAM's hot-code reload, OS scheduling) is part of the deployment story, not part of Yap.

The AOT decision is recorded as `[[compilation-strategy.adr]]` (D-007). The canonical pipeline shape is recorded as `[[gram-canonical-ir.adr]]` (D-006). This zettel describes the substance of AOT in Yap; the ADRs record the decisions that produce that substance.

<!-- connections:start -->

## Connections

**Outgoing**
- IMPLEMENTS → [[compilation-strategy.adr]] — AOT concept realises the decision
- COMPOSES_WITH → [[compile-orchestration]] — Pipeline that performs AOT
- RELIES_ON → [[gram-canonical-ir.adr]] — D-006 defines the canonical AOT pipeline shape

**Incoming**
- [[compilation-strategy.adr]] ← DOCUMENTS — The strategy IS AOT

<!-- connections:end -->

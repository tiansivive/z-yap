---
adr-id: D-006
tags:
  [
    adr,
    accepted,
    decision,
    gram,
    mir,
    lowering,
    codegen,
    compiler,
    backend,
    pipeline,
    ir,
    infrastructure,
    implemented,
    principle,
  ]
---
# GRAM as canonical compilation IR

**Decision:** All compilation flows `EB.Term → GRAM → MIR → codegen`. GRAM (`src/GRAM/`) is the single intermediate representation across the static pipeline; MIR is the **bridge output** consumed by codegen, not a parallel target. The direct lowering path `EB.Term → MIR` is retained only for legacy compatibility.

## Scope

`src/cli/explore/pipeline.ts` is the live integration site: `GRAM.Pipeline.compile(tm, { zonker, arities })` produces a graph; `GRAM.Bridge.emit(graph)` produces `MIR.Module`; codegen (`src/Codegen/v2/{js,c,erlang}`) consumes the module. The legacy `lowerToMir` in `src/lowering/lower.ts` carries `@deprecated Use GRAM.Bridge.emit instead.` and survives only because `src/compile.ts` (the file-compile entry) and a handful of `__tests__/` paths still call it. Closure conversion, pattern compilation, and primitive-application lowering live in the bridge (`src/GRAM/bridge/{closures,decisions,primops,structural,leaves}.ts`); shift/reset state-machine materialisation lives in `src/GRAM/bridge/continuations.ts`.

## Rationale

1. **One enrichment surface for all optimisation** — passes contribute tags and edges to the GRAM graph (`src/GRAM/passes/`); compilation by selection ([[compilation-by-selection]]) picks which enrichments to consume. Lowering directly to MIR fixes the pipeline to one shape; lowering through GRAM exposes every decision (closure conversion, monomorphisation, multishot vs single-shot resume, FFI saturation) as a pass that can be added, removed, or replaced.
2. **Modal-pass extensibility composes here** — programmable GRAM passes ([[programmable-gram-passes]]) and the Kernel meta-pass attach to the graph substrate. A parallel direct `EB.Term → MIR` path would either need its own extensibility story or would silently bypass user-supplied passes.
3. **Linearity and usage analysis are graph-shaped** — multishot vs single-shot resume selection, usage-driven specialisation, and provenance-aware optimisations are natural to express as DPO rewrites on the graph; the term-walk in legacy lowering threads them through context plumbing instead.
4. **Bridge as a thin emission step** — `GRAM.Bridge.emit` is structurally simple: walk the graph, emit blocks. It localises the GRAM→MIR distance so codegen can stay MIR-shaped while the upstream remains graph-shaped.
5. **Single source of truth for codegen** — JS, C, and Erlang backends consume `MIR.Module` from the bridge; if the legacy direct path produced a different shape, the backends would either drift or carry adapters. Routing both through GRAM keeps the MIR contract stable.

## Consequences

- D-002 ([[gram-graph-ir.adr]]) is the substrate decision; D-006 elevates that substrate to the canonical IR for the whole pipeline.
- D-004 ([[direct-style-lowering.adr]]) is amended and reframed: the direct-style state-machine *shape* remains the decision, but its implementation site moves from `src/lowering/continuations/` to `src/GRAM/bridge/continuations.ts`. The original lowering files are part of the legacy path.
- MIR is repositioned: it is no longer "the lowering target" — it is the codegen interface emitted by the bridge. [[mir-retrospective]] and the older [[mir-lowering]]-as-target framing are superseded for the canonical path.
- Multishot resume serialization (`Terminator.Branch` over per-resume blocks, [[shift-reset-mir-lowering]] §multishot) now lives in the bridge; the older [[multishot-serialization]] zettel documents the legacy site.
- Single-shot vs multishot specialisation becomes a pass concern, deferred until usage/linearity analysis runs on the graph ([[singleshot-static-specialization]]).
- The legacy `EB.Term → MIR` path remains a maintenance burden, surfaced as the [[legacy-file-compile]] tech-debt item.

See [[gram-graph-ir.adr]] (D-002) for the graph-substrate decision this builds on, and [[direct-style-lowering.adr]] (D-004) for the lowering shape it preserves.

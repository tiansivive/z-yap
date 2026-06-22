---
tags:
  - explorer
  - tooling
  - graph
  - ir
  - lowering
  - display
  - speculative
  - cli
  - infrastructure
  - visualization
  - rewriting
  - mir
  - compiler
---

# Explorer: graph visualization

Render GRAM property graphs and MIR control-flow graphs as interactive node-link diagrams using d3 (or similar). Replaces the current text-dump GRAM tab with a visual graph.

**GRAM view:** nodes colored/shaped by tag (lambda, app, var, bubble, continuation, resumption, etc.), edges labeled by relationship (body, func, arg, refers_to, invokes, etc.). Click a node to inspect payload. Filter by tag vocabulary. Animate pass application — show what a DPO rule or imperative pass changed.

**MIR view:** CFG with blocks as nodes, jumps/branches as edges. Instructions listed inside each block node. Highlight the critical path. Show phi/block-parameter flow.

Both views should support zoom, pan, search, and selection synced with other explorer tabs (see [[explorer-cross-highlighting]]).

Most speculative of the explorer ideas — requires significant client-side work and good graph layout for non-trivial programs. Could start with small-graph rendering and scale later.

<!-- connections:start -->

## Connections

**Outgoing**
- EXTENDS → [[pipeline-explorer]] — New explorer capability
- USES → [[gram]] — Renders GRAM property graph
- USES → [[mir]] — Renders MIR CFG
- USES → [[dpo-rewriting]] — Animates DPO rule application
- COMPOSES_WITH → [[explorer-cross-highlighting]] — Graph selection synced with tabs
- ADDRESSES → [[gram-additive-enrichment]] — Visualizes enrichment layers
- SHARED_WITH → [[gram-evolution.thread]] — Graph viz depends on GRAM substrate
- FOLLOWS → [[explorer-timing]] — Sequence order

**Incoming**
- [[explorer-cross-highlighting]] ← COMPOSES_WITH — Selection synced with graph view

<!-- connections:end -->

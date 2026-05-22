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

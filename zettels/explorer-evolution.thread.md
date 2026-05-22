---
tags:
  - thread
  - explorer
  - tooling
  - cli
  - display
  - project
  - infrastructure
  - planned
  - observability
---

# Explorer Evolution

Pipeline explorer (`pnpm yap explore`) — from current multi-tab dashboard
through richer debugging, provenance visualization, and graph rendering.

_Shared with: gram-evolution (graph viz depends on GRAM substrate)_

## Sequence

1. **Pipeline explorer** [[pipeline-explorer]] — implemented
   Multi-tab web dashboard: Parsed, Elaborated, Type, NF, Constraints, Metas,
   IVL, Trace, MIR, GRAM, JS/C/Erlang. GRAM pipeline integrated.

2. **Provenance trace tree** [[explorer-provenance-trace]] — planned
   Visualize error provenance as a navigable tree.

3. **Cross-tab highlighting** [[explorer-cross-highlighting]] — planned
   Click a meta/variable in one tab, highlight corresponding occurrences across all tabs.

4. **Diff mode** [[explorer-diff-mode]] — planned
   Compare before/after for a pipeline stage or between two inputs.

5. **Snippet library** [[explorer-snippet-library]] — implemented
   19 built-in snippets across 5 groups in Config sidebar dropdown.

6. **Stage timing** [[explorer-timing]] — planned
   Per-stage performance measurement and display.

7. **Graph visualization** [[explorer-graph-viz]] — speculative
   d3-based rendering of GRAM property graphs and MIR CFGs.

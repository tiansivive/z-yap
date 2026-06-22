---
tags:
- principle
- graph
- ir
- compiler
- lowering
- decision
- mechanism
- concept
---

# Additive enrichment (GRAM)

Passes ADD nodes, edges, and tags to the graph — they never delete or redirect existing structure. Operational views (decision trees, closures, state machines) coexist alongside the semantic view (match/case/pat, lambda, reset/shift).

The invariant: after any pass, every node and edge that existed before the pass still exists with the same identity and connectivity. New structure is layered on top via new edges that link semantic nodes to their operational counterparts.

Canonical example: the pattern compilation pass adds a `:decision_tree` edge from the existing `match` node to a new `switch` root. The match node retains all its `:alt`, `:scrutinee`, case, and pattern edges. Both the "what does this match mean?" (semantic) and "how do we execute it?" (operational) views are simultaneously queryable.

Consequence: the graph grows monotonically across passes. This enables compilation-by-selection — backends read whichever view they need without losing access to the original semantics.

<!-- connections:start -->

## Connections

**Outgoing**
- CONSTRAINS → [[gram]] — All passes must follow
- CONTRASTS_WITH → [[mir]] — MIR erases/replaces; GRAM accumulates
- ENABLES → [[compilation-by-selection]] — Multiple views enable selection
- MIRRORS → [[mlir-influence]] — Multi-dialect coexistence pattern

**Incoming**
- [[gram-graph-ir.adr]] ← MOTIVATES — Property follows from graph substrate
- [[compilation-by-selection]] ← RELIES_ON — Requires accumulated views
- [[gram-shift-reset-pass]] ← INSTANTIATES — Adds bubble/continuation/resumption alongside existing nodes
- [[gram-pattern-pass]] ← INSTANTIATES — :decision_tree edge exemplifies principle
- [[gram-to-mir-bridge]] ← VALIDATES — Tests if enrichment is sufficient
- [[gram-evolution.thread]] ← RELIES_ON — Foundational invariant
- [[gram-crud-enrichment]] ← INSTANTIATES — Adds edges, never replaces
- [[mode-annotation-strategy]] ← INSTANTIATES — Pure annotation, no deletion
- [[lambda-lifting]] ← INSTANTIATES — lifts_to edge, original closure remains
- [[explorer-graph-viz]] ← ADDRESSES — Visualizes enrichment layers
- [[programmable-gram-passes]] ← RELIES_ON — Static passes ignore unfamiliar modal tags
- [[gram-kernel-pass]] ← RELIES_ON — RHS constructors only add structure

<!-- connections:end -->

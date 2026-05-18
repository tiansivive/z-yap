---
tags:
- principle
- graph
- ir
- compiler
- lowering
- decision
---

# Additive enrichment (GRAM)

Passes ADD nodes, edges, and tags to the graph — they never delete or redirect existing structure. Operational views (decision trees, closures, state machines) coexist alongside the semantic view (match/case/pat, lambda, reset/shift).

The invariant: after any pass, every node and edge that existed before the pass still exists with the same identity and connectivity. New structure is layered on top via new edges that link semantic nodes to their operational counterparts.

Canonical example: the pattern compilation pass adds a `:decision_tree` edge from the existing `match` node to a new `switch` root. The match node retains all its `:alt`, `:scrutinee`, case, and pattern edges. Both the "what does this match mean?" (semantic) and "how do we execute it?" (operational) views are simultaneously queryable.

Consequence: the graph grows monotonically across passes. This enables compilation-by-selection — backends read whichever view they need without losing access to the original semantics.

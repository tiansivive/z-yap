---
tags:
  - design
  - needs-design
  - backlog
  - gram
  - rewriting
  - modality
  - graph
  - mechanism
  - semantics
  - concern
  - dpo
refs:
  - thread:gram-evolution
---
# GRAM rule scoping

A rule's LHS pattern matches against the entire graph, not just the subgraph rooted at the annotated term. The modal annotation `%ruleName` marks a term but does not constrain where the rule's LHS searches for matches.

## Problem

```yap
let rule = { lhs: { nodes: [{ bind: "n", tag: "lit" }] }, ... };
let x = (\y -> f y) %rule;  -- marks the lambda
```

The rule matches any `lit` node in the entire program graph, not just nodes reachable from the annotated lambda. The annotation site and the match site are decoupled.

## Expected semantics

The marked node should anchor the rewritable subgraph. Three design options:

1. **Implicit root** — one LHS node (first, or designated via field) must match the marked node; the DPO engine restricts candidates to nodes reachable from it
2. **Scoped matching** — before matching, filter candidate nodes to the subgraph reachable from the marked node
3. **Explicit anchor** — require a `root: "bindName"` field in the rule; that bind must match the annotated term

Option 2 is the minimal intervention; option 3 makes the constraint explicit in the rule definition.

## Implication

Without scoping, a rule's effect is global rather than local. Users cannot annotate a specific subterm to selectively apply a transformation.

---
tags:
  - explorer
  - tooling
  - tracing
  - display
  - error-handling
  - elaboration
  - planned
  - observability
  - cli
  - infrastructure
  - debugging
  - visualization
---

# Explorer: provenance trace tree

Render the elaboration provenance stack as a navigable tree in the explorer, rather than the flat text dump currently produced by `P.display`.

Each node in the tree corresponds to a `Provenance` entry — source location, elaboration term, unification pair, or pattern alternative. Expanding a node shows its metadata (checking/inferring/unifying context) and the sub-trace beneath it. Leaf nodes carry the concrete error or constraint.

The tree structure already exists in the elaboration: `V2.track` nests provenance entries, and `V2.fail` captures the full stack. The explorer would receive this stack via the `/run` response and render it client-side.

Enables debugging questions like "why did this constraint appear?" by tracing backwards from the constraint through the elaboration decisions that produced it.

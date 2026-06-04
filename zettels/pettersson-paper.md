---
tags:
- paper
- reference
- lowering
- compiler
- pattern
- research
- graph
- deferred
---

# Pettersson — pattern match compiler via automata (1992)

**Citation:** Kent Pettersson. *A Term Pattern-Match Compiler Inspired by Finite Automata Theory.* International Conference on Compiler Construction (CC), 1992.
**DOI:** [10.1007/3-540-55984-1_24](https://doi.org/10.1007/3-540-55984-1_24)

Produces DAGs (shared subtrees) rather than trees. Even smaller than Maranget's decision trees because identical sub-decisions are shared. Trade-off: harder to analyze and optimize post-construction. DAG sharing complicates backend emission (requires tracking which branches share tails).

Yap compiles via Maranget-style decision trees today; Pettersson's DAG sharing could be explored as a post-pass over `:decision_tree` graph nodes to merge identical subtrees.

<!-- connections:start -->

## Connections

**Outgoing**
- INFORMS → [[pattern-matching-compilation]] — DAG variant (1992)
- EXTENDS → [[maranget-paper]] — DAG sharing over trees (deferred)

**Incoming**
- [[pattern-algorithm-choice]] ← DEFERS — DAG optimization possible later

<!-- connections:end -->

---
tags:
- paper
- reference
- lowering
- compiler
---

# Pettersson — pattern match compiler via automata (1992)

**Citation:** Kent Pettersson. *A Term Pattern-Match Compiler Inspired by Finite Automata Theory.* International Conference on Compiler Construction (CC), 1992.
**DOI:** [10.1007/3-540-55984-1_24](https://doi.org/10.1007/3-540-55984-1_24)

Produces DAGs (shared subtrees) rather than trees. Even smaller than Maranget's decision trees because identical sub-decisions are shared. Trade-off: harder to analyze and optimize post-construction. DAG sharing complicates backend emission (requires tracking which branches share tails).

Not used in Yap. Deferred as a potential future optimization layer on top of Maranget trees (the `:decision_tree` graph could be post-processed to share identical subtrees).

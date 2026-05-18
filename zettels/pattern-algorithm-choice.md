---
tags:
- decision
- lowering
- compiler
- graph
- ir
---

# Pattern algorithm choice: Maranget

**Decision:** Use Maranget (2008) for decision tree compilation in both MIR and GRAM. Augustsson rejected; Pettersson deferred.

**Rationale:**
- **Augustsson** duplicates wildcard arm bodies into all constructor groups. Simple but wasteful -- body duplication means the graph grows with pattern complexity. Not suitable for a graph IR where duplication creates real nodes.
- **Maranget** picks optimal columns (fewest wildcards = most discrimination), references arm bodies by index (no duplication), handles default matrices explicitly. Compact and efficient without being maximal.
- **Pettersson** produces DAGs (shared subtrees). More compact than Maranget but harder to analyze. Deferred as a future post-processing optimization -- could share identical `switch` subtrees in the decision tree graph.

**In GRAM:** Maranget is implemented as a separate pass (`gram-pattern-pass`) reading `pat:*` graph nodes. The pass is aggregate/imperative (needs the whole clause matrix). Downstream DPO optimizations on the produced decision tree are possible (trivial switch elimination, redundant test merging).

**STG analogy:** In GHC, pattern matching at the STG level is semantic (`case` expressions). Decision tree compilation happens during STG -> Cmm lowering. In Yap: translation produces semantic pattern structure (`pat:*` nodes, like STG), the pattern pass produces decision trees (like Cmm lowering). The separation keeps concerns clean.

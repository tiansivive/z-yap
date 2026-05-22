---
tags:
  - explorer
  - tooling
  - display
  - metavariable
  - elaboration
  - normalization
  - planned
  - observability
  - cli
  - infrastructure
  - visualization
  - interactivity
---

# Explorer: cross-tab highlighting

Click a meta-variable, type variable, or source identifier in any explorer tab and highlight all corresponding occurrences across every other tab.

A meta `?3` in the Elaborated tab highlights `?3` in Constraints, its solution in Metas, its NF value in the Type/NF tabs, and its Z3 constant in IVL. Source variable `x` highlights its binding site in Parsed, its de Bruijn index in Elaborated, its NF.Value in Type, and its MIR/GRAM node.

Requires a shared identity map between pipeline stages — meta IDs, variable levels/indices, and source locations serve as join keys. The `/run` response already carries enough structural data; the client needs to index and cross-reference it.

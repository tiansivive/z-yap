---
tags:
  - verification
  - decision
  - mechanism
  - sat
  - arithmetic
  - solver
  - implemented
  - backend
---
# Dual polarity registration for arithmetic

**Decision:** Both an arithmetic atom (`x + y ≤ 5`) and its logical negation (`x + y > 5`) are registered as separate atoms with corresponding bound updates in the simplex tableau.

## Context

The SAT core assigns literals, which are signed atoms. When the arithmetic theory receives a negated atom like `¬(x + y ≤ 5)`, it needs to derive the corresponding bound tightening (`x + y > 5`, i.e. `x + y ≥ 6` for integers). Without explicit registration of the negated form, the theory has no bound entry for the negated literal and it becomes invisible to the simplex solver.

## Rationale

Registering both polarities at atom-table construction time means every arithmetic literal — positive or negative — maps directly to a simplex bound. This eliminates a class of bugs where negated bounds were silently ignored, producing spurious SAT results.

The cost is a larger atom table (roughly 2x for arithmetic atoms), which is acceptable given Yap's formula sizes. The alternative — computing negated bounds on the fly during `assertLit` — adds complexity to a hot path and risks inconsistencies between how positive and negative atoms are handled.

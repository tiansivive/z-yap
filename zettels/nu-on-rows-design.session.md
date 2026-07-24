---
tags:
  - ai-session
  - type-system
  - row-types
  - recursion
  - codata
  - elaboration
  - lowering
  - design
  - language
---
# Session: ν-on-rows design

Design discussion establishing that the coinductive fixed point belongs on the row (`ν ρ. R`) rather than on the record, with the occurrence restriction that `ρ` appears only in field-type position under a row interpretation (`Schema ρ`, `Variant ρ`). The discussion identified guardedness and regularity as orthogonal discriminators on the label graph — guardedness is a typing property that ν formalises, regularity is a lowering-time choice between knot (memory cycle) and thunk — which dissolves the typing-vs-lowering fork in [[coinduction-typing-vs-lowering]]. Elaboration dispatch for `:label` references becomes graph-property-driven (acyclic → sigma telescope; cyclic+guarded → ν; unguarded → error), reframing the sigma/codata surface ambiguity in [[sigma-vs-codata-label-refs]] without requiring a syntax split.

<!-- connections:start -->

## Connections

**Outgoing**
- PRODUCED → [[nu-on-rows]]
- INFORMS → [[coinduction-typing-vs-lowering]]
- INFORMS → [[sigma-vs-codata-label-refs]]

**Incoming**
- [[sessions.hub]] ← INCLUDES

<!-- connections:end -->

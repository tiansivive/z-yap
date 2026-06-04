---
tags:
  - verification
  - decision
  - mechanism
  - sat
  - solver
  - implemented
  - backend
---
# Inline theory assertion during BCP

**Decision:** Theory `assertLit` is called inline during BCP for each assigned literal, not batched after propagation completes. `checkTheories` runs before every SAT decision.

## Context

In a CDCL(T) solver, theories must learn about new literal assignments to detect conflicts and propagate consequences. The design choice is *when* this happens: after BCP completes a full propagation round (batched), or inline as each literal is assigned.

## Rationale

Inline assertion means theories see partial BCP state, but this catches theory conflicts *during* propagation rather than only at decision points. A batched approach delays conflict detection, potentially exploring more of the boolean search space before discovering a theory-level contradiction.

The trade-off is that theory checks run more frequently (per literal instead of per decision), but Yap's formulas are small enough that the overhead is negligible compared to the benefit of early conflict detection. The approach also simplifies the solver loop: BCP and theory propagation interleave naturally without a separate "theory check" phase.

<!-- connections:start -->

## Connections

**Outgoing**
- CONSTRAINS → [[theory-plugin-interface]] — How theories receive literals
- DETAILS → [[m2-implementation]] — Extracted from M2 record

**Incoming**
- [[verification-backend.thread]] ← INCLUDES
- [[cdcl-t-solver]] ← FOLLOWS — Core loop follows this pattern

<!-- connections:end -->

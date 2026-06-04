---
tags:
  - type-system
  - row-types
  - pattern
  - inference
  - unification
  - elaboration
  - language
  - planned
  - needs-design
  - exploration
---
# Design: open vs closed variant semantics

Determine how Yap distinguishes open and closed variant types and what the consequences are for exhaustiveness checking, inference, and unification.

Open variants (row variable in the tail) allow extension — a handler can accept variants with more cases than it names. Closed variants (empty tail) are fixed — the set of cases is known statically. The distinction affects exhaustiveness checking (closed rows are decidable; open rows require a wildcard or default), inference (should a variant literal infer open or closed?), and unification (row variable solving vs rigid tail matching).

The design must settle: default openness for inferred variants, surface syntax for closing a row, interaction with pattern matching compilation, and whether open variants need subtyping or whether row polymorphism alone suffices.

See [[open-closed-variants]] for the concept analysis.

<!-- connections:start -->

## Connections

**Outgoing**
- ADDRESSES → [[open-closed-variants]] — Design task for the concept

**Incoming**
- [[pattern-matching.thread]] ← INCLUDES — Design work item
- [[row-types.thread]] ← INCLUDES — Design work item

<!-- connections:end -->

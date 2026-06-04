---
tags:
  - type-system
  - dependent
  - recursion
  - row-types
  - elaboration
  - normalization
  - evaluation
  - planned
  - needs-design
  - language
  - syntax
  - exploration
---
# Design: sigma vs codata field reference semantics

Determine how Yap should distinguish and elaborate sigma-dependent field references from codata self-references, given that `:label` currently conflates both mechanisms.

Sigma references are parametric (type-level, deferred via closure application). Codata self-references are eager (value-level, immediate field access during elaboration). The current implementation resolves the ambiguity through context (`ctx.labels` vs `ctx.sigma` vs `ctx.record`), but the surface syntax is identical.

The design must settle: whether a syntax split is needed now or deferred until nu types land, how elaboration should dispatch between the two mechanisms, whether the context refactoring (labels/sigma/record split) is sufficient for correct semantics, and interaction with mutual recursion and recursive records.

See [[sigma-vs-codata-label-refs]] for the concept analysis; [[sigma-codata-syntax-proposal]] for the syntax proposal.

<!-- connections:start -->

## Connections

**Outgoing**
- ADDRESSES → [[sigma-vs-codata-label-refs]] — Design task for the concept
- RELIES_ON → [[sigma-codata-syntax-proposal]] — Syntax proposal feeds this design

**Incoming**
- [[recursion.thread]] ← INCLUDES — Design work item

<!-- connections:end -->

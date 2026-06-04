---
tags:
  [
    verification,
    milestone,
    planned,
    row-types,
    dependent,
    reference,
    sat,
    normalization,
    backend,
    inference,
    mechanism,
    pattern,
    project,
    migration,
    principle,
  ]
---
# Milestone 4: Row theory

**Goal:** row-shaped VC terms with a containment solver aligned to elaboration subtyping.

**Deliverables:** canonical row term representation, containment solver, open-row tail unification, emission of nested field obligations.

**Semantic source:** `subtype.contains()` in verification; **`translate.ts`/`term()` still throws on row-shaped literals** (“not supported yet”) — IVL carries row **sort**/term algebra, but emitting full row VC nodes for concrete values remains Milestone 4 work (not “IVL vs Z3”, but **translator + theory** gap).

Depends on Milestone 2 solver scaffolding plus translator emitting row VC nodes.

<!-- connections:start -->

## Connections

**Outgoing**
- PRODUCES → [[row-theory]] — Row module
- FOLLOWS → [[milestone-3-strings]] — After strings

**Incoming**
- [[milestone-5-explanations]] ← FOLLOWS — After rows
- [[verification-backend.thread]] ← INCLUDES

<!-- connections:end -->

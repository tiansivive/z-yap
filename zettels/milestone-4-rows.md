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

**Semantic source:** `subtype.contains()` in verification; `translate.ts` still rejects row literals (`throw new Error("Row literals not supported yet")`) until row nodes emit IVL instead of failing translation.

Depends on Milestone 2 solver scaffolding plus translator emitting row VC nodes.

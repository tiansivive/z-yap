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

Roadmap slice from `docs/SMT-SOLVER.md` §Algorithms by milestone → Milestone 4.

Deliverables named there: canonical row term representation, containment solver, open-row tail unification, emission of nested field obligations.

Same doc ties row semantics to verifier-side containment: `subtype.contains()` stays the semantic source; `translate.ts` currently throws on row literals (`throw new Error("Row literals not supported yet")`).

Depends on Milestone 2 solver scaffolding plus translator emitting VC row nodes instead of rejecting rows.

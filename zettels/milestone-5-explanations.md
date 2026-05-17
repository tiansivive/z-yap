---
tags:
  [
    verification,
    milestone,
    planned,
    reference,
    sat,
    display,
    error-handling,
    tracing,
    backend,
    inference,
    tooling,
    testing,
    project,
    mechanism,
    principle,
    cli,
  ]
---
# Milestone 5: Explanations and models

Roadmap slice from `docs/SMT-SOLVER.md` §Algorithms by milestone → Milestone 5.

Deliverables named there: UNSAT cores linked back to obligations, model fragments for counterexamples, pretty-printer for quantified counterexample contexts.

Doc sketches `Solver.explain` and clause-origin metadata for future core reporting; no Yap-owned implementation tree exists yet under `src/verification/` (planned layout is `docs/SMT-SOLVER.md` §Internal module layout).

Depends on provenance-bearing clauses from earlier milestones (`runtime.record` in `translate.ts` / subtype/check already labels obligations today).

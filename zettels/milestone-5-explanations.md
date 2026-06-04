---
tags:
  [
    verification,
    milestone,
    planned,
    deprecated,
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

**Superseded by the IVL/CDCL(T) solver stack — see [[z3-replacement.adr]].** Original Z3-era content preserved below for reference.

Roadmap slice from `docs/SMT-SOLVER.md` §Algorithms by milestone → Milestone 5.

Deliverables named there: UNSAT cores linked back to obligations, model fragments for counterexamples, pretty-printer for quantified counterexample contexts.

Doc sketches `Solver.explain` and clause-origin metadata for future core reporting; no Yap-owned implementation tree exists yet under `src/verification/` (planned layout is `docs/SMT-SOLVER.md` §Internal module layout).

Depends on provenance-bearing clauses from earlier milestones (`runtime.record` in `translate.ts` / subtype/check already labels obligations today).

<!-- connections:start -->

## Connections

**Outgoing**
- FOLLOWS → [[milestone-4-rows]] — After rows
- COMPOSES_WITH → [[provenance-system]] — End-to-end error reporting
- PRODUCES → [[vc-provenance]] — Explanation/model infrastructure
- ADDRESSES → [[verification-pipeline]] — Error quality improvement

**Incoming**
- [[verification-backend.thread]] ← INCLUDES
- [[z3-replacement.adr]] ← SUPERSEDES

<!-- connections:end -->

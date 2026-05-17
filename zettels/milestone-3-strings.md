---
tags:
  [
    verification,
    milestone,
    planned,
    strings,
    reference,
    sat,
    arithmetic,
    backend,
    compiler,
    mechanism,
    normalization,
    testing,
    project,
    drift,
    modality,
    tooling,
  ]
---
# Milestone 3: String theory

Roadmap slice from `docs/SMT-SOLVER.md` §Algorithms by milestone → Milestone 3.

Deliverables named there: concat normal forms, length coupling to arithmetic, prefix/suffix/contains reductions, witness generation for containment-like constraints.

Doc §Current hard constraints: strings today use an uninterpreted sort in `translate.ts` (`Sorts.String = Z3.Sort.declare("String")`); `$concat` is called out as not translated into native string reasoning.

Depends on Milestone 2 arithmetic/EUF interplay for length bridges.

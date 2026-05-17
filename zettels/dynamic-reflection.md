---
tags:
  [
    type-system,
    verification,
    runtime,
    ffi,
    speculative,
    concept,
    principle,
    normalization,
    dependent,
    modality,
    infrastructure,
    migration,
    sat,
    language,
    problem,
  ]
---
# Dynamic / Reflection

Design space only: **runtime witnesses** or gradual boundaries that reconcile dynamic data with definitional equality and FFI. Nothing in `src/elaboration/`, `src/lowering/`, or `src/verification/` currently implements a reflection or dynamic-typing core (no dedicated AST forms or passes surfaced under obvious names).

Adjacent implemented machinery: refinement / VC pipeline (`src/verification/`, `brainstorming/yap/` specs). Anything here would need representation choices (erased vs relevant evidence), elaboration rules, and backend lowering—none of that is wired end-to-end today.

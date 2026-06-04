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
    backlog,
  ]
---
# Dynamic / Reflection

Exploratory design space: **runtime witnesses** or gradual boundaries that reconcile dynamic data with definitional equality and FFI.

Yap today centers on static elaboration (`src/elaboration/`), MIR lowering (`src/lowering/`), and refinement verification (`src/verification/`). A reflection or dynamic-typing core would need representation choices (erased vs relevant evidence), elaboration rules, and backend lowering wired through those pipelines—an open intersection with the existing VC/refinement machinery rather than a separate stack.

<!-- connections:start -->

## Connections

**Outgoing**
- COMPOSES_WITH → [[verification-pipeline]] — Proof-gated casts
- COERCES_TO → [[pi-types]] — Safe cast via proof

**Incoming**
- [[global-pending-queue]] ← INCLUDES

<!-- connections:end -->

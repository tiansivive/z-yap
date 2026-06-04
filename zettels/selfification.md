---
tags:
  [
    verification,
    type-system,
    modality,
    dependent,
    mechanism,
    concept,
    sat,
    normalization,
    inference,
    implemented,
    ivl,
    solver,
    reference,
  ]
refs:
  - "[[ou-et-al-2004]]"
  - "[[knowles-flanagan-2010]]"
  - "[[vazou-mechanizing-refinement-types-2024]]"
  - "[[vazou-refinement-reflection-2018]]"
---
# Selfification

Selfification strengthens a variable's type with a singleton refinement equating the value to itself: given `x : T`, selfification produces `x : { v : T | v = x }`. This enables path-sensitive reasoning — downstream subtyping and VC generation can track which value a variable holds through control flow.

The operation originates from [[ou-et-al-2004]], formalized as the T-Var rule in [[knowles-flanagan-2010]], and mechanized in [[vazou-mechanizing-refinement-types-2024]]. [[vazou-refinement-reflection-2018]] generalizes selfification to reflected function definitions via the T-Exact rule, where the output type carries the function's unfolded definition as a refinement.

In Yap, `selfify` (`src/verification/V2/utils/refinements.ts`) is called from `synth` when synthesizing the type of a bound variable. It checks `isFirstOrder` as a top-level guard (see [[first-order-restriction.adr]]) — higher-order types return unchanged. For first-order types, the match dispatches on the forced type shape:

- **[[modalities]]** (`Modal`) — conjoins `v = x` into the existing liquid predicate closure.
- **Bare types** (otherwise) — wraps in a fresh `Modal` carrying `v = x` as the liquid predicate.

The `NF.force` call before matching ensures meta-variables are zonked, so Pi types hidden behind unsolved metas are correctly identified and excluded by the guard.

<!-- connections:start -->

## Connections

**Outgoing**
- COMPOSES_WITH → [[modalities]] — Conjoins self-equality into existing liquid predicate
- RELIES_ON → [[verification-pipeline]] — Called from synth (Bound var path)
- CONSTRAINS → [[first-order-restriction.adr]] — Guarded by isFirstOrder

**Incoming**
- [[first-order-restriction.adr]] ← CONSTRAINS — isFirstOrder top-level guard
- [[syn-app-ex-modification]] ← USES — check returns selfified nf for precision
- [[ou-et-al-2004]] ← INFORMS — Coined the term
- [[knowles-flanagan-2010]] ← INFORMS — T-Var formalization
- [[vazou-mechanizing-refinement-types-2024]] ← INFORMS — Mechanized self() function
- [[vazou-refinement-reflection-2018]] ← GENERALIZES — T-Exact generalizes T-Var to reflected definitions

<!-- connections:end -->

---
tags:
  [
    paper,
    reference,
    research,
    verification,
    type-system,
    modality,
    dependent,
    inference,
    sat,
    normalization,
  ]
---
# Vazou et al. — Mechanizing Refinement Types (2024)

**Citation:** Niki Vazou, Michael Borkowski, et al. *Mechanizing Refinement Types.* Proc. ACM Program. Lang. 8(POPL), 2024.
**DOI:** [10.1145/3632912](https://doi.org/10.1145/3632912)

Provides the first fully mechanized metatheory for refinement types (λRF). Key formalization relevant to Yap:

- **[[selfification]]**: the `self(t, x, k)` function is defined precisely — base types get `v = x` conjoined, function types return unchanged, existentials recurse. Quote: "Since abstractions do not admit equality, we only selfify the base types and the existential quantifications of them."
- **Kind system**: distinguishes type variables that can soundly appear in refinements from those that cannot.
- **Existential application rule**: preserves decidability of subtyping.

Directly validates Yap's `isFirstOrder` guard as the implementation of the [[first-order-restriction.adr]] on selfification.

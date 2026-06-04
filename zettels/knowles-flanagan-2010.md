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
  ]
---
# Knowles & Flanagan — Hybrid Type Checking (2010)

**Citation:** Kenneth Knowles, Cormac Flanagan. *Hybrid Type Checking.* ACM TOPLAS 32(2), 2010.
**DOI:** [10.1145/1667048.1667051](https://doi.org/10.1145/1667048.1667051)

Introduces the T-Var [[selfification]] rule for refinement types: a variable `x : T` is strengthened to `x : { v : T | v = x }`, enabling path-sensitive reasoning without substitution into refinements. The rule applies only to first-order types — "since abstractions do not admit equality" — establishing the [[first-order-restriction.adr]] that Yap inherits.

Also formalizes the hybrid approach: static SMT checking where possible, dynamic cast insertion where the logic is undecidable. Yap currently uses static-only verification but the selfification and subtyping rules derive from this lineage.

See also [[ou-et-al-2004]] for the original selfification idea.

<!-- connections:start -->

## Connections

**Outgoing**
- INFORMS → [[selfification]] — T-Var formalization
- INFORMS → [[first-order-restriction.adr]] — Restricts selfification to base types

**Incoming**
- [[syn-app-ex-modification]] ← INFORMS — Modifies their Syn-App-Ex rule
- [[ou-et-al-2004]] ← INFORMS — Original selfification idea

<!-- connections:end -->

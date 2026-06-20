---
tags:
  - type-system
  - row-types
  - effect
  - modality
  - syntax
  - language
  - backlog
  - speculative
  - parser
  - elaboration
  - verification
---

# Lacks / exclusion type operator

A type-level exclusion operator would express negative capability information: a row lacks a label, a value excludes a type case, or an effect row permits every effect except one. This is most natural for row constraints, where `Lacks`-style predicates are a known complement to extensible records.

For Yap, the useful case is likely effect/resource rows rather than unrestricted negation over all types. Full type complement is much broader than row absence and would affect unification, subtyping, and verification.

<!-- connections:start -->

## Connections

<!-- connections:end -->

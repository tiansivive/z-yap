---
tags:
  - syntax
  - sugar
  - application
  - parser
  - elaboration
  - language
  - backlog
  - planned
  - compiler
  - tooling
---

# Operator and application syntax

Infix function application, custom operators, variadic arguments, and named arguments are surface conveniences over application. The design pressure is ergonomic expression of ordinary calls without changing the elaborated function model: fixed-arity Pi spines, implicit insertion, and application inference remain the semantic boundary.

Variadic arguments would need an arity discipline before elaboration can treat them as ordinary application. Named arguments overlap with implicit disambiguation and should be designed with implicit application syntax rather than as a separate call convention.

<!-- connections:start -->

## Connections

**Outgoing**
- INFORMS → [[spineful-applications]] — Call syntax pressure overlaps explicit application spines

**Incoming**
- [[surface-syntax-backlog]] ← INCLUDES — Infix/custom/variadic/named application syntax

<!-- connections:end -->

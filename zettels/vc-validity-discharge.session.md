---
tags:
  - ai-session
  - verification
  - validity
  - liquid
  - solver
  - sat
  - quantifiers
  - ivl
  - implementation
  - in-progress
refs:
  - session:5e287d3b-a81c-4eb5-b430-9f930f9bafb4
---
# VC validity discharge session

This session investigated failing SMT-related refinement tests and separated two problems that had been conflated: raw satisfiability of IVL formulas and verifier-facing validity of generated VCs. The unconstrained identity refinement case was reframed as a missing validity-discharge layer rather than a quantifier-engine failure; a proof-of-concept `src/verification/validity.ts` layer was added and wired into the targeted integration helper/test. The discussion also clarified that Yap's Liquid VC fragment uses guarded quantifiers as environment structure, so nested refinement VCs should be discharged before raw SAT rather than requiring full general MBQI. The session produced the Liquid fragment and validity notes plus D-009, while leaving the block-scoped-let formula shape as an upstream VC-generation bug.

<!-- connections:start -->

## Connections

**Outgoing**
- PRODUCED → [[liquid-vc-fragment]] — Knowledge zettel from validity investigation
- PRODUCED → [[validity-vs-satisfiability]] — Knowledge zettel from validity investigation
- PRODUCED → [[vc-validity-discharge]] — Mechanism zettel from validity proof of concept
- PRODUCED → [[quantifier-instantiation-boundary]] — General SMT vs Liquid-fragment boundary
- PRODUCED → [[vc-validity-before-sat.adr]] — D-009 decision record

**Incoming**
- [[sessions.hub]] ← INCLUDES — Session record

<!-- connections:end -->

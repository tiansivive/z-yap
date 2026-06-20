---
tags:
  - dependent
  - pattern
  - match
  - unification
  - elaboration
  - constraint
  - type-system
  - inference
  - backlog
  - needs-design
  - compiler
---

# Dependent match implication constraints

Dependent pattern matching can require branch-local equality assumptions to unblock stuck types. When a scrutinee appears in another variable's type, matching the scrutinee gives information such as `b = true`, but the dependent type may remain stuck unless unification can reason under that assumption.

An implication constraint would carry assumptions into a branch-specific unification problem: under `b = true`, a stuck match depending on `b` may reduce to the branch type. This is related to GHC-style implication constraints and to with-abstraction techniques in dependently typed elaborators.

<!-- connections:start -->

## Connections

**Outgoing**
- INFORMS → [[pattern-matching.thread]] — Branch-local assumptions for dependent matches
- INFORMS → [[elaboration-v2.thread]] — Implication constraints affect unification/elaboration
- USES → [[with-abstraction]] — Prior art for propagating match equalities into branch contexts

**Incoming**
- [[repo-docs-retirement-audit-2026-06-20]] ← PRODUCED — Migrated dependent-match TODO atom

<!-- connections:end -->

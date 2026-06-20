---
tags:
  - syntax
  - sugar
  - backlog
  - planned
  - parser
  - elaboration
  - language
  - tooling
  - project
  - compiler
  - documentation
---

# Surface syntax backlog

Yap has a backlog of surface conveniences whose semantics should mostly elaborate into existing core forms: local definitions, application/operator ergonomics, structural data traversal, implicit-hole notation, and row/type operators. These are language-design items, not active parser commitments.

Hub: [[where-clauses]], [[operator-and-application-syntax]], [[structural-data-traversal-syntax]], [[implicit-hole-syntax]], [[lacks-exclusion-type-operator]]

<!-- connections:start -->

## Connections

**Outgoing**
- INCLUDES → [[where-clauses]] — Existing local-definition sugar item
- INCLUDES → [[operator-and-application-syntax]] — Infix/custom/variadic/named application syntax
- INCLUDES → [[structural-data-traversal-syntax]] — Indexing, deep access/update, traversal sugar
- INCLUDES → [[implicit-hole-syntax]] — Surface handle for implicit metavariable resolution
- INCLUDES → [[lacks-exclusion-type-operator]] — Row/effect exclusion design item
- INFORMS → [[parser-migration.thread]] — Surface forms feed parser migration planning

**Incoming**
- [[repo-docs-retirement-audit-2026-06-20]] ← PRODUCED — Migrated TODO syntax backlog atoms before deleting old docs
- [[global-pending-queue]] ← INCLUDES — Deferred syntax backlog

<!-- connections:end -->

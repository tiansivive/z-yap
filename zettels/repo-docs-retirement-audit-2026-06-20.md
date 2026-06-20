---
tags:
  - documentation
  - audit
  - cleanup
  - drift
  - project
  - infrastructure
  - tech-debt
  - migration
  - reference
  - in-progress
  - incomplete
---

# Repository docs retirement audit 2026-06-20

The repository documentation layer has split responsibilities. Public-facing prose explains Yap to users and should remain in the repository. Design authority lives in z-yap plus source paths. Internal architecture and design prose that duplicates the graph should be retired after unique backlog and reference atoms have zettel homes.

The TODO and resource migration blockers are represented in the graph by [[surface-syntax-backlog]], [[dependent-match-implication-constraints]], and the reference zettels produced by this audit. Superseded internal repository docs were removed after migration. The remaining documentation work is public-facing prose refresh: root README, examples README, and FAQ.

<!-- connections:start -->

## Connections

**Outgoing**
- DOCUMENTS → [[documentation-debt]] — Audit of stale repository prose
- ADDRESSES → [[documentation-debt]] — Retire superseded internal docs and refresh public docs
- INFORMS → [[verification-backend.thread]] — Internal verification docs are superseded by IVL/CDCL(T) zettels
- INFORMS → [[gram-evolution.thread]] — Internal MIR/GRAM prose is superseded by canonical GRAM/MIR zettels
- INFORMS → [[parser-migration.thread]] — Parser docs retire into parser migration records
- INFORMS → [[elaboration-v2.thread]] — Elaboration docs retire into active pipeline records
- INFORMS → [[testing.thread]] — README/tour updates should stay aligned with integration tests
- PRODUCED → [[surface-syntax-backlog]] — Migrated TODO syntax backlog atoms before deleting old docs
- PRODUCED → [[dependent-match-implication-constraints]] — Migrated dependent-match TODO atom
- PRODUCED → [[elaboration-zoo]] — Migrated resources bibliography item
- PRODUCED → [[language-garden]] — Migrated resources bibliography item
- PRODUCED → [[generating-verification-conditions]] — Migrated resources bibliography item
- PRODUCED → [[dependent-contract-types]] — Migrated resources bibliography item
- PRODUCED → [[implicit-calculus]] — Migrated resources bibliography item
- PRODUCED → [[leijen-scoped-labels]] — Migrated resources bibliography item
- PRODUCED → [[cong-asai-delimited-dependent]] — Migrated resources bibliography item
- PRODUCED → [[thiemann-anton-coroutines]] — Migrated resources bibliography item

**Incoming**
- [[global-pending-queue]] ← INCLUDES — Documentation cleanup work item
- [[z-yap-agent-skill]] ← USES — Documentation cleanup surfaced the need for a dedicated ZK skill

<!-- connections:end -->

---
tags:
  - testing
  - audit
  - compiler
  - infrastructure
  - snapshot-testing
  - elaboration
  - integration
  - gram
  - verification
  - in-progress
  - project
refs:
  - resource: resources/audits/testing-01/index.html
    note: Entry point for the split HTML testing audit
---

# Testing audit 2026-06-20

The active Yap test suite has strong semantic coverage in solver internals, GRAM graph passes, struct and dependent-field inference, normalization core evaluation, unification, and focused shift/reset tests. The central cleanup axis is assertion clarity: tests that use snapshots as their primary claim should add direct semantic assertions while preserving snapshots as regression artifacts.

The audit is stored as a navigable HTML resource under `resources/audits/testing-01/index.html`. It separates compiler-pipeline findings from language-feature vertical slices, with focused pages for snapshot triage, elaboration cleanup, and active GRAM/bridge parity.

<!-- connections:start -->

## Connections

**Outgoing**
- DOCUMENTS → [[testing-strategy]] — Split HTML report records active-suite audit findings
- INFORMS → [[elaboration-v2.thread]] — Elaboration assertion cleanup is first priority
- INFORMS → [[parser-migration.thread]] — Parser gaps feed tree-sitter migration expectations
- INFORMS → [[gram-evolution.thread]] — Active bridge parity and LoGRAM-era gaps
- INFORMS → [[verification-backend.thread]] — Integration verdict assertions and unknown cases
- INFORMS → [[delimited-continuations.thread]] — Shift/reset vertical-slice test gaps

**Incoming**
- [[testing.thread]] ← INCLUDES — Audit resource and findings index
- [[testing-strategy]] ← INCLUDES — Audit findings index

<!-- connections:end -->

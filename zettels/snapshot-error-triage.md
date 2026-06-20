---
tags:
  - testing
  - snapshot-testing
  - audit
  - regression
  - integration
  - error-handling
  - compiler
  - infrastructure
  - bug
  - in-progress
---

# Snapshot error triage

Snapshot-embedded errors should be classified by testing role. Expected semantic failures are valid test contracts. Known implementation bugs need explicit known-limitation tracking. Downstream GRAM/bridge lag should be separated from parser and elaboration claims. Backend-specific lag belongs in backend-targeted tests. Unexpected runtime exceptions should be triaged as bugs rather than preserved as ordinary golden output.

<!-- connections:start -->

## Connections

**Outgoing**
- CLARIFIES → [[snapshot-testing]] — Embedded errors need explicit roles
- INFORMS → [[test-coverage-gaps]] — Snapshot-embedded errors are coverage gaps until classified
- INFORMS → [[integration-testing]] — Downstream lag must be separated from core language claims

**Incoming**
- [[testing.thread]] ← INCLUDES — Snapshot error classification from audit
- [[testing-strategy]] ← INCLUDES — Embedded snapshot error classification

<!-- connections:end -->

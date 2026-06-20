---
tags:
  - testing
  - snapshot-testing
  - regression
  - semantics
  - elaboration
  - integration
  - compiler
  - infrastructure
  - pattern
  - in-progress
---

# Semantic assertions with regression snapshots

Yap tests should pair direct semantic assertions with regression snapshots. The direct assertion states the behavior being protected; the snapshot preserves broader compiler-output drift for review.

For elaboration tests, the semantic claim usually lives in displayed type text, displayed term text, constraint text, or a small structural discriminant. For integration tests, the claim usually lives in expected type, normalized value, verification verdict, or an explicitly classified expected error.

<!-- connections:start -->

## Connections

**Outgoing**
- CLARIFIES → [[snapshot-testing]] — Snapshots are regression artifacts paired with direct claims
- INFORMS → [[integration-testing]] — Declaration-level type/validity/error expectations
- INFORMS → [[negative-testing]] — Expected failures need explicit assertions

**Incoming**
- [[testing.thread]] ← INCLUDES — Testing methodology from audit
- [[testing-strategy]] ← INCLUDES — Direct assertions plus regression snapshots

<!-- connections:end -->

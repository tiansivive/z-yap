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

<!-- connections:end -->

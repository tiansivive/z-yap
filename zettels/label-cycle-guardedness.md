---
tags:
  - mechanism
  - principle
  - recursion
  - lowering
  - graph
  - gram
  - type-system
  - evaluation
  - codata
  - compiler
  - planned
  - needs-design
refs:
  - thread:pipeline-stabilization
---

# Label cycle guardedness

The admissibility gate for a cycle in struct label references, decided by what guards the back-edge.

A cycle that passes through a lambda is a **recursive function**: the self-reference is read at call time, so the definition is well-founded under strict evaluation and is admitted. A cycle guarded only by a constructor — an eagerly-built field referring to the record under construction — is **codata**: a value like an infinite stream that requires deferred observation to construct, admissible only with laziness or a coinductive binder. An **unguarded** cycle (a field whose value is itself, through arithmetic or projection) is ill-founded and has no construction order.

This is syntactic guardedness applied at lowering time as a binary admissibility check rather than a productivity guarantee. It splits the recursive cases into the one a strict knot-tying lowering can build — lambda-guarded recursion — and the ones it cannot. Treating constructor-guarded eager cycles as an error is the boundary at which value-level coinduction becomes a forcing function for a `ν` binder: the moment a stream is written, the gap is concrete.

<!-- connections:start -->

## Connections

**Outgoing**
- SPECIALIZES → [[syntactic-guardedness]] — Guardedness as a lowering-time admissibility check
- APPLIES_TO → [[productivity-checking]] — Down payment on productivity for nu records
- MOTIVATES → [[nu-types]] — Erroring on eager codata forces value-level coinduction
- DETECTS → [[bridge-label-closure-gap]] — Distinguishes recursive function from ill-founded cycle

**Incoming**
- [[recursive-struct-binding]] ← RELIES_ON — Only admitted cycles are tied
- [[recursion.thread]] ← INCLUDES

<!-- connections:end -->

---
tags:
  - mechanism
  - continuation
  - concept
  - language
  - exploration
  - speculative
  - needs-design
  - runtime
  - strategy
  - pattern
  - scheduler
---
# Fair non-determinism scheduling

A fair scheduler for non-deterministic computation maintains a work queue of suspended
continuations. When a computation forks — via [[choose-fail-effect]] — both alternatives
are enqueued rather than one being pursued immediately. The active computation periodically
rotates to the end of the queue, allowing other alternatives to make progress.

The key property this delivers is **operational completeness**: any result that can
eventually be produced *will* eventually be produced, given sufficient resources. A
non-terminating alternative cannot starve a terminating one. This is what separates
depth-first search (incomplete — a non-terminating left alternative blocks the right one
forever) from fair scheduling.

The required capability is stronger than "invoke k twice." Continuations must be genuinely
storable and re-enqueueable — suspended mid-computation and resumed later from a queue.
This places a demand on the continuation representation beyond multishot resume: the
continuation must be serializable as a schedulable unit. In Yap's terms, this bears on
[[multishot-bridge-serialization]].

This scheduling strategy is one instance of [[nondet-handler]], corresponding to the Fair
Scheme described in [[sprite]].

<!-- connections:start -->

## Connections

**Outgoing**
- IMPLEMENTS → [[nondet-handler]] — one instance of the handler pattern
- REQUIRES → [[multishot-bridge-serialization]] — continuations must be storable and re-enqueueable
- GROUNDED_IN → [[sprite]] — Fair Scheme from Antoy & Jost

**Incoming**
- [[nondet-handler]] ← INCLUDES — fair rotation is one handler strategy
- [[sprite]] ← INTRODUCES — Fair Scheme work queue
- [[delimited-continuations.thread]] ← INCLUDES

<!-- connections:end -->

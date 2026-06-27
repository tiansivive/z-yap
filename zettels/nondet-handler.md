---
tags:
  - concept
  - mechanism
  - effect
  - continuation
  - language
  - exploration
  - speculative
  - needs-design
  - pattern
  - strategy
  - user-control
---
# Non-determinism handler

A handler over [[choose-fail-effect]] *is* the search strategy. Different handlers give
different semantics over the same `choose`/`fail`-using code:

- **Depth-first / backtracking** — invoke the continuation per alternative; exhaust one
  branch before trying the other. Simple to implement; incomplete when a branch does not
  terminate.
- **Collect-all** — accumulate all results into a list; requires a finite search space.
- **Fair rotation** — a work queue holds suspended continuations; forking enqueues both
  alternatives; the active computation periodically rotates to the queue end. Guarantees no
  alternative is permanently ignored. Implemented as [[fair-nondet-scheduling]].

The handler boundary makes the choice of strategy a program-level decision rather than a
language-level commitment. A library can expose a `run_dfs` and a `run_fair` handler over
the same non-deterministic computation; the computation itself is strategy-agnostic.

This is the user-controllable non-determinism framing: the surface design question is which
handlers to provide and where their scope boundaries sit, not which search order is built
in. The `user-control` tag reflects that handler selection is an explicit user decision, not
an implicit language default.

<!-- connections:start -->

## Connections

**Outgoing**
- USES → [[choose-fail-effect]] — interprets these two effects
- INCLUDES → [[fair-nondet-scheduling]] — fair rotation is one handler strategy

**Incoming**
- [[choose-fail-effect]] ← COMPOSES_WITH — handler interprets and gives semantics to the effect
- [[fair-nondet-scheduling]] ← IMPLEMENTS — one instance of the handler pattern
- [[delimited-continuations.thread]] ← INCLUDES

<!-- connections:end -->

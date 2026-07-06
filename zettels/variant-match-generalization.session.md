---
tags:
  - ai-session
  - elaboration
  - normalization
  - generalization
  - unification
  - metavariable
  - debugging
  - agent
  - convention
  - row-types
  - implemented
refs:
  session: 45004fd5-f3b1-4175-ace4-5fcbdd2d7e1f
  branch: pipeline-bug-squashing
---
# Session: elaboration meta-handling debugging + debugging discipline

Two elaboration fixes and a process retrospective.

**Nested dependent structs** crashed constraint solving: metas minted during row unification were not visible in the reader mid-pass ([[solver-meta-threading]]). **Unconstrained pattern binders** generalized to types that leaked metavariables — traced to two collection bugs: the meta collector dropped row-field metas that preceded a solved row tail, and generalization never collected the *kind* annotations of the metas it generalized. The fix collects field metas across solved tails and generalizes kind annotations transitively, producing the principal type ([[generalization]]) — `Π(a: Type) => Π(A: a) => …` — with no leaked metas and no `Any`. The `Any` default that appeared along the way was surfaced as an open design question ([[instantiate-any-default]]).

The retrospective examined an anchoring failure: a runtime-confirmed *mechanism* (a scope guard in `instantiate` skipping metas) was mistaken for the root cause and defended against repeated expert caution, while the real defect was in collection. The lessons — a confirmed mechanism is not a root cause, state the system invariant first, treat expert hesitation as a falsification signal, and distrust "make-it-disappear" defaults — were encoded as a new `debugging.mdc` rule and a sharpened hypothesis-vs-position carve-out in `communication.mdc`, advancing [[agent-guidelines-zettelization]]. An explorer-scan pass also surfaced backend codegen gaps ([[codegen-correctness-gaps]]).

<!-- connections:start -->

## Connections

**Outgoing**
- PRODUCED → [[solver-meta-threading]] — Interim fix authored in session
- PRODUCED → [[instantiate-any-default]] — Design question surfaced in session
- PRODUCED → [[codegen-correctness-gaps]] — Codegen bugs confirmed in the re-scan
- INFORMS → [[generalization]] — Transitive kind collection
- INFORMS → [[agent-guidelines-zettelization]] — debugging.mdc + communication.mdc sharpening

**Incoming**
- [[sessions.hub]] ← INCLUDES — Recorded pair-programming session

<!-- connections:end -->

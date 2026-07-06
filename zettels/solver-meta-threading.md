---
tags:
  - elaboration
  - unification
  - solver
  - metavariable
  - monad
  - inference
  - mechanism
  - bugfix
  - row-types
  - implemented
---
# Reader/writer meta threading during solving

Metavariables are recorded on the elaboration monad's writer channel, while the reader `ctx.metas` is a snapshot taken before the solve pass. When unification mints fresh metas mid-solve — row-tail rewriting creates them ([[flex-flex-unification]]) — those metas are not visible through the reader for the rest of the pass, so a later kind lookup on one of them dereferences a missing entry and crashes. A nested `unify` cannot recover them either: the writer accumulator does not flow down into nested monadic computations.

Row unification works around this by `listen`-ing the metas told so far and splicing them into the reader (via `V2.local`) for its recursive `unify` calls, so kind resolution sees the just-minted metas. This is an interim patch against the reader/writer split; it retires once metavariables live on threaded State ([[monad-split]]), which makes newly minted metas visible to every subsequent step at any depth.

<!-- connections:start -->

## Connections

**Outgoing**
- APPLIES_TO → [[flex-flex-unification]] — Fresh metas from row-tail rewriting trigger the missing-kind crash
- DEFERS_TO → [[monad-split]] — The real fix is threaded State, making new metas visible to every step at any depth

**Incoming**
- [[variant-match-generalization.session]] ← PRODUCED — Interim fix authored in session
- [[elaboration-v2.thread]] ← INCLUDES — Interim solver meta-visibility patch
- [[row-types.thread]] ← INCLUDES — Row unification mints the metas that trip the reader snapshot
- [[global-pending-queue]] ← INCLUDES — Remove interim splice at monad-split

<!-- connections:end -->

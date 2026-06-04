---
tags: [tech-debt, continuation, monad, elaboration]
maturity: planned
---
# tell/listen resumption refactor

`nondeterminism.solution` accumulates resumption values as a mutable `Record<number, NF.Value[]>` via `modifySt`. The `resume` function writes into this map, and `shift.ts` reads from it at Bubble construction time. This works but threads data through opaque mutable state.

A Writer-like `tell`/`listen` pattern would make the flow explicit: `resume` tells values into the writer channel, and `shift.ts` listens for them when constructing the Bubble. This eliminates the `nondeterminism.solution` accumulator and aligns with the broader goal of making the elaboration monad's data flow declarative.

Scope: refactor `nondeterminism.solution` into a `tell`/`listen` mechanism within V2.Do, update `resume` (in `nondeterminism.ts`) and `shift.ts` accordingly. May interact with broader elaboration monad refactor plans.

<!-- connections:start -->

## Connections

**Outgoing**
- ADDRESSES → [[bubble-semantics]] — Refactors how resumption values flow to Bubble
- MOTIVATES → [[bubble-semantics-phase1.implementation]] — Discovered during phase 1 values injection

**Incoming**
- [[delimited-continuations.thread]] ← INCLUDES — Tech debt work item

<!-- connections:end -->

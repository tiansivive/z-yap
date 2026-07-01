---
tags:
  - ai-session
  - lowering
  - graph
  - gram
  - recursion
  - row-types
  - bridge
  - codata
  - mir
  - elaboration
refs:
  - session: d9981f42-c4d5-4487-8290-cd10ef17a5b8
  - branch:gram-record-labels
  - code:tiansivive/yap#9
---
# Session: GRAM struct node, label resolution, and the record-capture knot

Designed and shipped the record-value vertical in GRAM (PR #9). The arc: give record values a flat `struct` node with labeled `:field` edges instead of the type-level row cons-list ([[gram-struct-node]]); resolve `:label` references to `:refers_to` graph edges in a dedicated pass carrying a frame/lambda scope stack, emitting `:scope` to the lambdas a reference escapes ([[gram-label-resolution-pass]]); and tie record-capturing fields with an explicit placeholder + `fbip` backpatch knot laid down as graph data so the bridge stays a mechanical translator ([[recursive-struct-binding]]). A label crossing a lambda captures the whole record and reads its field off it, so self- and mutual recursion fall out of one uniform mechanism; eager label cycles are rejected and lambda-guarded ones admitted by a lowering-time guardedness gate ([[label-cycle-guardedness]]).

The design corrected two of the agent's wrong claims along the way — value-level labels are neither inlined nor reordered before GRAM; they reach it as `var:label` in the raw term, and the rectangle's failure is an upstream checking-path bug (`Unbound label` on annotated structs), separate from GRAM. A first step-4 attempt (closure self-reconstruction) was reverted as an unplanned mechanism substitution and replaced with the agreed capture-the-record knot, which also handles mutual recursion. An independent style audit drove follow-ups: ts-pattern dispatch, immutable traversal (dropped dead visited sets, functional cycle check), removed casts, and a shared `structOf`. Deferred and registered in the plan: the eager-reference-to-a-backpatched-field knot invariant; whether coinduction lives in the type system (a `ν` binder) or as a GRAM productivity check; replacing the resolve-labels traversal with LoGRAM; and the source-level recursion blocker (occurs-check / mu types in elaboration).

<!-- connections:start -->

## Connections

**Outgoing**
- PRODUCED → [[gram-struct-node]]
- PRODUCED → [[gram-label-resolution-pass]]
- PRODUCED → [[recursive-struct-binding]]
- PRODUCED → [[label-cycle-guardedness]]

**Incoming**
- [[sessions.hub]] ← INCLUDES

<!-- connections:end -->

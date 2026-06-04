---
tags:
  - needs-design
  - incomplete
  - lowering
  - graph
  - mir
  - codegen
  - compiler
  - pattern
  - row-types
---

# Bridge struct dispatch

`match { x: 1 } | { x: a } -> a` — the bridge emits `String(v1) === ""` for the struct `SWITCH` node, treating it as a variant-style scalar dispatch (tag comparison). Struct patterns require field projection and sub-pattern dispatch, not string equality.

Multi-alt struct patterns (e.g. `| { x: 0 } -> "zero" | { x: a } -> a`) require real dispatch: project the field, test sub-patterns, branch. Single-alt struct patterns can skip dispatch and go straight to destructuring, but the bridge must distinguish these cases.

`decisions.ts` handles variant `SWITCH` correctly (match on injected tag) but doesn't have a struct-specific path. Struct match needs: per-field projection and comparison/binding, ordering of field tests (Maranget-style or left-to-right), and single-alt short-circuit (project fields, bind, skip branching).

The bridge now throws explicitly on `kind === "struct"` in `emitSwitch` (`src/GRAM/bridge/decisions.ts`), surfacing the gap in test snapshots rather than silently emitting incorrect MIR.

<!-- connections:start -->

## Connections

**Outgoing**
- ADDRESSES → [[gram-to-mir-bridge]] — Struct pattern compilation
- ADDRESSES → [[pattern-matching]] — Struct vs variant dispatch paths

**Incoming**
- [[explorer-audit.thread]] ← INCLUDES — Thread member
- [[pipeline-stabilization.thread]] ← INCLUDES — Backlog: struct pattern dispatch

<!-- connections:end -->

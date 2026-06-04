---
tags:
  - bug
  - planned
  - needs-design
  - lowering
  - graph
  - mir
  - codegen
  - compiler
  - row-types
  - data-access
---

# Bridge forward label references

Struct field emission in the GRAM→MIR bridge (`src/GRAM/bridge/emit.ts`) binds labels left-to-right after walking each field's value subgraph. Backward label references — `:width` in `area` when `width` precedes `area` — resolve correctly because the label is already bound when the referencing field is walked. Forward references — `:b` in `a` when `b` follows `a` — resolve to an unbound name because `b` has not been walked yet.

Example: `{ a: :b + 1, b: 10 }`. Field `a` references `:b`, but `b`'s MIR name is only bound after `b`'s value is walked, which happens after `a`.

Pre-binding all labels to MIR slots before walking any values produces use-before-def under eager evaluation semantics: the slot variable appears in instructions before the instruction that assigns it. Correct handling requires emitting fields in dependency order — topologically sorting by label references before walking values — so that every referenced label's value is already computed when it is used.

The backward-reference path (`{ width: 10, height: 20, area: :width * :height }`) is unaffected and works correctly with the current left-to-right single-pass emission.

<!-- connections:start -->

## Connections

**Outgoing**
- DISCOVERED_BY → [[bridge-label-closure-gap]] — Surfaced during #9 investigation
- APPLIES_TO → [[gram-to-mir-bridge]] — Struct field emission ordering

**Incoming**
- [[bridge-label-resolution]] ← LACKS — Current left-to-right pass handles backward refs only

<!-- connections:end -->

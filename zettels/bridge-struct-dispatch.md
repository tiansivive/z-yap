---
tags:
  - implemented
  - lowering
  - graph
  - mir
  - codegen
  - compiler
  - pattern
  - row-types
refs:
  - adr:D-010
---

# Bridge struct dispatch

`match { x: 1 } | { x: a } -> a` lowers through the GRAM bridge by following the `switch{kind:"struct"}` node's `:inspect` edge and emitting the branch subtree directly. The GRAM pattern pass already encodes struct-pattern work as projection plus sub-pattern dispatch; the bridge's responsibility is to honor that tree instead of treating the switch as tag/literal scalar comparison.

Multi-alt struct patterns (e.g. `| { x: 0 } -> "zero" | { x: a } -> a`) now project the field and recurse into literal/binder sub-patterns through the existing decision-tree shape. Single-alt struct patterns similarly project and bind without a scalar tag comparison.

`src/GRAM/bridge/decisions.ts` now resolves the discriminant from `Labels.INSPECT`; for `kind === "struct"` it emits the lone `Labels.BRANCH` subtree with the inspected value. Variant dispatch uses the same inspect resolution but reads `__tag`, matching the runtime representation described in [[variant-types]] and [[tagged-values]].

Acceptance is covered by bridge tests for surface variants, struct field binders, literal fields, and nested struct projection; full integration snapshots exercise the `{ __tag, payload }` representation through GRAM, MIR, codegen, and verification.

<!-- connections:start -->

## Connections

**Outgoing**
- ADDRESSES → [[gram-to-mir-bridge]] — Struct pattern compilation
- ADDRESSES → [[pattern-matching]] — Struct vs variant dispatch paths

**Incoming**
- [[explorer-audit.thread]] ← INCLUDES — Thread member
- [[pipeline-stabilization.thread]] ← INCLUDES — Backlog: struct pattern dispatch
- [[variant-discriminant-representation.adr]] ← CLARIFIES — Variant switches read the same discriminant while struct switches project

<!-- connections:end -->

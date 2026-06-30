---
tags:
  - bug
  - planned
  - lowering
  - graph
  - mir
  - codegen
  - compiler
---

# Bridge label resolution in closure gap

`:field` self-references inside match bodies within struct field definitions produce undefined MIR variables. This is an edge case of the label resolution fix documented in [[bridge-label-resolution]]: while direct `:field` references in struct values were fixed, the resolution doesn't traverse into match expression bodies nested inside field definitions.

Observed in the `fact` test case: `fact` is a struct with a `:compute` field containing a match. Inside the match's recursive branch, `:compute` references itself, but the bridge produces `v5` (undefined) instead of resolving to the struct's own field.

**Root cause:** The label resolution pass in `emit.ts` resolves `:label` references by looking at the immediately enclosing struct scope. When a match expression introduces new scopes (alternatives, pattern binders), the struct scope is shadowed, and `:label` lookups fail to find the enclosing struct field.

**Difference from [[bridge-label-resolution]]:** That fix handled direct field self-references. This gap is about field self-references *nested under additional scope-introducing forms* (match, let, etc.) within the same field body.

<!-- connections:start -->

## Connections

**Outgoing**
- EXTENDS → [[bridge-label-resolution]] — Edge case of prior fix
- APPLIES_TO → [[gram-to-mir-bridge]] — Scope resolution under match

**Incoming**
- [[pipeline-stabilization.thread]] ← INCLUDES — Label self-ref under match scope
- [[bridge-forward-label-refs]] ← DISCOVERED_BY — Surfaced during #9 investigation
- [[gram-label-resolution-pass]] ← ADDRESSES — Resolves self-refs nested under match scope
- [[label-cycle-guardedness]] ← DETECTS — Distinguishes recursive function from ill-founded cycle
- [[gram-struct-node]] ← ADDRESSES — One record node to capture and project from

<!-- connections:end -->

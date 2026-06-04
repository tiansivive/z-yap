---
tags:
  - bug
  - implemented
  - bugfix
  - lowering
  - graph
  - mir
  - codegen
  - compiler
---

# Bridge free var → unknown

The GRAM→MIR bridge emitted `unknown` for `var:free` definition nodes.

**Root cause:** `Leaves.free` in `src/GRAM/bridge/leaves.ts` followed a `:refers_to` edge from the `VAR_FREE` definition node, but definition nodes are *targets* of `:refers_to`, not sources. The edge doesn't exist, so `target` was `undefined` and the name fell back to `"unknown"`. The variable name was already present on the node's own `payload.name` (set by `intern` in `translate.ts`).

**Fix:** Changed `Leaves.free` to read `payload.name` directly from the node instead of following a non-existent edge. Same pattern as `Leaves.label`.

**Impact:** Fixed MIR/codegen output for any multi-binding script where one definition references another. 25 integration test snapshots updated.

<!-- connections:start -->

## Connections

**Outgoing**
- APPLIES_TO → [[gram-to-mir-bridge]] — Var resolution gap

**Incoming**
- [[pipeline-stabilization.thread]] ← INCLUDES — Bridge var:free → unknown

<!-- connections:end -->

---
tags:
  [
    planned,
    tooling,
    cli,
    migration,
    elaboration,
    inference,
    parser,
    infrastructure,
    reference,
    display,
    error-handling,
    drift,
    ast,
    project,
    normalization,
    backlog,
  ]
---

# Language Server Protocol (LSP)

**Today:** Editors rely on external grammar assets (`tooling/syntax-highlighting` via `src/cli/explore/server.ts` `/syntax/*`) and batch **`pnpm yap`** / tests — no language-server package under `src/` yet.

**One approach for an LSP:** expose a stable query surface over **CST** (tree-sitter migration) plus **elaboration outputs** (types, spans, defs/refs) without restarting full CLI processes per keystroke.

<!-- connections:start -->

## Connections

**Outgoing**
- REPORTS → [[yap]] — Language server protocol
- USES → [[v2-elaboration-pipeline]] — Incremental analysis
- USES → [[tree-sitter-parser]] — Incremental parsing

**Incoming**
- [[global-pending-queue]] ← INCLUDES

<!-- connections:end -->

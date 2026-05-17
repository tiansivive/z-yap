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
  ]
---

# Language Server Protocol (LSP)

**No LSP implementation** under `src/` (no language-server package, no `vscode-languageclient`-style server entry). Editors rely on external grammar assets (for example `tooling/syntax-highlighting` consumed by `src/cli/explore/server.ts` for static `/syntax/*` routes) and batch **`pnpm yap`** / tests.

Planned work would require a stable query surface over **CST** (tree-sitter migration per project docs) plus **elaboration outputs** (types, spans, defs/refs) without restarting full CLI processes per keystroke.

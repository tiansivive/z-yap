---
tags:
- parser
- migration
- in-progress
- syntax
- ast
- tooling
- codegen
- elaboration
- inference
- compiler
- drift
- infrastructure
- reference
- project
- testing
- performance
---

# Tree-sitter parser

Grammar package: **external `tree-sitter-yap`**. Intended TypeScript surface: generated node typings under **`src/parser/types/generated.d.ts`** (via `@asgerf/dts-tree-sitter`) and CST helpers **`extractFields` / `extractParam`** in **`src/parser/utils.ts`**, with field access through **`SyntaxType`** enums.

Tree-sitter is the **migration target**; Nearley remains the **shipping** parse path (`nearley-parser.md`). **`src/parser/index.ts`** today exposes the Nearley barrel; CST modules would join the index when the migration lands.

Typings regeneration is wired in tooling docs as **`pnpm run ts-dts`** (redirect `dts-tree-sitter` output into `generated.d.ts`) — confirm the script exists in root **`package.json`** before relying on it in CI.

<!-- connections:start -->

## Connections

**Outgoing**
- SUPERSEDES → [[nearley-parser]] — Incremental replaces ambiguous CFG
- PRODUCES → [[v2-elaboration-pipeline]] — CST.SyntaxNode
- TRANSLATES_TO → [[src-term]] — Incremental parse tree → CST

**Incoming**
- [[lsp]] ← USES — Incremental parsing
- [[nearley-parser]] ← CONTRASTS_WITH — Ambiguous CFG vs error-recovering incremental
- [[parser-migration.thread]] ← INCLUDES
- [[fuzz-testing]] ← TARGETS

<!-- connections:end -->

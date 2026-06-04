---
tags:
- parser
- syntax
- ast
- implemented
- migration
- testing
- tooling
- cli
- tracing
- compiler
- elaboration
- mir
- inference
- project
---

# Nearley parser

Authoritative Nearley source: **`src/parser/grammar.ne`**; generated tables: **`src/parser/grammar.ts`** via **`pnpm nearley`** (`package.json` script: `nearleyc src/parser/grammar.ne -o src/parser/grammar.ts` …).

Parse output is **`Src.Term`** from postprocessors in **`src/parser/processors.ts`**, threaded with `location` (`span`, `locSpan`, `Sourced.located` in `processors.ts`).

Tests override **`ParserStart`** (commonly **`"Ann"`** for expressions), then assert **`results.length === 1`** before snapshotting (`src/parser/__tests__/grammar.test.ts` and helpers in other `__tests__` files).

Active pipeline: **`src/elaboration/elaborate.ts`** ingests `Src.Term` from this path. Dual-backend story: **`tree-sitter-parser.md`**.

Barrel **`src/parser/index.ts`** re-exports **`terms`**, **`pretty`**, **`Processors`** — the Nearley surface for elaboration today.

<!-- connections:start -->

## Connections

**Outgoing**
- PRODUCES → [[elaboration]] — Src.Term
- TRANSLATES_TO → [[src-term]] — Token stream → AST
- CONTRASTS_WITH → [[tree-sitter-parser]] — Ambiguous CFG vs error-recovering incremental

**Incoming**
- [[yap]] ← INCLUDES — Parser component
- [[tree-sitter-parser]] ← SUPERSEDES — Incremental replaces ambiguous CFG
- [[parser-migration.thread]] ← INCLUDES
- [[fuzz-testing]] ← TARGETS
- [[test-coverage-gaps]] ← DETECTS — Bool literal grammar gap

<!-- connections:end -->

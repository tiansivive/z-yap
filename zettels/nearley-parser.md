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

Parse output is **`Src.Term`** from postprocessors in **`src/parser/processors.ts`**, threaded with `location` (`src/parser/ARCHITECTURE.md`).

Tests override **`ParserStart`** (commonly **`"Ann"`** for expressions), then assert **`results.length === 1`** before snapshotting (`src/parser/__tests__/grammar.test.ts` and helpers in other `__tests__` files).

Active pipeline: **`src/elaboration/elaborate.ts`** ingests `Src.Term` from this path. Dual-backend story: **`tree-sitter-parser.md`**, **`src/parser/ARCHITECTURE.md`**.

Barrel **`src/parser/index.ts`** currently re-exports **`terms`**, **`pretty`**, **`Processors`** only (no CST types barrel on this branch).

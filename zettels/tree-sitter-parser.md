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

Grammar package: **external `tree-sitter-yap`** (see `src/parser/ARCHITECTURE.md` dual-backend table). Intended TypeScript surface: generated node typings under **`src/parser/types/generated.d.ts`** and CST helpers **`extractFields` / `extractParam`** in **`src/parser/utils.ts`** (documented in the same ARCHITECTURE file; matches **`.github/copilot-instructions.md`**’s field-access recipe with `SyntaxType`).

This repository snapshot may not yet contain `src/parser/types/` or `utils.ts`; **`src/parser/index.ts`** does not re-export CST modules yet—treat tree-sitter as the **migration target**, Nearley as the **shipping** parse path (`nearley-parser.md`).

Regeneration command for typings is described in **`AGENTS.md`** / **`docs/ARCHITECTURE.md`** as **`pnpm ts-dts`**; that script string is **not** present in root **`package.json`** on this branch (documentation vs scripts drift).

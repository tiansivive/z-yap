---
tags:
  [
    in-progress,
    cli,
    tooling,
    mir,
    compiler,
    lowering,
    codegen,
    verification,
    parser,
    inference,
    sat,
    display,
    backend,
    infrastructure,
    normalization,
    elaboration,
  ]
---

# Pipeline explorer

**CLI**: `pnpm yap explore` (`scripts/cli.ts`), **`--port`** default **3333**.

**Implementation**: `src/cli/explore/index.ts` exports **`start`** from **`server.ts`**. Node **`http`** server serves **`src/cli/explore/static/`** (HTML/JS/CSS) and **`tooling/syntax-highlighting`** under **`GET /syntax/…`**.

**Core API**: **`POST /run`** parses JSON **`{ source, deBruijn, parserRule, rawJson, vcFormat }`** and calls **`run`** from **`pipeline.ts`**. **`ParserRule`** is **`"Ann"` | `"Script"`** (matches Nearley parser entry switching). **`Result`** strings include **`parsed`**, **`elaborated`**, **`type`**, **`normalized`**, **`constraints`**, **`metas`**, **`verification`**, **`mir`**, **`gram`**, **`codegenJS`**, **`codegenC`**, **`codegenErlang`**, **`errors`**, plus **`raw`**.

**Pipeline deps**: Nearley grammar, **`EB`** inference/display, **`NF`**, MIR lower/pretty, GRAM passes imported as **`@yap/gram`** (`tsconfig.json` path → `src/GRAM/index`), verification pretty — repo **`pnpm exec tsc --noEmit -p tsc.tsconfig.json`** currently reports errors touching **`pipeline.ts`** and static **`app.js`** imports (strict hygiene still open).

---
tags:
  [
    tooling,
    cli,
    parser,
    elaboration,
    verification,
    mir,
    codegen,
    display,
    testing,
    infrastructure,
    implemented,
  ]
---
# yap explore

**Entry:** `pnpm yap explore` (default `--port 3333`) · wired in `scripts/cli.ts` → `src/cli/explore/server.ts`.

**Behavior:** Plain `http` server serves `src/cli/explore/static/` (`index.html`, `app.js`, `style.css`) and proxies `/syntax/*` into `tooling/syntax-highlighting/`. **`POST /run`** parses JSON `{ source, deBruijn, parserRule, rawJson, ivlSimplify }` and returns JSON snapshots.

**Pipeline wired in `src/cli/explore/pipeline.ts`:** Nearley parse (`ParserRule` `Ann` | `Script`) → `EB.Mod.expression` → constraint/meta/zonker debug → `NF.quote` / `NF.evaluate` → `EB.Mod.verify` (Z3 VC pretty or sexpr) → `lowerToMir` → GRAM `translate` + `eta` / `saturate` / `closureConvert` → JS/C/Erlang codegen emits.

Explorer capabilities are whatever the static UI and `/run` payload implement today (`src/cli/explore/pipeline.ts`, `server.ts`).

<!-- connections:start -->

## Connections

**Outgoing**
- REPORTS → [[yap]] — Web dashboard for pipeline stages
- USES → [[v1-elaboration-pipeline]] — Displays elaboration output
- USES → [[pretty-printing]] — Term rendering
- MIRRORS → [[pipeline-explorer]] — Same tool, alternate zettel

<!-- connections:end -->

---
tags:
  [
    compiler,
    infrastructure,
    cli,
    codegen,
    parser,
    elaboration,
    verification,
    mir,
    backend,
    tooling,
    project,
    ffi,
    implemented,
  ]
---
# Compile Orchestration

> Canonical path: per D-006 ([[gram-canonical-ir.adr]]), the live compilation pipeline is `EB.Term → GRAM → MIR → codegen` via `GRAM.Pipeline.compile` + `GRAM.Bridge.emit`, integrated in `src/cli/explore/pipeline.ts`. The `yap <file>` entry described below uses the legacy `src/compile.ts` / `src/Codegen/modules.ts` path — see [[legacy-file-compile]] for the tech-debt item to migrate it.

**Binary:** `pnpm yap` runs `scripts/cli.ts` (Commander).

**`yap <file>`:** Loads Z3 (`z3-solver` `init`, `setZ3Context`) when no context exists, then calls `compile` from `src/compile.ts` with `--outDir` / `--srcDir`. That path: `mkInterface` in `src/modules/loading.ts` (Nearley parse, `EB.Mod.elaborate`, caches `globalModules`), then `codegen` from `src/Codegen/modules.ts` — CommonJS prelude (`require("./prelude.js")`), `require` of imports and `.ffi.js` siblings, `let` bindings via `src/Codegen/terms.ts` (`EB.Term` → JS string), `module.exports`. Output is formatted with `js-beautify` and written beside `outDir`; existing `<stem>.ffi.js` under `baseUrl` is copied if present.

**`yap repl`:** Options `--mir`, `--codegen`, `--target js|c|erlang` (`scripts/cli.ts`). MIR lowering: `lowerToMir` from `src/lowering/lower.ts`; codegen when `--codegen` uses `src/Codegen/v2/{js,c,erlang}/emit.ts`. NbE path uses normal elaboration evaluation unless `--mir`.

**`yap explore`:** HTTP dashboard (`src/cli/explore/`) — pipeline driver `src/cli/explore/pipeline.ts` runs parse → `EB.Mod.expression` → optional verify → `lowerToMir` → GRAM translate + `eta` / `saturate` / `closureConvert` → v2 codegen previews for JS/C/Erlang.

Let-bound top-level declarations run Liquid verification during `EB.Mod.elaborate` (`src/elaboration/module.ts` `letdec`, requires Z3 context). `foreign` declarations do not share that verification block.

<!-- connections:start -->

## Connections

**Outgoing**
- DELEGATES_TO → [[v1-elaboration-pipeline]] — Current delegation
- DELEGATES_TO → [[verification-pipeline]] — On-demand
- DELEGATES_TO → [[mir-lowering]] — Lowering step
- DELEGATES_TO → [[legacy-file-compile]] — Current file-compile delegation

**Incoming**
- [[yap]] ← INCLUDES — Orchestration
- [[legacy-file-compile]] ← APPLIES_TO — The yap <file> entry runs the legacy path
- [[aot-compilation]] ← COMPOSES_WITH — Pipeline that performs AOT

<!-- connections:end -->

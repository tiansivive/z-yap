---
tags:
  [
    implemented,
    cli,
    tooling,
    parser,
    inference,
    normalization,
    mir,
    codegen,
    lowering,
    runtime,
    ffi,
    backend,
    elaboration,
    monad,
    backlog,
  ]
---

# REPL

**Entry**: `pnpm yap repl` → `scripts/cli.ts` command **`repl`** → `repl()` in `src/cli/repl.ts`.

**Parsing**: statements use Nearley **`ParserStart: "Script"`** (`repl.ts` `parse`), trailing `;` added if absent; expects exactly **one** statement per submission.

**Evaluation modes**: default NbE via `interpretNbE` (`EB.Mod.expression`, `EB.Mod.letdec`, `EB.Mod.using`). Flags **`--mir`** (MIR interpreter), **`--codegen`** + **`--target`** `js` | `c` | `erlang` wire `lowerToMir`, pretty-print MIR, then interpreter or **`Codegen/v2/{js,c,erlang}`** emit paths.

**Multiline**: lines accumulate in **`buffer`** until an **empty line** flushes (`executeBuffer`) — not delimiter-balanced `{}`/`()`/`[]` scanning.

**Commands**: `:help`, `:exit`/`:quit`/`:q`, `:load <filepath>` (uses `mkInterface` from `src/modules/loading.ts`, optional `.ffi.js`), `:set elaboration` toggles `options.showElaboration`, `:implicits` dumps context implicits.

**Context**: starts `defaultContext` (`@yap/shared/lib/constants`); `:load` merges imports/foreign/**let** bindings into **`ctx.imports`** / **`ctx.ffi`**.

<!-- connections:start -->

## Connections

**Outgoing**
- USES → [[parser-processors]] — Parses each input
- USES → [[v1-elaboration-pipeline]] — Elaborates
- USES → [[mir]] — Optional MIR display mode
- THREADS_THROUGH → [[elaboration-context]] — Persistent ctx
- USES → [[js-codegen]] — Code generation
- DISPATCHES_ON → [[mir]] — Standard, --mir, --codegen modes

**Incoming**
- [[global-pending-queue]] ← INCLUDES
- [[test-coverage-gaps]] ← DEFERS — Integration test skipped (infrastructure)
- [[explorer-snippet-library]] ← COMPOSES_WITH — Similar curated-input concept

<!-- connections:end -->

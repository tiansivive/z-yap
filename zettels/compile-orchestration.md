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

> Canonical path: per D-006 ([[gram-canonical-ir.adr]]), the live compilation pipeline is `EB.Term → GRAM → MIR → codegen` via GRAM pipeline lowering and bridge emission. `src/compile.ts`, the REPL, explorer, and integration helpers now route through the shared pipeline layer rather than legacy direct codegen.

**Binary:** `pnpm yap` runs `scripts/cli.ts` (Commander).

**`yap <file>`:** Calls `compile` from `src/compile.ts` with output directory, source directory, target, and GRAM/MIR emission flags. That path loads modules via `mkInterface`, lowers each valid declaration through `Pipeline.lowerTerm`, writes optional GRAM and MIR artifacts, emits JS/C/Erlang target code, formats JS output, and copies existing FFI siblings.

**`yap repl`:** Options `--codegen`, `--target js|c|erlang`, and `--no-verify` (`scripts/cli.ts`). Default mode uses the MIR interpreter; codegen mode emits through `src/Codegen/v2/{js,c,erlang}/emit.ts`.

**`yap explore`:** HTTP dashboard (`src/cli/explore/`) — pipeline driver `src/cli/explore/pipeline.ts` runs parse → expression elaboration → optional verification/validity/solver trace → GRAM pipeline/bridge → MIR display → JS/C/Erlang codegen previews.

Let-bound top-level declarations run Liquid verification during `EB.Mod.elaborate`. `foreign` declarations do not share that verification block.

<!-- connections:start -->

## Connections

**Outgoing**
- DELEGATES_TO → [[v1-elaboration-pipeline]] — Current delegation
- DELEGATES_TO → [[verification-pipeline]] — On-demand
- DELEGATES_TO → [[gram-to-mir-bridge]] — Lowering step (Pipeline.lowerTerm → bridge)
- DELEGATES_TO → [[legacy-file-compile]] — Current file-compile delegation

**Incoming**
- [[yap]] ← INCLUDES — Orchestration
- [[package-artifact-distribution]] ← SUPPORTS — Installed CLI preserves command entry points
- [[legacy-file-compile]] ← APPLIES_TO — The yap <file> entry runs the legacy path
- [[aot-compilation]] ← COMPOSES_WITH — Pipeline that performs AOT

<!-- connections:end -->

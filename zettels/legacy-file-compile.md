---
tags:
  [
    tech-debt,
    legacy,
    compiler,
    codegen,
    mir,
    gram,
    module-system,
    pipeline,
    backend,
    implemented,
    incomplete,
    infrastructure,
    cli,
    js,
    refactor,
    integration,
    bridge,
    testing,
  ]
---
# Legacy file-compile path

The file-level CLI now lowers each valid declaration through `Pipeline.lowerTerm`, emits GRAM and MIR artifacts, dispatches to JS/C/Erlang codegen, and copies FFI siblings. This closes the original file-compile bypass described by D-006.

The remaining legacy residue is the direct `lowerToMir` API retained for direct lowering and backend snapshot tests. Removing it cleanly requires reframing those tests around `GRAM.Bridge.emit` or keeping them as explicit legacy regression coverage.

Boundary: `lowerToMir` deprecation cannot complete while direct lowering/codegen tests still depend on it. The file-compile part of the work is implemented; the test-retirement part remains incomplete.

## Retirement path

Six test files import `lowerToMir`, each only to obtain a `MIR.Module`: `lowering/__tests__/lower.test.ts` (MIR-shape snapshots), `interpret.test.ts` (MIR interpreter, run-to-value), `pretty.test.ts` (MIR pretty-printer), and `Codegen/v2/{js,c,erlang}/__tests__/emit.test.ts` (backend emit). Repointing that producer to `GRAM.Bridge.emit` clears the dependency:

- MIR-shape snapshots re-baseline against bridge-emitted MIR.
- The interpreter tests take bridge-emitted MIR. This is where the run-to-value coverage for captured-frame, multishot-with-local-frame, resumption-value-plus-captured-var, and struct-binding match belongs — cases currently exercised only via `lowerToMir`, tracked by [[test-coverage-gaps]].
- `bridge.test.ts` value assertions (`interpret(bridge(term))`) consolidate into the interpreter tests, leaving the bridge suite asserting emitted-MIR shape.
- Backend emit tests source their `MIR.Module` from the bridge.

With no test referencing `lowerToMir`, `src/lowering/lower.ts` retires.

`src/lowering` is ESLint-ignored as deprecated, but three of its files are live imports of the canonical pipeline and therefore sit unlinted: `mir.ts` (the MIR definition, imported throughout `GRAM/bridge`), `interpret.ts` (the MIR interpreter, via `src/pipeline`), and `shared/primops`. Migrating those out (e.g. under `src/pipeline` or a dedicated `src/MIR`) restores their lint coverage and leaves the remainder of the directory deletable once the test repointing above lands.

<!-- connections:start -->

## Connections

**Outgoing**
- DEFERS_TO → [[gram-canonical-ir.adr]] — Resolution shape is the canonical pipeline
- APPLIES_TO → [[compile-orchestration]] — The yap <file> entry runs the legacy path
- BLOCKS → [[gram-canonical-ir.adr]] — Full canonical adoption blocked on the file-path migration

**Incoming**
- [[compile-orchestration]] ← DELEGATES_TO — Current file-compile delegation
- [[global-pending-queue]] ← INCLUDES — Tech debt tracked in the global queue
- [[test-coverage-gaps]] ← BLOCKS — GRAM-path run-to-value parity gaps gate lowerToMir retirement
- [[lint-governance]] ← AFFECTS — src/lowering lint-ignored; live MIR surface migration queued

<!-- connections:end -->

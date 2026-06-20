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
  ]
---
# Legacy file-compile path

The file-level CLI now lowers each valid declaration through `Pipeline.lowerTerm`, emits GRAM and MIR artifacts, dispatches to JS/C/Erlang codegen, and copies FFI siblings. This closes the original file-compile bypass described by D-006.

The remaining legacy residue is the direct `lowerToMir` API retained for direct lowering and backend snapshot tests. Removing it cleanly requires reframing those tests around `GRAM.Bridge.emit` or keeping them as explicit legacy regression coverage.

Boundary: `lowerToMir` deprecation cannot complete while direct lowering/codegen tests still depend on it. The file-compile part of the work is implemented; the test-retirement part remains incomplete.

<!-- connections:start -->

## Connections

**Outgoing**
- DEFERS_TO → [[gram-canonical-ir.adr]] — Resolution shape is the canonical pipeline
- APPLIES_TO → [[compile-orchestration]] — The yap <file> entry runs the legacy path
- BLOCKS → [[gram-canonical-ir.adr]] — Full canonical adoption blocked on the file-path migration

**Incoming**
- [[compile-orchestration]] ← DELEGATES_TO — Current file-compile delegation
- [[global-pending-queue]] ← INCLUDES — Tech debt tracked in the global queue

<!-- connections:end -->

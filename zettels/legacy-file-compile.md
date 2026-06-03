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
    planned,
    infrastructure,
    cli,
    js,
    refactor,
    integration,
    bridge,
  ]
---
# Legacy file-compile path

`src/compile.ts` (the entry point reached by the file-level CLI flow via `Mod.mkInterface` + `CG.codegen` in `src/Codegen/modules.ts`) bypasses the canonical pipeline described by D-006: it does not route through `GRAM.Pipeline.compile` or `GRAM.Bridge.emit`, and it emits only JavaScript via the legacy `Codegen/modules.ts` path. The canonical pipeline (`src/cli/explore/pipeline.ts`) flows `EB.Term → GRAM → MIR → codegen` for all three backends; the file path does not.

Consequences while the legacy path remains:
- Programmable GRAM passes ([[programmable-gram-passes]]) and the Kernel pass do not run for the file-compile entry, so user-supplied modal annotations are silently ignored on that path.
- Bridge-resident optimisations (closure conversion shape, multishot serialisation, future single-shot specialisation) are unreachable from the file path.
- The C and Erlang backends are not exposed via this entry; they are reachable only through the explore CLI.
- `src/lowering/lower.ts` retains `lowerToMir` carrying `@deprecated Use GRAM.Bridge.emit instead.` because the file path and a set of tests still depend on it. Removing it cleanly requires migrating both.

Resolution shape: replace `src/compile.ts` and `src/Codegen/modules.ts` with a module-level driver that walks each loaded module's let-decs, runs `GRAM.Pipeline.compile` per declaration with module context, emits via `GRAM.Bridge.emit`, and dispatches to the selected codegen backend. Module context threading is the open piece — the current GRAM pipeline is per-term and does not thread the elaboration context across module boundaries.

Boundary: the deprecation of `lowerToMir` cannot be completed before this migration. Test suites that exercise lowering directly will need to be reframed against the bridge or kept as legacy regression tests.

Status: queued; no implementation work in flight. Tracked from [[global-pending-queue]].

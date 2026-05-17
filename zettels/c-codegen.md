---
tags:
- codegen
- backend
- mir
- compiler
- lowering
- runtime
- testing
- ir
- project
- reference
- performance
- in-progress
---
# C Codegen

`src/Codegen/v2/c/emit.ts` prints `MIR.Module` (same input shape as JS v2) into C, pulling runtime helpers from `src/Codegen/v2/c/rt/yap_rt.h` (arena, tagged `YapValue`, closures). Public surface: `emit`, `print`, `AST` from `src/Codegen/v2/c/index.ts`.

Vitest snapshots live under `src/Codegen/v2/c/__tests__/`. The lowering → MIR contract is written down in `docs/MIR-LOWERING.md` (`lowerToMir`, closure layout, saturation); C tracks that contract, not a separate IR.

CLI: `pnpm yap repl --codegen --target c` selects this emitter (`scripts/cli.ts`, `src/cli/repl.ts` imports `emit`/`print` from `../Codegen/v2/c/`).

File-mode `src/compile.ts` does **not** use this path; it emits JS via `src/Codegen/modules.ts`.

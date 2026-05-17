---
tags:
- codegen
- backend
- mir
- elaboration
- compiler
- lowering
- runtime
- ast
- ir
- cli
- testing
- incomplete
- implemented
---
# JS Codegen

**Legacy EB printer:** `src/Codegen/terms.ts` `codegen(env, EB.Term)` — used by `src/Codegen/modules.ts` for file compilation (`src/compile.ts`). Emits lambdas, apps, rows (getter-backed records), match, blocks; pulls primitive term definitions from `@yap/shared/lib/primitives` `Terms()` when free vars match kernel names. Not MIR-based.

**MIR v2:** `src/Codegen/v2/js/emit.ts` consumes `MIR.Module`, maps instructions (`Alloc`, `Read`, `Call`, `PrimOp`, …) via `PRIMOP_JS` (`$add` → `+`, `$eq` → `===`, …). `print.ts` formats `JS.Program`. Wired in REPL (`src/cli/repl.ts`) when `--codegen` without overriding `--target`, and in explorer (`src/cli/explore/pipeline.ts`).

**Split:** Default project compiler uses legacy path only; MIR codegen is opt-in (`repl` / explorer / programmatic `lowerToMir` + `emit`).

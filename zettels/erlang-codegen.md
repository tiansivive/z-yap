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
- cli
- in-progress
---
# Erlang Codegen

`src/Codegen/v2/erlang/emit.ts` lowers `MIR.Module` to Erlang-shaped AST (`ast.ts`), `print.ts` serializes source. Exported like C/JS from `src/Codegen/v2/erlang/index.ts`.

Coverage is exercised by `src/Codegen/v2/erlang/__tests__/emit.test.ts` (Vitest snapshots).

CLI wiring: `pnpm yap repl --codegen --target erlang` (`scripts/cli.ts`, `src/cli/repl.ts`).

Explorer previews Erlang output from the same MIR module as JS/C (`src/cli/explore/pipeline.ts` → `emitErl` / `printErl`).

File compile (`src/compile.ts`) stays on legacy JS codegen only; MIR → Erlang is REPL/explorer (and any caller of `lowerToMir` + emit), not the default file compiler.

<!-- connections:start -->

## Connections

**Outgoing**
- CONSUMES → [[mir]] — Emits Erlang from MIR
- TRANSLATES_TO → [[ffi]] — Erlang source output

**Incoming**
- [[yap]] ← INCLUDES — Erlang backend
- [[gram]] ← TRANSLATES_TO — Target-specific passes
- [[integration-testing]] ← CONCERNS

<!-- connections:end -->

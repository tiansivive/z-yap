---
tags:
- lowering
- mir
- ffi
- mechanism
- codegen
- primitive
- rewriting
- graph
- compiler
- backend
- testing
- implemented
---
# Saturation (Lowering)

**MIR lowering (authoritative for execution IR):** Foreigns and primops share one accumulator (`LowerResult` `tag: "foreign" | "primop"`, `args`, `arity`). `App` lowering uses `Cont:sat` (`src/lowering/functions/app.ts`) to append arguments until `arity` is met, then `materialize` emits `Call(direct)` or `Expr` `PrimOp`; unsaturated heads become closure wrappers (`src/lowering/functions/materialize.ts`, `docs/MIR-LOWERING.md`).

Arity for primops is the `ARITIES` table in `src/lowering/shared/primops.ts` (`$add`, ..., `$not`). User `foreign` arity comes from elaboration (`src/elaboration/module.ts`) into `Declaration` consumed by `src/lowering/leaf.ts`.

**GRAM (graph tool / explorer):** `src/GRAM/passes/saturate.ts` rewrites `APP` chains touching `VAR_FOREIGN` into `EXTERNAL` nodes with payload `{ name, arity, args, saturated }`, using the same numeric arities for registered primops. Default configured order in `src/GRAM/pipeline/index.ts` is `eta` -> `saturate` -> `shiftReset` -> `pattern` -> `closure`.

**Prerequisite:** Saturation requires `var:foreign` nodes (not `var:free`) with `arity` in their payload. Two fixes enable this: (1) the elaboration context `lookup` function (`src/elaboration/shared/context.ts`) now correctly produces `EB.Constructors.Var({ type: "Foreign" })` for imported primops (previously always produced `Free`); (2) the explorer passes `ARITIES` from `src/lowering/shared/primops.ts` to `GRAM.Pipeline.compile`.

Use "saturation" language for both, but they are different code paths: lowering drives emitted code; GRAM drives the displayed/transformed EB graph.

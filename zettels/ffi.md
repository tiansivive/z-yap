---
tags:
  [
    ffi,
    elaboration,
    syntax,
    lowering,
    codegen,
    runtime,
    mir,
    dependent,
    strings,
    arithmetic,
    project,
    parser,
    implemented,
  ]
---
# FFI

**Surface syntax:** `Foreign -> "foreign" … Identifier … TypeExpr` in `src/parser/grammar.ne`; CST elaborated in `src/elaboration/module.ts` `foreign()`: `EB.check` on the annotation, `NF.evaluate` for the type, `EB.Constructors.Var({ type: "Foreign", name })`, arity from `NF.arity(ctx, nf)`, stored as `Interface.declarations[name]` (`src/modules/loading.ts`).

**Legacy JS bundle:** `src/compile.ts` / `src/Codegen/modules.ts` emit `const { name } = require("./<module>.ffi.js")` next to generated `.js`. Host implementations live in those hand-written `.ffi.js` files.

**MIR lowering:** `src/lowering/leaf.ts` `foreign()` reads `ctx.declarations`; partial vs saturated behaviour matches primops (`src/lowering/functions/materialize.ts` `reify` / `partial`, same arity story as primops).

**REPL bridge:** `src/cli/repl.ts` loads JS FFI objects into `mirFfi`; `src/FFI/codecs.ts` maps selected `NF.Value` shapes (literals, structs, modal stripping, opaque `"<function>"` for `Abs`) to/from host JSON-ish values — boundary helpers, not the codegen ABI itself.

**Codegen pairing today:** `src/compile.ts` wires **`.ffi.js`** host modules alongside generated JS; C/Erlang FFI stubs would be a separate codegen path if added.

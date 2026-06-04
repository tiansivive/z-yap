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

<!-- connections:start -->

## Connections

**Outgoing**
- RELIES_ON → [[mir-lowering]] — Saturation
- LACKS → [[type-erasure]] — Needs dummy type args
- TRANSLATES_TO → [[js-codegen]] — Curried JS functions
- ENCODES → [[elaboration-context]] — External functions as Var(Foreign)
- TRANSLATES_TO → [[js-codegen]] — Curried JS functions (.ffi.js companions)

**Incoming**
- [[lists]] ← ENCODES — Indexed Num T defaultArray (foreign)
- [[dictionaries]] ← ENCODES — Indexed String T defaultHashMap (foreign)
- [[ffi-saturation-gram]] ← EXTENDS — GRAM saturation pass for foreign/primop refs
- [[ffi-saturation-mir]] ← EXTENDS — Deprecated MIR lowering saturation
- [[variable-evaluation-dispatch]] ← IMPLEMENTS — Foreign variable lookup
- [[type-erasure]] ← ADDRESSES — Dummy type args
- [[js-codegen]] ← TRANSLATES_TO — JavaScript source output
- [[c-codegen]] ← TRANSLATES_TO — C source output
- [[erlang-codegen]] ← TRANSLATES_TO — Erlang source output
- [[primitive-signature]] ← USES — Foreign δ-rules
- [[saturation]] ← DISPATCHES_ON — Known-arity foreign/ref functions
- [[dictionary-passing]] ← APPLIES_TO — FFI arity includes dictionary args
- [[customizable-data-types]] ← COMPOSES_WITH — FFI-specified backends
- [[indexing-strategies]] ← COMPOSES_WITH — FFI-specified indexing
- [[integration-testing]] ← CONCERNS
- [[primop-closure]] ← IMPLEMENTS — Built-in and foreign operations
- [[variable-evaluation-dispatch]] ← RELIES_ON — Foreign variables → ctx.ffi

<!-- connections:end -->

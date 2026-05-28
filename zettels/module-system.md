---
tags:
  [
    incomplete,
    compiler,
    syntax,
    inference,
    elaboration,
    parser,
    ffi,
    project,
    migration,
    ast,
    infrastructure,
    verification,
    normalization,
    monad,
    reference,
    backlog,
  ]
---

# Module system

**Nearley surface** (`src/parser/grammar.ne`): optional header then script — **`export *;`**, **`export (id, …);`**, **`import "relative/path.yap";`**, **`import "path" (id, …);`** mapped by `exportAll`, `exportSome`, `importAll`, `importSome` in `src/parser/processors.ts`.

**`src/parser/terms.ts`** also declares **`Import`** variants `{ type: "qualified"; … }` and **`Export`** `{ type: "partial"; hiding: … }`. Those shapes are **not** produced by `grammar.ne` today — only `*` / explicit imports and `*` / explicit exports reach the CST.

**Loading**: `mkInterface` in `src/modules/loading.ts` reads files, parses with compiled Nearley grammar, resolves **`import`** statements recursively (`visited` tracks cycles), merges exported **`let`** / **`foreign`** defs into `EB.Context.imports`, then calls **`EB.Mod.elaborate`** from `src/elaboration/module.ts`. Interface caches live in `globalModules`.

**Per-statement behavior** in `module.ts`: **`using`**, **`foreign`**, **`let`** handled; unknown statement types log `"Unrecognized statement"` and are skipped (`console.warn`). Verification hooks into **`letdec`** via `VerificationServiceV2`.

Related: [[module-system-exploration]], [[opaque-types]], [[nominal-identity]].

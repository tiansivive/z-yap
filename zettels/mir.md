---
tags:
  - mir
  - ir
  - representation
  - compiler
  - codegen
  - backend
  - implemented
  - reference
  - continuation
  - ffi
---
# MIR

MIR is Yap's sequential operational intermediate representation — the block-structured SSA form that code generation consumes. Defined in `src/lowering/mir.ts`.

**Structure.** Functions are lifted to top level with explicit `[env, x]` parameters. Bodies are basic blocks in SSA form with `Jump` / `Branch` / `Return` terminators, `Alloc` / `Read` / `Update` for heap cells, and `Call` distinguishing direct (known function) from indirect (closure / function pointer) dispatch. Block statements are `Let` instruction sequences. Continuations materialize as a state machine (entry / s_init / resume / reset_exit blocks); FFI appears as `External` / `Call` once saturated.

**Type erasure.** MIR drops the dependent type information carried by EB.Term; it is an untyped operational form. [[pi-types]] are not preserved.

**Production.** MIR is emitted from the enriched GRAM graph by `GRAM.Bridge.emit` (see [[gram-to-mir-bridge]]) — the canonical producer for the explorer, REPL, and file-compile pipelines. The direct `lowerToMir` route ([[mir-lowering]]) emitted the same IR and is deprecated.

**Consumption.** The JS, C, and Erlang backends under `src/Codegen/v2/` emit target code from MIR; the explorer renders its CFG.

<!-- connections:start -->
<!-- connections:end -->

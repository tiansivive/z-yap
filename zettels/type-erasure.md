---
tags:
- lowering
- mir
- codegen
- type-system
- elaboration
- ast
- ir
- compiler
- dependent
- verification
- normalization
- incomplete
- runtime
---
# Type Erasure

**Lowering-side stripping:** Before generic row/proj/inj handling, `lower()` dispatches pure type-level EB shapes (`Patterns.Row`, `Patterns.TypeLevelApp`, matching `Proj`/`Inj` heads) to `Leaf.erase()` (`src/lowering/lower.ts`). `erase` allocates an empty runtime record placeholder (`Instr.Alloc` with no fields) — see `src/lowering/leaf.ts`.

That is partial mechanical removal of type-only syntax at the MIR boundary, not a standalone compiler phase named “erasure.”

**Remaining typing artefacts:** Elaborated modules still carry rich types for verification (`src/elaboration/module.ts` `letdec` path runs `Verification.check`). Legacy JS codegen emits only handled `EB.Term` constructors (`src/Codegen/terms.ts`), which implicitly ignores typing annotations not translated — distinct from a principled erase-to-runtime ABI.

A full erasure story—systematically stripping `∀`, proof terms, and refinement witnesses across every backend—remains open (`incomplete`): lowering-side `Leaf.erase()` and codegen’s constructor subset are partial steps toward that goal.

<!-- connections:start -->

## Connections

**Outgoing**
- ERASES → [[pi-types]] — Removes type information
- ADDRESSES → [[ffi]] — Dummy type args
- ENABLES → [[js-codegen]] — Cleaner codegen
- INCLUDED_IN → [[usage-semantics.thread]] — QTT drives principled erasure
- INCLUDED_IN → [[gram-evolution.thread]] — GRAM bridge handles interim erasure

**Incoming**
- [[ffi]] ← LACKS — Needs dummy type args
- [[global-pending-queue]] ← INCLUDES
- [[bridge-type-erasure]] ← ADDRESSES — Interim erasure until QTT
- [[pipeline-stabilization.thread]] ← INCLUDES — Backlog: type-only let erasure

<!-- connections:end -->

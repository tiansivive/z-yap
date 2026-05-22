---
tags:
- lowering
- implemented
- mir
- compiler
- codegen
- backend
- ir
- elaboration
- reference
- continuation
- ffi
- testing
---

# MIR lowering (hub)

**Entry:** `lowerToMir` in `src/lowering/lower.ts` returns `MIR.Module`; re-exported via `src/lowering/index.ts`. Driver layout and pass responsibilities are documented in the `lower.ts` header comment and submodules below.

**Dispatch modules:** `leaf.ts`, `struct.ts`, `block.ts`, `functions/` (lambda closure conversion, app, materialize), `continuations/` (reset, shift, k-call), `matching/` (Maranget-style decision trees for `Match`). Driver: worklist + `monad.ts` RWSE (`lower.ts` header comment lists layout).

**Outputs:** Block-SSA MIR (`mir.ts`) with `Jump` / `Branch` / `Return`, `Alloc`/`Read`/`Update`, `Call` direct vs indirect. **Backends:** JS, C, Erlang emitters under `Codegen/v2/`; `src/cli/explore/pipeline.ts` runs `lowerToMir` then codegen.

**Coexistence:** GRAM translate + passes run in parallel in the same CLI for inspection; MIR remains the path to executable codegen today.

**Related zettels:** `gram.md`, `closure-conversion.md`, `pattern-matching-compilation.md`, `shift-reset` / kontinuation notes under `src/lowering/continuations/`.

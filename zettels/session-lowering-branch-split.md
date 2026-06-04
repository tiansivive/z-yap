---
tags:
  [
    mir,
    lowering,
    compiler,
    infrastructure,
    reference,
    migration,
    tooling,
    project,
    testing,
    codegen,
    ffi,
    continuation,
    backend,
    elaboration,
    parser,
    milestone,
    drift,
    incomplete,
    code,
    pattern,
    decision,
  ]
---
# Session: Lowering Branch Split from lowering-mir-v1

Historical note: describes a past effort to isolate MIR lowering from an abandoned tree-sitter/CST elaboration experiment. Exact branch names, session IDs, and test counts from the original note are **not** re-verified here.

Verified in the current tree:

- `src/lowering/` — worklist monad (`src/lowering/monad.ts`), `lower.ts` dispatch, `continuations/` (`reset.ts`, `shift.ts`, `kcall.ts`), `matching/`, `functions/` (closures, `materialize`), shared helpers.
- Shift/reset lowering spec lives with `src/lowering/continuations/` (`reset.ts`, `shift.ts`, `kcall.ts`) and elaboration counterparts in `src/elaboration/inference/{shift,reset}.ts`.
- `src/elaboration/normalization/arity.ts` — used for lowering / FFI arity.
- Tests under `src/lowering/__tests__/` (lower + interpret + pretty).

Inference for shift/reset lives under `src/elaboration/inference/{shift,reset}.ts` (not under legacy `checking.v2/` / `inference.v2/` directory names from the dropped CST migration experiment).

Use `git log` / issue links if you need the original branch lineage.

<!-- connections:start -->

## Connections

**Outgoing**
- ADDRESSES → [[closures]] — Closure conversion and shared bundle primitive
- ADDRESSES → [[elaboration]] — FFI arity computation piped from elaboration to lowering

**Incoming**
- [[delimited-continuations.thread]] ← INCLUDES

<!-- connections:end -->

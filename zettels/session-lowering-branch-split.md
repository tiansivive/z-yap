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
- `docs/MIR-LOWERING.md` — shift/reset state-machine spec.
- `src/elaboration/normalization/arity.ts` — used for lowering / FFI arity.
- Tests under `src/lowering/__tests__/` (lower + interpret + pretty).

Not present (matches the “dropped migration” story): no `src/elaboration/checking.v2/` or `src/elaboration/inference.v2/` directory; inference code for shift/reset lives under `src/elaboration/inference/{shift,reset}.ts`.

Use `git log` / issue links if you need the original branch lineage.

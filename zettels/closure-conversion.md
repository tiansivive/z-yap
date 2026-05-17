---
tags:
  [
    lowering,
    mechanism,
    implemented,
    mir,
    compiler,
    codegen,
    closure,
    runtime,
    ir,
    elaboration,
    dependent,
    reference,
  ]
---

# Closure conversion

**MIR (`src/lowering/`):** `Functions.Lambda.lower` lifts each `EB.Term` lambda to a fresh MIR function whose parameters are `[env, formal]`; free variables are gathered by `shared/freevars.ts`, read out of an env record via `Instr.Read`, and packaged by `Closure.convert` / `bundle` in `functions/closures.ts` as `{ __fn: FuncRef, __env: record }` allocations (`docs/MIR-LOWERING.md` §3.6–3.7, §5).

**GRAM (`src/GRAM/passes/closure.ts`):** closure enrichment is split: variable-length capture wiring uses imperative graph traversal (`capture`), because aggregate matching is outside single GRS rules; `closeRule` in the same file adds `:CLOSURE` nodes linked via `:BODY` / `:ENV`. Documented limitation and LoGRAM pointer: `src/GRAM/grs/README.md`.

Downstream backends consume MIR closure triples (`Codegen/v2/` paths used from `src/cli/explore/pipeline.ts`). GRAM closure metadata is orthogonal to MIR emission unless a bridge pass consumes both.

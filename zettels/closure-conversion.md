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

**MIR (`src/lowering/`):** `Functions.Lambda.lower` lifts each `EB.Term` lambda to a fresh MIR function whose parameters are `[env, formal]`; free variables are gathered by `shared/freevars.ts`, read out of an env record via `Instr.Read`, and packaged by `Closure.convert` / `bundle` in `functions/closures.ts` as `{ __fn: FuncRef, __env: record }` allocations.

**GRAM (`src/GRAM/passes/closure.ts`):** closure enrichment is split: variable-length capture wiring uses imperative graph traversal (`capture`), because aggregate matching is outside single GRS rules; `closeRule` in the same file adds `:CLOSURE` nodes linked via `:BODY` / `:ENV`. Documented limitation and LoGRAM pointer: `src/GRAM/grs/README.md`.

Downstream backends consume MIR closure triples (`Codegen/v2/` paths used from `src/cli/explore/pipeline.ts`). GRAM closure metadata is orthogonal to MIR emission unless a bridge pass consumes both.

<!-- connections:start -->

## Connections

**Outgoing**
- CONTRASTS_WITH → [[defunctionalization]] — Different lowering strategies
- CONTRASTS_WITH → [[native-lambda-hvm]] — Different targets
- TRANSLATES_TO → [[mir-lowering]] — Env + function pointer
- ERASES → [[lambda]] — Flattens lexical scope
- TRANSLATES_TO → [[mir-lowering]] — Environment + function pointer
- ERASES → [[lambda]] — Flattens lexical scope to heap allocation
- CONSUMES → [[closures]] — Lifts closures to MIR functions
- CONSUMES → [[standard-closure]] — Standard closures become MIR env+fn pairs
- RELIES_ON → [[lambda]] — Only lambda closures survive to lowering

**Incoming**
- [[native-lambda-hvm]] ← REJECTS — HVM needs raw λ
- [[compilation-by-selection]] ← ADDRESSES — Backend-specific (C yes, JS no)
- [[gram-pattern-translation]] ← COMPOSES_WITH — pat:binder pushes onto binder stack
- [[gram-to-mir-bridge]] ← RELIES_ON — Needs env/fn nodes
- [[gram-interpreter]] ← ENABLES — Tests closure semantics
- [[dpo-vs-imperative-passes]] ← APPLIES_TO — Capture is aggregate
- [[lambda-lifting]] ← COMPOSES_WITH — Builds on identified captures
- [[lambda-lifting]] ← FOLLOWS — Strictly further in pipeline
- [[bridge-closure-capture]] ← RELIES_ON — Shared bundle ABI convention
- [[gram-pap-pass]] ← COMPOSES_WITH — May emit closure structure or compose with closure pass

<!-- connections:end -->

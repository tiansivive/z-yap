---
tags:
  - hub
  - reference
  - frozen
---
# Yap baseline (pre-z-yap)

Static snapshot of Yap's state before z-yap tracking began. Not updated through the normal flow — this is the locked reference for "what already existed when work moved into z-yap." Forward-going work lives in threads and is summarised in [[pulse]].

Tagged `frozen` to signal intentional non-maintenance. If a section here becomes inaccurate because the baseline drifted, the right move is to record the drift in a new zettel and link it, not to edit this file in place.

## Surface language

> **TODO** — surface syntax baseline: what features existed (lambdas, structs, rows, schemas, variants, blocks, match, modal annotations, etc.). Link to existing zettels and `src/parser/` paths.

Source: [`src/parser/`](https://github.com/<org>/yap/tree/main/src/parser)

Related zettels: [[ast-pipeline]], [[blocks]], [[block-expressions]] …

## Elaboration (V1)

> **TODO** — Elaboration V1 pipeline shape at baseline: bidirectional inference, constraint generation, unification.

Source: [`src/elaboration/`](https://github.com/<org>/yap/tree/main/src/elaboration)

Related zettels: [[bidirectional-checking-decision]], [[v1-elaboration-pipeline]] …

## Normalization (NbE)

> **TODO** — NbE baseline: evaluator + readback, closures, semantic domain.

Source: [`src/elaboration/normalization/`](https://github.com/<org>/yap/tree/main/src/elaboration/normalization)

## Lowering / MIR

> **TODO** — MIR shape, lowering passes, primitives.

Source: [`src/lowering/`](https://github.com/<org>/yap/tree/main/src/lowering)

## Verification (pre-IVL)

> **TODO** — pre-IVL verification baseline: direct Z3 `Expr` generation, VC IR shape.

Source: [`src/verification/`](https://github.com/<org>/yap/tree/main/src/verification) (post-[[z3-replacement.adr]] the path is now via IVL)

## Tooling

> **TODO** — REPL, explorer, CLI, scripts baseline.

Source: [`src/cli/`](https://github.com/<org>/yap/tree/main/src/cli)

## Conventions

> **TODO** — path aliases, V2 monad migration baseline, testing patterns.

See `AGENTS.md`, `.cursor/rules/` for live conventions; this section snapshots what existed when tracking began.

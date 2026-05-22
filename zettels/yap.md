---
tags:
- project
- language
- dependent
- row-types
- elaboration
- normalization
- verification
- lowering
- mir
- parser
- inference
- implemented
- ffi
- continuation
- testing
---
# Yap (language hub)

Dependently typed research language: **structural** data (rows for records, tuples, variants, arrays), **bidirectional** elaboration, **NbE**-style definitional equality, **refinement** types with SMT checking, **multiplicity** annotations (`Zero`/`One`/`Many` in `src/shared/modalities/multiplicity.ts`), **delimited continuations** (shift/reset) in lowering (`src/lowering/continuations/`).

**Pipeline (source-grounded):** parse (Nearley `src/parser/grammar.ne`; tree-sitter migration in `tree-sitter-yap` per `AGENTS.md`) → elaborate (`src/elaboration/`, inference in `src/elaboration/inference/`, checking in `src/elaboration/check.ts`) → normalize → verify on demand (`src/verification/V2/`, Z3 via `z3-solver` after `scripts/cli.ts` init) → lower to MIR (`src/lowering/`, `docs/MIR-LOWERING.md`) → backends (e.g. JS emission paths under lowering/cli).

**Wiki-style entry points:** [[structural-typing.md]], [[row-polymorphism.md]], [[dependent-types.md]], [[nbe.md]], [[mir-lowering.md]], [[verification-pipeline.md]], [[shift-reset.md]], [[modalities.md]], [[refinement-types.md]].

**Status:** `implemented` (compiler + tests exist); parser migration (tree-sitter) and verification backends continue to evolve.

---
tags:
- dependent
- row-types
- type-system
- elaboration
- incomplete
- specification
- ast
- inference
- normalization
- compiler
- reference
- problem
- language
---
# Missing spec: Sigma (dependent records)

Sigma appears as first-class syntax:

- `EB.Binding` variant `{ type: "Sigma"; variable; annotation }` (`src/elaboration/syntax/term.ts`).
- NF binder `{ type: "Sigma"; variable; annotation }` plus constructors (`src/elaboration/normalization/syntax/term.ts`).
- Verification handles struct-vs-sigma checking (`src/verification/V2/check.ts` table in `src/verification/ARCHITECTURE.md`).
- Context `sigma` maps bind dependent field labels (`src/elaboration/shared/context.ts`); row helpers such as `collectSigmaBindings` live in `src/verification/V2/utils/context.ts`.

There is no standalone calculus write-up checked into `z-yap/zettels/` that lists formation / introduction / elimination / η rules tying telescopic dependency to row operations—that gap is documentary, not a claim that code paths are absent.

Related implementation-oriented notes in-graph: `z-yap/zettels/sigma-bindings.md`, `z-yap/zettels/sigma-types.md`.

---
tags:
- dependent
- row-types
- type-system
- elaboration
- incomplete
- needs-design
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
- Verification handles struct-vs-sigma checking in `src/verification/V2/check.ts`.
- Context `sigma` maps bind dependent field labels (`src/elaboration/shared/context.ts`); row helpers such as `collectSigmaBindings` live in `src/verification/V2/utils/context.ts`.

Formation / introduction / elimination / η rules tying telescopic dependency to row operations are exercised in code; a standalone calculus write-up in this vault would consolidate them. Related notes: [[sigma-bindings]], [[sigma-types]].

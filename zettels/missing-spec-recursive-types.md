---
tags:
- recursion
- type-system
- elaboration
- normalization
- incomplete
- needs-design
- problem
- specification
- ast
- inference
- dependent
- compiler
- testing
- reference
- drift
- language
---
# Missing spec: recursive (`μ`) types

Implementation hooks:

- Source binders include `{ type: "Mu"; variable; source }` on `EB.Binding` (`src/elaboration/syntax/term.ts`).
- NF binders `{ type: "Mu"; variable; annotation; source }` (`src/elaboration/normalization/syntax/term.ts`).
- Context helper `muContext` rewrites env binders from `Let` to `Mu` (`src/elaboration/shared/context.ts`); used from `src/elaboration/check.ts` (when comparing to `NF.Type`) and row/variant inference (`src/elaboration/inference/rows.ts`, `src/elaboration/inference/variants.ts`).
- `EB.unfoldMu` seeds env with mu annotation as value (`src/elaboration/shared/context.ts`).

Calculus-level typing/unfold rules are not written up inside this repo’s zettel layer beyond scattered comments; engineering behavior is exercised via tests/examples rather than a formal spec artifact here.

Termination of recursive definitions is not checked as a theorem—evaluation uses a step budget (`evaluate` default `maxSteps = 10000000` in `src/elaboration/normalization/evaluation.v2.ts`). User-facing prose in `examples/README.md` mentions equi-recursive behavior and limits; compare numbers to `evaluation.v2.ts` when citing limits.

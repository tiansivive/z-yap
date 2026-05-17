---
tags:
- recursion
- verification
- normalization
- speculative
- dependent
- compiler
- runtime
- evaluation
- performance
- problem
- language
- testing
- reference
---
# Termination checking

There is no termination or guardedness checker that proves recursive definitions strongly normalize.

Operational guardrails are numeric: stack-machine evaluation `evaluate` in `src/elaboration/normalization/evaluation.v2.ts` defaults to `maxSteps = 10000000` and throws when exceeded.

`examples/README.md` discusses equi-recursive / recursive-example ergonomics and mentions future inductive support; it is prose, not an executable checker.

Refinement verification (`src/verification/V2/`) reasons about predicates via Z3; it does not discharge termination obligations for recursive binders.

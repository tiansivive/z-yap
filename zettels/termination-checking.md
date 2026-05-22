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

Termination and guardedness checking for recursive definitions are exploratory design threads ([[productivity-checking]], [[sized-types]], [[syntactic-guardedness]]). Today, adjacent machinery covers operational limits and logical predicates:

Operational guardrails are numeric: stack-machine evaluation `evaluate` in `src/elaboration/normalization/evaluation.v2.ts` defaults to `maxSteps = 10000000` and throws when exceeded.

Refinement verification (`src/verification/V2/`) reasons about liquid predicates via Z3—orthogonal to termination obligations for recursive binders.

Related: [[productivity-checking]], [[sized-types]], [[syntactic-guardedness]], [[inductive-types]], [[equirecursive-types]].

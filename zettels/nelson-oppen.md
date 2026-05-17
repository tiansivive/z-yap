---
tags:
- verification
- sat
- backend
- research
- paper
- reference
- principle
- arithmetic
- quantifiers
- implemented
- solver
---
# Nelson & Oppen — cooperating decision procedures (1979)

**Citation:** Greg Nelson, Derek C. Oppen. *Simplification by Cooperating Decision Procedures.* ACM Transactions on Programming Languages and Systems 1(2), October 1979, pp. 245–257.  
**DOI:** [10.1145/357073.357079](https://doi.org/10.1145/357073.357079)

Combine decision procedures for disjoint quantifier-free theories by propagating equalities on shared variables (under the paper’s completeness conditions).

**Yap:** The compiler does not implement Nelson–Oppen. Refinement checking builds formulas in `src/verification/V2/` and hands them to **Z3** through `z3-solver` (`translate.ts`, `scripts/cli.ts` initializes the context). Industrial SMT solvers realize this combination idea internally; understanding it explains why mixed EUF, arithmetic, arrays, etc. can live in one query Yap emits.

**Status:** `implemented` (as “what the backend does”), not reimplemented in Yap source.

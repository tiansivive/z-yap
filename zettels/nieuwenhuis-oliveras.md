---
tags:
- verification
- sat
- backend
- research
- paper
- reference
- principle
- quantifiers
- arithmetic
- implemented
- solver
---
# Nieuwenhuis, Oliveras & Tinelli — Abstract DPLL → DPLL(T) (2006)

**Citation:** Robert Nieuwenhuis, Albert Oliveras, Cesare Tinelli. *Solving SAT and SAT Modulo Theories: From an Abstract Davis–Putnam–Logemann–Loveland Procedure to DPLL(T).* Journal of the ACM 53(6), November 2006, pp. 937–977.  
**DOI:** [10.1145/1217856.1217859](https://doi.org/10.1145/1217856.1217859)

Rule-based Abstract DPLL with clause learning/backjumping; extension to DPLL(X)/DPLL(T) parametrizes propositional engine **X** with theory solver **T**, modeling propagation, conflicts, and lazy theory integration.

**Yap:** `VerificationServiceV2` produces obligations as **IVL** formulas; `src/verification/solver/` implements Abstract DPLL → CDCL(T) directly: `cdcl/core.ts` (clause learning, backjumping), `theories/theory.ts` (plugin interface), EUF and arithmetic plugins, and `quantifiers/` for lazy theory lemmas. Useful when reading [[solver-trace]] output, explaining Boolean propagation vs. theory conflicts, or comparing this architecture to industrial Z3/cvc5 (see [[de-moura-bjorner-z3]], [[barbosa-cvc5]]).

**Status:** `implemented` — CDCL(T) orchestration is in-tree; see [[cdcl-t-solver]] and [[m2-implementation]].

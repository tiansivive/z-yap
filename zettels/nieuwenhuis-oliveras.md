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

**Yap:** Same boundary as Nelson–Oppen: Yap’s verification stack (`VerificationServiceV2` wiring in `docs/SMT-SOLVER.md`) produces obligations translated to Z3 `Expr`; CDCL(T) orchestration lives inside Z3. Useful when reading solver logs, explaining propagation vs. theory conflicts, or comparing `docs/SMT-SOLVER.md`’s planned VC-IR backend to today’s direct `translate.ts` construction.

**Status:** `implemented` (solver-side behavior backing Yap’s queries).

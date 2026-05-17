---
tags:
- verification
- strings
- sat
- research
- paper
- reference
- rewriting
- backend
- incomplete
- performance
- migration
---
# Reynolds et al. — scaling DPLL(T) string solvers (CAV 2017)

**Citation:** Andrew Reynolds, Maverick Woo, Clark Barrett, David Brumley, Tianyi Liang, Cesare Tinelli. *Scaling Up DPLL(T) String Solvers Using Context-Dependent Simplification.* CAV 2017, LNCS 10427, pp. 453–474.  
**DOI:** [10.1007/978-3-319-63390-9_24](https://doi.org/10.1007/978-3-319-63390-9_24)

Context-dependent rewrites on string constraints using partial assignments from the SAT engine before expensive case splits; targets operators such as `contains`, `index_of`, `replace` (CVC4 implementation; motivation from symbolic execution workloads).

**Yap:** As in `liang-strings.md`, Yap currently uses an **uninterpreted** `String` sort in `translate.ts`, not solver-native sequence/string theory rewrites. `docs/SMT-SOLVER.md` §Required theory support lists rich string ops as goals and flags row literals / full string lowering gaps. Reynolds et al. describe the **solver-internal** optimization layer Yap would benefit from once VCs use real string theories rather than EUF constants.

**Status:** `incomplete` (string side of verification not at this stack level yet).

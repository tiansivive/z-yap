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

**Yap:** As in `liang-strings.md`, refinement VCs today use an **uninterpreted** `String` sort in `src/verification/V2/logic/translate.ts`, not solver-native sequence/string theory rewrites. Rich string operators (concatenation, `contains`, length) are documented targets in [[required-theory-support]]; Reynolds et al. describe the **solver-internal** optimization layer that becomes relevant once VCs lower to real string theories rather than EUF constants.

**Status:** `incomplete` (string verification remains partial relative to industrial DPLL(T) string solvers).

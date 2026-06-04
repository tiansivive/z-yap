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

**Yap:** analogous to [[liang-strings]] — **IVL** still treats user strings as coarse / uninterpreted-style atoms in **`translate.ts`**; native sequence rewrites this paper optimizes for are **future work** once Milestone 3 lands ([[milestone-3-strings]], [[required-theory-support]]).

**Status:** `incomplete` (string verification remains partial relative to industrial DPLL(T) string solvers).

<!-- connections:start -->

## Connections

**Outgoing**
- INFORMS → [[string-theory]] — Context-dependent simplification
- INFORMS → [[milestone-3-strings]] — Context-dependent rewrites as future plugin

<!-- connections:end -->

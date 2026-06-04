---
tags:
- verification
- sat
- strings
- research
- paper
- reference
- quantifiers
- backend
- incomplete
- performance
---
# Liang et al. — DPLL(T) string + regex theory (CAV 2014)

**Citation:** Tianyi Liang, Andrew Reynolds, Cesare Tinelli, Clark Barrett, Morgan Deters. *A DPLL(T) Theory Solver for a Theory of Strings and Regular Expressions.* CAV 2014, LNCS 8559, pp. 646–662.  
**DOI:** [10.1007/978-3-319-08867-9_43](https://doi.org/10.1007/978-3-319-08867-9_43)

Native string theory for DPLL(T): concatenation, length, regex membership, integrated with CDCL-style search and theory lemmas (implemented in CVC4; paper predates current cvc5 split).

**Yap (verification):** refinement VCs compile to **IVL** in **`translate.ts`** ([[vc-ir]]); strings still behave like **uninterpreted constants** (Z3-direct era: `Z3.Sort.declare("String")` in [[smt-translation]]). Concatenation, length, prefix/suffix, and **`contains`** remain [[required-theory-support]] / Milestone 3 goals ([[milestone-3-strings]]). The paper situates where full string theory plugs into DPLL(T).

**Status:** `incomplete` (strings in verification are partial relative to full sequence-theory lowering).

<!-- connections:start -->

## Connections

**Outgoing**
- INFORMS → [[string-theory]] — DPLL(T) string solver
- INFORMS → [[milestone-3-strings]] — Target string-theory milestone

<!-- connections:end -->

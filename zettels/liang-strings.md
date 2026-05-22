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

**Yap:** Refinement VCs are built and solved through `z3-solver` (`src/verification/V2/logic/translate.ts`). String literals map to constants of a **declared uninterpreted** `String` sort (`Z3.Sort.declare("String")`), not to Z3’s sequence theory. Concatenation, length, prefix/suffix, and `contains` appear among [[required-theory-support]] goals; lowering `$concat` and related forms to solver-native strings remains work in progress. Liang et al.’s CVC4-specific integration—this paper is background for where industrial string reasoning sits inside DPLL(T) as Yap moves past EUF-style string encodings.

**Status:** `incomplete` (strings in verification are partial relative to full sequence-theory lowering).

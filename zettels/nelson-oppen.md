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

**Yap:** Refinement checking builds **IVL** formulas in `src/verification/V2/logic/translate.ts` and solves them via the in-tree **CDCL(T)** engine (`src/verification/solver/`) with theory plugins for EUF and linear arithmetic. That stack realizes Nelson–Oppen-style cooperation: the boolean engine negotiates literals; each theory propagates equalities and conflicts on shared terms. Understanding the 1979 paper explains why mixed EUF and arithmetic can appear in one VC without a monolithic decision procedure.

**Status:** `implemented` — theory combination is exercised by Yap's owned solver, not delegated to Z3.

<!-- connections:start -->

## Connections

**Outgoing**
- INFORMS → [[theory-plugin-interface]] — Cooperating procedures
- DOCUMENTS → [[euf-theory]] — Theory combination behind EUF+LIA cooperation

**Incoming**
- [[theory-plugin-interface]] ← SPECIALIZES — Cooperating decision procedures
- [[m2-implementation]] ← USES — Theory combination via shared equalities

<!-- connections:end -->

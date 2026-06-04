---
tags:
  [
    verification,
    arithmetic,
    sat,
    backend,
    mechanism,
    research,
    paper,
    reference,
    implemented,
    compiler,
    performance,
    infrastructure,
  ]
---
# Dutertre & de Moura — linear arithmetic inside DPLL(T)

[A Fast Linear-Arithmetic Solver for DPLL(T)](https://doi.org/10.1007/11817963_11). Bruno Dutertre, Leonardo de Moura. CAV 2006 (LNCS 4144).

Simplex-style theory solver engineered for CDCL(T): fixed tableau with sliding bounds for cheap backtracks, aggressive theory propagation, preprocessing that drops irrelevant columns, and a practical treatment of strict inequalities—major wins over older Simplex-in-SMT integrations.

Refinement verification lowers arithmetic-heavy predicates through Z3 (`src/verification/V2/logic/translate.ts`: primitive ops mapped from `@yap/shared/lib/primitives`). Understanding fixed-tableau/bound-update arithmetic explains why dense linear real/int constraints remain tractable inside modern Z3 loops and what VC shapes avoid gratuitous solver churn.

<!-- connections:start -->

## Connections

**Outgoing**
- INFORMS → [[arithmetic-theory]] — Fast linear arithmetic

**Incoming**
- [[m2-implementation]] ← USES — Fixed-tableau simplex directly implemented

<!-- connections:end -->

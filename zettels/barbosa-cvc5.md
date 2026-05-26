---
tags:
  [
    verification,
    sat,
    backend,
    compiler,
    tooling,
    infrastructure,
    strings,
    quantifiers,
    research,
    paper,
    reference,
    planned,
    performance,
  ]
---
# Barbosa et al. — cvc5 system overview

[cvc5: A Versatile and Industrial-Strength SMT Solver](https://doi.org/10.1007/978-3-030-99524-9_24). Haniel Barbosa, Clark Barrett, Martin Brain, Gereon Kremer, Hanna Lachnitt, Makai Mann, Abdalrhman Mohamed, Mudathir Mohamed, Aina Niemetz, Andres Nötzli, Alex Ozdemir, Mathias Preiner, Andrew Reynolds, Ying Sheng, Cesare Tinelli, Yoni Zohar. TACAS 2022 (LNCS 13243).

Architectural survey of the CVC4 successor: cooperating theory engines, APIs (C++/Python/Java), features beyond core SMT-LIB (including higher-order and SyGuS-oriented tooling), and SMT-LIB benchmarking versus CVC4 and Z3.

Yap’s **in-house CDCL(T) + IVL** track ([[verification-pipeline]], [[vc-ir]], [[cdcl-t-solver]], [[m2-implementation]]) is the same algorithmic family surveyed here; **z3-solver** stays an **optional** comparison target via **`z3.adapter.ts`**.
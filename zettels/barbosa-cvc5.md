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

Today's pipeline solves verification conditions through `z3-solver` on main (`scripts/cli.ts`, `src/elaboration/module.ts`, `src/verification/V2/logic/translate.ts`); IVL + adapters (`src/verification/solver/z3.adapter.ts`) aim at solver-neutral VC generation. Z3 and cvc5-class engines remain comparable port targets; this paper is the canonical cvc5 reference.

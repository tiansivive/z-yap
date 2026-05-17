---
tags:
  [
    verification,
    quantifiers,
    sat,
    mechanism,
    research,
    paper,
    reference,
    implemented,
    compiler,
    inference,
    backend,
  ]
---
# Ge & de Moura — complete instantiation for quantified SMT

[Complete Instantiation for Quantified Formulas in Satisfiability Modulo Theories](https://doi.org/10.1007/978-3-642-02658-4_25). Yeting Ge, Leonardo de Moura. CAV 2009 (LNCS 5643).

Identifies fragments where quantified SMT problems admit finite instantiation schemes that preserve completeness (plus model construction when satisfiable), contrasted with heuristic E-matching–only regimes; discusses hybrid strategies when decidability fails.

Yap emits quantifiers through `z3-solver` (`Z3.ForAll` handling surfaced in `src/verification/V2/pretty.ts`). This paper clarifies when instantiation can close proofs outright versus when solver heuristics dominate—useful background when crafting refinement lemmas or polymorphic axiom sketches without assuming a miracle from triggers alone.

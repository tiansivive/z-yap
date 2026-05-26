---
tags:
  [
    verification,
    sat,
    backend,
    arithmetic,
    tooling,
    infrastructure,
    research,
    paper,
    reference,
    implemented,
    compiler,
    ffi,
  ]
---
# de Moura & Bjørner — Z3 overview

[Z3: An Efficient SMT Solver](https://doi.org/10.1007/978-3-540-78800-3_24). Leonardo de Moura, Nikolaj Bjørner. TACAS 2008 (LNCS 4963).

Short systems paper introducing Z3’s architecture for combined theories (equality with uninterpreted functions, arithmetic, bit-vectors, arrays, quantifiers, etc.) aimed at software verification workloads—SAT core plus theory plugins and pragmatic integration concerns.

Industrial SMT tools (including Z3) instantiate this template. In Yap the **CLI / module driver** may still obtain a **`z3-solver`** **`Context`** (`scripts/cli.ts`, `getZ3Context` / `setZ3Context` in `src/shared/config/options.ts`) for adapter-driven checks. The **architectural analogue** in-tree is [[cdcl-t-solver]] consuming **IVL** VCs ([[vc-ir]]); **`z3.adapter.ts`** translates IVL formulas into Z3 when a Z3 oracle is wanted ([[verification-pipeline]]).

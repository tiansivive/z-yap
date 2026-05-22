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

The interactive CLI and elaboration bridge initialize a shared Z3 context via `z3-solver` (`scripts/cli.ts`, `getZ3Context` / `setZ3Context` in `src/shared/config/options.ts`). Liquid checking and VC construction lean on that runtime from `src/elaboration/module.ts` and translate refined types to solver expressions in `src/verification/V2/logic/translate.ts`. IVL and `z3.adapter.ts` support abstracting alternate backends on the ivl branch.

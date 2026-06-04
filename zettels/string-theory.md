---
tags:
  [
    verification,
    strings,
    planned,
    mechanism,
    sat,
    arithmetic,
    normalization,
    backend,
    compiler,
    reference,
    inference,
    migration,
    quantifiers,
    sugar,
    testing,
    project,
    principle,
    recursion,
  ]
---
# String theory (solver)

**Target:** dedicated string theory (not pure EUF): equality, concat, length, prefix, suffix, contains.

**Planned strategy:** flat concat normal forms; prefix/suffix decomposition on equations; arithmetic lemmas for lengths; reduce prefix/suffix/contains using concat equalities + fresh witnesses (e.g. `contains` via witnesses `u`, `v` with `s = concat(u, t, v)`).

**IVL / planned atoms:** richer **`StrConcat`**, **`StrLen`**, **`str.prefix`**, etc. are **targets** for Milestone 3 solver + translation wiring (see **`ivl/types.ts`** evolution alongside [[milestone-3-strings]]).

**Current translation gap:** string-like values remain **EUFlite / uninterpreted** in **`translate.ts`** (Z3-direct era used `Z3.Sort.declare("String")` — [[smt-translation]]); no dedicated **`theories/strings`** decision procedure yet in the Yap solver.

<!-- connections:start -->

## Connections

**Outgoing**
- IMPLEMENTS → [[theory-plugin-interface]] — Word equations
- DELEGATES_TO → [[arithmetic-theory]] — Length lemmas
- VALIDATES → [[primitive-signature]] — String primitives
- REWRITES → [[cdcl-t-solver]] — Contains/prefix/suffix → concat equalities
- INSTANTIATES → [[meta-variables]] — Fresh witnesses for decomposition
- USES → [[arithmetic-theory]] — Length coupling

**Incoming**
- [[arithmetic-theory]] ← COMPOSES_WITH — Length coupling
- [[milestone-3-strings]] ← PRODUCES — String module
- [[liang-strings]] ← INFORMS — DPLL(T) string solver
- [[reynolds-strings]] ← INFORMS — Context-dependent simplification

<!-- connections:end -->

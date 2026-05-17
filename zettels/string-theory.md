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

Specification target in `docs/SMT-SOLVER.md` §Strings and §Minimum target theory support (equality, concat, length, prefix, suffix, contains)—first solver design is a dedicated theory, not pure EUF.

Sketch types/strategy there: flat concat normal forms, prefix/suffix decomposition on equations, arithmetic lemmas for lengths, reduce prefix/suffix/contains using concat equalities + fresh witnesses (`contains` pseudocode introduces `u`, `v` with `s = concat(u, t, v)`).

VC IR atoms listed in §New VC IR include `"str.prefix" | "str.suffix" | "str.contains"` alongside `StrLen`.

Current gap documented in §Current hard constraints: uninterpreted string sort and missing `$concat` translation in `translate.ts`.

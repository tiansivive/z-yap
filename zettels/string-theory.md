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

**IVL atoms:** `StrLen`, `StrConcat`, and (when added) `str.prefix`, `str.suffix`, `str.contains` alongside boolean connectives.

**Current translation gap:** strings use an uninterpreted sort in `translate.ts` (`Sorts.String = Z3.Sort.declare("String")` on main); native string reasoning and full `$concat` lowering are not wired in the in-house stack yet.

---
tags:
  [
    speculative,
    elaboration,
    inference,
    syntax,
    pattern,
    dependent,
    modality,
    effect,
    problem,
    ast,
    migration,
    language,
    verification,
    principle,
  ]
---

# Functional patterns

**Functional patterns** (elimination/view-style computation before binding in a match clause, à la Haskell view patterns) would mix arbitrary expression scheduling with pattern exhaustiveness and coverage. Today **`match`** elaborates static pattern shapes under `EB.Match.infer` (`src/elaboration/elaborate.ts`); patterns are parsed `Src.Pattern` trees (`src/parser/terms.ts`, `processors.ts`), not user-defined arbitrary eliminates applied inside the clause head.

No elaboration path evaluates general expressions inside patterns in that sense. Adding it would intersect **metavariable solving**, **effect/modality** semantics, and decidability of exhaustiveness — all unspecified here.

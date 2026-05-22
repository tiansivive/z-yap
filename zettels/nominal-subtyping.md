---
tags:
  [
    type-system,
    concept,
    principle,
    verification,
    elaboration,
    reference,
    row-types,
    dependent,
    sat,
    decision,
    problem,
    rejected,
  ]
---
# Nominal subtyping (contrast)

**Nominal subtyping:** compatibility by declared hierarchy (`extends` / `implements` on **named** types); unrelated names ⇒ unrelated types even if structure matches.

**Yap:** elaboration/unification treats types structurally (rows, Π, variants, etc.) — compatibility is shape-driven unification, not declared `extends` / `implements` edges between named classes.

**Refinement / verification:** `src/verification/V2/subtype.ts` implements **structural** subtyping obligations for Liquid/refinement checking (row containment, Π argument/conclusion variance, rigid-variable equality, etc.) — still not nominal declaration edges.

This zettel is contrast/reference: Java-style nominal subtyping vs Yap’s structural elaboration plus `src/verification/V2/subtype.ts` for refinement obligations.

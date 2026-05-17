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

**Yap:** elaboration/unification treats types structurally (rows, Π, etc.); no Java-style nominal class hierarchy in the elaboration layer.

**Refinement / verification:** `src/verification/V2/subtype.ts` implements **structural** subtyping obligations for Liquid/refinement checking (row containment, Π argument/conclusion variance, rigid-variable equality, etc.) — still not nominal declaration edges.

This zettel is contrast/reference: nominal subtyping-as-in-Java is **not** the model; structural rules (including verification subtyping) are.

---
tags:
  - bug
  - planned
  - elaboration
  - recursion
  - normalization
  - lowering
  - graph
---

# length recursive de Bruijn index bug

Inside the `Cons` branch of a match expression, the recursive call to `length` resolves as de Bruijn index I6 (i.e. bound variable at depth 6), when it should be a free variable reference. This produces an invalid GRAM node with no `:refers_to` edge, which cascades to `unknown` in MIR and codegen.

The context extension for recursive binders inside match alternatives is the likely culprit: match branches extend the context with their own pattern binders, shifting the de Bruijn depth, but the recursive function's own binding may not be correctly accounted for during this extension. The recursive binder sits at one depth, match alternatives add their own pattern variables, and the lookup for the recursive name hits the wrong index.

**Discovered via:** integration pipeline test snapshot audit (`language-tour.test.ts.snap`, test: "recursive list length" → `length`). The elaborated term shows `I6` in the recursive call position; GRAM shows `var:bound` with no `:refers_to`; MIR/codegen emit `unknown`.

**Related pattern:** This is a general fragility of context extension for recursive binders under match (and likely any scope-introducing form). Other recursive functions that work may avoid this by having fewer pattern binders or simpler match structures.

---
tags:
  - bugfix
  - implemented
  - lowering
  - graph
  - pattern
  - compiler
  - row-types
  - mir
---

# Pattern row binder fix

`walkPatternRow` in `src/GRAM/translate.ts` didn't push a binder for row variable tails in struct patterns. When a pattern like `{ x: a | $row }` was translated, the row variable rest produced no binder entry, causing de Bruijn index misalignment between the pattern and its body. The body's bound variable references shifted by one, producing an undeclared MIR variable (`v7`).

**Fix:** The `variable` case in `walkPatternRow` now emits a `PAT_WILDCARD` node and pushes it onto the binder stack, maintaining index alignment with elaboration's representation.

**File:** `src/GRAM/translate.ts`.

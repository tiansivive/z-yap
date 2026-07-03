---
tags:
  - bug
  - deferred
  - upstream
  - elaboration
  - checking
  - type-system
  - row-types
  - dependent
  - label
  - sigma
refs:
  - thread:row-types
  - thread:pipeline-stabilization
  - code:tiansivive/yap#9
---

# Checking-path label scope loss

A struct annotated with a record type whose field references a sibling label — `let r: {…} = { …, area: :width }` — fails to resolve the label; the same struct written without the annotation resolves and lowers correctly.

The divergence is the elaboration path. Standalone inference of a struct establishes a context in which each field's label is in scope for the other fields. The infer-then-check path taken when a struct is checked against a `Sigma` type — the `[struct, Sigma]` case in `check.ts` — does not set up that sibling-label context, so a `:label` reference in a field resolves against an empty label context and is reported unbound.

The record layer is where labels become mutually visible; a checking path that skips it loses the visibility that inference grants. The fix is upstream of GRAM: the annotated path must establish the same label context inference does before descending into the fields.

<!-- connections:start -->

## Connections

**Incoming**
- [[gram-label-resolution-pass]] ← REVEALS — Annotated struct label scope loss surfaced during the label work
- [[row-types.thread]] ← INCLUDES — Sigma-checking path drops sibling-label context
- [[pipeline-stabilization.thread]] ← INCLUDES — Blocks the tour's self-referencing-fields case end to end

<!-- connections:end -->

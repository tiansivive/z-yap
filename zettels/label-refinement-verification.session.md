---
tags:
  - ai-session
  - verification
  - elaboration
  - row-types
  - dependent
  - refinement
  - label
  - sigma
  - checking
  - bugfix
refs:
  - session:90e6b57a-b91c-4517-82bb-50d77caa882f
  - branch:label-fixes
  - code:tiansivive/yap#14
---
# Session: label fixes — self-referencing struct checking and refinement label translation

Fixed two related `:label` defects across the pipeline (PR #14). In elaboration, a struct with a self-referencing computed field (`{ width, height, area: :width * :height }`) annotated with a record type failed to check: record-type annotations elaborate to a `Σ`, and the `[struct, Sigma]` re-check evaluated field values in a context lacking the sibling bindings (throwing "Unbound label"), while `traverseRow`'s per-field `value ~~ meta` constraint pinned each label meta to a concrete field value that then collided with the sibling's typed use (`Cannot unify 20 with Num`). Threading the inferred value row into `ctx.sigma` for the re-check, plus constraining the label meta to the field's declared type instead of its value, resolved both. In verification, a `:label` in a refinement reached IVL translation unresolved and threw; the fix establishes the sibling-label scope at every record boundary (`withRowLabels`) and resolves a surviving label to its concrete sibling value or a logical constant of the field's sort. Two things surfaced and were reframed rather than "fixed": the `traverseRow` "three overrides" are the elaborator's uniform fresh-metas-per-judgment discipline reconciled by unification (deliberate, not redundant — forcing a single upfront pass would couple every dispatch case); and a pre-existing solver/discharge bug where a symbolic record-field refinement (`n > n`) is discharged as false-valid. A design concern was also noted: the `labels`/`sigma`/`record` trichotomy.

<!-- connections:start -->
<!-- connections:end -->

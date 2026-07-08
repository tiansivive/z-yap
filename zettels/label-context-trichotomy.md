---
tags:
  - concern
  - tech-debt
  - elaboration
  - context
  - label
  - row-types
  - dependent
  - normalization
  - evaluation
  - needs-design
---
# Label context is split across three overlapping maps

A `:label` field reference carries its meaning through three separate maps on the elaboration context, each read at a different point:

- `ctx.labels` — label → **type**, read by variable lookup during elaboration (so `:x` elaborates with a type).
- `ctx.sigma` — label → **value**, read by the NbE evaluator to resolve `:x` during normalization.
- `ctx.record` — label → term/value, a narrow mechanism populated only while a row value is evaluated, read by the evaluator as a fallback after `sigma`.

The three overlap in purpose — all answer "what does this field reference resolve to" — but diverge in what they hold and when they are consulted, and the standalone `extendRecord` helper has no callers. Reasoning about *where* a label resolves means tracking which map is live at that phase, which is a recurring source of confusion (both the elaboration and verification label fixes had to reason across all three). Consolidating them, or making each map's distinct role explicit, would remove that friction. The split is worth a dedicated review rather than an incidental change.

<!-- connections:start -->
<!-- connections:end -->

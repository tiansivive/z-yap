---
tags:
- rewriting
- decision
- graph
- compiler
- pattern
- mechanism
- ir
- concept
---

# DPO vs imperative passes

Not all GRAM passes can use the DPO rule engine (`src/GRAM/grs/`). The distinction is local vs aggregate:

**DPO-suitable (local pattern, fixed arity):**
- **Eta contraction** -- single rule, fixed LHS/RHS shape
- **Closure wiring** (`closeRule`) -- adds `:closure` wrapper, fixed shape
- **Future decision tree optimizations** -- trivial switch elimination (switch with one branch -> leaf), redundant test merging (two switches on same scrutinee -> combine), dead branch removal

**Imperative/aggregate (needs whole-structure reasoning):**
- **Saturation** -- accumulates variable-length argument chains (uses `Strategy.derive` for computed rules + imperative `chainArgs` helper)
- **Shift-reset enrichment** -- traces from reset to find shifts, follows k-calls through var:bound -> refers_to -> lambda. Requires scope analysis.
- **Closure capture** -- collects variable-length set of captured variables per lambda. Aggregate by nature.
- **Pattern decision tree** -- Maranget algorithm needs the entire clause matrix simultaneously. Column heuristics, matrix specialization, recursive compilation. Cannot be one DPO rule.

**Design principle:** Use DPO when a pass is genuinely local (fixed-size LHS, fixed-size RHS). Use imperative traversals for aggregate analysis. Post-aggregate local optimizations are good DPO candidates -- the compilation pass produces the structure, DPO rules refine it.

<!-- connections:start -->

## Connections

**Outgoing**
- CONSTRAINS → [[dpo-rewriting]] — Defines when DPO applies
- CONSTRAINS → [[gram]] — Pass implementation guide
- APPLIES_TO → [[gram-pattern-pass]] — Pattern pass is imperative/aggregate
- APPLIES_TO → [[gram-shift-reset-pass]] — Shift-reset pass is imperative/aggregate
- APPLIES_TO → [[closure-conversion]] — Capture is aggregate
- ENABLES → [[gram-pattern-pass]] — Downstream optimizations on decision tree are DPO

**Incoming**
- [[gram-evolution.thread]] ← RELIES_ON — Pass classification decision

<!-- connections:end -->

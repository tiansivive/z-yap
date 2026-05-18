---
tags:
- decision
- lowering
- compiler
- graph
- ir
- modality
- mutation
- data-access
- memory
- needs-design
---

# CRUD strategy choice

**Decision:** Phased approach. Start with mode annotation (Option A), defer reuse analysis (B) and constructor contexts (C). Each phase is an independent GRAM enrichment layer — they compose additively.

**Options considered:**

1. **Mode annotation** [[mode-annotation-strategy]] — Annotate `inj` with `shared`/`exclusive` from multiplicity. Simplest, leverages existing `modal` nodes. Phase A.

2. **Reuse analysis** [[reuse-analysis-strategy]] — Identify same-shape destruct/construct pairs across match branches. Emit `:reuse` edges. Lean-inspired (reset/reuse). Phase B, after mode annotation proves the architecture.

3. **Constructor contexts** [[constructor-context-strategy]] — Koka-inspired hole nodes for top-down recursive construction. Enables tail-call-modulo-cons. Most complex, likely post-LoGRAM. Phase C.

**Rationale for phasing:**
- A is minimal and works with conservative defaults (no dependency on complete multiplicity enforcement).
- B requires shape analysis but is orthogonal to A — both compose.
- C is the most speculative and benefits from better graph traversal (LoGRAM substrate).

**Contrast with pattern-algorithm-choice:** Same structural decision pattern — pick the pragmatic option, defer alternatives. But here the alternatives *compose* (vs. mutually exclusive algorithms in pattern matching). All three could eventually coexist in the graph.

**Multiplicity gap:** The elaborator doesn't enforce usage constraints end-to-end yet. Phase A works with conservative defaults; phases B and C are independent of multiplicity. Full benefit requires completing the usage-semantics thread.

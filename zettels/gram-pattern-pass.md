---
tags:
- lowering
- graph
- ir
- mechanism
- implemented
- rewriting
- pattern
- compiler
---

# Pattern decision tree pass (GRAM)

**Code:** `src/GRAM/passes/pattern.ts`. Pipeline position: after `shiftReset`, before `closure`.

Phase 2 of pattern matching in GRAM. Reads the `pat:*` graph nodes produced by translation and compiles Maranget-style decision trees:

**Output nodes:**
- **`switch`** — `{ kind: "tag" | "lit" | "struct" }` decision point. Edge `:inspect` → scrutinee being tested.
- **`leaf`** — successful match body. Edge `:body` → case body. Edges `:bind` → each `pat:binder` consumed (with `{ name }` payload).
- **`fail`** — non-exhaustive match failure (dead code if exhaustive).

**Output edges:**
- `:branch` — from switch to child (leaf or nested switch). Payload: `{ label }` for variants, `{ value }` for literals.
- `:default` — from switch to fallthrough child (wildcard/binder).
- `:decision_tree` — from the original `match` node to the root `switch`. This is the enrichment link.

The original `match`, `case`, and `pat:*` nodes are fully preserved. Both the semantic structure (what patterns exist) and the operational structure (how to dispatch) coexist in the same graph.

**Algorithm:** Column heuristic picks the column with fewest wildcards. Matrix specialization and default construction follow Maranget. Struct patterns normalize to a canonical field order with synthetic wildcards for missing fields.

<!-- connections:start -->

## Connections

**Outgoing**
- RELIES_ON → [[gram-pattern-translation]] — Reads pat:* nodes as input
- IMPLEMENTS → [[gram]] — Pipeline pass
- USES → [[maranget-paper]] — Decision tree algorithm
- PRESERVES → [[match]] — match/case/pat nodes unchanged
- INSTANTIATES → [[gram-additive-enrichment]] — :decision_tree edge exemplifies principle
- FOLLOWS → [[gram-shift-reset-pass]] — Pipeline ordering

**Incoming**
- [[pattern-matching-compilation]] ← INCLUDES — Compilation phase
- [[gram-pattern-translation]] ← ENABLES — Makes patterns graph-queryable
- [[gram]] ← INCLUDES — Pipeline pass
- [[gram-to-mir-bridge]] ← RELIES_ON — Needs decision trees
- [[gram-interpreter]] ← ENABLES — Tests decision tree semantics
- [[pattern-algorithm-choice]] ← CONSTRAINS — Algorithm for the pass
- [[stg-analogy]] ← DISTINGUISHES — Pass = Cmm-level (operational)
- [[dpo-vs-imperative-passes]] ← APPLIES_TO — Pattern pass is imperative/aggregate
- [[dpo-vs-imperative-passes]] ← ENABLES — Downstream optimizations on decision tree are DPO
- [[pattern-matching.thread]] ← INCLUDES
- [[gram-evolution.thread]] ← INCLUDES
- [[reuse-analysis-strategy]] ← RELIES_ON — Reuse sites occur at match boundaries
- [[two-tier-pattern-compilation]] ← USES — constructor tier uses existing GRAM decision tree
- [[tagged-dispatch]] ← INFORMS — prior art for pattern-match compilation to dispatch
- [[variant-discriminant-representation.adr]] ← CONSTRAINS — Variant branch selection targets __tag and arm matching targets payload
- [[typed-dispatch-equality]] ← ADDRESSES — Decision trees need typed comparison for non-tag discriminants

<!-- connections:end -->

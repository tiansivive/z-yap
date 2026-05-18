---
tags:
- lowering
- graph
- ir
- mechanism
- implemented
- rewriting
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

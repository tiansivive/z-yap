---
tags:
- mechanism
- graph
- ir
- lowering
- compiler
- performance
- memory
- reuse
- allocation
- mutation
- speculative
---

# Reuse analysis strategy (CRUD Phase B)

Lean-inspired enrichment: identify where a value is destructed and a same-shape value is constructed, enabling memory reuse without allocation.

**Pattern:** In a `match` expression, when:
1. The scrutinee is destructed (decision tree inspects its fields), and
2. A branch constructs a new value of the same shape (same tag layout, same field count),

→ Emit a `:reuse` edge from the new construction node to the destructed scrutinee. This tells backends: "you may allocate the new value in the old value's memory slot."

**GRAM representation:**
- `:reuse` edge from constructor node to the matched source.
- Payload: `{ shape: "exact" | "compatible" }` (exact = same constructor, compatible = same allocation size).
- Pure additive enrichment — the original `match`, `inj`, and pattern nodes are untouched.

**Orthogonality with mode annotation:**
- Mode annotation (Phase A) tells backends *whether* mutation is safe.
- Reuse analysis tells backends *where* allocation can be elided.
- Both compose: `exclusive` mode + `:reuse` edge = guaranteed in-place reuse. `shared` mode + `:reuse` edge = reuse if refcount allows at runtime (fallback to Lean's runtime branch).

**Requirements:**
- Shape analysis: determine if two constructors have the same memory layout.
- Scope analysis: the destructed value must not escape the branch where reuse is proposed.
- Works even without multiplicity enforcement (reuse is always *safe* when the source is dead after the branch).

**Deferred because:** Mode annotation (Phase A) proves the enrichment architecture first. Reuse analysis adds value independently but needs the graph infrastructure to be validated.

**Prior art:** Lean 4 `reset`/`reuse` (Counting Immutable Beans), Koka Perceus reuse tokens, MLton's contification for memory reuse.

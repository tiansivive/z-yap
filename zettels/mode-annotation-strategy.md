---
tags:
- mechanism
- graph
- ir
- lowering
- compiler
- modality
- multiplicity
- mutation
- data-access
- ownership
- planned
---

# Mode annotation strategy (CRUD Phase A)

The simplest CRUD enrichment: annotate `inj` nodes with an access mode derived from the multiplicity context.

**Pass logic:**
1. Walk each `inj` node in the graph.
2. Trace its `:target` edge to the source value node.
3. Determine the multiplicity of that value (from `modal` node annotations or binder context).
4. Emit `:access_mode` edge from the `inj` node to a payload: `{ mode: "shared" | "exclusive" }`.

**Mode derivation:**
- `One` → `"exclusive"` — in-place mutation is safe. Single owner.
- `Many` → `"shared"` — structural sharing. Allocate copy with updated field.
- `Zero` → irrelevant (value is erased, no update occurs).
- Unknown → `"shared"` (conservative default, always sound).

**What it doesn't do:**
- No reuse analysis (that's Phase B).
- No allocation strategy selection (that follows from mode).
- No constructor context optimization (Phase C).
- No runtime branching on refcount (Yap's static approach avoids this when multiplicity is known).

**Backend reads:**
- C: `exclusive` → mutate pointer target. `shared` → malloc + copy + update field.
- JS: ignores modes entirely (GC handles sharing, spread/Object.assign for updates).
- HVM: ignores modes (optimal reduction handles sharing natively).
- Erlang: `shared` → persistent data structure update. `exclusive` → optimization opportunity.

**Preconditions:**
- `translate.ts` already emits `modal` nodes with `{ quantity }` payload.
- `proj`/`inj` nodes already exist with `:target`/`:value` edges.
- Pass reads existing graph structure — pure additive enrichment.

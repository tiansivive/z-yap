---
tags:
- concept
- graph
- ir
- compiler
- lowering
- modality
- multiplicity
- mutation
- data-access
- ownership
- planned
- needs-design
---

# GRAM CRUD enrichment

A GRAM pass that annotates `proj` and `inj` nodes with access modes derived from multiplicity annotations in the elaborated term.

**Semantics:**
- `proj` → Read. Always safe regardless of multiplicity. No mode needed.
- `inj` → Update. Mode depends on multiplicity of the target value:
  - `exclusive` (One) — in-place mutation is safe; the value has no other references.
  - `shared` (Many/unknown) — structural sharing; allocate a new copy with the updated field.

**GRAM representation:** The pass adds an `:access_mode` edge from `inj` nodes to a payload node carrying `{ mode: "shared" | "exclusive" }`. This is pure additive enrichment — the original `inj` node retains all its semantic edges (`:target`, `:value`). Backends that don't care about modes ignore the annotation entirely.

**Source of truth:** Multiplicity is a *type-system property* from elaboration (QTT), not a runtime analysis. When the elaborator says `One`, the compiler knows at compile time that mutation is safe — no runtime refcount check needed. This is Yap's advantage over Lean/Koka which derive uniqueness at runtime.

**Conservative default:** Until modality enforcement is complete in the elaborator, the pass defaults to `"shared"` for any binding whose multiplicity is unknown or Many. This is always sound (never mutates unsafely), just misses optimization opportunities.

**Multiplicity flow:** `translate.ts` already emits `modal` nodes with `{ quantity }` payload. The CRUD pass reads these to determine mode. The gap is that multiplicity checking is not end-to-end in elaboration yet — usage constraints are commented out.

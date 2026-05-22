---
tags:
- lowering
- speculative
- rewriting
- graph
- planned
- infrastructure
- compiler
- reference
- ffi
- tooling
- project
---

# LoGRAM

**Source of name / intent:** `src/GRAM/grs/README.md` and comments in `src/GRAM/passes/closure.ts` — a **planned** Datalog (or triple-store) layer where aggregate joins are first-class, replacing purely local DPO matches for passes like variable-length capture sets.

**Current code:** DPO under `src/GRAM/grs/` is the active rewrite core; LoGRAM would add aggregate joins (e.g. variable-length capture sets) as described in `src/GRAM/grs/README.md` and `src/GRAM/passes/closure.ts`.

**Relationship to egglog:** README mentions egglog only as conceptual kin to equality-saturation-style joins—not an integrated dependency.

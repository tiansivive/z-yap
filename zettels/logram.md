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

**Current code:** No `logram` / `LoGRAM` implementation directory or module in `src/`; DPO remains the active GRS core under `src/GRAM/grs/`.

**Relationship to egglog:** README mentions egglog only as conceptual kin to equality-saturation-style joins—not an integrated dependency.

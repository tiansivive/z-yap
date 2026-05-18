---
tags:
- lowering
- mechanism
- implemented
- mir
- compiler
- ir
- elaboration
- row-types
- codegen
- backend
- dependent
- testing
- graph
---

# Pattern matching compilation (hub)

Maranget-style clause matrix compilation -- decision tree construction from pattern matrices. Implemented in two contexts: MIR (block emission) and GRAM (graph enrichment).

**MIR:** `src/lowering/matching/` -- entry `lower` / `compileSubMatrix` in `index.ts`; columns split into variant (`variant.ts`), literal (`literal.ts`), struct (`struct.ts`), binder/wildcard handling (`shared.ts`). Fail block label `e` with non-exhaustive string literal; merge blocks use parameter-carrying jumps (`j` labels). Tag and value dispatch emit `Branch` terminators (`docs/MIR-LOWERING.md` section 3.7).

**GRAM:** Two phases -- (1) `gram-pattern-translation` (translate.ts emits `pat:*` graph nodes from `EB.Pattern`) and (2) `gram-pattern-pass` (Maranget decision tree as `switch`/`leaf`/`fail` graph nodes, linked via `:decision_tree` edge). The original match structure is preserved alongside the operational tree.

**Coverage:** Variant, lit, struct, binder, wildcard. **List patterns not yet implemented.**

**Algorithm:** Column heuristic (fewest wildcards), matrix specialization per head constructor, default matrix for wildcards/binders. Same conceptual algorithm in both MIR and GRAM -- different output representations.

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
---

# Pattern matching compilation

**Code:** `src/lowering/matching/` — entry `lower` / `compileSubMatrix` in `index.ts`; columns split into variant (`variant.ts`), literal (`literal.ts`), struct (`struct.ts`), binder/wildcard handling (`shared.ts`). `lower.ts` header calls this **Maranget-style clause matrix** compilation.

**MIR shape:** Fail block label `e` with non-exhaustive string literal; merge blocks use parameter-carrying jumps (`j` labels) per `index.ts`. Tag and value dispatch emit `Branch` terminators (`docs/MIR-LOWERING.md` §3.7 Match table).

**Coverage (doc):** `docs/MIR-LOWERING.md` §5 Match table lists variant, lit, struct, binder, wildcard; **list patterns not yet implemented**.

**Not a separate backend:** Same lowering feeds `Codegen/v2/` emitters; no distinct “trampoline-specific” matcher IR in `src/lowering/matching/`.

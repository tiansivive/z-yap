---
tags:
- type-system
- in-progress
- graph
- compiler
- infrastructure
- pattern
- verification
- elaboration
- reference
- migration
- error-handling
- project
---

# Typed pass composition

**What exists:** `src/GRAM/pipeline/descriptor.ts` attaches each pass name to `requires: { tags, labels }` plus `delta` (added/removed vocabulary). `configure.ts` checks ordering consistency (`MissingTag`, `MissingLabel`, `ConsumedAfterRemoval`) and builds `Strategy.seq` over pass runs—structural vocabulary tracking, not dependent-type-checked Yap morphisms.

**Gap vs full vision:** No elaboration-phase proof that graph payloads match row-typed interfaces; predicates in GRS rules remain arbitrary TypeScript (`where` callbacks in `rule.ts`).

**Speculative layer:** Richer typed composition (dependent row contracts per pass, solver-backed admissibility) is not implemented; current machinery is the descriptor + configure validator around open string tags (`vocabulary.ts`).

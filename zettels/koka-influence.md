---
tags:
- research
- reference
- effect
- continuation
- cps
- lowering
- mir
- codegen
- principle
- runtime
- speculative
- memory
- refcounting
- reuse
---
# Koka (Influence)

[Koka](https://koka-lang.github.io/koka/doc/) — algebraic effects/handlers; compilation narratives around **selective CPS**, evidence for control effects, and **Perceus** reference counting with FBIP.

**Effect system influence:**
`z-yap/zettels/selective-cps.md` treats selective CPS as **experimental**: inspired "broadly" by languages including Koka, while MIR design **explicitly rejects global CPS** (`docs/MIR-LOWERING.md` §2.2 — shift/reset lowered to explicit blocks/jumps). Current lowering favors **direct-style MIR + closure conversion**.

**Memory management influence:**
Koka's Perceus system ([[perceus-reuse-analysis]]) introduces reuse analysis and FBIP — functional-but-in-place semantics where unique arguments enable mutation without allocation. This informs Yap's CRUD enrichment strategy ([[gram-crud-enrichment]]): Koka derives uniqueness at runtime via refcounting; Yap aims to derive it at compile time via QTT multiplicities. Constructor contexts ([[constructor-context-strategy]]) are directly inspired by Koka's FP² work.

**Contrast with Yap's approach:**
- Koka: runtime refcount → uniqueness. Yap: compile-time QTT → mode.
- Koka: `fip`/`fbip` are programmer annotations checked by the compiler. Yap: multiplicity flows automatically from the type system.
- Koka: no GC, no runtime system. Yap: backend-dependent (JS has GC; C backend could be GC-free with FBIP).

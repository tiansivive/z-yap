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
`z-yap/zettels/selective-cps.md` treats selective CPS as **experimental**: inspired "broadly" by languages including Koka, while Yap's MIR path **favors direct style over global CPS**—`Shift`/`Reset` lower to explicit blocks and jumps (`src/lowering/`), not ubiquitous continuation arguments. Current lowering uses **direct-style MIR + closure conversion**.

**Memory management influence:**
Koka's Perceus system ([[perceus-reuse-analysis]]) introduces reuse analysis and FBIP — functional-but-in-place semantics where unique arguments enable mutation without allocation. This informs Yap's CRUD enrichment strategy ([[gram-crud-enrichment]]): Koka derives uniqueness at runtime via refcounting; Yap aims to derive it at compile time via QTT multiplicities. Constructor contexts ([[constructor-context-strategy]]) are directly inspired by Koka's FP² work.

**Handler-as-value influence:**
Koka effect handlers are first-class values introduced at the use site (`with handler { ... }`) rather than registered globally. The shape — extension-by-reference rather than by ambient attribute database — informs [[pass-activation-by-reference]] for [[programmable-gram-passes]], where user-defined GRAM rules are Yap values referenced from modal annotations and tree-shaken by reachability.

**Contrast with Yap's approach:**
- Koka: runtime refcount → uniqueness. Yap: compile-time QTT → mode.
- Koka: `fip`/`fbip` are programmer annotations checked by the compiler. Yap: multiplicity flows automatically from the type system.
- Koka: no GC, no runtime system. Yap: backend-dependent (JS has GC; C backend could be GC-free with FBIP).

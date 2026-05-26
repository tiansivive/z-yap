---
tags:
  [
    research,
    reference,
    verification,
    compiler,
    codegen,
    backend,
    milestone,
    principle,
    project,
    infrastructure,
    planned,
  ]
---
# CompCert / CakeML (Influence)

[CompCert](https://compcert.org/) — optimizing C compiler verified in Coq. [CakeML](https://cakeml.org/) — ML subset with verified compilation to concrete architectures.

Both embody **refinement between semantics-aligned intermediate languages** and machine-checked pipeline proofs.

**Codebase:** Yap couples refinement checking to **SMT-style evidence**: **IVL** formulas solved primarily by **CDCL(T)** (`src/verification/`), with **`z3-solver`** available through adapters—not the same foundational-proof model as CompCert/CakeML’s Coq/HOL pipelines.

CompCert and CakeML are **external benchmarks** for what a fully machine-checked compilation chain looks like; Yap can draw design lessons without instantiating their proof artifacts today.

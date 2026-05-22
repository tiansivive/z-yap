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

**Codebase:** Yap's verification path couples type checking to **Z3-backed** refinement checking (`src/verification/`, `z3-solver` dependency)—a different evidence model from CompCert/CakeML's Coq/HOL pipeline proofs.

CompCert and CakeML are **external benchmarks** for what a fully machine-checked compilation chain looks like; Yap can draw design lessons without instantiating their proof artifacts today.

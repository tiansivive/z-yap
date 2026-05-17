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

**Codebase:** No mentions of CompCert, CakeML, or “verified compiler” in Yap sources (search over the repo). Yap today couples type checking to **Z3-backed** refinement checking (`src/verification/`, `z3-solver` dependency), not a Coq/HOL proof of the whole compiler.

Use these projects as **external benchmarks**: what a fully machine-checked compilation chain looks like, not as something Yap currently instantiates.

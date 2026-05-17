---
tags:
  [
    research,
    reference,
    mir,
    ir,
    lowering,
    codegen,
    backend,
    compiler,
    pattern,
    infrastructure,
    implemented,
  ]
---
# MLIR (Influence)

[MLIR](https://mlir.llvm.org/) — tiered IR infrastructure (dialects, shared pass tooling, SSA patterns).

**Verified in Yap:** `docs/MIR-LOWERING.md` §2.1 gives **block parameters instead of φ-nodes**, with rationale: same idiom as **MLIR, Swift SIL, Rust MIR**. The implemented IR and lowering live under `src/lowering/` (e.g. `lowerToMir` used from `src/cli/explore/pipeline.ts`).

**Not using LLVM MLIR libraries** — analogy is to **control-flow structuring**, not linking the C++ MLIR project.

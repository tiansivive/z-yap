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

**Verified in Yap:** MIR uses **block parameters instead of φ-nodes**—the same idiom as **MLIR, Swift SIL, and Rust MIR**. The implemented IR and lowering live under `src/lowering/` (e.g. `lowerToMir` used from `src/cli/explore/pipeline.ts`).

Yap does not link the LLVM MLIR C++ project; the parallel is **control-flow structuring** (SSA-style blocks with parameters), not dialect reuse.

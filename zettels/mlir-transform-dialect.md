---
tags:
  - reference
  - research
  - compiler
  - ir
  - lowering
  - rewriting
  - pattern
  - tooling
  - infrastructure
---
# MLIR Transform Dialect

MLIR's Transform dialect ([mlir.llvm.org/docs/Dialects/Transform](https://mlir.llvm.org/docs/Dialects/Transform/)) expresses IR transformations as operations in MLIR itself. A transformation script is a sequence of ops drawn from the dialect's controlled vocabulary, interpreted by a pass manager against the IR under compilation.

## Architecture features that transfer

**The transformation language is the IR's own vocabulary.** Users do not write C++ passes to extend MLIR; they write MLIR. Bootstrap kept transformation passes in C++; over time, more transformations moved into the dialect language itself through TableGen, IRDL, and self-hosted Transform scripts.

**The dialect has a controlled primitive set.** Operations like `transform.structured.tile_using_for` are typed against the operands they accept and the IR they manipulate. The pass manager interprets these; transformation scripts cannot escape into host code.

**Ordering is explicit.** Transform scripts express composition of transformations directly — sequencing, alternation, conditional application. The pass manager runs them in declared order, with structural validation at script construction time.

## Mapping to Yap

The shape directly informs [[programmable-gram-passes]]: a Yap-level rule language whose constructs reduce under NbE to a residual that the GRAM Kernel ([[gram-kernel-pass]]) interprets against the host graph, with a deliberately restricted primitive surface. The Transform dialect's bootstrap arc — C++ first, dialect-native later — parallels the proposed Yap arc of TS-implemented primitives migrating to Yap-native rules once [[logram]] lands.

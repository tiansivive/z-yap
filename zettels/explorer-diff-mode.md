---
tags:
  - explorer
  - tooling
  - display
  - testing
  - planned
  - cli
  - infrastructure
  - visualization
  - comparison
---

# Explorer: diff mode

Compare two pipeline snapshots side-by-side. Two dimensions:

**Stage diff:** before/after a specific pipeline stage (e.g. GRAM before vs after saturation, MIR before vs after closure conversion). Shows what a pass changed. Useful for understanding pass semantics and debugging pass correctness.

**Input diff:** same pipeline stage for two different inputs. Shows how the pipeline handles different programs. Useful for regression testing and understanding edge cases.

Implementation: the explorer already renders each stage as a string. Diffing is a client-side operation on those strings. A structural diff (tree-aware rather than line-aware) would be more useful for ASTs but harder to implement.

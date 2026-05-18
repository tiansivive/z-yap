---
tags:
- paper
- reference
- lowering
- compiler
---

# Augustsson — compiling pattern matching (1985)

**Citation:** Lennart Augustsson. *Compiling Pattern Matching.* Conference on Functional Programming Languages and Computer Architecture (FPCA), 1985.
**DOI:** [10.1007/3-540-15975-4_48](https://doi.org/10.1007/3-540-15975-4_48)

Left-to-right, one column at a time. Groups arms by outermost constructor, recurses into each group. Wildcards get duplicated into all groups, causing body duplication. Simple and correct; historically used by GHC's Core desugarer (via Wadler's refinement in "The Implementation of Functional Programming Languages", ch. 5).

Superseded by Maranget (2008) for efficiency — Maranget picks optimal columns and avoids body duplication via index references.

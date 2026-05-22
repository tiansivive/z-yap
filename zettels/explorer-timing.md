---
tags:
  - explorer
  - tooling
  - performance
  - planned
  - cli
  - infrastructure
  - observability
  - display
  - compiler
---

# Explorer: stage timing

Measure and display per-stage execution time in the explorer. Each pipeline stage (parse, elaborate, normalize, solve, verify, lower, GRAM passes, codegen) reports its wall-clock duration.

Displayed as a summary bar or waterfall chart alongside the tabs. Highlights bottlenecks — elaboration vs solving vs codegen. Enables comparing timing across inputs.

Implementation: wrap each stage in `performance.now()` calls server-side, return timing data in the `/run` response, render client-side. Low overhead; no architectural changes needed.

Longer term: per-pass timing within GRAM (saturation vs shift-reset vs pattern vs closure) and within the solver (propagation vs decisions vs theory calls).

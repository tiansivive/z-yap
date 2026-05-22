---
tags:
  - verification
  - sat
  - mechanism
  - implemented
  - milestone
  - solver
  - performance
  - principle
---
# Watched literals (two-watch scheme)

Clause maintenance invariant for CDCL [BCP](bcp.md): each non-unit clause watches **two** literals that are not both false yet. On assignment of a literal, only clauses that watch it are visited for propagation work.

After backtrack **no auxiliary state must be rewound** beyond trail indices—the watches stay lazy-consistent across levels as long as the replacement rule holds: when one watched literal becomes falsified while the other remains unknown, scan the remainder for another unassigned/non-false candidate to swap in as watch; if none, the clause propagates its remaining watch.

Ref: classic CDCL hygiene as used in MiniSat-style kernels; architecture notes in `docs/SMT-SOLVER.md`.

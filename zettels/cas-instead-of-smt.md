---
tags:
  [verification, decision, rejected, inference, elaboration, reference, project, backend, arithmetic, normalization, milestone, tooling, infrastructure, error-handling, type-system, ffi, migration]
---
# CAS instead of SMT

Computer-algebra discharge (CAS instead of SMT) was considered early on and rejected in favor of SMT.

The refinement pipeline stays **SMT-first in spirit**: VC generation targets **IVL** and is discharged by **`src/verification/solver/`** (CDCL(T)); **`z3-solver`** remains an optional oracle path via adapters ([[verification-backend]], [[z3-replacement-decision]]).

A CAS sidecar would need a defined obligation split, sound interfaces to dependent refinements, and fallbacks when no closed form exists — out of scope for current `src/verification/` paths.

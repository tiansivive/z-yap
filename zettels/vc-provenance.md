---
tags:
  - verification
  - tracing
  - principle
  - sat
  - ir
  - ivl
  - error-handling
  - display
  - milestone
  - infrastructure
  - dependent
  - backend
  - planned
---
# VC provenance

Obligations carry provenance so that solver results (satisfiable, unsatisfiable, unknown) can be traced back to the source-level construct that generated them.

## Obligation shape

Each obligation has a **label** (human-readable origin: "subtype check at line N", "refinement on let binding"), an **expr** (the IVL formula), and optional **context** (snapshots of term, type, and description strings for display). The label and context are attached at VC emission time in `check`/`synth`/`subtype` and flow unchanged through normalization, Skolemization, CNF lowering, and into the solver.

## The end-to-end propagation problem

The hard part is preserving provenance *through* the solver. Tseitin encoding introduces proxy variables; CDCL learns conflict clauses that combine atoms from multiple obligations; theory propagations (EUF merges, arithmetic bound tightenings) derive new facts with mixed origins. Tracing an unsatisfiable result back to the minimal set of obligations that contributed — an UNSAT core — requires each solver step to record its justification.

## Design principle

The verification pipeline should propagate obligation handles from IVL generation through every lowering and solving stage, so tooling can cite obligation IDs rather than requiring users to interpret raw solver traces. This is the bridge between "the solver says unsat" and "your refinement on `f` at line 12 conflicts with the bound on `x` at line 8."

Currently, obligation labels reach the solver entry point. Wiring them through CDCL conflict analysis and theory explanations to produce minimal UNSAT cores is milestone work ([[milestone-5-explanations]]).

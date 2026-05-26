---
tags:
  [
    verification,
    tracing,
    planned,
    deprecated,
    sat,
    backend,
    ir,
    error-handling,
    display,
    milestone,
    infrastructure,
    principle,
    dependent,
    testing,
    cli,
  ]
---
# VC Provenance

**Superseded as *fully realized pipeline* by the IVL/CDCL(T) direction — see [[z3-replacement-decision]].** Original framing preserved; obligation **types** updated below.

**Status:** Motivation and pipeline hooks remain outlined in `docs/SMT-SOLVER.md` (boolean-lowering origins, assert metadata, explanations milestone). **Full** provenance from conflicting **IVL/CDCL** lemmas back to source edits is **not** wired end-to-end beyond obligation **labels/context** in `VerificationRuntime`.

**Obligation shape (`src/verification/V2/types.ts`):** **`label`**, **`expr: IVL.Formula`**, optional **`context`** (string snapshots of `term`, `type`, `description`). Paths that still feed **Z3** operate on formulas produced by **`z3.adapter.ts`**, not on a separate parallel VC AST.

**Doc direction:** propagate handles from IVL generation through normalization / Tseitin / CDCL so Milestone 5 tooling can cite obligation IDs without spelunking raw Z3 logs ([[milestone-5-explanations]]).

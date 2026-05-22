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

**Superseded by the IVL/CDCL(T) solver stack — see [[z3-replacement-decision]].** Original Z3-era content preserved below for reference.

**Status:** Motivation and pipeline hooks are outlined in `docs/SMT-SOLVER.md` (e.g. boolean lowering “attach origin metadata”, `Solver.assert(f, origin?: string)`, unsat cores, explanations milestone). **No** wiring in `src/verification/` binds Z3 literals or future VC nodes to elaboration provenance today beyond obligation **labels/context** recorded in `VerificationRuntime` (see `createRuntime` usage from `src/verification/V2/service.ts`).

**Current obligation shape:** `src/verification/V2/types.ts` — `Obligation` has `label`, `expr: Expr` (Z3), optional `context` with string snapshots (`term`, `type`, `description`).

**Doc direction:** propagate handles from VC generation through normalization and SAT so unsat cores and CLI errors map back to obligations and source structure without reading Z3 logs.

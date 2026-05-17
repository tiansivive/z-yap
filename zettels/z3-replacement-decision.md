---
tags:
  [
    verification,
    decision,
    planned,
    sat,
    backend,
    milestone,
    ffi,
    ir,
    codegen,
    dependent,
    quantifiers,
    arithmetic,
    strings,
    project,
    principle,
  ]
---
# Z3 replacement decision

**Documented decision** in `docs/SMT-SOLVER.md` **Scope** block:

- **Keep:** `check`, `synth`, `subtype`, obligation recording, refinement-driven VC generation, first-order refinement over the core language.
- **Allow:** replacing direct `z3-solver` expression construction with a Yap-owned VC IR; changing `VerificationArtefacts.vc` from solver-native `Expr` to IR nodes; adding normalization/lowering passes before search.
- **Do not:** remove expressible predicates, narrow refinement expressiveness to ease the solver, or replace VC generation with a unrelated verification method.

**Staged approach (doc):** four layers — VC IR, VC lowering/normalization, core satisfiability engine, theory plugins — with milestone 1 = IR boundary only (translation + optional printer, no solver).

**Code today:** still on Z3 (`src/verification/V2/service.ts`, `logic/translate.ts`, `types.ts` use `Expr`).

This zettel records the **plan** in `docs/SMT-SOLVER.md`, not shipped behavior.

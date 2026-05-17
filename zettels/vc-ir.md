---
tags:
  [
    verification,
    ir,
    planned,
    sat,
    arithmetic,
    strings,
    quantifiers,
    row-types,
    dependent,
    backend,
    codegen,
    principle,
    milestone,
    project,
  ]
---
# VC IR

**Status:** Specified in `docs/SMT-SOLVER.md` (§ “New VC IR”, TypeScript sketch). **No** `VC` namespace or `src/verification/solver/` tree exists in this repository yet (`rg` over `src` finds no `VC.Formula` implementation).

**Intent:** Backend-neutral intermediate between `NF.Value` / refinement translation and satisfiability checking. Proposed sorts: `Bool`, `Int`, `Real`, `String`, `Unit`, `Label`, `Row`, `Fn`, `Uninterpreted`. Terms: variables, constants, numeric/string literals, `Arith`, `StrLen`, uninterpreted `App`, row empty/extend/select. Formulas: `True`/`False`, `Atom`, propositional connectives, `Implies`, guarded `Forall`, `Exists` with trigger lists.

**Current code:** `src/verification/V2/types.ts` still types `VerificationArtefacts.vc` and `Obligation.expr` as `z3-solver` `Expr`; `src/verification/V2/logic/translate.ts` builds Z3 sorts and expressions directly.

Milestone 1 in the doc: add IR + NF→VC translation without a solver.

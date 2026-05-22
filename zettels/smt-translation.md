---
tags:
  [
    verification,
    normalization,
    deprecated,
    backend,
    sat,
    arithmetic,
    strings,
    row-types,
    quantifiers,
    inference,
    elaboration,
    code,
    testing,
    drift,
    reference,
    monad,
    performance,
  ]
---
# SMT translation (Z3, deprecated)

**Status:** Deprecated in the `ivl` worktree (ivl-sat-solver branch). Superseded by IVL-based translation in `src/verification/V2/logic/translate.ts` which produces `IVL.Term`/`IVL.Formula` instead of Z3 `Expr`. Still active in the main worktree pending merge.

**Original implementation:** `createTranslationTools` in `src/verification/V2/logic/translate.ts` (main worktree), wired from `VerificationServiceV2` in `src/verification/V2/service.ts`.

Inputs: `NF.Value` plus `EB.Context` and rigid-variable map `Record<number, Expr>` for quantified refinements.

Outputs: `z3-solver` `Expr` (sorts/expressions); `VerificationArtefacts.vc` type in `src/verification/V2/types.ts` is that `Expr`.

Observed mappings in `translate.ts`: numeric literals → `Z3.Real.val`; `Sorts.Num` is `Z3.Real.sort()`; string literals → `Z3.Const` with uninterpreted `Sorts.String` (`Z3.Sort.declare("String")`); row literal translation throws; `NF.Patterns.App` uses `mkFunction` → `Z3.Array.const` + `.select` for higher-order/function-typed symbols; externals handle `OP_ADD`…`OP_LTE` via `IntNum` API.

`quantify` builds `Z3.ForAll`; for modal/liquid annotations it wraps `Z3.Implies(phi, vc)`.

Reset/Shift NF forms: sort mapping and translation throw unsupported errors (handled in ivl worktree via stub).

Z3 adapter (`z3.adapter.ts`) in the ivl worktree can still translate IVL formulas to Z3 for cross-checking.

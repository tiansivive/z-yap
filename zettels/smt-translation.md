---
tags:
  [
    verification,
    normalization,
    implemented,
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
# SMT translation (current)

Implementation: `createTranslationTools` in `src/verification/V2/logic/translate.ts`, wired from `VerificationServiceV2` in `src/verification/V2/service.ts`.

Inputs: `NF.Value` plus `EB.Context` and rigid-variable map `Record<number, Expr>` for quantified refinements.

Outputs: `z3-solver` `Expr` (sorts/expressions); `VerificationArtefacts.vc` type in `src/verification/V2/types.ts` is that `Expr`.

Observed mappings in `translate.ts`: numeric literals → `Z3.Real.val`; `Sorts.Num` is `Z3.Real.sort()`; string literals → `Z3.Const` with uninterpreted `Sorts.String` (`Z3.Sort.declare("String")`); row literal translation throws; `NF.Patterns.App` uses `mkFunction` → `Z3.Array.const` + `.select` for higher-order/function-typed symbols; externals handle `OP_ADD`…`OP_LTE` via `IntNum` API.

`quantify` builds `Z3.ForAll`; for modal/liquid annotations it wraps `Z3.Implies(phi, vc)`.

Reset/Shift NF forms: sort mapping and translation throw unsupported errors.

Planned replacement: emit backend-neutral VC per `docs/SMT-SOLVER.md` §IR changes / §Translation boundary.

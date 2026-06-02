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

**Superseded by IVL-based VC emission — see [[vc-ir]], [[z3-replacement.adr]], and [[verification-pipeline]].** The body below records the **prior direct `z3-solver` encoding** (original content preserved for reference).

**Status:** `translate.ts` now produces **`IVL.Term` / `IVL.Formula`**; artefacts use **`IVL.Formula`**. The paragraph below describes the **pre-IVL** pipeline.

---

**Original implementation:** `createTranslationTools` in `src/verification/V2/logic/translate.ts` (when still Z3-coupled), wired from `VerificationServiceV2` in `src/verification/V2/service.ts`.

Inputs: `NF.Value` plus `EB.Context` and rigid-variable map `Record<number, Expr>` for quantified refinements.

Outputs: `z3-solver` **`Expr`** (sorts/expressions); **`VerificationArtefacts.vc`** typed as that **`Expr`**.

Observed mappings in `translate.ts` (Z3 era): numeric literals → **`Z3.Real.val`**; **`Sorts.Num`** is **`Z3.Real.sort()`**; string literals → **`Z3.Const`** with uninterpreted **`Sorts.String`** (`Z3.Sort.declare("String")`); row literal translation throws; **`NF.Patterns.App`** uses **`mkFunction` → `Z3.Array.const`** + **`.select`** for higher-order/function-typed symbols; externals handle **`OP_ADD`…`OP_LTE`** via **`IntNum`** API.

**`quantify`** built **`Z3.ForAll`**; for modal/liquid annotations it wrapped **`Z3.Implies(phi, vc)`**.

Reset/Shift NF forms: sort mapping and translation threw unsupported errors (see **[[shift-reset-verification-stub]]** for the bridging story).

**Today:** **`z3.adapter.ts`** translates **IVL** formulas **to** Z3 for cross-checking when desired.

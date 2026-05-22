---
tags:
  [
    verification,
    concept,
    planned,
    deprecated,
    ir,
    normalization,
    dependent,
    backend,
    sat,
    milestone,
    migration,
    type-system,
    language,
    arithmetic,
    strings,
  ]
---
# VerificationArtefacts (revised shape)

**Superseded by the IVL/CDCL(T) solver stack — see [[z3-replacement-decision]].** Original Z3-era content preserved below for reference.

**Today (`src/verification/V2/types.ts`):**

```ts
export type VerificationArtefacts = { vc: Expr; nf?: NF.Value };
export type Obligation = { label: string; expr: Expr; context?: { ... } };
```

`Expr` is from `z3-solver`.

**Proposed (`docs/SMT-SOLVER.md` § “Required changes in verification types”):** `vc: VC.Formula`; `Obligation.expr` renamed to a `VC.Formula` field in the sketch; optional `nf?: NF.Value` retained for debugging; optional richer `context` on obligations for UI strings.

**Why (per doc):** decouple VC generation from Z3 so the same `check` / `synth` / `subtype` algorithms can target a stable IR, then swap satisfiability engines.

No `VC.Formula` type is committed in `types.ts` yet.

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

**Superseded as a *naming sketch* by committed **IVL** types — see [[vc-ir]], [[verification-pipeline]].** Original Z3-era and doc-sketch content preserved below.

**Today (`src/verification/V2/types.ts`):**

```ts
export type VerificationArtefacts = { vc: IVL.Formula; nf?: NF.Value };
export type Obligation = {
	label: string;
	expr: IVL.Formula;
	context?: { term?: string; type?: string; description?: string | string[] };
};
```

(`IVL` imported from `src/verification/solver/ivl/types.ts`.)

**Previously (Z3-direct VC storage):**

```ts
export type VerificationArtefacts = { vc: Expr; nf?: NF.Value };
export type Obligation = { label: string; expr: Expr; context?: { ... } };
```

`Expr` from **`z3-solver`**.

**Earlier sketches** referred to a notional **`VC.Formula`** name; the realised IR type is **`IVL.Formula`**.
**Why (unchanged intent):** decouple VC generation from a single backend so `check` / `synth` / `subtype` target a stable IR, then plug satisfiability engines ([[z3-replacement-decision]]).

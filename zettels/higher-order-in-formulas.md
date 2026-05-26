---
tags: [verification, type-system, decision, implemented, elaboration, dependent, modality, backend, ast, ffi, quantifiers, inference, reference, project, recursion]
---
# Higher-order in formulas

**Encoding (`translate.ts`):** higher-order **values** use array-like **`Select`** — e.g. neutral lambdas map to **`Build.uninterpreted("Function")`** domains and **`App`** lowers via **`Build.select`** (parallel to older **`mkFunction` → `.select`** in the **Z3-direct** era documented in [[smt-translation]]).

**Quantifiers:** **`quantify`** chooses binder sorts via **`mkSort`**; guarded domains handle **`Prim`**, **`Recursive`**, **`Row`**, **`App`**; **`Func`-shaped** sorts hit the `"Unknown sort in logical formulas"` branch. **`check` / `subtype`** wrap **`translation.quantify`** results with **`Build.forall`** / **`Build.implies`** (conceptually what **`Z3.ForAll` / `Z3.Implies`** did when translation emitted Z3 directly).

**Fragment choice:** keep quantified domains first-order; encode higher-order **applications** via **`Select`** at the term level; avoid quantifying over function sorts.

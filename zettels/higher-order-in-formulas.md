---
tags:
  [verification, type-system, decision, implemented, elaboration, dependent, modality, backend, ast, ffi, quantifiers, inference, reference, project, recursion]
---
# Higher-order in formulas

**Encoding:** `src/verification/ARCHITECTURE.md` and `src/verification/V2/logic/translate.ts` model higher-order functions as SMT arrays (`mkFunction`) with `select` for `App`.

**Quantifiers:** `quantify` in `translate.ts` chooses a variable sort via `mkSort`. The sort `match` for the bound variable handles `Prim`, `Recursive`, `Row`, and `App`; a `Func` domain hits `.otherwise(() => { throw new Error("Unknown sort in logical formulas"); })`. So guarded `Z3.ForAll`/`Z3.Implies` loops in `check.ts` and `subtype.ts` assume first-order-ish parameter sorts that map to those cases, not arbitrary function-shaped quantifier domains.

**Design alignment:** `docs/SMT-SOLVER.md` recommends keeping quantified domains first-order and using EUF-style applications for first-order data; avoid quantifying over function sorts as a deliberate fragment choice.

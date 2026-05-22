---
tags:
  [
    verification,
    row-types,
    dependent,
    needs-design,
    mechanism,
    sat,
    normalization,
    inference,
    backend,
    compiler,
    pattern,
    principle,
    performance,
    tracing,
  ]
---
# Row theory (solver)

**IVL row algebra** lives in `src/verification/solver/ivl/types.ts`: `IVL.RowTerm` is `Empty`, label `Extend` (value + rest), or tail `Var`. Sort mapping in `src/verification/V2/logic/translate.ts` maps atom `Row` and `NF.Patterns.Row` to `Build.Row`.

**Elaboration rows** use `R.Row` / `Row.unify` in `src/elaboration/unification/rows.ts` — shape equality and flex tails, aligned with structural checking.

**Verification gap:** `translate.ts` `term()` walks literals, apps, vars, and externals; row-shaped `NF.Value` terms hit the final `.otherwise` and raise `"Unsupported expression type in verification"`. Sort-level `Row` is wired; embedding concrete row values into `IVL.Term` `{ tag: "Row", row: … }` is the remaining design (canonical extension order, tail unification, field obligations), ideally aligned with `subtype.contains()` in `src/verification/V2/subtype.ts` rather than a generic array theory.

**Z3 bridge:** `z3.adapter.ts` declares a `Row` sort for parity tests; the native CDCL stack interns row sorts in the EUF arena (`solver.ts` `.with({ tag: "Row" }, …)`).

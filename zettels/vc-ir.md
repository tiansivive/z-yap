---
tags:
  [
    verification,
    ir,
    implemented,
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
    ivl,
  ]
---
# VC IR

Yap historically stored verification conditions as **`z3-solver`** **`Expr`**; the **IVL** module (`src/verification/solver/ivl/`) is the owned VC IR (**Intermediate Verification Language**). **`VerificationArtefacts.vc`** is **`IVL.Formula`**; the in-tree CDCL(T) solver consumes IVL (`src/verification/solver/`). **`z3.adapter.ts`** translates IVL to Z3 where useful.

**Types (`ivl/types.ts`):** **`Sort`** — `Bool`, `Int`, `Real`, `String`, `Unit`, `Row`, **`Fn`** (arrow), **`Uninterpreted`**. **`RowTerm`** — empty, **`Extend`**, or tail **`Var`**. **`Term`** — `Var`, `Const`, numeric/string/boolean literals (`Num`, `Str`, `Bool`), `Arith`, `App`, `Select`, **`Row`**. **`Formula`** — `True`, `False`, `Atom`, `Not`, `And`, `Or`, `Implies`, `Forall`, `Exists` (optional **triggers** on `Forall`). (Targeted atoms like richer string primitives remain **milestones** — see [[milestone-3-strings]].)

**Builder (`build.ts`):** smart constructors (`Build.var_`, `Build.num`, `Build.forall`, …); **`Build.simplify`** toggles algebraic rewrites.

**Printer (`print.ts`):** S-expressions for tests and explorers.

**Pipeline:** **`translate.ts` → IVL**; **`normalize`**, **`skolem`**, **`cnf`**; **`solve`** ([[m1-implementation]], [[m2-implementation]]). String/row **theories** in the solver are still **mostly future work** alongside IR support ([[verification-pipeline]]).

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

**Status:** Implemented as the IVL (Intermediate Verification Language) in `src/verification/solver/ivl/`.

**Types (`types.ts`):** Sorts: `Bool`, `Int`, `Real`, `String`, `Unit`, `Fn`, `Uninterpreted`. Terms: variables, constants, numeric/string/bool literals, `Arith`, `Select` (function application), `StrLen`, `StrConcat`. Formulas: `True`/`False`, `Atom` (predicates), `Not`, `And`, `Or`, `Implies`, `Forall`, `Exists` with trigger lists.

**Builder (`build.ts`):** `Build.var_`, `Build.const_`, `Build.num`, `Build.str`, `Build.arith`, `Build.and`, `Build.or`, `Build.implies`, `Build.forall`, `Build.exists`, etc. Algebraic simplification toggleable via `Build.simplify` flag.

**Printer (`print.ts`):** S-expression output for formulas and terms.

**Pipeline:** `translate.ts` produces IVL from `NF.Value`. `normalize.ts` handles formula normalization. `skolem.ts` skolemizes existentials. `cnf.ts` converts to CNF for the CDCL core. `quantifier.ts` handles trigger-based instantiation preparation.

**Current code (`ivl` worktree):** `VerificationArtefacts.vc` is `IVL.Formula`. The CDCL(T) solver in `src/verification/solver/` consumes IVL directly.

**main worktree:** `VerificationArtefacts.vc` is still Z3 `Expr`; IVL types exist but are not wired as the default.

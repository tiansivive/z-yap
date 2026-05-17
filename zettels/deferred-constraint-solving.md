---
tags:
  [
    mechanism,
    elaboration,
    inference,
    unification,
    monad,
    pattern,
    dependent,
    compiler,
    normalization,
    error-handling,
    reference,
    implemented,
  ]
---
# Deferred constraint solving

Unification obligations are **accumulated** in the `Elaboration` writer (`collector.constraints`) until an explicit boundary drains them.

**`let` declarations:** After `EB.check.gen` inside a local binding, `EB.Stmt.letdec` (`inference/statements.ts`) snapshots `constraints` and `metas` via `V2.listen()`, then calls `EB.solve` on that batch before `NF.generalize` / `NF.instantiate`. Nondeterministic unification branches can be replayed through `replay` (`solver/nondeterminism.ts`) when `MutState.nondeterminism.solution` is populated.

**Top-level expressions:** `expression` in `module.ts` runs the same listen → `solve` → `generalize` → `instantiate` → `Icit.wrapLambda` path for a bare statement body.

**Implicits:** `resolve` constraints defer picking evidence until after assignment solving so zonkers reflect forced types (`solver.ts` `resolve`).

This differs from eagerly unifying at every mismatch site; batching couples directly to let-polymorphism (`NF.generalize` filters metas by `lvl` vs `ctx.env.length` in `normalization/generalization.ts`).

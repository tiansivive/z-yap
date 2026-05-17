---
tags:
  [
    elaboration,
    inference,
    unification,
    normalization,
    tooling,
    mechanism,
    decision,
    code,
    polymorphism,
    reference,
    tracing,
    implemented,
  ]
---
# Solver dispatch

**Entry**: **`solve`** exported from **`src/elaboration/solver/solver.ts`**, re-exported **`@yap/elaboration`** (**`src/elaboration/index.ts`**). Call sites include **`src/elaboration/module.ts`** (**`EB.solve(constraints)`**) and **`src/elaboration/inference/statements.ts`** (with nondeterminism **`replay`** wrapper).

**Partitioning**: **`cs.filter(c => c.type === "assign")`** processed first via **`_solve`**; **`cs.filter(c => c.type === "resolve")`** afterward — assigns extend **`subst`** threaded through **`U.unify`**; resolves see **`ctx`** whose **`zonker`** already includes **`Sub.compose(subst, prevZonker)`**.

**Per-assign instrumentation**: **`V2.track(c.trace, U.unify(...))`** preserves provenance from **`WithProvenance`**.

**Implicit branch**: **`lookup`** linear scan; **`U.unify`** runs with **`Sub.empty`** deliberately — non-empty **`Right`** rejects candidate to preserve polymorphism (**`solver.ts`** comments).

**`module.ts`** calls **`EB.solve`** because **`import * as EB from "@yap/elaboration"`** picks up **`export * from "./solver"`** — **`solve`** is that exported **`solve`**.

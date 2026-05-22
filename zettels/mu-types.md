---
tags:
- concept
- type-system
- elaboration
- normalization
- unification
- recursion
- ast
- incomplete
- inference
- solver
- substitution
- evaluation
- syntax
- migration
- reference
---
# Mu types

**AST:** `Abs` with `binding.type === "Mu"` plus `source: string` (debug/origin label in EB) (`src/elaboration/syntax/term.ts`). NF binder mirrors fields (`src/elaboration/normalization/syntax/term.ts`).

**Recursive lets:** `src/elaboration/inference/statements.ts` wraps the inferred definition in `EB.Constructors.Mu` when the listener records a `Mu` binder for that variable.

**Evaluation:** `evaluation.v2.ts` reduces an application whose head is `Abs(Mu)` to neutral/stuck form without unfolding μ for that step; computation paths that need expansion call `NF.unfoldMu` where wired.

**Unification (`src/elaboration/unification/unification.ts`):**

- Mu–Mu: unify annotations then bodies under fresh rigid (same structure as Pi–Pi).
- Mu versus other values: unfold via `NF.apply(mu.binder, mu.closure, mu)` inside `EB.unfoldMu` context and recurse.
- App–App without flex metas: tries `NF.unfoldMu` on either side before structural App unification.

**Occurs check:** when the occurs check fails, `bind` currently throws (`Unification: Occurs check failed. Need to implement mu type` in `src/elaboration/unification/unification.ts`); constructing recursive meta solutions as μ types is the natural completion of that path.

**Tests:** `src/elaboration/unification/__tests__/unification.v2.test.ts` covers Mu–Mu agreement and unfolding scenarios.

Related: [[mu-type-unification.md]], [[equirecursive-types.md]], [[missing-spec-recursive-types.md]], [[nf-value.md]], [[nu-types]], [[bisimulation-type-equality]], [[inductive-types]], [[coinductivity]].

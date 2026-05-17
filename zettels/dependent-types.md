---
tags:
- concept
- type-system
- elaboration
- normalization
- unification
- verification
- syntax
- dependent
- quantifiers
- inference
- implemented
- ast
- monad
- parser
- row-types
---
# Dependent types

A type that may mention values (e.g. the codomain depends on the domain witness). In Yap’s core, dependence lives under `Abs` binders: **Pi** is dependent function space, **Sigma** packages a row witness and a body that can use earlier fields (`EB.Binding` in `src/elaboration/syntax/term.ts`).

**Syntax / core terms:** Pi, Sigma, and runtime Lambda share the `Abs` node; discrimination is `binding.type` (`Pi` | `Sigma` | `Lambda` | `Mu` | `Let`). NF mirrors this (`NF.Binder` in `src/elaboration/normalization/syntax/term.ts`).

**Checking:** `src/elaboration/check.ts` matches surface lambdas against `NF.Patterns.Pi` (explicit and implicit Π introduction).

**Inference:** `src/elaboration/inference/pi.ts` checks the domain against `NF.Type`, binds a Pi in context, checks the body at `NF.Type`.

**Equality:** definitional comparison goes through normalization/unification on `NF.Value` (Pi/Sigma/Mu clauses in `src/elaboration/unification/unification.ts`), not a nominal type-name table.

**NbE / evaluation:** `src/elaboration/normalization/evaluation.v2.ts` evaluates `Abs` bodies under extended contexts; sigma rows extend `ctx.sigma` for label-backed references (`src/elaboration/shared/context.ts`).

**Verification:** modalities and liquid formulas attach via `NF.Modal` / elaboration hooks (`stripModalities` in `src/elaboration/elaborate.ts` keeps inference and refinement passes separated).

Related: [[pi-types.md]], [[sigma-types.md]], [[types-as-terms.md]], [[bidirectional-checking-decision.md]].

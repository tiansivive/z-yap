---
tags:
- syntax
- elaboration
- inference
- type-system
- dependent
- mechanism
- parser
- ast
- implemented
- monad
- normalization
- codegen
---

# Application

Surface **`fn arg`** (explicit) and **`fn @ arg`** (implicit). Grammar: left-recursive `App` over `Atom`, `{% P.Application("Explicit") %}` / `{% P.Application("Implicit") %}` (`src/parser/grammar.ne`). AST: `{ type: "application", fn, arg, icit }` (`src/parser/terms.ts`, `src/parser/processors.ts` `App`).

Elaboration: `EB.Application.infer` (`src/elaboration/inference/applications.ts`). Infers function position (for explicit apps, runs `EB.Icit.insert.gen` first so implicit Π heads get instantiated). Builds Π-type via `mkPi`: reads `NF.Abs` with `Pi` binder when icitness matches; otherwise emits metavariable Π skeleton and **`assign`** constraint (`tell("constraint", …)`). Computes result type with `NF.apply` on the Π closure and codomain.

Projection/injection use **`Atom %dot Identifier`** (`Projection`), not `App`, per grammar (`grammar.ne`).

Lower-level evaluation semantics live outside this inference rule ([[application-evaluation.md]], [[nf-value.md]]).

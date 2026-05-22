---
tags:
- type-system
- elaboration
- inference
- syntax
- ast
- dependent
- row-types
- concept
- implemented
- parser
- unification
- normalization
---
# Structural Records

Parser builds `{ type: "struct"; row }` (`struct` processor, `src/parser/processors.ts`) with `KeyVal` labels and optional row tail variable. Inference: `infer` in `src/elaboration/inference/structs.ts` runs `EB.Rows.inSigmaContext` + `collect` (`rows.ts`) so later fields type-check in sigma environment.

Closed rows yield `EB.Constructors.Struct(rtm)` with type `NF.Constructors.Schema(rty)` (`structs.ts`). **Values** use `Struct` (`App "Explicit" (Lit Atom "Struct") (Row …)` per `EB.Constructors.Struct` in `src/elaboration/syntax/term.ts`). **Types** of those values are `Schema` rows (`App(Lit Atom "Schema", Row …)` pattern `CtorPatterns.Schema`).

Open tail variable with `Row`/`Schema`/`Flex` typing follows `match` branches in `structs.ts` (schema merger vs type-level schema vs polymorphic flex + `assign`). That flex branch is the implementation locus for parametric row tails ([[row-polymorphism.md]]); it is not width subtyping.

Elimination: `Proj` (`projection.ts`). Extension into existing row-shaped types: `Inj` (`injection.ts`). Dependent sigma binders use the same row machinery (`Rows.inSigmaContext`).

Related: [[codata]], [[data-declarations]], [[customizable-data-types]], [[dictionary-passing]].

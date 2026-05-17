---
tags:
- syntax
- elaboration
- inference
- checking
- type-system
- parser
- ast
- mechanism
- dependent
- normalization
- monad
- implemented
- compiler
- error-handling
---

# Annotations

Surface form **`expr : TypeExpr`** (Nearley nonterminal `Ann`, left-associated so nested annotations parse as `(expr : A) : B`).

Grammar: `Ann -> Ann %colon TypeExpr {% P.Annotation %}` chained through `TypeExpr` … `Atom`, with parenthesized atoms peeling via `Parens[Ann]` (`src/parser/grammar.ne`). Postprocessor builds `{ type: "annotation", term, ann }` plus span (`src/parser/processors.ts` `Annotation`, `Annotate`).

Elaboration: `src/elaboration/elaborate.ts` dispatches `annotation` to `EB.Annotation.infer`. Implementation (`src/elaboration/inference/annotations.ts`): `check(ann, NF.Type)`, evaluate annotation head with `NF.evaluate`, then **`check(term, nf)`**—the ascribed expression is checked against that normal form, not merely inferred and compared. Produces an `EB.Term` with the ascribed type’s `NF.Value`; there is no separate “annotation” node in `src/elaboration/syntax/term.ts` core terms.

Bidirectional hook: switches the subject from inference-first to checking-first for `term`, while still treating `ann` as a full term at kind `Type`.

Detail: dependent Pi binders inside `ann` see earlier context like any type (`pi-types.md`). Metavariable solving still applies globally (`solver.md`). Stripping modalities from inferred types preserves user-written modalities on annotated types (`stripModalities` in `src/elaboration/elaborate.ts`).

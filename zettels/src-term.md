---
tags:
- syntax
- ast
- concept
- parser
- elaboration
- implemented
- tracing
- dependent
- row-types
- modality
- continuation
- inference
- migration
- lowering
- codegen
- testing
- reference
- mir
- compiler
---

# Src.Term (source AST)

Definition: **`export type Term = WithLocation<Bare>`** in **`src/parser/terms.ts`** (`WithLocation` from **`@yap/shared/provenance`**).

**`Bare`** discriminant union (field summary): **`lit`**, **`var`**, **`hole`**, **`arrow`**, **`lambda`**, **`pi`**, **`application`**, **`annotation`**, **`list`**, **`tuple`**, **`struct`**, **`dict`**, **`tagged`**, **`variant`**, **`row`**, **`injection`**, **`projection`**, **`match`**, **`block`**, **`modal`**, **`reset`**, **`shift`**, **`resume`**.

**`Variable`**: `WithLocation<{ type: "name" | "label"; value: string }>`. **`Row`**: `WithLocation<R.Row<Term, Variable>>`. **`Statement`**: `expression` \| `let` (optional `annotation`, `multiplicity`, `liquid`) \| `using` \| `foreign`. Module/script/import/export types at bottom of **`terms.ts`**.

Consumers: **`src/elaboration/elaborate.ts`** pattern-matches `Src.Term` into **`EB.*.infer`**; pretty-printer **`src/parser/pretty.ts`**.

Crosswalk to core: **`src-to-eb-transformation.md`**, **`eb-term.md`**.

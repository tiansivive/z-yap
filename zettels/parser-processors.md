---
tags:
- parser
- mechanism
- syntax
- ast
- implemented
- tracing
- codegen
- elaboration
- mir
- sugar
- row-types
- continuation
- lowering
- testing
- reference
- infrastructure
- migration
---

# Parser processors

Nearley **`postprocess`** hooks live in **`src/parser/processors.ts`**. They construct **`Src.Term`** / **`Src.Statement`** / patterns with **`location: P.Location`** (`span`, `locSpan`, `Sourced.located`, etc.—see **`src/parser/ARCHITECTURE.md`**).

Representative **`export const`** processors tied to **`grammar.ne`**: **`Hole`**, **`Var`**, **`Lit`**, **`Application`**, **`Operation`**, **`Annotation`**, **`Lambda`**, **`Pi`**, **`Param`**, row/record builders (**`row`**, **`struct`**, **`tuple`**, **`list`**, **`variant`**, **`dict`**, **`tagged`**), **`Projection`**, **`Injection`**, **`Match`**, **`Alternative`**, **`Block`**, **`Return`**, **`Expr`**, **`LetDec`**, **`Using`**, **`Foreign`**, **`Modal`**, **`Reset`**, **`Shift`**, **`Resume`**, **`Pattern.{…}`**, module/import/export (**`module_`**, **`script`**, …), plus lexer/name helpers (**`Name`**, **`Label`**, …).

Grammar references **`P.Mu`** for **`μ X -> …`** (`grammar.ne`); if **`Mu`** is absent from **`processors.ts`**, regeneration/`pnpm nearley` may fail until implemented—worth aligning grammar ↔ processors.

Detail: **`Src.Term`** shapes (**`src-term.md`**), **`src/parser/grammar.ne`** rule inventory.

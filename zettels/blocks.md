---
tags:
- concept
- syntax
- elaboration
- inference
- generalization
- implemented
- parser
- ast
- polymorphism
- dependent
---
# Blocks

Yap's block expression: `{ stmt₁; …; stmtₙ; return expr; }`. Blocks thread elaboration context through a sequence of statements, each potentially extending the context for subsequent statements.

Statements can be bare expressions (evaluated for effect), `let` bindings (extend context with a new variable), or `using` declarations (bring implicits into scope). The `foreign` statement form parses but is not yet elaborated.

The key design feature is **statement-level generalization**: each `let` binding runs through `letdec`, which applies `NF.generalize` and `NF.instantiate` to the bound term's type. This is where let-polymorphism happens — a let-bound definition gets a polymorphic type that is instantiated at each use site, rather than being monomorphized at the binding site.

When the trailing `return` is omitted, the block synthesizes a unit value (`Lit.Atom("Unit")`). This makes expression-statement-only blocks (used for side effects) well-typed without explicit returns.

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

Statements can be bare expressions (evaluated for effect), `let` bindings (extend context with a new variable), or `using` declarations (bring implicits into scope). `foreign` is a Src-level statement form with no elaboration rule.

The key design feature is **statement-level generalization**: each `let` binding runs through `letdec`, which applies `NF.generalize` and `NF.instantiate` to the bound term's type. This is where let-polymorphism happens — a let-bound definition gets a polymorphic type that is instantiated at each use site, rather than being monomorphized at the binding site.

When the trailing `return` is omitted, the block synthesizes a unit value (`Lit.Atom("Unit")`). This makes expression-statement-only blocks (used for side effects) well-typed without explicit returns.

<!-- connections:start -->

## Connections

**Outgoing**
- USES → [[generalization]] — Let-polymorphism at boundaries
- INTRODUCES → [[elaboration-context]] — Local scope via let bindings
- RELIES_ON → [[generalization]] — Let-dec runs NF.generalize/instantiate
- RELIES_ON → [[meta-variables]] — Generalization operates on unsolved metas
- RELIES_ON → [[elaboration-context]] — Statement threading extends context

**Incoming**
- [[where-clauses]] ← DESUGARS_TO — Let bindings
- [[block-level-using-gap]] ← APPLIES_TO — Using in block scope
- [[knot-tying]] ← IMPLEMENTS — Recursive let self-referential evaluation
- [[knot-tying]] ← ENABLES — Recursive let-bindings
- [[letpoly-implicit-escape]] ← APPLIES_TO — Block scoping of let-bound metas
- [[length-recursive-debruijn]] ← APPLIES_TO — Block-level recursive bindings

<!-- connections:end -->

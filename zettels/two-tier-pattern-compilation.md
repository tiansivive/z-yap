---
tags:
  - mechanism
  - pattern
  - compiler
  - compilation
  - concept
  - elaboration
  - needs-design
  - exploration
  - strategy
  - lowering
  - design
---
# Two-tier pattern compilation

Pattern matching compilation divides into two tiers when [[functional-patterns]] are in
scope alongside ordinary constructor patterns:

**Constructor tier** — clauses whose pattern positions contain constructor symbols,
variables, and literals. These compile via decision-tree algorithms ([[maranget-paper]],
[[gram-pattern-pass]]). Decision trees exploit the fact that constructors are statically
known and finitely enumerable; the compiler builds complete dispatch at compile time with
no runtime search.

**Functional-pattern tier** — clauses that include function symbols in pattern positions.
These cannot feed the decision-tree algorithm directly, which assumes a closed,
constructor-only pattern language. Instead, a functional-pattern clause desugars: the
function-in-pattern position becomes a narrowing or unification computation (see
[[narrowing-vs-residuation]]), and the clause body becomes a continuation resumed per
solution. The narrowing reading uses [[choose-fail-effect]]; the residuation reading uses
direct [[unification]].

Both tiers coexist in the same match expression: a clause matrix may mix ordinary
constructor rows with functional-pattern rows, routed to their respective compilation paths.

For the narrowing tier, [[gram-shift-reset-pass]] is the existing lowering path that
functional-pattern clauses share with user-facing continuation computations — the
desugaring target is the same continuation substrate.

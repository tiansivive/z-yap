---
tags:
- concept
- syntax
- elaboration
- inference
- lowering
- implemented
- parser
- ast
- dependent
- compiler
- incomplete
---
# Match

Pattern matching in Yap: `match scrutinee | pat -> arm | …`. The scrutinee is inferred, then each arm's pattern is elaborated (extending context with pattern binders), and the arm body is inferred. Arm result types are unified via assign constraints — all arms must agree on a common result type.

Pattern forms include binders, variables, literals, rows, structs, variants, lists, and wildcards. Pattern elaboration builds the bindings that extend the context for the arm body, connecting surface pattern syntax to the elaboration context.

At lowering, match compiles via Maranget-style clause-matrix compilation — a standard approach that decomposes multi-pattern matches into decision trees. Non-exhaustive matches currently emit a fallback block with a runtime error string rather than a compile-time exhaustiveness check.

Open design work: dependent narrowing (refining types based on pattern match outcomes) and variant-return typing (using the matched variant structure to inform the return type). Exhaustiveness and reachability analysis are also future work — coverage diagnostics would complement the existing inference path.

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

At lowering, match compiles via Maranget-style clause-matrix compilation — a standard approach that decomposes multi-pattern matches into decision trees. Non-exhaustive matches fall through to a runtime error arm; exhaustiveness is not verified at compile time.

The design space beyond basic matching includes dependent narrowing (refining types based on pattern match outcomes), variant-return typing (using the matched variant structure to inform the return type), and coverage/reachability diagnostics.

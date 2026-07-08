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

<!-- connections:start -->

## Connections

**Outgoing**
- ELIMINATES → [[variant-types]] — Elim form for variants
- LOWERS_TO → [[pattern-matching-compilation]] — Decision trees
- DUAL_OF → [[tagged-values]] — Intro/elim pair for variants
- DISPATCHES_ON → [[variant-types]] — Variant, Struct, Lit, List, Wildcard, Binder
- COMPOSES_WITH → [[tagged-values]] — Intro/elim pair for variants
- RELIES_ON → [[unification-algorithm]] — Arm types unified via assign constraints
- RELIES_ON → [[nf-value]] — Scrutinee evaluated to NF for matching
- LOWERS_TO → [[pattern-matching-compilation]] — Maranget clause-matrix at MIR level

**Incoming**
- [[exhaustiveness-checking]] ← EXTENDS — Safety gap
- [[pattern-matching-compilation]] ← DISPATCHES_ON — Pattern shape
- [[elaboration-context]] ← THREADS_THROUGH — Binder extension
- [[pattern-matching-compilation]] ← ERASES — Patterns removed after compilation
- [[functional-patterns]] ← EXTENDS — Curry-style patterns, view patterns
- [[gram-pattern-translation]] ← TRANSLATES_TO — EB.Pattern → pat:* graph nodes
- [[gram-pattern-pass]] ← PRESERVES — match/case/pat nodes unchanged
- [[pattern-matching.thread]] ← INCLUDES
- [[dependent-pattern-matching]] ← EXTENDS — Adds type refinement to matching
- [[with-abstraction]] ← EXTENDS — Additional scrutinees in match arms
- [[view-patterns]] ← EXTENDS — Function-applied matching
- [[pattern-synonyms]] ← EXTENDS — Named patterns for structural types
- [[active-patterns]] ← EXTENDS — User-defined recognizers
- [[open-closed-variants]] ← INFORMS — Fallback required for open variants
- [[exhaustiveness-checking]] ← APPLIES_TO — Surface match coverage
- [[negative-testing]] ← TARGETS
- [[v1-test-cleanup]] ← ENRICHES — 8 pattern matching tests ported
- [[maplist-schema-unification]] ← APPLIES_TO — Checked match branches with polymorphic return type
- [[redundant-match-arms]] ← APPLIES_TO — Arms of a match expression

<!-- connections:end -->

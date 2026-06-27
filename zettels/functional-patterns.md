---
tags:
  - speculative
  - exploration
  - language
  - pattern
  - syntax
  - concept
  - elaboration
  - continuation
  - type-system
  - needs-design
  - effect
  - verification
---

# Functional patterns

A functional pattern places a defined function symbol in a pattern position. Rather than
matching a constructor shape against the scrutinee, the function runs *backwards*:
it generates the constructor-term arguments that would produce the scrutinee, binding
clause-head variables to each solution. The canonical example, from Curry:

    with x = _ ++ [x] ++ _
    get key (with (key, value)) = value

`with` defines all lists containing `x`. Used as a pattern, `get` matches any list
containing `(key, value)` and returns `value`. Patterns become composable and
encapsulatable on equal footing with expressions — a pattern can be built from smaller
pattern functions and hidden behind a module boundary.

This is distinct from [[view-patterns]], which apply a function *forward* to the scrutinee
and match the result deterministically. Functional patterns invert a function over its
output; view patterns apply a function over the input. Different semantics, different
type-theoretic requirements, different compilation paths.

The two readings of inversion — full narrowing (multiple results, non-deterministic
substrate required) and residuation (single result via unification) — are worked out in
[[narrowing-vs-residuation]]. The compilation architecture that hosts both without
disrupting ordinary constructor matching lives in [[two-tier-pattern-compilation]].

<!-- connections:start -->

## Connections

**Outgoing**
- EXTENDS → [[match]] — Curry-style patterns, view patterns
- REQUIRES → [[elaboration]] — Elaboration redesign needed

**Incoming**
- [[pattern-matching.thread]] ← INCLUDES

<!-- connections:end -->

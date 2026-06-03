---
tags:
  - design
  - needs-design
  - backlog
  - type-system
  - gram
  - elaboration
  - constraint
  - unification
  - checking
  - inference
  - bidirectional
refs:
  - thread:gram-evolution
---
# GRAM payload constraint emission

The bidirectional type system has a `check(string-literal, JSON)` case that validates JSON syntax via `JSON.parse`. Rule values bypass this case because they flow through constraint emission (inference), not direct checking.

## Mechanism

When a Rule struct literal is elaborated, its fields synthesise types that emit unification constraints. The `payload` field synthesises `String` (the type of string literals); the expected type from the Rule schema is `JSON` (an atom). Unification fails: `String ≠ JSON`.

The `check(string, JSON)` case at `src/elaboration/check.ts:129` handles direct checking of a string literal against `JSON`, but struct field elaboration routes through inference and constraint emission, never entering check mode for that field.

## Workaround

The current implementation types `payload` as `String` rather than `JSON`, avoiding the unification failure. This loses the semantic distinction and bypasses JSON syntax validation.

## Design options

1. **Route struct fields through check mode** — when a struct literal is checked against a known schema, check each field against its expected type rather than inferring and unifying
2. **Subtyping or coercion** — treat `String` as a subtype of `JSON` or insert an implicit coercion during constraint solving
3. **Alias** — define `JSON` as a type alias for `String` in the context so normalisation resolves them to the same type

Option 1 aligns with bidirectional style; option 3 is the minimal change.

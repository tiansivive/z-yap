---
tags:
- concept
- syntax
- elaboration
- inference
- incomplete
- implemented
- metavariable
- parser
- ast
- dependent
- constraint
---
# Holes

A user-facing language feature: `_` in source code marks a position where the programmer asks the elaborator to fill in a value or type. Holes are the surface syntax for "I don't know yet — figure it out."

Hole elaboration allocates two fresh meta-variables — one for the type (at kind Type) and one for the value (typed by that meta) — and relies on unification and constraint solving to fill them. The surface hole does not survive into EB.Term; only the meta-variables remain.

Holes are intentionally thin — they only introduce metas. Typed hole errors, IDE integration, partial-program checking, and named holes (`?name`) are separate concerns layered on top of this core mechanism.

The distinction from meta-variables is important: metas are internal elaboration machinery (the solver's unknowns), while holes are a user-facing feature (the programmer's unknowns). A hole creates metas, but not all metas come from holes — implicit argument insertion, constraint solving, and type inference all generate metas independently.

Display renders holes as `?`, not `_`.

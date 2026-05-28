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

Currently, hole elaboration allocates two fresh meta-variables — one for the type (at kind Type) and one for the value (typed by that meta) — and relies on unification and constraint solving to fill them. The surface hole does not survive into EB.Term; only the meta-variable variables remain.

This implementation is minimal. Holes as a language feature have significant design potential beyond their current "allocate metas" behavior:
- **Typed holes** with informative error messages showing the expected type and available bindings in scope
- **Interactive development** via IDE integration — displaying hole types, suggesting completions, allowing incremental refinement
- **Partial programs** that typecheck with unsolved holes, enabling top-down development
- **Named holes** (`?name`) for referring to the same unknown in multiple positions

The distinction from meta-variables is important: metas are internal elaboration machinery (the solver's unknowns), while holes are a user-facing feature (the programmer's unknowns). A hole creates metas, but not all metas come from holes — implicit argument insertion, constraint solving, and type inference all generate metas independently.

Display renders holes as `?`, not `_`.

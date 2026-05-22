---
tags:
- elaboration
- inference
- type-system
- row-types
- dependent
- pattern
- mechanism
- normalization
- compiler
- codegen
- language
- infrastructure
- reference
- implemented
status: implemented
---
# Typeclass emulation (dictionary style)

No nominal typeclass AST: capability bundles are ordinary terms (often row/record shaped) threaded through implicit `Pi` binders (`check.ts`, `implicits.ts`).

Instance search = structure: `resolve`/`lookup` unify the goal `NF.Value` against each candidate’s `NF.Value` type (`solver.ts`, `context.ts` `resolveImplicit`).

Overlap: first successful candidate with **empty** residual substitution wins (`solver.ts` `lookup`); later duplicates are invisible unless ordering changes or unification rejects earlier entries.

Dependent rows stay in the same unify path as term types — no separate class dictionary keying.

Authoring hazard: duplicate instances of structurally compatible types; debugging = log `constraints` around solve (`module.ts` `expression` exposes debug tuple).

Hub: [[implicits.md]], [[implicit-resolution-solver.md]], [[implicit-environment.md]], [[typeclass-coherence]], [[superclasses]], [[dictionary-passing]].

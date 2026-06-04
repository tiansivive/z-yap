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

<!-- connections:start -->

## Connections

**Outgoing**
- EMULATES → [[nominal-typing]] — Structural alternative to classes
- USES → [[implicit-resolution]] — Instance lookup via Δ
- USES → [[structural-records]] — Instances are records
- CONTRASTS_WITH → [[nominal-typing]] — No class hierarchy
- ENCODES → [[implicit-environment]] — Instances as record values in Δ

**Incoming**
- [[nominal-typing]] ← CONTRASTS_WITH — Class hierarchy vs structural
- [[functional-dependencies]] ← COMPOSES_WITH — Fundeps on implicit records
- [[typeclass-coherence]] ← APPLIES_TO — Coherence concerns for implicit records
- [[superclasses]] ← APPLIES_TO — Superclass encoding pattern
- [[dictionary-passing]] ← IMPLEMENTS — Records as dictionaries
- [[implicits-as-coeffects-exploration]] ← INFORMS — Coeffect-based implicit model
- [[module-system-exploration]] ← COMPOSES_WITH — Modules as capability records

<!-- connections:end -->

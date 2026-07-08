---
tags:
- type-system
- elaboration
- inference
- syntax
- ast
- dependent
- row-types
- concept
- implemented
- parser
- unification
- normalization
---
# Structural Records

Parser builds `{ type: "struct"; row }` (`struct` processor, `src/parser/processors.ts`) with `KeyVal` labels and optional row tail variable. Inference: `infer` in `src/elaboration/inference/structs.ts` runs `EB.Rows.inSigmaContext` + `collect` (`rows.ts`) so later fields type-check in sigma environment.

Closed rows yield `EB.Constructors.Struct(rtm)` with type `NF.Constructors.Schema(rty)` (`structs.ts`). **Values** use `Struct` (`App "Explicit" (Lit Atom "Struct") (Row …)` per `EB.Constructors.Struct` in `src/elaboration/syntax/term.ts`). **Types** of those values are `Schema` rows (`App(Lit Atom "Schema", Row …)` pattern `CtorPatterns.Schema`).

Open tail variable with `Row`/`Schema`/`Flex` typing follows `match` branches in `structs.ts` (schema merger vs type-level schema vs polymorphic flex + `assign`). That flex branch is the implementation locus for parametric row tails ([[row-polymorphism.md]]); it is not width subtyping.

Elimination: `Proj` (`projection.ts`). Extension into existing row-shaped types: `Inj` (`injection.ts`). Dependent sigma binders use the same row machinery (`Rows.inSigmaContext`).

Related: [[codata]], [[data-declarations]], [[customizable-data-types]], [[dictionary-passing]].

<!-- connections:start -->

## Connections

**Outgoing**
- USES → [[row-polymorphism]] — Open-tail row structure

**Incoming**
- [[sigma-types]] ← FORMS — Σ forms dependent record types
- [[variant-types]] ← DUAL_OF — Sum vs product over rows
- [[variant-types]] ← MIRRORS — Row-backed dual
- [[tuples]] ← DESUGARS_TO — Positional labels
- [[tuples]] ← SPECIALIZES — Numeric labels only
- [[projection]] ← ELIMINATES — Field access
- [[injection]] ← INTRODUCES — Field extension
- [[rows-universal-substrate]] ← MOTIVATES — Uniform substrate
- [[dedicated-row-constructors]] ← REVISES — Dedicated AST nodes
- [[typeclass-emulation]] ← USES — Instances are records
- [[structural-row-based-types]] ← FORMS — Records, variants, tuples, lists, dicts
- [[row-data-structure]] ← FORMS — Basis of row-backed types
- [[sigma-bindings]] ← APPLIES_TO — Record field references
- [[sigma-bindings]] ← ENABLES — Field-to-field dependency
- [[row-polymorphism]] ← SUBSUMES — Rows generalize fixed-field records
- [[records-indexed-separation]] ← ADDRESSES — Syntax confusion with indexed types
- [[row-types.thread]] ← INCLUDES
- [[codata]] ← EXTENDS — Records as observations = codata
- [[nu-types]] ← COMPOSES_WITH — Coinductive records via nu + projections
- [[data-declarations]] ← DESUGARS_TO — Product parts desugar to struct rows
- [[superclasses]] ← USES — Nested records encode hierarchy
- [[dictionary-passing]] ← USES — Dictionaries are records
- [[pattern-synonyms]] ← COMPOSES_WITH — Named record patterns
- [[customizable-data-types]] ← EXTENDS — Custom records with pluggable backends
- [[codata-vs-coinductive-types]] ← APPLIES_TO — Records as codata via projections
- [[redundant-match-arms]] ← RELIES_ON — Fixed rows / no width subtyping ⇒ extra record arms are redundancy, not shape dispatch

<!-- connections:end -->

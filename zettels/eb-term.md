---
tags:
  [ast, ir, elaboration, code, dependent, row-types, modality, continuation, recursion, syntax, inference, implemented]
---
# EB.Term

Branded elaboration-core syntax: `export type Term = Types.Brand<…, Constructor & { id: number }>` (`src/elaboration/syntax/term.ts`). `EB.mk` / `EB.Constructors.*` allocate monotonically increasing `id` via module `currentId`.

**Constructors (`type` field):** `Lit`, `Var`, `Abs`, `App`, `Row`, `Proj`, `Inj`, `Match`, `Block`, `Modal`, `Reset`, `Shift`.

**Variables:** `Bound` (de Bruijn index), `Free`, `Foreign`, `Label`, `Meta` (`val` + `lvl`).

**Bindings under `Abs`:** `Let`, `Lambda`, `Mu`, `Pi`, `Sigma` — each carries `annotation: Term`.

**Patterns** (for `Match`): `Binder`, `Var`, `Lit`, `Row`, `Struct`, `Variant`, `List`, `Wildcard`.

**Statements** (for `Block`): `Expression`, `Let` (`annotation: NF.Value`), `Using`.

Surface struct/schema/variant/array often lower to `App` of a literal atom to a `Row` (`Constructors.Struct`, `.Schema`, `.Variant`, `.Array`).

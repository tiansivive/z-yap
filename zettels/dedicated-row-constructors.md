---
tags:
  [
    planned,
    ready,
    elaboration,
    syntax,
    ast,
    row-types,
    type-system,
    lowering,
    normalization,
    inference,
    parser,
    mir,
    pattern,
    mechanism,
    display,
    migration,
  ]
---

# Dedicated row constructors (internal EB)

Nearley surface syntax already distinguishes families (`Struct`, `Tuple`, `Variant`, `list`, … in `src/parser/grammar.ne`; CST kinds `struct`, `tuple`, `variant`, … feed `src/elaboration/elaborate.ts` via `EB.Struct.infer`, `EB.Tuples.infer`, `EB.Variant.infer`, …).

Internally, **`EB.Term` still encodes several type-level rows as binary `App`** wrapped around literal atoms plus `Row`: see `EB.Constructors.Schema`, `.Struct`, `.Variant`, `.Array` in `src/elaboration/syntax/term.ts` (`App("Explicit", Lit(Atom("Schema")), Row(row))`, etc.). **`NF`/lowering** therefore keeps matching `App` heads — `src/lowering/patterns.ts` defines `StructApp`, `TypeLevelSchema`, `TypeLevelVariant`, `TypeLevelArray` pattern objects for `ts-pattern`.

A planned refactor would introduce dedicated **`EB.Term` variants** (or equivalent) for those families so traces, unify heads, and lowers avoid recovering intent from nested `App`. That touches **`src/lowering/patterns.ts`**, NbE/unify dispatch, and snapshots; it aligns conceptually with **spineful applications** (same AST-shape churn class) but is a separate change.

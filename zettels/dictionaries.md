---
tags:
  - type-system
  - elaboration
  - inference
  - ffi
  - syntax
  - sugar
  - ast
  - mechanism
  - implemented
  - reference
  - parser
  - error-handling
---
# Dictionaries

Dictionary surface terms (`dict` in `src/parser/terms.ts`, processor `dict` in `src/parser/processors.ts`) elaborate via `infer` in `src/elaboration/inference/dictionaries.ts`. Result core term is `EB.Constructors.Indexed` (`src/elaboration/syntax/term.ts`): nested `App`/`Implicit` apps around foreign `Indexed`, index type term, element/value kind term, and a **strategy** implicit argument—`Foreign defaultHashMap` when the inferred index is `Lit Atom "String"` or free var `"String"`, `Foreign defaultArray` when index is `Lit Atom "Num"` or free var `"Num"`, otherwise a fresh metavariable strategy (`dictionaries.ts`, `match` on index shape).

That path is distinct from row-variable polymorphism over `Schema`/`Variant`: dictionaries do not introduce open row tails on structural schemas; they instantiate the FFI-backed indexed-family constructor named in elaboration tests (`src/elaboration/inference/__tests__/__snapshots__/dictionaries.test.ts.snap`). Lists share the same `Indexed` story but fix index to numeric atoms (`lists.ts`).

<!-- connections:start -->

## Connections

**Outgoing**
- ENCODES → [[ffi]] — Indexed String T defaultHashMap (foreign)
- MIRRORS → [[lists]] — Same Indexed encoding, different index

**Incoming**
- [[records-indexed-separation]] ← ADDRESSES — Indexed vs plain record clarity

<!-- connections:end -->

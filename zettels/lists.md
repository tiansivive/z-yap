---
tags:
- type-system
- elaboration
- inference
- syntax
- ast
- mechanism
- ffi
- implemented
- sugar
- row-types
- normalization
- testing
---
# Lists

List literals (`type: "list"` in `src/parser/terms.ts`) infer in `src/elaboration/inference/lists.ts`. Element types unify against a fresh element metavar; the core **value** term is `EB.Constructors.Array(row)` which expands to `App("Explicit", Lit(Atom("Array")), Row(...))` (`Constructors.Array` in `src/elaboration/syntax/term.ts`). Labels on that row are decimal strings `"0"`, `"1"`, … from `reduceRight` index `i`.

The **type** is built from `NF.Indexed` / `NF.Constructors.App(NF.Indexed, Lit(Atom("Num")), "Explicit")` then applied with the element type and implicit `Foreign defaultArray` (`lists.ts`), matching snapshots that mention `FFI.Indexed Num` (`src/elaboration/inference/__tests__/__snapshots__/lists.test.ts.snap`).

Homogeneous lists are therefore `Array` + `Indexed Num` + prelude strategy—not open `Schema` row polymorphism. Tuples remain `Struct` over numeric labels via `commonStructInference` (`src/elaboration/inference/tuples.ts`, [[tuples.md]]).

<!-- connections:start -->

## Connections

**Outgoing**
- ENCODES → [[ffi]] — Indexed Num T defaultArray (foreign)
- CONTRASTS_WITH → [[tuples]] — Homogeneous indexed vs heterogeneous positional

**Incoming**
- [[dictionaries]] ← MIRRORS — Same Indexed encoding, different index
- [[records-indexed-separation]] ← ADDRESSES — Indexed vs plain record clarity
- [[row-types.thread]] ← INCLUDES

<!-- connections:end -->

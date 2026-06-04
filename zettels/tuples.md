---
tags:
  - type-system
  - elaboration
  - inference
  - syntax
  - ast
  - row-types
  - sugar
  - concept
  - implemented
  - parser
  - language
  - dependent
---
# Tuples

Parser `tuple` (`src/parser/processors.ts`) labels components with `i.toString()` for index `i` when folding the term row—first field `"0"`, next `"1"`, etc. AST: `{ type: "tuple"; row }`.

Elaboration reuses struct inference: `infer` in `src/elaboration/inference/tuples.ts` delegates to `EB.Struct.commonStructInference` (`structs.ts`). Snapshots show core display like `Struct [ 0: 1, 1: 2 ]` (`src/elaboration/inference/__tests__/__snapshots__/tuples.test.ts.snap`). Types follow the same `Schema` row story as labelled structs, only labels are numeric strings.

Lists are **not** tuples: `list` inference (`lists.ts`) demands homogeneous element unification and produces `Array` + `Indexed Num` typing. Numeric labels here index **heterogeneous** struct fields, not array cells.

Projection uses the same `Proj` typing as records (`projection.ts`).

<!-- connections:start -->

## Connections

**Outgoing**
- DESUGARS_TO → [[structural-records]] — Positional labels
- SPECIALIZES → [[structural-records]] — Numeric labels only

**Incoming**
- [[lists]] ← CONTRASTS_WITH — Homogeneous indexed vs heterogeneous positional
- [[row-types.thread]] ← INCLUDES

<!-- connections:end -->

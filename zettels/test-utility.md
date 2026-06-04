---
tags:
  [
    implemented,
    testing,
    inference,
    elaboration,
    monad,
    parser,
    migration,
    infrastructure,
    reference,
    normalization,
    display,
    unification,
    verification,
    lowering,
  ]
---

# Test utility (`elaborateFrom`)

**Path**: **`src/elaboration/inference/__tests__/util.ts`**.

**`mkParser` / `parseExpr`**: Nearley grammar clone with **`ParserStart: "Ann"`**; **`parseExpr`** throws unless **`results.length === 1`**.

**`elaborateFrom(src)`**:

1. **`EB.resetSupply("meta")`**, **`EB.resetSupply("var")`**, **`EB.resetId()`**, **`NF.resetId()`**
2. Sets **`options.verbose = true`** (`@yap/shared/config/options`)
3. Runs **`EB.V2.Do`**: **`yield* EB.infer.gen(term)`** then **`yield* EB.V2.listen()`** for constraints/metas/types/zonker
4. **`assign`** constraints omit **`trace`** (`lodash/fp` **`omit`**) for snapshot stability
5. On **`Left`**, throws **`EB.V2.display(err)`**

**Return**: **`{ src, displays: { term, type, constraints }, structure: { term, type, constraints, metas, typedTerms }, state, zonker }`** — **`displays`** uses **`EB.Display.Term`**, **`NF.display`**, **`EB.Display.Constraint`**.

**`mkCtx`**: **`Lib.defaultContext()`** from **`@yap/shared/lib/primitives`**.

<!-- connections:start -->

## Connections

**Outgoing**
- USES → [[parser-processors]] — Parses input
- USES → [[elaboration-monad]] — V2.Do pipeline
- USES → [[constraint-solver]] — Solve constraints
- SNAPSHOTS → [[elaboration]] — Pretty + structure output

**Incoming**
- [[snapshot-testing]] ← USES — elaborateFrom
- [[snapshot-testing]] ← PRESERVES — Determinism via resets
- [[v1-test-cleanup]] ← USES — Ported tests use elaborateFrom

<!-- connections:end -->

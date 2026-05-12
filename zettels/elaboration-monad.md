---
tags: [mechanism, elaboration, pattern, code]
---
# Elaboration Monad (V2 Do)

Yap's [[elaboration]] uses a ReaderWriterStateEither monad expressed via generator-based Do notation:

- **Reader** — context: typing environment, current level, implicit scope, module state
- **Writer** — constraints ([[unification]] equations), diagnostics/warnings
- **State** — [[meta-variables|meta]] store (solutions), fresh name supply
- **Either** — elaboration errors (type mismatches, scope errors, ambiguity)

The V2 design uses `yield*` for monadic bind, enabling linear imperative-looking code that is actually pure functional composition:

```typescript
const result = V2.Do(function*() {
  const ty = yield* infer(term)
  const unified = yield* unify(ty, expected)
  return unified
})
```

This replaced V1's deeply nested fp-ts pipe chains. Domain-specific monad instances (Elaboration, Unification, Verification) planned as P0 refactor.

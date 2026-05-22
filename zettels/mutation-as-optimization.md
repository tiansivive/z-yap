---
tags:
- principle
- mutation
- performance
- solver
- verification
- sat
- mechanism
- code
- implementation
---
# Mutation as Optimization

In the solver codebase, raw `let` bindings, `while` loops, and in-place updates are treated as **optimizations**, not as default patterns.

## Principle

1. Write pure first: state-threading, `reduce`, recursion, `match`
2. Profile: identify allocation or GC pressure hotspots
3. Introduce controlled mutation: either via generator effects (see `solver-effect-system.md`) or scoped `let` with clear justification comments
4. Never let mutation leak API boundaries — callers always see pure interfaces

## Justification Threshold

Mutation is warranted when:
- The data structure is inherently mutable (union-find with path compression)
- Allocation pressure from copying exceeds acceptable latency (thousands of iterations)
- The algorithm's published invariants assume in-place updates (watched literal propagation)

## Current Instances

- **Union-find in `cc.ts`**: path compression requires in-place parent rewrites. Purely functional union-find exists but has worse constants and complicates rank balancing.
- **CDCL `backjump`**: snapshotting the full `Map` is acceptable at current scale; if clause count grows, a persistent trie or COW structure would replace it.
- **BCP loop**: currently recursive (`bcp` calls itself); if stack depth becomes an issue, a `while` + mutable worklist is the known fix.

## Anti-pattern

Using `let` or `for` "because it's familiar" or "because the DPLL paper uses pseudocode with mutation." These are not performance arguments. The codebase establishes that algorithm logic should be expressed functionally; mutation is the compiler's job (or the effect interpreter's).

## References

- `solver-effect-system.md` — the generator-based approach
- `src/verification/solver/cnf.ts` — example of pure state-threading for Tseitin
- `src/verification/solver/cdcl/core.ts` — state-threaded CDCL

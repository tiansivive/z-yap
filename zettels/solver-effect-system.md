---
tags:
- effect
- solver
- verification
- sat
- mechanism
- generator
- monad
- speculative
- planned
- code
---
# Solver Effect System (Future Work)

The CDCL and EUF theory modules currently use internal mutability (union-find path compression, trail append, assignment map updates) behind pure API boundaries. This is a performance pragmatism, not a design goal.

## The Problem

Imperative solver code conflates algorithm logic (when to propagate, when to backjump) with state management (how the trail is stored). This makes the solver harder to test, trace, and compose.

## Proposed Solution: Generator-Based Effects

Yap's elaboration layer already uses `Generator<Elaboration<any>, A, any>` as a monadic encoding of stateful computation. The same pattern applies to the solver:

```typescript
type SolverM<A> = Generator<SolverEffect, A, any>;

type SolverEffect =
  | { tag: "assign"; literal: Literal; reason: Clause | "decision" }
  | { tag: "unassign"; literal: Literal }
  | { tag: "learn"; clause: Clause }
  | { tag: "backjump"; level: number }
  | { tag: "propagate" }
  | { tag: "theoryCheck" };
```

Algorithm functions (`bcp`, `analyze`, `decide`) become generators that yield effect intents. A `runSolver` interpreter holds the mutable state and applies effects. This gives:

- **Testability**: inspect the effect trace without running the full solver
- **Separation**: control flow lives in pure generators, state in the interpreter
- **Same performance**: the interpreter still mutates internally
- **Composability**: theory modules yield their own effects, composed via `yield*`

## Current State (M2)

The CDCL core was rewritten to use state-threading (pure functions taking state in, returning new state out). This enforces structural discipline without the generator machinery. The mutation remaining in `cc.ts` (union-find, push/pop) is documented with justification comments.

## When to Implement

When profiling shows the state-threading allocations are a bottleneck (likely at thousands+ clauses), or when theory propagation needs to interleave with CDCL in a way that state-threading makes awkward. The generator pattern is the bridge: it preserves the pure algorithm structure while allowing the interpreter to optimize.

## References

- Yap elaboration monad: `src/elaboration/shared/monad.v2.ts`
- Current CDCL: `src/verification/solver/cdcl/core.ts`
- Current EUF/CC: `src/verification/solver/theories/euf/cc.ts`

<!-- connections:start -->

## Connections

**Incoming**
- [[solver-v2-effect-runtime.adr]] ← REFRAMES — Future-work sketch becomes accepted v2 runtime decision

<!-- connections:end -->

---
tags:
- bugfix
- elaboration
- dependent
- row-types
- type-system
- checking
- inference
- unification
- singleton
- implemented
---
# Sigma checking: infer-then-check preserves bidirectional direction

The `check([struct, Sigma])` case in `src/elaboration/check.ts` infers the struct to get the value row, applies the sigma closure with those values, and re-checks the source struct against the resulting type. This two-pass approach — infer for values, then check for types — preserves the bidirectional checking direction so that cases like `check(1, 1)` (singleton types) fire correctly.

The original implementation inferred the struct, applied the sigma closure, and emitted a constraint between the inferred type and the sigma body. This bypassed bidirectional checking: inference of `1` always produces `Num`, so `Num ~~ 1` failed even when `1 : 1` is valid. Both `{ fst: 1, snd: 1 }` (should pass) and `{ fst: 1, snd: 5 }` (should fail with `5 ≠ 1`) produced the wrong error `Cannot unify 1 with Num`.

The fix delegates to `check(sourceStruct, appliedSigmaBody)`, which dispatches to the `[struct, Schema]` case when the body is a Schema. That case traverses each field and checks individually, letting the singleton check fire. When the body is a meta or other form, the standard check dispatch handles it.

The source struct is elaborated twice: once during inference (for the value row needed by the sigma closure) and once during checking (for the correct elaborated term). A potential optimization would extract values without full inference.

<!-- connections:start -->

## Connections

**Outgoing**
- APPLIES_TO → [[sigma-types]] — Affects sigma checking
- APPLIES_TO → [[sigma-bindings]] — Sigma apply in check path
- RELIES_ON → [[singleton-types]] — Singletons expose the bug
- APPLIES_TO → [[bidirectional-checking]] — Infer-then-constrain loses bidir info

**Incoming**
- [[row-types.thread]] ← INCLUDES — Sigma checking bug

<!-- connections:end -->

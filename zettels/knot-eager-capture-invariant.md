---
tags:
  - bug
  - deferred
  - concern
  - gram
  - lowering
  - recursion
  - closure
  - graph
  - codata
  - label
refs:
  - thread:gram-evolution
  - thread:recursion
  - thread:pipeline-stabilization
  - code:tiansivive/yap#9
---

# Knot capture-order invariant

The record-capturing knot is correct only under one invariant: a record-capturing closure is walked after its record has been allocated. When that holds, a cyclic label lowers to `Read(label, recordVar)` against a bound placeholder and the field is backpatched.

`label-cycles` admits a struct that mixes an eager reference with a lambda-guarded back-reference — `{ a: :b, b: \n -> :a }` — because eager `a→b` plus guarded `b→a` is not an eager-*only* cycle. Emitting the plain field `a` first makes `labelRef` for `:b` find the owner struct unallocated; it falls through to walking `b`'s record-capturing closure before the record exists, and the capture resolves to an out-of-scope variable — the exact failure the knot exists to prevent.

Enforcing the invariant — reject eager references to backpatched fields, or route them through the knotted allocate-then-fill phase — belongs with the coinductive/`ν`-records work that admits recursive record shapes properly. The shape is unreachable from surface syntax while recursive struct types are rejected in elaboration, so the gap is latent rather than a live miscompile.

<!-- connections:start -->

## Connections

**Outgoing**
- DEFERS_TO → [[nu-types]] — Enforcement belongs with recursive-record admission

**Incoming**
- [[gram-evolution.thread]] ← INCLUDES — Capture-order gap in the knot lowering
- [[recursion.thread]] ← INCLUDES — Correctness of recursive-record tying rests on it
- [[pipeline-stabilization.thread]] ← INCLUDES — PR #9 review follow-up
- [[recursive-struct-binding]] ← RELIES_ON — The knot is correct only if capture follows allocation
- [[label-cycle-guardedness]] ← REVEALS — Admitting mixed eager+guarded cycles exposes the gap
- [[nu-on-rows]] ← CONSTRAINS — Admitting constructor-guarded cycles requires enforcing allocate-before-capture

<!-- connections:end -->

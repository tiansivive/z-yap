---
tags:
  - design
  - lowering
  - graph
  - compiler
  - rewriting
  - modality
  - planned
  - needs-design
  - milestone
refs:
  - thread:gram-evolution
---
# PAP analysis as motivator for v2 payload predicates

Partial application analysis is the canonical use case motivating v2's payload predicates and Bindings-derived RHS payloads. v1's [[programmable-gram-passes-mvp.plan]] explicitly defers both features and ships tailcall identification as the demo target instead, because tailcall is a purely structural property and PAP is not.

## Why PAP needs the deferred features

PAP construction discriminates saturated from unsaturated calls. Saturation lives in the foreign reference's `arity` payload (set during translation) and the in-flight `args` count accumulated by `saturate.accumulateAnchor`. Encoding this as a user rule needs:

- LHS payload predicate `p.saturated === false` to match only unsaturated externals.
- RHS payload `(b, host) => { name, arity, args }` derived from the matched `$foreign` node.

v1's locked tag-only LHS and constant `Constructor.payload : JSON` rule out both. A v1-shaped rule that only matched on tags would over-tag every foreign application, producing a wrong-flavoured PAP marker.

## What PAP would look like in v2

Once payload predicates and Bindings-derived payloads land, a user-written PAP rule would mirror `saturate.initial` from `src/GRAM/passes/saturate.ts` — match `$app :func $ref :refers_to $foreign` with the predicate `p.arity !== undefined && p.args < p.arity` on a derived `$ext` node, and construct a `pap` node carrying `{ name, remaining_arity, captured_args }`. The static `saturate` pass keeps doing its work; the user rule layers a backend-facing PAP view on top.

## Position relative to other v2 milestones

PAP analysis stays within the additive-only invariant — it adds a `pap` node and `:represents` (or similar) edge without touching existing structure. It is therefore a clean v2 milestone for the payload-predicate feature, separate from the larger v2 questions of node deletion, redirect, fixpoint strategies, and `where` predicates.

---
tags:
- concept
- type-system
- recursion
- elaboration
- normalization
- unification
- implemented
- inference
- ast
- substitution
- evaluation
- incomplete
---
# Mu types

Equirecursive types — Yap's mechanism for recursive type definitions. A mu type `μα. T` binds a type variable that may appear in its own body, representing types like recursive lists, trees, or self-referential records.

Mu shares the `Abs` node with all other binders, discriminated by `binding.type === "Mu"`. It carries a `source` string for debug/origin labeling. Recursive let-bound definitions wrap their inferred type in a Mu when the definition references itself.

The key evaluation design: mu types stay neutral during NbE. Applying a Mu-binder Abs does not eagerly unfold — it produces a neutral App. This prevents infinite unfolding during normalization. Expansion happens only when needed, specifically during unification, where the unfold-and-recurse strategy drives comparison of recursive types.

Cyclic meta-variable solutions trigger the occurs check; the solver rejects rather than building a μ-type solution. An alternative is to solve cyclic metas as μ-types (`μα. …`), expressing recursive type solutions directly.

See mu-type-unification for the specific equality-checking strategy. See equirecursive-types for the broader design context including bisimulation and fuel-capped approaches.

<!-- connections:start -->

## Connections

**Incoming**
- [[unification]] ← USES — Unfolds mu during structural comparison
- [[equirecursive-types]] ← EXTENDS — Beyond simple unfolding
- [[mu-type-unification]] ← REWRITES — Unfolds and recurses
- [[occurs-check]] ← DETECTS — Cyclic types
- [[equirecursive-types]] ← REWRITES — Unfold-and-recurse during unification
- [[recursion.thread]] ← INCLUDES
- [[nu-types]] ← EXTENDS — Greatest fixed point dual to least fixed point
- [[bisimulation-type-equality]] ← ADDRESSES — Proper equality for mu-wrapped types
- [[inductive-types]] ← EXTENDS — Adds well-foundedness to recursive types
- [[data-declarations]] ← COMPOSES_WITH — Recursive data uses mu wrapping
- [[unified-binder]] ← APPLIES_TO — Mu uses Abs with binding.type Mu
- [[standard-closure]] ← ENABLES — Mu bodies are standard closures
- [[application-evaluation]] ← DISPATCHES_ON — Mu stays neutral, no unfold
- [[dependent-types]] ← INCLUDES — Recursive self-reference
- [[whnf-vs-full-normalization]] ← RELIES_ON — Mu stays neutral
- [[knot-tying]] ← ENABLES — Mu bindings wrap in Neutral
- [[maplist-schema-unification]] ← APPLIES_TO — Mu-type unfolding is likely upstream

<!-- connections:end -->

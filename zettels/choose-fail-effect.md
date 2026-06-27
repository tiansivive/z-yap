---
tags:
  - concept
  - effect
  - language
  - continuation
  - mechanism
  - type-system
  - exploration
  - speculative
  - needs-design
  - semantics
---
# choose/fail effect

Expose non-determinism as two primitive algebraic effects: `choose`, which offers a binary
choice between two alternatives, and `fail`, which signals no result. A handler over these
effects determines what happens with the choices — the search strategy is not baked into
the language but is user-selectable (see [[nondet-handler]]).

The interface is deterministic from the caller's perspective: a function using `choose` and
`fail` has a result type that does not mention non-determinism directly. The handler at the
call site introduces and manages multiplicity.

This is grounded in [[filinski-representation-theorem]]: multi-shot [[shift-reset]] can
represent the list monad, so `choose`/`fail` can be realized as effects over the
continuation substrate. Non-determinism is derived, not primitive.

Functional patterns under the narrowing reading are a client of this effect: a
functional-pattern clause desugars to a `choose`/`fail` computation that enumerates the
constructor preimages of the scrutinee, with the clause body as the continuation resumed
per solution (see [[functional-patterns]], [[two-tier-pattern-compilation]]).

A sound surface design requires the shift/reset typing discipline to be settled before this
effect can be typed — see [[missing-spec-shift-reset]].

<!-- connections:start -->

## Connections

**Outgoing**
- USES → [[shift-reset]] — continuation substrate for the effect
- GROUNDED_IN → [[filinski-representation-theorem]] — derivability theorem
- COMPOSES_WITH → [[nondet-handler]] — handler interprets and gives semantics to the effect
- ENABLES → [[functional-patterns]] — narrowing reading uses choose/fail as substrate
- CONTRASTS_WITH → [[nondeterminism-multishot]] — effect-based handler approach vs built-in replay
- REQUIRES → [[missing-spec-shift-reset]] — shift/reset typing must be settled before this can be typed

**Incoming**
- [[functional-patterns]] ← REQUIRES — narrowing reading requires a non-determinism substrate
- [[filinski-representation-theorem]] ← ENABLES — grounds choose/fail as derivable over shift/reset
- [[nondet-handler]] ← USES — interprets these two effects
- [[call-time-choice]] ← APPLIES_TO — property of non-determinism in a strict language
- [[narrowing-vs-residuation]] ← REQUIRES — narrowing reading requires a non-determinism substrate
- [[two-tier-pattern-compilation]] ← USES — narrowing reading for functional-pattern positions
- [[sprite]] ← INSPIRES — Fair Scheme motivates the handler abstraction
- [[pull-tab]] ← CONTRASTS_WITH — lazy graph propagation vs strict effect-based nondet
- [[delimited-continuations.thread]] ← INCLUDES

<!-- connections:end -->

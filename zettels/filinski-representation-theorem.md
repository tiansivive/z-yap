---
tags:
  - reference
  - paper
  - continuation
  - concept
  - type-system
  - principle
  - monad
  - semantics
  - language
  - effect
---
# Filinski's representation theorem

Filinski (POPL 1994, *Representing Monads*) proved that composable multi-shot delimited
continuations together with a top-level reflection primitive are sufficient to represent
any monad. Concretely: `shift`/`reset` plus `reify`/`reflect` can encode the list monad
(non-determinism), the state monad, the exception monad, and their combinations, without
language-level support for each.

The practical consequence: a language with multi-shot delimited control does not need
built-in non-determinism, backtracking, or state primitives — they can all be derived as
library constructs over the continuation substrate.

This is the theoretical anchor for [[choose-fail-effect]]: the design proposition that
non-determinism can be exposed as a user-facing algebraic effect over a [[shift-reset]]
substrate, rather than as a built-in evaluation strategy.

<!-- connections:start -->

## Connections

**Outgoing**
- ENABLES → [[choose-fail-effect]] — grounds choose/fail as derivable over shift/reset
- GROUNDED_IN → [[shift-reset]] — multi-shot shift/reset is the substrate

**Incoming**
- [[choose-fail-effect]] ← GROUNDED_IN — derivability theorem
- [[delimited-continuations.thread]] ← INCLUDES

<!-- connections:end -->

---
tags:
  - concept
  - mechanism
  - continuation
  - compiler
  - language
  - semantics
  - runtime
  - consistency
  - rewriting
  - graph
---
# Choice fingerprints

When a [[pull-tab]] step propagates a choice node upward through a shared graph, the same
choice appears in multiple sub-expressions simultaneously — clones with identical intent but
physically distinct nodes. If one branch of a computation reduces the left alternative of a
clone, consistency requires all other clones of the same choice in that branch to also take
the left alternative. Violating this produces computations that simultaneously assume
contradictory values for the same shared binding.

Choice fingerprints enforce this consistency: each choice node carries a unique identifier
(assigned fresh on replacement, copied on pull-tab). Every expression in the work queue
carries a *fingerprint* — a map from choice identifier to `{left, right, either}`. When
evaluating a cloned choice, the fingerprint entry for its identifier determines which
alternative to take. Expressions with contradictory fingerprints are discarded from the
queue before they produce results. The mechanism is described in [[sprite]].

The problem fingerprints solve is specific to lazy graph sharing: a single binding node can
be reached from multiple in-progress computations and evaluated independently. In a strict,
let-bound language, [[call-time-choice]] forces a shared binding to one value before the
body executes — no clone is ever created, so no consistency tracking is needed. Fingerprint
overhead is an artifact of lazy non-determinism, not an inherent cost of non-deterministic
computation.

<!-- connections:start -->

## Connections

**Outgoing**
- ADDRESSES → [[pull-tab]] — consistency problem created by pull-tab choice cloning
- REFERENCES → [[sprite]] — described in Sprite
- CONTRASTS_WITH → [[call-time-choice]] — lazy setting needs fingerprints; strict setting doesn't

**Incoming**
- [[call-time-choice]] ← ADDRESSES — strictness avoids the fingerprinting problem entirely
- [[sprite]] ← INTRODUCES — clone-consistency enforcement
- [[pull-tab]] ← MOTIVATES — creates cloned choice nodes that need consistency tracking

<!-- connections:end -->

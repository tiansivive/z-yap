---
tags:
  - continuation
  - lowering
  - graph
  - ir
  - mechanism
  - implemented
  - compiler
---
# Shift/reset enrichment pass (GRAM)

Adds semantic annotations for delimited continuation structure without imposing operational sequencing.

## What the pass adds

- **`bubble`** — marks the resumption point (where a `shift` captures to). Carries the binder name of the captured value.
- **`continuation`** — represents the captured continuation `k`. Edges: `:captured_at` → shift node, `:delimiter` → enclosing reset, `:handler` → shift body lambda, `:param` → bubble.
- **`resumption`** — expands each k-call (application of the continuation). Edges: `:invokes` → continuation, `:arg` → argument value.

## Design principle

The pass does NOT produce blocks, jumps, or state machines. It annotates *what is captured* and *what invokes what* — pure data-dependency structure. Two resumptions feeding a primop have no ordering edge between them; a sequential backend serializes, a parallel backend forks.

## Contrast with MIR

MIR shift/reset lowering produces entry/s_init/r/s_i/reset_exit blocks with explicit Jump terminators. That sequencing is a backend choice, not an IR property. The GRAM pass preserves the freedom for backends to choose their own operational strategy.

<!-- connections:start -->

## Connections

**Outgoing**
- IMPLEMENTS → [[gram]] — Pipeline pass
- IMPLEMENTS → [[shift-reset]] — In GRAM context
- CONTRASTS_WITH → [[shift-reset-mir-lowering]] — Annotation vs state machine
- PRESERVES → [[shift-reset]] — reset/shift nodes unchanged
- INSTANTIATES → [[gram-additive-enrichment]] — Adds bubble/continuation/resumption alongside existing nodes
- INSTANTIATES → [[gram-dataflow-semantics]] — Resumptions unordered
- FOLLOWS → [[saturation]] — Pipeline order

**Incoming**
- [[gram-pattern-pass]] ← FOLLOWS — Pipeline ordering
- [[gram]] ← INCLUDES — Pipeline pass
- [[gram-to-mir-bridge]] ← RELIES_ON — Needs continuation structure
- [[gram-interpreter]] ← ENABLES — Tests continuation semantics
- [[dpo-vs-imperative-passes]] ← APPLIES_TO — Shift-reset pass is imperative/aggregate
- [[delimited-continuations.thread]] ← INCLUDES
- [[gram-evolution.thread]] ← INCLUDES
- [[bubble-semantics]] ← COMPOSES_WITH — GRAM already has bubble concept; aligns vocabulary
- [[two-tier-pattern-compilation]] ← USES — existing lowering path for the functional-pattern tier

<!-- connections:end -->

---
tags:
- continuation
- lowering
- graph
- ir
- mechanism
- implemented
---

# Shift/reset enrichment pass (GRAM)

**Code:** `src/GRAM/passes/shift-reset.ts`. Pipeline position: after `saturate`, before `pattern`.

Adds semantic annotations for delimited continuation structure without imposing operational sequencing:

- **`bubble`** — marks the resumption point (where a `shift` captures to). Carries the binder name of the captured value.
- **`continuation`** — represents the captured continuation `k`. Edges: `:captured_at` → shift node, `:delimiter` → enclosing reset, `:handler` → shift body lambda, `:param` → bubble.
- **`resumption`** — expands each k-call (application of the continuation). Edges: `:invokes` → continuation, `:arg` → argument value.

The pass does NOT produce blocks, jumps, or state machines. It annotates *what is captured* and *what invokes what* — pure data-dependency structure. Two resumptions feeding a primop have no ordering edge between them; a sequential backend serializes, a parallel backend forks.

Contrast with MIR shift/reset lowering: MIR produces entry/s_init/r/s_i/reset_exit blocks with explicit Jump terminators. That sequencing is a backend choice, not an IR property.

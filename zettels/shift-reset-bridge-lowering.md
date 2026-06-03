---
tags:
  [
    continuation,
    lowering,
    gram,
    mir,
    bridge,
    compiler,
    codegen,
    mechanism,
    implemented,
    ir,
    backend,
    effect,
    pattern,
    rewriting,
    infrastructure,
    state-machine,
    runtime,
    structural,
    block,
    jump,
  ]
---
# Shift/Reset bridge lowering

Implementation site: `src/GRAM/bridge/continuations.ts`. Entry from `GRAM.Bridge.emit` (`src/GRAM/bridge/emit.ts`) when the bridge walker encounters a `Reset` or `Resume` node identified by `Tags.Reset` / `Tags.Resume`. The pass `src/GRAM/passes/shift-reset.ts` is the GRAM enrichment that prepares the graph for this lowering by attaching the continuation context node and capture set.

`reset` (top-level export) walks the body when no continuation context attaches; otherwise it materialises a block-and-jump state machine over the resume sites: a `pre` block allocates the capture environment and the continuation record (`Instr.Alloc` of a `Record` carrying `__env`), an `s_init` entry block, an `r` block parameterised by `(v, env, idx)` for the post-reset continuation, one `s_i` block per resume site, and a `reset_exit` block consumed by surrounding control flow.

The continuation environment is reconstructed by `Instr.Read` of each captured label off the env record before re-binding to the in-scope name; the bubble parameter (the EB `Bubble` constructor materialised in elaboration) supplies the value flow into `r`. The terminator at `r` is `Terminator.Jump(reset_exit, [result])` when no resume sites exist and `Terminator.Branch(idx_param, cases)` when one or more resume sites exist.

`resume` lowers each in-body `App(k, arg)` to a `let kr = arg` (passing the argument through a fresh name) and produces the index of the resume site as the case selector consumed by the `Branch` at `r`. Index assignment is sequential and stable per `Resume` node order in the graph.

The state machine uses **`Alloc` / `Read` / `Jump` / `Branch` only** — there is no dedicated MIR opcode for continuation invocation. This is the same primitive set used by closure conversion (`src/GRAM/bridge/closures.ts`) and pattern compilation (`src/GRAM/bridge/decisions.ts`), so the same backends consume all three uniformly.

Shape preserved from D-004: the lowering is direct-style; there is no continuation-passing translation, no first-class continuation value, no separate resume opcode. The move from `src/lowering/continuations/` to `src/GRAM/bridge/continuations.ts` is a site move, not a shape change.

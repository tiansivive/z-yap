---
tags:
  [
    continuation,
    optimization,
    gram,
    pass,
    usage,
    linearity,
    quantity,
    static-analysis,
    deferred,
    planned,
    design,
    performance,
    backend,
    lowering,
    bridge,
    mechanism,
    compiler,
    rewriting,
    representation,
    runtime,
  ]
---
# Single-shot static specialisation

Multishot resume in the bridge ([[multishot-bridge-serialization]]) is the conservative shape: heap-allocated env, indexed resumes, `Terminator.Branch` over `s_i` blocks. When the continuation is used at most once, the env record, the index, and the branch are all unnecessary — a single `Jump` to a single resume block suffices.

Single-shot specialisation rewrites a `Reset` subgraph with a unique `Resume` neighbour whose usage is provably `≤ 1` into a flat block-and-jump shape: the captured values stay in the surrounding scope (no env allocation), the continuation record is elided, and the resume site lowers to `Terminator.Jump(s, [v])` without a `Branch` dispatch. The post-resume block parameters drop the `idx` and `env` params; the env is replaced by lexical capture.

This is a **graph pass**, not a bridge change. The pass attaches a `singleshot` tag to the `Reset` node when (a) the `Resume` count is exactly one and (b) the QTT-derived usage on the continuation parameter is `≤ 1`. The bridge reads the tag and selects the specialised emission shape. The unspecialised path remains the default; the pass is opt-in via the same mechanism programmable GRAM passes ([[programmable-gram-passes]]) use to activate transformations.

Dependencies:
- Usage analysis ([[usage-semantics]]) producing a continuation-parameter usage upper bound. The QTT-style quantity dimension on `Modal.Annotations` is the carrier.
- Linearity-aware capture set: the pass must distinguish "captured but used after resume" from "captured and consumed during resume" so that lexical capture is sound.
- The GRAM Kernel pass ([[gram-kernel-pass]]) discovers and orders the specialisation rule alongside other user and stdlib rules.

Boundary: the specialisation only fires when usage is statically provable. Resumes whose count is data-dependent (e.g. inside a recursive function whose call count is unknown) stay on the multishot path. The fallback shape is correct, so the pass is purely performance-improving — never required for soundness.

Status: planned. The pass lives downstream of [[programmable-gram-passes-mvp.plan]] and consumes the quantity dimension once usage analysis lands.

<!-- connections:start -->

## Connections

**Outgoing**
- APPLIES_TO → [[multishot-bridge-serialization]] — Specialises the conservative multishot shape when usage allows
- RELIES_ON → [[usage-semantics]] — Needs continuation-parameter usage upper bound
- RELIES_ON → [[programmable-gram-passes]] — Realised as a programmable GRAM pass
- RELIES_ON → [[gram-kernel-pass]] — Kernel meta-pass orders the specialisation rule
- CONSUMES → [[modality-system]] — Reads the quantity dimension off Modal.Annotations

**Incoming**
- [[delimited-continuations.thread]] ← INCLUDES — Planned optimisation in the thread
- [[static-partial-evaluation]] ← RELIES_ON — Pass-driven specialisation example
- [[static-partial-evaluation]] ← GENERALIZES — A specific instance of the general pattern

<!-- connections:end -->

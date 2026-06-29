---
tags:
  - planned
  - needs-design
  - concept
  - decision
  - compiler
  - codegen
  - backend
  - mir
  - closure
  - package
  - infrastructure
  - distribution
---

# Compilation ABI selection

Different compilation targets may require different **calling conventions** for the same semantic program — how closure values are represented, how partial application is materialized, and how indirect calls dispatch.

**Bundle convention** — function pointer plus environment record (`{ __fn, __env }`), with captures read from the env inside the lifted function body.

**Lifting convention** — top-level functions with captures passed as explicit extra parameters at every call and return site, avoiding heap-allocated env records.

**Native convention** — target source preserves host lambdas and lexical capture (JavaScript, Erlang), with minimal or no closure conversion in the emitted IR.

[[compilation-by-selection]] assigns these preferences per backend at the GRAM pass level: C wants lifting and bundle paths; JS and Erlang prefer native closures; GPU/HVM paths diverge further. D-006 ([[gram-canonical-ir.adr]]) currently routes all targets through one bridge emission into a single [[mir]] shape consumed identically by JS, C, and Erlang codegen — a deliberate stabilisation choice that defers backend-specific ABI divergence.

The open design question is reconciliation at **package and module boundaries**: when a project selects a target (or multiple targets), when dependencies mix backends, and when programmable GRAM passes change representation locally — how is ABI choice declared, composed, and kept coherent across linked units? [[package-artifact-distribution]] defines what ships in an installable artifact; ABI selection defines what calling convention that artifact assumes downstream code must speak.

<!-- connections:start -->

## Connections

**Outgoing**
- ADDRESSES → [[compilation-by-selection]] — Backend-specific convention choice
- ADDRESSES → [[package-artifact-distribution]] — Package boundary must carry ABI assumptions
- CONTRASTS_WITH → [[mir]] — Single MIR contract vs per-target conventions
- RELIES_ON → [[closures]] — Closure representation is the primary ABI fork

**Incoming**
- [[global-pending-queue]] ← INCLUDES — Deferred design discussion

<!-- connections:end -->

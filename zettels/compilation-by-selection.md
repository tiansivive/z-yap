---
tags:
- concept
- compiler
- backend
- codegen
- decision
- graph
- ir
- lowering
- mir
---

# Compilation by selection

Architecture: GRAM enriches the graph maximally — all semantic and operational views coexist (via additive enrichment). Each backend declares which passes produce the information it needs. Codegen becomes mechanical graph reading.

**Backend-specific pass selection:**
- **JS** — needs saturation (primops), pattern decision trees. Does NOT need lambda lifting, closure conversion, or CRUD modes (GC handles sharing, spread for updates). Reads `switch`/`leaf` for control flow, `external`/`primop` for calls.
- **C** — needs full closure conversion + lambda lifting + saturation + CRUD modes (malloc strategy from `shared`/`exclusive`). Reads `env`/`closure`/`func` nodes for allocation, decision trees for switch statements, `:access_mode` for update codegen.
- **HVM** — needs NONE of the operational passes. Reads raw lambdas, applications, and pattern structure directly. Optimal reduction handles the rest. Ignores CRUD modes entirely.
- **Erlang** — needs pattern compilation (for case clauses) and saturation, but not closure conversion (native closures with capture). CRUD modes informational (persistent data structures handle sharing natively).
- **GPU** — needs lambda lifting + defunctionalization + CRUD modes (`exclusive` enables register-local mutation). No closures, no heap allocation where avoidable.

**Why this works:** Additive enrichment means running "extra" passes is harmless — nodes a backend doesn't need are simply never read. No pass invalidates another pass's output. The graph is a superposition of all views; each backend collapses it to what it needs.

**Contrast with MIR:** MIR is a single fixed representation (SSA blocks) that all backends must consume identically. Backend differences are handled *after* MIR, in codegen. GRAM pushes backend divergence earlier — into pass selection.

<!-- connections:start -->

## Connections

**Outgoing**
- RELIES_ON → [[gram-additive-enrichment]] — Requires accumulated views
- RELIES_ON → [[gram-dataflow-semantics]] — Requires independence
- ADDRESSES → [[closure-conversion]] — Backend-specific (C yes, JS no)
- ADDRESSES → [[defunctionalization]] — Backend-specific (GPU yes, JS no)
- ADDRESSES → [[native-lambda-hvm]] — Backend-specific (HVM skips all)
- CONTRASTS_WITH → [[mir]] — Pass selection vs fixed representation

**Incoming**
- [[gram-graph-ir.adr]] ← MOTIVATES — Property follows from graph substrate
- [[gram-additive-enrichment]] ← ENABLES — Multiple views enable selection
- [[gram-dataflow-semantics]] ← ENABLES — Independence enables selectivity
- [[gram-interpreter]] ← MIRRORS — Interpretation-by-selection dual
- [[stg-analogy]] ← INSPIRES — Selective = improvement over GHC's fused approach
- [[gram-evolution.thread]] ← RELIES_ON — Backend selection architecture
- [[gram-crud-enrichment]] ← INSTANTIATES — Backends choose whether to read modes
- [[lambda-lifting]] ← ENABLES — C/GPU need it, JS/Erlang skip it
- [[compilation-abi-selection]] ← ADDRESSES — Backend-specific convention choice

<!-- connections:end -->

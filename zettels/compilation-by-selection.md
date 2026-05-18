---
tags:
- concept
- compiler
- backend
- codegen
- decision
- graph
- ir
---

# Compilation by selection

Architecture: GRAM enriches the graph maximally — all semantic and operational views coexist (via additive enrichment). Each backend declares which passes produce the information it needs. Codegen becomes mechanical graph reading.

**Backend-specific pass selection:**
- **JS** — needs saturation (primops), pattern decision trees. Does NOT need lambda lifting or closure conversion (native closures). Reads `switch`/`leaf` for control flow, `external`/`primop` for calls.
- **C** — needs full closure conversion + lambda lifting + saturation. Reads `env`/`closure`/`func` nodes for allocation, decision trees for switch statements.
- **HVM** — needs NONE of the operational passes. Reads raw lambdas, applications, and pattern structure directly. Optimal reduction handles the rest.
- **Erlang** — needs pattern compilation (for case clauses) and saturation, but not closure conversion (native closures with capture).

**Why this works:** Additive enrichment means running "extra" passes is harmless — nodes a backend doesn't need are simply never read. No pass invalidates another pass's output. The graph is a superposition of all views; each backend collapses it to what it needs.

**Contrast with MIR:** MIR is a single fixed representation (SSA blocks) that all backends must consume identically. Backend differences are handled *after* MIR, in codegen. GRAM pushes backend divergence earlier — into pass selection.

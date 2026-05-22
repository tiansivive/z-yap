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

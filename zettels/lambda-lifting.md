---
tags:
- mechanism
- graph
- ir
- lowering
- compiler
- closure
- backend
- codegen
- planned
---

# Lambda lifting

GRAM enrichment that promotes closures to top-level functions with extra captured-variable parameters. Eliminates the need for heap-allocated closure environments at the cost of wider function signatures.

**Mechanism:**
1. Identify closure nodes (already tagged by closure conversion pass with `env`/`capture` edges).
2. For each closure: collect its free variables (captured bindings).
3. Emit a top-level `func` node with the captured variables prepended as extra parameters.
4. Replace closure call sites with direct calls passing the captured values explicitly.

**GRAM representation:**
- `:lifts_to` edge from the original `closure` node to the new top-level `func`.
- The lifted `func` has additional `:param` edges for captured variables.
- Original `closure`/`env` nodes remain (additive enrichment) — backends that prefer closures (JS, Erlang) ignore the lifted version.

**Backend relevance:**
- **C** — needs lambda lifting. No native closures; all functions must be top-level with explicit args.
- **JS** — skips. Native closures with lexical capture.
- **Erlang** — skips. Native funs with capture.
- **HVM** — skips. Optimal reduction handles lambdas directly.
- **GPU** — needs. Kernel functions must be top-level, no heap allocation for environments.

**Builds on:** Closure conversion pass (which identifies captures). Lambda lifting consumes the `env`/`capture` structure and promotes it to explicit parameters.

**Contrast with defunctionalization:** Lambda lifting keeps functions as functions (just with wider signatures). Defunctionalization replaces functions with tagged data and a dispatch loop. Both eliminate closures but produce different code shapes. A backend might want one, the other, or neither.

**Contrast with closure conversion:** Closure conversion makes captures *explicit* but still heap-allocates an environment. Lambda lifting eliminates the heap allocation entirely by passing captures as parameters. Lambda lifting is strictly "further" than closure conversion in the pipeline.

<!-- connections:start -->

## Connections

**Outgoing**
- COMPOSES_WITH → [[closure-conversion]] — Builds on identified captures
- FOLLOWS → [[closure-conversion]] — Strictly further in pipeline
- CONTRASTS_WITH → [[defunctionalization]] — Lifting keeps fns; defunc replaces with data
- APPLIES_TO → [[gram]] — GRAM enrichment pass
- ENABLES → [[compilation-by-selection]] — C/GPU need it, JS/Erlang skip it
- INSTANTIATES → [[gram-additive-enrichment]] — lifts_to edge, original closure remains
- MIRRORS → [[mir]] — MIR expects top-level functions

**Incoming**
- [[gram-next-steps]] ← INCLUDES — Planned pass (phase 4)
- [[gram-evolution.thread]] ← INCLUDES

<!-- connections:end -->

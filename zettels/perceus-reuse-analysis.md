---
tags:
- paper
- research
- reference
- lowering
- runtime
- performance
- compiler
- memory
- refcounting
- reuse
- allocation
---

# Perceus — garbage-free reference counting with reuse (2021)

Koka's advanced compilation method for reference counting. Achieves garbage-free memory management without a GC or runtime system.

**Key mechanisms:**
- **Precise reference counting** — only live references retained in cycle-free programs. Drop/dup pairs inserted automatically.
- **Reuse analysis** — when a constructor is deconstructed and its refcount drops to 1, its memory slot can be reused for the next allocation of the same size. A "reuse token" flows as a value through the program.
- **Constructor contexts** — first-class data structures with "holes" that enable top-down construction without intermediate allocations.
- **`fip`/`fbip` annotations** — function-level guarantees. `fip`: no allocation, constant stack. `fbip`: functional-but-in-place, no allocation when arguments are unique.

**Contrast with Yap:**
- Perceus derives uniqueness at *runtime* (refcount == 1). Yap knows it at *compile time* via QTT multiplicities.
- Perceus is a *compiler analysis* (post-hoc). Yap's approach is *type-directed* (elaboration-time).
- Reuse tokens are a program-level value in Koka. In GRAM they'd be graph edges (`:reuse`) — no runtime token passing needed when multiplicity guarantees uniqueness statically.

**What Yap can learn:**
- The *reuse analysis pattern* (same-shape destruct/construct → reuse) applies regardless of how uniqueness is determined.
- Constructor contexts (top-down building) are orthogonal to uniqueness — useful even with static guarantees.

**References:** Reinking et al., "Perceus: Garbage Free Reference Counting with Reuse" (ICFP 2021). Lorenzen et al., "FP²: Fully in-Place Functional Programming" (2023).

<!-- connections:start -->

## Connections

**Outgoing**
- INSPIRES → [[crud-strategy-choice]] — Research input to strategy decision
- INSPIRES → [[reuse-analysis-strategy]] — Reuse tokens concept
- INSPIRES → [[constructor-context-strategy]] — Constructor contexts concept
- INSPIRES → [[gram-crud-enrichment]] — FBIP concept adapted for graph IR
- EXTENDS → [[koka-influence]] — Perceus is part of Koka ecosystem
- CONTRASTS_WITH → [[modalities]] — Runtime refcount vs compile-time QTT
- CONTRASTS_WITH → [[counting-immutable-beans]] — Same problem, different mechanisms

**Incoming**
- [[counting-immutable-beans]] ← CONTRASTS_WITH — Lean vs Koka: different RC strategies
- [[clean-uniqueness-types]] ← CONTRASTS_WITH — Type-level vs runtime analysis
- [[koka-influence]] ← INSPIRES — Same ecosystem

<!-- connections:end -->

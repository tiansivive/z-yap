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
- ownership
---

# Counting Immutable Beans — Ullrich & de Moura (2019)

Reference counting optimized for purely functional programming. Lean 4's foundational memory management strategy.

**Key mechanisms:**
- **`reset` instruction** — marks an object for potential reuse. If refcount == 1 at runtime, memory is available; else deep-copy.
- **`reuse` instruction** — allocates from a previously reset slot (same size). Avoids heap allocation when possible.
- **Borrow annotations** — heuristically inferred to reduce refcount increment/decrement pairs. Borrowed references don't need inc/dec.
- **Linear treatment of struct/union values** — each value used exactly once per execution branch, enabling safe reuse.

**Implementation in Lean 4:**
- λPure → λRc transformation inserts RC operations.
- ResetReuse pass (recently migrated from IR to LCNF, Feb 2026) identifies reuse opportunities.
- Lean 4.30.0 (April 2026) reflects ongoing compiler refinement.

**Contrast with Yap:**
- Lean derives uniqueness at *runtime* (refcount == 1 branch). Yap knows via QTT multiplicities at *compile time*.
- Lean's `reset`/`reuse` is an IR-level instruction pair. In GRAM this maps to a `:reuse` edge between destruct and construct nodes — declarative rather than imperative.
- Lean does this *without* type-level linearity tracking. Yap has the type information but doesn't yet enforce it end-to-end.

**What Yap can learn:**
- The `reset`/`reuse` pattern is elegant as a graph enrichment: mark "this construction can reuse that destruction's memory."
- Borrow annotations map to Yap's Zero multiplicity — a zero-usage binding doesn't need RC operations at all.
- The runtime branch (`refcount == 1 ? mutate : copy`) is the fallback when static multiplicity is unknown — Yap's conservative default.

**References:** Ullrich & de Moura, "Counting Immutable Beans: Reference Counting Optimized for Purely Functional Programming" (IFL 2019, arXiv:1908.05647).

<!-- connections:start -->

## Connections

**Outgoing**
- INSPIRES → [[crud-strategy-choice]] — Research input
- INSPIRES → [[reuse-analysis-strategy]] — reset/reuse model
- INSPIRES → [[gram-crud-enrichment]] — Graph-level reuse edges
- CONTRASTS_WITH → [[modalities]] — Runtime uniqueness vs compile-time QTT
- CONTRASTS_WITH → [[perceus-reuse-analysis]] — Lean vs Koka: different RC strategies
- CONTRASTS_WITH → [[clean-uniqueness-types]] — Runtime analysis vs type-level guarantee

**Incoming**
- [[perceus-reuse-analysis]] ← CONTRASTS_WITH — Same problem, different mechanisms
- [[clean-uniqueness-types]] ← CONTRASTS_WITH — Type-level vs runtime analysis

<!-- connections:end -->

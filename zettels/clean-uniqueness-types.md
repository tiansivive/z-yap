---
tags:
- paper
- research
- reference
- type-system
- modality
- ownership
- uniqueness
- mutation
- performance
- compiler
- data-access
---

# Clean uniqueness types

Clean's approach to safe destructive update in a pure functional language via uniqueness typing.

**Mechanism:** A type annotated `*T` guarantees exactly one reference exists at the point of use. The runtime may destructively update the value without violating referential transparency — no other observer can see the mutation.

**Key properties:**
- **Whole-object granularity** — `*Record` means the entire record is unique, not individual fields.
- **Transparent** — code that doesn't use uniqueness annotations works unchanged. Uniqueness is opt-in.
- **Threading** — unique values must be explicitly threaded through computation. Pattern match to extract, update, return the same reference.
- **Nested limitation** — unique fields within unique records require careful `replace`/`select` pairs. Deep nested updates are syntactically heavy.

**Contrast with Yap:**
- Clean: whole-object (`*Record`). Yap: per-binding, graded (`Zero`/`One`/`Many`) — finer granularity.
- Clean: binary (unique or not). Yap: semiring (Zero = erased, One = linear, Many = shared) — richer information.
- Clean: uniqueness is a type-level property. Yap: multiplicity is a *modality* on binders, not a type constructor.
- Clean: nested unique fields are awkward. Yap's row-level types could enable per-field multiplicity (speculative).

**What Yap can learn:**
- Clean proves that whole-object uniqueness → safe destructive update works in practice for purely functional languages.
- The "transparent" property is desirable — non-linear code shouldn't need to care about the multiplicity system.
- Per-field granularity (which Clean lacks) is a potential Yap advantage worth exploring alongside row-level modalities.

**References:** Barendsen & Smetsers, "Uniqueness Typing for Functional Languages" (1993). Clean language manual §11.

<!-- connections:start -->

## Connections

**Outgoing**
- INSPIRES → [[crud-strategy-choice]] — Research input
- INSPIRES → [[mode-annotation-strategy]] — Whole-object uniqueness → per-field in Yap
- INSPIRES → [[gram-crud-enrichment]] — Uniqueness → safe mutation precedent
- INSPIRES → [[modalities]] — Uniqueness typing as prior art for QTT
- CONTRASTS_WITH → [[modalities]] — Whole-object binary vs per-binding graded
- CONTRASTS_WITH → [[perceus-reuse-analysis]] — Type-level vs runtime analysis
- CONTRASTS_WITH → [[counting-immutable-beans]] — Type-level vs runtime analysis

**Incoming**
- [[counting-immutable-beans]] ← CONTRASTS_WITH — Runtime analysis vs type-level guarantee

<!-- connections:end -->

---
tags:
- concept
- type-system
- recursion
- language
- exploration
- needs-design
- principle
- speculative
- evaluation
- normalization
---
# Codata vs coinductive types

Codata and coinductive types are related but distinct concepts. Coinductive types (`ν X. F(X)`) are the greatest fixed point of a type operator — the dual of inductive types (`μ X. F(X)`). They characterize potentially infinite structures that must be productive (every observation must terminate). Coinductive types are a type-theoretic construct with formal properties: bisimulation-based equality, productivity obligations, guardedness conditions.

Codata is a programming paradigm: data defined by observations (eliminators/destructors) rather than constructors. A stream is codata because it is defined by `head` and `tail`, not by base cases. Copatterns are the natural way to define codata — specifying what each observation returns.

Every coinductive type gives rise to codata (its observations are the elimination forms), but codata as a programming concept does not require the full coinductive type machinery. A record with computed fields `{ width: 10, area: &width * 2 }` is codata in spirit — defined by its observations (field projections) — but involves no recursive unfolding and no productivity obligation.

For Yap, the immediate use case is codata records: records whose fields can refer to other fields (or to the record itself) as a self-referencing mechanism. The rectangle example is a degenerate non-recursive case. The stream `{ ones: { head: 1, tail: &ones } }` is the productive recursive case. Both are codata — defined by their projections.

Whether Yap needs full coinductive types at the type level — `ν X. F(X)` as a first-class type former with bisimulation equality and productivity checking — is a separate, larger commitment. Nu types as currently sketched in [[nu-types]] sit between these: they co-opt the greatest-fixed-point machinery for codata records rather than committing to coinductive types as a type-theoretic primitive. The implementation path starts with codata records (the practical need) and defers coinductive type theory (the theoretical generalization).

<!-- connections:start -->

## Connections

**Outgoing**
- DETAILS → [[codata]] — Distinguishes codata paradigm from coinductive types
- DETAILS → [[coinductivity]] — Coinductive type theory side
- DETAILS → [[nu-types]] — Where nu sits between codata and coinductivity
- APPLIES_TO → [[structural-records]] — Records as codata via projections

**Incoming**
- [[sigma-codata-syntax-proposal]] ← RELIES_ON — Codata vs full coinductivity informs scope
- [[recursion.thread]] ← INCLUDES — Codata vs coinductive types

<!-- connections:end -->

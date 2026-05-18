---
tags:
- thread
- modality
- multiplicity
- type-system
- elaboration
- verification
---
# Usage Semantics

QTT-adjacent multiplicities (Zero/One/Many), modal representation, usage inference,
and enforcement. From surface annotations through elaboration's Modal wrappers to
verification's liquid refinements. The central tension: usage constraints are commented
out everywhere, and modalities are stripped from inferred types.

## Sequence

1. **Modal representation** [[modalities]] — incomplete
   Surface usage qualifiers + liquid refinements -> Modal in EB/NF. Semiring
   multiplicities. Inference threads Q.Usages but strips modal wrappers from
   synthesized types.

2. **Modality drift** [[modality-drift]] — documented
   Central "where things live" tension: EB, NF, inference, verification alignment.

3. **QTT usage collection** [[qtt-usage-collection]] — deferred
   Wire `usage` constraints into solver; uncomment `tell` sites.

4. **Usages deferred** [[usages-deferred]] — deferred
   Same deferred-solver story as QTT collection.

5. **Modality enforcement** [[modality-enforcement]] — needs-design
   Aggregates solver + verification + context gaps. Wire usage constraints,
   align variable lookup / sigma multiplicity.

6. **Modality polymorphism** [[modality-polymorphism]] — needs-design
   Graded info through solving, policy on stripModalities. Depends on
   enforcement + zonking.

7. **Effects as modality** [[effects-as-modality]] — speculative
   No mapping from effects to graded modalities today. Points at shift-reset
   lowering as separate mechanism.

8. **QTT paper** [[idris-1-qtt-paper]] — reference
   Brady's QTT paper. Yap's multiplicity types live in the same neighbourhood.

---
tags:
  - proposal
  - question
  - meta
  - verification
  - solver
  - needs-design
---
# Should D-001 carry a "stay on Z3" rejected-alternative companion?

[[z3-replacement.adr]] (D-001) records the positive decision to build an in-tree IVL + CDCL(T) stack and retire `z3-solver` as the primary verification backend. The body weighs trade-offs in its Rationale section ("Theory control", "No native dependency", "Type-system integration", "Observability") but does not have a companion zettel describing the rejected alternative — staying on `z3-solver` as the primary backend — in the way [[gram-graph-ir.adr]] / [[gram-as-s-expressions]] and [[direct-style-lowering.adr]] / [[selective-cps]] do.

The question is whether the symmetry is worth maintaining for D-001.

## For adding a `stay-on-z3.md` companion

- Pattern consistency across ADRs that record rejections: every other split-style ADR has a `REJECTS` edge to a sibling zettel describing the alternative
- The "what would staying on Z3 have looked like" perspective contains real engineering knowledge (FFI surface, theory limits, version pinning, WASM blocker) that the positive ADR only alludes to
- Future readers comparing decisions can see the rejected option as a peer zettel, not buried in prose

## Against

- D-001's body already enumerates the rejection in the Rationale; a companion would risk being a rephrasing rather than a distinct knowledge atom
- The Z3 path is not gone — `z3.adapter.ts` remains for cross-check and fallback, documented in [[z3-adapter-strategy]]. The "alternative" is partially preserved by that adapter, which is already its own zettel
- D-001 was written before the split convention existed; retrofitting the split risks shoehorning

## Resolution shape

If the answer is yes: create `stay-on-z3.md` tagged `rejected` (the technique, as a primary backend strategy, was rejected), `verification`, `solver`. Body covers what staying on Z3 would have implied: FFI lifecycle, sort-system mismatch with row theory, distribution/WASM friction. Add `[[z3-replacement.adr]] --[:REJECTS]--> [[stay-on-z3]]` edge.

If the answer is no: leave D-001 as-is. Note that [[z3-adapter-strategy]] already documents the residual Z3 surface.

This zettel exists to record that the question was considered. Resolve by editing this body with the answer and closing the queue item.

<!-- connections:start -->

## Connections

**Incoming**
- [[thread-queue-system.thread]] ← INCLUDES — Open meta question

<!-- connections:end -->

---
tags:
- thread
- continuation
- cps
- lowering
- elaboration
- type-system
- mir
- verification
---
# Delimited Continuations

From surface shift/reset through elaboration (answer metas, continuation binders,
multishot replay) to MIR lowering (block state machines) and GRAM passes. This thread
tracks the full vertical of delimited control in Yap.

> Post D-006 ([[gram-canonical-ir.adr]]): the canonical lowering site is `src/GRAM/bridge/continuations.ts` ([[shift-reset-bridge-lowering]]; multishot at [[multishot-bridge-serialization]]). The MIR lowering items below describe the legacy direct path retained for the file-compile entry — see [[legacy-file-compile]]. Single-shot specialisation is captured in [[singleshot-static-specialization]].

## Sequence

1. **Core typing + replay** [[shift-reset]] — implemented
   Answer-type polymorphism, continuation binders, nondeterminism/multishot replay
   at let boundaries.

2. **Answer type polymorphism** [[answer-type-polymorphism]] — implemented
   Delimitation stack, answer type swap at shift, prevents non-tail shift when types
   mismatch.

3. **Continuation binders** [[continuation-binders]] — implemented
   Bridge between elaboration stamps and lowering KCall routing.

4. **Nondeterminism + multishot** [[nondeterminism]], [[nondeterminism-multishot]] — implemented
   Multishot evidence in monad state, replay at let boundaries.

5. **MIR lowering** [[shift-reset-mir-lowering]] — implemented
   Block + Alloc/Read/Jump/Branch state machine, not global CPS.

6. **Multishot serialization** [[multishot-serialization]] — implemented
   Heap allocation for multishot; single-shot/stack shortcuts deferred.

7. **GRAM shift-reset pass** [[gram-shift-reset-pass]] — implemented
   Bubble/continuation/resumption as data dependencies in graph IR.

8. **Formal spec** [[missing-spec-shift-reset]] — needs-design
   Single written calculus: answer types, Continuation binder, replay invariant,
   lowering prerequisites.

9. **Direct-style lowering** [[direct-style-lowering.adr]] — D-004; implemented; rejects [[selective-cps]]
   Hypothetical alternate backend; must stay coherent with answer metas.

10. **Session lowering notes** [[session-lowering-branch-split]] — reference
    Historical migration note on branch lineage.

11. **Bubble semantics** [[bubble-semantics]] — planned, needs-design
    EB.Term Bubble constructor replacing skolem-meta indirection. Carries id,
    type, resume values, shift handler. Unifies representation for verification,
    lowering, and evaluation.

12. **Shift/reset verification** [[shift-reset-verification]] — planned, needs-design
    VC generation for Reset/Bubble: concrete expansion (conjoin per value) +
    symbolic quantification (∀bubble. P → φ). Depends on Bubble semantics.
    _Shared with: verification-backend thread_

13. **Open shift verification** [[open-shift-verification]] — speculative, needs-design
    Symbolic mode for cross-module and open-term shifts. ARM-style answer
    refinement tracking. Deferred until module system exists.

<!-- connections:start -->

## Connections

**Outgoing**
- INCLUDES → [[shift-reset]]
- INCLUDES → [[answer-type-polymorphism]]
- INCLUDES → [[continuation-binders]]
- INCLUDES → [[nondeterminism]]
- INCLUDES → [[nondeterminism-multishot]]
- INCLUDES → [[multishot-serialization]]
- INCLUDES → [[shift-reset-mir-lowering]]
- INCLUDES → [[selective-cps]]
- INCLUDES → [[direct-style-lowering.adr]]
- INCLUDES → [[missing-spec-shift-reset]]
- INCLUDES → [[gram-shift-reset-pass]]
- INCLUDES → [[session-lowering-branch-split]]
- INCLUDES → [[bubble-semantics]]
- INCLUDES → [[shift-reset-verification]]
- INCLUDES → [[open-shift-verification]]
- SHARED_WITH → [[verification-backend.thread]] — shift-reset-verification
- INCLUDES → [[bubble-semantics-phase1.implementation]] — Phase 1 work item
- INCLUDES → [[tell-listen-resumption-refactor]] — Tech debt work item
- INCLUDES → [[gram-canonical-ir.adr]] — D-006 amends/reframes D-004 in this thread
- INCLUDES → [[shift-reset-bridge-lowering]] — Current shift/reset lowering site
- INCLUDES → [[multishot-bridge-serialization]] — Current multishot serialisation site
- INCLUDES → [[singleshot-static-specialization]] — Planned optimisation in the thread

**Incoming**
- [[thread-queue-system.thread]] ← INFORMS — System design
- [[gram-evolution.thread]] ← SHARED_WITH — gram-shift-reset-pass
- [[verification-backend.thread]] ← SHARED_WITH — shift-reset-verification, shift-reset-verification-stub

<!-- connections:end -->

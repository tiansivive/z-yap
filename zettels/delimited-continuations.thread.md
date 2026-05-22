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

9. **Selective CPS** [[selective-cps]] — speculative
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

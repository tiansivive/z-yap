---
tags:
- thread
- verification
- solver
- sat
- ir
- project
- ivl
- quantifiers
---
# Verification Backend

Yap verification moved from **direct Z3 `Expr`** generation to **`IVL`** VC IR plus an **in-tree CDCL(T)** stack; **Z3** remains available via **`z3.adapter.ts`** and existing **`z3-solver`** wiring in tooling ([[translation-boundary-vc]], [[z3-replacement-decision]]). **Open:** string/row theories, richer provenance/explanations, formal **`VerificationBackend`** trait — see milestones 9–16 below.

## Sequence

1. **Verification pipeline** [[verification-pipeline]] — implemented  
   **`VerificationServiceV2`**: check/synth/subtype. **`translate.ts`** lowers **`NF.Value` → IVL**. Row **literals** in verification still unsupported at translation; Shift/Reset use **stub pass-through** until Bubble semantics completes.

2. **Verification artefacts** [[verification-artefacts-revised]] — implemented shape  
   **`vc`** / obligation payloads are **`IVL.Formula`** today; labelled at runtime ([[verification-pipeline]]). Z3-era **`Expr`** record preserved in that zettel.

3. **SMT translation (Z3-direct)** [[smt-translation]] — deprecated encoding  
   Superseded by IVL emission; historic **`translate.ts` → Z3 `Expr`** detail kept in the zettel body ([[vc-ir]]).

4. **Refinement types** [[refinement-types]] — incomplete
   Modalities + liquids. stripModalities means refinements may not survive
   inference. Multiplicity checking in verification not implemented.

5. **Refinement inference** [[refinement-inference]] — planned
   No separate metavariable pipeline for refinement templates/holes.

6. **Translation boundary** [[translation-boundary-vc]] — implemented baseline  
   **`translate.ts` → IVL** via **`Build`/`quantify`**; **`z3.adapter`** for Z3 crossings.

7. **M1: IR boundary** [[milestone-1-ir-boundary]] — implemented
   IVL sorts/terms/formulas, builder, DSL, printer, CNF, normalize, skolem.
   See [[m1-implementation]].

8. **M2: EUF + quantifiers + LIA** [[milestone-2-euf-quant-lia]] — implemented
   CDCL core, EUF/CC, simplex arithmetic, trigger-based quantifier instantiation.
   See [[m2-implementation]].

9. **M3: Strings** [[milestone-3-strings]] — planned
   String theory support beyond uninterpreted sort.

10. **M4: Rows** [[milestone-4-rows]] — planned
    Row theory in verification. Currently throws.
    _Shared with: row-types thread_

11. **M5: Explanations** [[milestone-5-explanations]] — planned
    UNSAT cores, model fragments, counterexample pretty-printing.

12. **Solver architecture** [[solver]], [[solver-dispatch]], [[solver-module-layout]] — partial
    CDCL(T) solver and module layout implemented. Dispatch not yet wired to
    VerificationServiceV2 as default backend (explorer calls it manually).

13. **VC IR** [[vc-ir]], [[vc-normalization]], [[vc-provenance]] — partial
    IVL types and normalization implemented. Provenance tracking not yet done.

14. **Z3 replacement decision** [[z3-replacement-decision]] — decision record  
    Staged decoupling from Z3-monolithic coupling toward **IVL + CDCL(T)** (with adapters).

15. **Theory requirements** [[required-formula-forms]], [[required-theory-support]] — reference
    Gap analysis: what formulas and theories are needed.

16. **Verification backend interface** [[verification-backend]] — planned
    Pluggable VerificationBackend abstraction.

17. **Solver trace** [[solver-trace]] — implemented
    Generator-based observability system: Step events, TheoryStep sub-events,
    TracedSolverInstance API, prettier-printer replay renderer.

18. **Explorer integration** [[pipeline-explorer]] — implemented
    IVL tab + Trace tab in pipeline explorer. Replaced Z3 Verify tab.

19. **Build simplify toggle** [[build-simplify-toggle]] — implemented
    Global flag gating algebraic simplifications. CLI + explorer UI config.

20. **Lambda synthesis fix** [[lambda-synthesis-fix]] — implemented
    Correctness fix in synth.ts: Pi return closure used term body instead of
    synthesized body type.

21. **Shift/reset verification stub** [[shift-reset-verification-stub]] — implemented
    Dummy pass-through: Reset transparent (verify inner term), Shift opaque
    (always true). Unblocks verification for programs with shift/reset.
    Superseded by [[shift-reset-verification]] once Bubble semantics lands.
    _Shared with: delimited-continuations thread_

22. **Selfification + first-order restriction** [[selfification]], [[first-order-restriction]] — implemented  
    selfify uses isFirstOrder as top-level guard; higher-order types skip selfification.  
    isFirstOrder unwraps Modal and Neutral, returns false for Pi/Lambda/Sigma.  
    Matches Liquid Haskell / Knowles-Flanagan convention. Prevents function-sorted  
    atoms from entering IVL formulas.

23. **Syn-App-Ex modification** [[syn-app-ex-modification]] — implemented  
    Incorporate-uses **check** instead of synth+subtype for application arguments; extrinsic terms; optional **`nf`** precision through application chains (see zettel).

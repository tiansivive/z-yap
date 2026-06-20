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
- validity
- liquid
---
# Verification Backend

Yap verification moved from **direct Z3 `Expr`** generation to **`IVL`** VC IR plus an **in-tree v2 CDCL(T)** stack. The `z3-solver` dependency, Z3 adapter, and root-level v1 solver implementation have been removed. D-009 adds the missing validity-discharge layer between generated Liquid VCs and raw SAT solving. **Open:** string/row theories, richer provenance/explanations, formal **`VerificationBackend`** trait — see milestones 9–16 below.

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
   **`translate.ts` → IVL** via **`Build`/`quantify`**; the old Z3 adapter crossing has been removed.

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

12. **Solver architecture** [[solver]], [[solver-dispatch]], [[solver-module-layout]] — implemented baseline
    `src/verification/solver/v2` owns the active one-shot CDCL(T) backend. REPL, explorer,
    and integration helpers use v2 solver output; module compilation verification artefact
    emission remains follow-up work.

13. **VC IR** [[vc-ir]], [[vc-normalization]], [[vc-provenance]] — partial
    IVL types and normalization implemented. Provenance tracking not yet done.

14. **Z3 replacement decision** [[z3-replacement.adr]] — decision record  
    Staged decoupling from Z3-monolithic coupling toward **IVL + CDCL(T)** (with adapters).

15. **Theory requirements** [[required-formula-forms]], [[required-theory-support]] — reference
    Gap analysis: what formulas and theories are needed.

16. **Verification backend interface** [[verification-backend]] — planned
    Pluggable VerificationBackend abstraction.

17. **Solver trace** [[solver-trace]] — implemented
    v2 writer events plus replay renderer provide the active small-step debugger trace.
    The older traced incremental instance belongs to the removed v1 path.

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

22. **Selfification + first-order restriction** [[selfification]], [[first-order-restriction.adr]] — D-003; implemented  
    selfify uses isFirstOrder as top-level guard; higher-order types skip selfification.  
    isFirstOrder unwraps Modal and Neutral, returns false for Pi/Lambda/Sigma.  
    Matches Liquid Haskell / Knowles-Flanagan convention. Prevents function-sorted  
    atoms from entering IVL formulas.

23. **Syn-App-Ex modification** [[syn-app-ex-modification]] — implemented  
    Incorporate-uses **check** instead of synth+subtype for application arguments; extrinsic terms; optional **`nf`** precision through application chains (see zettel).

24. **Bounded MBQI fallback** [[mbqi]] — implemented, incomplete  
    Ground-term enumeration by sort when E-matching produces no lemmas; pure-quantifier
    fast path bypassing CNF/CDCL. Unit + integration tests pass; style audit done.
    This remains general quantified-SMT backend support; ordinary nested Liquid VCs are
    handled by validity discharge before raw SAT.

25. **Solver v2 monadic port** [[solver-v2-monadic-port.implementation]] — implemented  
    Additive v2 solver architecture: generator RWSE runtime, domain-owned modules,
    CDCL(T), EUF/arithmetic, quantifiers, one-shot public API, and trace presentation.
    Clause IDs and incremental solver state were removed; quantifier E-matching and
    MBQI rounds now read and update state through the solver monad and emit their own
    trace events.

26. **Theory conclusions propagation** [[theory-conclusions-propagation]] — deferred  
    Theory propagation payloads are named and threaded, but not produced by theories
    or consumed by CDCL. Useful for larger QF-EUFLIA VCs with disjunctions and path joins.

27. **Incremental abstraction extension** [[incremental-abstraction-extension]] — deferred  
    Quantifier instances that introduce fresh atoms need abstraction extension beyond
    lookup into the initial CNF atom table. General quantified-SMT completeness work,
    not the primary path for Yap's Liquid fragment.

28. **Solver v2 universal refinement false SAT** [[solver-v2-universal-refinement-false-sat]] — resolved/reframed  
    Verification-path issue resolved by [[vc-validity-discharge]]; the raw v2/Z3
    discrepancy remains scoped to general quantified-SMT completeness.

29. **Block-scoped let VC parity bug** [[block-scoped-let-vc-parity-bug]] — open bug  
    V2 reports SAT where Z3 rejects the current block-local-let VC; the generated IVL
    shape also needs verification-pipeline review.

30. **Solver v1 and Z3 removal** [[solver-v1-z3-removal]] — implemented  
    Removed the `z3-solver` dependency, `z3.adapter.ts`, root-level v1 solver modules,
    v1 solver tests, and the final v2 test oracle dependency on v1. Validation passed:
    `pnpm typecheck`, `pnpm test src/verification/solver/v2`, `pnpm test src/verification`,
    and `pnpm test src/__tests__/integration`.

31. **VC validity discharge** [[vc-validity-discharge]] / [[vc-validity-before-sat.adr]] — in-progress  
    D-009 separates verifier-facing validity from raw satisfiability. The proof of concept
    targets the unconstrained identity refinement test; CLI, explorer, and remaining
    verification verdict paths need the same wrapper audit.

<!-- connections:start -->

## Connections

**Outgoing**
- INCLUDES → [[verification-pipeline]]
- INCLUDES → [[verification-artefacts-revised]]
- INCLUDES → [[smt-translation]]
- INCLUDES → [[refinement-types]]
- INCLUDES → [[refinement-inference]]
- INCLUDES → [[translation-boundary-vc]]
- INCLUDES → [[milestone-1-ir-boundary]]
- INCLUDES → [[milestone-2-euf-quant-lia]]
- INCLUDES → [[milestone-3-strings]]
- INCLUDES → [[milestone-4-rows]]
- INCLUDES → [[milestone-5-explanations]]
- INCLUDES → [[constraint-solver]]
- INCLUDES → [[solver-module-layout]]
- INCLUDES → [[vc-ir]]
- RELIES_ON → [[vc-normalization]] — Normalization mechanism
- INCLUDES → [[vc-provenance]]
- INCLUDES → [[z3-replacement.adr]]
- REFERENCES → [[required-formula-forms]] — Deprecated Z3-era reference
- RELIES_ON → [[required-theory-support]] — Theory requirements
- RELIES_ON → [[verification-backend]] — Hub zettel
- INCLUDES → [[ivl-boundary]]
- INCLUDES → [[bidir-subtype-verification]]
- INCLUDES → [[z3-adapter-strategy]] — Deprecated transition strategy
- INCLUDES → [[inline-theory-assert]]
- INCLUDES → [[dual-polarity-registration]]
- INCLUDES → [[complementary-atom-encoding]]
- SHARED_WITH → [[row-types.thread]] — milestone-4-rows / row-theory
- INCLUDES → [[session-m2-completion]]
- INCLUDES → [[m1-implementation]]
- INCLUDES → [[m2-implementation]]
- INCLUDES → [[session-trace-observability]]
- INCLUDES → [[solver-trace]]
- INCLUDES → [[build-simplify-toggle]]
- INCLUDES → [[lambda-synthesis-fix]]
- INCLUDES → [[shift-reset-verification-stub]]
- SHARED_WITH → [[delimited-continuations.thread]] — shift-reset-verification, shift-reset-verification-stub
- INCLUDES → [[design-vc-normalization]] — Design work item
- INCLUDES → [[mbqi]]
- INCLUDES → [[solver-v2-monadic-port.implementation]] — Thread item 25
- INCLUDES → [[theory-conclusions-propagation]] — Thread item 26
- INCLUDES → [[incremental-abstraction-extension]] — Thread item 27
- INCLUDES → [[solver-v2-universal-refinement-false-sat]] — Thread item 28
- INCLUDES → [[block-scoped-let-vc-parity-bug]] — Thread item 29
- INCLUDES → [[solver-v1-z3-removal]] — Thread item 30
- INCLUDES → [[liquid-vc-fragment]] — D-009 knowledge cluster
- INCLUDES → [[validity-vs-satisfiability]] — D-009 knowledge cluster
- INCLUDES → [[vc-validity-discharge]] — Thread item 31
- INCLUDES → [[quantifier-instantiation-boundary]] — General SMT vs Liquid fragment boundary
- INCLUDES → [[vc-validity-before-sat.adr]] — Thread item 31 decision record

**Incoming**
- [[thread-queue-system.thread]] ← INFORMS — System design
- [[delimited-continuations.thread]] ← SHARED_WITH — shift-reset-verification
- [[syn-app-ex-modification]] ← INCLUDES — Thread item
- [[testing-audit-2026-06-20]] ← INFORMS — Integration verdict assertions and unknown cases

<!-- connections:end -->

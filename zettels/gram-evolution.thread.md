---
tags:
- thread
- graph
- ir
- lowering
- rewriting
- compiler
- project
- mir
---
# GRAM Evolution

Graph Rewriting Abstract Machine: from current pass infrastructure (DPO + imperative)
through the MIR bridge to future backend-specific passes and the LoGRAM substrate.
GRAM is the research IR; MIR remains the practical codegen path.

_Shared with: usage-semantics (CRUD depends on multiplicity)_

## Sequence

1. **GRAM core** [[gram]] — implemented
   Graph IR, translate + pipeline (eta, saturate, shiftReset, pattern, closure),
   DPO engine, verification step, CLI beside MIR.

2. **Step 1 substrate** [[gram-step-1]] — implemented
   Substrate + passes complete with tests.

3. **Additive enrichment** [[gram-additive-enrichment]] — implemented (principle)
   Passes add, never delete.

4. **Dataflow semantics** [[gram-dataflow-semantics]] — implemented (principle)
   Partial order, not total order.

5. **Compilation by selection** [[compilation-by-selection]] — implemented (architecture)
   Backends choose which views to consume.

6. **DPO rewriting** [[dpo-rewriting]] — implemented
   Local rules in grs/. Aggregate workflows need imperative code.

7. **DPO vs imperative** [[dpo-vs-imperative-passes]] — documented
   Known split between local DPO rules and imperative pass code.

8. **GRAM pattern pass** [[gram-pattern-pass]] — implemented
   Maranget decision trees on graph.
   _Shared with: pattern-matching thread_

9. **GRAM pattern translation** [[gram-pattern-translation]] — implemented
   pat:* node translation.
   _Shared with: pattern-matching thread_

10. **GRAM shift-reset pass** [[gram-shift-reset-pass]] — implemented
    Bubble/continuation/resumption as data dependencies.
    _Shared with: delimited-continuations thread_

11. **S-expression storage** [[gram-as-s-expressions]] — rejected
    Graphs are canonical; S-exprs rejected.

12. **GRAM -> MIR bridge** [[gram-to-mir-bridge]] — implemented
    Direct translation emitting MIR Module via `src/GRAM/bridge/`. Explorer uses `GRAM.Bridge.emit` as canonical MIR source.

13. **GRAM next steps** [[gram-next-steps]] — planned
    Defunctionalization pass, lambda lifting pass, CRUD data access enrichment.

14. **Lambda lifting** [[lambda-lifting]] — planned
    Promote closures to top-level fns with captured params. C/GPU-specific.

15. **GRAM CRUD enrichment** [[gram-crud-enrichment]] — planned, needs-design
    Access mode annotation on inj nodes from multiplicity.
    _Shared with: usage-semantics thread_

16. **CRUD strategy choice** [[crud-strategy-choice]] — needs-design
    Phased: mode annotation → reuse analysis → constructor contexts.

17. **GRAM interpreter** [[gram-interpreter]] — speculative
    Swappable strategy interpreter. Needs LoGRAM or better traversal.

18. **LoGRAM** [[logram]] — speculative
    Datalog-style triple-store substrate for graph queries.

19. **Programmable GRAM passes** [[programmable-gram-passes]] — planned, needs-design
    User-written DPO rules as Yap values, dispatched by a Kernel meta-pass via modal annotations.
    Rule definitions evaluate via NbE; existing match/rewrite engine runs them.
    _Shared with: modality-system extension surface_

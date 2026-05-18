---
tags:
- thread
- graph
- ir
- lowering
- rewriting
- compiler
---
# GRAM Evolution

Graph Rewriting Abstract Machine: from current pass infrastructure (DPO + imperative)
through the MIR bridge to future backend-specific passes and the LoGRAM substrate.
GRAM is the research IR; MIR remains the practical codegen path.

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

12. **GRAM -> MIR bridge** [[gram-to-mir-bridge]] — planned
    Direct translation emitting MIR Module. Regression vehicle and migration path.

13. **GRAM next steps** [[gram-next-steps]] — planned
    Defunctionalization pass, lambda lifting pass, CRUD data access enrichment.

14. **GRAM interpreter** [[gram-interpreter]] — speculative
    Swappable strategy interpreter. Needs LoGRAM or better traversal.

15. **LoGRAM** [[logram]] — speculative
    Datalog-style triple-store substrate for graph queries.

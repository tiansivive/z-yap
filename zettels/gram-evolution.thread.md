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

11. **Graph IR substrate** [[gram-graph-ir.adr]] — D-002; rejects [[gram-as-s-expressions]]
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

19. **Programmable GRAM passes** [[programmable-gram-passes]] — implemented, incomplete
    User-written DPO rules as Yap values, dispatched by a Kernel meta-pass via modal annotations.
    Rule definitions evaluate via NbE; existing match/rewrite engine runs them.
    MVP (phases 1–6): [[programmable-gram-passes-mvp.plan]]. Retrospective: [[programmable-gram-passes-mvp-retrospective]].
    Open issues: [[gram-string-escaping.bug]], [[gram-rule-scoping.design]], [[gram-payload-constraint-emission.design]], [[gram-modality-vs-pragma.design]].
    _Shared with: modality-system extension surface_

20. **PAP pass** [[gram-pap-pass]] — planned
    Transform unsaturated `EXTERNAL` nodes into explicit partial application structure.
    Runs after `saturate`. Keeps the bridge mechanical — GRAM adds semantics, bridge translates.
    Resolves [[bridge-unsaturated-external]].

<!-- connections:start -->

## Connections

**Outgoing**
- INCLUDES → [[gram]]
- RELIES_ON → [[gram-additive-enrichment]] — Foundational invariant
- INCLUDES → [[gram-graph-ir.adr]]
- RELIES_ON → [[gram-dataflow-semantics]] — Partial-order principle
- INCLUDES → [[gram-interpreter]]
- INCLUDES → [[gram-next-steps]]
- INCLUDES → [[gram-step-1]]
- INCLUDES → [[gram-to-mir-bridge]]
- INCLUDES → [[gram-pattern-pass]]
- INCLUDES → [[gram-pattern-translation]]
- INCLUDES → [[gram-shift-reset-pass]]
- INCLUDES → [[dpo-rewriting]]
- RELIES_ON → [[dpo-vs-imperative-passes]] — Pass classification decision
- INCLUDES → [[logram]]
- RELIES_ON → [[compilation-by-selection]] — Backend selection architecture
- SHARED_WITH → [[delimited-continuations.thread]] — gram-shift-reset-pass
- SHARED_WITH → [[pattern-matching.thread]] — gram-pattern-pass, gram-pattern-translation
- INCLUDES → [[gram-crud-enrichment]]
- RELIES_ON → [[crud-strategy-choice]] — Phased decision informing CRUD enrichment
- INCLUDES → [[lambda-lifting]]
- SHARED_WITH → [[usage-semantics.thread]] — CRUD depends on multiplicity
- INCLUDES → [[gram-pap-pass]] — Thread member
- INCLUDES → [[programmable-gram-passes]] — Sequence item 19
- INCLUDES → [[programmable-gram-passes-mvp.plan]] — MVP work item for sequence item 19
- INCLUDES → [[pap-analysis-payload-predicates]] — v2 milestone candidate
- INCLUDES → [[gram-canonical-ir.adr]] — Canonical-IR decision is a GRAM-evolution milestone
- INCLUDES → [[programmable-gram-passes-mvp-retrospective]] — Retrospective is a thread milestone
- INCLUDES → [[gram-string-escaping.bug]] — Bug tracked in the thread
- INCLUDES → [[gram-rule-scoping.design]] — Design issue tracked in the thread
- INCLUDES → [[gram-payload-constraint-emission.design]] — Design issue tracked in the thread
- INCLUDES → [[gram-modality-vs-pragma.design]] — Design issue tracked in the thread

**Incoming**
- [[thread-queue-system.thread]] ← INFORMS — System design
- [[explorer-evolution.thread]] ← SHARED_WITH — Graph viz depends on GRAM substrate
- [[explorer-graph-viz]] ← SHARED_WITH — Graph viz depends on GRAM substrate
- [[explorer-audit.thread]] ← SHARED_WITH — Bridge fixes
- [[type-erasure]] ← INCLUDED_IN — GRAM bridge handles interim erasure
- [[ffi-saturation-gram]] ← INCLUDED_IN — GRAM saturation pass
- [[pipeline-stabilization.thread]] ← SHARED_WITH — Bridge bugs overlap
- [[testing-audit-2026-06-20]] ← INFORMS — Active bridge parity and LoGRAM-era gaps

<!-- connections:end -->

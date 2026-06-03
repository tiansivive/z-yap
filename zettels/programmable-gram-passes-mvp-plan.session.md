---
tags:
  - ai-session
  - design
  - lowering
  - graph
  - modality
  - rewriting
  - mechanism
  - compiler
  - elaboration
  - parser
refs:
  transcript: d8833b63-a13c-4d87-bd54-129768d7be36
  branch: stabilization
---
# Session: Programmable GRAM passes — MVP plan

**Date:** 2026-06-02 – 2026-06-03
**Branch:** `stabilization`
**Context:** Follow-on to [[programmable-gram-passes-design.session]]. Investigated the blast radius of implementing [[programmable-gram-passes]] and produced a sequenced MVP implementation plan, [[programmable-gram-passes-mvp.plan]].

Traced the design end-to-end against the implementation to size the change. The modal carrier `Annotations<T>` in `src/verification/modalities/shared.ts` carries only `quantity` + `liquid`; the gram dimension is a new field that ripples to EB `Modal`, NF `Modalities`, and `combine`. The GRAM pipeline's `Pass = Graph -> Graph` and per-term `compile` thread no elaboration `Context`, but the Kernel pass needs one for NbE — so `CompileOpts` must gain a `ctx` field, rippling to the three `compile` call sites. The DPO engine in `src/GRAM/grs/` is reusable unchanged via an adapter that wraps `NF.apply` in TS `Rule` thunks, making the engine-side predicate-application-strategy unnecessary for v1.

Corrected an early over-statement: structs and Schema rows already exist as first-class constructs, and `defaultContext().imports` already names builtin types (`Num`, `Bool`), so `Rule`/`Pattern`/`Constructor`/`Edge` can be seeded there as Schema-row types built via DSL helpers — no module system required. `Payload` is modelled as a `JSON` atom (validated by `JSON.parse` at literal-check time, parsed in GRAM), reinforced by the graph layer already JSON-stringifying payloads for dedup in `src/GRAM/graph.ts`. GRAM is per-term only today — no module-level driver — though `src/Codegen/modules.ts` already iterates letdecs by name, a template for future module-level GRAM. Per-term compile plus context-by-name rule resolution (`ctx.imports[name]`) is coherent because top-level rule bindings accumulate into `imports` before any use site, and is kept for now.

Produced a 7-phase plan ([[programmable-gram-passes-mvp.plan]]) carrying a standing no-assumptions / STOP-and-surface directive at every step, per-step user review, and an independent `yap-reviewer` audit-subagent gate after typecheck + tests, applying the project style contract plus the `~/.config/ai-agents` guidelines.

## Decisions locked

1. MVP scope is user-defined rules only; compiler defaults stay hand-written, not reframed as DPO rules.
2. `Rule`/`Pattern`/`Constructor`/`Edge` are builtin Schema-row types seeded into `defaultContext().imports`; `Payload` is a `JSON` atom (whole-payload blob).
3. v1 LHS matching is tag-only; payload predicates and JSON-decode primitives are deferred.
4. Predicate application uses the adapter (TS `Rule` thunks over `NF.apply`); the engine is untouched; the strategy framing is superseded if the adapter suffices.
5. Rewrites are additive-only, enforced by a Kernel guard rejecting deletion-by-omission and redirect.
6. Surface syntax is Nearley `Type %rulename`; `<…>` remains QTT; the edge label is `:rewrite_rule`; tree-sitter is out of scope.

## Open items carried forward

`Bindings` representation / constant-vs-derived payloads (Phase 1); Yap optional-field support if needed; `compile` vs `compileWithKernel` shape (Phase 6); unknown-tag policy at the bridge → MIR boundary (Phase 7).

## Produced

[[programmable-gram-passes-mvp.plan]] — sequenced 7-phase MVP implementation plan for the gram-evolution thread.

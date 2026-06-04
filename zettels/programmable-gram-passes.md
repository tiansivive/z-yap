---
tags:
  - design
  - hub
  - mechanism
  - lowering
  - graph
  - modality
  - rewriting
  - compiler
  - implemented
  - incomplete
---
# Programmable GRAM passes

**MVP implemented @2026-06-03. See [[programmable-gram-passes-mvp-retrospective]] for discovered issues.**

Hub: [[gram-kernel-pass]], [[gram-rule-as-yap-value]], [[pass-activation-by-reference]]

User-defined DPO rewrite rules participate in the GRAM lowering pipeline through the modality system. A `gram` field on `Modal.Annotations` carries an `EB.Term` that elaborates to a Yap-level `Rule` value. The annotation marks a subgraph as eligible for rewriting by the referenced rule. EB→GRAM translation preserves the annotation as a `modal` node with a `:gram_rule` edge pointing to the rule's binder.

The mechanism reuses existing infrastructure: the DPO engine in `src/GRAM/grs/`, additive enrichment as the structural invariant ([[gram-additive-enrichment]]), `Descriptor.requires/delta` as the pass-typing discipline ([[typed-pass-composition]]), and NbE under `src/elaboration/normalization/` as the evaluator that turns rule definitions into runnable data.

## Pipeline

Elaboration typechecks the `gram` field against the `Rule` type and preserves the modal wrapper on `EB.Term` past `stripModalities`, which only operates on inferred types. Translation emits the modal node. The static pipeline (eta, saturate, shiftReset, pattern, closure) operates on its declared vocabulary; modal nodes are ignored under additive enrichment.

A Kernel pass ([[gram-kernel-pass]]) slots after the static pipeline. It walks modal nodes carrying gram annotations, evaluates each referenced term via NbE to extract a `Rule` struct, deduplicates by binder identity, computes `requires`/`produces` from rule LHS/RHS structure, topologically sorts, and runs each rule through the engine in `src/GRAM/grs/match.ts` and `src/GRAM/grs/rewrite.ts`. Predicate lambdas in patterns and constructors are applied as `NF.Value` closures rather than as host callbacks.

## Default behaviors

Compiler defaults like monomorphization are static DPO rules with a structural filter: apply iff no `gram` modality is present on the candidate node. User opt-out happens by attaching a modal annotation referencing an alternative rule; the static default sees the annotation and skips, and the user's rule fires on the annotated node. The static pipeline does not inspect modal payload — the absence-of-modal check is a property of the default rule's LHS, not of the pass discovering it.

## Boundary

The user-facing primitive set is local. Rule predicates see bindings and payloads, no host graph handle. Whole-graph queries — capture-set analysis, ancestor walks, cross-subgraph joins — belong to a richer substrate; see [[logram]].

<!-- connections:start -->

## Connections

**Outgoing**
- INCLUDES → [[gram-kernel-pass]] — Kernel meta-pass mechanism
- INCLUDES → [[gram-rule-as-yap-value]] — Surface type for user rules
- INCLUDES → [[pass-activation-by-reference]] — Discovery-by-reference principle
- RELIES_ON → [[gram-additive-enrichment]] — Static passes ignore unfamiliar modal tags
- RELIES_ON → [[typed-pass-composition]] — Reuses Descriptor requires/delta for topological sort
- RELIES_ON → [[dpo-rewriting]] — Existing match/rewrite engine runs user rules
- RELIES_ON → [[modality-system]] — Carrier is a new gram field on Modal.Annotations
- RELIES_ON → [[gram-pattern-translation]] — Modal node emitted by EB→GRAM translation
- MOTIVATED_BY → [[extensibility-via-modalities.adr]] — ADR for the broader stance
- GROUNDED_IN → [[mlir-transform-dialect]] — Transformations as ops in the IR being transformed
- GROUNDED_IN → [[t-linq]] — Restricted host sublanguage normalizing to a domain residual
- DEFERS_TO → [[logram]] — Whole-graph queries await richer substrate
- REVISES → [[passes-in-yap]] — Replaces speculative self-hosted-passes paragraph
- IMPLEMENTS → [[extensibility-via-modalities.adr]] — Programmable passes realise D-005
- IMPLEMENTS → [[compilation-strategy.adr]] — Canonical example of AOT user-control

**Incoming**
- [[modality-system]] ← MOTIVATES — Third dimension consumer
- [[mlir-transform-dialect]] ← INFORMS
- [[gram-evolution.thread]] ← INCLUDES — Sequence item 19
- [[programmable-gram-passes-design.session]] ← PRODUCED
- [[programmable-gram-passes-mvp.plan]] ← IMPLEMENTS — Sequenced MVP plan for the design hub
- [[singleshot-static-specialization]] ← RELIES_ON — Realised as a programmable GRAM pass
- [[programmable-gram-passes-mvp-retrospective]] ← DOCUMENTS — Retrospective documents the hub
- [[programmable-gram-passes-mvp.plan]] ← IMPLEMENTS — Plan realises the hub design
- [[gram-kernel-pass]] ← IMPLEMENTS — Kernel pass realises the hub
- [[gram-rule-as-yap-value]] ← IMPLEMENTS — Rule-as-value mechanism realises the hub
- [[pass-activation-by-reference]] ← IMPLEMENTS — Activation principle realises the hub
- [[gram-string-escaping.bug]] ← BLOCKS — Bug blocks full completion
- [[gram-rule-scoping.design]] ← BLOCKS — Scoping issue blocks correct semantics
- [[compilation-strategy.adr]] ← RELIES_ON — Canonical example of AOT user-control
- [[static-partial-evaluation]] ← RELIES_ON — Term-level PE site

<!-- connections:end -->

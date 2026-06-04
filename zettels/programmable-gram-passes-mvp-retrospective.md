---
tags:
  - ai-session
  - gram
  - rewriting
  - lowering
  - milestone
  - compiler
  - modality
  - implementation
  - graph
  - retrospective
refs:
  - thread:gram-evolution
  - branch:gram-programmable-passes
---
# Programmable GRAM passes — MVP retrospective

**Branch: `gram-programmable-passes`**

Implementation of phases 1–6 of [[programmable-gram-passes-mvp.plan]] delivered user-defined DPO rewrite rules participating in GRAM lowering through the modality system. The surface syntax `Type %ruleName` elaborates a `gram` field on Modal annotations; translation emits `:rewrite_rule` edges; the Kernel pass discovers, orders, and executes rules via the existing DPO engine.

## Delivered

- Builtin `Rule`, `Pattern`, `Constructor`, `Edge` as Schema types seeded into `defaultContext`
- `gram` modal dimension with surface syntax `%ruleName`
- Translation marker emitting `:rewrite_rule` edges to rule binders
- `Payload ⇆ NF.Value` JSON bridge (payload as JSON string)
- `NF.Value → TS Rule` reader extracting runnable rules
- Kernel pass discovering rules from modal nodes, resolving via `ctx.imports`, topologically sorting, and executing via `Match.all` + `Rewrite.apply`
- NF DSL helpers for constructing rule values in tests
- Integration tests with actual Yap source

## Discovered issues

Four issues surfaced during implementation requiring follow-up design work:

1. **String escaping** — GRAM payload serialisation double-escapes string literals containing quotes, producing malformed codegen output. The internal value is correct; the bug is in display/serialisation.

2. **Rule scoping** — A rule's LHS can match any node in the graph, not just nodes reachable from the annotated term. The annotation marks a term but does not constrain match scope. Semantically, rules should operate on the subgraph rooted at the marked node.

3. **Payload type constraint emission** — The `check(string, JSON)` case exists in bidirectional checking but Rule values flow through constraint emission (inference), bypassing it. The JSON atom type unifies with itself but string literals synthesise `String`, causing unification failure. Current workaround: payload typed as `String`. Design work needed to route payload fields through the check case.

4. **Modality vs pragma** — The `%ruleName` annotation occupies the modal system but does not affect type behaviour. Modalities encode type-level semantics (QTT, refinements); this annotation is an inert pragma marking a compilation directive. Surface syntax and elaboration representation may warrant separation.

## Deferred

Phase 7 (boundary policy for user-rule-introduced tags at the MIR boundary, z-yap documentation pass) deferred pending resolution of the above issues.

<!-- connections:start -->

## Connections

**Outgoing**
- DOCUMENTS → [[programmable-gram-passes-mvp.plan]] — Retrospective documents the plan execution
- DOCUMENTS → [[programmable-gram-passes]] — Retrospective documents the hub

**Incoming**
- [[gram-string-escaping.bug]] ← DISCOVERED_BY — Bug discovered during MVP impl
- [[gram-rule-scoping.design]] ← DISCOVERED_BY — Design issue discovered during MVP impl
- [[gram-payload-constraint-emission.design]] ← DISCOVERED_BY — Design issue discovered during MVP impl
- [[gram-modality-vs-pragma.design]] ← DISCOVERED_BY — Design issue discovered during MVP impl
- [[gram-evolution.thread]] ← INCLUDES — Retrospective is a thread milestone

<!-- connections:end -->

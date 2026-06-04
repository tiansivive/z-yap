---
tags:
  - mechanism
  - design
  - syntax
  - lowering
  - rewriting
  - language
  - evaluation
  - normalization
  - implemented
  - modality
---
# GRAM Rule as Yap value

`Rule` is a stdlib struct type mirroring the engine's TS shape in `src/GRAM/grs/rule.ts`: an LHS (`{ nodes: List Pattern, edges: List Edge }`), an RHS (`{ nodes: List Constructor, edges: List Edge }`), and an optional `redirect` map. Users write rules as struct literals — no embedded DSL, no quotation, no compiler-recognized syntax beyond the existing struct form.

## Predicates as Yap lambdas

Pattern payload filters have type `Payload -> Bool`. RHS payload builders have type `Bindings -> Payload`. Both are plain Yap lambdas, typechecked by the elaborator like any other function. There is no separate filter language; the rule struct holds value-typed fields, the engine applies them via `NF.apply`.

## Evaluation through NbE

Rule definitions evaluate via NbE at GRAM-pipeline time. The residual `NF.Value` is extracted as a `Rule` struct; predicate lambdas remain as closures and are applied per match attempt. FFI calls, general recursion, and other constructs that fail to reduce stay stuck — the engine treats stuck predicates as non-matches and stuck builders as rule failure. This is the same well-formedness boundary used by [[first-order-restriction.adr]] in verification.

## T-LINQ analog

The pattern mirrors language-integrated query ([[t-linq]]): a restricted host-language sublanguage normalized via the host's own evaluator to a domain residual. The sublanguage restriction is enforced at the type level by the structure of `Rule`, `Pattern`, and `Constructor`; what reduces is what runs.

## Graph access

The Yap-side primitive set is local: predicates see bindings and payloads. Whole-graph queries (capture-set analysis, ancestor walks, cross-subgraph joins) require primitives that the [[logram]] substrate provides; rules needing them remain in TS until that lands.

<!-- connections:start -->

## Connections

**Outgoing**
- MIRRORS → [[dpo-rewriting]] — Surface type maps engine-side Rule
- GROUNDED_IN → [[t-linq]] — Stuck terms as well-formedness boundary
- DEFERS_TO → [[logram]] — Capture-set analysis, ancestor walks need it
- IMPLEMENTS → [[programmable-gram-passes]] — Rule-as-value mechanism realises the hub

**Incoming**
- [[programmable-gram-passes]] ← INCLUDES — Surface type for user rules
- [[gram-kernel-pass]] ← CONSUMES — Reads Rule values from modal annotations
- [[t-linq]] ← INFORMS
- [[programmable-gram-passes-design.session]] ← PRODUCED
- [[programmable-gram-passes-mvp.plan]] ← IMPLEMENTS — Phases 1+5 realize the Rule surface type
- [[gram-payload-constraint-emission.design]] ← APPLIES_TO — Constraint emission affects rule-as-value typing

<!-- connections:end -->

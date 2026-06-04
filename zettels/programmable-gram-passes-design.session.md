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
  - concept
refs:
  transcript: 440f5387-8904-4c05-88d0-bc4024a37d23
  branch: stabilization
---
# Session: Programmable GRAM passes design

**Date:** 2026-06-02
**Branch:** `stabilization`
**Context:** Design discussion seeded by a prior summary on calling conventions in GRAM. Reframed as the general mechanism for user-extensible lowering passes.

Designed the extensibility mechanism for compiler lowering. User-written DPO rewrite rules participate in GRAM via the modality system: a `gram` field on `Modal.Annotations` carries an `EB.Term` elaborating to a stdlib `Rule` value. A Kernel pass discovers rules transitively from modal annotations, topologically sorts them by structurally-derived `requires`/`produces`, evaluates them via NbE, and runs them through the existing DPO match/rewrite engine. Predicates are plain Yap lambdas applied as `NF.Value` closures; FFI and non-reducing constructs stay stuck and surface as well-formedness rejection.

Defaults like monomorphization are expressed as static DPO rules with a structural filter for absence of modal annotations. Static-pipeline passes require no awareness of modal annotations; additive enrichment guarantees they ignore unfamiliar tags. Selection semantics for the case where multiple annotations decorate the same subgraph was deferred — codegen-time preference, project configuration, and explicit override directives are all candidates.

Repositioned the broader extensibility story: Yap declines elaborator metaprogramming (Lean `Elab`, Idris `%runElab`) in favor of typed modality consumers — verification, usage, GRAM — each reading their dimension off `Modal.Annotations`. Liquid refinement checking and the in-flight QTT usage pass implement the pattern; the GRAM Kernel is the third instance. Captured as ADR in [[extensibility-via-modalities.adr]].

Tailcall was rejected as a fit — tail position is a structural property the compiler determines. Canonical use cases are mono/run-poly, defunctionalization, function-pointer vs synthetic closure, PAP representation, lambda lifting, ABI-specific calling conventions, and fusion rules. All are places where the compiler picks a default but the user has reason to override locally.

## Key decisions

1. `Modal.Annotations` gains a `gram?: List Rule` field, not an extensible row. Row extensibility is deferred to the case where user-defined modality dimensions are introduced.
2. Users write DPO rewrite rules as Yap struct literals; no embedded DSL, no quotation. Surface API minimal at v1 — `add_node`-style primitives are deferred.
3. Predicates are plain Yap lambdas (`Payload -> Bool`, `Bindings -> Payload`), applied via `NF.apply`. Stuck reductions are non-matches; rule failure on stuck builders.
4. Rule discovery and ordering happen at GRAM-pipeline time via a Kernel meta-pass that reads `requires`/`produces` structurally from rule LHS/RHS and uses the existing `Descriptor`/`configure.ts` topo-sort.
5. Activation is by reference only — no global registration, no implicit attribute database. Tree-shaking is structural.

## Prior art surveyed

- **MLIR Transform Dialect** ([[mlir-transform-dialect]]) — transformations expressed as ops in the IR being transformed; bootstrap arc from C++ to dialect-native.
- **T-LINQ** ([[t-linq]], Cheney/Lindley/Wadler ICFP 2013) — restricted host-language sublanguage normalized to a domain residual; stuck terms as the well-formedness boundary.
- **Koka effect handlers** ([[koka-influence]]) — handler-as-value, named at the use site, as the architectural dual of attribute-database registration.
- **F\* `Tac` and Lean `TacticM`** — typed metaprogramming monads with kernel interpretation; contrasted as a deliberate non-direction for Yap, which keeps elaboration closed.

## Spawned

[[programmable-gram-passes]], [[gram-kernel-pass]], [[gram-rule-as-yap-value]], [[pass-activation-by-reference]], [[extensibility-via-modalities.adr]], [[mlir-transform-dialect]], [[t-linq]].

<!-- connections:start -->

## Connections

**Outgoing**
- PRODUCED → [[programmable-gram-passes]]
- PRODUCED → [[gram-kernel-pass]]
- PRODUCED → [[gram-rule-as-yap-value]]
- PRODUCED → [[pass-activation-by-reference]]
- PRODUCED → [[extensibility-via-modalities.adr]]
- PRODUCED → [[mlir-transform-dialect]]
- PRODUCED → [[t-linq]]

**Incoming**
- [[sessions.hub]] ← INCLUDES — Session record
- [[programmable-gram-passes-mvp-plan.session]] ← FOLLOWS — Planning session after the design session

<!-- connections:end -->

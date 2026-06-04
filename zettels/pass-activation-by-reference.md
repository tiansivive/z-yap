---
tags:
  - principle
  - decision
  - mechanism
  - lowering
  - modality
  - compiler
  - design
  - concept
  - rewriting
---
# Pass activation by reference

A user-defined GRAM pass participates in lowering iff a modal annotation in the program references it, transitively closed over rule-to-rule dependencies. Activation is purely by reference — name resolution at the annotation site is the registration.

## Implications

- **Tree-shaking is structural.** Rules that no annotation references and that no pulled-in rule depends on are never loaded, never evaluated, never run. Cost scales with use.
- **Scope follows scope.** Rule binders are ordinary Yap top-level values subject to standard name resolution. A rule that is not in scope at the annotation site fails elaboration like any other unresolved identifier.
- **The dependency graph is the registration.** When `rule_a`'s LHS requires a tag that only `rule_b` produces, the Kernel pulls `rule_b` in transitively. Users compose rule sets by composing references.

## Contrast with attribute-database registration

Lean `@[simp]`, Coq `Hint`, and GHC `RULES` register rewrites into a global database; use sites pick them up implicitly. The model here is the dual: rules are first-class values, use sites name them explicitly. The shape parallels [[koka-influence]] effect handlers, which are also first-class binders named at the use site rather than registered globally.

The implicit-database model is convenient for ambient rules ("this `simp` lemma applies everywhere it can") but obscures provenance and complicates tooling around "which rules are in scope here." Reference-based activation keeps the dependency graph explicit and inspectable.

<!-- connections:start -->

## Connections

**Outgoing**
- CONTRASTS_WITH → [[koka-influence]] — Handler-as-value as architectural dual to attribute databases
- IMPLEMENTS → [[programmable-gram-passes]] — Activation principle realises the hub

**Incoming**
- [[programmable-gram-passes]] ← INCLUDES — Discovery-by-reference principle
- [[programmable-gram-passes-design.session]] ← PRODUCED
- [[programmable-gram-passes-mvp.plan]] ← IMPLEMENTS — Phase 6 resolves rules by name via module context

<!-- connections:end -->

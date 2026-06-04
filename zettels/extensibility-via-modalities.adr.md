---
adr-id: D-005
tags:
  - adr
  - accepted
  - decision
  - principle
  - compiler
  - modality
  - elaboration
  - verification
  - lowering
  - concept
  - language
  - design
---
# Extensibility via modalities

**Decision:** Compiler extensibility lives in the consumers of modal annotations on `EB.Term`, not in the elaborator or the surface syntax.

## Scope

Three subsystems consume modality dimensions: liquid refinement checking (verification pass, `src/verification/V2/`), QTT usage checking (post-elaboration usage pass, see [[usage-semantics]]), and GRAM rewriting (Kernel pass, [[programmable-gram-passes]]). Each subsystem registers handlers for the dimensions it understands and ignores the rest. New programmable behavior — a new verification theory, a new graph-rewriting pass, a new effect discipline — is added by extending a consumer's handler registry, never by changing how source elaborates.

## Rationale

Elaborator metaprogramming as practiced in Lean (`Elab`, tactic-monad terms that run during typechecking) and Idris (`%runElab`) couples user extension to the most-fragile stage of the pipeline. Compiler invariants and type-system soundness depend on the elaborator behaving as the language reference specifies; opening it to user code creates a tension between extensibility and stability that bleeds into every subsequent feature.

Modal annotations preserve a separation. Source syntax is closed. Elaboration is closed. The point of extension is the modal layer — a typed, structured carrier inspected by post-elaboration consumers. Elaboration stability is unaffected because the elaborator does not interpret modal payload; it only checks well-formedness.

## Implications

- New compiler behaviors land as new consumers or new handlers, both isolated from elaboration.
- Surface syntax for engaging extensions reuses the existing modal-annotation form.
- The elaborator does not require a reflection API; modal payload is data the elaborator preserves but does not introspect.
- The pattern composes: a single program can carry quantity, liquid, and gram annotations on the same term, each discharged by its respective consumer without interaction.

The shape generalizes the precedent set by [[verification-modal-phase]] and [[gram-crud-enrichment]], which implement this division for their dimensions, and motivates [[programmable-gram-passes]] as the third consumer.

<!-- connections:start -->

## Connections

**Outgoing**
- GENERALIZES → [[verification-modal-phase]] — Verification reads liquid dimension
- GENERALIZES → [[gram-crud-enrichment]] — CRUD reads multiplicity dimension
- GENERALIZES → [[usage-semantics]] — Usage pass reads quantity dimension
- RELIES_ON → [[modality-system]] — Modal layer is the extension surface

**Incoming**
- [[programmable-gram-passes]] ← MOTIVATED_BY — ADR for the broader stance
- [[programmable-gram-passes-design.session]] ← PRODUCED
- [[programmable-gram-passes]] ← IMPLEMENTS — Programmable passes realise D-005

<!-- connections:end -->

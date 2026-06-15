---
tags:
  - ai-session
  - verification
  - solver
  - sat
  - monad
  - migration
  - implementation
  - testing
  - tracing
  - quantifiers
  - ivl
  - implemented
refs:
  session: f093a294-7950-4037-b562-eb4efc4286f0
  branch: stabilization
---
# Solver v2 monadic port session

This AI pair-programming session designed and implemented the additive v2 solver architecture: a generator-interpreted RWSE runtime, domain-owned solver modules, the phased port of the existing CDCL(T), EUF, arithmetic, quantifier, encoding, and trace algorithms, and a v2 public API kept separate from the existing solver entrypoints. The session also refined the working guidelines for Yap solver code: domain organization over technical buckets, top-down declaration order, semantic names over data-structure names, component-owned trace events, and an audit protocol that treats project conventions as substantive design constraints.

## Produced

- [[solver-v2-effect-runtime.adr]] — the architectural decision for the solver v2 generator RWSE runtime.
- [[solver-v2-monadic-port.implementation]] — the implementation record for the additive v2 solver port.
- [[theory-conclusions-propagation]] — deferred theory propagation work surfaced by the v2 port.
- [[incremental-abstraction-extension]] — deferred quantifier/CNF abstraction extension work.
- [[agent-guidelines-zettelization]] — meta follow-up for extracting agent/code guidelines into zettels and reusable skills.

## Decisions

- `sat`, `unsat`, and `unknown` are solver result values; the effect runtime's `Either` channel is reserved for internal errors and invariants.
- The v2 solver owns its domain types and imports only stable shared syntax such as IVL.
- Solver modules are organized by domain concern: formulas, encoding, CDCL, EUF, arithmetic, theory orchestration, quantifiers, trace, and the public solver API.
- EUF distinguishes `registry`, `active`, and `conclusions`: registered Boolean-literal meanings, trail-active theory literals, and theory-derived facts for future CDCL propagation.
- The v2 public API is one-shot: `Solver.run(formula)` for result plus trace artefacts and `Solver.check(formula)` for result only. Incremental `assert`/`push`/`pop` state is outside the v2 API.
- CDCL clauses carry provenance through `origin`; unused clause IDs and clause-id counters were removed.
- Quantifier subrounds are monadic: E-matching, E-matching term matching, and MBQI read current solver state through `Core.State.get`, update quantifier bookkeeping through the monad, and emit their own trace events.
- The phase audit protocol uses a mechanical discrepancy pass, a holistic judgment pass, and accepted remediation; guidelines such as top-down ordering are not treated as cosmetic.

## Deferred

Theory conclusions are named and threaded through theory results, but the current CDCL loop consumes only conflicts. Quantifier instantiation currently projects generated ground formulas into the initial Boolean abstraction and does not extend CNF/theory registries with fresh atoms. Agent and code guidelines remain scattered across `.cursor/rules`, `AGENTS.md`, `.github/copilot-instructions.md`, and `~/.config/ai-agents`; they need zettelization before they become a durable graph of conventions.

<!-- connections:start -->

## Connections

**Outgoing**
- PRODUCED → [[solver-v2-effect-runtime.adr]] — Session settled the runtime decision
- PRODUCED → [[solver-v2-monadic-port.implementation]] — Session delivered the v2 port
- PRODUCED → [[theory-conclusions-propagation]] — Deferred theory propagation work discovered during v2 closeout
- PRODUCED → [[incremental-abstraction-extension]] — Deferred quantifier abstraction work discovered during v2 closeout
- PRODUCED → [[agent-guidelines-zettelization]] — Meta follow-up from session guidelines
- FOLLOWS → [[m2-implementation]] — Ports M2 solver into the v2 architecture

**Incoming**
- [[sessions.hub]] ← INCLUDES — Session record

<!-- connections:end -->

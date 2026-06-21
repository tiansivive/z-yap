---
tags:
- queue
- meta
- project
- thread
- infrastructure
- tooling
- milestone
- planned
- concept
---
# Global Pending Queue

Pending work items not assigned to a specific thread. FIFO — oldest first.
`[ ]` open, `[x]` resolved, `[~]` dropped.

Thread-specific items have been extracted into their respective thread hubs.
See [[delimited-continuations.thread]], [[row-types.thread]],
[[usage-semantics.thread]], [[recursion.thread]], [[pattern-matching.thread]],
[[verification-backend.thread]], [[gram-evolution.thread]],
[[elaboration-v2.thread]], [[parser-migration.thread]].

## Open items

- [x] [[solver-v2-universal-refinement-false-sat]] — reframed by [[vc-validity-discharge]]; raw quantified SMT discrepancy remains scoped to general solver completeness
- [x] [[block-scoped-let-vc-parity-bug]] — resolved 2026-06-21; block-local let obligation discharges as valid via [[vc-validity-discharge]]
- [x] [[euf-congruence-propagation-bug]] — resolved 2026-06-21; congruence closure propagates merges to applications, disequality conflict detected
- [ ] [[spineful-applications]] — cross-cutting IR refactor (App representation migration)
- [ ] [[surface-syntax-backlog]] — deferred parser/elaboration sugar backlog migrated from old TODO notes
- [ ] [[where-clauses]] — deferred surface syntax, no parser/elab support
- [ ] [[lsp]] — Language Server Protocol, depends on stable CST + incremental elaboration
- [ ] [[repl]] — interactive evaluation mode
- [ ] [[module-system]] — grammar drift, qualified/hiding shapes not produced by Nearley
- [ ] [[block-level-using-gap]] — implicit scoping bug: module `using` updates implicits but block inference does not
- [ ] [[documentation-debt]] — README/FAQ drift and stale repository prose
- [ ] [[repo-docs-retirement-audit-2026-06-20]] — migrate unique TODO/resource atoms, retire superseded internal docs, then refresh public docs
- [x] [[type-erasure]] — graduated to usage-semantics + gram-evolution threads
- [ ] [[dynamic-reflection]] — design-space only, runtime witness / gradual typing
- [x] [[ffi-saturation]] — split into [[ffi-saturation-gram]] (implemented) and [[ffi-saturation-mir]] (deprecated)
- [ ] [[whnf-codification]] — no explicit WHNF vs full-NF API flag; modes are implicit

## ADR / pulse / current-state follow-ups (2026-06-02)

- [ ] [[z3-stay-companion]] — decide if D-001 needs a stay-on-Z3 rejected-alternative companion
- [ ] [[convention-zettel-promotion]] — decide whether to extract conventions into `<name>.convention.md` meta zettels
- [ ] [[agent-guidelines-zettelization]] — distill agent/code guidelines into convention zettels and reusable skills
- [ ] [[z-yap-agent-skill]] — create a Cursor skill for z-yap interaction protocol, derived from an existing local skill template
- [ ] [[transcripts-private-submodule]] — migrate `sessions/` to a private GitHub submodule
- [ ] Fill in `pulse.md` editorial prose per active thread
- [ ] Fill in `yap-baseline.md` sections and replace `<org>` placeholder with the real GitHub org
- [ ] Decide D-005 epistemic status (currently has none)
- [ ] Add `INCLUDES` edge from `[[verification-backend.thread]]` to `[[first-order-restriction.adr]]`
- [ ] Review ADR slug names: `gram-graph-ir.adr`, `direct-style-lowering.adr`

## GRAM canonical IR follow-ups (2026-06-03)

- [ ] [[legacy-file-compile]] — file compile migrated to pipeline lowering; direct `lowerToMir` tests still block removing the legacy API

<!-- connections:start -->

## Connections

**Outgoing**
- INCLUDES → [[spineful-applications]]
- INCLUDES → [[where-clauses]]
- INCLUDES → [[lsp]]
- INCLUDES → [[repl]]
- INCLUDES → [[module-system]]
- INCLUDES → [[block-level-using-gap]]
- INCLUDES → [[documentation-debt]]
- INCLUDES → [[type-erasure]]
- INCLUDES → [[dynamic-reflection]]
- INCLUDES → [[ffi-saturation-gram]]
- INCLUDES → [[whnf-codification]]
- INCLUDES → [[legacy-file-compile]] — Tech debt tracked in the global queue
- INCLUDES → [[agent-guidelines-zettelization]] — Cross-cutting queue item
- INCLUDES → [[solver-v2-universal-refinement-false-sat]] — Resolved/reframed queue item
- INCLUDES → [[block-scoped-let-vc-parity-bug]] — Pending v2/VC parity bug
- INCLUDES → [[repo-docs-retirement-audit-2026-06-20]] — Documentation cleanup work item
- INCLUDES → [[z-yap-agent-skill]] — Planned Cursor skill for z-yap interaction protocol
- INCLUDES → [[surface-syntax-backlog]] — Deferred syntax backlog

**Incoming**
- [[thread-queue-system.thread]] ← INFORMS — System design
- [[thread-queue-system.thread]] ← INCLUDES — Queue is part of the meta system

<!-- connections:end -->

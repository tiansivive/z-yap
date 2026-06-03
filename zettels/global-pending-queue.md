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

- [ ] [[euf-congruence-propagation-bug]] — EUF congruence closure fails to propagate merges to function applications; returns SAT for UNSAT formula
- [ ] [[spineful-applications]] — cross-cutting IR refactor (App representation migration)
- [ ] [[where-clauses]] — deferred surface syntax, no parser/elab support
- [ ] [[lsp]] — Language Server Protocol, depends on stable CST + incremental elaboration
- [ ] [[repl]] — interactive evaluation mode
- [ ] [[module-system]] — grammar drift, qualified/hiding shapes not produced by Nearley
- [ ] [[block-level-using-gap]] — implicit scoping bug: module `using` updates implicits but block inference does not
- [ ] [[documentation-debt]] — README/FAQ drift, enumerated in brainstorming/yap/KNOWN-DOC-ISSUES.md
- [x] [[type-erasure]] — graduated to usage-semantics + gram-evolution threads
- [ ] [[dynamic-reflection]] — design-space only, runtime witness / gradual typing
- [x] [[ffi-saturation]] — split into [[ffi-saturation-gram]] (implemented) and [[ffi-saturation-mir]] (deprecated)
- [ ] [[whnf-codification]] — no explicit WHNF vs full-NF API flag; modes are implicit

## ADR / pulse / current-state follow-ups (2026-06-02)

- [ ] [[z3-stay-companion]] — decide if D-001 needs a stay-on-Z3 rejected-alternative companion
- [ ] [[convention-zettel-promotion]] — decide whether to extract conventions into `<name>.convention.md` meta zettels
- [ ] [[transcripts-private-submodule]] — migrate `sessions/` to a private GitHub submodule
- [ ] Fill in `pulse.md` editorial prose per active thread
- [ ] Fill in `yap-baseline.md` sections and replace `<org>` placeholder with the real GitHub org
- [ ] Decide D-005 epistemic status (currently has none)
- [ ] Add `INCLUDES` edge from `[[verification-backend.thread]]` to `[[first-order-restriction.adr]]`
- [ ] Review ADR slug names: `gram-graph-ir.adr`, `direct-style-lowering.adr`

## GRAM canonical IR follow-ups (2026-06-03)

- [ ] [[legacy-file-compile]] — migrate `src/compile.ts` + `src/Codegen/modules.ts` off `lowerToMir` onto `GRAM.Bridge.emit`; unblock the deprecation of `src/lowering/lower.ts`

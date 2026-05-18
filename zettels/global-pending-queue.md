---
tags:
- queue
- meta
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

- [ ] [[spineful-applications]] — cross-cutting IR refactor (App representation migration)
- [ ] [[where-clauses]] — deferred surface syntax, no parser/elab support
- [ ] [[lsp]] — Language Server Protocol, depends on stable CST + incremental elaboration
- [ ] [[repl]] — interactive evaluation mode
- [ ] [[module-system]] — grammar drift, qualified/hiding shapes not produced by Nearley
- [ ] [[block-level-using-gap]] — implicit scoping bug: module `using` updates implicits but block inference does not
- [ ] [[documentation-debt]] — README/FAQ drift, enumerated in brainstorming/yap/KNOWN-DOC-ISSUES.md
- [ ] [[type-erasure]] — no principled erasure across backends
- [ ] [[dynamic-reflection]] — design-space only, runtime witness / gradual typing
- [ ] [[ffi-saturation]] — MIR saturation concern for FFI applications
- [ ] [[whnf-codification]] — no explicit WHNF vs full-NF API flag; modes are implicit

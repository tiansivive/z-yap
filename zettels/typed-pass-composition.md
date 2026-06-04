---
tags:
- type-system
- in-progress
- graph
- compiler
- infrastructure
- pattern
- verification
- elaboration
- reference
- migration
- error-handling
- project
---

# Typed pass composition

**What exists:** `src/GRAM/pipeline/descriptor.ts` attaches each pass name to `requires: { tags, labels }` plus `delta` (added/removed vocabulary). `configure.ts` checks ordering consistency (`MissingTag`, `MissingLabel`, `ConsumedAfterRemoval`) and builds `Strategy.seq` over pass runs—structural vocabulary tracking, not dependent-type-checked Yap morphisms.

**Current scope:** Descriptor + configure validates tag/label vocabulary and ordering; GRS rule predicates stay arbitrary TypeScript (`where` callbacks in `rule.ts`) rather than dependent row proofs at elaboration time.

**Possible extensions:** Dependent row contracts per pass or solver-backed admissibility would sit above today's open-string tag machinery (`vocabulary.ts`).

<!-- connections:start -->

## Connections

**Outgoing**
- EXTENDS → [[gram]] — Type-safe passes

**Incoming**
- [[programmable-gram-passes]] ← RELIES_ON — Reuses Descriptor requires/delta for topological sort

<!-- connections:end -->

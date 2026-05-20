# Thread

Append-only paper trail of design and implementation work. Each block records a
session's path through the zettel graph — what was explored, what was decided,
what was deferred.

Format: edge lines (`[[A]] -- verb -> [[B]]`) and action lines (`ENQUEUE`, `RESOLVED`, `SPAWN`).
See [[thread-queue-system]] for the full system design.

---

## session:thread-system-bootstrap — 2026-05-18 [meta, threads, queues]

Introduced the thread & queue work layer to z-yap, adapted from z-piescript's
system. Surveyed all 241 zettels to identify open-ended work clusters. Created
9 thread hubs (5 vertical feature threads, 4 horizontal pipeline threads), a
global pending queue, and a meta zettel describing the system.

### Vocabulary additions

New tags: `thread`, `queue`, `ready`, `blocked`, `needs-design`.
New labels: `PRECEDES`, `SHARED_WITH`, `DEFERRED_FROM`.
New tag group: Work Layer.

### Threads spawned

SPAWN [[delimited-continuations.thread]] — shift/reset through typing, lowering, GRAM
SPAWN [[row-types.thread]] — structural data substrate, unification, verification gap
SPAWN [[usage-semantics.thread]] — QTT, modalities, enforcement
SPAWN [[recursion.thread]] — mu types, mutual recursion, loop sugar
SPAWN [[pattern-matching.thread]] — compilation, exhaustiveness, surface features
SPAWN [[verification-backend.thread]] — VC IR, in-house solver, theory support
SPAWN [[gram-evolution.thread]] — graph IR, MIR bridge, future passes
SPAWN [[elaboration-v2.thread]] — monad, pipeline, doc alignment
SPAWN [[parser-migration.thread]] — tree-sitter, grammar alignment
SPAWN [[global-pending-queue]] — unassigned work items

### Cross-thread connections

[[gram-evolution.thread]] -- shared_with -> [[delimited-continuations.thread]] — gram-shift-reset-pass
[[gram-evolution.thread]] -- shared_with -> [[pattern-matching.thread]] — gram-pattern-pass, gram-pattern-translation
[[verification-backend.thread]] -- shared_with -> [[row-types.thread]] — milestone-4-rows / row-theory
[[pattern-matching.thread]] -- shared_with -> [[row-types.thread]] — exhaustiveness depends on variant/row structure
[[elaboration-v2.thread]] -- shared_with -> [[recursion.thread]] — let-poly spec (mu recovery at let boundaries)

### Readiness tags applied

needs-design: [[missing-spec-shift-reset]], [[row-theory]], [[modality-enforcement]],
[[modality-polymorphism]], [[equirecursive-types]], [[missing-spec-recursive-types]],
[[exhaustiveness-checking]], [[missing-spec-let-polymorphism]], [[missing-spec-sigma-types]]
ready: [[dedicated-row-constructors]]

### Queue items

ENQUEUE [[spineful-applications]] — cross-cutting App IR refactor
ENQUEUE [[where-clauses]] — deferred surface syntax
ENQUEUE [[lsp]] — depends on stable CST
ENQUEUE [[repl]] — interactive evaluation
ENQUEUE [[module-system]] — grammar drift
ENQUEUE [[block-level-using-gap]] — implicit scoping bug
ENQUEUE [[documentation-debt]] — README/FAQ drift
ENQUEUE [[type-erasure]] — no principled erasure
ENQUEUE [[dynamic-reflection]] — design-space only
ENQUEUE [[ffi-saturation]] — MIR saturation concern
ENQUEUE [[whnf-codification]] — NbE mode API gap

---

## session:m2-completion — 2026-05-20 [verification, sat, milestone]

AI pair-programming session implementing milestones 1 and 2 of the SMT solver
plan (`docs/SMT-SOLVER.md`). Branch: `ivl-sat-solver`.

### New zettels

[[session-m2-completion]] — session record
[[m1-implementation]] — M1 IR boundary implementation details + src refs
[[m2-implementation]] — M2 CDCL(T) + theories implementation details + src refs

### Status changes

[[milestone-1-ir-boundary]] planned → implemented
[[milestone-2-euf-quant-lia]] planned → implemented
[[cdcl-t-solver]] planned → implemented
[[arithmetic-theory]] planned → implemented
[[euf-theory]] planned → implemented
[[quantifier-engine]] planned → implemented
[[quantifier-preparation]] planned → implemented
[[watched-literals]] planned → implemented
[[bcp]] planned → implemented
[[one-uip]] planned → implemented
[[congruence-closure]] planned → implemented
[[boolean-lowering-cnf]] planned → implemented

### Thread updates

[[verification-backend.thread]] items 7, 8 → implemented; 6, 12, 13 → partial

### Vocabulary additions

New tags: `implementation`, `ai-session`, `ivl`.

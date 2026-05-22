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

---

## session:trace-observability — 2026-05-21 [verification, observability, explorer, bugfix]

AI pair-programming session following M2 completion. Built solver observability
tooling, integrated the IVL solver into the pipeline explorer, discovered and
fixed a correctness bug in Lambda type synthesis, and added a simplification
toggle for debugging. Branch: `ivl-sat-solver`.

### New zettels

[[session-trace-observability]] — session record
[[solver-trace]] — generator-based CDCL(T) observability system
[[build-simplify-toggle]] — global flag gating IVL algebraic simplifications
[[lambda-synthesis-fix]] — Pi return closure bug fix in synth.ts

### Status changes

[[pipeline-explorer]] updated: IVL + Trace tabs replace Z3 Verify tab

### Thread updates

[[verification-backend.thread]] items 17–20 added (solver-trace, explorer
integration, build-simplify-toggle, lambda-synthesis-fix — all implemented)

### Vocabulary additions

New tags: `observability`, `bugfix`, `explorer`, `generator`.
New labels: `EXPOSES`, `GATES`, `FIXES`, `DISCOVERED_BY`.

---

## session:bubble-verification-design — 2026-05-21 [continuation, verification, ivl, elaboration]

AI pair-programming session designing the verification story for shift/reset
expressions. Two-phase approach: immediate dummy stub (Reset transparent, Shift
opaque), then full Bubble semantics with concrete expansion and symbolic
quantification. Branch: `ivl-sat-solver`.

### New zettels

[[session-bubble-verification-design]] — session record
[[shift-reset-verification-stub]] — dummy pass-through (Reset=inner, Shift=true)
[[bubble-semantics]] — EB.Term Bubble replacing skolem-meta indirection
[[shift-reset-verification]] — full VC strategy (concrete + symbolic)
[[open-shift-verification]] — symbolic mode for cross-module/open shifts
[[arm-paper]] — Sekiyama, Tsukada, Igarashi (POPL 2024) — Answer Refinement Modification
[[sekiyama-unno-temporal]] — Sekiyama & Unno (POPL 2023) — temporal answer-effect modification

### Thread updates

[[verification-backend.thread]] item 21 added (shift-reset-verification-stub — planned)
[[delimited-continuations.thread]] items 11–13 added (bubble-semantics, shift-reset-verification, open-shift-verification)

### Cross-thread connections

[[verification-backend.thread]] -- shared_with -> [[delimited-continuations.thread]] — shift-reset-verification, shift-reset-verification-stub
[[delimited-continuations.thread]] -- shared_with -> [[verification-backend.thread]] — shift-reset-verification

---

## session:shift-reset-stub-impl — 2026-05-21 [continuation, verification, ivl]

Implementation of the shift/reset verification stub and z-yap alignment audit.
Branch: `ivl-sat-solver`.

### Implementation

[[shift-reset-verification-stub]] implemented:
- `synth.ts`: Reset transparent (recurse inner), Shift opaque (NF.Any + true)
- `subtype.ts`: Any <: T and T <: Any cases at top of match (before Lit <: Lit)
- `translate.ts`: Meta variables → uninterpreted constants instead of throwing

Discovery: skolem metas leak into formula translation when refinement predicates
are applied to expressions containing shift results (e.g. `1 + shift(resume 10)`).

### Status changes

[[shift-reset-verification-stub]] planned → implemented
[[verification-backend]] planned → in-progress
[[z3-replacement-decision]] planned → in-progress
[[translation-boundary-vc]] planned → incomplete
[[vc-ir]] planned → implemented
[[smt-translation]] implemented → deprecated

### Thread updates

[[verification-backend.thread]] item 21 → implemented

---

## session:test-cleanup-nf-clarification — 2026-05-22 [testing, normalization, continuation, tooling]

Test infrastructure cleanup, NF.Value semantic clarification, and z-yap sync.
Branch: `i-dont-do-it-for-the-gram`.

### Codebase changes

**NF.Value / Reset/Shift clarification:**
- Confirmed Reset/Shift are EB.Term constructs only, not NF.Value constructors
- Removed unreachable match arms from `quoting.ts`, `pretty.ts`, `verification/V2/logic/translate.ts`

**Test cleanup:**
- Deleted legacy `elaboration.test.ts` (824 lines, v1 API) and `solver.test.ts` (88 lines, v1 API)
- Ported 8 pattern matching tests to `inference/__tests__/match.test.ts`
- Cleaned vitest.config.mts exclusion entries

**Config/tooling:**
- `tsc.tsconfig.json`: added `@yap/gram` path aliases, excluded static assets
- Convention added: never run bare `tsc --noEmit`, always use `pnpm typecheck`
- Explorer pipeline derives GRAM before MIR

### New zettels

[[v1-test-cleanup]] — deletion of v1 test files, ported coverage, config changes
[[test-coverage-gaps]] — inventory of 5 skipped test suites with blockers

### Zettel updates

[[nf-value]] — added "Not NF.Value" clarification for Reset/Shift (timeless domain boundary)
[[shift-reset]] — updated NbE domain note, simplified test file listing
[[snapshot-testing]] — removed stale `drift` tag (chronological paragraph removed)
[[testing-strategy]] — added v1-test-cleanup and test-coverage-gaps to hub
[[pipeline-explorer]] — integrated GRAM pipeline info into body
[[testing.thread]] — added v1-test-cleanup and test-coverage-gaps as thread items

### Thread updates

[[testing.thread]] items added: v1-test-cleanup, test-coverage-gaps

## session:selfification-first-order-guard — 2026-05-22 [verification, modality, type-system, ivl]

Selfification first-order restriction: guard function-sorted types from self-equality refinements.
Branch: `i-dont-do-it-for-the-gram`.

### Codebase changes

**selfify + isFirstOrder (`src/verification/V2/utils/refinements.ts`):**
- `isFirstOrder` now unwraps Modal recursively (checks inner value)
- `selfify` uses `isFirstOrder` as top-level guard; higher-order types return unchanged
- `selfify` uses `NF.force` (not `unwrapNeutral`) to zonk metas before matching
- Pi/Lambda/Sigma cases removed from selfify — `isFirstOrder` is the single authority
- Aligns with Liquid Haskell T-Var rule (Knowles & Flanagan 2010, Vazou et al. 2024)
- Prevents `(= f f)` atoms on function sorts from entering IVL/EUF

### New zettels

[[selfification]] — selfification mechanism, T-Var rule, Yap implementation
[[first-order-restriction]] — first-order boundary for refinements, three enforcement points
[[knowles-flanagan-2010]] — Hybrid Type Checking paper, T-Var formalization
[[vazou-mechanizing-refinement-types-2024]] — Mechanizing Refinement Types, self() formal definition
[[vazou-refinement-reflection-2018]] — Refinement Reflection, T-Exact, Fun sort, PLE
[[ou-et-al-2004]] — Dynamic Typing with Dependent Types, coined "selfification"

### Edges

[[selfification]] --[:COMPOSES_WITH]--> [[modalities]]
[[selfification]] --[:RELIES_ON]--> [[verification-pipeline]]
[[selfification]] --[:CONSTRAINS]--> [[first-order-restriction]]
[[first-order-restriction]] --[:CONSTRAINS]--> [[refinement-types]]
[[first-order-restriction]] --[:CONSTRAINS]--> [[selfification]]
[[first-order-restriction]] --[:PRESERVES]--> [[ivl]]
[[first-order-restriction]] --[:RELIES_ON]--> [[verification-pipeline]]
[[first-order-restriction]] --[:IMPLEMENTS]--> [[liquid-haskell-influence]]
[[ou-et-al-2004]] --[:INFORMS]--> [[selfification]]
[[knowles-flanagan-2010]] --[:INFORMS]--> [[selfification]]
[[knowles-flanagan-2010]] --[:INFORMS]--> [[first-order-restriction]]
[[vazou-mechanizing-refinement-types-2024]] --[:INFORMS]--> [[selfification]]
[[vazou-mechanizing-refinement-types-2024]] --[:INFORMS]--> [[first-order-restriction]]
[[vazou-refinement-reflection-2018]] --[:GENERALIZES]--> [[selfification]]
[[vazou-refinement-reflection-2018]] --[:INFORMS]--> [[liquid-haskell-influence]]
[[ou-et-al-2004]] --[:INFORMS]--> [[knowles-flanagan-2010]]

### Thread updates

[[verification-backend.thread]] item 22 added: selfification + first-order restriction

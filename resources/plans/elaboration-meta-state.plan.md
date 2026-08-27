---
name: Elaboration meta State migration
overview: "SUPERSEDED by effectful-subsystems.plan.md (2026-08-09): same destination — one authoritative metacontext — re-expressed over the freer effect system on refactor/v3-free-monad instead of V2 State combinators. Original overview: move meta entries, solutions, and fresh allocation from Reader/Writer fragments into V2 State. The phase leaves block residual semantics out of scope; acceptance is one authoritative metacontext visible through nested elaboration and replay."
todos:
  - id: setup-tracking
    content: "Plan and existing monad-split / solver-meta-threading tracking aligned"
    status: completed
  - id: state-primitives
    content: "State-owned Meta registry, semantic view, and V2 State combinators"
    status: pending
  - id: migrate-consumers
    content: "Migrate allocation, solve, unification, NbE, diagnostics, and generalization"
    status: pending
  - id: replay
    content: "Fork and merge metacontext State during nondeterministic replay"
    status: pending
  - id: verification
    content: "Focused regression suites, typecheck, lint, and integration verification"
    status: pending
  - id: paper-trail-close-out
    content: "Reconcile z-yap tracking and record shipped behavior plus deferred residual block semantics"
    status: pending
isProject: false
---

## Review policy

- **Stop after each todo / milestone**: no
- **Who validates**: both

## Scope

- **In scope**: State-owned `Meta.Entry` registry; semantic annotations and optional solutions; State-owned fresh IDs; explicit semantic views; atomic removal of Reader/Writer metacontext ownership; branch-isolated replay with shared-entry merge.
- **Design links**: [[monad-split]], [[solver-meta-threading]], [[generalization]], [[letpoly-implicit-escape]].

### Out of scope

- A semantic residual representation for blocks.
- Changing source-level polymorphism or implicit-resolution semantics.

### Deferred work

- Block-preserving no-delta NbE evaluation, pending a separate semantic design.

## Acceptance criteria

- `Meta.Entry` stores `meta`, semantic `annotation`, and optional `solution`; no parallel zonker exists.
- Reader Context contains lexical scope only. Pure semantic consumers use an explicit view derived from State.
- New and solved metas remain visible through nested solve, unification, block, and let boundaries without Writer-to-Reader splices.
- Replay forks State per candidate, merges shared entries, and does not serially leak candidate-local state.

## Work breakdown

1. Add generic `V2.gets` / `V2.modify` and move `Meta.Entry` plus supply into State.
2. Migrate fresh allocation, solver, unification, generalization, NbE, display, diagnostics, and tests to State-derived semantic views.
3. Replace replay's serial carry-over with isolated candidate snapshots and deterministic shared-entry merge.
4. Verify focused regressions and full elaboration gates.

## Risks, complications, and breaking changes

- Snapshot output may change where solved metas are rendered through State.
- `brainstorming/yap/V2-MIGRATION.md`, named by AGENTS.md, is absent from the repository; this plan records the drift rather than relying on it.

## Verification

- Focused meta, unification, normalization, solver, and let-polymorphism tests.
- `pnpm typecheck`, `pnpm lint`, then the full test suite.

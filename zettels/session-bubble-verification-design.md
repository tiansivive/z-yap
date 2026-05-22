---
tags:
  - ai-session
  - continuation
  - verification
  - ivl
  - elaboration
  - ast
  - in-progress
  - mechanism
  - concept
---
# Session: Bubble Semantics & Shift/Reset Verification Design

**Date:** 2026-05-21
**Branch:** `ivl-sat-solver` (ivl worktree)
**Context:** Follow-up to M2 solver completion and trace observability sessions.

Designed the verification story for shift/reset expressions across two phases:

**Phase 1 — Stub (immediate):** Reset is transparent (verify inner term), Shift is opaque (always true). Unblocks verification for programs containing shift/reset without crashing.

**Phase 2 — Bubble semantics (design):** Bubble as an `EB.Term` constructor replacing the `Var(skolem)` + `state.skolems` indirection. Carries id, type annotation, resume values, and shift handler. Enables concrete formula expansion (conjoin per known value) and symbolic quantification (`∀bubble. P → φ`) for open shifts.

Key decisions:
1. Bubble replaces the skolem-meta indirection — makes nondeterministic semantics explicit in the AST
2. Two verification modes: concrete expansion (optimization) and symbolic quantification (general case)
3. ARM paper identified as theoretical foundation for the symbolic mode
4. Open/cross-module shifts motivate designing for symbolic mode upfront
5. GRAM already has a `bubble` concept — EB.Term Bubble aligns the representations
6. Shift body verification deferred — handler postcondition must imply answer refinement (ARM constraint)

Also discussed: EB.Ann implementation (completed earlier in session) for caching inferred types in the AST, avoiding downstream re-synthesis. Removed brittle `structure` snapshots from let-polymorphism tests.

**Phase 1 implemented (2026-05-21):** Stub landed in `synth.ts` (Reset transparent, Shift → `NF.Any`/true), `subtype.ts` (`Any` cases at top of match), `translate.ts` (Meta → uninterpreted constant). Discovery: skolem metas leak into formula translation via refinement predicates on arithmetic expressions — handled by mapping Meta to `Build.const_("?N", uninterpreted("Any"))`.

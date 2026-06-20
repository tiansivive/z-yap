---
tags:
  - project
  - infrastructure
  - documentation
  - audit
  - cleanup
  - problem
  - drift
  - parser
  - migration
  - tooling
  - testing
  - cli
  - incomplete
  - display
  - continuation
  - error-handling
  - verification
  - tech-debt
---
# Documentation debt

Drift between user-facing prose and the compiler tree shows up in several places. This zettel tracks themes to reconcile; authoritative behavior lives in `src/` and linked zettels here.

**README / tour drift (themes):**
- Upstream links and package manager instructions may not match the current repo (`pnpm` vs `npm`).
- Feature lists can lag implemented continuations, tree-sitter migration, and explorer tooling.
- Example tours may point at brainstorming paths instead of `examples/`; integration tests such as `src/__tests__/integration/examples-readme.repl.test.ts` guard snippets — doc edits must stay synced.

**FAQ / roadmap drift (themes):**
- "Coming soon" language can contradict shift/reset and other shipped paths.
- Multiplicity / usage roadmap wording may not match deferred solver integration ([[verification-modal-phase]]).

**Agent / architecture prose drift (themes):**
- References to `inference.v2/` / `checking.v2/` directory names vs live `inference/` + `check.ts` ([[v2-elaboration-pipeline]], [[tmp-pipeline-stub]]).
- Tree-sitter `ts-dts` script naming vs root `package.json` ([[tree-sitter-parser]]).

**Status:** `incomplete` — reconcile by editing public docs or absorbing unique knowledge into z-yap zettels.

<!-- connections:start -->

## Connections

**Outgoing**
- APPLIES_TO → [[yap]] — README/FAQ drift
- DETECTS → [[yap]] — Drift between docs and impl

**Incoming**
- [[missing-spec-shift-reset]] ← ADDRESSES — Spec gap
- [[missing-spec-let-polymorphism]] ← ADDRESSES — Spec gap
- [[missing-spec-sigma-types]] ← ADDRESSES — Spec gap
- [[missing-spec-recursive-types]] ← ADDRESSES — Spec gap
- [[global-pending-queue]] ← INCLUDES

<!-- connections:end -->

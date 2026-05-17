---
tags:
  - project
  - infrastructure
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
---
# Documentation debt

Concrete drift is enumerated in **`brainstorming/yap/KNOWN-DOC-ISSUES.md`** (repo: `panlogion/brainstorming/yap`). Spot-checked items:

- **Root `README.md`:** Wrong upstream links (`tiansivive/lama`), `npm install` vs `pnpm install`, “in the works” lists features already in tree (shift/reset, etc.), misses tree-sitter alongside Nearley.
- **`examples/README.md`:** Tour still frames delimited continuations as future; no shift/reset section; example paths point at `brainstorming/yap/` instead of `examples/`; `chess.yap` unmentioned. Snippets are guarded by `src/__tests__/integration/examples-readme.repl.test.ts`—doc edits must stay synced.
- **`FAQ.md`:** “Coming soon” contradicts implemented continuations and deprecated multiplicity roadmap language.

**Yap docs that are authoritative for architecture:** `docs/ARCHITECTURE.md`, `src/verification/ARCHITECTURE.md`, `docs/SMT-SOLVER.md`, `AGENTS.md`, `.github/copilot-instructions.md`.

**Status:** `incomplete` (registry exists; fixes not fully applied).

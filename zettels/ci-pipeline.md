---
tags:
  [
    testing,
    infrastructure,
    project,
    implemented,
    tooling,
    automation,
    compiler,
    reference,
  ]
refs:
  - src: .github/workflows/ci.yml
    note: CI workflow definition
  - src: vitest.config.mts
    note: Vitest parallel workers, coverage config
  - src: package.json
    note: Script definitions (test, lint, typecheck, etc.)
---

# CI pipeline

Yap's CI runs on every push to `main` and every pull request via GitHub Actions (`.github/workflows/ci.yml`). Six parallel jobs gate every change:

1. **Build** — `pnpm build` then smoke-test `node ./lib/index.js`
2. **Lint** — `pnpm lint` (ESLint, zero warnings; pre-existing debt baselined in `eslint-suppressions.json`, new violations fail — see [[lint-governance]])
3. **Lint Knip** — `pnpm lint:knip` (dead file / export / dependency detection; warnings-only pending the orphaned-file cleanup, then `files`/`dependencies` return to errors)
4. **Prettier** — `pnpm format --list-different` (formatting check)
5. **Test** — `pnpm run test --coverage` → Vitest with `@vitest/coverage-v8`, results uploaded to Codecov
6. **Type Check** — `pnpm tsc` (strict mode, no emit; single `tsconfig.json` covering src and tests)

Coverage reports in HTML and LCOV formats. The Vitest config (`vitest.config.mts`) runs tests in parallel with up to 10 workers, resolves path aliases via `vite-tsconfig-paths`, and loads two setup files: `console-fail-test/setup` (fails tests that log to console) and `src/__tests__/setup.ts` (custom snapshot serializer).

Pre-commit hooks via `lint-staged` catch formatting and lint issues before they reach CI.

Related: [[testing-strategy]], [[snapshot-testing]]

<!-- connections:start -->

## Connections

**Outgoing**
- USES → [[snapshot-testing]]
- SUPPORTS → [[testing-strategy]]

**Incoming**
- [[tag-driven-alpha-release-flow]] ← USES — GitHub Actions rebuilds and checks tagged trees
- [[explorer-deployment-channels]] ← USES — Mainline channel follows GitHub Actions automation
- [[testing-strategy]] ← INCLUDES
- [[pr-explorer-preview-deploys]] ← USES — GitHub Actions label-gated workflow
- [[lint-governance]] ← CONSTRAINS — Gate severities, suppression baseline, knip entry policy

<!-- connections:end -->

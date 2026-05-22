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
2. **Lint** — `pnpm lint` (ESLint, zero warnings)
3. **Lint Knip** — `pnpm lint:knip` (dead export / unused dependency detection)
4. **Prettier** — `pnpm format --list-different` (formatting check)
5. **Test** — `pnpm run test --coverage` → Vitest with `@vitest/coverage-v8`, results uploaded to Codecov
6. **Type Check** — `pnpm tsc` (strict mode, no emit)

Coverage reports in HTML and LCOV formats. The Vitest config (`vitest.config.mts`) runs tests in parallel with up to 10 workers, resolves path aliases via `vite-tsconfig-paths`, and loads two setup files: `console-fail-test/setup` (fails tests that log to console) and `src/__tests__/setup.ts` (custom snapshot serializer).

Pre-commit hooks via `lint-staged` catch formatting and lint issues before they reach CI.

Related: [[testing-strategy]], [[snapshot-testing]]

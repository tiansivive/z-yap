---
tags:
  [
    implemented,
    testing,
    inference,
    elaboration,
    normalization,
    display,
    parser,
    migration,
    infrastructure,
    reference,
    drift,
    project,
    compiler,
  ]
---

# Snapshot testing

**Runner**: **`pnpm test`** → Vitest (`package.json`); config **`vitest.config.mts`** — `vite-tsconfig-paths`, `setupFiles`: `console-fail-test/setup`, `src/__tests__/setup.ts`.

**Matchers**: suites use **`toMatchSnapshot`** / **`toMatchInlineSnapshot`** on pretty-printed artefacts (examples `src/GRAM/__tests__/pipeline.test.ts`, `translate.test.ts`; inference tests via displays).

**Deterministic IDs**: before elaboration snapshots reset **`EB.resetSupply("meta")`**, **`EB.resetSupply("var")`**, **`EB.resetId()`**, **`NF.resetId()`** — see **`elaborateFrom`** in `src/elaboration/inference/__tests__/util.ts`.

**Parser tests**: Nearley **`ParserStart: "Ann"`**, assert **`data.results.length === 1`**, snapshot **`data.results[0]`**.

**Displays**: prefer **`EB.Display.Term`**, **`NF.display`**, constraint pretty-printers — avoid brittle exact string equality on full dumps.

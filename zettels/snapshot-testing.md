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

**Semantic pairing**: snapshots should preserve broad regression history, while direct assertions state the protected behavior. In elaboration tests this usually means checking displayed type, displayed term, constraint text, or a small structural discriminant before snapshotting. In integration tests this usually means checking expected type, normalized value, verification verdict, or expected-error classification before snapshotting the broader pipeline output.

**Error triage**: snapshot-embedded errors need a role. Expected semantic failures are test contracts; known implementation bugs need known-limitation tracking; downstream GRAM/bridge lag should be separated from parser and elaboration claims; backend-specific lag belongs in backend-targeted tests.

<!-- connections:start -->

## Connections

**Outgoing**
- USES → [[test-utility]] — elaborateFrom
- SNAPSHOTS → [[pretty-printing]] — Inline snapshots
- PRESERVES → [[test-utility]] — Determinism via resets
- DETAILS → [[testing-strategy]]

**Incoming**
- [[testing-strategy]] ← INCLUDES
- [[property-based-testing]] ← EXTENDS
- [[ci-pipeline]] ← USES
- [[v1-test-cleanup]] ← REVISES — Old tests used v1 API; ported coverage to v2 suites
- [[v1-test-cleanup]] ← FIXES — Removed stale vitest exclusions
- [[explorer-diff-mode]] ← COMPOSES_WITH — Diff mode complements snapshot-based testing
- [[semantic-assertions-with-regression-snapshots]] ← CLARIFIES — Snapshots are regression artifacts paired with direct claims
- [[snapshot-error-triage]] ← CLARIFIES — Embedded errors need explicit roles
- [[default-context-substitution-aliasing.bug]] ← AFFECTS — Expectations recorded under leaked state keep the suite green

<!-- connections:end -->

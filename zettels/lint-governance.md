---
tags:
  - infrastructure
  - tooling
  - automation
  - convention
  - decision
  - principle
  - agent
  - implemented
refs:
  - branch:linting-debt-settling
---

# Lint governance

A gate only shapes behaviour — human or LLM — when it is zero-baseline and diff-scoped. A permanently red gate carries no information: agents and humans learn to ignore it, and the one violation that matters drowns in the noise. Yap's original ruleset was adopted aspirationally over an existing codebase (~1500 violations, CI lint red on main, merges over failing checks), which is why it failed at its stated goal of improving LLM output quality. The overhaul restructured enforcement around that principle.

**Channel separation.** Upfront instruction (`.cursor/rules`) shapes generation; review (yap-reviewer) catches semantics; lint is the mechanical backstop and must stay green to be information-bearing. Syntactic proxies for semantic goals (banning `for-of` while `forEach`-with-mutation passes) get routed around — Goodhart — so rules that duplicate the instruction/review channels were dropped where they fought the house idiom: `require-yield` (V2.Do handlers are uniformly `function*`), `no-namespace` (namespace APIs are the house style), `no-plusplus` (supply counters), `no-duplicate-type-constituents` (open-vocabulary aliases like GRAM `Tag | Label` are reader documentation).

**The ratchet.** Remaining debt is baselined in `eslint-suppressions.json` (per file, per rule, with counts — the debt ledger). New violations fail immediately; fixes shrink the ledger via `--prune-suppressions`; counts cannot grow. knip mirrors this coarsely with category-level severities assigned by ambiguity: `files` and `dependencies` are unambiguous rot and gate as errors once their backlog is clear, while `exports` stays advisory because namespace-based APIs intentionally export unused surface.

**Sanctioned mutable cores.** Mutation bans carry scoped carve-outs where imperative code is the design, not debt: fresh-name supplies, the generator-monad Do drivers ([[generator-monad]]), and the NbE evaluator's work-stack machine pending [[evaluation-monad-rework]]. Carve-outs live in config blocks or file headers with rationale, and are self-retiring: `reportUnusedDisableDirectives` flags them once the underlying code is reworked.

**One project graph.** tsc, ESLint, vitest, and the IDE all read the single `tsconfig.json` (tests included). The old `tsc.tsconfig.json` test-exclusion split made the lint graph diverge from the typecheck gate, which minted TypeScript *error types* in stale test files and produced phantom `Unsafe … of type error` diagnostics. Keeping one clean graph makes that class structurally impossible.

**The `_` contract.** Unused-binding enforcement splits on intent: `_`-prefixed bindings are declared-intentional documentation (descriptive params, destructured shapes); unprefixed unused bindings are errors — rot or bug symptoms. The convention codified existing practice (the monad drivers already wrote `(_ctx, _w, st)`), and TypeScript's own `noUnusedParameters` honours the same prefix.

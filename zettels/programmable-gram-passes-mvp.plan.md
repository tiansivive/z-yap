---
tags:
  - todo
  - implemented
  - incomplete
  - mechanism
  - lowering
  - graph
  - modality
  - rewriting
  - compiler
  - elaboration
  - parser
  - milestone
refs:
  - thread:gram-evolution
---
# Programmable GRAM passes — MVP implementation plan

**Phases 1–6 implemented @2026-06-03. Phase 7 (boundary policy) deferred. See [[programmable-gram-passes-mvp-retrospective]] for discovered issues.**

Sequenced implementation plan for user-defined DPO rewrite rules participating in GRAM lowering through the modality system. Scope is an MVP: user rules only, additive-only, tag-only LHS matching, predicates deferred. Each phase is independently reviewable and may be split into a standalone sub-plan.

Hub: [[programmable-gram-passes]]. Realizes [[gram-kernel-pass]], [[gram-rule-as-yap-value]], [[pass-activation-by-reference]] under [[extensibility-via-modalities.adr]].

## Locked decisions

| Decision | Value |
|---|---|
| Scope | User-defined rules only. No defaults-as-DPO-rules; static passes stay hand-written. |
| `Rule`/`Pattern`/`Constructor`/`Edge` | Builtin Schema-row types, required fields only, built via DSL, seeded into `defaultContext().imports`. |
| `Payload` | A `JSON` atom (whole-payload blob). `check([Lit.String, JSON])` validated by `JSON.parse`; GRAM parses on use. |
| LHS predicates (v1) | Tag-only. No payload predicates, no Yap JSON-decode primitives yet. |
| Predicate application | Adapter — Kernel builds TS `Rule`s; engine (`src/GRAM/grs/match.ts`, `rewrite.ts`) untouched. |
| Mutation | Additive-only, enforced by a Kernel guard (reject deletion-by-omission and redirect). |
| Surface syntax | Nearley `Type %rulename`. `<…>` stays QTT; `%` for rules now (migrates at tree-sitter). |
| Edge label | `:rewrite_rule`. |
| Compile granularity | Keep per-term; thread full `EB.Context` via `CompileOpts`. Module-level GRAM is deferred. |
| Tree-sitter | Out of scope. |
| Docs | z-yap zettels only. |
| `Bindings` in v1 | Dropped. `Constructor.payload : JSON` constant only. Bindings-derived payloads return in v2 alongside payload predicates. |
| Strategy | `Match.all` over each rule's LHS, then `Rewrite.apply` once per binding. No fixpoint. `Strategy.apply` reserved for static passes; user-facing strategies deferred or yeeted. |
| Edge label for analysis markers | `:optimizes`. Canonical edge for user-rule-injected analysis tags consumed downstream. |
| MVP demo target | Tailcall identification — additive markers via `:optimizes` edge. v1 ships at least `tailcall_in_lambda`; companions (`_in_let`, `_in_case`, `_in_reset`, `_in_block`, `_in_shift`, `_in_mu`) are a v1-shippable family but not blocking. |

## Standing directive — prepend to and satisfy at every step

This block is provided to the implementing agent at every step. No step proceeds without satisfying it.

- Never assume, never guess, never rely on training data. If anything is unclear, under-specified, ambiguous, contradictory, or appears to require changes beyond what the step explicitly lists — STOP and ask the user. State the issue, propose options with trade-offs, wait for guidance.
- Ground every choice in `.cursor/rules/*.mdc`, `.github/copilot-instructions.md`, `~/.config/ai-agents/coding-style.md`, `~/.config/ai-agents/agent-behaviour.md`, and established Yap patterns. Read before writing.
- Reuse over reinvention. Search for existing utilities/patterns first; flag near-duplicates.
- Surface contradictions between plan, code, tests, comments, guidelines — never resolve silently.
- Do not run tests without first naming which tests and why, and getting the user's OK.
- End-of-step gate, in order: `pnpm typecheck` (never bare `tsc`) → (with OK) relevant tests → independent audit subagent → present audit verbatim → STOP for user review before the next step.

## Coding guidelines the implementing agent follows from the start

Hard bans: no `let`, no loops/`forEach`-mutation, no `else`, no `null` (use `undefined`), no `==`/`!=`, no `as`/`!` type assertions, no `pipe` with a single function, no WHAT/HOW comments. Composition over inspection — do not branch on `E.isLeft`/`O.isSome`/`.tag`; map/chain/match over the ADT. ts-pattern `match` with const pattern objects for structural dispatch (no if-checks, no predicate helpers). Namespace APIs (`Category.action`), one-word names, immutable/declarative/recursive, V2 Do notation, `satisfies` over casts. NF.Value branded-type intersection trick. `pnpm nearley` after `grammar.ne`; reset supplies before elaboration tests.

The codebase contains pre-existing `E.isLeft`-style inspection; new code does not copy it. The audit flags inspection regardless of precedent.

## Per-step audit pass (safeguard)

After typecheck + tests are green for a phase and before user review: invoke the `yap-reviewer` skill — spawn a `generalPurpose` subagent with the rule template (R1–R13) filled with that phase's changed files (`git diff --name-only` against base). The subagent receives only rules + file paths — never rationale or this plan. Additionally instruct it to apply `~/.config/ai-agents/coding-style.md` (composition-over-inspection, no single-function `pipe`, WHY-only comments). Present the report verbatim; do not filter. Unresolved violations block the phase.

## Phase 1 — Builtin `Rule` family as Schema types ✓

Goal: `Rule`, `Pattern`, `Constructor`, `Edge` resolvable as types; `Payload = JSON` with literal validation.

Files: new `src/shared/lib/gram.ts` (schema constructions via `EB.Constructors.{Schema,Array,Pi}` + `R.Constructors.Extension`); `src/shared/lib/primitives.ts` and `src/shared/lib/constants.ts` (both expose a `defaultContext`; explore CLI uses `constants`, module/tests use `primitives` — seed both consistently); `src/elaboration/check.ts` (add `check([String-literal], JSON)` case near the existing HashMap case, validate via `JSON.parse`).

Proposed v1 shapes (confirm before building):

```text
JSON                                            -- atom, unifies only with itself
Payload     = JSON
Edge        = Schema { source: String, label: String, target: String }
Pattern     = Schema { bind: String, tag: String }                       -- tag-only
Constructor = Schema { bind: String, tag: String, payload: JSON }        -- constant payload (v1)
Rule        = Schema { lhs: Schema { nodes: Array Pattern, edges: Array Edge },
                       rhs: Schema { nodes: Array Constructor, edges: Array Edge } }
```

AC: `Rule : Type` resolves; a conforming struct literal checks against `Rule`; a valid JSON string literal checks against `JSON`, a malformed one fails. Gate: typecheck → tests → audit → review.

## Phase 2 — `gram` dimension, elaboration, surface syntax ✓

Goal: write `Type %rule`, elaborate it, typecheck the rule against `Rule`.

Files: `src/verification/modalities/shared.ts` (`Annotations<T> += gram?: T`; update `combine`); ripple to `src/elaboration/syntax/term.ts` (Modal), `src/elaboration/normalization/syntax/term.ts` (`Modalities`); `src/parser/grammar.ne` (+ `pnpm nearley`), `src/parser/processors.ts` (`P.Modal`), `src/parser/terms.ts` (modal `gram?`), `src/parser/pretty.ts`; `src/elaboration/inference/modal.ts` (typecheck `gram` against `Rule`, mirroring the `liquid` branch; default absent).

AC: a `%rule`-annotated term parses and elaborates; `gram` is checked against `Rule`; the Modal term survives `stripModalities`. Gate: typecheck → tests (incl. parser snapshots) → audit → review.

## Phase 3 — Translation marker ✓

Goal: carry `gram` into the graph as a resolvable reference.

Files: `src/GRAM/translate.ts` (`modal()` carries gram, emits `:rewrite_rule` to the in-graph Var node bearing the rule name); `src/GRAM/vocabulary.ts` (`Labels.REWRITE_RULE`); `src/GRAM/pipeline/descriptor.ts` (`Initial` vocabulary; assess `STRUCTURAL`).

AC: gram modal node records the rule reference; translate snapshot updated. Gate: typecheck → tests → audit → review.

## Phase 4 — `Payload ⇆ NF.Value` bridge (JSON) ✓

Goal: marshal between the graph `Payload` record and the Yap `JSON` value.

Files: new module under `src/GRAM/grs/` — NF String(JSON) → `JSON.parse` → `Payload` record (RHS construction); `Payload` → `JSON.stringify` → NF String (predicate side, deferred); non-serializable/opaque → stuck (non-match).

AC: round-trip tests; malformed/opaque handling. Gate: typecheck → tests → audit → review.

## Phase 5 — `NF.Value → TS Rule` reader ✓

Goal: turn a rule's residual NF struct into a runnable TS `Rule` (engine shape in `src/GRAM/grs/rule.ts`).

Files: new reader beside the bridge. v1: `Pattern → { bind, tag }`; `Constructor → { bind, tag, payload: <parsed JSON> }`; `Edge → { source, label, target }`; no `redirect`/`where`.

AC: a Yap toy rule reads into a runnable `Rule`. Gate: typecheck → tests → audit → review.

## Phase 6 — Kernel pass + context threading ✓

Goal: discover, order, and run user rules end-to-end.

Files: `src/GRAM/pipeline/index.ts` (`CompileOpts += ctx: EB.Context`; thread through `compile`); call sites `src/cli/explore/pipeline.ts`, `src/__tests__/integration/helpers/pipeline.ts`, GRAM tests; new `src/GRAM/passes/kernel.ts`.

Kernel steps: scan modal nodes with `:rewrite_rule` → read rule name off the Var node → `ctx.imports[name]` → `NF.evaluate` → NF struct → dedup by binder → transitive-closure discovery (value refs) → extract `Rule` (Phase 5) → additive-only guard (reject if `lhsOnly` non-empty, any LHS edge missing from RHS, or redirect present — see `iface`/`lhsOnly` in `src/GRAM/grs/rule.ts`) → derive `requires`/`produces` from LHS/RHS tags → Kahn topological sort (cycle ⇒ Kernel error) → execute via `Match.all` per rule, applying `Rewrite.apply` once per binding (single-fire-per-match; no fixpoint). Prefer a separate `compileWithKernel` so `defaultPipeline` stays pure for gram-free terms (confirm with user).

Single-fire semantics rationale: under tag-only LHS + strict additive enrichment + no `where`, a rule's LHS is preserved verbatim by its own RHS, so `Strategy.apply` (fixpoint) never terminates. Once-per-match aligns with how `closure.capture` and `pattern.compilePatterns` already enrich the graph (one structural addition per anchor) and is the principled v1 semantics. Fixpoint and `where`/negative predicates return together in v2 if needed.

AC: end-to-end additive rewrite from a `%rule` annotation, validated through the integration test harness (context carries the rule binding). Gate: typecheck → tests → audit → review.

### Demo rule — Tailcall identification

Phase 6's end-to-end test ships a real, useful rule rather than a synthetic marker. The rule identifies tail-position `app` nodes by their parent edge and adds an `:optimizes` marker.

Primary rule (`tailcall_in_lambda`):

```text
LHS:
  $lam : "lambda"
  $app : "app"
  edge: $lam :body $app

RHS:
  $lam                      (preserved)
  $app                      (preserved)
  $tc  : "tailcall"         (new, payload {})
  edges:
    $lam :body $app         (preserved)
    $tc :optimizes $app     (new)
```

Companion rules (same `tailcall` tag, same `:optimizes` edge — v1-shippable family, not blocking for plumbing):

| Rule | Anchor edge |
|---|---|
| `tailcall_in_let` | `$let :body $app` |
| `tailcall_in_case` | `$case :body $app` |
| `tailcall_in_reset` | `$reset :body $app` |
| `tailcall_in_block` | `$block :return $app` |
| `tailcall_in_shift` | `$shift :body $app` |
| `tailcall_in_mu` | `$mu :body $app` |

End-to-end test: parse `\x. f x %tailcalls`, elaborate, lower; the resulting graph has exactly one `tailcall` node and one `:optimizes` edge from it to the unique `app`. Each companion rule has its own focused input.

Why this rule: tail position is a purely structural property (parent edge type), so v1's tag-only LHS expresses it directly with no payload reasoning; downstream consumers (codegen TCO, verification, lambda lifting) get a real signal; multiple parent shapes naturally decompose into a family of rules, demonstrating compositional ruleset design.

PAP analysis is intentionally not the demo target — saturated/unsaturated discrimination needs payload predicates and Bindings-derived payloads. PAP returns as the canonical v2 motivator (see `[[pap-analysis-payload-predicates]]`).

## Phase 7 — Boundary, tests, z-yap docs

Goal: keep the downstream sound; document in z-yap.

Files: `src/GRAM/pipeline/verify.ts` (dynamic vocabulary for user-rule tags); decide policy for the demo's `tailcall` tag and `:optimizes` edge at the `src/GRAM/bridge/` → MIR boundary — three live options (reject as default-safe, passthrough as opaque marker, or consume into MIR as a tail-call hint for codegen). Surface to user, do not assume; the choice generalises to any future user-rule-introduced tag/edge. Cross-phase tests + snapshot updates; z-yap updates (recording workflow): mark implemented parts of [[programmable-gram-passes]], [[gram-kernel-pass]], [[gram-rule-as-yap-value]], [[pass-activation-by-reference]]; enqueue the module-level GRAM future item (script/module node → `:imports` edges; name-indexed graphs; drop context threading later) on [[gram-evolution.thread]].

AC: well-formedness passes with user tags; boundary policy decided with the user; zettels updated. Gate: typecheck → tests → audit → review.

## Spike candidate (highest risk)

Phase 6's per-term resolution assumption — that `ctx.imports[ruleName]` is populated and NbE-evaluable at a use site. Validated structurally (`src/elaboration/module.ts` accumulates imports; name resolution requires prior definition), but worth proving on a toy rule before building the full Kernel.

## Open items to confirm (do not assume)

1. Yap optional-field support — only if v1 ends up needing optionality (currently avoided).
2. `compile` vs `compileWithKernel` integration shape (Phase 6).
3. Bridge → MIR boundary policy for the `tailcall` tag and `:optimizes` edge introduced by the demo rule (Phase 7) — reject (default safe), passthrough as opaque marker, or consume into MIR as a tail-call hint for codegen.

<!-- connections:start -->

## Connections

**Outgoing**
- IMPLEMENTS → [[programmable-gram-passes]] — Sequenced MVP plan for the design hub
- IMPLEMENTS → [[gram-kernel-pass]] — Phase 6 realizes the Kernel meta-pass
- IMPLEMENTS → [[gram-rule-as-yap-value]] — Phases 1+5 realize the Rule surface type
- IMPLEMENTS → [[pass-activation-by-reference]] — Phase 6 resolves rules by name via module context
- RELIES_ON → [[modality-system]] — Adds the gram dimension to Modal.Annotations
- DEFERS_TO → [[pap-analysis-payload-predicates]] — v1 ships tailcall demo; PAP returns as v2 motivator
- IMPLEMENTS → [[programmable-gram-passes]] — Plan realises the hub design

**Incoming**
- [[gram-evolution.thread]] ← INCLUDES — MVP work item for sequence item 19
- [[programmable-gram-passes-mvp-plan.session]] ← PRODUCES — Planning session produced the MVP plan
- [[pap-analysis-payload-predicates]] ← MOTIVATES — Canonical v2 motivator for payload predicates and Bindings-derived payloads
- [[programmable-gram-passes-mvp-retrospective]] ← DOCUMENTS — Retrospective documents the plan execution

<!-- connections:end -->

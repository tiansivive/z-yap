---
name: GRAM struct node + label resolution
overview: "Replace the cons-list representation of record VALUES in GRAM with a flat STRUCT node carrying labeled :field edges, then resolve :label references to graph edges in a dedicated pass, detect-and-classify reference cycles, and make recursive (knot-tying) records a GRAM-resolved flag the bridge consumes mechanically. Closes the bridge label gaps (#9, #9a) on pipeline-stabilization. Headline criterion: forward/self/mutual label references in record values compile correctly, with the bridge doing no analysis — it follows :refers_to and honors a backpatch flag."
todos:
  - id: setup-tracking
    content: "z-yap tracking — STRUCT-node design zettel; reconcile gram-label-resolution-pass / recursive-struct-binding / label-cycle-guardedness with the verified mechanics; thread items on pipeline-stabilization; cross-links to gram-evolution + recursion hubs (per the zettelkasten skill)"
    status: completed
  - id: step-1-record-node
    content: "Step 1 — STRUCT node, behavior-preserving. Add STRUCT tag + :tail label + Initial vocab; translate intercepts StructApp → STRUCT with :field{label} edges (+ :tail to ROW_VAR when row is open); bridge STRUCT→struct handler builds the same Alloc Record; deprecate isStructApp/structFromApp/struct/collectFields. MIR output unchanged."
    status: in_progress
  - id: step-2-label-resolution
    content: "Step 2 — label resolution pass + edge-following label. New pass before closure: scope stack over STRUCT :field edges and Abs{Sigma} binders, emit :refers_to → field value and :scope → enclosing binders per var:label; rewrite Leaves.label to follow :refers_to and walk. Forward refs compile correctly."
    status: pending
  - id: step-3-cycle-guardedness
    content: "Step 3 — cycle/guardedness pass (backpatch flag). Detect cycles in per-STRUCT :refers_to graph; classify: lambda-guarded → flag recursive/backpatch; eager constructor-guarded (codata) → reject; unguarded → reject. Stamp flag."
    status: pending
  - id: step-4-capture-backpatch
    content: "Step 4 — label-aware capture + backpatch lowering. Extend capture to gather label crossings (capture STRUCT node, carry recursive flag); bridge honors flag: allocate placeholder, cyclic label refs lower to Read(label, recordVar), fbip-fill. fact/:compute (#9) compiles and runs."
    status: pending
  - id: verification
    content: "pnpm test (GRAM translate, bridge MIR, language-tour snapshots), pnpm lint; pnpm yap on forward-ref, recursive-record, and mutual-recursion .yap fixtures."
    status: pending
  - id: paper-trail-close-out
    content: >-
      thread.md session block, session zettel, connections.md, zettel status/tags,
      scripts/adrs.js if an ADR is warranted, queue [x]; then zettelkasten reconciliation
      (discrepancies + confirm new zettels). Includes the nu/codata/productivity ZK update.
    status: pending
isProject: false
---

## Agent guardrails (read first)

- **Stop and ask** if a step needs substantial unplanned design beyond this plan and its linked zettels — in particular the open-tail handling and the capture record-vs-field granularity are settled here; anything beyond that pauses.
- Small, reviewable steps. Review is **on** — halt at each step boundary.

## Review policy

- **Stop after each todo / milestone**: yes
- **Who validates**: both (user + tests)

## Scope

- **In scope**: GRAM-internal representation of record **values**; a label-resolution pass; cycle detection + guardedness classification producing a backpatch flag; label-aware closure capture; mechanical bridge consumption of `:refers_to` and the flag.
- **Design links**: [[gram-label-resolution-pass]], [[recursive-struct-binding]], [[label-cycle-guardedness]], [[pipeline-stabilization.thread]], [[gram-evolution.thread]], D-006 ([[gram-canonical-ir.adr]]), [[knot-tying]], [[closure-conversion]].

### Out of scope (planned non-goals)

- Record **type** / schema representation (Sigma, `App "Schema" Row`) — stays as-is; the STRUCT node is value-level only.
- Core/`EB.Term` row representation and dedicated row constructors ([[dedicated-row-constructors]]) — an elaboration concern, untouched.
- Unification, elaboration, checking — all upstream of GRAM, untouched.
- Native eager codata and `ν` types — detected and rejected here, not implemented.
- Productivity checking — only relevant once native codata is admitted.
- Tuple identity flag on STRUCT — not derivable at GRAM (tuples already collapse to `App "Struct" Row` via `commonStructInference`); would require an upstream change.

### Deferred work (postponed during implementation)

- Removing the deprecated bridge type-row utils (`isStructApp`/`structFromApp`/`struct`/`collectFields`) — they remain reached by type-level rows that shouldn't be emitted as values; cleanup tracked separately.
- Open-tail (row-variable) semantics beyond carrying the `:tail` edge — the slot exists for future runtime polymorphism / reflection; no behavior built on it now.

## Acceptance criteria

- Record values translate to a single `STRUCT` node with `:field{label}` edges; an open row carries a `:tail` edge to a `ROW_VAR`.
- Step 1 leaves emitted MIR and `language-tour` output unchanged (pure representation swap).
- `{ a: :b + 1, b: 10 }` (forward ref) and the rectangle backward-ref case compile to correct MIR.
- A recursive record field (`fact` with a self-referential `:compute` under a lambda) compiles and runs; mutual recursion between fields ties correctly.
- An eager constructor-guarded cycle (a value-level stream) and an unguarded self-cycle are rejected with a diagnostic, not miscompiled.
- The bridge performs no ordering or backpatch analysis — it follows `:refers_to` and honors the GRAM-set flag.

## Work breakdown

Verified against the bridge walk (`emit.ts`): value handlers memoize via `C.bind`, the walk returns memoized vars (`emit.ts:34-37`), and instructions thread through ctx — so the demand-driven walk orders acyclic dependencies (including forward refs) for free once `Leaves.label` follows `:refers_to`. A genuine cycle infinite-loops the walk (each handler binds only at its end), so cycles need the STRUCT pre-bound and cyclic label refs lowered as `Read(label, recordVar)` — that is what the flag drives.

1. **STRUCT node, behavior-preserving** — `vocabulary.ts` (`STRUCT` tag, `:tail` label), `pipeline/descriptor.ts` (Initial tags), `translate.ts` (intercept `StructApp` in `app`, emit STRUCT + `:field` edges mirroring `walkPatternRow`; `:tail` to `ROW_VAR` on open rows), `bridge/emit.ts` (`STRUCT → struct` handler — the canonical `struct()`, Alloc Record from `:field` edges, keep per-field `bindLabel` for now; deprecate the cons-list value utils). Snapshots regenerate; MIR unchanged.
2. **Label resolution pass** — `passes/resolve-labels.ts` (scope stack over STRUCT `:field` edges + `Abs{Sigma}` binders; emit `:refers_to` + `:scope`), insert before `closure` in `pipeline/index.ts`; rewrite `Leaves.label` to follow `:refers_to` and walk (mirror `ref`/`bound`); retire the name-map path.
3. **Cycle/guardedness pass** — detect cycles over per-STRUCT `:refers_to`; classify by guard (lambda → backpatch flag; eager constructor-guarded → reject; unguarded → reject); stamp flag.
4. **Label-aware capture + backpatch lowering** — extend `passes/closure.ts` `capturesOf`/`enrichOne` to gather label crossings (capture the STRUCT node; carry the recursive flag, bypassing the level filter); bridge honors the flag (placeholder Alloc, cyclic label → `Read(label, recordVar)`, fbip-fill).

## Risks, complications, and breaking changes

- **Snapshots**: GRAM translate, bridge MIR, and `language-tour` snapshots shift in step 1 (representation) and step 2 (forward-ref fix). Step 1's MIR should be byte-identical; step 2 changes MIR only for previously-broken forward refs.
- **Cycle walk**: the bridge walk infinite-loops on an unflagged cycle — step 3 must land before step 4 enables anything cyclic, and step 4's bridge path must short-circuit cyclic labels to `Read` rather than walking the sibling.
- **Capture level filter**: labels bypass the de Bruijn `level` filter in `capturesOf` (they are not binders) — the extension gathers them through `:scope` membership, not level comparison.
- **Breaking changes**: none to surface syntax. Internal GRAM vocabulary gains `STRUCT`/`:tail`; the cons-list remains for type-level rows.

## Effects on nu / codata / productivity (ZK update — close-out)

This work draws the boundary where value-level coinduction begins and must be recorded so the recursion thread reflects it:

- The backpatch flag handles **(mutual) recursive functions only** — lambda-guarded cycles, including thunk-encoded streams (`{ stream: \_ -> { head: 1, tail: :stream () } }`). Plain recursion; no productivity question.
- **Native eager codata** (`{ ones: { head: 1, tail: :ones } }`, constructor-guarded eager) is detected by the guardedness classification and **rejected** pending `ν`. Step 3 puts up the wall; it does not implement codata.
- **Productivity checking** lives beyond that wall — it is what admits native codata safely once [[nu-types]] land. Step 3 builds the cycle-detection + guard-classification substrate a productivity checker extends; when `ν` arrives, the constructor-guarded-eager branch flips from reject to "admit if productive."

Close-out must update [[label-cycle-guardedness]] (realized as a GRAM pass emitting a flag), [[recursive-struct-binding]] (drop define-before-use; the demand-driven walk orders acyclic, GRAM flags only cycles), [[nu-types]] / [[productivity-checking]] / [[codata-vs-coinductive-types]] (note that this work is the trigger and substrate), and the [[recursion.thread]] nu/codata priority note.

## Verification (plan-specific)

- `pnpm test src/GRAM` — translate + pass + bridge suites; `-u` to regenerate after each step (step 1 expected no MIR change).
- `pnpm test` — `language-tour` integration; step 1 unchanged, step 2 changes only forward-ref cases.
- `pnpm yap` on fixtures: forward-ref record, recursive `fact`/`:compute`, mutual `even`/`odd`, an eager stream (expect rejection), an unguarded self-cycle (expect rejection).
- `pnpm lint` before done.

## Close-out

1. Mechanical checklist per the create-plan + zettelkasten skills (thread.md block, connections.md, zettel tags, queue `[x]`).
2. Zettelkasten reconciliation against the three design zettels + the nu/codata/productivity effects above.
3. Confirm any new zettels (the STRUCT-node design zettel; possibly an ADR if the representation split is deemed decision-worthy) with the user before creating.

## Design decisions (pre-settled in discussion)

- Record values → flat STRUCT node with `:field` edges; type-level rows keep the cons-list.
- Tail edge carried for open rows (reflection door); no behavior on it now. Tuple flag deferred (not derivable at GRAM).
- Capture the whole STRUCT for recursive label crossings (one knot object); recursive flag from guardedness; bridge mechanical.
- Dependency *ordering* is free from the demand-driven memoized bridge walk; GRAM only flags cycles. Supersedes the earlier define-before-use lean.

---
name: Variant discriminant representation & struct dispatch fix
overview: "Two coordinated fixes to pattern-match lowering. TRACK A: give variant values a real runtime discriminant — `{ __tag: Atom(tag), payload: value }` — so construction, NbE `meet`, and dispatch finally agree (root cause: elaboration builds tag-as-label `{some: 42}` while dispatch reads a `__tag` that is never written). TRACK B: fix struct dispatch (the original `bridge-struct-dispatch` throw) — keep `switch{struct}` in GRAM (additive) and make the bridge realize it: `:inspect` resolution (the general fix that also unblocks nested matches) + `kind:struct → project + recurse`. Both use the EXISTING string comparison — no `$eq`, no codegen change; typed/polymorphic dispatch equality is DEFERRED with reasons. Headline acceptance: `#some 42` and `{ x: a }` matched from surface both execute end-to-end (interpret)."
todos:
  - id: setup-tracking
    content: "z-yap tracking — propose + confirm (before creating) a design zettel for the variant discriminant representation and a candidate value-representation ADR; enqueue the string-comparison float/record defect as a separate `bug`; mirror A/B on pattern-matching / pipeline-stabilization threads; cross-link [[variant-types]] [[tagged-values]] [[bridge-struct-dispatch]] [[gram-struct-node]]."
    status: completed
  - id: track-a-variant-representation
    content: "TRACK A (atomic) — A1 tagged.ts emits {__tag, payload}; A2 meet variant clause reads __tag/payload (string compare); A3 GRAM pattern pass PROJ label → 'payload'; A4 deprecated variant.ts:76 payload read; A5 VERIFY patterns.ts narrowing; A6 VERIFY injection.ts; A7 fixtures + end-to-end. Land A1–A4+A7 together. No codegen/bridge change."
    status: completed
  - id: track-b-struct-dispatch
    content: "TRACK B (bridge-only) — B1 :inspect resolution in emitSwitch (resolve discriminant from the switch's own :inspect edge, not the threaded root scrut); B2 kind:struct → emit the single :branch child (project + recurse), remove the throw. Pattern pass unchanged. Also unblocks nested variant/lit matches."
    status: completed
  - id: verification
    content: "pnpm test (targeted paths in Verification), then -u for snapshots; pnpm lint; pnpm yap repl on a variant + a struct match; assess V2-migration impact."
    status: completed
  - id: paper-trail-close-out
    content: >-
      thread.md session block, session zettel, connections.md, hub/zettel status+tags, ADRs
      (scripts/adrs.js), queue [x]; reconciliation — update [[variant-types]] / [[tagged-values]] /
      [[bridge-struct-dispatch]]; confirm new zettels with user.
    status: completed
isProject: false
---

## Agent guardrails (read first)

- Two Track-A steps (**A5 `patterns.ts`, A6 `injection.ts`**) are **verify-first**: trace the failing path before changing; if you can't demonstrate it, don't change it.
- **A1–A4 are one atomic landing** — a partial change breaks variant matching. Land + verify together. B can land before or after A (independent), but the composed cases (struct-with-variant field) need both.
- **Do not** re-open the deferred typed/polymorphic dispatch-equality work (see Deferred). The string comparison is the accepted mechanism for this phase.

## Review policy

- **Stop after each todo / milestone**: yes
- **Who validates**: both (user + tests)

## Scope

- **In scope**: variant value representation → `{__tag, payload}` (A); struct dispatch + `:inspect` resolution in the bridge (B).
- **Design links**: [[bridge-struct-dispatch]], [[variant-types]], [[tagged-values]], [[gram-struct-node]].

### Out of scope (planned non-goals)

- Integer tags (later optimization, gated on open/closed variants — [[tagged-dispatch]]).
- Open/closed-variant semantics + exhaustiveness ([[design-open-closed-variant-semantics]]).
- List-pattern lowering (elaborates, doesn't compile).

### Deferred work (postponed — with reasons)

- **Typed/polymorphic dispatch equality + a discrimination-desugaring GRAM pass.** The string/strcmp comparison stays. Deferred because: (1) backend-efficient dispatch (jump table vs compare-chain) is a **backend** concern → programmable/backend passes, not a core GRAM pass; (2) doing equality *right* is **polymorphic** → `Eq` typeclass dictionaries, an **elaboration** concern (a "hidden" built-in eq dict to dodge that leaks the abstraction). Dispatch equality is one shared concern across variant tags, literals, and struct sub-patterns; matching should eventually *elaborate to* `==`/resolved-`Eq`, not be invented in GRAM. Re-checked against B: B keeps the string `Branch` comparison and never touches the mechanism, so this stays deferred and unaffected.
- **String-comparison float/record defect** — `yap_to_str` `%lld` truncates float **literal** patterns; records collapse to `"<record/closure>"`. Pre-existing, in the literal/general dispatch path, **orthogonal to A and B** (variant tags are atoms — string compare is correct for symbols). Track as its own `bug`; not fixed here, not "kept as acceptable."
- **`scrut` param cleanup** — after B1 the threaded `scrut` is vestigial in `emitTree`/`emitSwitch`/`emitLeaf`/`buildDefault`; drop it as follow-up tidy (leave `decision` walking the match `:scrutinee` once, to force single evaluation at entry).

## Acceptance criteria

- **A**: `#some 42` elaborates to `Struct({ __tag: Atom("some"), payload: 42 })`, type unchanged (`Variant({some: Num | r})`). `match #some 42 | #some x -> x | #none _ -> 0` runs (interpret) to `42`; `#none` → `0`. `meet` reduces a variant match on the new representation.
- **B**: bridge no longer throws on `kind:struct`. `match r | { x: a, y: b } -> a+b` runs; `match p | { x: 0 } -> 1 | { x: n } -> n` dispatches on the field; nested `{ x: { y: a } }` and `{ tag: #some x }` (composed with A) run.
- Existing dispatch comparison (string/strcmp) **unchanged**; **no codegen change** (B is `decisions.ts`-only). Flat variant/lit matches unchanged by B1.
- `pnpm test` green (snapshots regenerated); `pnpm lint` clean.

## Work breakdown

### TRACK A — variant representation (atomic: A1–A4 + A7 together)

**A1 · `src/elaboration/inference/tagged.ts` — construction.** Add `import * as Lit from "@yap/shared/literals";`. Replace the value build (`:25–26`):
```ts
const trow = EB.Constructors.Extension(
  "__tag",
  EB.Constructors.Lit(Lit.Atom(tag)),
  EB.Constructors.Extension("payload", tm, { type: "empty" }),
);
const tagtm = EB.Constructors.Struct(trow);
return [tagtm, variant, us] satisfies EB.AST;   // `variant` (the TYPE) unchanged
```

**A2 · `src/elaboration/normalization/evaluation.v2.ts` — `meet` variant clause (`:1019`).** A variant pattern's `p.row` is a single `Extension(tag, payloadPattern, tail)`. Replace the `meetAll` row-lookup with a direct `__tag` check (plain string compare):
```ts
.with([NF.Patterns.Variant, { type: "Variant" }], [NF.Patterns.Struct, { type: "Variant" }], ([{ arg }, p]) => {
  if (p.row.type !== "extension") return O.none;
  const expected = p.row.label;
  const payloadPat = p.row.value;
  const tagVal = lookupRow(arg.row, "__tag");
  const payloadVal = lookupRow(arg.row, "payload");
  const ok = tagVal?.type === "Lit" && tagVal.value.type === "Atom"
          && tagVal.value.value === expected && payloadVal !== undefined;
  return ok ? meet(ctx, payloadPat, payloadVal) : O.none;
})
```
Reuse/extract `lookupRow` (`:609`). The `meet(payloadPat, payloadVal)` recursion is what `meetAll` already does at `:1055`. If variant patterns regain a tail var (`patterns.ts:88–100` commented out), bind it here too.

**A3 · `src/GRAM/passes/pattern.ts` — payload projection label (`Pat.subs`, `:324–326`).**
```ts
// variant case: return edge ? [{ label: "payload", node: edge.target }] : [];
```
Flows through `subLabels → PROJ{label:"payload"} → Structural.read`. Discriminant read (`__tag`) already correct in the bridge; no bridge change from A.

**A4 · `src/lowering/matching/variant.ts:76` (deprecated path)** — `Instr.Read("payload", …)` (was the tag name); `TAG_FIELD="__tag"` read at `:58` unchanged. Confirm still exercised.

**A5 · VERIFY-FIRST — `src/elaboration/normalization/patterns.ts:41` (narrowing).** Does a narrowed variant value reach `meet` (nested match on a dependent variant scrutinee)? If yes → build `NF.Struct(Extension("__tag", Lit(Atom(tag)), Extension("payload", …, empty)))`. If not → leave, document. Don't change on assumption.

**A6 · VERIFY-FIRST — `src/elaboration/inference/injection.ts`.** Is an injected value ever *matched as a variant*? Injection lowers to `UpdateImmutable(base, {label})` — no `__tag`; variant intro is `#tag`. Search for a matched injected-variant; align only if found.

**A7 · Fixtures + end-to-end.** `{__tag, <tag>: payload}` → `{__tag, payload}` in `GRAM/__tests__/{bridge:204, pattern:23, translate:166, pipeline:134}`, `lowering/__tests__/{interpret:137,149, lower:193,277}`, `Codegen/v2/{js:141,153, c:71,192, erlang:69,176}`. Add a construct-`#some 42` → `bridge` → `interpret` → `42` test.

### TRACK B — struct dispatch + `:inspect` resolution (`src/GRAM/bridge/decisions.ts` only; pattern pass unchanged)

The bridge throws on structs and mis-dispatches nested matches because `emitSwitch` (a) forces `kind:struct` through the discriminating `Branch` path, and (b) threads the root `scrut`, ignoring each switch's `:inspect` edge. Both fixed here; GRAM keeps emitting `switch{struct}` (additive — the node records the destructure point, the bridge selects how to realize it, consistent with how it already dispatches on `kind`).

**B1 · `:inspect` resolution (the core — also fixes nested matches).** In `emitSwitch`, replace the discriminant line:
```ts
// was: const [disc, c1] = kind === "tag" ? readTag(scrut, ctx) : [scrut, ctx];
const inspectEdge = Edges.one(id, Labels.INSPECT)(ctx.graph);
const [inspected, cI] = inspectEdge !== undefined ? walk(inspectEdge.target, ctx) : [scrut, ctx];
const [disc, c1] = kind === "tag" ? readTag(inspected, cI) : [inspected, cI];
```
Top-level switch: `:inspect` → the scrutinee node → `walk` returns the memoized scrutinee var (flat variant/lit matches unchanged). Nested switch on a field: `:inspect → proj{x}` → `walk` emits `Read(x, rec, v)`, discriminate on `v`. Without this, a `switch{lit}` on `proj{x}` wrongly discriminates the whole record.

**B2 · `kind:struct` → project + recurse (remove the throw).** A struct is a single-constructor product — no discrimination. Its switch has exactly one `:branch` child (the specialized sub-tree over the projected fields). Emit that child directly — no `Branch`, no discriminant, no join; ignore the (dead) struct-level `:default`:
```ts
// was: if (kind === "struct") throw new Error("Bridge: struct pattern dispatch not yet implemented …");
if (kind === "struct") {
  const branch = Edges.one(id, Labels.BRANCH)(ctx.graph);
  return branch !== undefined ? emitTree(branch.target, scrut, walk, ctx) : C.name(ctx);
}
```

**Traces (B1+B2):**
- `match r | { x: a, y: b } -> a` → `switch{struct}` emits child `leaf` → `Read(x,r,v0); Let a=v0; Read(y,r,v1); Let b=v1; <a>`. No Branch.
- `match p | { x: 0 } -> 1 | { x: n } -> n` → child `switch{lit}` with `:inspect→proj{x}` → `Read(x,p,v0); Branch(v0, [0→leaf(1)], default→leaf(:bind n=v0; n))`. Discriminates on `p.x`, not `p`.
- Nested `{ x: { y: a } }` → chained PROJ `:target`: `Read(x,p,vx); Read(y,vx,vy); Let a=vy`.
- `{ tag: #some x }` → `Read(tag,p,vv); Read(__tag,vv,t); Branch(t,…)` — composes with A's `{__tag,payload}`.

Covers single-alt, multi-alt-on-field, nested structs, struct-with-variant fields.

## Design notes

**Value shape (A):** `#some 42` → `Struct(Extension("__tag", Atom("some"), Extension("payload", 42, empty)))`; type stays `Variant({some: Num | r})` (arms have distinct payload types → no single `payload` type at the type level).

**Why NbE is safe with the discriminant in the term:** projection on a variant is typing-gated (`projection.ts` requires Schema/Sigma); injection's `setRowValue` is shape-agnostic to the extra field; the only NbE consumer that reads a variant value's row by tag-label is `meet`/`meetAll` (`:1043`) — hence A2.

**Why struct keeps its switch (B):** single-constructor = nothing to discriminate at the struct level (just destructure); its *fields* may still discriminate (lit/variant sub-patterns → real switches on the projections). Keeping `switch{struct}` is additive; the bridge selects `kind:struct → project`, consistent with dispatching on `kind` already. Struct field projection is dataflow, so this is the right operational realization.

## Risks, complications, and breaking changes

- **A is cross-layer + atomic** — partial landing breaks variant matching. **A5/A6 verify-first**.
- **B1 changes discriminant sourcing for all switches** — verify flat variant/lit matches are unchanged (they should be: root `:inspect` == scrutinee). Snapshot churn expected.
- **V2-migration**: touches elaboration + lowering; check `brainstorming/yap/V2-MIGRATION.md`.
- **Breaking**: snapshot churn (variant scrutinee shape, struct-match MIR now emitted); **no surface-syntax change, no codegen change**. Known string-comparison float/record defect remains (tracked separately, not in scope).

## Verification (plan-specific)

- `pnpm test src/elaboration/inference/__tests__/tagged.test.ts` — A1.
- `pnpm test src/elaboration/normalization` — A2 `meet`.
- `pnpm test src/GRAM/__tests__/{pattern,bridge,translate,pipeline}.test.ts src/lowering/__tests__/{interpret,lower}.test.ts` — A3/A4 + B1/B2 + end-to-end.
- `pnpm test src/Codegen/v2/{js,c,erlang}/__tests__/emit.test.ts` — fixtures only.
- `pnpm test -u` after review; `pnpm lint`; `pnpm yap repl` (a variant and a struct match).

## Close-out

1. **Mechanical** — queue `[x]`, `thread.md` session block, session zettel, `connections.md`, zettel status/tags, `scripts/adrs.js` if the ADR lands. (z-yap is a nested repo — separate commits.)
2. **Reconciliation** — update [[variant-types]] and [[tagged-values]] (both document the tag-as-label struct with no discriminant); resolve [[bridge-struct-dispatch]] (fixed by B); list drift.
3. **New zettels (confirm first)** — variant-discriminant-representation; candidate ADR; the deferred typed/polymorphic-equality direction; the string-comparison float/record `bug`.

## Design decisions

- **Settled (this session)**: variant value = `{__tag, payload}` fixed fields, type stays tag-keyed; the elaborated runtime shape is struct-backed; struct keeps `switch{struct}`, bridge realizes it via `:inspect` resolution + `kind:struct` project; comparison stays string-based.
- **Deferred (reasons in Deferred work)**: typed/polymorphic dispatch equality + discrimination-desugaring pass; integer tags; the float/record string-comparison defect (separate bug).
- **ADR**: D-010 [[variant-discriminant-representation.adr]] records the fixed runtime discriminant decision.

## Appendix: scratch

Root cause (verified): `tagged.ts:25` builds `Struct({some: 42})`; nothing in `src/` writes `__tag` (reads only at `decisions.ts:124`, `matching/variant.ts:12`); dispatch tests hand-build `{__tag, ...}`, so construction and elimination were never exercised together. Lineages: original V2 elaboration (`50848c7c`) vs the `__tag` convention from an old lowering branch (`f10a8fe`). B root cause: `emitSwitch` ignores `:inspect` (threads root scrut) and throws on `kind:struct`.

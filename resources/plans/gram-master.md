# GRAM Master Plan

Iterative plan. Each step: discuss → implement → review → move on.

## Step 1: Graph substrate + translation ✓

Property graph data structure (nodes, edges, tags, payloads, indices). Namespaced API (`Nodes`, `Edges`, `Query`). EB.Term → GRAM translation with de Bruijn resolution and variable interning. Display for snapshots. Tests.

Done. Files in `src/GRAM/`. 47 tests passing.

## Step 2: DPO rewriting engine ✓

Replace imperative graph surgery with principled DPO rewriting. A rule is `{ lhs, rhs, interface, where? }` — three graphs (pattern, replacement, shared nodes) plus optional condition.

- Design the `Rule` type (GP 2-style: shared node IDs = interface)
- Implement the pushout engine (match LHS in host, delete LHS\K, add RHS\K, rewire edges)
- Strategy combinators: `seq`, `repeat`, `try`, `choice`, `topDown`, `bottomUp`
- Validate with a trivial rule (e.g. retag a node)
- Delete current imperative `patterns.ts`, `rewrite.ts`, `strategies.ts` and the closure pass

Reference: GP 2 rule format, AlgebraicRewriting.jl API, Ehrig et al. textbook.

Done. Files in `src/GRAM/grs/` (rule.ts, match.ts, rewrite.ts, strategy.ts). Also removed `incoming` index from Graph (scan-based `Edges.to` instead). 62 tests passing.

## Step 3: Eta-reduce pass ✓

First real DPO rule. `λx. f(x)` → `f` when `x` not free in `f`.

- LHS: lambda → app → var:bound → lambda (self-referential)
- RHS: just `f`
- Interface: `{f}`
- Where: `f` has no reference to the lambda binder

Validates the engine handles edge rewiring, node deletion, dangling edge rejection.

## Step 4: Saturation pass ✓

Accumulate args on foreigns/primops until fully applied. NbE-style: two fixed DPO rules, no parameterization.

- Rule 1: `app(var:ref → var:foreign)` → `external { name, arity, args: 1 }` with `:callee` and `:arg_0`
- Rule 2: `app(external)` → `external { args: n+1 }` absorbing next arg
- Repeat rule 2 until no more `app(external)` patterns exist
- When args === arity: saturated. Primops (name in ARITIES) → `primop`. Foreign FFI → `external { saturated }`.
- Unsaturated externals survive for closure conversion
- Arity stored in `var:foreign` payload. Translate takes arity map as context (same as MIR's Declaration map).
- Primop arities from `lowering/shared/primops.ts`. FFI arities from declarations.

**Not in scope:** app-spine on lambdas. Structurally similar accumulation but resolution is beta reduction (substitution), not call emission. That's partial evaluation / inlining — future pass.

**Ordering principle:** structural simplifications (eta, saturation) before representational commitments (closure conversion). Saturating foreigns avoids unnecessary closures.

## Step 5: Closure conversion ✓

Two additive passes: `capture` + `close`.

**capture:** for each open lambda (no `:env` edge), queries `:scope` edges to find vars scoped to this lambda whose `:refers_to` target is outside (global or lower level). Creates `env` node with `:capture` edges. Links via `:env`. Only captures vars actually used in the body — unused in-scope vars are not captured. Lambda preserved, body unchanged.

**close:** for each lambda with `:env` but no closure wrapper, creates `closure` node with `:body -> lambda` and `:env -> env`. Additive — lambda untouched, app edges unchanged. Closure node is a first-class entity linking lambda + env for backends that need it.

**Infrastructure added:**
- `:scope` edges from var:bound and var:ref to all enclosing binders (added during translate)
- `level` in binder payloads (de Bruijn level, set during translate)
- `isStructural(label)` — allowlist for structural edge traversal (prevents `:scope` creating unwanted reachability in `Query.any`/`Query.collect`)
- `Query.any` and `Query.collect` accept optional `follow` filter

Done. Files: `passes/closure.ts`, updated `translate.ts`, `vocabulary.ts`, `graph.ts`. 93 tests passing.

## Step 6: Pipeline integration ✓

Pipeline module with pass descriptors, configuration validation, and end-to-end verification.

**Pass descriptors:** each pass declares `requires` (tags/labels it pattern-matches on) and `delta` (tags/labels it adds/removes). Descriptors enable structural ordering validation without semantic analysis.

**Pipeline configuration:** `configure(...descriptors)` threads a running vocabulary through passes, checks each pass's `requires` is satisfied, detects consumed-after-removal. Returns `Either<Inconsistency[], Pipeline>`.

**Verification:** `verify(graph, vocabulary?)` checks dangling edges, missing entry, unexpected tags. Returns `Either<Violation[], Graph>`. Orphan nodes and disjoint subgraphs are cleanup concerns (future DCE pass), not verification violations.

**`compile`:** `EB.Term → Either<CompileError, Graph>`. Translates, runs default pipeline (eta → saturate → closure-convert), verifies.

**Eta bug fix:** added `index === 0` payload check on `$arg` — prevents spurious eta-reduction when a `var:bound` with index > 0 happens to `:refers_to` the lambda (it's a reference from a deeper scope, not the lambda's parameter).

**Shift/reset:** skipped. `shift` and `reset` nodes survive the pipeline unchanged. Shift/reset compilation is a separate step.

Done. Files in `src/GRAM/pipeline/` (descriptor.ts, configure.ts, verify.ts, index.ts). 116 tests passing (2 skipped for shift/reset).

## Step 7: Shift/reset enrichment ✓

Enrichment pass that surfaces delimited continuation control flow in the graph without compiling to a specific backend form.

### Design

The pass enriches — not simplifies. It adds `bubble`, `continuation`, and `resumption` nodes/edges so backends can extract their preferred pattern (MIR dispatcher or selective CPS) from the same enriched graph. Shift and reset nodes are preserved for provenance.

Danvy-Filinski semantics: `reset E[shift (λk. e)] → reset (e[k := λx. reset E[x]])`. The pass makes the continuation structure (hole, delimiter, handler, resumption sites) explicit.

### New vocabulary

Tags: `bubble` (continuation hole / landed value), `continuation` (reified continuation), `resumption` (retagged k-call).

Labels: `:delimiter` (continuation → reset), `:captured_at` (continuation → shift), `:handler` (continuation → lambda{k}), `:param` (continuation → bubble), `:invokes` (resumption → continuation).

### Transformation

1. For each `reset`, find its `shift` descendant via structural edges
2. Create `bubble` node, redirect shift's parent edge to it (uniform for let-binding or expression position)
3. Detach shift → lambda edge, create `continuation` with `:delimiter`, `:captured_at`, `:handler`, `:param`
4. Retag k-calls (`app` nodes whose `:func` resolves to the shift lambda) as `resumption`, wire `:invokes`
5. Binder name from parent `stmt:let` if available, otherwise synthesized `$bubble_N`

### Pipeline position

```
eta → saturate → shift/reset → closure-convert
```

The handler's lambda goes through normal closure conversion automatically.

### Implementation

Imperative aggregate pass (like `capture` in closure conversion). Cannot be a single DPO rule: requires walking from reset to find shift, identifying k-calls by tracing var:bound → refers_to → lambda, redirecting parent edges.

### Prerequisite fix

`translate` was emitting `var:meta` nodes for shift terms because elaboration stashes shift expressions as skolem metas. Fixed by making `translate` skolem-aware (resolves stashed terms) and zonker-aware (resolves type metas via `NF.quote`). Pipeline explorer also updated to display and pass skolem/zonker info.

Done. Files: `passes/shift-reset.ts`, updated `vocabulary.ts`, `pipeline/index.ts`. 127 tests passing.

## Step 8: Backend codegen from GRAM

Pick one backend (probably JS) and implement codegen directly from the refined GRAM graph. Compare output with existing MIR-based JS codegen.

## Future steps (not planned in detail)

- Dead code elimination (orphan nodes + disjoint subgraph cleanup — e.g. dangling annotation subtrees after eta-reduce)
- Beta reduction / constant folding / partial evaluation passes
- Defunctionalization pass (for GPU backend)
- Type-directed passes (linearity → in-place decisions) before type erasure
- Pattern compilation as DPO rules
- Backend vocabulary validation
- Passes in Yap source

## Session log

- **`6a31c08c`** (2026-05-14 → 2026-05-16): steps 1-5. Design + implementation of graph substrate, DPO engine, eta-reduce, saturation, closure conversion. Design discussions on enrichment vs simplification, LoGRAM, cross-platform libraries. Transcript: `~/.claude/projects/-Users-t-vilaverde-Workspace-panlogion-yap/6a31c08c-ca2d-4de0-9be8-1589af1eab52.jsonl`
- **Cursor session** (2026-05-17): steps 6-7. Pipeline integration, pass descriptors, verify, eta bug fix. Skolem/zonker-aware translate. Shift/reset enrichment pass. Branch: `i-dont-do-it-for-the-gram`.

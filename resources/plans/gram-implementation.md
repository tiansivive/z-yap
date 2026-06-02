# GRAM: Graph Data Structure + EB.Term Translation

## Context

Yap's compilation pipeline is moving toward GRAM (Graph Rewriting Abstract Machine) — an open-vocabulary property graph that passes progressively refine toward backend-specific vocabularies. This task introduces the foundational graph data structure, core operations, the translation from `EB.Term` into GRAM, and graph display/printing.

Design docs: `brainstorming/yap/lowering/GRAM.md`

## Code style

Follow the project guidelines in:
- `AGENTS.md` — project overview, style summary
- `.cursor/rules/coding-style.mdc` — immutable, declarative, namespace APIs, one-word names
- `.cursor/rules/pattern-matching.mdc` — ts-pattern with const pattern objects, no if checks
- `.cursor/rules/conventions.mdc` — path aliases, pitfalls
- `.cursor/rules/testing.mdc` — snapshot patterns, supply resets
- `.cursor/rules/agent-behavior.mdc` — collaborative, validate, surface issues
- `~/.claude/CLAUDE.md` — writing style for docs/comments

Key points for this implementation:

**Namespace-based APIs.** Group functions by logical unit, expose as namespaced objects. `G.Nodes.add()`, `G.Edges.add()`, `G.Query.byTag()`, `G.Query.follow()` — not flat functions. Encode functionality in namespaces (objects with methods/fields), not in function names.

**One-word names.** `ctx`, `st`, `x`, `fn`, `env`, `acc`, `prov`, `lam`. Multi-word names indicate a function does too much — refactor.

**ts-pattern everywhere.** All type dispatch via `match().with().exhaustive()`. Use `.otherwise()` for fallthrough. Define reusable const pattern objects (like `EB.CtorPatterns`, `NF.Patterns`). No if/else chains, no predicate helpers.

**Small functions.** 10-30 lines typical. Single responsibility. Name functions instead of inlining logic. Early return / short-circuit, not nested conditionals.

**Declarative over imperative.** Prefer recursion over loops. Prefer `map`/`filter`/`reduce` over manual iteration. Prefer function composition over interstitial variables. `Array.map(doStuff)` not `Array.map(v => doStuff(v))`.

**Records over Maps.** Plain `Record<string, T>` for static/config. Maps only for dynamic lookup tables that grow/shrink at runtime.

**Immutable.** All graph operations return new graphs. No mutation. Spread-based copy-on-write.

**Display pattern.** Nested object of match-based dispatchers. Each variant → one match case → string. Recursive via qualified calls (`d.node()`, `d.edges()`).

## Directory

```
src/GRAM/
├── graph.ts        — Graph, Node, Edge types + namespaced operations
├── vocabulary.ts   — Initial tag/label string constants
├── provenance.ts   — Source location + pass metadata types
├── display.ts      — Graph pretty-printing (debug + snapshot output)
├── patterns.ts     — Pattern type + matcher
├── rewrite.ts      — Match + builder → new graph
├── strategies.ts   — Combinators: seq, onTag, untilFixpoint, bottomUp, topDown
├── translate.ts    — EB.Term → GRAM
├── index.ts        — Re-exports
└── __tests__/
    ├── graph.test.ts
    ├── patterns.test.ts
    └── translate.test.ts
```

Add to `tsconfig.json` paths:
```json
"@yap/gram": ["./src/GRAM/index"],
"@yap/gram/*": ["./src/GRAM/*"]
```

## 1. `provenance.ts`

```typescript
import type { Location } from "@yap/shared/provenance";
export type { Location };
export type PassId = string;
export type Provenance = {
  readonly location?: Location;
  readonly created_by: PassId;
  readonly derived_from?: ReadonlyArray<number>;
};
```

Reuse `Location` from `@yap/shared/provenance`.

## 2. `vocabulary.ts`

String constants for initial tags and labels. Tags and labels are open `string` types — constants are documentation, not exhaustive.

**Term tags:** `lit`, `var:bound`, `var:free`, `var:foreign`, `var:label`, `var:meta`, `var:ref`, `lambda`, `pi`, `sigma`, `mu`, `let`, `app`, `row:ext`, `row:empty`, `row:var`, `proj`, `inj`, `match`, `case`, `block`, `stmt:let`, `stmt:expr`, `stmt:using`, `modal`, `reset`, `shift`

**Type tags (NF.Value):** `type:var`, `type:lit`, `type:app`, `type:pi`, `type:sigma`, `type:lambda`, `type:mu`, `type:row:ext`, `type:row:empty`, `type:neutral`, `type:modal`, `type:closure`, `type:external`

**Edge labels:** `:body`, `:func`, `:arg`, `:annotation`, `:value`, `:rest`, `:target`, `:scrutinee`, `:return`, `:term`, `:refers_to`, `:has_type`, `:derived_from` + indexed: `:case_N`, `:stmt_N`

## 3. `graph.ts`

Immutable property graph. All operations return new graphs. Display logic goes in `display.ts`.

```typescript
type NodeId = number
type Tag = string
type Label = string
type Payload = Readonly<Record<string, unknown>>

type Node = {
  readonly id: NodeId
  readonly tag: Tag
  readonly payload: Payload
  readonly provenance: Provenance
}

type Edge = {
  readonly source: NodeId
  readonly label: Label
  readonly target: NodeId
  readonly payload: Payload
}

type Graph = {
  readonly nodes: ReadonlyMap<NodeId, Node>
  readonly edges: ReadonlyMap<NodeId, ReadonlyMap<Label, Edge>>
  readonly incoming: ReadonlyMap<NodeId, ReadonlyMap<Label, NodeId>>
  readonly byTag: ReadonlyMap<Tag, ReadonlySet<NodeId>>
  readonly root?: NodeId
}
```

Module-level `freshId` counter (same pattern as `mir.ts:73`, `term.ts:74`), with `resetId()`.

**Namespace-based API.** Operations grouped by logical unit:

```typescript
export const Nodes = {
  add: (tag, payload, prov) => (g) => [NodeId, Graph],
  remove: (id) => (g) => Graph,
  get: (id) => (g) => Node | undefined,
}

export const Edges = {
  add: (source, label, target, payload?) => (g) => Graph,
  remove: (source, label) => (g) => Graph,
  outgoing: (id) => (g) => ReadonlyMap<Label, Edge>,
  byLabel: (id, label) => (g) => Edge | undefined,
  incoming: (id) => (g) => ReadonlyMap<Label, NodeId>,
}

export const Query = {
  byTag: (tag) => (g) => ReadonlySet<NodeId>,
  follow: (id, ...labels) => (g) => NodeId | undefined,
  subgraph: (ids) => (g) => Graph,
}

export const setRoot = (id) => (g) => Graph
export const empty: Graph = { ... }
export const resetId = () => void
```

Usage: `import * as G from "./graph"` then `G.Nodes.add(...)`, `G.Edges.add(...)`, `G.Query.byTag(...)`.

Internal helpers for index maintenance are separate named functions (`updateTagIndex`, `cleanupIncoming`) — not inlined.

## 4. `display.ts`

Separate file for graph printing. Follows the established display pattern.

```typescript
const d = {
  graph: (g: Graph): string => ...
  node: (n: Node): string => ...
  edges: (g: Graph, id: NodeId): string => ...
  payload: (p: Payload): string => ...
}

export const display = d.graph;
```

Compact debug output for snapshots. Stable ordering by NodeId. Format:
```
root: [1]
[1] lambda {variable: "x", icit: "Explicit"}
  :annotation -> [2]
  :body -> [3]
[2] var:free {name: "Int"}
[3] var:bound {index: 0}
  :refers_to -> [1]
```

## 5. `translate.ts`

`EB.Term → Graph`. The critical validation of the graph API.

```typescript
export const translate: (term: EB.Term, opts?: { locations?: ReadonlyMap<number, Location>; types?: Record<number, { nf: NF.Value }> }) => Graph
```

**Translation state** (threaded explicitly — translation is a pure fold, no writer/reader):

```typescript
type State = {
  graph: Graph
  binderStack: ReadonlyArray<NodeId>
  freeVars: ReadonlyMap<string, NodeId>
  foreignVars: ReadonlyMap<string, NodeId>
  locations: ReadonlyMap<number, Location>
  types: Readonly<Record<number, { nf: NF.Value }>>
}
```

**Dispatch** via `ts-pattern` exhaustive match, same pattern as `lower.ts`. Each constructor gets its own small function (10-30 lines).

**Translation helpers** — small named functions for repeated patterns:

- `emit(st, tag, payload, prov) => [NodeId, State]`
- `link(st, source, label, target) => State`
- `pushBinder(st, id) => State` / `popBinder(st) => State`
- `intern(defTag, name, pool, termId, st) => [NodeId, State]`

Each EB.Term constructor maps to node(s):

| EB.Term | GRAM node | Edges |
|---------|-----------|-------|
| `Lit { value }` | `lit` with value in payload | — |
| `Var { Bound { i } }` | `var:bound` | `:refers_to` → `binderStack[len - 1 - i]` |
| `Var { Free { name } }` | `var:ref` | `:refers_to` → interned `var:free` node |
| `Var { Foreign { name } }` | `var:ref` | `:refers_to` → interned `var:foreign` node |
| `Var { Label { name } }` | `var:label` with name | — |
| `Var { Meta { val, lvl } }` | `var:meta` with val, lvl | — |
| `Abs { Lambda, body }` | `lambda` with variable, icit | `:annotation`, `:body` |
| `Abs { Pi, body }` | `pi` with variable, icit | `:annotation`, `:body` |
| `Abs { Sigma, body }` | `sigma` with variable | `:annotation`, `:body` |
| `Abs { Mu, body }` | `mu` with variable, source | `:annotation`, `:body` |
| `Abs { Let, body }` | `let` with variable | `:value`, `:annotation`, `:body` |
| `App { func, arg }` | `app` with icit | `:func`, `:arg` |
| `Row { empty }` | `row:empty` | — |
| `Row { ext { label, value, row } }` | `row:ext` with label | `:value`, `:rest` |
| `Row { variable }` | `row:var` | via `translateVar` |
| `Proj { label, term }` | `proj` with label | `:target` |
| `Inj { label, value, term }` | `inj` with label | `:value`, `:target` |
| `Match { scrutinee, alts }` | `match` | `:scrutinee`, `:case_N` → `case` nodes |
| `Block { stmts, return }` | `block` | `:stmt_N` → stmt nodes, `:return` |
| `Modal { term, modalities }` | `modal` with quantity | `:term` |
| `Reset { term }` | `reset` | `:body` |
| `Shift { body }` | `shift` | `:body` |

**De Bruijn resolution:** All `Abs` variants push their node onto `binderStack` before translating the body. `Bound(i)` resolves to `binderStack[len - 1 - i]` and gets a `:refers_to` edge. Block `Let` statements also push.

**Mu self-reference:** Node id is allocated before body translation. `Bound(0)` in the body resolves to the Mu node itself.

**Variable interning:** `Free` and `Foreign` vars sharing the same name share a single definition node. Each occurrence creates a `var:ref` → `:refers_to` edge.

**Type subgraph:** When `opts.types[term.id]` exists, `NF.Value` is translated similarly (using `type:*` tags) and connected via `:has_type`. v1 treats `NF.Closure` as opaque (`type:closure` node with closure in payload).

**`:annotation` vs `:has_type`:** `:annotation` is syntactic (the annotation term in the binder). `:has_type` is semantic (the elaborated NF.Value). Both present when both available.

## 6. `patterns.ts`

Pattern type + matcher.

```typescript
type NodePattern =
  | { kind: "tag"; tag: Tag; edges?: ReadonlyArray<EdgePattern>; payload?: (p: Payload) => boolean; bind?: string }
  | { kind: "any"; bind?: string }
  | { kind: "ref"; name: string }

type EdgePattern = { label: Label; target: NodePattern }
type Bindings = ReadonlyMap<string, NodeId>
type Match = { readonly root: NodeId; readonly bindings: Bindings }
```

Patterns are plain records:

```typescript
const lambdaWithBody: NodePattern = {
  kind: "tag",
  tag: "lambda",
  bind: "$lam",
  edges: [{ label: ":body", target: { kind: "any", bind: "$body" } }]
}
```

**Matching:**
- `matchAll(pattern) => (g: Graph) => ReadonlyArray<Match>` — anchors on `byTag` for O(1) candidate set
- `matchAt(pattern, nodeId) => (g: Graph) => Match | undefined`

Recursive `matchNode` function — check tag, check payload predicate, bind variable, recurse into edge patterns. Back-references (`ref`) check that the already-bound id matches. v1: no negation, no transitive closure.

## 7. `rewrite.ts`

```typescript
type Builder = (bindings: Bindings, g: Graph) => Graph
type Rule = { readonly pattern: NodePattern; readonly builder: Builder }

const applyOnce: (rule: Rule) => (g: Graph) => Graph | undefined
const apply: (rule: Rule) => (g: Graph) => Graph
```

Builder receives bindings + current graph, returns new graph. Matched subgraph is NOT auto-removed — builder decides what to keep/replace.

## 8. `strategies.ts`

```typescript
type Pass = (g: Graph) => Graph

const seq: (...passes: Pass[]) => Pass
const onTag: (tag: Tag, f: (nodeId: NodeId, g: Graph) => Graph) => Pass
const untilFixpoint: (pass: Pass, maxIters?: number) => Pass
const bottomUp: (rule: Rule) => Pass
const topDown: (rule: Rule) => Pass
const when: (pred: (g: Graph) => boolean, pass: Pass) => Pass
```

## 9. `index.ts`

Re-exports following codebase convention. Namespace exports for logical groupings.

## Build order

1. `provenance.ts` + `vocabulary.ts` — no deps
2. `graph.ts` — core data structure (types + namespaced operations, no display)
3. `display.ts` — graph printing
4. `translate.ts` + `__tests__/translate.test.ts` — **design gate**: validates the graph API against real EB.Term data using `EB.DSL` builders and snapshot tests
5. `__tests__/graph.test.ts` — unit tests for graph operations
6. `patterns.ts` + `__tests__/patterns.test.ts`
7. `rewrite.ts` + `strategies.ts`
8. `index.ts`

Step 4 is the critical milestone. If translation + snapshots work, the graph design is validated.

## Tests

Use `vitest`. Use `EB.DSL` builders (`EB.DSL.num`, `EB.DSL.lambda`, `EB.DSL.app`, etc.) — same pattern as `src/Codegen/v2/c/__tests__/emit.test.ts`. `beforeEach` resets both `EB.resetId()` and `resetId()` (see `testing.mdc`).

Key test cases for `translate.test.ts`:
- `Lit(42)` → single `lit` node
- `Lambda(x, Bound(0))` → `lambda` with `:body` → `var:bound` with `:refers_to` back to lambda
- `App(Lambda(x, Bound(0)), Num(1))` → full tree
- Nested lambdas with correct de Bruijn resolution
- `Mu` self-reference
- Row/struct/match/block terms
- Free/foreign variable interning (two refs to same name → same definition node)

Use `display(g)` for snapshot content.

## Verification

```bash
npx vitest run src/GRAM/__tests__/
npx tsc --noEmit 2>&1 | grep "GRAM"  # should return nothing
```

## Critical files

- `src/elaboration/syntax/term.ts` — EB.Term definition
- `src/elaboration/syntax/dsl.ts` — EB.DSL builders (for tests)
- `src/elaboration/normalization/syntax/term.ts` — NF.Value (for type subgraph)
- `src/shared/rows.ts` — Row type
- `src/shared/provenance.ts` — Location type
- `src/shared/literals.ts` — Literal type
- `src/lowering/mir.ts` — reference for branded type + freshId pattern
- `src/lowering/pretty.ts` — reference for display pattern
- `AGENTS.md` — project overview, style summary
- `.cursor/rules/coding-style.mdc` — coding style rules
- `.cursor/rules/pattern-matching.mdc` — ts-pattern conventions
- `.cursor/rules/conventions.mdc` — path aliases, pitfalls
- `.cursor/rules/testing.mdc` — test patterns, supply resets
- `.cursor/rules/agent-behavior.mdc` — collaborative behavior

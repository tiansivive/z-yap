# Piescript Design Session: Pi-Calculus & Distributed Computation

**Session ID**: `6c10d690-5758-49da-88f5-4c38f2f9cd72`
**Date**: 2026-03-11
**Workspace**: elasticsearch

---

## [0] User

@.cursor/plans/phase3_stream_runtime.plan.md 
@.cursor/plans/phase4_process_primitives.plan.md 
We need to discuss these 2 steps
The main point of piescript is to allow distributed compuation. We have an interpreter that walks out Core IR. How does that interact with the distributed goal and the Π-calculus process primitives?

---

## [1] Assistant

Let me read the plan files and the supporting documentation to give you a thorough answer.

The user wants to discuss how the interpreter that walks the Core IR interacts with the distributed computation goal and the Π-calculus process primitives. Let me read the two plan files and the related documentation to give a thorough answer.

---

## [2] Assistant

Let me also check the current source code to understand how the interpreter is structured today.

Now let me also read the current state and any existing source code to understand the interpreter better.

---

## [3] Assistant

Now I have the full picture. This is a really important architectural question — let me lay out how these pieces interact and where the tensions are.

## The Core Tension

You have a **tree-walking interpreter** — inherently sequential, single-node, walking Core IR nodes one at a time. But the stated purpose of piescript is **distributed computation**, and Π-calculus is the theoretical foundation for reasoning about **parallel, communicating processes**. These seem to be at odds.

The resolution is understanding what role each layer plays.

## The Interpreter as Orchestrator, Not Executor

The tree-walking interpreter is not where computation happens — it's where computation is **coordinated**. Think of it as an orchestration engine (like Temporal or Airflow), not a data processing engine. The actual heavy work is delegated:

- **Data processing** → ESQL's compute engine (distributed across shards/nodes, vectorized on `Page`/`Block`s)
- **Stream transforms** → either compiled to `ExpressionEvaluator` trees (Phase 3, fast path) or interpreted per-row (slow fallback)
- **Parallel queries** → fired as async `ActionListener`s into ES's thread pool (Phase 4)

The interpreter walks the Core IR and, at each interesting node, hands off to a specialized engine. It's the glue.

## How `par` Maps to Π-calculus (and Where It Falls Short)

Phase 4's `par` block is conceptually Π-calculus parallel composition:

```
par { let errors = query1; let metrics = query2; } in body
```

Maps to:

```
(ν c_errors)(ν c_metrics)(
    query1.send(c_errors, result1)
  | query2.send(c_metrics, result2)
  | recv(c_errors, errors).recv(c_metrics, metrics).body
)
```

The interpreter implements this as: fire two async queries, join their futures, bind results in environment, continue to body. Channels are **implicit** — they're just `ActionListener` / `PlainActionFuture` pairs. The user never sees them.

This works, but it reduces Π-calculus to **structured concurrency** — independent parallel bindings with a join. You lose the distinctive features that make Π-calculus powerful:

| Π-calculus Feature | Phase 4 v0 Status | Why It Matters for Distribution |
|---|---|---|
| Parallel composition (P \| Q) | `par` block (restricted form) | Concurrent queries |
| Channel creation (ν c) | Implicit (futures) | Fresh communication paths |
| Name passing (send channel over channel) | Not present | **Mobility** — redirect data flows at runtime |
| Guarded choice (c₁?x.P + c₂?y.Q) | Not present | **Race** — take whichever result arrives first |
| Replication (!P) | Not present | **Services** — reusable process templates |
| Input/output types on channels | Not present | **Session types** — protocol safety |

Without name passing and guarded choice, you have concurrent execution but not true distributed coordination.

## The Architectural Gap Between Phase 3 and Phase 4

Here's what I think is the real issue: **Phase 3 and Phase 4 are designed in isolation, but in a distributed system they're deeply coupled.**

Consider this program:

```
par {
  let errors = query FROM logs-* | WHERE status >= 500;
  let metrics = query FROM metrics-*;
} in errors |> map (fn d -> { svc: d.service, ts: d.@timestamp })
             |> filter (fn d -> d.svc != "unknown")
```

Under the current architecture:

1. The interpreter hits `Par`, fires two queries concurrently (Phase 4)
2. Both queries return full result streams to the coordinating node
3. The interpreter takes the `errors` stream and applies `map` then `filter` (Phase 3)
4. The `metrics` stream was fetched but never used — wasted work

The problems:
- **All data flows through the coordinator.** The `map` and `filter` could have been pushed down into the ESQL query (as `EVAL` and `WHERE` clauses), avoiding data transfer entirely.
- **No data-flow awareness across `par` boundaries.** The interpreter doesn't know that `metrics` is unused until it finishes evaluating the body.
- **Streams from `par` are pull-based iterators held by the interpreter.** There's no mechanism for one process's output to feed another process's input without going through the coordinator.

## What the Π-calculus Model Could Actually Give You

If you take Π-calculus seriously as a *compilation target* rather than just a *syntactic convenience*, it enables a fundamentally different execution model:

**Interpreter-as-planner instead of interpreter-as-executor:**

1. Walk the Core IR to produce a **process graph** (not execute it)
2. Each `query` becomes a process located at the relevant data nodes
3. Each `map`/`filter` becomes a local transform co-located with its data source (push-down)
4. `par` becomes actual parallel composition in the process graph
5. Channels become edges in the graph — data flow paths, potentially cross-node
6. The process graph is optimized (dead-code elimination for unused bindings, push-down of transforms into queries) and then **distributed** to the relevant nodes for execution

This is essentially what ESQL already does with its physical plan + exchange operators + driver model. Piescript's contribution would be a higher-level language for expressing process composition that ESQL can't express (multi-query orchestration, user-defined transforms between data sources, fan-out/fan-in patterns).

## My Recommendation

There are three coherent paths forward:

### Path A: Interpreter stays as-is, Π-calculus is just a design metaphor

Keep the tree-walking interpreter as a centralized coordinator. `par` is structured concurrency. Channels are never exposed. The Π-calculus heritage informs the language design (parallel composition, independence, scoping) but doesn't drive the execution model.

**Pro:** Simplest. Ship quickly. The language is useful for multi-query orchestration.
**Con:** Not really distributed computation — it's centralized orchestration of distributed queries. Every byte of data flows through one node.

### Path B: Two-phase architecture — interpret then plan

The interpreter runs the *functional* parts of the program (let-bindings, lambdas, pure expressions) eagerly. But when it encounters *process* parts (`par`, `query`, stream combinators), it **builds a plan** instead of executing immediately. After the plan is built, it's handed to a distributed executor.

```
Core IR  →  Interpreter (functional)  →  Process Graph  →  Optimizer  →  Distributed Executor
                                              ↑
                                    par, query, map,
                                    filter, fold, channels
```

This is the hybrid approach: tree-walking for the functional layer, planning + distribution for the process layer. The Π-calculus primitives have real operational meaning — they compile to distributed process graphs.

**Pro:** True distributed execution. Transforms can be pushed to data. The interpreter handles the parts that can't be distributed (closures, higher-order functions).
**Con:** Significantly more complex. Requires defining the process graph IR and building an optimizer/executor.

### Path C: Evolve incrementally — start with A, design for B

Ship Phase 3+4 with Path A semantics (interpreter as coordinator). But design the Core IR and `StreamVal`/process representations so they can be replaced by a plan-based approach later:

- `StreamVal` is an opaque interface — initially wraps an iterator-of-Pages, later wraps a plan node
- `Par` evaluation initially fires async queries and joins, later builds a subgraph
- The "compilability check" from Phase 3's hybrid approach (Q3.1 Option C) is the seed of the optimizer — it already partitions lambdas into "can be pushed to compute engine" vs. "must be interpreted"

This way the interpreter's role shrinks over time as more of the program is compiled to plans rather than interpreted.

## The Specific Interaction Points

To directly answer your question about how the interpreter interacts with Π-calculus primitives:

1. **`Par` node in Core IR** — The interpreter recognizes this as a parallel composition. It spawns concurrent query executions (currently via `ActionListener`), waits for all results, and binds them in the environment. This is operational semantics for `P | Q` where P and Q are query processes.

2. **`Query` node** — This is a process that communicates with the ESQL engine. In Π-calculus terms, it's a process that outputs on an implicit channel. The interpreter fires the query and wraps the result as a `StreamVal`.

3. **Stream combinators (`map`, `filter`, `fold`)** — These transform processes. In Π-calculus terms, they're process combinators that take an input channel and produce an output channel. The interpreter either compiles them (fast path) or interprets them (slow path).

4. **Future `send`/`recv`/`new`** — These would be direct channel operations. The interpreter would maintain a channel table (name → blocking queue or similar) and implement send as enqueue, recv as dequeue-or-block.

The interpreter is the **reduction engine** for the process calculus. Every Π-calculus reduction rule (COMM, PAR, RES, STRUCT) has a corresponding interpreter step. The question is whether that's sufficient, or whether you eventually need to compile process terms rather than interpret them.

Given where the project is (Phase 0 complete, Phase 1 not started), I'd suggest **Path C** — build the interpreter, but keep the process layer behind clean abstractions so you can swap in a plan-based execution model when the language matures enough to need it.

Now I have a comprehensive picture of the project. Let me think deeply about the user's question: how does a tree-walking interpreter over Core IR interact with the distributed computation goal and Π-calculus process primitives?

This is a really fundamental architectural question. Let me think through it:

1. **Current state**: Phase 0 is done (ESQL passthrough). Phases 1-4 are planned.

2. **The interpreter**: Phase 1c defines a tree-walking interpreter that walks Core IR. This is a sequential, single-node evaluator.

3. **Phase 3 (Stream Runtime)**: Connects the interpreter to ESQL's compute engine for data flow. 

The interpreter encounters `Query` nodes, delegates to ESQL, gets back `Page`s, and applies user-defined transforms.

4. **Phase 4 (Process Primitives)**: Introduces `par` blocks for concurrent query execution with Π-calculus-inspired semantics.

The key tension here is that a tree-walking interpreter is fundamentally sequential and local—it processes nodes one at a time on a single thread. So how does this architecture actually support distributed computation? And how do Π-calculus process primitives, which are designed for parallel communicating processes, fit into a sequential tree walker?

The interpreter acts as an orchestrator rather than an executor. It walks the Core IR tree, delegating to ESQL when it encounters `Query` nodes to handle the actual distributed computation across shards, compiling or interpreting lambdas for `map`/`filter`/`fold` operations, and firing off concurrent queries when it hits `Par` nodes before joining results. This coordination layer sits above the actual data processing, determining what runs where and how results flow together. The Π-calculus connection emerges here—processes are independent computational units and channels are the communication paths between them, which maps onto how the interpreter orchestrates multiple concurrent queries and their result composition.

Now I'm seeing how Phase 4 reduces this to structured concurrency. The `par` block with independent bindings is essentially parallel composition where each query is a process, the bindings act as implicit channels carrying results, and the interpreter implements this by firing async queries and joining their outputs. This is elegant but also creates a tension—we're leveraging Π-calculus concepts while constraining them to a simpler, more predictable model.

The real power of Π-calculus—dynamic channel creation, name passing for mobility, guarded choice, replication, producer-consumer patterns—none of that exists in v0. It's all deferred to future phases. So the fundamental question becomes whether a tree-walking interpreter can even scale to handle the distributed computation model this language is meant to support, or if we're building something that will need a completely different runtime architecture down the line. Let me think about this from several angles:

**Argument 1: The interpreter is fine as a coordinator**

The analogy is: the interpreter is like an orchestration engine (think Temporal, Airflow, etc.). It doesn't do the heavy lifting — it tells other systems (ESQL, the compute engine) what to do. The distributed computation happens *below* the interpreter:
- ESQL distributes query execution across shards/nodes
- The compute engine runs operators across data partitions
- The interpreter just tells them what to run and how to combine results

In this model, Π-calculus primitives are implemented at the interpreter level as coordination logic:
- `par` → fire multiple async operations
- channels → futures/action-listeners
- send/receive → completing/awaiting futures

**Argument 2: The interpreter is a bottleneck**

But if piescript is truly about distributed computation, a single-threaded tree-walking interpreter becomes a coordination bottleneck — all the logic runs on one node, and complex programs with many parallel blocks and channels get limited by the interpreter's throughput. For real distributed Π-calculus, I'd need to compile the process structure into a distributed execution plan where each process runs near its data and channels become actual network communication.

**Argument 3: Hybrid approach — interpreter for coordination, plan for data**

The most pragmatic path seems to be combining both: use the interpreter for high-level coordination while compiling the data flow into a distributed execution plan, similar to how ESQL's compute engine works.

The real insight is that Π-calculus is fundamentally about the *programming model* — it gives you a type system for concurrent programs, equational reasoning about process equivalence, and compositionality — rather than dictating a specific execution strategy.

I'm realizing there's a tension between Phase 3 and Phase 4: Phase 3 focuses on data flow through streams while Phase 4 handles control flow via parallelism and channels, but in a distributed system these need to be tightly coupled. The interpreter should eventually evolve into a planner that walks the Core IR and generates optimized execution strategies rather than executing directly, so that parallel blocks can push their stream transforms down into the execution layer instead of pulling everything back to the coordinator.

---

## [4] User

yes, B is the true goal here! where the we build a plan and push the lambda/closure/apps as  "Code to be executed" in some channel for some stream, and use the Π-calculus sprimitives to coordinate. I agree that we can start simple, with the lambda based stuff, because thats well understood and already requires a substantial amount fo coding, but we should plan this so that we dont lose sight of this distributred computation goal!

---

## [5] Assistant

Great — so Path B is the north star. Let me lay out what that means concretely for the architecture, and how to structure Phases 1/3/4 so they build toward it rather than paint you into a corner.

## The Two-Layer IR Principle

The key architectural insight is that the Core IR should have a **clean separation between two languages**:

| Layer | What it describes | Evaluated how | Examples |
|---|---|---|---|
| **Functional layer** (expressions) | Values, computations that produce values | Tree-walking interpreter (eager) | `let`, `fn`, application, primops, records, match |
| **Process layer** (processes) | Actions that move data, coordinate, communicate | Compiled to an **execution plan** | `query`, `par`, `send`, `recv`, `new`, `map`, `filter`, `fold` over streams |

This is a standard distinction in the Π-calculus literature — *expressions* evaluate to values, *processes* perform effects. It's also analogous to the expression/statement split in imperative languages, or the pure/IO split in Haskell. The boundary between the two layers is the most important seam in the whole system.

When the interpreter walks the Core IR:
- It **evaluates** functional nodes directly (produces values in the local environment)
- It **plans** process nodes (produces plan graph fragments that describe distributed work)

At the end of the walk, you have a **plan graph** — a DAG of distributed operations. That graph is then optimized and dispatched.

## The Execution Pipeline

```
Source Text
  │
  ▼
Parser → AST → Type Checker → Core IR          (Phases 1a, 1b, 1c)
                                 │
                                 ▼
                    ┌────────────────────────┐
                    │   Interpreter Walk      │
                    │                        │
                    │  Functional nodes →     │
                    │    evaluate to values   │
                    │                        │
                    │  Process nodes →        │
                    │    build plan fragments │
                    └───────────┬────────────┘
                                │
                                ▼
                          Plan Graph              (Process IR / Execution Plan)
                                │
                                ▼
                          Optimizer               (push-down, fusion, dead-code elimination)
                                │
                                ▼
                          Executor                (dispatch to nodes, manage channels)
                                │
                                ▼
                          Results
```

The interpreter is **half evaluator, half compiler**. It evaluates the parts it can (pure functions, local bindings), and compiles the parts it can't (queries, stream transforms, parallel composition) into a plan.

## What This Means for Each Phase

### Phase 1: Design the Seam

Phase 1 builds the functional layer — parser, type checker, Core IR, tree-walking evaluator. No process nodes exist yet. But the design should anticipate the seam:

**Core IR node hierarchy** — use a sealed interface structure that has room for process nodes:

```java
sealed interface CoreExpr {
    // Functional nodes (Phase 1)
    record Var(int index) implements CoreExpr {}
    record Lit(Object value, MonoType type) implements CoreExpr {}
    record Lam(CoreExpr body) implements CoreExpr {}
    record App(CoreExpr fn, CoreExpr arg) implements CoreExpr {}
    record Let(CoreExpr bind, CoreExpr body) implements CoreExpr {}
    record PrimOp(Op op, List<CoreExpr> args) implements CoreExpr {}
    record Record(Map<String, CoreExpr> fields) implements CoreExpr {}
    // ...
}

sealed interface CoreProcess {
    // Process nodes (Phase 3+4, added later)
    record Query(String esql) implements CoreProcess {}
    record Par(List<Binding> bindings, CoreExpr body) implements CoreProcess {}
    record MapStream(CoreExpr lambda, CoreProcess source) implements CoreProcess {}
    record FilterStream(CoreExpr lambda, CoreProcess source) implements CoreProcess {}
    record FoldStream(CoreExpr lambda, CoreExpr init, CoreProcess source) implements CoreProcess {}
    // Phase 4+: Send, Recv, New
}
```

The point is: `CoreExpr` and `CoreProcess` are **separate sealed hierarchies** from the start. Even if `CoreProcess` is empty in Phase 1, the evaluator is written knowing it will only handle `CoreExpr`. When process nodes arrive, they go to a different handler (the planner).

**The evaluator interface** — design it so the process-handling path can be swapped:

```java
interface Evaluator {
    Value eval(CoreExpr expr, Env env);
}

interface Planner {
    PlanNode plan(CoreProcess process, Env env);
}
```

Phase 1 only implements `Evaluator`. Phase 3 introduces `Planner`. The interpreter dispatches based on the node type.

### Phase 3: Stream Transforms Build Plan Fragments, Not Iterators

This is where the current plan needs the most rethinking. Phase 3 as written treats streams as runtime values that the interpreter manipulates directly (iterators of Pages, per-row interpretation). Under Path B, streams are **plan graph edges**.

When the interpreter encounters:

```
let docs = query FROM logs-* | WHERE status >= 500;
in docs |> map (fn d -> { svc: d.service }) |> filter (fn d -> d.svc != "unknown")
```

It should build:

```
QueryNode("FROM logs-* | WHERE status >= 500")
    │
    ▼  [stream edge, type: {status: int, service: keyword, ...}]
    │
MapNode(code = fn d -> { svc: d.service })
    │
    ▼  [stream edge, type: {svc: keyword}]
    │
FilterNode(code = fn d -> d.svc != "unknown")
    │
    ▼  [stream edge, type: {svc: keyword}]
    │
ResultNode
```

Each node in this plan carries **code** — the lambda/closure to execute. The code is a `CoreExpr` subtree (already type-checked, already elaborated). It travels with the plan node.

The **optimizer** can then:
1. Look at `MapNode`'s code — it's a simple field projection, compilable to an ESQL `KEEP` clause → push it into the `QueryNode`
2. Look at `FilterNode`'s code — it's a simple comparison, compilable to an ESQL `WHERE` clause → push it into the `QueryNode`
3. Result: the entire pipeline collapses to a single `QueryNode("FROM logs-* | WHERE status >= 500 | KEEP service | RENAME service AS svc | WHERE svc != \"unknown\"")`

If the lambda is NOT simple (it captures variables, uses higher-order functions, etc.), the optimizer leaves it in the plan as a "compute node" that runs the interpreter locally. This is the hybrid from Q3.1, but reframed: it's not "can we compile to ExpressionEvaluator?" — it's **"can this code travel?"**

**The key reframing of Q3.1**: The compilability check is really a **mobility check**. Can this lambda be serialized and sent to a remote node (or pushed into ESQL)? The criteria:
- No free variables that reference mutable interpreter state
- All captured values are serializable
- The body is expressible in the target execution context (ESQL evaluators, compute operators)

For v0, "traveling" just means "pushed into the local ESQL engine." Later, it means "serialized and sent to a data node."

**StreamVal representation** — instead of wrapping `Iterator<Page>`, it wraps a `PlanNode`:

```java
sealed interface StreamVal {
    PlanNode planNode();
}
```

When the interpreter encounters `docs |> map f`, it doesn't execute anything — it takes the `PlanNode` from `docs` and wraps it in a `MapPlanNode(existingPlan, f)`. Plan construction is pure and cheap. Execution is deferred.

### Phase 4: `par` Is Plan Composition, Not Async Coordination

Under Path B, `par` doesn't fire async queries — it builds a parallel plan:

```
par {
  let errors = query FROM logs-* | WHERE status >= 500;
  let metrics = query FROM metrics-*;
} in errors |> map .message
```

The interpreter builds:

```
ParPlan(
  bindings = [
    ("errors",  QueryNode("FROM logs-* | WHERE status >= 500")),
    ("metrics", QueryNode("FROM metrics-*"))
  ],
  body = MapNode(code = .message, source = Ref("errors"))
)
```

The **optimizer** sees that `metrics` is never referenced in the body → dead-code eliminates it. Then it sees that `MapNode(.message)` is a simple projection → pushes it into the `QueryNode`. The final plan is just one query.

Without the plan-based approach (Phase 4 as currently written), you'd fire both queries, wait for both, then discard the metrics result. That's wasted I/O.

**Channels as plan edges** — in the plan graph, every data flow between nodes is a channel. For v0, channels are implicit and local. The plan executor implements them as in-memory queues or direct function calls. Later:
- Channels can cross node boundaries (implemented as network exchanges)
- Channels can be named and user-visible (`new`, `send`, `recv`)
- Channels carry type information (session types — ensuring protocol compliance)

## The Lambda-as-Traveling-Code Problem

This is the hardest design challenge and worth calling out explicitly. When a lambda captures values from the enclosing scope:

```
let threshold = 500;
let classify = fn d -> if d.status >= threshold then "error" else "ok";
query FROM logs-* |> map classify
```

The `classify` lambda has a free variable (`threshold`). To push it into the plan:

1. The interpreter evaluates `threshold` (gets `500`)
2. It builds a **closure**: the lambda body + a snapshot of captured values `{threshold: 500}`
3. The closure is attached to the `MapPlanNode` as "code + environment"
4. The optimizer can inspect the closure: "this is a simple comparison with a captured constant" → push into ESQL as `EVAL classify = CASE(status >= 500, "error", "ok")`
5. If the closure captures something non-serializable (another closure, a stream reference), the optimizer leaves it as a local compute node

For v0, closures always run locally (the interpreter evaluates them per-row). But the **representation** should be a self-contained `(code, captured_env)` pair from the start, so that later phases can serialize and ship them.

This is exactly the Π-calculus insight: in the higher-order π-calculus, you can send processes (code) over channels. A closure is a process. Sending it to a data node is channel communication. The type system (session types, linear types) ensures that the closure is well-formed at the destination.

## Summary: What Needs to Change in the Plans

The current Phase 3 and Phase 4 plans are written with an **interpreter-centric** execution model. To keep Path B as the north star:

**Phase 3 adjustments:**
- Reframe Q3.1 from "compile to ExpressionEvaluator vs. interpret per-row" to **"mobility check — can this code travel with the plan?"** The evaluator compilation is one *implementation* of mobility (code travels into the ESQL engine).
- Reframe Q3.2 from "iterator vs. Driver vs. hybrid" to **"`StreamVal` wraps a `PlanNode`, not a runtime data structure."** The stream is a description of computation, not a running computation.
- Add a plan graph IR between the interpreter and the executor. Even if v0's "optimizer" is a no-op pass-through and the "executor" runs everything locally, the abstraction exists.
- T3.4 (Core IR to ExpressionEvaluator compiler) becomes a component of the optimizer — it's the push-down pass that translates plan nodes into ESQL operations.

**Phase 4 adjustments:**
- Reframe Q4.4 from "thread pool vs. exchange vs. async" to **"plan composition — `par` builds a parallel plan, the executor dispatches it."** The execution strategy (threads, async, exchanges) is an executor concern, not an interpreter concern.
- Reframe Q4.5 (implicit vs. explicit channels) to: **channels are always present as plan edges; the question is whether the surface syntax exposes them.** v0: implicit. Later: explicit with `new`/`send`/`recv`.
- Q4.6 (error semantics) is an executor concern. The plan graph can be annotated with error policies, and the executor implements them.

**New: Plan IR (could be a Phase 3.5 or part of Phase 3)**

A dedicated plan representation:
- `PlanNode` — sealed hierarchy: `QueryNode`, `MapNode`, `FilterNode`, `FoldNode`, `ParNode`, `ChannelNode`
- Each node carries typed edges (channels) and optional code (closures)
- An `Optimizer` pass transforms the plan graph (push-down, dead-code, fusion)
- An `Executor` interface dispatches the plan (v0: all-local; later: distributed)

This keeps the distributed goal visible in the architecture from day one, even though v0 executes everything locally. The plan graph is the contract between "what the user wrote" and "how it runs" — and it's the layer where distribution happens.

The user is confirming that Path B (two-phase architecture: interpret then plan) is the true goal. They want to ensure that while we start simple with the functional/lambda layer (which is already a lot of work), the architecture is designed with the distributed computation goal in mind from the start.

Let me think about what this means concretely for the plan documents and architecture:

1. The interpreter should be designed knowing it will eventually become a planner
2. The Core IR should have clear separation between functional expressions and process expressions
3. StreamVal and process representations should be behind abstractions
4. The "compilability check" from Phase 3 is the seed of the optimizer

The user wants me to discuss how to plan this properly. 

So the real insight here is that the Core IR needs two distinct layers: a functional layer for pure computation (let-bindings, lambdas, literals, pattern matching) that the tree-walking interpreter handles directly, and a process layer (par, query, send, recv, streams) that gets compiled into execution plans. This mirrors the Π-calculus split between expressions and processes, similar to how Haskell separates pure code from IO actions. For Phase 1, I should build the functional IR and interpreter sequentially, but design it so the IR nodes are cleanly partitioned into functional versus process categories, the evaluator is decoupled from the IR itself, and values are abstracted so StreamVal can later represent a plan node instead of just an iterator. Then Phase 3 becomes where the plan-based approach actually kicks in.

Building execution plans instead of eagerly evaluating...

When I encounter a query, I construct a QueryPlan node. Each operation like map or filter becomes its own plan node with the lambda attached as executable code. Once the full plan is built, the optimizer can push operations down into the ESQL layer or fuse them together, then the executor runs it.

For parallel composition, I'm building a ParPlan that holds multiple bindings, each with their own subplans. The optimizer can then decide whether to merge queries hitting the same index or dispatch them to different nodes.

In the plan graph, channels become the edges connecting nodes—data flows along them as it moves through the computation. What used to be Exchange operators in ESQL are now explicit channels in the Π-calculus model, and eventually users will be able to name and control them directly.

The key design decisions are: the IR needs a Process category separate from expressions from the start, the evaluator should build plans for process nodes rather than executing them immediately, StreamVal should represent a plan node that can be distributed, and the compilability check needs to validate that the plan can actually run on the target system.

The trickiest part is handling lambdas that capture variables from the outer scope—when pushing a filter function to remote nodes, I need to identify what free variables it depends on, resolve them in the current environment, serialize the lambda along with those captured values, and send the whole package to the data node for evaluation.

This is really a code mobility problem, similar to what the π-calculus handles. For now I can keep it simple by resolving captures locally and running everything on the coordinator, but I should design the closure representation so it can be serialized later.

For Phase 3, I should add a section on the plan-based execution model, reframe the stream representation so StreamVal becomes a plan node rather than just an iterator, and reframe the compute bridge check as a "mobility check"—can this code actually travel to remote nodes? I should also introduce the concept of plan fragments that build up incrementally.

For Phase 4, I'm shifting the framing from async coordination to plan composition: `par` constructs a plan graph with parallel branches, channels become typed data flow edges in that graph, and the executor takes the complete plan and dispatches it locally at first, then distributed later.

---

## [6] User

I want to make sure we're aligned here, because this last response sounds fine, but some stuff is still a bit dubious.

For example, if I send a program that purely consists of lambda expressions (no queries, and no Π primitives), this will run locally, in whatever node receives the http request. Its just a normal, local, evaluator.
If our script has Π related stuff, like a query or `par` or whatever, say for example, we define a fn `inc`, and then use that to map over some query's results, that `inc` computation will be sent to whatever node needs to run it, yes? Because this is what I see as distributed computing and orchestration?
When you say " half evaluator, half compiler", this to me sounds like a partial evaluator. That is fine, in taht we can probably do constant folding and all that, but it's not the main thing here. It evaluates locally, wherever locally is, and what it can't, it just sends it over to the next node that can do that. The Π primitives are what dictate this, so a plan graph is a plan that states where and how the computations happen, along with the sequence of events.

Wrt to the travelling code problem, i think this si similar to delimited continuations. In fact, if a lambda is closed, then it's no problem at all. If there's free vars, then its a closure, that captures it's env. Since tha language is pure and referentially transparent, we can just send that whole captured env "over-the-wire" to whatever channel/node needs it. We essentially "clone" the env, much like how continuations close the stack state.

Finally, I think the question about the boundary layer is the most pertinent. But I believe we already discussed some of this when talkinga bout Free monads, comparing to haskell's IO and Cont monad. It's about lifting onto a monadic context. I think looking at this in the same way Haskell does with IO is advantageous. The difference is that in Haskell, lO is basically any kind of IO, here we don't so much have IO, we have streams and channels and processes. But the concept is similar, it's handled by the "runtime", which is out graph plan? And it works because of referential transparency, since any side-effect is merely about Π calculus stuff. In the future maybe we allow random side effects, but for now, that's the model.

Am i oversimplifying this?

---

## [7] Assistant

You're not oversimplifying — you've actually identified the clean conceptual model that the plans were obscuring with implementation detail. Let me go through each point and say where I agree fully, and where there's a non-trivial implementation subtlety hiding underneath the clean model.

## Pure programs run locally: yes, exactly

Nothing to add. If there are no Π primitives in the program, the tree-walking evaluator runs to completion on whichever node received the HTTP request. It's a local function. No plan graph, no distribution, no channels. The plan graph machinery is simply never invoked.

## Π primitives dictate distribution: yes, and this is the key design principle

You write `query FROM logs-* |> map inc` — the `inc` function should travel to the nodes that hold the `logs-*` shards. The `query` primitive is what creates the distributed context, and `map` says "apply this code in that context." The Π primitives — `query`, `par`, and eventually `send`/`recv`/`new` — are the **only** things that create distribution. Everything else is local evaluation.

This is the clean rule: **distribution is an effect, and Π primitives are the effect constructors.**

The one implementation subtlety: the "whatever node needs to run it" decision requires a **placement strategy**. ESQL already solves this — it knows which nodes hold which shards and dispatches operator fragments accordingly. Piescript's plan executor would lean on ESQL's existing placement logic for query-bound computation. But the conceptual model is right: the Π primitive determines *that* code travels; the executor determines *where*.

## Partial evaluation, not "half compiler": better framing, I agree

My "half evaluator, half compiler" phrasing was muddled. Your framing is cleaner:

The evaluator is a **normal evaluator** that runs locally. When it encounters a Π primitive, it doesn't "compile" anything — it constructs a description of the distributed work (the plan graph). The plan graph is data. It describes what needs to happen where. Then the executor (runtime) interprets that data.

The evaluator might do constant folding, beta reduction, inlining — sure, that's standard partial evaluation. But that's optimization, not the core architecture. The core architecture is: **evaluate locally, describe remotely**.

## Traveling closures and the delimited continuations analogy

You're right that closed lambdas are trivial — they're self-contained code, ship them anywhere. And you're right that closures with captured environments are fine in a pure, referentially transparent language — the captured values are immutable, so you serialize the code + a snapshot of the captured bindings. No aliasing issues, no mutation hazards.

The delimited continuations parallel is actually deeper than you might intend, and it's worth making explicit because it's architecturally useful.

When the evaluator walks the program and hits a Π primitive, the "rest of the computation" is literally a continuation:

```
let docs = query FROM logs-*;      ← Π primitive (effect)
let result = docs |> map inc;       ← continuation: what to do with the result
result
```

The continuation is: `λdocs. let result = docs |> map inc; result`. The plan graph is a **reification of these continuations**. Each Π primitive becomes a plan node, and its continuation becomes the downstream plan structure. This is exactly the `reset`/`shift` pattern from delimited continuations:

- `query` is a `shift` — it captures the continuation up to the enclosing delimiter
- The plan graph is the reified continuation tree
- The executor interprets the tree by providing values to each continuation

So the plan graph emerges naturally from the evaluation semantics — it's what you get when you reify the continuations at Π primitive boundaries.

The one subtlety worth keeping in mind: **not all captured values will be trivially serializable forever**. In v0, captured values are integers, strings, booleans, records — easy to send over the wire. But later, if a closure captures a *stream* or a *channel reference*, those are handles to running distributed computations, not plain data. You can't naively clone a stream. This is where linear/affine types or session types would come in — to ensure that non-serializable values (live resources) aren't captured by traveling closures. For v0 this doesn't matter because the only resource type is `Stream` and streams only appear at the process level, never captured by functional closures. But it's worth noting as a future type system constraint.

## The IO monad boundary: yes, with one refinement

The analogy to Haskell's IO is the right one, and you already have the key insight: piescript's "effects" are not arbitrary IO — they're specifically Π-calculus effects (streams, channels, processes). The pure functional layer evaluates normally. When you cross into the Π layer, you're describing effects, and the runtime handles them.

But here's where the **free monad** connection you discussed earlier is more precise than the IO monad analogy. In Haskell:

- `IO` is opaque. The RTS interprets it, but you can't inspect, optimize, or transform an `IO` action before running it.
- A `Free f a` is transparent. It's a data structure describing effects. You CAN inspect, optimize, and transform it before interpreting it.

Your plan graph is a free monad. The Π primitives are the functor `f`:

```
data PiF next
  = Query String (Stream -> next)          -- query, then continue with the stream
  | Par [(Name, PiF next)] next            -- run these in parallel, then continue
  | Send Channel Value next                -- send on channel, then continue
  | Recv Channel (Value -> next)           -- receive from channel, then continue with value
  | MapStream (a -> b) (Stream a) (Stream b -> next)
  | ...
```

`Free PiF a` is the plan graph. The evaluator builds it (by running the pure parts and suspending at Π primitives). The executor interprets it (by actually dispatching queries, managing channels, etc.).

This is exactly the distinction you're drawing. And it works **because** the language is pure and referentially transparent — the evaluator can safely evaluate pure subexpressions without worrying about effect ordering, and defer all effectful operations to the plan graph.

The clean rule: **Pure code evaluates. Π code describes. The executor runs the descriptions.**

## Where complexity actually lives

So no, you're not oversimplifying. The conceptual model is:

1. Evaluate pure expressions locally
2. At Π primitive boundaries, build plan graph nodes (reified continuations)
3. Closures travel with their captured environment (safe because of purity)
4. The plan graph is a free monad over Π-calculus effects
5. The executor interprets the free monad (dispatching to nodes, managing channels)

That's clean and correct. The complexity is in the **executor**, not the model:

- **Placement**: which node runs which plan fragment? (Lean on ESQL's existing shard routing)
- **Serialization**: wire format for traveling closures (code + env). This is an engineering problem, not a conceptual one.
- **Push-down optimization**: recognizing that `map inc` over a query can be fused into the query itself (as an ESQL `EVAL`), avoiding data movement entirely. This is the optimizer's job — transforming the free monad before interpreting it.
- **Backpressure and memory**: when streams flow between nodes, the executor needs to manage flow control. ESQL's exchange operators already handle this.
- **Error propagation**: when a node in the plan fails, how does the executor cancel dependent nodes and surface the error? This is the `par` error semantics question from Phase 4, but it's an executor concern, not a language concern.

The language and type system stay clean. All the messiness is in the executor, which is implementation work — substantial, but well-understood from ESQL's existing compute engine.

## What this means for the plans

The plans as written mix up the model and the executor. They should be restructured around:

1. **The Π boundary**: Core IR has two layers (functional expressions, process descriptions). The evaluator handles one, the plan builder handles the other.
2. **The plan graph as free monad**: an explicit intermediate representation for distributed effects, built by the evaluator, interpreted by the executor.
3. **The executor as the runtime**: takes a plan graph and runs it. v0 executor runs everything locally (one node, async for `par`). Future executors distribute plan fragments to data nodes.
4. **Closures as traveling code**: code + captured env, serializable by construction (purity guarantees this for v0 value types).

Phase 3 becomes: "build the plan graph IR and the v0 local executor for stream operations." Phase 4 becomes: "extend the plan graph with parallel composition and channel primitives."

The distributed executor (actually shipping plan fragments to remote nodes) is a later phase — but the plan graph abstraction exists from Phase 3 onward, making the transition incremental rather than architectural.

The user is making several very sharp observations and wants to check alignment. Let me carefully address each point:

1. **Pure lambda programs run locally** — yes, absolutely correct. No distribution needed.

2. **Π primitives dictate distribution** — the `inc` function, when used in `map` over a query, gets sent to the node that has the data. This is the distributed computation model.

3. **"Half evaluator, half compiler" ≈ partial evaluator** — the user is pushing back on my framing. They see it more simply: evaluate what you can locally, send the rest (as code + env) to wherever the Π primitives dictate. The plan graph is the "where and how" of that distribution.
   
4. **Traveling code ≈ delimited continuations** — closed lambdas need no serialization overhead, but closures capture their environment. Since the language is pure and referentially transparent, the captured environment serializes cleanly, much like how continuations close over the stack.

5. **The boundary layer ≈ Haskell's IO monad** — Π primitives act as the effectful layer. Pure code evaluates normally, but when you hit a Π primitive, the runtime takes over via the plan graph. The crucial point: effects in piescript are exclusively Π-calculus effects—streams, channels, processes—nothing else.

6. Their mental model is remarkably clean and mostly correct. The user nails the core insights: pure programs execute locally without distribution, Π primitives are what trigger the plan graph, the IO monad analogy captures the separation perfectly, and referential transparency makes environment cloning safe for traveling closures. The partial evaluation framing is also more precise than thinking of it as half evaluator, half compiler.

But there are some implementation details worth unpacking. When they say code gets "sent to whatever node needs to run it," that's conceptually right but the placement decision itself is non-trivial—the optimizer has to consider data locality and decide which nodes should execute which fragments. And while referential transparency does allow environment cloning, there's a practical constraint: not all values are serializable, so there's a real question about what can actually travel across the network.

The IO monad comparison is apt, but there's a key difference. Haskell's IO actions are opaque to the runtime, whereas in piescript the plan graph is fully inspectable—the optimizer can see the structure, push operations down, eliminate dead code, and fuse nodes together.

This is actually more like a free monad than the concrete IO monad. The plan graph represents Π-calculus effects as a free monad structure, with the executor interpreting that representation. Since the user is already familiar with free monads, this framing should click.

The effect system is elegantly constrained to exactly the Π-calculus primitives—parallel composition, channel creation, send, receive, query—with no file I/O, network calls, or mutable state. This clean discipline lets the type system track effects precisely, which is exactly what session types provide. The user's mental model is sound; the nuances are mostly implementation details.

Now I'm thinking through the delimited continuations angle more carefully. When a closure moves to a remote node, it's not quite a continuation in the traditional sense—it's a function rather than the rest of the current computation. But there's a real connection: when the coordinator hits a Π primitive, the remaining program is a continuation waiting for that primitive to complete, and the plan graph essentially reifies these continuations. Looking at how a query operation gets evaluated...

---

## [8] User

can we get some resources on pi calculi? ref papers and so on?

---

## [9] Assistant

Here's a curated reading list, organized from foundational to applied, with notes on what each gives you for piescript's design.

---

## Foundational Textbooks

These are the two canonical references. Start with Milner for intuition, go to Sangiorgi & Walker for depth.

**1. Robin Milner — *Communicating and Mobile Systems: the π-Calculus*** (Cambridge, 1999)
- 174 pages, accessible. The introductory textbook by the inventor of the calculus.
- Covers: names, interaction, behavioral equivalence, type systems for interaction patterns.
- Best for: building intuition about what names, channels, and mobility mean.
- [Cambridge University Press](https://www.cambridge.org/us/universitypress/subjects/computer-science/communications-information-theory-and-security/communicating-and-mobile-systems-pi-calculus)

**2. Davide Sangiorgi & David Walker — *The π-Calculus: A Theory of Mobile Processes*** (Cambridge, 2001)
- 580 pages, comprehensive. The graduate-level reference.
- Covers: operational semantics, bisimulation theory, type systems (sorting, I/O types, linear types), higher-order π-calculus (process passing).
- Best for: the chapter on **higher-order π-calculus** (process/code passing over channels — directly relevant to traveling closures) and the type system chapters (relevant to typing channels).
- [Cambridge University Press](https://www.cambridge.org/gb/universitypress/subjects/computer-science/programming-languages-and-applied-logic/pi-calculus-theory-mobile-processes)

---

## The Original Papers

**3. Robin Milner, Joachim Parrow, David Walker — *A Calculus of Mobile Processes, Parts I and II*** (Information and Computation, 1992)
- The founding paper. Part I defines the calculus and strong bisimulation. Part II covers weak bisimulation and equational theory.
- [Part I (LFCS report)](http://www.lfcs.inf.ed.ac.uk/reports/89/ECS-LFCS-89-85/)

**4. Davide Sangiorgi — *π-Calculus, Internal Mobility, and Agent-Passing Calculi*** (Theoretical Computer Science, 1996)
- Shows that higher-order π-calculus (where you send processes over channels, not just names) can be encoded in the first-order π-calculus. This is the theoretical basis for "code mobility is just name passing."
- Directly relevant: it tells you that traveling closures don't require a fundamentally new calculus — they can be modeled within standard π.
- [Semantic Scholar](https://www.semanticscholar.org/paper/pi-Calculus%2C-Internal-Mobility%2C-and-Agent-Passing-Sangiorgi/80159843149f602792d36d6c3e65f72bc8b48822)

---

## Session Types (Typing the Channels)

These are the papers for when you eventually want to type-check that processes communicate correctly — ensuring that if process A sends an `int` on channel `c`, process B expects an `int` on `c`.

**5. Kohei Honda, Vasco Vasconcelos, Makoto Kubo — *Language Primitives and Type Discipline for Structured Communication-Based Programming*** (ESOP, 1998)
- The original session types paper. Introduces binary session types: types that describe the protocol on a channel (send int, then receive string, then done).
- [PDF](https://filipendule.github.io/mgs/honda.vasconcelos.kubo.pdf)

**6. Kohei Honda, Nobuko Yoshida, Marco Carbone — *Multiparty Asynchronous Session Types*** (POPL, 2008)
- Extends session types from two-party to multi-party protocols. Relevant when `par` blocks involve more than two communicating processes.
- [ACM DL](https://dl.acm.org/doi/10.1145/1328438.1328472)

**7. Philip Wadler — *Propositions as Sessions*** (ICFP, 2012)
- The Curry-Howard correspondence for concurrency: propositions in linear logic = session types, proofs = processes. Beautifully written. Gives you deadlock-freedom and protocol compliance for free from the type system.
- This is the paper most relevant to piescript's future type system — if you type channels with session types derived from linear logic, well-typed programs can't deadlock.
- [PDF](https://www.pure.ed.ac.uk/ws/portalfiles/portal/18383989/Wadler_2012_Propositions_as_Sessions.pdf)

---

## The Join Calculus (π-calculus Designed for Implementation)

This is arguably the most practically relevant variant for piescript, because the join calculus was specifically designed to be implementable in distributed systems.

**8. Cédric Fournet & Georges Gonthier — *The Join Calculus: A Language for Distributed Mobile Programming*** (Applied Semantics Summer School, 2000)
- A variant of the π-calculus that restricts communication to patterns that are easy to implement in distributed settings. No rendezvous (synchronous matching on two parties); instead, **join patterns** — a process fires when messages arrive on multiple channels simultaneously.
- Key insight for piescript: the join calculus shows how to design process primitives that have efficient distributed implementations. Standard π-calculus has constructs (like input-guarded choice) that are notoriously hard to implement distributedly. The join calculus avoids them.
- [Springer](https://link.springer.com/chapter/10.1007/3-540-45699-6_6) / [Microsoft Research](https://www.microsoft.com/en-us/research/publication/join-calculus-language-distributed-mobile-programming/)

---

## Implemented Languages (π-calculus in Practice)

These are real languages built on π-calculus foundations. Invaluable for seeing how theory maps to implementation.

**9. Benjamin Pierce & David Turner — *Pict: A Programming Language Based on the Pi-Calculus***
- A statically-typed concurrent language compiling directly from π-calculus. Very close to the theory. Shows how channels become first-class values, how processes compose, how the type system works in practice.
- [Pict homepage](https://www.cis.upenn.edu/~bcpierce/papers/pict/Html/Pict.html)

**10. *Nomadic Pict*** — extends Pict with locations and mobile agents.
- Directly relevant: agents (units of computation) migrate between machines. This is the "traveling code" model. Nomadic Pict has a type system that tracks which channels are local vs. remote.
- [Nomadic Pict homepage](https://www.cs.put.poznan.pl/pawelw/npict/)

**11. *JoCaml*** — OCaml extended with join calculus primitives.
- Adds three keywords (`def`, `reply`, `spawn`) to OCaml. Shows how to embed process calculus in a practical ML-family language with minimal surface syntax disruption. Very close to what piescript is trying to do (embed process primitives in a functional language).
- [JoCaml homepage](http://jocaml.inria.fr/) / [Programming in JoCaml (extended)](https://hal.science/inria-00166125/)

---

## The Free Monad / Algebraic Effects Connection

**12. Stark & Fiore — *Free-Algebra Models for the π-Calculus*** (Theoretical Computer Science, 2008)
- Shows that π-calculus semantics can be characterized using enriched Lawvere theories and computational monads. This is the theoretical basis for representing π-calculus effects as a free monad — exactly the plan-graph-as-free-monad idea.
- [ScienceDirect](https://www.sciencedirect.com/science/article/pii/S0304397507007086)

**13. Wu & Schrijvers — *Fusion for Free: Efficient Algebraic Effect Handlers*** (MPC, 2015)
- On optimizing free monad / effect handler chains by fusing handlers. Relevant to the plan graph optimizer — if you represent Π effects as a free monad, handler fusion is how you optimize the plan before execution.
- [PDF](https://people.cs.kuleuven.be/~tom.schrijvers/Research/papers/mpc2015.pdf)

---

## Suggested Reading Order for Piescript

For someone building what you're building, I'd prioritize:

1. **Milner's textbook** (#1) — get the intuition (short, readable)
2. **Fournet & Gonthier on join calculus** (#8) — the "implementable π-calculus," directly relevant to design choices
3. **JoCaml** (#11) — see how it works in an ML-family language in practice
4. **Wadler's Propositions as Sessions** (#7) — for the future type system direction
5. **Sangiorgi's agent-passing paper** (#4) — for the traveling closures / code mobility theory
6. **Sangiorgi & Walker textbook** (#2) — reference as needed for specific questions (higher-order π, type systems, bisimulation)

The join calculus (#8) is probably the single most useful reference for piescript's design. It was created precisely because standard π-calculus has constructs that don't map well to distributed implementations, and the join calculus shows how to restrict the primitives to ones that do — while keeping full expressiveness. JoCaml (#11) is the proof that it works in practice.

---

## [10] User

Right ok, so here's what we should do:
We will take what we've learnt and discussed here in this chat session, and digest it into the pertinent documents. That means we will update all relevant documentation, vision and roadmap docs, as well as the master and plan and relevant phase subplans. The goal is to crystalize the idea and direction that emerged here into actual useful documentation, guidelines and goals.
It is important to note down does these resources somewhere, for future reference and ideation and refinement

---

## [11] Assistant

The user wants me to take all the insights from this conversation and update the project documentation. Let me plan what needs to be updated:

1. **Vision doc** - needs to reflect the distributed computation model, the Π-calculus as more than syntax sugar, the plan-graph architecture
2. **Architecture doc** - needs the two-layer IR model, the plan graph concept, the evaluator/planner split
3. **Decisions doc** - new ADRs for the key decisions made here
4. **Roadmap doc** - Phase 3 and 4 descriptions need reframing
5. **Phase 3 plan** - reframe around plan-graph building, not iterator-based execution


6. **Phase 4 plan** - reframe around plan composition, not async coordination
7. **A new references doc** - the papers and resources list
8. **Master plan** - if there is one, update it

Now I need to check what docs currently exist and understand the overall master plan structure.

---

## [13] Assistant

Now I have the full picture. Let me start updating the documents systematically.

Now I have the full picture. Let me plan the updates carefully:

1. **References doc** (new file) — the papers list from this conversation
2. **Vision doc** — needs significant update: distributed computation is the core goal, not just "typed functional scripting"
3. **Architecture doc** — needs the two-layer IR, plan graph, evaluator/planner split
4. **Decisions doc** — new ADRs for: plan-graph execution model, Π boundary (functional/process split), traveling closures, join calculus influence
5. **Phase 3 plan** — reframe around plan-graph building


6. **Phase 4 plan** — reframe around plan composition
7. **Roadmap** — update Phase 3/4 descriptions, add future phase for distributed executor
8. **Master plan** — update Section 9 (Execution Model), Section 6.3 (Processes and Channels), and Phase 3/4 overviews

I'll batch related work together and start working through these systematically.

---

## [15] Assistant

Now updating the architecture doc. The current doc only covers Phase 0's passthrough architecture and a brief "Future Architecture" sketch. I need to expand the future architecture significantly.

---

## [17] Assistant

Now reframing Phase 3. This is the biggest rewrite — the entire conceptual model shifts from "iterator-based stream runtime" to "plan graph building."

---

## [19] Assistant

Now updating the roadmap with revised Phase 3/4 descriptions and a new Phase 5 for distributed execution.

---

## [20] Assistant

Now updating the master plan. The key sections that need changes are: Section 1 (Vision), Section 6.3 (Processes and Channels), Section 9 (Execution Model), Section 10.3 (Interaction Model), the Phase 3 and Phase 4 overviews in Section 14, and the phase table.

---

## [29] Assistant

Now let me also update the AGENTS.md to reference the new docs and update the phase todos in the master plan frontmatter:

---

## [33] Assistant

The AGENTS.md needs updating to reflect the distributed computation model and the new design constraints. Let me also update the "What is Piescript?" section and add the current chat to the history reference.

---

## [35] Assistant

The `.cursor/plans/` files aren't tracked by git (they're likely gitignored), so their changes don't show in `git diff`. The docs directory is untracked and contains all the updated files. Everything looks good.

Here's a summary of everything that was updated:

**New file:**
- `x-pack/plugin/piescript/docs/references.md` — curated reading list of 13 references organized by category (foundational textbooks, original papers, session types, join calculus, implemented languages, free monad/algebraic effects), each with notes on relevance to piescript.

**Updated docs (7 files):**

- **`vision.md`** — rewritten one-liner, added "The Distributed Computation Model" section (plan graph, code mobility, delimited continuations analogy), added "Functional by default, distributed by design" and "Grounded in process algebra" philosophy sections, reframed long-term aspirations (distributed plan execution, session types, explicit channels, plan optimization).

- **`architecture.md`** — expanded "Future Architecture" from a brief sketch to comprehensive coverage: the two-layer IR (`CoreExpr`/`CoreProcess`), the plan graph as free monad, the optimizer (push-down, dead-code, fusion), the executor (v0 local, future distributed), and traveling code (closed lambdas, closures, mobility check).

- **`decisions.md`** — four new ADRs:
  - D-012: Plan graph execution model (not direct interpretation)
  - D-013: Two-layer IR (functional/process boundary)
  - D-014: Code mobility (closures as traveling code)
  - D-015: Join calculus influence on primitive selection

- **`roadmap.md`** — Phase 3 rewritten ("Stream Runtime & Plan Graph"), Phase 4 rewritten ("Process Primitives & Plan Composition"), added Phase 5 (Distributed Executor), Phase 6 (Explicit Channels & Session Types), renumbered Module System to Phase 7 and Tooling to Phase 8.

- **`AGENTS.md`** — updated project description, doc table, added design constraints (two-layer IR, plan graph, purity enables distribution), added this chat to history reference.

**Updated plans (2 files):**

- **`phase3_stream_runtime.plan.md`** — complete rewrite. Reframed from "iterator-based stream runtime" to "plan graph building." New conceptual model section (evaluator/planner split, mobility check, plan graph as free monad). Open questions reframed (mobility criteria, plan graph representation, StreamVal as PlanNode). Tasks reordered around plan graph construction.

- **`phase4_process_primitives.plan.md`** — complete rewrite. Reframed from "async coordination" to "plan composition." `par` builds `ParPlanNode`, channels are plan graph edges, optimizer does dead-branch elimination and push-down into branches. All open questions confirmed with decisions.

**Updated master plan:**

- **`scripting_language_design_9286506e.plan.md`** — Section 1 (vision), Section 6.3 (processes/channels/plan graph), Section 9 (three-stage execution model), Section 10.2 (what we build), Section 10.3 (interaction diagram), Section 10.4 (pipeline diagram), Phase 3/4 descriptions, phase table (added Phases 5/6).

---

## [36] User

How does our approach compare to something like the BEAM and erlang/elixir?

---

## [37] Assistant

This is a great comparison to draw because BEAM/Erlang and piescript are solving related problems (distributed computation with message passing) but from opposite starting points. The differences are illuminating.

## The Fundamental Orientation

The deepest difference is what's at the center of the world:

| | Erlang/BEAM | Piescript |
|---|---|---|
| **Core abstraction** | Processes (actors) | Data pipelines (streams) |
| **Programmer thinks about** | Process topology, messages, supervision | Data transformations, query composition |
| **Distribution model** | Process-centric: spawn where you want, messages find their way | Data-centric: code travels to where data lives |
| **What the runtime manages** | Process scheduling, mailboxes, fault isolation | Plan graph dispatch, data flow, vectorized execution |

In Erlang, you write sequential code *inside* a process, and the BEAM handles concurrency between processes. Distribution is transparent — `Pid ! Message` works whether `Pid` is on the local node or across the network. You explicitly design process topology (who spawns whom, who supervises whom).

In piescript, you write functional transformations over data, and the executor handles where those transformations run. You never think about processes directly — they emerge from the plan graph structure. The optimizer decides what code moves where based on data locality.

Both use channel-like communication. But the control is inverted:
- Erlang: the programmer places processes, the runtime routes messages
- Piescript: the programmer writes transforms, the runtime places computation

## Process Model

**Erlang**: millions of lightweight processes, each with its own heap, scheduled preemptively by reduction counting. A process is the unit of concurrency, fault isolation, and GC. Processes are long-lived (a gen_server might run for years). The actor model — each process has a mailbox, receives messages sequentially, and can spawn new processes.

**Piescript**: processes are implicit plan graph fragments. A `query` node is a process (it runs on data nodes). A `par` block creates parallel processes. A `map` with a traveling closure is a process dispatched to wherever the data lives. Processes are short-lived (they exist for the duration of a query pipeline). There is no explicit process spawning, no mailboxes, no per-process state.

The key difference: Erlang processes are **stateful, long-lived actors**. Piescript processes are **stateless, ephemeral data transformations**. This follows directly from piescript's purity — no mutable state means no need for process-level state isolation.

## Communication

**Erlang**: asynchronous message passing to mailboxes. Messages are untyped (any term can be sent to any process). The `receive` construct pattern-matches on the mailbox. Selective receive lets a process pick which messages to handle. No static guarantee that a message will be understood by the receiver.

**Piescript**: typed channels (plan graph edges). Each edge carries a stream with a known element type. The type checker ensures that producers and consumers agree on the data schema. For v0, channels are implicit (bindings in `par` blocks). Future: explicit channels with session types providing protocol-level safety (send int then receive string then done).

This is where piescript's type system gives a structural advantage. Erlang's dynamic typing means protocol violations are runtime errors (or discovered by Dialyzer's success typing, which is sound but incomplete). Piescript's future session types would make protocol violations compile-time errors — well-typed programs cannot deadlock or send the wrong type on a channel. This is the Wadler "Propositions as Sessions" direction from the references.

## Code Mobility

This is the sharpest difference and perhaps the most interesting.

**Erlang**: processes don't migrate. Once a process is spawned on a node, it stays there. You can spawn a process on a remote node (`spawn(Node, Module, Function, Args)`), but a running process never moves. Messages travel between nodes; code doesn't. If you want computation on a remote node, you explicitly spawn a process there. The module code must already be loaded on that node.

**Piescript**: code travels to data. A closure attached to a `MapPlanNode` is shipped to whatever node holds the relevant shards. The plan graph optimizer decides where computation runs, and the executor serializes the closure (`CoreExpr` + captured environment) and sends it. This is the higher-order π-calculus in action — processes (code) travel over channels.

In π-calculus terms:
- Erlang is closer to the **first-order π-calculus**: names (pids) are passed in messages, but processes themselves stay put.
- Piescript is closer to the **higher-order π-calculus**: code (closures/processes) is passed over channels and executed at the destination.

Sangiorgi showed these are equivalent in expressiveness (the agent-passing paper in our references), but the programming model is different. Piescript's approach is natural for analytical workloads — you want computation to be co-located with data, and you want the system (not the programmer) to decide placement.

## Fault Tolerance

**Erlang**: this is Erlang's crown jewel. "Let it crash" + supervisor trees. Processes are so cheap that the standard pattern is: try, crash, let the supervisor restart you. Fault isolation is per-process (one process crashing doesn't affect others). Links and monitors propagate failure signals. OTP provides supervisor, gen_server, gen_statem patterns that encode decades of telecom reliability engineering. The entire system is designed for nine-nines uptime.

**Piescript**: fail-fast for v0. If any part of a plan fails, the whole plan fails. No supervision, no restart. This is appropriate because piescript programs are **short-lived analytical queries**, not long-running services. A security analyst runs a query, gets results or an error, and moves on.

Future piescript could adopt ideas from Erlang's fault model for long-running distributed plans — retry individual plan branches, isolate failures, provide partial results. But the "let it crash" philosophy doesn't directly apply because piescript processes are ephemeral computations, not persistent actors.

## What They Optimize For

**BEAM/Erlang**: optimizes for **latency and fault tolerance** in long-running concurrent systems. Telecom switches, web servers, message brokers, chat systems. Millions of processes, preemptive scheduling ensures fairness, per-process GC avoids stop-the-world pauses, soft real-time guarantees.

**Piescript**: optimizes for **throughput and data locality** in analytical workloads. Log analysis, metrics aggregation, security correlation. Few large data pipelines, vectorized execution on columnar `Block`/`Page` structures, co-location of computation with indexed data on ES shards.

BEAM runs bytecode in a register machine with reduction-counted preemptive scheduling. Piescript's hot path runs compiled `ExpressionEvaluator`s on columnar blocks — vectorized, cache-friendly, processing thousands of rows per evaluation. The tree-walking interpreter only handles orchestration (runs once per pipeline, not per row).

## Type System

**Erlang**: dynamically typed. Dialyzer provides opt-in static analysis via success typing, but it's not part of the language semantics. Elixir adds optional typespecs but they're documentation, not enforced.

**Piescript**: statically typed with Hindley-Milner inference, row polymorphism, and bidirectional checking. Types are inferred, not annotated. Index mappings provide ground truth for document types. Future: session types for channel protocols, linear types for resource safety.

The type system is piescript's main differentiator over "just write Erlang/Elixir for distributed computation." Types give you:
- Compile-time schema validation against real index mappings
- Cross-index type conflict detection
- (Future) Protocol-safe channel communication with session types
- (Future) Safe code mobility with linearity — the type system prevents shipping closures that capture non-serializable resources

## What Piescript Can Learn From Erlang

1. **Distribution transparency**: Erlang's `Pid ! Message` working identically for local and remote pids is elegant. Piescript's plan graph should eventually provide similar transparency — the user writes `query FROM logs-* |> map f`, and the system handles placement without the user caring whether `f` runs locally or remotely.

2. **Hot code loading**: BEAM can upgrade running code without stopping processes. For a future module system (Phase 7), the ability to update stored piescript definitions while queries are running would be valuable.

3. **OTP patterns**: `gen_server`, supervisors, and application trees are proven patterns for structuring distributed systems. If piescript ever gets long-running processes (e.g., continuous query streams, materialized views), OTP-style patterns would inform the design.

4. **Distribution protocol**: Erlang's distribution protocol (node discovery, cookie-based auth, TCP/TLS transport) is mature. Piescript's distributed executor will lean on ES's existing transport layer instead, but the problems (node membership, authentication, message framing) are the same.

## What's Genuinely Different

The thing piescript does that Erlang fundamentally doesn't: **the plan graph as an inspectable, optimizable intermediate representation**.

In Erlang, when you spawn a process and send it messages, the runtime executes your code — it doesn't inspect or transform it first. There's no optimization pass that says "these two processes could be fused" or "this message send can be eliminated because the receiver ignores it."

In piescript, the plan graph is a data structure that the optimizer transforms before the executor runs it. Dead-branch elimination, push-down of transforms into queries, combinator fusion — these are plan-level optimizations that Erlang's runtime model doesn't support. This is the free monad advantage: because effects are described as data (the plan graph) before being executed, you can inspect and optimize them. Erlang's effects (process spawning, message sending) are immediately executed.

This is also why piescript's model is better suited for analytical workloads. When you write `par { let a = query1 |> map f; let b = query2; } in a |> fold g 0`, the optimizer can: eliminate `b` (unused), push `f` into `query1` (becomes an ESQL EVAL clause), and what was a multi-query distributed pipeline becomes a single optimized query. Erlang's runtime can't do this — once you spawn the processes, they run.

Good, let me now give a thorough comparison between piescript's approach and BEAM/Erlang/Elixir. This is a great question because there are real structural similarities and important differences.

Let me think through the key dimensions of comparison:

1. **Process model**: Erlang has lightweight processes (actors), piescript has π-calculus processes (plan graph nodes)
2. **Communication**: Erlang has mailboxes (async message passing), piescript has typed channels (plan graph edges)
3. **Distribution**: Erlang has transparent distribution (send to any pid, local or remote), piescript has plan-based dispatch (optimizer decides where code runs)


4. **Code mobility**: Erlang keeps processes stationary while messages travel, whereas piescript actively sends closures to where the data lives
5. **Purity**: Erlang embraces side effects and implicit I/O through stateful processes, while piescript maintains purity through π-calculus effects
6. **Type system**: Erlang's dynamic typing contrasts with piescript's Hindley-Milner inference
7. **Scheduling**: BEAM uses preemptive scheduling with reduction counting, piescript executes through plan graph traversal
8. **Fault tolerance**: Erlang's supervisor trees and let-it-crash philosophy differ from piescript's fail-fast approach in v0
9. **Evaluation model**: Still working through how these systems differ in their fundamental execution strategies

...

The key realization is that Erlang and piescript are inverses of each other in how they tackle distributed systems. Erlang begins with processes as the primitive—everything is a process, and concurrency and distribution flow from that foundation. The programmer explicitly orchestrates process topology while the runtime handles the mechanics transparently. Piescript inverts this by starting with data transformations as queries, letting processes emerge implicitly from the execution plan. The optimizer, not the programmer, determines where code executes based on data locality and efficiency.

This leads to a crucial difference in code mobility: Erlang keeps processes fixed to their spawning location and sends messages between them, whereas piescript ships code to wherever the data lives, allowing plan fragments to migrate across nodes. That's fundamentally closer to higher-order process calculi than to Erlang's model.

The fault tolerance approaches diverge too—Erlang embraces "let it crash" with supervisor hierarchies for long-running services, while piescript takes a simpler fail-fast approach suitable for ephemeral query pipelines. And on types, Erlang relies on dynamic typing with Dialyzer's best-effort checking, whereas piescript uses static typing with Hindley-Milner inference.

Looking at the deeper optimization targets: Erlang's BEAM prioritizes latency and fault tolerance for systems like telecom switches and message brokers with millions of short-lived processes, while piescript targets throughput and data locality for analytical workloads like log analysis and metrics aggregation. These are fundamentally different design goals rather than competing approaches.

---

## [38] User

good! just wanted to make sure we were differentiated enough, and for good reason. That said, lets mark this down somewhere, perhaps in references? as things wee can learn from the BEAM

afterwards, we will need to have a converrsation on linear and affine types

---

## [39] Assistant

Done — the BEAM comparison is now in `references.md` with concrete lessons, differentiation points, and key references (including Joe Armstrong's thesis).

Whenever you're ready to dig into linear and affine types, just say the word. That conversation ties directly into several open threads: the mobility check (D-014 — what values can a traveling closure safely capture?), future session types for channels (Phase 6), and the question of how to prevent non-serializable resources (stream handles, channel references) from being captured by closures that need to travel. Lots of interesting design space there.

---

## [40] User

i think before the linearity stuff, theres the point about how we deal with map/filte/reduce. Right now, afaik, the plans call for specific terms to handle those fns. I'd rather place them as std or prelude built-ins. Its fine if the compiler still treats the as special cases instead of normal functions, but at least we'd be closer to making them just normal lib code. THis will all tie in to typeclasses, the free monad and, ultimately, linearity. Would you agree with that or am i hand-waving stuff?

---

## [41] Assistant

You're not hand-waving at all — this is a well-motivated design point that has real downstream consequences. Let me check what the current plans and code say, then we can think through it.

The user is asking about how `map`, `filter`, `fold` should be represented in the language — whether they should be special syntax/term forms in the Core IR vs. standard library (prelude) built-in functions that the compiler might still treat specially internally.

Let me look at how they're currently described in the plans and the master plan to understand the current design, then give a thorough answer.

The user's intuition is: make them look like normal functions to the user (and eventually BE normal functions), even if the compiler has special knowledge about them. This connects to:
1. Typeclasses (when `map` becomes `Functor.fmap`)
2. The free monad (stream combinators as effect constructors)


---

## [42] Assistant

Good — now I can see the current state clearly. Let me read the relevant section of the master plan to see the full picture.

---

## [43] Assistant

OK, now I have the full picture. Here's the state of things and why your instinct is right.

## What the Plans Currently Say

The master plan actually already says the right thing in Section 6.1–6.2:

```363:363:.cursor/plans/scripting_language_design_9286506e.plan.md
- These are **regular polymorphic functions** (standalone, in a standard prelude), NOT built-in syntax forms
```

```367:374:.cursor/plans/scripting_language_design_9286506e.plan.md
### 6.2 map/filter/fold: Polymorphic Functions, Not Typeclasses (v0)

- `map : (a -> b) -> Stream a -> Stream b` — standalone polymorphic function
- `filter : (a -> Bool) -> Stream a -> Stream a`
- `fold : (b -> a -> b) -> b -> Stream a -> b`
// ...
- When typeclasses are added (v1), `map` becomes a `Functor` method, existing code continues to work
```

So the surface-level design is already "these are normal functions in a prelude." But then the Phase 3 plan introduces `MapStream`, `FilterStream`, `FoldStream` as **dedicated `CoreProcess` IR nodes** — i.e., the compiler desugars `map f stream` into a special IR node rather than treating it as a normal function application. That's the tension you're identifying.

## You're Right — and Here's Why It Matters

The question is: should `map` be a `CoreProcess` IR node, or should it be a normal function that *happens* to produce a plan graph effect when applied to a `Stream`?

Your instinct to make them prelude built-ins rather than dedicated IR nodes is correct, and it connects to three things cleanly:

### 1. Typeclasses

If `map` is a `CoreProcess.MapStream` IR node, then when you add `Functor` in v1, you have two different representations:
- `map` on `Stream` → `CoreProcess.MapStream` (special case)
- `fmap` on any `Functor f` → normal function application with dictionary passing

That's ugly. You'd need to either keep the special case forever (two paths for the same operation) or migrate `MapStream` to use the typeclass machinery (a breaking change in the IR).

If instead `map` is a normal function from the start — one that the compiler *recognizes* and optimizes — then adding `Functor` is purely additive. `map` becomes `Functor.fmap` specialized to `Stream`. The compiler's special knowledge becomes a typeclass instance optimization, not a special IR form.

### 2. The Free Monad / Plan Graph

Here's where it gets interesting. Under the plan graph model, when the evaluator encounters `map f stream`, what happens depends on whether `stream` is a `StreamVal` (wrapping a plan node) or... something else.

If `map` is a normal function, its semantics are:

```
map : (a -> b) -> Stream a -> Stream b
map f s = <built-in: construct MapPlanNode(f, s.planNode)>
```

It's a function that, when applied, inspects its second argument (a `StreamVal`), extracts the plan node, and wraps it in a new plan node. The "special" behavior is in the **function's implementation**, not in the **IR node type**. This is exactly how effect constructors work in the free monad pattern — `Query`, `Map`, `Filter` are just data constructors, applied as normal functions.

Compare to Haskell:

```haskell
data Free f a = Pure a | Free (f (Free f a))

-- "map" for a free monad over some effect functor is just a normal function:
mapStream :: (a -> b) -> Free StreamF a -> Free StreamF b
```

There's no special `MapStream` in the AST. The function is normal. The effect structure is in the *values* it produces (the plan graph nodes).

### 3. Linearity

This is the forward-looking connection. If `Stream` is linear (consumed exactly once), then `map : (a -> b) -> Stream a -o Stream b` (the `-o` being a linear arrow). The linear type system needs to track that the input stream is consumed. If `map` is a special IR node, the linearity checker needs special cases for each combinator. If `map` is a normal function with a linear type, the checker just uses the standard function application rule — no special cases.

Same for `filter`, `fold`, `take`, `zip`, etc. Each one consumes its input stream linearly. If they're all normal functions with linear types, the type system handles them uniformly.

## How It Would Actually Work

The architecture would be:

**Surface syntax**: `docs |> map (fn d -> d.status)` — pipe application, just `map (fn d -> d.status) docs`

**Elaboration**: `map` resolves to a **prelude binding** with type `forall a b. (a -> b) -> Stream a -> Stream b`. The elaborator treats it as a normal function application: `App(App(Var("map"), Lam(...)), Var("docs"))`.

**Core IR**: normal `CoreApp(CoreApp(CoreVar(map), CoreLam(...)), CoreVar(docs))`. No special `MapStream` node. `map` is a `CoreVar` that refers to a prelude binding.

**Evaluator**: when the evaluator applies `map` (a built-in function value) to a lambda and a `StreamVal`, it constructs a `MapPlanNode`. The "special" behavior is in the **built-in function's runtime implementation**, not in the IR:

```java
// In the prelude / built-in function table
case "map" -> (Value lambda, Value stream) -> {
    var streamVal = (StreamVal) stream;
    return new StreamVal(new MapPlanNode(lambda, streamVal.planNode()));
};
```

**Compiler optimization**: the optimizer *recognizes* applications of known built-ins (`map`, `filter`, `fold`) and can do special things (mobility check on the lambda, push-down into queries). But this is pattern-matching on the plan graph, not on special IR nodes.

The key principle: **the IR is uniform (just function applications). The plan graph carries the structure. The optimizer pattern-matches on the plan graph, not the IR.**

## What This Means for Phase 3

The Phase 3 plan currently defines `CoreProcess` nodes like `MapStream`, `FilterStream`, `FoldStream`. Under your model, these disappear from the Core IR entirely. Instead:

- `CoreProcess` keeps `Query` (because `query FROM ...` is genuinely special syntax) and `Par` (because `par { ... } in ...` is special syntax too)
- `map`, `filter`, `fold` are **prelude functions** whose implementations construct plan graph nodes at evaluation time
- The plan graph IR still has `MapPlanNode`, `FilterPlanNode`, `FoldPlanNode` — the plan is unaffected. Only the path from source code to plan graph changes: it goes through normal function application + built-in evaluation, not through dedicated IR nodes.

This is a cleaner separation:
- **Special syntax** (`query`, `par`) → special `CoreProcess` IR nodes
- **Special functions** (`map`, `filter`, `fold`) → normal functions in the prelude whose implementations produce plan effects

And it leaves the door wide open for typeclasses (`map` becomes `Functor.fmap`), the free monad interpretation (effect constructors are just functions), and linearity (`Stream` is a linear type, stream combinators are linear functions).

## Are You Hand-Waving?

No. The chain is:

1. `map`/`filter`/`fold` as prelude functions → uniform Core IR (just applications)
2. Uniform Core IR → typeclasses are purely additive (no special-case migration)
3. Prelude functions produce plan graph nodes → free monad pattern (effects are data, constructed by normal functions)
4. Linear types on `Stream` → stream combinators get linear arrows → standard linearity checking, no special cases per combinator

Each step follows from the previous. The design choices reinforce each other. Making `map` a prelude function isn't just an aesthetic preference — it's load-bearing for the typeclass, free monad, and linearity stories.

---

## [44] User

but what do we gain from , eventually, down the line, adding linearity?

---

## [45] Assistant

Great question. Linearity isn't something you add for theoretical elegance — it solves concrete problems that piescript will hit. Let me walk through what you actually gain, in order of practical impact.

## 1. Streams Are Naturally Linear — Enforce It

A stream backed by a plan graph node produces pages once. If you write:

```
let s = query FROM logs-*;
let a = s |> map f;
let b = s |> filter g;
```

What should happen? `s` is consumed by both `map` and `filter`. The underlying query would need to run twice, or the pages would need to be buffered and replayed. Without linearity, this is a silent runtime problem — either duplicate I/O, undefined behavior, or an expensive implicit buffer.

With linearity: `Stream a` is a linear type. `s` must be used exactly once. The program above is a **compile-time type error**: "stream `s` consumed twice." If the user actually wants two views of the same data, they use an explicit combinator:

```
let (s1, s2) = tee s;
let a = s1 |> map f;
let b = s2 |> filter g;
```

`tee : Stream a -o (Stream a, Stream a)` explicitly duplicates the stream (and the plan graph knows to buffer or re-execute). The programmer's intent is clear, the cost is visible, and the type system enforces it.

This also simplifies the plan graph. Without linearity, every stream edge might have multiple consumers (fan-out), and the executor needs to handle this implicitly. With linearity, each stream edge has **exactly one consumer** unless the programmer explicitly requested fan-out via `tee` or `par`. The optimizer can assume linear data flow, which makes push-down, fusion, and dead-code elimination simpler and more predictable.

## 2. Safe Code Mobility — The Mobility Check Becomes a Type Property

Right now, the Phase 3 plan calls for a **runtime mobility check**: walk the lambda's `CoreExpr` tree, inspect the captured environment, determine if everything is serializable. This is ad-hoc — it's pattern matching on values at evaluation time.

With linearity, the mobility check becomes **structural, enforced by the type system**:

- Values of unrestricted (non-linear) type — integers, strings, booleans, records of unrestricted values — can be freely captured and shipped. They're `Copy`/`Clone`.
- Values of linear type — streams, channel endpoints — cannot be captured by a closure that travels. If you try, the type checker rejects it.

So instead of the evaluator inspecting captured environments at runtime:

```java
// Phase 3 mobility check (runtime, ad-hoc)
for (Value captured : closure.env()) {
    if (captured instanceof StreamVal) {
        return NON_MOBILE;  // can't serialize a stream handle
    }
}
```

You get a type-level guarantee:

```
-- This is a type error: `s` is linear, can't be captured by a traveling closure
let s = query FROM logs-*;
let f = fn x -> x + (s |> fold (+) 0);   -- ERROR: linear variable `s` captured in closure
```

The mobility check disappears as a separate analysis pass. It falls out of the type system for free. Mobile closures are exactly those that capture only unrestricted (non-linear) values — and the type checker already tracks this.

## 3. Session Types for Channels — Linearity Is the Foundation

This is the Phase 6 payoff. Session types — typed protocols on channels — **are** linear types. A session type describes a sequence of operations:

```
type LogProtocol = Send Int (Recv String End)
-- "send an int, then receive a string, then done"
```

Each step in the protocol **consumes** the channel endpoint and produces a new one with the remaining protocol:

```
send : Chan (Send a s) -o a -> (Chan s)
recv : Chan (Recv a s) -o (a, Chan s)
```

The `-o` (linear arrow) ensures each channel endpoint is used exactly once at each protocol step. You can't send twice on the same endpoint. You can't skip a receive. You can't use a channel after closing it. Wadler's "Propositions as Sessions" shows that well-typed programs under this discipline **cannot deadlock** — it falls out of the linear logic correspondence.

Without linearity, you can't have session types. A channel endpoint that can be aliased and used from multiple places destroys protocol safety — two different pieces of code could try to send on the same endpoint simultaneously. Linearity prevents aliasing, which is what makes the protocol guarantees work.

For piescript, this means: when `par` blocks eventually have explicit channels, the type system guarantees that the communication protocol between parallel branches is followed correctly. No runtime protocol violations, no deadlocks, no "sent the wrong type."

## 4. Resource Lifecycle — Aligns With ES's Compute Engine

ESQL's compute engine uses reference-counted `Block`s and `Page`s. A `Page` has a reference count; when it drops to zero, the memory is reclaimed. The code that processes pages must participate in this lifecycle correctly — release pages when done, don't use after release.

Linear types on streams map directly to this:

- A `StreamVal` (wrapping plan graph pages) is linear → consumed exactly once → pages released after consumption
- No double-free (stream consumed twice) → no use-after-release
- No leak (stream never consumed) → the type checker can warn about unused linear values

This is particularly important for the distributed executor (Phase 5). When plan fragments run on remote nodes, pages flow over exchanges. Each exchange output should be consumed exactly once. Linearity at the type level guarantees that the generated plan graph respects the exchange lifecycle — without the executor needing runtime checks.

## 5. The Typeclass Connection

Linearity interacts beautifully with the `Functor`/typeclass story. When `map` becomes `Functor.fmap`:

```
class Functor f where
    fmap : (a -> b) -> f a -> f b
```

For unrestricted types (lists, `Maybe`, records), `fmap` is the standard version. For linear types like `Stream`, `fmap` has a linear signature:

```
instance Functor Stream where
    fmap : (a -> b) -> Stream a -o Stream b
```

The stream is consumed by `fmap`. This is why making `map` a prelude function (not a special IR node) is load-bearing — when you add linearity, the typeclass instance just gets a linear arrow on the stream argument. No special cases for "linear Functor vs. regular Functor." The same typeclass machinery works for both; the linearity annotations are in the types.

Some languages call this a `Linear.Functor` or have a unified framework (quantitative type theory, as in Idris 2, where you annotate multiplicity: `0` for erased, `1` for linear, `ω` for unrestricted). Piescript doesn't need the full generality — a simple linear/unrestricted distinction suffices for streams and channels.

## What You Pay

Linearity isn't free:

- **Ergonomics**: users can't casually reuse a stream. `let s = query ...; in (s |> map f, s |> filter g)` is an error. They need `tee`. This is friction, but it mirrors reality — consuming a stream twice is genuinely expensive.
- **Implementation**: the type checker needs usage tracking (count how many times each variable is used). With HM inference, this is well-studied — systems like Linear Haskell (Bernardy et al.) show how to add linearity to HM without breaking existing code.
- **Annotation burden**: for v0, most types are unrestricted (integers, strings, records). Only `Stream` and (future) `Chan` are linear. So the annotation burden is minimal — the user rarely thinks about it. Streams and channels "just work" linearly because that's how they naturally behave.

## The Progression

The path is clean:

1. **Now (Phase 1)**: no linearity. Streams don't exist yet. Pure functional expressions only.
2. **Phase 3**: streams introduced. `map`/`filter`/`fold` are prelude built-ins. The mobility check is a runtime analysis. Streams can be accidentally consumed twice (runtime error or implicit re-execution).
3. **Phase 3.5 or 4**: add linear types for `Stream`. The mobility check becomes a type property. Double-consumption becomes a compile-time error. `tee` is the explicit escape hatch.
4. **Phase 6**: add session types for channels. Linearity on channel endpoints guarantees protocol compliance and deadlock freedom.

Each step builds on the previous. Linearity for streams is the stepping stone to session types for channels. And both are enabled by the pure, referentially transparent foundation — in an impure language, linearity is much harder to enforce because effects can observably duplicate or discard resources.

## The Short Answer

What does linearity give you? **The type system enforces the rules that the runtime would otherwise have to check or the programmer would have to remember:**

| Without linearity | With linearity |
|---|---|
| Runtime mobility check (inspect captured env) | Type-level guarantee (linear values can't be captured) |
| Silent double-consumption of streams (re-execute or crash) | Compile-time error + explicit `tee` |
| Runtime protocol violations on channels | Session types: compile-time protocol safety |
| Executor must handle implicit fan-out | Plan graph edges are one-to-one by construction |
| Page lifecycle managed by convention | Page lifecycle enforced by type system |

It's not about adding a feature for its own sake. It's about making the type system enforce invariants that are already true about the computational model — streams are consumed once, channels follow protocols, traveling code can't capture live resources. Linearity just makes the compiler check what the programmer would have to get right manually.

The user is asking about the concrete benefits of adding linear/affine types to piescript. This is a forward-looking design question. Let me think through what linearity actually buys you in the context of piescript's specific design — distributed computation with traveling closures, streams, channels, and a plan graph.

Key areas where linearity matters for piescript:

1. **Safe code mobility / traveling closures** — linear types prevent closures from capturing non-serializable resources (streams, channels). If a stream is linear, you can't capture it in a closure AND use it elsewhere. This means the mobility check becomes a type-level property rather than a runtime analysis.

2. **Stream consumption safety** — a stream should be consumed exactly once. 

Without linearity, you could accidentally use a stream multiple times in different branches, which would either re-execute the underlying query or cause undefined behavior since streams are backed by plan graph nodes that produce pages. Linearity prevents this by making it a type error to consume the same stream twice.

3. **Channel protocol safety (session types)** — session types ARE linear types on channels. A session type describes a protocol like "send an int, then receive a string, then close," where each step consumes the channel endpoint and produces a new one with the remaining protocol. Without linearity, you could violate the protocol by reusing a channel endpoint after it's been consumed.

---

## [46] User

yeah ok, i think there's enough advantages to eventually add it. That said, talkinga bout this revealed problems we must address before we can use the safeguards of linearity. 
We have to come up with appropriate semantics for:

```
let s = query FROM logs-*;
let a = s |> map f;
let b = s |> filter g;
```
If this errors it would be very inconvenient, same for duplciating the query (and i think doing that is also not straightforward). I think the easist is splitting? but it still needs some sort of usage tracking (does it), which leads us back to linearity.
So maybe we need to ideate on this a bit?

QUick note: when we get to linearity, i think the easiest thing to do is full blown QTT, exvept no dependent types, which in some ways, simplifies stuff (it does complicate in others, because we can collapse terms and values, but our types arent that intricate yet)

---

## [47] Assistant

This is a really important question, and I think the answer is hiding in a distinction that the current plans blur. Let me work through it.

## The Plan Graph Dissolves the Problem

Here's the thing: under the plan graph model we agreed on, the double-use case **isn't actually a problem**.

```
let s = query FROM logs-*;
let a = s |> map f;
let b = s |> filter g;
```

What happens at evaluation time? The evaluator:

1. Encounters `query FROM logs-*` → builds `QueryPlanNode("FROM logs-*")`
2. Binds `s` to `StreamVal(queryNode)` — this is **data**, a description, not a running computation
3. Encounters `s |> map f` → takes `s.planNode`, wraps it: `MapPlanNode(f, queryNode)`
4. Encounters `s |> filter g` → takes `s.planNode` again, wraps it: `FilterPlanNode(g, queryNode)`

The plan graph is now a **DAG with fan-out**:

```
       QueryPlanNode
      /             \
MapPlanNode(f)   FilterPlanNode(g)
```

No query was executed twice. No data was buffered. No error. We just built a data structure that references the same node twice. The plan graph is a DAG, not a tree — fan-out is a normal structural property.

The **executor** then sees the fan-out and handles it. This is a solved problem in query engines:
- ESQL's Exchange operators do exactly this — one source feeds multiple downstream operators
- Pages are reference-counted (`Block.allowPassingToDifferentDriver()`), so multiple consumers can share
- The optimizer might even fuse `map f` and `filter g` into a single pass if both are mobile

So the semantics are straightforward: `StreamVal` is a plan description. Plan descriptions are ordinary unrestricted values. Sharing them creates fan-out in the DAG. The executor handles fan-out. No linearity, no `tee`, no error, no implicit query duplication.

## Where the Confusion Came From

The previous discussion (and my earlier responses) assumed an iterator-based model — where a `StreamVal` wraps a running `Iterator<Page>` with a cursor. Under THAT model, sharing a stream is genuinely problematic: two consumers would advance the same cursor, interleaving reads, losing data. That's where the "streams are linear" intuition comes from.

But we explicitly moved away from that model in Phase 3. `StreamVal` wraps a `PlanNode`, not an iterator. Plan nodes are data. Data is unrestricted. The problem evaporates.

This is actually a nice consequence of the plan graph architecture — it gives us **lazy fan-out for free** because the description of computation (plan) is separate from the execution of computation (executor).

## So What Actually Needs Linearity?

If streams aren't linear, what is? The things that genuinely can't be aliased:

### Channel Endpoints (Phase 6)

A channel endpoint represents one side of a communication protocol. If you alias it:

```
new(c) in par

The user is raising a really important practical design question. Let me think through this carefully.

The problem: when a stream is bound to a variable and used multiple times, what happens?

```
let s = query FROM logs-*;
let a = s |> map f;
let b = s |> filter g;
```

Options:
1. **Error** — inconvenient, bad UX for a query language
2. **Duplicate the query** — fire the query twice, wasteful and not straightforward (the plan graph would need to duplicate the QueryNode)
3. **Implicit split/tee** — automatically buffer and replay
4. **Explicit split/tee** — require the user to write `tee`


5. **Something smarter with the plan graph**

Here's what I'm realizing: at the plan graph level, when I bind `s` to the query and then use it in multiple operations, both the map and filter nodes end up referencing the same underlying QueryPlanNode. So instead of duplicating the query or requiring explicit tee operations, I could let the plan graph itself handle the fan-out — the single QueryPlanNode naturally feeds into both downstream operations, and the execution engine can manage the buffering and replay transparently. The real issue here is the type system, not the runtime—the executor already handles fan-out through DAGs and reference-counted pages. Without linearity, `s` can be used multiple times without error and the plan naturally becomes a DAG. With linearity, using `s` twice becomes a type error unless explicitly fanned out with `tee`. For v0, I think streams should be unrestricted so fan-out works naturally, and linearity can be added later as an opt-in feature.

But actually, the user is pointing toward Quantitative Type Theory—where each variable has a multiplicity annotation (`0` for erased, `1` for linear, `ω` for unrestricted) rather than requiring separate linear and non-linear types. In piescript, most values would be unrestricted, but streams could potentially be linear or have different multiplicity constraints.

The key distinction is that multiplicity lives on the *binding*, not the type itself. So a stream isn't inherently linear—it depends on how it's bound. If bound with `ω`, it can be used multiple times and the executor handles fan-out through shared pages. If bound with `1`, it's consumed after first use.

The real insight is that linearity matters for *channels*, not streams. Streams can safely be `ω` with fan-out, but channel endpoints must be `1` to maintain session type guarantees, and closures can only capture unrestricted values, not linear ones like channel endpoints.

In pull-based systems, streams are naturally linear—you advance a cursor and can't replay. But in a plan-graph system, streams are descriptions, not running computations, so the executor can implement fan-out at runtime without the stream itself being consumed multiple times at construction.

The real constraint is on channel endpoints with session types, not streams themselves. When checking if a closure can be serialized for mobility, I need to verify whether the plan nodes it references are also serializable—which gets tricky if those nodes depend on non-serializable resources. v0 (all local), yes — it's a data structure. In the distributed case, the plan node might reference local resources (running queries, page buffers). So it's not straightforward.

Actually, in the plan-graph model, a StreamVal IS serializable — it's just a plan node (data). The plan hasn't been executed yet. Shipping a plan node to a remote executor is exactly what the distributed executor does. So capturing a StreamVal in a closure and shipping it is... fine? The remote executor would just execute the plan node locally.

Hmm, but that could mean re-executing the query on the remote node. That might not be what the user wants. And it could lead to the query being executed multiple times on different nodes.

OK, I think the real picture is:

1. **Plan graph construction** (evaluator): StreamVal is just data (a plan node). It's unrestricted.
2. **Plan graph optimization**: the optimizer sees the DAG and decides how to handle fan-out (buffer, exchange, or re-execute).
3. **Plan graph execution**: the executor handles fan-out based on the optimizer's decisions.

So linearity at the language level isn't really about streams themselves — streams as plan nodes are just unrestricted data. It's about channel endpoints and potentially executed stream handles if we ever expose running streams to the language. Now, thinking about the QTT suggestion: the user mentions "full blown QTT, except no dependent types," which would give us a system where each binding has a usage multiplicity (0, 1, or ω), and functions respect those constraints.

This is essentially Linear Haskell — a system with multiplicities but no dependent types, so terms and types stay separate. The user notes we can collapse terms and values since there's no need to evaluate types or type-check terms appearing in types. They mention our types aren't intricate yet, so...

Actually, I see what they're getting at now. With dependent types you'd collapse terms and types uniformly, but without them you have some duplication between levels. Since piescript's types are simple, that overhead doesn't matter — the multiplicity system is just an annotation layer on top of Hindley-Milner.

Now for the actual question about double-stream-usage and linearity: the key is that in the plan graph model, streams are just plan descriptions, not active computations. Sharing a plan description is free and creates fan-out in the DAG — the executor handles materializing it however it needs to, either buffering pages or pipelining to both consumers. So a program that uses the same stream in multiple places is fine at the plan level.

Linearity only becomes relevant for things that genuinely can't be shared — channel endpoints and future resources like mutable state or I/O handles. The user's concern about errors is resolved because plan nodes are data, not resources. For streams specifically, no linearity tracking is needed; the plan graph handles fan-out transparently. For channels, that's a different story. And if we eventually want to express something like "this channel endpoint must be used exactly once," that's where QTT-style reasoning would come in.

---

## [49] Assistant

Right, I was mid-thought on what actually needs linearity. Picking up from channel endpoints.

### Channel Endpoints (Phase 6)

A channel endpoint represents one side of a communication protocol. If you alias it:

```
new(c) in par {
  let x = send c 42;
  let y = send c "hello";   -- two sends on the same endpoint!
}
```

This is a genuine protocol violation — the receiver expects one message, two arrive. Session types require that each endpoint is used exactly once per protocol step. `send` consumes the endpoint and returns a new one with the remaining protocol. Aliasing breaks this.

This is the real use case for linearity in piescript: **channel endpoints must be linear, streams don't need to be.**

### Executed Plan Handles (Future, Maybe Never)

If we ever expose a "running" stream — a live handle to an executing plan fragment, not a plan description — that would be linear. An executing stream has a cursor, pages are being consumed, reference counts are decrementing. You can't share that.

But under the plan graph model, we probably never expose this to the user. The user sees plan descriptions (unrestricted). The executor manages running state (internal, never aliased by user code). So this may never arise.

## The Revised Picture

| Value type | Multiplicity | Why |
|---|---|---|
| Int, String, Bool, Records | ω (unrestricted) | Plain data, freely copyable |
| `StreamVal` (plan node) | ω (unrestricted) | Plan description, fan-out handled by executor |
| Closures (code + captured env) | ω (unrestricted) | Immutable, clonable (purity) |
| Channel endpoint (future) | 1 (linear) | Session type protocol step, can't alias |

This is actually much simpler than "everything resource-like is linear." Streams being unrestricted is a direct consequence of the plan graph model. The only linear things are channel endpoints, and those arrive in Phase 6.

## What About the Mobility Check?

If streams are unrestricted, can a traveling closure capture a `StreamVal`? Let's think about what that means:

```
let s = query FROM logs-*;
let f = fn x -> x + (s |> fold (+) 0);
query FROM metrics-* |> map f
```

The closure `f` captures `s`, which is a `StreamVal(QueryPlanNode)`. If `f` travels to a data node, it carries the `QueryPlanNode` with it. The remote executor would then... execute that query on the remote node? That might actually be fine — the plan node is data, it's serializable, and the remote executor can run it.

But it might also be surprising — the user probably didn't intend for the `logs-*` query to re-execute on every data node that processes `metrics-*` rows. This is a semantics question, not a linearity question: **should plan nodes be evaluated once (shared) or re-evaluated per use (replicated)?**

The plan graph optimizer can handle this: detect that a captured `StreamVal` in a traveling closure implies replication, and either:
- Hoist the captured query to execute once on the coordinator, passing the result as a concrete value
- Warn the user that the query will be replicated
- Let it replicate if that's efficient (e.g., the query is cheap or the data is local)

This is an optimizer concern, not a type system concern. No linearity needed.

## The QTT Point

Your QTT instinct is good, but it might be overkill for v0–Phase 4. Here's why:

If the only linear things are channel endpoints (Phase 6), and everything else is unrestricted (ω), then the multiplicity system is trivial until Phase 6. You'd add QTT machinery that sits dormant for several phases.

That said, your point about "full QTT minus dependent types" is clean. Without dependent types:

- Multiplicities are a fixed semiring {0, 1, ω}, not computed from terms
- The type checking context is `Γ = x₁ :_{π₁} A₁, ..., xₙ :_{πₙ} Aₙ` where each binding has a multiplicity annotation
- Function types carry multiplicity: `A →_π B` means "the argument is used with multiplicity π"
- Type inference tracks usage through context splitting

This is essentially Linear Haskell (Bernardy et al. 2018, "Linear Haskell: Practical Linearity in a Higher-Order Polymorphic Language"). They use {1, ω} without dependent types, on top of System FC (GHC's core). The theory is well-understood and the implementation is in production GHC.

For piescript, QTT without dependent types on top of HM + rows would give you:

```
-- Stream combinators: unrestricted stream argument (plan node, can fan-out)
map    : (a -> b) -> Stream a ->_ω Stream b
filter : (a -> Bool) -> Stream a ->_ω Stream a
fold   : (b -> a -> b) -> b -> Stream a ->_ω b

-- Channel operations: linear channel argument (session step, must consume)
send : Chan (Send a s) ->_1 a -> Chan s
recv : Chan (Recv a s) ->_1 (a, Chan s)
```

The `→_ω` is the unrestricted arrow (normal function). The `→_1` is the linear arrow. In practice, `→_ω` is the default and you only write `→_1` for channel operations. Most code never touches linearity.

The simplification you mention (no dependent types = terms and types stay separate) is correct. In full QTT, multiplicities can appear in types and be computed from terms. Without dependent types, multiplicities are static annotations resolved at type-checking time. This avoids the need for:
- Term-level multiplicity computation
- Multiplicity polymorphism over dependent arguments
- Type-level evaluation of multiplicity expressions

You just need the usage-tracking machinery in the type checker: when checking `let x = e1 in e2`, verify that x's usage in `e2` respects the declared multiplicity. That's a straightforward extension to the existing bidirectional HM checker.

## So What Should We Do Now?

I think the answer is:

**For v0 through Phase 4: streams are unrestricted, no linearity, the plan graph handles fan-out. Document this as a deliberate decision.** The mobility check is an optimizer concern (hoist captured plan nodes, warn about replication), not a type system concern.

**For Phase 6 (channels): add QTT-style multiplicities.** Channel endpoints are linear (multiplicity 1). Everything else remains unrestricted (multiplicity ω). The QTT machinery is introduced alongside session types because that's when it's needed.

**Design consideration for Phase 1 now:** make sure the type representation can be extended with multiplicities later. In practice, this means the function type `A -> B` should eventually become `A ->_π B`. If the type representation uses `TFun(MonoType domain, MonoType codomain)`, it's easy to add `TFun(Multiplicity mult, MonoType domain, MonoType codomain)` later. No need to implement it now, just leave room.

The stream double-use problem you raised doesn't need linearity — it needs the plan graph to be a DAG (which it already is). The thing that needs linearity is channels, and that's Phase 6. The QTT approach is the right one when we get there — it's clean, well-understood, and doesn't require dependent types.

I was in the middle of explaining what actually needs linearity. Let me continue from where I left off — I was about to show why channel endpoints need linearity.

---

## [50] User

good stuff!
But the killer thing is that having linearity (and QTT) would allow us to have long-lived, persistent, in-memory, shared, mutable resources, that we can access, mutate, clone etc. In essence, safe globals that we can interact with from streams and different nodes. Yes, there are a whole load of problems here, and we're honing in on Rust-like ownership semantics too (not quite there yet), but my point is that encoding linearity for a couple things we already know we want and would benefit, will then free us for a *whole other world*

---

## [51] Assistant

Yes. This is the actual thesis for linearity in piescript, and it's much bigger than channels or streams.

## The Real Prize

The chain is:

1. **Linearity for channels** — session types, protocol safety, deadlock freedom. Useful, but narrow.
2. **Linearity for mutable references** — safe, shared, mutable state across processes and nodes. This is the game changer.

With QTT multiplicities and a notion of owned references, you can express things that are currently impossible in a pure functional distributed language:

```
-- A persistent shared counter, safely mutated from parallel streams
let counter = Ref.new 0;

par {
  let _ = query FROM logs-* | WHERE status >= 500
    |> each (fn _ -> Ref.modify counter (+ 1));
  let _ = query FROM logs-* | WHERE status < 500
    |> each (fn _ -> Ref.modify counter (+ 1));
} in Ref.read counter
```

```
-- A shared lookup table, built by one stream, read by another
let table = Ref.new {};

par {
  let _ = query FROM enrichment-index
    |> each (fn doc -> Ref.modify table (insert doc.key doc.value));
  let enriched = query FROM logs-*
    |> map (fn doc -> { doc | enrichment: Ref.read table doc.service });
} in enriched
```

```
-- A materialized view, incrementally updated by a continuous stream
let view = Ref.new (empty_aggregation);

query FROM logs-* | SORT @timestamp
  |> each (fn doc -> Ref.modify view (update_agg doc))
```

None of this is possible in the current "pure, referentially transparent, no side effects" model. But it's also not safe without linearity — two processes mutating the same reference concurrently is a data race. Linearity (or more precisely, QTT-style multiplicity tracking) gives the type system the ability to enforce exclusivity.

## Why QTT Is the Right Foundation

You're right that this is converging on Rust-like ownership, but approached from the opposite direction:

- **Rust**: starts imperative, adds ownership/borrowing to make mutation safe
- **Piescript**: starts pure functional + π-calculus, adds QTT multiplicities to enable safe mutation

The convergence isn't coincidental. Both are solving the same problem: **safe concurrent access to shared resources** using substructural types. The underlying theory is the same — linear logic / substructural type systems. The surface ergonomics differ because the starting points differ.

QTT specifically gives you the right vocabulary:

| Multiplicity | Meaning | Piescript use |
|---|---|---|
| `0` | Erased, compile-time only | Type-level indices, phantom types |
| `1` | Linear, used exactly once | Owned mutable references, channel endpoints |
| `ω` | Unrestricted, used any number of times | Plain values, plan nodes, shared immutable reads |

And crucially, **multiplicity polymorphism**: a function can be generic over multiplicity. `id : (x :_π a) -> a` works for any `π`. This means most of the standard library doesn't need to know about linearity — only the code that creates or consumes linear resources needs multiplicity annotations. Everything else is multiplicity-polymorphic by default.

Without dependent types, multiplicities are drawn from the fixed semiring `{0, 1, ω}` with known rules (`1 + 1 = ω`, `1 * ω = ω`, etc.). No term-level multiplicity computation, no multiplicity-indexed types. Just a static annotation on each binding that the type checker tracks through usage analysis.

## The "Whole Other World"

You're identifying the key strategic insight. Once you have linearity + owned references, an enormous design space opens:

**Mutable shared state** — safe globals that processes can read and write with guaranteed exclusivity. No locks, no mutexes, no STM — the type system prevents data races.

**Persistent in-memory resources** — data structures that live beyond a single query pipeline. A materialized view, a cache, a running aggregation. These are references owned by the runtime, borrowed by query pipelines.

**Incremental computation** — update an aggregation incrementally as new data arrives, rather than recomputing from scratch. The mutable reference holds the accumulated state; streams borrow it to update.

**Cross-node shared state** — a reference that lives on a specific node, with borrows distributed to other nodes. The type system tracks that only one node holds a mutable borrow at a time, while multiple nodes can hold immutable borrows concurrently. This is distributed ownership.

**Actors / long-lived processes** — a process that owns a mutable reference and responds to messages. This is where piescript would start to look like Erlang, but with static type safety on the protocol AND the state mutations. A gen_server equivalent where the type system guarantees the state machine is correct.

**Safe write-back** — eventually, piescript could write to indices (not just read). A mutable reference to an index write buffer, linearly owned by a process, flushed on completion. The type system prevents double-writes, dropped writes, and concurrent conflicting writes.

## The Progression Crystallizes

Looking at it now, the phases tell a coherent story:

1. **Phase 1**: Pure functional expressions. Everything is `ω`. No resources, no effects.
2. **Phase 3**: Plan graph introduces streams. Streams are plan descriptions (`ω`). Fan-out is free via DAG structure.
3. **Phase 4**: `par` blocks. Parallel plan composition. Still no mutable state.
4. **Phase 6**: Channels with session types. First use of multiplicity `1`. QTT machinery introduced. Channel endpoints are linear.
5. **Phase N**: Mutable references. `Ref a` with owned/borrowed semantics. Multiplicity `1` for exclusive ownership, `ω` for shared immutable borrows. The type system enforces safe concurrent mutation. This is where the distributed computation model reaches its full potential.

Each phase adds one more capability, and the type system absorbs it cleanly because the foundation (QTT multiplicities) is general enough to handle all of them.

## The Challenges Are Real But Known

You noted "there are a whole load of problems here." Worth naming them:

**Borrow checking vs. QTT**: QTT tracks that a linear value is used exactly once. But Rust-style borrowing is richer — it tracks *regions* (how long a borrow lives) and *exclusivity* (mutable borrow excludes all other access). QTT alone gives you ownership transfer (move semantics) and single-use guarantees. For full borrow-checking, you'd need something more — either Rust-style lifetime annotations, or a region system, or uniqueness types (Clean). This is non-trivial but well-studied.

**Distributed ownership**: who owns a `Ref` that lives on node A but is borrowed by code running on node B? The ownership protocol needs to be part of the plan graph — "acquire exclusive borrow from node A, do work, release borrow." This is essentially a distributed lock, but encoded in the type system rather than implemented as a runtime mechanism.

**GC / resource reclamation**: linear values must be consumed. If a `Ref` is linear, the programmer must explicitly destroy it (or the runtime must do so at scope exit). In a distributed setting, this means coordinating cleanup across nodes.

**Ergonomics**: Rust's borrow checker is famously difficult for beginners. Piescript's audience (security analysts, data engineers) is less PL-savvy than Rust's. The linearity system needs to be invisible for the 90% case (plain values, streams, simple queries) and only surface when the user opts into mutable references or channels.

But these are **implementation challenges in a well-understood design space**, not open research problems. Rust, Clean, Linear Haskell, and Granule have all navigated versions of these tradeoffs. Piescript can learn from all of them.

## The Bottom Line

You're not hand-waving. The argument is: invest in QTT as the multiplicity foundation (not just "linearity for channels"), because the same machinery that gives you session types also gives you safe mutable shared state, distributed ownership, incremental computation, and eventually a stateful distributed programming model that's both more powerful and more safe than Erlang's actors. The type system does the work that Erlang delegates to runtime conventions (OTP patterns) and programmer discipline.

That's a compelling long-term vision. And the nice part is: it's all additive. Phase 1 through Phase 4 work without any of it. QTT arrives when channels arrive. Mutable references arrive when the distributed executor is mature. Each layer uses the same foundation.

The user is making a profound point. They're not just thinking about linearity for channels — they're seeing the bigger picture: linearity (and QTT) gives you a principled framework for **safe mutable shared state** in a distributed system.

Let me think about what this means:

With linear/affine types + QTT multiplicities, you can model:
- **Mutable references** (like Rust's `&mut T` — exclusive access, one owner)
- **Shared immutable references** (like Rust's `&T` — many readers, no writers)
- **Ownership transfer** (move semantics — hand off a resource to another process/node)


- **Borrowing** (temporary access without ownership transfer)

In piescript's context, this could mean persistent in-memory resources that live beyond a single query pipeline — like a shared counter across parallel branches, a lookup table populated by one query and referenced by others, or a materialized view that streams update incrementally. Without linearity, you'd need locks and mutexes to prevent data races, but with linear types distinguishing between unique and shared references, the type system prevents races at compile time, which is exactly what Rust does with ownership.

So the real breakthrough here is that QTT multiplicities give you Rust-style ownership semantics in a functional language with process primitives, enabling safe mutable shared state in distributed systems — the ability to express "this resource is owned by process A, borrowed immutably by process B, and inaccessible to process C" entirely through types.

I'm sketching out what this looks like concretely: creating a mutable shared counter with linear ownership, then having parallel query branches borrow it mutably to increment it while reading from other data sources...

Exploring the implications further...

With safe mutable shared state, piescript could unlock materialized views, cross-query caching, incremental computation, distributed counters, and collaborative processing — essentially moving from isolated query execution to persistent distributed computations with shared mutable state. The user's insight about Rust-like ownership is spot-on: both Rust and piescript are converging on the same solution (substructural type systems for safe concurrent resource access), just from opposite directions — Rust adds ownership to imperative code, while piescript adds linearity to pure functional programming with π-calculus.

---

## [53] User

ok, so lets digest this discussion and crystalize it into our documentation. ANd lets hold the horses on QTT and the "Brave New World" connection of ownership, refs, mutability and all that. We should note it down but with a more uncertain tone, because it's yet to be researched or fully fleshed out. It's just potential ideas we can strive towards, but nothing concrete. In other words, it might never make it (With good reason) to piescript. It should probably live in some section of the VISION document, about potential and similar. We can talk about all of the stuff it enables, just not as it is a guarantee that it will work - a lot of what we talked about might turn out to simply just not work as first hoped.

That said, other things are more clear:
We've figured out what to do with map/filter/reduce
we figured out the connection to typeclasses, Π primitives, free monad and the "duplication" of a query semantics.
we figured out where linearity could come in, with channels and code mobility, and potential optimizations: linear closure/continuation? no need to clone, just send the actual thing. Stuff like that.

So lets mark this all down in the relvant files, including the existing plans

---

## [56] Assistant

Now I have the full picture. Let me also quickly check the Phase 3 task list for the `CoreProcess` references that need updating.

---

## [59] Assistant

Now updating Phase 3 plan. The key changes: remove `MapStream`/`FilterStream`/`FoldStream` from `CoreProcess`, make them prelude built-ins, add stream fan-out as a feature not a problem, revise the task list.

---

## [66] Assistant

Now update Section 9.2 (Mobility Check) to note that the mobility check is an optimizer concern, and that linearity is not needed for streams:

---

## [71] Assistant

Now updating the roadmap — revise Phase 6 to include QTT multiplicities and add a speculative future phase.

---

## [78] Assistant

All six items are done. Here's a summary of every file updated and what changed:

**Files updated (8 total):**

1. **`docs/vision.md`** — Added a "Speculative: Potential Future Directions" section at the bottom. Covers mutable shared state via ownership, continuous computations, and linear optimization opportunities — all with clear caveats that these are exploratory and may not pan out. Also added linearity-related notes to the existing Long-Term Aspirations (linear closures as move optimization, QTT for channels).

2. **`docs/decisions.md`** — Three new ADRs:
   - **D-016**: Stream combinators as prelude built-ins, not Core IR nodes. `map`/`filter`/`fold` are normal polymorphic functions whose runtime implementations construct plan graph nodes. Enables clean typeclass migration path.
   - **D-017**: Stream fan-out via plan graph DAG. `StreamVal` wraps a description; sharing it creates fan-out. No linearity, no `tee`, no error.
   - **D-018**: Linearity roadmap — QTT multiplicities for channels (Phase 6+), not streams. Streams stay unrestricted (ω). Channel endpoints are linear (1). Framework: QTT without dependent types.

3. **`phase3_stream_runtime.plan.md`** — Revised deliverables list (only `Query` is `CoreProcess`; combinators are built-ins). Updated the evaluator walkthrough to show `map`/`filter` as normal function application. Added "Stream Fan-Out (DAG Semantics)" subsection. Updated task T3.1 (CoreProcess is just `CoreQuery`), T3.3 (evaluator/planner + prelude built-ins). Added fan-out integration test. Updated implications section (typeclass migration, linearity for channels, multiplicity annotations).

4. **`scripting_language_design_9286506e.plan.md` (master plan)** — Section 6.2 rewritten (prelude built-ins + typeclass path). New Section 6.2.1 (stream fan-out). Section 6.3 updated (combinators are NOT `CoreProcess`). Section 9.1 updated (evaluator handles built-ins). Section 9.2 expanded (mobility check is optimizer concern; linear closure move optimization). Phase overview table updated (Phase 6 renamed). Phase 3 deliverables revised. Phase 6 description expanded with QTT.

5. **`docs/references.md`** — New "Linear Types, QTT, and Substructural Type Systems" section with three references: Linear Haskell (Bernardy et al. POPL 2018), Idris 2 / QTT (Brady ECOOP 2021), Granule (Orchard et al. ICFP 2019). Relevance table updated.

6. **`docs/roadmap.md`** — Phase 3 task table revised (built-ins, fan-out, new decisions). Phase 6 rewritten with QTT multiplicities, linear closures, and references. New "Speculative: Ownership, Mutable References & Beyond" section with appropriate caveats.

7. **`docs/AGENTS.md`** — Key design constraints expanded (combinators as built-ins, streams unrestricted). Chat history reference updated (D-016 through D-018, Phases 3–6 reframing).

---

## [79] User

This was very productive and we will finish this session here.
Wrap up anything that was leftover and is not yet covered in the relveant docs, and make sure to link back to this discussion where appropriate

---

## [80] Assistant

Let me check what's still missing — the chat history reference needs the actual conversation ID, and I should verify Phase 4 and current-state docs are up to date.

The user wants me to wrap up the session by making sure everything from our discussion is properly captured in the docs and linked back to this conversation. Let me check what might still be missing:

1. The conversation summary mentions several key topics that were discussed:
   - Map/filter/fold as prelude built-ins (D-016) ✓
   - Stream fan-out via DAG (D-017) ✓
   - Linearity roadmap with QTT for channels (D-018) ✓
   - BEAM/Erlang comparison ✓ (already in references.md from prior session)
   - Speculative ownership/QTT future ✓
   - Typeclass connection (map → Functor.fmap) ✓
   - Linear closures as move optimization ✓
   - Free monad connection ✓

Now I need to verify the documentation is properly linked—specifically checking if AGENTS.md references this conversation's UUID and whether current-state.md and the Phase 4 plan need any updates based on what we covered.

The transcript is stored at `/Users/t.vilaverde/.cursor/projects/Users-t-vilaverde-Workspace-Elastic-elasticsearch/agent-transcripts/6c10d690-5758-49da-88f5-4c38f2f9cd72/6c10d690-5758-49da-88f5-4c38f2f9cd72.jsonl`, so the UUID is `6c10d690-5758-49da-88f5-4c38f2f9cd72`—which matches the summary reference, meaning this is a continuation of the same conversation thread. I should make sure AGENTS.md points to this UUID and then review the other files to see what needs updating.

---

## [81] Assistant

Good — Phase 4 looks clean and consistent. Now let me check what's missing:

1. The AGENTS.md chat history reference needs the actual conversation UUID
2. Phase 4's "Future Work" section should mention QTT/linearity for channels since that's now decided (D-018)

---

## [83] Assistant

Now let me also check the `architecture.md` to make sure the combinator/fan-out changes are reflected there:

---

## [84] Assistant

The architecture doc still has the old `CoreProcess` terminology for stream combinators. Let me update it.

---

## [86] Assistant

Clean. Let me also check across all docs for any remaining stale `MapStream`/`FilterStream`/`FoldStream` references:

---

## [87] Assistant

The references in `decisions.md` are in the context of older ADRs (D-012, D-013) and in the D-016 context where we're explaining the decision to *not* use those names. Those are all historically appropriate — D-012 and D-013 were written before D-016, and D-016 explicitly names them as the rejected option. No changes needed there.

Let me do a final check for any remaining `CoreProcess` references that claim `map`/`filter`/`fold` are process nodes:

---

## [88] Assistant

That's in the D-016 context sentence (the rejected option). Correct and intentional.

Everything looks consistent. Here's the wrap-up summary:

---

**Session wrap-up — all documentation is now consistent.** Here's what was updated across this session:

**9 files touched, 3 new ADRs, 3 new references, 1 new vision section:**

| File | Changes |
|---|---|
| `docs/vision.md` | New "Speculative: Potential Future Directions" section (QTT, ownership, mutable refs — hedged as exploratory). Linearity notes in Long-Term Aspirations. |
| `docs/decisions.md` | D-016 (combinators as prelude built-ins), D-017 (stream fan-out via DAG), D-018 (QTT for channels, not streams) |
| `docs/architecture.md` | `CoreProcess` no longer claims map/filter/fold. Plan graph is a DAG with fan-out. PiF constructors annotated by source. |
| `docs/references.md` | Linear Haskell (Bernardy et al. 2018), Idris 2 / QTT (Brady 2021), Granule (Orchard et al. 2019). Relevance table updated. |
| `docs/roadmap.md` | Phase 3 tasks revised (built-ins, fan-out). Phase 6 rewritten (QTT + channels). New speculative phase for ownership. |
| `docs/AGENTS.md` | Design constraints expanded. Chat history linked to `6c10d690-5758-49da-88f5-4c38f2f9cd72`. |
| `phase3_stream_runtime.plan.md` | Deliverables, evaluator walkthrough, T3.1, T3.3 all revised. Fan-out section + test added. Implications expanded. |
| `phase4_process_primitives.plan.md` | Future Work section now references D-018 (QTT for channels, linear closures). |
| Master plan | Sections 6.2, 6.2.1, 6.3, 9.1, 9.2 updated. Phase table and deliverables revised. |

**Key ideas crystallized:**
- `map`/`filter`/`fold` are prelude functions, not IR nodes — clean typeclass migration path
- Streams are unrestricted (ω) — fan-out is a DAG, handled by the executor
- Linearity arrives with channels (Phase 6) via QTT multiplicities {0, 1, ω}
- Linear closures enable move-instead-of-clone optimization
- Ownership/mutable refs are speculative, recorded with appropriate caveats

---

## [89] User

adn do we have a link in the relevant doc to this session? so we can refer back to it when needed?

---

## [90] Assistant

Yes — I added it to `docs/AGENTS.md` in the Chat History Reference section. Let me show you what's there:

```138:144:x-pack/plugin/piescript/docs/AGENTS.md
- **Distributed computation & π-calculus**: `6c10d690-5758-49da-88f5-4c38f2f9cd72` — plan graph
  architecture (free monad over π effects), two-layer IR (CoreExpr/CoreProcess), evaluator/planner
  split, traveling closures, mobility check, join calculus influence, code-as-data model, the IO
  monad / delimited continuations analogy. Stream combinators as prelude built-ins (D-016), stream
  fan-out via DAG (D-017), linearity roadmap with QTT for channels (D-018), BEAM/Erlang
  comparison, speculative ownership model. Resulted in D-012 through D-018 and reframing of
  Phases 3–6.
```

That's the single entry point — the UUID `6c10d690-5758-49da-88f5-4c38f2f9cd72` links back to this entire conversation (both the earlier part and this session). The individual ADRs (D-012 through D-018), the vision doc's speculative section, and the phase plans all cross-reference each other, so any future agent landing on any of those docs can trace back to this discussion via the AGENTS.md chat history.

The user wants to make sure there's a link back to this conversation session in the docs. Let me check what's currently in AGENTS.md for the chat history reference.

---

## [91] User

I think the roadmap or vision (or both) should also have that link. Would you agree?

---

## [92] Assistant

Yes, I agree. The AGENTS.md chat history is the right canonical index for agents, but `vision.md` and `roadmap.md` are the docs a human is most likely to read when trying to understand *why* the architecture looks the way it does. Having the link there saves a round-trip to AGENTS.md.

Specifically:

- **`vision.md`** — the new "Speculative: Potential Future Directions" section discusses QTT, ownership, and mutable refs that all came out of this conversation. A brief note at the top of that section like "These ideas emerged from [this design discussion](6c10d690-5758-49da-88f5-4c38f2f9cd72)" would anchor the provenance.

- **`roadmap.md`** — Phase 6 was significantly reframed (renamed from "Explicit Channels" to "QTT + Channels + Sessions") and the speculative phase at the bottom was added, both from this session. A link in those sections would help someone reviewing the roadmap understand where the direction came from.

I'd keep it lightweight — a single parenthetical or footnote-style reference rather than a full paragraph. Something like:

```markdown
(Design rationale: `6c10d690-5758-49da-88f5-4c38f2f9cd72`)
```

Want me to add those? You'd need to switch to Agent mode for that.

---

## [93] User

yes, add it

---

## [94] Assistant

Done. Added the design rationale link to three places:

- `vision.md` — top of the "Speculative: Potential Future Directions" section
- `roadmap.md` — Phase 6 (QTT + Channels + Sessions)
- `roadmap.md` — Speculative ownership section

---

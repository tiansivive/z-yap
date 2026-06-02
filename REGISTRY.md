# Registry

Record of every tag and connection label used in this ZK. This is **descriptive, not prescriptive** — it documents what exists, it does not approve or constrain what can exist.

- When a zettel needs a tag not listed here, **coin it and add it**.
- Do not scan this file for "close enough" alternatives. Similar is not the same.
- Merge tags only when two are genuinely synonymous.
- Same rules apply to connection labels.

---

## Core tags

| Tag | Description |
|-----|-------------|
| `concept` | A design idea or conceptual object |
| `mechanism` | A concrete operational method or technique |
| `principle` | A durable guiding constraint or heuristic |
| `pattern` | A reusable approach or technique |
| `decision` | A settled design choice with rationale |
| `specification` | Formal rules, language specification |
| `implementation` | Concrete code realization of a design/concept |
| `exploration` | Open-ended design exploration, not yet committed |
| `question` | An open question awaiting investigation |
| `concern` | A potential issue or trade-off worth tracking |
| `goal` | An aspirational design target |
| `problem` | An identified difficulty or challenge |
| `proposal` | A structured design proposal with options and trade-offs |
| `design` | A design task requiring exploration and decisions before implementation |

## Type theory tags

| Tag | Description |
|-----|-------------|
| `type-system` | Type system concept, mechanism, or property |
| `row-types` | Row polymorphism, row variables, row unification |
| `dependent` | Dependent types, Pi types, value-level type indices |
| `modality` | QTT multiplicities, linearity, resource tracking |
| `multiplicity` | QTT multiplicities (0, 1, ω) |
| `polymorphism` | Parametric and row polymorphism |
| `singleton` | Singleton types: values that classify themselves as types |
| `structural` | Structural typing properties (shape-based identity) |
| `codata` | Data defined by observations rather than constructors |

## Pipeline tags

| Tag | Description |
|-----|-------------|
| `elaboration` | Bidirectional inference, checking, type synthesis |
| `normalization` | NbE, evaluation, normal forms |
| `parser` | Parsing, grammar, CST/AST concerns |
| `mir` | Machine-Independent IR, lowering, compilation |
| `verification` | Liquid types, refinements, SMT, VC generation |
| `lowering` | IR translation, MIR, GRAM, compilation passes |
| `codegen` | Backend code generation (JS, C, Erlang) |
| `checking` | Bidirectional type checking mode |
| `evaluation` | Term evaluation, reduction, NbE evaluate phase |

## Language tags

| Tag | Description |
|-----|-------------|
| `language` | Core language features, syntax, semantics |
| `syntax` | Surface syntax, grammar, parsing concerns |
| `continuation` | Delimited continuations, shift/reset, CPS, answer types |
| `ffi` | Foreign function interface, external declarations, JS interop |
| `inference` | Type inference, generalization, implicit resolution |
| `runtime` | Operational semantics, evaluation, CBV |
| `effect` | Effect systems, coeffects, algebraic effects |
| `recursion` | Mu types, equirecursion, coinduction, termination |
| `sugar` | Syntactic sugar, desugaring, surface ergonomics |
| `cps` | Continuation-passing style transformation |

## Elaboration tags

| Tag | Description |
|-----|-------------|
| `constraint` | Constraint generation and accumulation |
| `solver` | Constraint solver, batched solving, implicit resolution dispatch |
| `metavariable` | Unification metavariables, holes, freshening |
| `unification` | Constraint solving, meta-variable resolution, row rewriting |
| `generalization` | Let-polymorphism, meta generalization at block boundaries |
| `context` | Elaboration context structure and operations |
| `closure` | Closures in NbE semantic domain and lowering |
| `substitution` | Metavariable substitution maps and composition |

## Compiler tags

| Tag | Description |
|-----|-------------|
| `compiler` | Compiler architecture, pipeline, passes |
| `rewriting` | Term/graph rewriting, DPO, algebraic graph transformation |
| `backend` | Target-specific concerns (JS, C, Erlang, HVM, GPU) |
| `performance` | Optimization, inlining, specialization, erasure |
| `ir` | Intermediate representations |
| `sat` | Boolean satisfiability, CDCL, CNF |
| `graph` | Graph-based intermediate representation and rewriting |
| `primitive` | Primitive operations, built-in signatures |
| `memory` | Memory management, allocation, GC, heap concerns |
| `allocation` | Heap allocation, stack allocation, placement strategy |
| `mutation` | In-place update, destructive modification, mutability |
| `ownership` | Value ownership, exclusive access, borrowing |
| `uniqueness` | Uniqueness typing, single-reference guarantee |
| `reuse` | Memory reuse, slot recycling, reset/reuse patterns |
| `refcounting` | Reference counting, drop/dup, RC optimization |
| `data-access` | Structural operations: read, update, CRUD on records/variants |
| `compilation` | Compilation strategy, code generation approach |

## Verification tags

| Tag | Description |
|-----|-------------|
| `quantifiers` | Universal/existential quantification, instantiation |
| `arithmetic` | Numeric reasoning, simplex, linear arithmetic |
| `strings` | String theory, word equations, concat |
| `ivl` | Intermediate Verification Language |
| `observability` | Runtime inspection of internal solver/engine state, step-by-step traces |

## Representation tags

| Tag | Description |
|-----|-------------|
| `ast` | Abstract syntax trees, term representations |
| `display` | Pretty printing, rendering, human-readable output |
| `error-handling` | Error types, causes, propagation |
| `tracing` | Provenance, breadcrumbs, diagnostic context |
| `monad` | Monadic abstractions, V2 Do notation |

## Infrastructure tags

| Tag | Description |
|-----|-------------|
| `project` | An organized body of work |
| `infrastructure` | Tooling, scripts, dev environment |
| `testing` | Test infrastructure, patterns, snapshot testing |
| `tooling` | REPL, explorer, LSP, developer experience |
| `automation` | CI/CD, GitHub Actions, automated checks, pre-commit hooks |
| `cli` | Command-line interface, REPL |
| `migration` | V1 → V2 transitions, parser migration, monad migration |
| `explorer` | Pipeline explorer web dashboard (`pnpm yap explore`) |
| `generator` | Generator functions (`function*`/`yield`) as control flow mechanism |
| `snapshot-testing` | Snapshot-based test approach (toMatchSnapshot, inline snapshots) |
| `cleanup` | Removal of dead code, stale tests, outdated patterns |
| `visualization` | Visual rendering of data structures, graphs, trees, timelines |
| `interactivity` | User interaction: click, hover, select, navigate |
| `comparison` | Side-by-side comparison, diffing, before/after analysis |
| `debugging` | Debugging tools, diagnostic aids, root-cause analysis |
| `stabilization` | Focused effort to fix/document issues surfaced by new visibility |

## Meta tags

| Tag | Description |
|-----|-------------|
| `research` | Empirical findings, prior art exploration |
| `paper` | Academic paper reference |
| `gateway` | Entry point to an external resource |
| `code` | Source code or code-level implementation concerns |
| `reference` | Reference material, external artifacts |
| `milestone` | Project milestones, deliverables |
| `ai-session` | A recorded AI pair-programming session |
| `drift` | Specification/implementation drift |
| `frozen` | Intentionally not updated through normal flow; references a locked snapshot of state |

## Status tags

### Epistemic status

| Tag | Description |
|-----|-------------|
| `implemented` | Working in code, tests pass |
| `in-progress` | Partially implemented, actively worked on |
| `planned` | Scoped and prioritized, not yet started |
| `speculative` | Explored in brainstorming, no commitment |
| `deprecated` | Was implemented, no longer the active approach |
| `rejected` | Considered and explicitly ruled out |
| `deferred` | Considered worthwhile but postponed |
| `incomplete` | Implemented with known gaps |

### Issue status

| Tag | Description |
|-----|-------------|
| `bug` | A known defect in current behavior |
| `bugfix` | A concrete correctness fix for a discovered defect |
| `improvement` | A non-critical enhancement to existing functionality |
| `tech-debt` | Suboptimal implementation, missing cleanup, known shortcut worth revisiting |
| `backlog` | Feature, capability, or enhancement not yet built |
| `limitation` | A known architectural constraint or design boundary that may be revisited |
| `todo` | A concrete actionable work item with a defined outcome; lives as a zettel so the plan/steps are recorded |

### ADR lifecycle

Orthogonal to epistemic status. Applies to zettels tagged `adr`. Describes the decision's lifecycle, not the implementation's state — an ADR can be `accepted` + `implemented` (decision in force, code shipped) or `superseded` + `deprecated` (replaced, old code retired).

| Tag | Description |
|-----|-------------|
| `proposed` | ADR drafted, not yet accepted |
| `accepted` | Decision in force |
| `superseded` | Replaced by a newer ADR (use `SUPERSEDES` edge from the replacement) |
| `subsumed` | Absorbed into a broader ADR (use `INCLUDES` or `SUPERSEDES`) |

## Work layer tags

| Tag | Description |
|-----|-------------|
| `thread` | A named, ordered sequence of work items forming a parallel concern |
| `queue` | A flat pending-work list; items graduate to threads when scoped |
| `hub` | An overview zettel that aggregates a domain; lists children |
| `adr` | Architecture Decision Record — documents a significant design shift with rationale. Filed as `<slug>.adr.md`; carries `adr-id: D-NNN` in frontmatter and a lifecycle tag |
| `ready` | Work item is unblocked and can be started |
| `blocked` | Work item is waiting on a dependency |
| `needs-design` | Work item requires design exploration before implementation |

### Thread lifecycle

| Tag | Description |
|-----|-------------|
| `active` | Thread currently being worked; has recent activity |
| `dormant` | Paused by deliberate choice; will resume |
| `on-hold` | Paused by external constraint (dependency, freeze) |
| `spike` | Timeboxed exploration with no committed outcome |
| `archived` | Historical record; no further action expected |

---

## Connection labels

New labels follow the same rule as tags: coin them when the relationship is meaningfully distinct, then register here.

| Label | Description |
|-------|-------------|
| `USES` | Source uses or applies the target |
| `EXTENDS` | Source extends or augments the target |
| `IMPLEMENTS` | Source realizes the target |
| `CONTRASTS_WITH` | Source contrasts with the target |
| `INFORMS` | Source is prior art or inspiration for the target |
| `APPLIES_TO` | Source is applicable to the target |
| `LACKS` | Source lacks the target feature |
| `REQUIRES` | Source requires the target as prerequisite |
| `CONSTRAINS` | Source constrains or limits the target |
| `ADDRESSES` | Source addresses or solves the target problem |
| `INCLUDES` | Source collection includes the target |
| `DISTINGUISHES` | Source disambiguates the target from alternatives |
| `ENABLES` | Source makes the target possible |
| `PRODUCES` | Source produces the target as output |
| `SOLVES` | Source resolves or computes solutions for the target |
| `RELIES_ON` | Source depends on target to function correctly |
| `DEPENDS_ON` | Source depends on the target (structural DAG edge) |
| `SUPERSEDES` | Source replaces target as the active approach |
| `REJECTS` | Source explicitly rules out target |
| `DEFERS` | Source postpones target |
| `REVISES` | Source is an improved version of target |
| `FOLLOWS` | Temporal succession — source came after target |
| `OBSOLETES` | Stronger than SUPERSEDES — target no longer relevant |
| `BLOCKS` | Source issue prevents progress on target |
| `MOTIVATES` | Source problem/concern motivates target |
| `DEPRECATES` | Source decision deprecates target |
| `ENCODES` | Source concept encoded/represented as target |
| `DESUGARS_TO` | Source surface syntax desugars to target core form |
| `LOWERS_TO` | Source high-level construct lowers to target IR form |
| `DISPATCHES_ON` | Source dispatches/branches on target type/shape |
| `GENERALIZES` | Source is a generalization of target |
| `SPECIALIZES` | Source is a specialization of target |
| `COMPOSES_WITH` | Source and target combine for emergent behavior |
| `EMULATES` | Source achieves effect of target without native support |
| `INSPIRES` | Source external work inspired target design |
| `MIRRORS` | Source and target are parallel/analogous constructs |
| `INTRODUCES` | Source is the introduction form for target type |
| `ELIMINATES` | Source is the elimination form for target type |
| `FORMS` | Source is the formation rule for target |
| `SUBSUMES` | Source type subsumes target type (subtyping) |
| `COERCES_TO` | Source implicitly converts to target |
| `DUAL_OF` | Source and target are categorical duals |
| `WRAPS` | Source wraps target in a container/marker |
| `DELEGATES_TO` | Source hands off work to target |
| `THREADS_THROUGH` | Source threaded through target as ambient context |
| `PROPAGATES_VIA` | Source error/effect propagates through target |
| `INSTANTIATES` | Source creates concrete instance of target |
| `RESOLVES` | Source resolves/solves target |
| `NORMALIZES_TO` | Source reduces/normalizes to target |
| `QUOTES_TO` | Inverse of normalizes — readback |
| `ZONKS` | Source applies substitution to resolve target |
| `TRANSLATES_TO` | Source representation translated to target |
| `ERASES` | Source compilation step erases target information |
| `PRESERVES` | Source transformation preserves target property |
| `TRAVERSES` | Source operation walks/folds over target |
| `REWRITES` | Source transforms target via rewrite rules |
| `REPORTS` | Source reports/renders target for humans |
| `DETECTS` | Source detects target condition |
| `RECOVERS_FROM` | Source handles/recovers from target failure |
| `SNAPSHOTS` | Source captures target state for testing |
| `VALIDATES` | Source validates correctness of target |
| `CONSUMES` | Source consumes target as input |
| `ANNOTATES` | Source pass adds metadata/enrichment to target node kind |
| `ENRICHES` | Source pass adds structural information to target IR |
| `PRECEDES` | Source work item comes before target in a thread's sequence |
| `SHARED_WITH` | Source thread shares target work item with another thread |
| `DEFERRED_FROM` | Source work item was deferred from target thread or queue |
| `EXPOSES` | Source makes target's internal state externally visible |
| `GATES` | Source flag/toggle controls whether target behavior is active |
| `FIXES` | Source corrects a defect in target |
| `DISCOVERED_BY` | Source issue was discovered via/during target |
| `DETAILS` | Source provides detailed rationale for target |
| `GROUNDED_IN` | Source design grounded in target theory/research |
| `DEFINES` | Source defines the contract/shape of target |
| `DOCUMENTS` | Source documents a decision or rationale from target |
| `REFERENCES` | Source references target as supporting material |

## Ref prefixes

Frontmatter `refs` use a `prefix:value` convention for cross-references to external artifacts.

| Prefix | Points to | Example |
|--------|-----------|---------|
| `session` | Chat session transcript UUID (any agent) | `session:67483184-49f4-449a-9acb-75b28561bace` |
| `adr` | Architecture Decision Record by ID | `adr:D-001` |

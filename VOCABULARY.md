# Vocabulary

Tag and label vocabulary for z-yap. Kept roughly in sync with z-loom's registered vocabulary.

## Tags

| Tag | Description |
|-----|-------------|
| `concept` | A design idea or conceptual object |
| `mechanism` | A concrete operational method or technique |
| `type-system` | Type system concept, mechanism, or property |
| `language` | Core language features, syntax, semantics |
| `principle` | A durable guiding constraint or heuristic |
| `decision` | A settled design choice with rationale |
| `project` | An organized body of work |
| `pattern` | A reusable approach or technique |
| `problem` | An identified difficulty or challenge |
| `elaboration` | Bidirectional inference, checking, type synthesis |
| `normalization` | NbE, evaluation, normal forms |
| `parser` | Parsing, grammar, CST/AST concerns |
| `mir` | Machine-Independent IR, lowering, compilation |
| `verification` | Liquid types, refinements, SMT, VC generation |
| `row-types` | Row polymorphism, row variables, row unification |
| `dependent` | Dependent types, Pi types, value-level type indices |
| `modality` | QTT multiplicities, linearity, resource tracking |
| `infrastructure` | Tooling, scripts, dev environment |
| `research` | Empirical findings, prior art exploration |
| `paper` | Academic paper reference |
| `gateway` | Entry point to an external resource |
| `code` | Source code or code-level implementation concerns |
| `syntax` | Surface syntax, grammar, parsing concerns |
| `unification` | Constraint solving, meta-variable resolution, row rewriting |
| `lowering` | IR translation, MIR, GRAM, compilation passes |
| `codegen` | Backend code generation (JS, C, Erlang) |
| `continuation` | Delimited continuations, shift/reset, CPS, answer types |
| `ffi` | Foreign function interface, external declarations, JS interop |
| `inference` | Type inference, generalization, implicit resolution |
| `runtime` | Operational semantics, evaluation, CBV |
| `tooling` | REPL, explorer, LSP, developer experience |
| `compiler` | Compiler architecture, pipeline, passes |
| `rewriting` | Term/graph rewriting, DPO, algebraic graph transformation |
| `testing` | Test infrastructure, patterns, snapshot testing |
| `migration` | V1 → V2 transitions, parser migration, monad migration |
| `performance` | Optimization, inlining, specialization, erasure |
| `backend` | Target-specific concerns (JS, C, Erlang, HVM, GPU) |
| `effect` | Effect systems, coeffects, algebraic effects |
| `recursion` | Mu types, equirecursion, coinduction, termination |
| `sugar` | Syntactic sugar, desugaring, surface ergonomics |
| `error-handling` | Error types, causes, propagation |
| `tracing` | Provenance, breadcrumbs, diagnostic context |
| `display` | Pretty printing, rendering, human-readable output |
| `monad` | Monadic abstractions, V2 Do notation |
| `ast` | Abstract syntax trees, term representations |
| `cli` | Command-line interface, REPL |
| `sat` | Boolean satisfiability, CDCL, CNF |
| `quantifiers` | Universal/existential quantification, instantiation |
| `arithmetic` | Numeric reasoning, simplex, linear arithmetic |
| `strings` | String theory, word equations, concat |
| `ir` | Intermediate representations |
| `milestone` | Project milestones, deliverables |
| `drift` | Specification/implementation drift |
| `implementation` | Concrete code realization of a design/concept |
| `ai-session` | A recorded AI pair-programming session |
| `ivl` | Intermediate Verification Language |
| `reference` | Reference material, external artifacts |
| `solver` | Constraint solver, batched solving, implicit resolution dispatch |
| `graph` | Graph-based intermediate representation and rewriting |
| `checking` | Bidirectional type checking mode |
| `constraint` | Constraint generation and accumulation |
| `metavariable` | Unification metavariables, holes, freshening |
| `multiplicity` | QTT multiplicities (0, 1, ω) |
| `evaluation` | Term evaluation, reduction, NbE evaluate phase |
| `generalization` | Let-polymorphism, meta generalization at block boundaries |
| `closure` | Closures in NbE semantic domain and lowering |
| `context` | Elaboration context structure and operations |
| `polymorphism` | Parametric and row polymorphism |
| `substitution` | Metavariable substitution maps and composition |
| `primitive` | Primitive operations, built-in signatures |
| `cps` | Continuation-passing style transformation |
| `specification` | Formal rules, language specification |
| `memory` | Memory management, allocation, GC, heap concerns |
| `allocation` | Heap allocation, stack allocation, placement strategy |
| `mutation` | In-place update, destructive modification, mutability |
| `ownership` | Value ownership, exclusive access, borrowing |
| `uniqueness` | Uniqueness typing, single-reference guarantee |
| `reuse` | Memory reuse, slot recycling, reset/reuse patterns |
| `refcounting` | Reference counting, drop/dup, RC optimization |
| `data-access` | Structural operations: read, update, CRUD on records/variants |
| `observability` | Runtime inspection of internal solver/engine state, step-by-step traces |
| `bugfix` | A concrete correctness fix for a discovered defect |
| `explorer` | Pipeline explorer web dashboard (`pnpm yap explore`) |
| `generator` | Generator functions (`function*`/`yield`) as control flow mechanism |

### Work Layer Tags

| Tag | Description |
|-----|-------------|
| `thread` | A named, ordered sequence of work items forming a parallel concern |
| `queue` | A flat pending-work list; items graduate to threads when scoped |
| `ready` | Work item is unblocked and can be started |
| `blocked` | Work item is waiting on a dependency |
| `needs-design` | Work item requires design exploration before implementation |

### Epistemic Status Tags

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

## Labels

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

## Tag Groups

| Group | Tags |
|-------|------|
| Core | `concept`, `mechanism`, `principle`, `pattern`, `decision`, `specification`, `implementation` |
| Type Theory | `type-system`, `row-types`, `dependent`, `modality`, `multiplicity`, `polymorphism` |
| Pipeline | `elaboration`, `normalization`, `parser`, `mir`, `verification`, `lowering`, `codegen`, `checking`, `evaluation` |
| Language | `syntax`, `continuation`, `ffi`, `inference`, `runtime`, `effect`, `recursion`, `sugar`, `cps` |
| Elaboration | `constraint`, `solver`, `metavariable`, `generalization`, `context`, `closure`, `substitution` |
| Compiler | `compiler`, `rewriting`, `backend`, `performance`, `ir`, `sat`, `graph`, `primitive`, `memory`, `allocation`, `mutation`, `ownership`, `uniqueness`, `reuse`, `refcounting`, `data-access` |
| Verification | `verification`, `quantifiers`, `arithmetic`, `strings`, `ivl`, `observability` |
| Infrastructure | `project`, `infrastructure`, `testing`, `tooling`, `cli`, `migration`, `explorer`, `generator` |
| Meta | `research`, `paper`, `gateway`, `reference`, `milestone`, `ai-session` |
| Representation | `ast`, `display`, `error-handling`, `tracing`, `monad` |
| Work Layer | `thread`, `queue`, `ready`, `blocked`, `needs-design` |
| Status | `implemented`, `in-progress`, `planned`, `speculative`, `deprecated`, `rejected`, `deferred`, `incomplete`, `drift`, `bugfix` |

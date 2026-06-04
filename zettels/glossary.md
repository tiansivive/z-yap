---
tags:
- reference
- project
- concept
- language
- infrastructure
- type-system
- compiler
- elaboration
- verification
- mir
- parser
- syntax
---
# Glossary

Cross-domain glossary for the Yap language and compiler. For SMT/solver-specific
terms see [[smt-solver-glossary]].

## Abbreviations

| Abbr | Expansion | Context |
|------|-----------|---------|
| **AST** | Abstract syntax tree | Generic; Yap uses `Src.Term`, `EB.Term`, `NF.Value` |
| **CPS** | Continuation-passing style | Shift/reset alternative; selective CPS rejected |
| **CST** | Concrete syntax tree | Tree-sitter parse output |
| **DPO** | Double-pushout graph rewriting | GRAM pass engine (`grs/`) |
| **EB** | Elaboration bridge | Core typed syntax namespace (`EB.Term`) |
| **GRAM** | Graph Rewriting Abstract Machine | Property-graph IR enriched by additive passes |
| **IVL** | Intermediate Verification Language | VC IR in `src/verification/solver/ivl/` (sorts, terms, formulas) |
| **MIR** | Machine-Independent IR | Block-SSA lowering target for codegen backends |
| **NbE** | Normalisation by evaluation | `NF.evaluate` + `NF.quote` spine |
| **NF** | Normal form | Semantic domain (`NF.Value`, `NF.Neutral`) |
| **QTT** | Quantitative Type Theory | Multiplicity bookkeeping (Zero/One/Many) |
| **RWSE** | Reader-writer-state-error | MIR lowering monad style |
| **Src** | Source | Located surface AST consumed by elaboration |
| **VC** | Verification condition | Formula emitted for SMT checking |
| **V2** | Version 2 | Current elaboration/solver monad (`monad.v2.ts`) |
| **WHNF** | Weak head normal form | Evaluation stopping point; not API-flagged in Yap |

## Type system

| Term | Definition |
|------|------------|
| **Bidirectional checking** | Two-mode elaboration: `infer` synthesises types from syntax, `check` pushes expected types inward |
| **Branded types** | Phantom TS wrappers preventing `EB.Term`/`NF.Value` interchange; per-term numeric `id` for maps |
| **Constraint (`assign`)** | Unification obligation `{ left; right; lvl }` solved by `U.unify` |
| **Constraint (`resolve`)** | Obligation to pick an implicit term for a meta from `ctx.implicits` |
| **Definitional equality** | Type equivalence via normalisation + unification on `NF.Value` |
| **Dependent types** | Types that may mention values; carried under `Abs` via `Pi`/`Sigma` binders |
| **Equirecursive types** | Recursive types without explicit fold/unfold; `Mu` is a first-class `Abs` binder |
| **Generalization** | After solving, abstract unsolved metas into implicit `Pi`s at `let` boundaries |
| **Hole (`_`)** | Surface placeholder allocating type and term metas; no hole node in `EB.Term` |
| **Icitness (`@`)** | Surface `@` before an atom: **explicit application of an implicit argument** (not a toggle or override of implicitness) |
| **Modalities** | `Modal { term; modalities }` pairing multiplicity and optional liquid predicate |
| **Mu type** | `Abs` with `Mu` binder for recursion; unification unfolds, occurs-check → mu not implemented |
| **Neutral** | Stuck/flex-headed spine in NF (meta-headed, stuck projection, stuck match) |
| **Pi (Π)** | Dependent function type: `(x : A) -> B x` |
| **Row** | `R.Row`: empty, extension(label, value, tail), or variable — universal compound-type substrate |
| **Row polymorphism** | Open records via tail metavariables + unification, not width subtyping |
| **Row rewriting** | Private label rotation during row unification (`rewrite` in `rows.ts`) |
| **Schema** | Type-level structural record classifier (`Schema` row) |
| **Sigma (Σ)** | Dependent pair over a row witness; fields may depend on earlier fields |
| **`stripModalities`** | Removes `NF.Modal` wrappers after inference; refinements tracked separately |
| **`Type : Type`** | Universe sentinel `Lit(Atom("Type"))` classifying domains/codomains |
| **Unification** | Core metavariable/type equality engine on `NF.Value` with rows and μ unfolding |
| **Zonker** | `ctx.zonker: Subst` storing meta → solved `NF.Value` mappings |

## IR and lowering

| Term | Definition |
|------|------------|
| **Additive enrichment** | GRAM principle: passes add nodes/edges, never delete |
| **Answer-type polymorphism** | Two answer metas per delimiter; `shift` flips bookkeeping for continuation codomain |
| **Block-SSA** | MIR structure: blocks with jumps, branches, returns, and memory ops |
| **Closure conversion** | Lambdas → MIR functions over `(env, arg)` tuples with captured vars |
| **Compilation by selection** | GRAM architecture: backends choose which enrichment views to consume |
| **Continuation binder (`$k`)** | `shift` binds a `Pi("$k", …)` with env stamp; `resume` appends payloads |
| **Dataflow semantics** | GRAM principle: partial order on nodes, not total order |
| **Decision tree** | Maranget-style clause matrix compilation for pattern matching |
| **Defunctionalization** | Replace indirect calls with tagged dispatch; contrast with Yap's indirect `App` lowering |
| **DPO rewriting** | Double-pushout graph rules in `grs/`; aggregate workflows need imperative code |
| **`EB.Term`** | Core elaboration IR: Lit, Var, Abs, App, Row, Proj, Inj, Match, Block, Modal, Reset, Shift |
| **`lowerToMir`** | Entry point translating `EB.Term` to `MIR.Module` |
| **Multishot replay** | Cartesian product of resume solutions at let boundaries for nondeterminism |
| **`Src.Term`** | Parser output: located surface AST consumed by elaboration |
| **StuckMatch** | Neutral encoding of incomplete match reductions in NbE |
| **Trampoline evaluator** | Explicit work/result heap in `evaluation.v2.ts` avoiding JS stack overflow |

## Surface language

| Term | Definition |
|------|------------|
| **Annotation (`e : T`)** | Surface `Ann`; elaboration checks expression against type, no node in `EB.Term` |
| **Block `{ …; return … }`** | Statement sequence + tail; `let` generalization per local binding |
| **Injection (`Inj`)** | `{ base \| label = value }` extends row-shaped types via `EB.Constructors.Inj` |
| **Lambda** | `\x -> e` (explicit) or `\x => e` (implicit) lowering to core `Lambda` Π introduction |
| **Match** | `match e \| pat -> body` inferred to `EB.Match`; lowered via clause compiler |
| **Projection (`Proj`)** | Field elimination on Schema/Sigma/flex metavariable scaffolding |
| **Struct** | Runtime record value; `Schema` is the type-level counterpart |
| **Tagged value (`:tag payload`)** | Introduces unary Struct typed as Variant row |
| **Tuple** | Struct with decimal string labels ("0", "1", …) sharing schema machinery |
| **Variant** | Sum type via row extension; eliminated by `Match` |

## Tooling

| Term | Definition |
|------|------------|
| **Nearley** | Shipping parser: `grammar.ne` → `grammar.ts` via `pnpm nearley` |
| **`ParserStart: "Ann"`** | Canonical test harness start symbol ensuring single-parse assertions |
| **Processors** | `processors.ts`: Nearley postprocess factory tying grammar rules to `Src` nodes |
| **Provenance** | `EB.Context.trace` stacking breadcrumbs attached to errors via `V2.track` |
| **Snapshot testing** | Reset EB/NF supplies before elaboration to get deterministic snapshots |
| **Tree-sitter** | Migration-target parser (external `tree-sitter-yap` repo) |
| **`WithLocation`** | Wrapper adding provenance spans to `Src` nodes |

<!-- connections:start -->

## Connections

**Outgoing**
- EXTENDS → [[smt-solver-glossary]] — Global glossary references domain-specific glossary

**Incoming**
- [[yap]] ← INCLUDES — Project-level reference

<!-- connections:end -->

---
tags:
  [
    verification,
    ir,
    implemented,
    sat,
    arithmetic,
    strings,
    quantifiers,
    row-types,
    dependent,
    backend,
    codegen,
    principle,
    milestone,
    project,
    ivl,
  ]
---
# VC IR

Yap historically stored verification conditions as **`z3-solver`** **`Expr`**; the **IVL** module (`src/verification/solver/ivl/`) is the owned VC IR (**Intermediate Verification Language**). **`VerificationArtefacts.vc`** is **`IVL.Formula`**; the in-tree CDCL(T) solver consumes IVL (`src/verification/solver/`). **`z3.adapter.ts`** translates IVL to Z3 where useful.

**Types (`ivl/types.ts`):** **`Sort`** — `Bool`, `Int`, `Real`, `String`, `Unit`, `Row`, **`Fn`** (arrow), **`Uninterpreted`**. **`RowTerm`** — empty, **`Extend`**, or tail **`Var`**. **`Term`** — `Var`, `Const`, numeric/string/boolean literals (`Num`, `Str`, `Bool`), `Arith`, `App`, `Select`, **`Row`**. **`Formula`** — `True`, `False`, `Atom`, `Not`, `And`, `Or`, `Implies`, `Forall`, `Exists` (optional **triggers** on `Forall`). (Targeted atoms like richer string primitives remain **milestones** — see [[milestone-3-strings]].)

**Builder (`build.ts`):** smart constructors (`Build.var_`, `Build.num`, `Build.forall`, …); **`Build.simplify`** toggles algebraic rewrites.

**Printer (`print.ts`):** S-expressions for tests and explorers.

**Pipeline:** **`translate.ts` → IVL**; **`normalize`**, **`skolem`**, **`cnf`**; **`solve`** ([[m1-implementation]], [[m2-implementation]]). String/row **theories** in the solver are still **mostly future work** alongside IR support ([[verification-pipeline]]).

<!-- connections:start -->

## Connections

**Outgoing**
- SUPERSEDES → [[smt-translation]] — Backend-neutral replaces Z3
- TRANSLATES_TO → [[verification-pipeline]] — NF.Value → formulas
- ENCODES → [[refinement-types]] — Predicates as VC.Formula
- ENCODES → [[modalities]] — Modal verification constraints
- ENCODES → [[verification-pipeline]] — All formula forms from current verification
- SUPERSEDES → [[verification-artefacts-revised]] — IVL replaces Z3 Expr-based artefacts

**Incoming**
- [[liquid-haskell-influence]] ← INSPIRES — Formula fragment
- [[vc-normalization]] ← NORMALIZES_TO — Simplifies formulas
- [[quantifier-preparation]] ← REWRITES — Prenex + skolemize + triggers
- [[boolean-lowering-cnf]] ← TRANSLATES_TO — Formula → clauses
- [[boolean-lowering-cnf]] ← PRESERVES — Theory atoms untouched
- [[translation-boundary-vc]] ← DELEGATES_TO — Produces VC types
- [[ivl-boundary]] ← DEFINES — IVL IR contract
- [[z3-replacement.adr]] ← MOTIVATES — Backend-neutral IR needed
- [[milestone-1-ir-boundary]] ← PRODUCES — First deliverable
- [[required-formula-forms]] ← CONSTRAINS — IR must express all forms
- [[verification-pipeline]] ← PRODUCES — VC.Formula via translation boundary
- [[vc-normalization]] ← TRAVERSES — Walk and simplify formulas
- [[boolean-lowering-cnf]] ← ENCODES — Origin metadata for provenance
- [[ivl-boundary]] ← ENCODES — IVL.Formula replaces Expr
- [[ivl-boundary]] ← INCLUDES — vc field is IVL.Formula
- [[verification-backend.thread]] ← INCLUDES
- [[m1-implementation]] ← IMPLEMENTS — IVL types/builder realize the VC IR concept
- [[m1-implementation]] ← INSTANTIATES — Concrete TypeScript module from abstract design
- [[solver-trace]] ← RESOLVES — Tseitin proxy variables resolved back to IVL subformulas
- [[solver-trace]] ← CONSUMES — Reads IVL formulas for display
- [[build-simplify-toggle]] ← GATES — Controls whether Build constructors simplify formulas
- [[pipeline-explorer]] ← USES — IVL tab displays s-expression formula
- [[pipeline-explorer]] ← REPORTS — Renders IVL formula in IVL tab
- [[shift-reset-verification-stub]] ← USES — Build.true_() for shift VC
- [[shift-reset-verification]] ← USES — IVL Bubble term constructor
- [[z3-replacement.adr]] ← MOTIVATES
- [[solver-testing]] ← USES
- [[first-order-restriction.adr]] ← PRESERVES — Keeps IVL formulas in decidable QF-EUFLIA fragment
- [[de-moura-bjorner-z3]] ← INFORMS — Z3 architectural template parallels IR + theory stack
- [[barbosa-cvc5]] ← INFORMS — Modern DPLL(T) survey parallels in-tree CDCL(T) shape

<!-- connections:end -->

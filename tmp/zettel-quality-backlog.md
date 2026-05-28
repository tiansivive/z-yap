# Zettel Quality Rework — Backlog

Generated 2026-05-28 from a full classification of 339 z-yap zettels.

## Completed clusters

### 1. Verification migration (8 zettels) — DONE
Rewrote: required-theory-support, vc-normalization, vc-provenance, verification-backend (hub), theory-plugin-interface, verification-artefacts-revised (stub).
Kept: m1-implementation, m2-implementation (milestone records, ADRs extracted).
Created: ivl-boundary, bidir-subtype-verification, z3-adapter-strategy, inline-theory-assert, dual-polarity-registration, complementary-atom-encoding.

### 2. Solver/constraint (5 zettels) — DONE
Rewrote: constraint-solving (concept), deferred-constraint-solving (decision), implicit-resolution-solver (concept, resolution via unification).
Renamed: solver → constraint-solver (hub).
Removed: solver-dispatch.
Created: eager-constraint-solving, assign-before-resolve, empty-subst-guard.

### 3. Modality/QTT (8 zettels including adjacents) — DONE
Rewrote: modalities (hub), idris-1-qtt-paper (clean reference).
Removed: modality-enforcement, qtt-usage-collection, modality-drift, usages-deferred.
Cleaned up: modality-polymorphism, effects-as-modality.
Created: modal-type-theory, modality-system, usage-semantics, verification-modal-phase.

### 4. GRAM passes (3 zettels) — DONE
Light rewrites: gram-crud-enrichment, gram-pattern-translation, gram-shift-reset-pass.
Stripped impl-map framing, promoted design rationale.

### 5. Row/structural (3 zettels) — DONE
Light rewrites: dedicated-row-constructors, row-theory, structural-typing.
Stripped impl-map framing, promoted design rationale.

### 6. Elaboration core / AST (~20 zettels) — DONE
Rewrote: eb-term (concept), nf-value (concept), src-term (concept), pi-types, sigma-types, sigma-bindings (mechanism), mu-types, mu-type-unification (mechanism), closures (hub), neutrals, application-evaluation (mechanism), lambda, blocks, match, annotations, application, holes (user feature + design potential), meta-variables, dependent-types (hub), type-type (decision).
Removed: nf-display (pure code walkthrough, redirected edges to pretty-printing).
Created: ast-pipeline (three-layer Src→EB→NF design), unified-binder (shared Abs decision), standard-closure, primop-closure, continuation-closure.
Stripped impl-map framing throughout. Promoted design rationale: unified binder, Type:Type decision, NbE closure taxonomy, neutral single-wrapper, bidirectional annotation hook, equirecursive unfold-and-recurse, sigma flat-map limitation. Preserved applicable domain-crossing tags.

---

## Remaining unclustered MIXED (20)

### Continuations / multishot (4)
- multishot-serialization.md — heap allocation for multishot, stack/single-shot shortcuts deferred
- nondeterminism-multishot.md — type k resume arms without committing (Cartesian replay)
- shift-reset-verification-stub.md — verification-transparent Reset, Shift → NF.Any
- danvy-filinski.md — direct-style lowering without whole-program CPS

### Type theory foundations (5)
- system-f.md — Fω background + verified Yap mapping
- hindley-milner.md — HM background vs Yap's bidirectional dependent elaboration
- equirecursive-types.md — unify-driven μ unfold vs neutral eval; fuel cap is engineering
- types-as-terms.md — one AST for types and terms; rationale at lowering erase boundary
- levels-vs-indices.md — indices for EB.Term, levels for NF.Value, NbE boundary via quote

### Verification solver internals (2)
- e-matching.md — trigger quality governs lemma churn; wired into CDCL(T) EUF arena
- higher-order-in-formulas.md — keep quantifier domains first-order; encode HO via Select

### Lowering / codegen (2)
- defunctionalization.md — tagged-data dispatch alternative to closure conversion
- type-erasure.md — MIR Leaf.erase() is boundary stripping, not full erasure phase

### GRAM / compilation (2)
- saturation.md — MIR Cont:sat/materialize vs GRAM saturate pass
- egglog-influence.md — GRAM saturate ≠ e-graph saturation; LoGRAM sketched

### Elaboration mechanics (3)
- functional-patterns.md — static patterns today; arbitrary eliminators in heads hit metas/effects
- selfification.md — path-sensitive v=x; first-order guard; Modal conjoin after NF.force
- records-indexed-separation.md — pedagogical/tooling confusion in record syntax

### Resource management (1)
- perceus-reuse-analysis.md — compile-time QTT vs Perceus runtime refcount

### Solver specifics (1)
- arithmetic-theory.md — why Z3→IVL→in-house simplex/BnB; dual polarity; NbE fold not a theory

---

## IMPL-MAP (101) — grouped by domain

### Unification / row (~10)
unification-algorithm.md, flex-flex-unification.md, flex-rigid-unification.md,
occurs-check.md, substitution-system.md, row-unification.md,
row-unification-mechanism.md, row-rewriting.md, row-data-structure.md, label-lookup.md

### Inference / context (~10)
bidirectional-checking.md, generalization.md, implicits.md, implicit-resolution.md,
implicit-environment.md, constraint-types.md, nondeterminism.md, zonking.md,
elaboration-context.md, elaboration-monad.md, generator-monad.md, context-operations.md

### Normalization / evaluation (~7)
cbv-evaluation.md, quoting.md, whnf-vs-full-normalization.md,
variable-evaluation-dispatch.md, trampoline-evaluator.md, knot-tying.md,
evaluation-step-limit.md

### Verification solver (~12)
cdcl-t-solver.md, boolean-lowering-cnf.md, tseitin-cnf.md, congruence-closure.md,
quantifier-engine.md, quantifier-preparation.md, smt-translation.md, vc-ir.md,
required-formula-forms.md, solver-module-layout.md, solver-testing.md, solver-trace.md

### Lowering / codegen (~10)
closure-conversion.md, continuation-binders.md, shift-reset-mir-lowering.md,
js-codegen.md, c-codegen.md, erlang-codegen.md, compile-orchestration.md,
passes-in-yap.md, typed-pass-composition.md, mir-retrospective.md

### Types / records / variants (~12)
structural-records.md, variant-types.md, tuples.md, lists.md, dictionaries.md,
tagged-values.md, injection.md, projection.md, refinement-types.md,
typeclass-emulation.md, typing-rules.md

### De Bruijn (3)
de-bruijn-indices.md, de-bruijn-levels.md, level-to-index-conversion.md

### Parser (3)
nearley-parser.md, parser-processors.md, tree-sitter-parser.md

### Tooling / testing / display (~12)
pipeline-explorer.md, yap-explore.md, repl.md, pretty-printing.md,
snapshot-testing.md, test-utility.md, test-coverage-gaps.md, ci-pipeline.md,
provenance-system.md, provenance-display.md, explorer-snippet-library.md

### GRAM (2)
gram-pattern-pass.md, gram-step-1.md

### Infrastructure / misc (~12)
ffi.md, ffi-saturation.md, error-causes.md, error-propagation.md,
primitive-signature.md, module-system.md, where-clauses.md, block-level-using-gap.md,
missing-spec-let-polymorphism.md, missing-spec-recursive-types.md,
missing-spec-shift-reset.md, missing-spec-sigma-types.md

### Pipelines / transformation (~6)
v1-elaboration-pipeline.md, v2-elaboration-pipeline.md, v2-track.md,
src-to-eb-transformation.md, mutual-recursion.md, tmp-pipeline-stub.md

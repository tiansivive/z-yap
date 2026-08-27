---
tags:
- type-system
- elaboration
- normalization
- unification
- inference
- mechanism
- concept
- dependent
- monad
- compiler
- code
- polymorphism
- metavariable
- reference
- implemented
status: implemented
---
# Generalization (let bindings)

Implementation: `src/elaboration/normalization/generalization.ts` `generalize`.

Input: `NF.Value` type, `EB.Term` definition, `EB.Context`, `EB.Resolutions`, skolem map from `V2.MutState`.

Collect unsolved metas via `collectMetasNF(ty, zonker)` and `collectMetasEB(tm, zonker)`, uniq by `val`, drop entries present in `resolutions` or `skolems`. Collection follows the zonker through solved row tails, accumulating the field metas that precede a solved tail rather than discarding them.

Kinds too: a collected meta’s annotation (its kind) may itself contain metas — an unconstrained binder whose kind is unknown. Generalization pulls these in transitively, ordering each kind-meta before the meta it kinds, so the result is the principal type `Π(k: Type) => Π(v: k) => …` rather than a leaked kind meta or an `Any` default ([[instantiate-any-default]]).

Scoping: keep only metas with `m.lvl >= ctx.env.length` (created at or inside the binding’s elaboration depth). Metas with smaller `lvl` stay open for outer solves.

Build `extendedCtx` by `EB.bind` for each meta with implicit origin `"inserted"` and map `zonker[meta.val]` to `NF.Var(Bound lvl)` so quoting sees binders.

At a block return boundary, abstraction applies to the semantic return value as well as its type. Evaluating without delta-reducing local references preserves them as levels; after the new implicit binders are installed, quoting converts those levels into the indices appropriate beneath the synthetic lambdas. A stable-level zonker mapping is portable across consumer contexts because quote reindexes it; every elaboration boundary must nevertheless thread that mapping forward.

Wrap the generalized type in implicit `NF.Pi`s outer-to-inner (`A.reverse(ms).reduce`), quoting bodies with trimmed env slices so closure levels align.

Interaction: `Stmt.letdec` in `src/elaboration/inference/statements.ts` calls `NF.generalize` after `EB.solve`; `wrapLambda` / `EB.Icit.instantiate` in `src/elaboration/implicits.ts` align term shapes with generalized types.

Hub: [[meta-variables.md]], [[implicits.md]].

<!-- connections:start -->

## Connections

**Outgoing**
- USES → [[meta-variables]] — Generalizes unsolved metas into implicit Pis
- IMPLEMENTS → [[hindley-milner]] — Yap's implementation of HM let-generalization
- PRODUCES → [[implicits]] — Generalization wraps terms in implicit lambdas
- MOTIVATES → [[instantiate-any-default]] — Transitive kind gen removes one Any source; the residual default is the open question
- USES → [[nbe]] — Semantic block-return abstraction preserves block-local binding indices

**Incoming**
- [[blocks]] ← USES — Let-polymorphism at boundaries
- [[deferred-constraint-solving]] ← ENABLES — Metas generalized before solving
- [[ghc-influence]] ← INSPIRES — Let-polymorphism
- [[missing-spec-let-polymorphism]] ← IMPLEMENTS — No spec formalization
- [[implicit-resolution-solver]] ← PRESERVES — Rejects subst-producing candidates
- [[knot-tying]] ← ENABLES — Recursive let evaluation
- [[hindley-milner]] ← INFORMS — Let-polymorphism theory
- [[implicit-resolution]] ← PRESERVES — Rejects subst-producing candidates
- [[implicit-resolution]] ← COMPOSES_WITH — Deferred resolution preserves generality
- [[blocks]] ← RELIES_ON — Let-dec runs NF.generalize/instantiate
- [[letpoly-implicit-escape]] ← APPLIES_TO — Meta escape at block boundary
- [[variant-match-generalization.session]] ← INFORMS — Transitive kind collection
- [[meta-collection-zonker]] ← APPLIES_TO — The collector feeds generalization
- [[default-context-substitution-aliasing.bug]] ← AFFECTS — A borrowed solution makes generalization skip the meta and return its input
- [[generalization-substitution-timing.bug]] ← APPLIES_TO — Where the substitution is recorded
- [[row-solution-dereference]] ← APPLIES_TO — Per-use instantiation of a telescope binder depends on the reference being followed

<!-- connections:end -->

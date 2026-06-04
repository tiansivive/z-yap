---
tags:
- elaboration
- inference
- type-system
- normalization
- checking
- syntax
- parser
- codegen
- compiler
- dependent
- ast
- mechanism
- pattern
- language
- migration
status: implemented
---
# Implicit arguments

Surface syntax: implicit binders use fat-arrow `=>` / `\ … => …`; applications supply implicit arguments with `@` before the atom (`grammar.ne` / `grammar.ts`: `App … @ Atom` → `icit: "Implicit"`).

Checking implicit lambdas: `src/elaboration/check.ts` matches expected implicit `Pi` and binds `ty.binder.variable` with origin `"inserted"` while checking the inner term.

Synthesis inserts metas: `src/elaboration/implicits.ts` `insert` — for synthesised term typed by implicit `Pi`, introduces meta argument, emits `resolve` constraint carrying `ctx.implicits`. Used from inference (`inference/applications.ts`, `inference/lambda.ts`) and checking paths that call `EB.Icit.insert.gen`.

Explicit lambdas pair with matching `icit` on source lambda vs expected `Pi` (`check.ts` first `lambda`/`Pi` clause).

Module-level instance wiring: `module.ts` `using`.

Let-generalization interaction: unsolved locals become implicit binders via `NF.generalize` + `EB.Icit.wrapLambda` (`generalization.ts`, `implicits.ts`).

Note: the solver selects the first successful implicit candidate with empty residual substitution (`solver.ts`).

Hub: [[implicit-resolution.md]], [[implicit-environment.md]], [[meta-variables.md]], [[generalization.md]].

<!-- connections:start -->

## Connections

**Outgoing**
- USES → [[meta-variables]] — Inserts metas at call sites for implicit params
- RELIES_ON → [[unification]] — Unification-driven resolution solves implicit metas

**Incoming**
- [[generalization]] ← PRODUCES — Generalization wraps terms in implicit lambdas
- [[implicit-resolution]] ← EXTENDS — Resolver mechanism
- [[superclasses]] ← USES — Implicit threading of superclass deps
- [[dictionary-passing]] ← RELIES_ON — Implicit Pi binders carry dictionaries
- [[implicits-as-coeffects-exploration]] ← CONTRASTS_WITH — Ad-hoc vs principled implicit tracking
- [[customizable-data-types]] ← USES — Strategy threading via implicits
- [[indexing-strategies]] ← USES — Strategies as implicit parameters
- [[wraplambda-fix]] ← FIXES — Rigid(0) + unextended ctx
- [[implicit-generalization-semantics]] ← INFORMS — Unconstrained implicits generalize

<!-- connections:end -->

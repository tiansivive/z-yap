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

Note: solver picks first successful implicit candidate with empty residual substitution (`solver.ts`); no dedicated ambiguity diagnostic in that loop.

Hub: [[implicit-resolution.md]], [[implicit-environment.md]], [[meta-variables.md]], [[generalization.md]].

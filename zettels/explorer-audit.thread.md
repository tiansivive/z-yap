---
tags:
  - thread
  - active
  - explorer
  - bugfix
  - testing
  - tooling
  - compiler
  - elaboration
  - lowering
  - graph
  - mir
  - codegen
  - normalization
  - verification
---

# Explorer Audit

Systematic audit of all 19 explorer snippets through the full compiler pipeline
(parsing → elaboration → type → NF → IVL → solver trace → GRAM → MIR → codegen).
Surfaced crashes, undeclared MIR variables, incorrect types, and semantic codegen
errors across elaboration, GRAM translation, bridge emission, and pattern compilation.

_Shared with: gram-evolution (bridge fixes), elaboration-v2 (monad/zonker fixes),
pattern-matching (struct dispatch), explorer-evolution (snippet syntax)_

## Sequence

1. **Stuck quoting fix** [[stuck-quoting-fix]] — implemented
   Infinite recursion in `NF.quote` for stuck projections/injections with `deBruijn: "both"`.

2. **Snippet syntax fixes** [[explorer-snippet-syntax-fixes]] — implemented
   Four snippets had incorrect surface syntax (tuple, let binding, variant match, nested struct match).

3. **Bridge type-level erasure** [[bridge-type-erasure]] — implemented
   `PI`, `SIGMA`, `VAR_META` nodes missing from bridge dispatch.

4. **Bridge label resolution** [[bridge-label-resolution]] — implemented
   `VAR_LABEL` (`:x` self-references) missing from bridge dispatch.

5. **Pattern row binder fix** [[pattern-row-binder-fix]] — implemented
   `walkPatternRow` didn't push binder for row variable tails.

6. **wrapLambda fix** [[wraplambda-fix]] — implemented
   `Rigid(0)` + unextended ctx in nested implicit Pi wrappers.

7. **Implicit generalization semantics** [[implicit-generalization-semantics]] — decision
   Unconstrained implicits generalize rather than defaulting to `Type`.

8. **Module zonker propagation** [[module-zonker-fix]] — implemented
   Told zonker from `letdec` dropped by `module.ts` `listen()` destructuring.

9. **Bridge closure capture** [[bridge-closure-capture]] — needs-design
   Curried closures return bare `FuncRef` without bundling captures.

10. **Bridge struct dispatch** [[bridge-struct-dispatch]] — needs-design
    Struct match emits empty-string branch test; multi-alt struct patterns need field projection.

11. ~~**Vacuous IVL verification conditions** [[vacuous-ivl-vcs]]~~ — `[~]` dropped
    Expected behavior from selfification on unrefinable terms. Promoted to backlog/improvement.

12. ~~**NF closure display** [[nf-closure-display]]~~ — `[~]` dropped
    Intentional NbE representation. Promoted to backlog/improvement (config toggle).

13. **Verification unconstrained meta** [[verification-unconstrained-meta]] — open
    Variant match snippet: crashes at generalize (`ctx.metas[?15]` undefined), and unsolved metas (`?3`, `?6`, `?8`, `?9`) remain outside zonker. Not resolved by module zonker fix — deeper meta propagation issue in variant row elaboration.

14. **Verification rigid mismatch** [[verification-rigid-mismatch]] — implemented
    Let binding snippet: resolved by module zonker fix. Full pipeline completes, type is `Num`, verification sat.

15. **Test rename** [[explorer-audit-test-rename]] — planned
    Rename `implicit-app-eval.test.ts` to reflect actual coverage (wrapLambda / nested implicit binders).

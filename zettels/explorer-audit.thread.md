---
tags:
  - thread
  - archived
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

9. ~~**Bridge closure capture** [[bridge-closure-capture]] — **implemented**~~
   Curried returns emit the shared bundle ABI (`{ __fn, __env }`) at return sites.

10. **Bridge struct dispatch** [[bridge-struct-dispatch]] — needs-design
    Struct match emits empty-string branch test; multi-alt struct patterns need field projection.
    _Tracked on [[pipeline-stabilization.thread]] #11._

11. ~~**Vacuous IVL verification conditions** [[vacuous-ivl-vcs]]~~ — `[~]` dropped
    Expected behavior from selfification on unrefinable terms. Promoted to backlog/improvement.

12. ~~**NF closure display** [[nf-closure-display]]~~ — `[~]` dropped
    Intentional NbE representation. Promoted to backlog/improvement (config toggle).

13. **Solver meta propagation fix** [[verification-unconstrained-meta]] — implemented
    Variant match snippet: metas created during row rewrite in solver were orphaned. Fixed by adding `V2.listen()` after solve to capture solver-created metas.

14. **Verification rigid mismatch** [[verification-rigid-mismatch]] — implemented
    Let binding snippet: resolved by module zonker fix. Full pipeline completes, type is `Num`, verification sat.

15. ~~**Test rename** — deferred~~
    Rename `implicit-app-eval.test.ts` to reflect actual coverage. Low priority; deferred.

<!-- connections:start -->

## Connections

**Outgoing**
- INCLUDES → [[stuck-quoting-fix]] — Thread member
- INCLUDES → [[explorer-snippet-syntax-fixes]] — Thread member
- INCLUDES → [[bridge-type-erasure]] — Thread member
- INCLUDES → [[bridge-label-resolution]] — Thread member
- INCLUDES → [[pattern-row-binder-fix]] — Thread member
- INCLUDES → [[wraplambda-fix]] — Thread member
- DOCUMENTS → [[implicit-generalization-semantics]] — Decision from audit
- INCLUDES → [[module-zonker-fix]] — Thread member
- INCLUDES → [[bridge-closure-capture]] — Thread member
- INCLUDES → [[bridge-struct-dispatch]] — Thread member
- INCLUDES → [[verification-unconstrained-meta]] — Thread member
- INCLUDES → [[verification-rigid-mismatch]] — Thread member
- SHARED_WITH → [[gram-evolution.thread]] — Bridge fixes
- SHARED_WITH → [[elaboration-v2.thread]] — Monad/zonker fixes
- SHARED_WITH → [[pattern-matching.thread]] — Struct dispatch, row binders
- SHARED_WITH → [[explorer-evolution.thread]] — Snippet fixes, pipeline

<!-- connections:end -->

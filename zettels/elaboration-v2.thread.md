---
tags:
- thread
- elaboration
- monad
- inference
- checking
- migration
- context
- constraint
---
# Elaboration V2

The V2 elaboration pipeline: monad (reader + collector + MutState), bidirectional
dispatch, and context. Inference and checking live under `src/elaboration/inference/`
and `check.ts` with `monad.v2.ts`; V1 is deprecated but kept for reference.

## Sequence

1. **Elaboration hub** [[elaboration]] — implemented
   Src -> EB.Term + NF.Value, module driver, infer via elaborate.ts, check via
   check.ts. Src -> EB is not a separate pass; lives inside infer/check handlers.

2. **V2 pipeline** [[v2-elaboration-pipeline]] — implemented
   V2 monad + dispatch. Running code uses inference/ + check.ts + monad.v2.ts.

3. **V1 pipeline** [[v1-elaboration-pipeline]] — deprecated
   Kept for reference. fp-ts based.

4. **Elaboration monad** [[elaboration-monad]] — implemented
   Reader + collector + MutState, V2.Do, tell/listen.

5. **Elaboration context** [[elaboration-context]] — implemented
   env, implicits, sigma, zonker, metas, imports, ffi, trace.

6. **EB term** [[eb-term]] — implemented
   Core term representation post-elaboration.

7. **Src term** [[src-term]] — implemented
   Parser output term representation.

8. **Src -> EB transformation** [[src-to-eb-transformation]] — implemented
   Not a separate pass; embedded in infer/check.

9. **Generator monad** [[generator-monad]] — implemented
   V2.Do generator mechanism.

10. **Monad split** [[monad-split]] — speculative
    Splitting reader/writer/mutable state if provenance, solver wiring, or
    inference need to evolve separately.

11. **Let-polymorphism spec** [[missing-spec-let-polymorphism]] — needs-design
    Written calculus for let-poly + zonker + nondeterminism replay.
    _Shared with: recursion thread (mu recovery at let boundaries)_

12. **Sigma types spec** [[missing-spec-sigma-types]] — needs-design
    Nested-sigma / ctx.sigma stacking TODO in inference/rows.ts.

<!-- connections:start -->

## Connections

**Outgoing**
- INCLUDES → [[elaboration]]
- INCLUDES → [[v2-elaboration-pipeline]]
- INCLUDES → [[v1-elaboration-pipeline]]
- INCLUDES → [[elaboration-monad]]
- INCLUDES → [[elaboration-context]]
- INCLUDES → [[eb-term]]
- INCLUDES → [[src-term]]
- INCLUDES → [[src-to-eb-transformation]]
- INCLUDES → [[generator-monad]]
- INCLUDES → [[monad-split]]
- INCLUDES → [[missing-spec-let-polymorphism]]
- INCLUDES → [[missing-spec-sigma-types]]
- USES → [[constraint-solver]]
- RELIES_ON → [[constraint-solving]]
- RELIES_ON → [[deferred-constraint-solving]]
- CONTRASTS_WITH → [[eager-constraint-solving]]
- RELIES_ON → [[assign-before-resolve]]
- RELIES_ON → [[empty-subst-guard]]
- USES → [[implicit-resolution-solver]]
- SHARED_WITH → [[recursion.thread]] — missing-spec-let-polymorphism (mu recovery at let boundaries)
- INCLUDES → [[solver-meta-threading]] — Interim solver meta-visibility patch
- INCLUDES → [[instantiate-any-default]] — Open generalization/defaulting design gap
- INCLUDES → [[meta-collection-zonker]] — Generalization collector zonker-consistency

**Incoming**
- [[thread-queue-system.thread]] ← INFORMS — System design
- [[explorer-audit.thread]] ← SHARED_WITH — Monad/zonker fixes
- [[testing-audit-2026-06-20]] ← INFORMS — Elaboration assertion cleanup is first priority
- [[repo-docs-retirement-audit-2026-06-20]] ← INFORMS — Elaboration docs retire into active pipeline records
- [[dependent-match-implication-constraints]] ← INFORMS — Implication constraints affect unification/elaboration
- [[elaboration-zoo]] ← INFORMS — Implementation references for dependent elaboration

<!-- connections:end -->

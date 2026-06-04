---
tags:
- type-system
- elaboration
- inference
- unification
- concept
- mechanism
- principle
- row-types
- implemented
- migration
- reference
---
# Row Polymorphism

In Yap, “more fields in a record type” shows up as **quantification over row tails** and **solving row metavariables**, not as implicit width subtyping ([[structural-subtyping.md]]). Illustration elsewhere (e.g. PureScript records) keeps the right intuition: the tail is a type parameter instantiability, not a coercion.

Concrete hook: `commonStructInference` in `src/elaboration/inference/structs.ts`—when the parser row tail is metavariable-shaped (`NF.Patterns.Flex`), elaboration emits `assign` from that meta to a fresh `Schema` over a fresh `Row` meta, builds `Struct` over `Extension` spines ending in `Variable(tailVar)`, and generalization can quantify the tail. That matches “accept any record that has at least these fields” **parametrically**.

Row **equality** for spines lives in `src/elaboration/unification/rows.ts` (`unify` called from `src/elaboration/unification/unification.ts` for `NF` rows); filename comment references Daan Leijen’s scoped-labels extensible records—implementation is the project’s row unifier, not a separate subtyping solver.

Contrast: homogeneous lists/maps use `Indexed` + `Array` (`src/elaboration/inference/lists.ts`, `dictionaries.ts`), outside pure `Schema` tail polymorphism.

Related: [[row-unification.md]], [[row-data-structure.md]], [[open-closed-variants]], [[data-declarations]], [[codata]].

<!-- connections:start -->

## Connections

**Outgoing**
- EXTENDS → [[hindley-milner]] — Parametric extension via row variables
- DISTINGUISHES → [[structural-subtyping]] — Not subtyping: parametric, not coercive
- DELEGATES_TO → [[row-rewriting]] — Label lookup mechanism
- INSTANTIATES → [[meta-variables]] — Fresh row variables (open tails)
- SUBSUMES → [[structural-records]] — Rows generalize fixed-field records
- SUBSUMES → [[variant-types]] — Rows generalize fixed-tag unions

**Incoming**
- [[yap]] ← USES — Structural flexibility via row variables
- [[unification]] ← EXTENDS — Row rewriting extends Robinson unification for row types
- [[sigma-types]] ← USES — Row-backed dependent records
- [[variant-types]] ← USES — Row-backed unions
- [[structural-records]] ← USES — Open-tail row structure
- [[rows-universal-substrate]] ← MOTIVATES — All data is row-based
- [[structural-row-based-types]] ← MOTIVATES — All composite = rows
- [[elm-ocaml-influence]] ← INSPIRES — Row types approach
- [[row-data-structure]] ← ENABLES — Shared data type
- [[structural-typing]] ← ENABLES — Structure-based identity
- [[structural-subtyping]] ← CONTRASTS_WITH — Subtyping vs parametric
- [[row-unification-mechanism]] ← IMPLEMENTS — Type-level row unification
- [[row-theory]] ← IMPLEMENTS — Width subtyping, containment
- [[dependent-types]] ← COMPOSES_WITH — Dependent rows
- [[tagged-values]] ← ENCODES — Open row tail on TYPE, closed on term
- [[row-types.thread]] ← INCLUDES
- [[codata]] ← COMPOSES_WITH — Codata observations as extensible rows
- [[data-declarations]] ← USES — Structural identity via rows
- [[nominal-identity]] ← CONTRASTS_WITH — Nominal fights structural extensibility
- [[open-closed-variants]] ← RELIES_ON — Row variables determine openness
- [[module-system-exploration]] ← USES — Interface polymorphism via rows

<!-- connections:end -->

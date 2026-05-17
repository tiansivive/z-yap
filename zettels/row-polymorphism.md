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

Related: [[row-unification.md]], [[row-data-structure.md]].

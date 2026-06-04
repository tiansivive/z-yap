---
tags:
  [
    research,
    reference,
    dependent,
    type-system,
    elaboration,
    normalization,
    ffi,
    compiler,
    paper,
    migration,
    in-progress,
  ]
---
# Agda (Influence)

Docs: [agda.readthedocs.io](https://agda.readthedocs.io/). Sources: [agda/agda](https://github.com/agda/agda).

Dependently typed language / proof assistant in the Martin-Löf lineage (inductive families, interaction holes, implicit arguments). That ecosystem’s norms—small core, elaboration with metavariables, definitional equality via normalization—are the *background* against which Yap’s elaboration is built, but the NbE/evaluator in Yap is an implementation detail (stack-based reduction in `src/elaboration/normalization/evaluation.v2.ts`) and is **not** tied to Agda-specific algorithms in comments or citations.

**Engineering parallel:** Like Idris 2 and Lean 4, Agda keeps foreign-call signatures first-order with statically fixed arity—a constraint Yap's FFI story can mirror without sharing Agda's implementation.

Related: [[coinductivity]], [[codata]], [[inductive-types]], [[indexed-families]], [[with-abstraction]], [[sized-types]], [[dependent-pattern-matching]].

<!-- connections:start -->

## Connections

**Outgoing**
- INSPIRES → [[meta-variables]] — Pattern unification
- INSPIRES → [[dependent-types]] — Dependent types
- INSPIRES → [[nbe]] — Evaluation-based normalization
- INSPIRES → [[implicit-resolution]] — Instance resolution
- INFORMS → [[compiled-nbe]] — Agda --compile-nbe as design-space precedent

**Incoming**
- [[with-abstraction]] ← INFORMS — Agda's primary DPM mechanism
- [[coinductivity]] ← INFORMS — Agda's coinductive types
- [[codata]] ← INFORMS — Agda's codata and copatterns
- [[inductive-types]] ← INFORMS — Agda's core type former
- [[indexed-families]] ← INFORMS — Agda's indexed data
- [[dependent-pattern-matching]] ← INFORMS — Agda's DPM
- [[with-abstraction]] ← INFORMS — Agda's with mechanism
- [[sized-types]] ← INFORMS — Agda's sized types
- [[syntactic-guardedness]] ← INFORMS — Agda's guardedness checker

<!-- connections:end -->

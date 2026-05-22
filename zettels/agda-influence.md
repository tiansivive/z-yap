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

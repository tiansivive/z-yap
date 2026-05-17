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

**Verified overlap in-repo:** `docs/MIR-LOWERING.md` (FFI section) groups **Agda** with Idris 2 and Lean 4 as compilers that keep foreign-call signatures first-order with statically fixed arity—an engineering constraint statement, not shared code.

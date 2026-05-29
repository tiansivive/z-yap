---
tags:
  - thread
  - stabilization
  - active
  - compiler
  - testing
  - elaboration
  - normalization
  - lowering
  - codegen
  - graph
---

# Pipeline Stabilization

Post-GRAM/explorer stabilization: the integration pipeline test (`language-tour.test.ts`) now
gives end-to-end visibility across all passes (elaboration → normalization → GRAM → MIR → codegen).
This thread tracks the bugs, limitations, and gaps surfaced by auditing its snapshots.

_Motivated by: introducing the explorer and GRAM bridge revealed issues that were previously
invisible when each pass was tested in isolation._

## Sequence

1. **$eq normalization** [[eq-normalization-bug]] — bug, planned
   PrimOps `$eq` compute returns wrong result on equal literals. `5 == 5` → `false`.

2. **Let-poly implicit escape** [[letpoly-implicit-escape]] — bug, planned
   Generalization leaks block-internal metas. `let x: Num = { ... }` gets `Π(a: Type) => Num`.

3. **mapList Schema unification** [[maplist-schema-unification]] — bug, needs-design
   Recursive `mapList` fails on cons cell schema rows with same labels in different order.
   Row unification is well-tested; issue likely upstream.

4. **length recursive de Bruijn** [[length-recursive-debruijn]] — bug, planned
   Recursive call resolves as invalid de Bruijn index inside match alternative.
   Context extension for recursive binders in match branches.

5. **fst closure annotation** [[fst-closure-annotation]] — bug, planned
   Inferred polymorphic function annotations swap type parameters.
   Possibly display-only; causes downstream verification errors.

6. **Sigma quoting: match over fields** [[sigma-quoting-match]] — limitation, incomplete
   Sigma closure applied to row annotation can't evaluate field-dependent matches.

7. **Sigma quoting: field ref substitution** [[sigma-quoting-field-ref]] — limitation, incomplete
   `:fst` in sigma body resolves to field type instead of field value during readback.

8. **Bridge: free var → unknown** [[bridge-free-var-unknown]] — bug, planned
   Bridge emits `unknown` for `var:free` references instead of the variable name.

9. **Bridge: label resolution in closures** [[bridge-label-closure-gap]] — bug, planned
   `:field` self-refs inside match bodies within struct fields produce undefined MIR vars.
   Edge case of [[bridge-label-resolution]].

10. **Type-only let erasure** [[type-erasure]] — backlog
    Top-level type defs produce `return v0` undefined. Partial erasure doesn't cover
    root-level type definitions. Already tracked; connected here for completeness.

11. **Bridge struct dispatch** [[bridge-struct-dispatch]] — backlog
    Already tracked. List/struct pattern dispatch in the bridge.

12. **Bridge closure capture** [[bridge-closure-capture]] — backlog
    Already tracked. Curried returns with outer captures.

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

1. ~~**$eq normalization** [[eq-normalization-bug]] — bug, **implemented**~~
   `lodash.isEqual` compared full `NF.Value` (including unique `id`). Fixed: compare `.value` payloads only.

2. ~~**Let-poly implicit escape** [[letpoly-implicit-escape]] — bug, implemented~~
   Resolved by composition of [[module-zonker-fix]] (zonker propagation) and [[fst-closure-annotation]] (Ann EB.Term fix).

3. ~~**mapList Schema unification** [[maplist-schema-unification]] — bug, **implemented**~~
   Match-check quoted return type at pre-pattern-binder level; indices misaligned after binder extension. Fixed: quote inside branch at extended level.

4. ~~**length recursive de Bruijn** [[length-recursive-debruijn]] — bug, **implemented**~~
   Two causes: variant pattern rest row not pushed as GRAM binder, and module-level let-dec missing from binder stack. Fixed both in `translate.ts` and `walkPattern`.

5. ~~**fst closure annotation** [[fst-closure-annotation]] — bug, implemented~~
   Ann nodes now carry `EB.Term` (quoted Pi) instead of `NF.Value`. Consumers evaluate in their current context, fixing stale closure resolution.

6. ~~**Sigma quoting: match over fields** [[sigma-quoting-match]] — bugfix, **implemented**~~
   Fixed: symbolic row application produces StuckMatch neutrals instead of crashing.

7. ~~**Sigma quoting: field ref substitution** [[sigma-quoting-field-ref]] — bugfix, **implemented**~~
   Fixed: symbolic row application preserves label references through readback.

8. ~~**Bridge: free var → unknown** [[bridge-free-var-unknown]] — bug, **implemented**~~
   `Leaves.free` followed non-existent `:refers_to` edge instead of reading `payload.name`.

9. ~~**Bridge: label resolution in closures** [[bridge-label-closure-gap]] — bug, **implemented**~~
   Resolved (PR #9): labels resolve to `:refers_to` edges via [[gram-label-resolution-pass]]; a
   record-capturing closure reads its field off the captured [[gram-struct-node]] record, tied by the
   [[recursive-struct-binding]] knot, with cycles classified by [[label-cycle-guardedness]]. Source-level
   recursion stays blocked upstream by the occurs-check / mu-type gap.
   - 9a. ~~**Forward label references** [[bridge-forward-label-refs]] — bug, **implemented**~~
     Edge-based resolution plus the demand-driven bridge walk remove the forward/backward asymmetry.

10. **Type-only let erasure** [[type-erasure]] — backlog
    Top-level type defs produce `return v0` undefined. Partial erasure doesn't cover
    root-level type definitions. Already tracked; connected here for completeness.

11. ~~**Bridge struct dispatch** [[bridge-struct-dispatch]] — backlog, **implemented**~~
    Fixed by resolving each `SWITCH` through its `:inspect` edge and letting `kind:"struct"` emit the projected branch subtree. Variant dispatch was aligned to the same pass by using `{ __tag, payload }` values end-to-end.

12. ~~**Bridge closure capture** [[bridge-closure-capture]] — bug, **implemented**~~
    Curried returns bundle inner lifted functions with captured environments per the shared `{ __fn, __env }` ABI.

13. ~~**Bridge unsaturated external** [[bridge-unsaturated-external]] — bug, **implemented**~~
    `external()` in `bridge/primops.ts` emits `Call(direct)` for all externals without
    checking `saturated` payload. Fixed: `[[gram-pap-pass]]` transforms unsaturated externals into
    `PAP` nodes before they reach the bridge; bridge emits closure wrapper chains.

14. **String dispatch float/record defect** [[string-dispatch-float-record-bug]] — bug, deferred
    Literal/general dispatch via stringification misrepresents floats and records. Variant tags are unaffected because they dispatch on atom symbols in `__tag`.

<!-- connections:start -->

## Connections

**Outgoing**
- INCLUDES → [[eq-normalization-bug]] — $eq returns wrong result on equal literals
- INCLUDES → [[letpoly-implicit-escape]] — Generalization leaks block-internal metas
- INCLUDES → [[maplist-schema-unification]] — Mu-type schema row order mismatch
- INCLUDES → [[length-recursive-debruijn]] — Recursive call resolves as wrong de Bruijn index
- INCLUDES → [[fst-closure-annotation]] — Annotation swaps type parameters
- INCLUDES → [[sigma-quoting-match]] — Sigma body match can't reduce on symbolic binder
- INCLUDES → [[sigma-quoting-field-ref]] — Sigma body field ref resolves to type not value
- INCLUDES → [[bridge-free-var-unknown]] — Bridge var:free → unknown
- INCLUDES → [[bridge-label-closure-gap]] — Label self-ref under match scope
- INCLUDES → [[bridge-struct-dispatch]] — Backlog: struct pattern dispatch
- INCLUDES → [[bridge-closure-capture]] — Curried closure capture (implemented)
- INCLUDES → [[type-erasure]] — Backlog: type-only let erasure
- INCLUDES → [[bridge-unsaturated-external]] — Bug: unsaturated externals need closure wrappers
- SHARED_WITH → [[gram-evolution.thread]] — Bridge bugs overlap
- SHARED_WITH → [[recursion.thread]] — Recursive binding bugs overlap
- SHARED_WITH → [[row-types.thread]] — Row/schema unification bug
- INCLUDES → [[gram-label-resolution-pass]]
- INCLUDES → [[recursive-struct-binding]]
- INCLUDES → [[gram-struct-node]]
- INCLUDES → [[variant-discriminant-representation.adr]]
- INCLUDES → [[string-dispatch-float-record-bug]]

**Incoming**
- [[length-recursive-debruijn]] ← DISCOVERED_BY
- [[fst-closure-annotation]] ← DISCOVERED_BY
- [[maplist-schema-unification]] ← DISCOVERED_BY

<!-- connections:end -->

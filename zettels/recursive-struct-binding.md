---
tags:
  - mechanism
  - principle
  - lowering
  - recursion
  - evaluation
  - mir
  - codegen
  - compiler
  - row-types
  - mutation
  - ir
  - reference
  - implemented
refs:
  - thread:pipeline-stabilization
  - branch:gram-record-labels
  - code:tiansivive/yap#9
  - title: "Fixing Letrec: A Faithful Yet Efficient Implementation of Scheme's Recursive Binding Construct"
    authors: Waddell, Sarkar, Dybvig
    year: 2005
    url: https://doi.org/10.1007/s10990-005-4881-8
  - title: "Mixin modules in a call-by-value setting"
    authors: Hirschowitz, Leroy
    year: 2005
    url: https://doi.org/10.1145/1065887.1065891
---

# Recursive struct binding

A struct whose fields reference each other by label is a recursive binding group — the value-level analogue of `letrec`. Lowering it in a strict language is the letrec problem: a field cannot read a sibling's value before that value exists.

The discriminating property is *when a reference is read*, not whether a cycle exists. A reference under a lambda is **deferred**: it is read at call time, by which point every field is populated, so any construction order is sound. A reference evaluated during construction is **eager**: it reads whatever the slot holds at that moment.

Knot-tying handles the deferred case: allocate the record, build field values that close over it, then write each value into place via in-place record construction. The mutation is internal to construction — no alias observes the record before it is complete — so immutable value semantics are preserved. This is the lowering-level counterpart of the placeholder-and-mutate pattern used in recursive NbE evaluation.

The eager case has no closure to defer the read, so an eager cycle has no construction order and is rejected ([[label-cycle-guardedness]]). Acyclic eager references need no ordering rule: the bridge walk is demand-driven, so a forward reference emits its referent the first time it is read, putting the referent in place before its use — no dependency-ordering pass and no define-before-use restriction. The richer alternative — topological ordering by inter-field dependency, with strongly-connected components falling back to thunks — is the general letrec treatment (GHC dependency analysis; the binding classification in *Fixing Letrec*), unnecessary here because the demand-driven walk orders acyclic references and the knot ties the guarded cycles.

OCaml's call-by-value `let rec` makes the same trade: it admits guarded recursive values via in-place initialisation and rejects unguarded ones statically.

<!-- connections:start -->

## Connections

**Outgoing**
- MIRRORS → [[knot-tying]] — Lowering-level placeholder-and-mutate
- ADDRESSES → [[mutual-recursion]] — Struct label group is value-level letrec
- AVOIDS → [[bridge-forward-label-refs]] — Define-before-use removes dependency ordering
- RELIES_ON → [[label-cycle-guardedness]] — Only admitted cycles are tied
- DETAILS → [[sigma-vs-codata-label-refs]] — Eager fixed-point side of the duality
- RELIES_ON → [[gram-struct-node]] — The knot object is the struct node's Alloc
- FIXES → [[bridge-label-closure-gap]] — Record-capture knot ties labels captured into closures
- RELIES_ON → [[knot-eager-capture-invariant]] — The knot is correct only if capture follows allocation

**Incoming**
- [[pipeline-stabilization.thread]] ← INCLUDES
- [[recursion.thread]] ← INCLUDES
- [[gram-struct-labels-knot.session]] ← PRODUCED
- [[nu-on-rows]] ← RELIES_ON — Knot handles guarded+regular; thunk handles guarded+non-regular

<!-- connections:end -->

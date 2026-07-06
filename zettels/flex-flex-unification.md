---
tags:
  [
    type-system,
    elaboration,
    normalization,
    unification,
    inference,
    dependent,
    metavariable,
    mechanism,
    pattern,
    code,
    monad,
    tracing,
    implemented,
  ]
---
# Flex–flex unification

In `src/elaboration/unification/unification.ts`, after stripping `Neutral`, forcing with `zonker := Sub.compose(subst, ctx.zonker)`, and `NF.unwrapNeutral` on both sides, **`[NF.Patterns.Flex, NF.Patterns.Flex]`** runs:

1. **`bind(ctx, meta1.variable, meta2)`** — left metavariable maps to the right flex **`NF.Value`** (right-hand spine stays the representative).
2. **`Sub.compose`** that singleton with the incoming **`subst`**.
3. **`unify(ann1, ann2, lvl, s)`** on **`ctx.metas[...].ann`** for both metas so annotations/kinds stay aligned.

If either flex already has an entry in **`subst`**, the earlier guarded **`Flex`** clauses chase **`subst[meta.variable.val]`** and **`unify`** again instead of **`bind`**.

Instrumentation: outer **`unify`** wraps work in **`V2.track({ tag: "unify", type: "nf", ... })`**.

<!-- connections:start -->

## Connections

**Outgoing**
- SPECIALIZES → [[unification-algorithm]] — Both unsolved
- RESOLVES → [[meta-variables]] — Binds left to right

**Incoming**
- [[solver-meta-threading]] ← APPLIES_TO — Fresh metas from row-tail rewriting trigger the missing-kind crash

<!-- connections:end -->

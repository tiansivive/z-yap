---
tags:
  [
    unification,
    elaboration,
    normalization,
    infrastructure,
    mechanism,
    ir,
    code,
    display,
    monad,
    performance,
    implemented,
  ]
---
# Substitution system

**`src/elaboration/unification/substitution.ts`** defines **`Subst`** as **`Record<number, NF.Value>`** intersected with a **`unique symbol`** brand so plain records cannot substitute silently.

**API**:

- **`empty`** — singleton branded empty map.
- **`of(k, v)`** — one metavariable binding **`k ↦ v`** ( **`number`** key + **`NF.Value`** ).
- **`from(record)`** — lifts a **`Record<number, NF.Value>`** into **`Subst`**.
- **`display(subst, metas, sep?)`** — joins **`?key |=> NF.display(...)`** lines with **`zonker: subst`** in display context.
- **`compose(newer, old)`** — **`{ ...old, ...newer }`** (left **`older`** shadowed by **`newer`** keys).

**Usage**: **`unification.ts`** **`unify`** finishes **`Sub.compose(unifierResult, subst)`**; **`solve`** threads **`subst`** through **`U.unify`** and merges into **`ctx.zonker`** via **`Sub.compose(subst, ctx.zonker)`** for forcing.

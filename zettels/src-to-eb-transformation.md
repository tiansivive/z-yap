---
tags:
  [
    mechanism,
    elaboration,
    syntax,
    ast,
    parser,
    sugar,
    inference,
    dependent,
    row-types,
    modality,
    codegen,
    implemented,
  ]
---
# Src → EB transformation

Occurs inside `EB.infer` / `EB.check` handlers, not a separate pass. `elaborate.ts` lists the map: e.g. `Src` `lambda` → `EB.Lambda.infer` / `check` branches building `EB.Constructors.Lambda`; `application` → `EB.Application.infer`; `struct` \| `tuple` \| `variant` \| `list` \| `dict` \| `tagged` → respective `inference/*` modules.

**Representative lowers** (`syntax/term.ts` constructors): bare rows → `Row`; `Struct`/`Schema`/`Variant`/`Array` → `App` of `Lit` atom to `Row`. `Block`/`Match`/`Modal`/`Reset`/`Shift` have direct `EB` homonyms.

**Metas:** `EB.freshMeta` (`shared/supply.ts`) introduces `Var` `Meta` nodes and records annotation in the writer/meta map.

**Constraints:** mismatches use `V2.tell("constraint", { type: "assign", … })` (many call sites under `inference/` and `check.ts`).

<!-- connections:start -->

## Connections

**Outgoing**
- CONSUMES → [[src-term]] — Source input
- PRODUCES → [[eb-term]] — Elaborated output
- INSTANTIATES → [[meta-variables]] — Holes, implicit args
- DISPATCHES_ON → [[src-term]] — Src.Term type drives dispatch

**Incoming**
- [[bidirectional-checking-decision]] ← DISPATCHES_ON — Mode drives Src → EB
- [[elaboration-v2.thread]] ← INCLUDES

<!-- connections:end -->

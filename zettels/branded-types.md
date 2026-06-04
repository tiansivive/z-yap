---
tags:
  [
    type-system,
    elaboration,
    syntax,
    ast,
    decision,
    pattern,
    implemented,
    dependent,
    ir,
    code,
    language,
    inference,
  ]
---
# Branded types

`EB.Term` (`src/elaboration/syntax/term.ts`) and `NF.Value` (`src/elaboration/normalization/syntax/term.ts`) are nominal wrappers: `Types.Brand<typeof tag, …>` / `Types.Brand<typeof nf_tag, …>` with private symbols `Symbol("Term")` and `Symbol("NF")`. `Types.make` tags plain constructor objects so TypeScript rejects mixing EB terms and NF values even when shapes overlap.

Each `EB.Term` node also carries a numeric `id` from `nextId()` for stable maps (e.g. monad collector `types`); that counter is separate from the phantom brand.

<!-- connections:start -->

## Connections

**Outgoing**
- CONSTRAINS → [[eb-term]] — Type-level separation
- CONSTRAINS → [[nf-value]] — Prevents mixing

<!-- connections:end -->

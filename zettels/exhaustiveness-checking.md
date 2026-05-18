---
tags:
  [
    type-system,
    elaboration,
    inference,
    pattern,
    problem,
    incomplete,
    needs-design,
    testing,
    syntax,
    ast,
    migration,
    dependent,
    recursion,
    tooling,
  ]
---
# Exhaustiveness checking

Language-level `match` elaboration (`src/elaboration/inference/match.ts`): alternatives are inferred, pairwise constrained to a common result type (`tell("constraint", { assign … })`); there is **no** pass that proves branches cover all constructors of a variant or all inhabitants of a type. Comments note TODOs (e.g. variant typing, narrowing the scrutinee under patterns).

Distinct use of “exhaustive”: internal code uses ts-pattern `.exhaustive()` on host-language `match` arms (e.g. `src/elaboration/pretty/pretty.ts`, `normalization/evaluation.v2.ts`) — TypeScript exhaustiveness over EB/NF variants, not user-visible pattern exhaustiveness.

Status for surface-language exhaustiveness/redundancy diagnostics: **not implemented** as of this codebase snapshot.

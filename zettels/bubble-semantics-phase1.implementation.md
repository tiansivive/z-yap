---
tags:
  - continuation
  - elaboration
  - ast
  - implementation
  - completed
  - inference
  - normalization
  - lowering
  - codegen
  - graph
  - cleanup
refs:
  - plan:bubble-semantics
  - thread:delimited-continuations
sessions:
  - id: 67483184-49f4-449a-9acb-75b28561bace
    transcript: .cursor/projects/Users-t-vilaverde-Workspace-panlogion-yap/agent-transcripts/67483184-49f4-449a-9acb-75b28561bace/67483184-49f4-449a-9acb-75b28561bace.jsonl
---
# Bubble Semantics Phase 1 Implementation

Adds a `Bubble` constructor to `EB.Term` replacing the `Var(skolem)` + `state.skolems` indirection at shift use sites. Self-contained node carrying the shift body, inferred type annotation, and resume values directly. Removes the skolem plumbing from the elaboration pipeline.

Hub: [[bubble-semantics]]

## Scope

- New `EB.Term` constructor: `{ type: "Bubble"; id; ann; values; shift }`
- `shift.ts` produces Bubble instead of Var(skolem) + state stash
- All traversal passes updated (evaluation, verification stub, pretty, metas, GRAM, lowering, freevars, generalization)
- `state.skolems` removed from `MutState` and all call sites
- Resume values populated inline at Bubble construction in `shift.ts` (reads `nondeterminism.solution[skolem.val]`)

## Not in scope

- Full shift/reset verification (part 2 — `[[shift-reset-verification]]`)
- Open shift verification (`[[open-shift-verification]]`)
- NbE evaluation semantics changes (stack capture unchanged)

## Follow-up

- `[[tell-listen-resumption-refactor]]` — replace `nondeterminism.solution` accumulator with Writer-like `tell`/`listen` pattern

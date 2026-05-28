---
tags:
- syntax
- sugar
- deferred
- parser
- elaboration
- decision
- language
- drift
- migration
- tooling
- concept
- row-types
- dependent
- infrastructure
- reference
- compiler
- problem
- ast
- backlog
---

# Where clauses

No **`where`** keyword or production appears in **`src/parser/grammar.ne`**; Nearley processors expose no corresponding builder in **`src/parser/processors.ts`**. Elaboration dispatch in **`src/elaboration/elaborate.ts`** has no `where` arm.

Using trailing local definitions today means nested **`block`**/`let` surface syntax (`blocks.md`), not a postfix `where { … }` form.

Status: **deferred / planned** surface sugar only—semantics would likely reuse existing block/`let` elaboration if added later.

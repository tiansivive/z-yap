---
tags:
- speculative
- graph
- ir
- compiler
- runtime
- tooling
- cli
---

# GRAM interpreter (speculative)

An interpreter that executes the GRAM graph directly, with swappable strategies that select which layer of enrichment to interpret.

**Core idea:** Each pass could provide not just a transformation (`run`) but also execution semantics (`interpret`) for the nodes it produces. The full interpreter is the composition of selected handlers. This mirrors compilation-by-selection: backends choose which passes to compile from; the interpreter chooses which passes to execute from.

**Strategies (examples):**
- Lambda machine — interpret `lambda`/`app` directly (beta reduction on graph)
- Closure machine — interpret `closure`/`env`/`func`, direct/indirect calls
- Semantic match — walk `match`/`case`/`pat:*` nodes
- Decision tree — follow `switch`/`leaf`/`fail` via `:decision_tree`
- Native delimited — `reset`/`shift` as frame capture
- State machine — lowered continuation blocks

**Semantic preservation:** Run the same program with two strategies, compare results. Lambda machine and closure machine should agree. Semantic match and decision tree should agree. Automatic regression testing for pass correctness.

**REPL integration:** `--strategy closure,decision-tree` composes base + selected handlers. Backend authors register custom passes + interpreters, immediately testable without codegen.

**Status:** Speculative. Probably requires LoGRAM substrate (triple-store, Datalog queries) to be practical — graph traversal for interpretation benefits from indexed queries. Not a near-term goal.

**Prerequisite:** LoGRAM migration, or at minimum a performant graph traversal layer.

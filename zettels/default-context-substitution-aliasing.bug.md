---
tags:
  - bug
  - testing
  - snapshot-testing
  - regression
  - substitution
  - metavariable
  - context
  - mutation
  - elaboration
  - generalization
  - migration
  - tech-debt
  - incomplete
status: open
refs:
  - branch:refactor/v3-free-monad
---
# The default context's zonker aliases one shared substitution

A context built from the primitive defaults carries the module-level empty substitution **by reference**, so every such context shares one zonker object. The substitution API is otherwise purely functional — composition and construction always build new records — which means the aliasing is invisible until some caller writes through the record directly. One such write turns a meta solution into process-global state, visible to every context created before or after it.

## Why it is a defect rather than a shortcut

Meta solutions are scope-bearing. A zonker records "this meta stands for that value" relative to the spine that produced it; publishing one to unrelated contexts makes a meta appear solved where nothing solved it. Downstream that is not a rendering artefact: meta collection **follows** solutions, so a meta that appears solved contributes no metas to generalization's seed, generalization finds nothing to quantify and returns its input untouched, and display then expands the borrowed solution. The observable result is a plausible-looking type produced by a generalization that never ran.

## The false-green shape

A snapshot suite is uniquely blind to this. When one test writes a solution into the shared record, every later test in the same worker inherits it, and their snapshots were recorded under that inheritance — so the expectations encode the polluted behaviour and the suite is green. Eight generalization expectations recorded output of exactly this kind, including a bare meta whose generalization was recorded as a primitive type that appears nowhere in the test's inputs.

Isolation is the diagnostic that separates the two readings: a test that passes in a whole-file run and fails when run alone is reading state it did not create. Freezing the shared record turns the writes into immediate type errors that name their own call sites, which converts "something leaks" into a list of writers.

## Consequences beyond tests

Any code path that writes through a default context's zonker publishes meta solutions across module and phase boundaries within one process — the CLI and REPL share a process with everything they elaborate. Per-run ownership of the metacontext removes the channel by construction: when solutions live in a handler's state rather than in a field on the reader environment, there is no shared object for a caller to write through, and each run starts from the metacontext it was given.

<!-- connections:start -->

## Connections

**Outgoing**
- AFFECTS → [[generalization]] — A borrowed solution makes generalization skip the meta and return its input
- AFFECTS → [[snapshot-testing]] — Expectations recorded under leaked state keep the suite green
- MOTIVATES → [[semantic-assertions-with-regression-snapshots]] — A direct claim about what was quantified would have caught the leak
- REVEALS → [[elaboration-monad]] — Metacontext on the reader env is writable by anyone holding a context
- DISCOVERED_BY → [[effects-migration-regression-triage.session]] — Surfaced while judging the branch's generalization snapshots

**Incoming**
- [[monad-split]] ← FIXES — Per-run registry state leaves no shared substitution to write through
- [[global-pending-queue]] ← INCLUDES

<!-- connections:end -->

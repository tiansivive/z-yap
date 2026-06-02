---
tags:
- meta
- tooling
- concept
- infrastructure
- thread
- queue
- project
- principle
- pattern
---
# Thread & Queue System

A lightweight work layer on top of the zettelkasten. Zettels are the atomic knowledge
units; threads and queues are workflows over them.

- **Thread** (`thread.md` sessions, `zettels/*.thread.md` hubs): an ordered sequence of
  work items forming a parallel concern — a named path through the zettel graph that
  progresses independently. Thread hubs contain sequenced items with dependency annotations
  and readiness markers. Member zettels can belong to multiple threads (shared dependencies).
- **Queue** (`global-pending-queue.md`): a flat FIFO list of pending work. Each item
  references a zettel. Items graduate to threads when scoped. `[ ]` open, `[x]` resolved,
  `[~]` dropped.
- **Paper trail** (`thread.md`): append-only log across sessions. Edge lines
  (`[[A]] -- verb -> [[B]]`) record knowledge graph traversal. Action lines (`ENQUEUE`,
  `RESOLVED`, `SPAWN`) record workflow events.

**Design parallels:**
- Event sourcing: the action log is the source of truth; state is derived
- RDF triples: edge syntax `[[A]] -- verb -> [[B]]` is subject-predicate-object
- GTD: queue = inbox, thread = project, review = scan open items
- z-piescript: direct adaptation of `tiansivive/z-piescript` thread/queue system

- **Tag-based worklist**: an unordered bag of items defined by tag membership — no
  sequence, no progress narrative. Items are discovered via tag queries or graph adjacency
  during related work. On-demand catalog scripts (`scripts/tech-debt.js`,
  `scripts/backlog.js`, `scripts/bugs.js`) produce overviews. Distinct from threads
  (ordered, progressive) and queues (FIFO inbox). Current worklist tags: `tech-debt`,
  `backlog`, `bug`.

**Conventions:**
- Thread hubs are tagged `thread` and use `INCLUDES` edges for membership
- Items within a thread are ordered in the hub body with dependency and readiness annotations
- Cross-thread items use `SHARED_WITH` edges
- Readiness: `ready` (unblocked), `blocked` (waiting), `needs-design` (requires exploration)
- Worklist items are tagged directly; no hub file. The tag is the source of truth, scripts produce views

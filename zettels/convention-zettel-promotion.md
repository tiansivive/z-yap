---
tags:
  - proposal
  - meta
  - principle
  - infrastructure
  - needs-design
---
# Should conventions be promoted into `.convention.md` zettels?

`init.md` and `REGISTRY.md` currently carry the conventions of z-yap itself — zettel atomicity, body quality, tag minimum, hub shape, thread/queue workflow, ADR shape, deprecated content marking, session protocol, ref prefix syntax, worklist tags. Each of these is a knowledge atom about how the kb operates, but they live in prose inside operational docs rather than as discoverable graph nodes.

The proposal: extract conventions into atomic zettels filed as `<name>.convention.md`, tagged `meta` + `convention`, with `REGISTRY.md`/`init.md` shifting to reference rather than restate them.

## Filename and tagging shape

Suffix: `<name>.convention.md` — matches the `.adr.md` and `.thread.md` precedent. `convention` becomes a new tag (rows in `REGISTRY.md` under Meta tags) and gets added to the `STRUCTURAL` set in `scripts/catalog.js` and `scripts/neighborhood.js`.

## Candidate extractions

| Convention | Currently in | Worth promoting? |
|---|---|---|
| Zettel atomicity + frontmatter shape | `init.md` Zettel conventions | Likely yes — frequently cited as the bar for body shape |
| Body quality (self-contained, prose economy, negative framing) | `init.md` Content quality | Yes — substantial body of guidance, cite-worthy |
| Tag minimum + REGISTRY descriptive rule | `init.md` Tags + `REGISTRY.md` preamble | Yes |
| Hub zettel shape | `init.md` Tags | Marginal — short, embedded in tag guidance |
| Thread/queue/paper-trail workflow | [[thread-queue-system.thread]] body | Already a zettel — possibly split further |
| ADR convention | `init.md` ADR section | Yes — referenced by every new ADR |
| Deprecated content marking | `init.md` Deprecated content | Yes — operational and cite-worthy |
| Session protocol + session zettel shape | `init.md` Session protocol | Yes |
| Ref prefix convention (`session:`, `adr:`) | `REGISTRY.md` Ref prefixes | Marginal — table form may be better than prose |
| Worklist tags (`tech-debt`/`backlog`/`bug`) | `thread-queue-system.thread` body | Already a zettel paragraph |

## Strategy options

1. **Mechanical extraction**: copy each convention into its own zettel; reduce `init.md` to a thin index. Risk: duplication; `init.md` becomes a stub.
2. **Distill + cross-link**: write each convention as a fresh atomic zettel (graph-friendly), keep `init.md` as the operational quick-start that references them. Preferred.
3. **Selective promotion**: only convert conventions that other zettels actively want to cite. Cheapest; loses systematic coverage.

## Decision deferred

This zettel records the proposal. Resolution requires:
- Picking a strategy (1, 2, or 3)
- Registering the `convention` tag in `REGISTRY.md`
- Updating `STRUCTURAL` sets in scripts to recognise it
- Doing the extraction batch in a dedicated session

Close the queue item once a path is picked, and spawn a new queue item for the extraction work itself.

<!-- connections:start -->

## Connections

**Incoming**
- [[thread-queue-system.thread]] ← INCLUDES — Open meta question

<!-- connections:end -->

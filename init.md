# z-yap — Agent Session Init

z-yap is Yap's design-space zettelkasten: ~470 atomic design notes about the type system, elaboration pipeline, compiler architecture, and verification backend, plus a thread/queue work layer and an append-only paper trail. Part of the [z-loom](https://github.com/tiansivive/z-loom) federation.

## Start here

Run the **load** skill (`.cursor/skills/load/SKILL.md`, also in `.claude/skills/`) to load full project + design-space state and become aware of the support files and procedure skills. It reads the orientation docs, runs the state scripts, and surfaces the skills below.

Cold-start by hand, if not invoking the skill:

```bash
node scripts/current-state.js    # composite: pulse + baseline + ADRs + hubs (start here)
node scripts/status.js           # threads + queue summary
node scripts/queue.js            # pending queue items
```

## Skills

The procedure and conventions live in skills, not in this file:

- **load** (`.cursor/skills/load/`) — load current project + ZK state; awareness of support files and skills.
- **zettelkasten** (`.cursor/skills/zettelkasten/`) — **canonical** for all knowledge-base writes: creating/updating/connecting zettels, hubs and threads, ADRs, the paper trail, the queue, the **session/interaction workflow**, and the **quality theory** for zettel content. Read this whenever you create or edit a zettel, record work, or close out a session.
- **zettel-quality-rework** (`.cursor/skills/zettel-quality-rework/`) — phased campaign for reworking IMPL-MAP/MIXED zettels.

(`create-plan` and `yap-reviewer` live at the yap repo root: `../.cursor/skills/`.)

## Support files

- `README.md` — federation model, zettel format, connection format, scripts
- `REGISTRY.md` — tag and edge-label registry
- `connections.md` — source of truth for all edges (pseudo-Cypher)
- `thread.md` — append-only paper trail of work sessions
- `manifest.yaml` — federation metadata and entry points

## Scripts

Run from anywhere — paths resolve relative to the script.

| Script | Purpose |
|--------|---------|
| `current-state.js` | Composite: pulse + baseline + ADR roll-up + hub snapshot |
| `status.js` | Thread + queue overview |
| `threads.js [--thread slug] [--pending] [--html] [--obsidian] [--markdown]` | Per-thread member listing; kanban renderers |
| `queue.js` | Pending queue items |
| `catalog.js [--tag\|--status\|--search val\|--markdown]` | Zettel inventory with filtering |
| `neighborhood.js <slug>` | All connections to/from a zettel (fuzzy match) |
| `adrs.js [--markdown\|--consistency-only\|--status\|--decisions-md]` | ADR index + consistency |
| `glossary.js [search]` | Browse glossary terms |
| `embed-connections.js [--dry]` | Embed connections into zettels from `connections.md` |

Generated artifacts land in `dist/` (markdown on push via GitHub Actions; kanban + embedded `## Connections` sections on commit via the pre-commit hook).

### Pre-commit hook

```bash
git config --local core.hooksPath scripts/hooks   # regenerate derived artifacts on each commit
```

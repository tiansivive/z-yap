---
tags:
  - ai-session
  - paper-trail
  - agent
  - skills
  - convention
  - documentation
  - infrastructure
  - tooling
refs:
  - session:6ed3708d-feaa-4e25-bfb5-1ee25623e82c
---

# Agent instruction consolidation session

Restructured the repository's agent guidance into a single canonical entry. `AGENTS.md` became the load-independent source of truth: it states that design knowledge lives in z-yap, defines a session contract (start via `/load`; during: consult rules by task, hold the implementation/design posture, proactively bring cross-cutting and cross-disciplinary ideas, enqueue surfaced work; close-out: record in z-yap), and routes tasks to the detailed `.cursor/rules/*`. The cross-tool consumer split was settled: Cursor reads the `.mdc` rules (kept `alwaysApply`, the detailed source), `.github/copilot-instructions.md` was reduced to a pointer, and any other agent reads `AGENTS.md`. The load mechanism chosen over literal "re-read every prompt" is task-routed consultation plus Cursor's automatic injection.

A dedicated communication rule (`communication.mdc`, mirrored to the global Claude config) codified prose density, variation, and forward progress, with carve-outs separating corrected facts (drop) from design positions (defend), and prose shape from action gating. The session also refreshed `.github` governance (name rename, contribution posture, private vulnerability reporting, minimal PR template) and produced the per-PR Explorer preview capability. Stale references in the rules were corrected against code — including the finding that elaboration threads `Q.Usages` but the threading is deprecated and unconsumed, deferred as a queued narrative correction.

<!-- connections:start -->

## Connections

**Outgoing**
- PRODUCED → [[pr-explorer-preview-deploys]] — Per-PR preview capability
- INFORMS → [[agent-guidelines-zettelization]] — Consolidated operational agent rules into a canonical entry

**Incoming**
- [[sessions.hub]] ← INCLUDES — Session record

<!-- connections:end -->

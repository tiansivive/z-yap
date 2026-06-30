---
tags:
  - meta
  - convention
  - ai-session
  - tooling
  - infrastructure
  - agent
  - skills
  - planned
  - needs-design
  - project
---
# Agent guidelines zettelization

Yap's agent and coding guidance is split across `.cursor/rules`, `AGENTS.md`, `.github/copilot-instructions.md`, and `~/.config/ai-agents`. Those sources are operationally useful but graph-invisible; durable conventions should be distilled into zettels and reusable agent skills.

The solver v2 monadic port session surfaced rules that deserve durable treatment: top-down ordering applies across types, values, and functions; namespaces should group related APIs without repeating the module import name; audit judges must not dismiss guidelines as cosmetic churn; semantic field names should express domain roles; tests should be colocated by domain and named by behavior; snapshot output must be reviewed for factual correctness.

## Work shape

This work should refine [[convention-zettel-promotion]] by extracting agent/code conventions into atomic zettels, registering any needed tags, and creating Cursor skills for repeatable procedures such as Yap style review, phase audit, plan persistence, and session closeout.

<!-- connections:start -->

## Connections

**Outgoing**
- EXTENDS → [[convention-zettel-promotion]] — Agent/code rules are a concrete convention extraction case

**Incoming**
- [[solver-v2-monadic-port.session]] ← PRODUCED — Meta follow-up from session guidelines
- [[thread-queue-system.thread]] ← INCLUDES — Meta-thread item 1
- [[global-pending-queue]] ← INCLUDES — Cross-cutting queue item
- [[z-yap-agent-skill]] ← ADDRESSES — Convert z-yap interaction rules into reusable skill form
- [[agent-instruction-consolidation.session]] ← INFORMS — Consolidated operational agent rules into a canonical entry

<!-- connections:end -->

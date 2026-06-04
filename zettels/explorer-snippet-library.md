---
tags:
  - explorer
  - tooling
  - testing
  - implemented
  - cli
  - infrastructure
  - syntax
  - reference
  - interactivity
  - display
---

# Explorer: snippet library

A curated set of built-in input programs for quick exploration. A `<select>` dropdown in the Config sidebar loads snippets into the editor, enabling fast switching between examples.

**Implementation:** 19 built-in snippets in `src/cli/explore/static/app.js` as a `SNIPPETS` array. Each entry has `id`, `group`, `label`, `code`. The select is built dynamically with `<optgroup>` per group. Selecting a snippet replaces the editor content via CodeMirror `dispatch`. A `— custom —` default option indicates manual editing. Entirely client-side — no server changes.

**Groups:** Basics (identity, annotated lambda, implicit argument, boolean), Functions (higher-order, multi-param arrow, implicit Pi), Row types (struct projection, polymorphic projection, dependent struct, nested dependent, row polymorphism, tuple), Pattern matching (variant, struct destructure, nested struct, wildcard + literal), Blocks (let binding, let + projection).

**Future extensions:** user-defined snippets persisted in localStorage, shareable URLs encoding source in the URL fragment.

<!-- connections:start -->

## Connections

**Outgoing**
- EXTENDS → [[pipeline-explorer]] — New explorer capability
- COMPOSES_WITH → [[integration-testing]] — Snippets double as smoke tests
- COMPOSES_WITH → [[repl]] — Similar curated-input concept
- FOLLOWS → [[explorer-diff-mode]] — Sequence order

**Incoming**
- [[explorer-timing]] ← FOLLOWS — Sequence order
- [[explorer-snippet-syntax-fixes]] ← FIXES — Four snippets had wrong syntax

<!-- connections:end -->

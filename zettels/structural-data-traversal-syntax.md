---
tags:
  - syntax
  - sugar
  - row-types
  - structural
  - parser
  - elaboration
  - language
  - backlog
  - planned
  - data-access
  - compiler
---

# Structural data traversal syntax

Indexing operators, deep projections/injections, backcall forms, and SQL-like traversal all target the same semantic area: ergonomic access and update over Yap's structural row-backed data. The core already has projection, injection, row rewriting, and GRAM CRUD enrichment; surface traversal syntax should desugar into those mechanisms rather than introduce a separate data model.

The open design question is how much traversal sugar should be type-directed. Numeric and string indexing overlap array/dictionary `Indexed` forms, while label paths overlap schema/struct rows.

<!-- connections:start -->

## Connections

<!-- connections:end -->

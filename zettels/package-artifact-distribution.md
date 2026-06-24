---
tags:
  [
    distribution,
    artifact,
    release,
    cli,
    tooling,
    infrastructure,
    automation,
    explorer,
    codegen,
    implemented,
  ]
refs:
  - src: tsup.config.ts
    note: bundled CLI entry
  - src: package.json
    note: package file allow-list and executable entry
  - src: src/cli/explore/server.ts
    note: packaged Explorer asset resolution
  - src: src/Codegen/v2/c/runtime.ts
    note: C runtime header asset resolution and copying
---

# Package artifact distribution

Yap's release artifact is an installable CLI package, not only a source checkout. The package boundary must include the executable JavaScript bundle and every runtime asset that a command may need after installation.

Two asset classes make this boundary visible. The Explorer needs its static UI and syntax-highlighting files at runtime; C code generation needs the runtime header copied beside generated C output. Both are package concerns because the commands should work from an installed tarball without reaching back into a developer checkout.

The package artifact is therefore the distribution contract for command-line use: install the tarball, run `yap`, and the bundled commands find their own support files.

<!-- connections:start -->

## Connections

**Outgoing**
- SUPPORTS → [[compile-orchestration]] — Installed CLI preserves command entry points
- SUPPORTS → [[yap-explore]] — Explorer assets travel with the package
- SUPPORTS → [[c-codegen]] — C runtime header travels with the package

**Incoming**
- [[release-and-explorer-deployment.session]] ← PRODUCED — Packaged CLI artifact boundary
- [[yap]] ← INCLUDES — Runnable package distribution
- [[tag-driven-alpha-release-flow]] ← PRODUCES — Tags produce installable release tarballs

<!-- connections:end -->

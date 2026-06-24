---
tags:
  [
    release,
    distribution,
    automation,
    github-actions,
    infrastructure,
    tooling,
    cli,
    artifact,
    milestone,
    implemented,
  ]
refs:
  - src: package.json
    note: release script, package metadata, installable file set
  - src: .release-it.json
    note: release-it hooks and alpha tag naming
  - src: .github/workflows/release.yml
    note: tag-triggered GitHub Release artifact workflow
---

# Tag-driven alpha release flow

Yap treats a version tag as release intent. The local release step chooses the next `0.x.y-alpha.N` version, updates release metadata, and creates the tag; the remote release workflow rebuilds from a clean checkout, regenerates generated parser artifacts, runs verification checks, builds the CLI package, and attaches the tarball to the GitHub Release.

The `0.x.y-alpha.N` line records usable snapshots without promising stable compatibility. The semver minor still advances when a snapshot represents a meaningful project milestone; the alpha suffix keeps the public contract honest while the language and compiler remain research-grade and aggressively movable.

This separates release authorship from artifact construction. Local tooling decides *what* is being released; GitHub Actions proves and packages *that exact tagged tree*.

<!-- connections:start -->

## Connections

**Outgoing**
- USES → [[ci-pipeline]] — GitHub Actions rebuilds and checks tagged trees
- PRODUCES → [[package-artifact-distribution]] — Tags produce installable release tarballs

**Incoming**
- [[release-and-explorer-deployment.session]] ← PRODUCED — Release automation knowledge from alpha release setup
- [[yap]] ← INCLUDES — Project release boundary
- [[explorer-deployment-channels]] ← USES — Stable channel follows version tags

<!-- connections:end -->

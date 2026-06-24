---
tags:
  [
    deployment,
    fly-io,
    explorer,
    github-actions,
    automation,
    infrastructure,
    tooling,
    release,
    cli,
    implemented,
  ]
refs:
  - src: Dockerfile
    note: Explorer container entrypoint
  - src: fly.try-yap.toml
    note: tagged-release Fly app configuration
  - src: fly.try-yap-next.toml
    note: main-branch Fly app configuration
  - src: .github/workflows/fly.yml
    note: GitHub Actions deployment workflow
---

# Explorer deployment channels

Yap exposes the pipeline Explorer through two hosted channels. `try-yap` is the release channel: it tracks version tags and presents the Explorer for the latest published snapshot. `try-yap-next` is the continuous channel: it tracks `main` and gives a faster view of current development.

Both channels run the same Explorer server in a Fly.io machine. The difference is provenance, not application code: one channel answers "what did the last release show?" and the other answers "what does the current mainline show?"

The deploy workflow needs a Fly deploy token in GitHub Actions and a region that can provision new machines. The channel configuration uses `cdg` because new resources can no longer be provisioned in Fly's Madrid region.

<!-- connections:start -->

## Connections

**Outgoing**
- DEPLOYS → [[yap-explore]] — Fly.io serves release and mainline Explorer channels
- USES → [[tag-driven-alpha-release-flow]] — Stable channel follows version tags
- USES → [[ci-pipeline]] — Mainline channel follows GitHub Actions automation

**Incoming**
- [[release-and-explorer-deployment.session]] ← PRODUCED — Fly.io stable/next Explorer channels
- [[yap]] ← INCLUDES — Hosted Explorer entry points

<!-- connections:end -->

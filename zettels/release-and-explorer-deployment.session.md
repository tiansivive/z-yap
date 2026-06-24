---
tags:
  [
    ai-session,
    release,
    distribution,
    deployment,
    fly-io,
    github-actions,
    explorer,
    automation,
    infrastructure,
    implemented,
  ]
refs:
  - session:5e287d3b-a81c-4eb5-b430-9f930f9bafb4
---

# Release and Explorer deployment session

This session turned Yap's release path into a tag-driven alpha flow with packaged CLI artifacts, then extended that release boundary to the Explorer. The package artifact now carries the support files needed by installed commands, GitHub Actions builds and publishes tarballs from version tags, and Fly.io hosts separate Explorer channels for released snapshots and mainline development.

<!-- connections:start -->

## Connections

**Outgoing**
- PRODUCED → [[tag-driven-alpha-release-flow]] — Release automation knowledge from alpha release setup
- PRODUCED → [[package-artifact-distribution]] — Packaged CLI artifact boundary
- PRODUCED → [[explorer-deployment-channels]] — Fly.io stable/next Explorer channels

**Incoming**
- [[sessions.hub]] ← INCLUDES — Session record

<!-- connections:end -->

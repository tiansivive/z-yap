---
tags:
  - deployment
  - fly-io
  - github-actions
  - explorer
  - automation
  - infrastructure
  - tooling
  - preview-environment
  - implemented
refs:
  - src: .github/workflows/fly-pr.yml
    note: label-gated PR preview workflow
  - src: fly.try-yap-next.toml
    note: config reused per-PR via --app override
---

# PR Explorer preview deploys

A pull request opts into an ephemeral, isolated Explorer deployment by carrying the `deploy:explorer` label. The label gives the PR its own Fly app (`try-yap-pr-<number>`) with a distinct URL posted back to the PR, redeployed on each push and destroyed when the PR closes, merges, or loses the label. The preview's lifecycle is bound to the PR, not to a branch or a release.

This is a third deployment channel beside the two standing ones: release (`try-yap`, tracking version tags) and mainline (`try-yap-next`, tracking `main`). It reuses the same container image and the mainline Fly configuration, overriding only the app name — provenance and lifetime differ, application code does not.

App-per-PR rather than one shared preview app is forced by Fly's routing model: a distinct public URL requires a distinct app, since machines within one app sit behind a single hostname and load-balance. Isolation is the payoff — concurrent labeled PRs preview independently, and one PR's broken build cannot take down another's preview. Idle cost stays near zero because previews inherit auto-stop with zero minimum running machines; the only standing obligation is teardown, a single job on PR close.

Previews are confined to same-repository branches: the deploy credential is withheld from fork pull requests, which is the safe default for a public repository — untrusted code never runs with the deploy token.

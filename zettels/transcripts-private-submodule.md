---
tags:
  - todo
  - meta
  - infrastructure
  - tooling
  - planned
---
# Migrate `sessions/` to a private git submodule

AI session transcripts live under `sessions/` as JSONL (and occasional markdown) files referenced by zettels via `refs: [session:UUID]`. They currently sit untracked in the z-yap working tree. The kb is intended to live in a public GitHub repo and may take outside contributors, so transcripts cannot ship with the repo: they record private working sessions and would expose unfiltered design discussion.

The plan is to move the transcripts to a private GitHub repo (`tiansivive/z-yap-sessions`) and reference it from public z-yap as a git submodule. The public repo carries only the submodule pointer (a commit SHA), not the content.

## Goals

- Transcripts version-controlled, recoverable, and provenance-linked to zettel `session:UUID` refs
- Zero exposure of transcript content in the public repo
- Clean contributor experience: cloners of public z-yap see an empty `sessions/` and never trigger a permission error in normal use
- Scripts and CI degrade gracefully when the submodule is absent

## Migration steps

1. **Create the private repo** on GitHub: `tiansivive/z-yap-sessions`, private, empty (no README needed).

2. **Seed the private repo locally** from the current `sessions/` contents:

   ```
   mkdir /tmp/z-yap-sessions && cd /tmp/z-yap-sessions
   git init
   cp -r /path/to/z-yap/sessions/* .
   git add .
   git commit -m "Initial transcript snapshot"
   git remote add origin git@github.com:tiansivive/z-yap-sessions.git
   git branch -M main
   git push -u origin main
   ```

3. **Replace local `sessions/` with a submodule**:

   ```
   cd /path/to/z-yap
   rm -rf sessions
   git submodule add git@github.com:tiansivive/z-yap-sessions.git sessions
   git commit -m "chore: track transcripts via private submodule"
   ```

4. **Verify `.gitmodules`** lands in the public repo with the SSH URL. Anonymous viewers will see the URL but `git submodule update --init` will fail without access — clean failure mode.

5. **New transcript workflow** (manual or wrapped in a script):

   ```
   cd sessions
   cp ~/transcripts/new-uuid.jsonl ./<UUID>.jsonl
   git add . && git commit -m "Add <UUID>" && git push
   cd ..
   git add sessions
   git commit -m "Update sessions submodule"
   ```

6. **CI compatibility**: `.github/workflows/catalog.yml` does not currently read `sessions/`, so it continues to work without changes. If a future script needs transcript access in CI, add `submodules: true` to `actions/checkout@v4` and provision a deploy key on the private repo with read access.

7. **Audit pass**: confirm no committed script or zettel-builder assumes the `sessions/*.jsonl` files exist as local files. The `session:UUID` ref convention is path-agnostic; current scripts treat it as opaque metadata.

## Privacy caveats

- The set of UUIDs is still public via `refs: [session:UUID]` in zettels — anyone can see "session X happened" but not its content
- `.gitmodules` exposes the existence of `tiansivive/z-yap-sessions` as a private repo
- The `6c10d690-piescript-pi-calculus-design.md` file in `sessions/` is a markdown transcript export and moves into the submodule alongside the JSONLs

## Out of scope for this todo

- Per-file ACL within the submodule (would require git-crypt; deferred unless trust shape changes)
- Backup/replication of the private repo to another store (e.g., S3, NAS)
- A `scripts/record-session.sh` wrapper that automates the two-stage commit (could land later as a separate todo)

## Done when

- `sessions/` resolves as a submodule in `git status`
- Cloning public z-yap with `--recurse-submodules` fails cleanly for non-authorised users
- A new transcript can be added and shows up referenced via existing `session:UUID` refs without further changes

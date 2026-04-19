#!/usr/bin/env python3
"""Show a zettel's neighborhood — its connections and immediate graph context.

Usage:
  python3 scripts/neighborhood.py <slug>
  python3 scripts/neighborhood.py yap
  python3 scripts/neighborhood.py --all   # append connections to all zettel bodies (dry-run)
  python3 scripts/neighborhood.py --all --write  # actually write to files
"""

import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
ZETTELS_DIR = ROOT / "zettels"
CONNECTIONS_FILE = ROOT / "connections.cypher"

sys.path.insert(0, str(Path(__file__).parent))
from lib.zettel import load_all, by_slug
from lib.connections import parse_file, edges_for


def show_neighborhood(slug: str) -> None:
    zettels = load_all(ZETTELS_DIR)
    index = by_slug(zettels)
    edges = parse_file(CONNECTIONS_FILE) if CONNECTIONS_FILE.exists() else []

    if slug not in index:
        print(f"Unknown zettel: {slug}")
        print(f"Available: {', '.join(sorted(index.keys()))}")
        sys.exit(1)

    z = index[slug]
    out, inc = edges_for(slug, edges)

    print(f"# {z.title}")
    print(f"slug: {z.slug}")
    print(f"tags: {', '.join(z.tags)}")
    print()

    if out:
        print("## Outgoing")
        for e in out:
            target_title = index[e.target].title if e.target in index else e.target
            note = f"  — {e.note}" if e.note else ""
            print(f"  [{e.label}] → {target_title} ([[{e.target}]]){note}")
        print()

    if inc:
        print("## Incoming")
        for e in inc:
            source_title = index[e.source].title if e.source in index else e.source
            note = f"  — {e.note}" if e.note else ""
            print(f"  {source_title} ([[{e.source}]]) [{e.label}] →{note}")
        print()


def generate_connections_section(slug: str, edges, index) -> str:
    """Generate a markdown connections section for a zettel."""
    out, inc = edges_for(slug, edges)
    if not out and not inc:
        return ""

    lines = ["\n---\n", "## Connections\n"]
    if out:
        for e in out:
            target_title = index[e.target].title if e.target in index else e.target
            note = f" — {e.note}" if e.note else ""
            lines.append(f"- **{e.label}** → [[{e.target}|{target_title}]]{note}")
    if inc:
        for e in inc:
            source_title = index[e.source].title if e.source in index else e.source
            note = f" — {e.note}" if e.note else ""
            lines.append(f"- [[{e.source}|{source_title}]] **{e.label}** →{note}")

    return "\n".join(lines) + "\n"


def append_all(write: bool = False) -> None:
    zettels = load_all(ZETTELS_DIR)
    index = by_slug(zettels)
    edges = parse_file(CONNECTIONS_FILE) if CONNECTIONS_FILE.exists() else []

    for z in zettels:
        section = generate_connections_section(z.slug, edges, index)
        if not section:
            continue

        if write and z.path:
            text = z.path.read_text()
            marker = "\n---\n\n## Connections\n"
            if marker.replace("\n\n", "\n") in text:
                before = text.split("---\n\n## Connections")[0]
                z.path.write_text(before.rstrip() + "\n" + section)
            else:
                z.path.write_text(text.rstrip() + "\n" + section)
            print(f"  ✓ {z.slug}")
        else:
            print(f"\n{'─' * 40}")
            print(f"  {z.title} ({z.slug}.md)")
            print(section)


def main() -> None:
    args = sys.argv[1:]

    if "--all" in args:
        write = "--write" in args
        if not write:
            print("Dry run — pass --write to actually modify files\n")
        append_all(write)
    elif args:
        slug = args[0]
        show_neighborhood(slug)
    else:
        print("Usage: neighborhood.py <slug> | --all [--write]")
        sys.exit(1)


if __name__ == "__main__":
    main()

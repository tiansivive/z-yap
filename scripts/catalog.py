#!/usr/bin/env python3
"""z-yap catalog — structured summary of all zettels with their connections.

Usage:
  python3 scripts/catalog.py             # full catalog
  python3 scripts/catalog.py --compact   # one-line-per-zettel
  python3 scripts/catalog.py --markdown  # plain markdown (for dist/)
  python3 scripts/catalog.py types       # filter by keyword
"""

import signal
import sys
from pathlib import Path

signal.signal(signal.SIGPIPE, signal.SIG_DFL)

ROOT = Path(__file__).parent.parent
ZETTELS_DIR = ROOT / "zettels"
CONNECTIONS_FILE = ROOT / "connections.cypher"

sys.path.insert(0, str(Path(__file__).parent))
from lib.zettel import load_all, Zettel
from lib.connections import parse_file, edges_for


def main() -> None:
    args = sys.argv[1:]
    compact = "--compact" in args
    markdown = "--markdown" in args
    filters = [a for a in args if not a.startswith("--")]

    zettels = load_all(ZETTELS_DIR)
    edges = parse_file(CONNECTIONS_FILE) if CONNECTIONS_FILE.exists() else []

    if filters:
        zettels = [z for z in zettels if _matches(z, filters)]

    if markdown:
        _print_markdown(zettels, edges, compact)
    elif compact:
        _print_compact(zettels)
    else:
        _print_full(zettels, edges)


def _matches(z: Zettel, filters: list[str]) -> bool:
    searchable = f"{z.title} {z.slug} {' '.join(z.tags)}".lower()
    return any(f.lower() in searchable for f in filters)


def _print_markdown(zettels: list[Zettel], edges, compact: bool) -> None:
    print(f"# z-yap Catalog ({len(zettels)} zettels)\n")
    for z in zettels:
        if compact:
            tags = ", ".join(z.tags)
            print(f"- **{z.title}** `{z.slug}` [{tags}]")
        else:
            print(f"## {z.title}")
            print(f"`{z.slug}` — tags: {', '.join(z.tags)}")
            out, inc = edges_for(z.slug, edges)
            if out:
                print(f"\n**Outgoing:**")
                for e in out:
                    note = f" — {e.note}" if e.note else ""
                    print(f"- [{e.label}] → [[{e.target}]]{note}")
            if inc:
                print(f"\n**Incoming:**")
                for e in inc:
                    note = f" — {e.note}" if e.note else ""
                    print(f"- [[{e.source}]] [{e.label}] →{note}")
            print()


def _print_compact(zettels: list[Zettel]) -> None:
    max_title = max((len(z.title) for z in zettels), default=0)
    max_slug = max((len(z.slug) for z in zettels), default=0)
    print(f"{'Title':<{max_title}}  {'Slug':<{max_slug}}  Tags")
    print(f"{'─' * max_title}  {'─' * max_slug}  ────")
    for z in zettels:
        tags = ", ".join(z.tags)
        print(f"{z.title:<{max_title}}  {z.slug:<{max_slug}}  {tags}")


def _print_full(zettels: list[Zettel], edges) -> None:
    print(f"# z-yap Catalog ({len(zettels)} zettels)\n")
    for z in zettels:
        print(f"  {z.title}")
        print(f"  slug: {z.slug}")
        print(f"  tags: {', '.join(z.tags)}")
        out, inc = edges_for(z.slug, edges)
        if out:
            for e in out:
                note = f" — {e.note}" if e.note else ""
                print(f"    → [{e.label}] [[{e.target}]]{note}")
        if inc:
            for e in inc:
                note = f" — {e.note}" if e.note else ""
                print(f"    ← [[{e.source}]] [{e.label}]{note}")
        print()


if __name__ == "__main__":
    main()

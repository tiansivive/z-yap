"""Parse z-yap zettel files (markdown + YAML frontmatter).

Zettel format:
  ---
  tags: [tag1, tag2]
  refs: [optional]
  ---
  # Title

  Body text.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path

import yaml


@dataclass
class Zettel:
    slug: str
    title: str
    tags: list[str]
    body: str
    refs: list[str] = field(default_factory=list)
    path: Path | None = None


def parse_zettel(path: Path) -> Zettel | None:
    """Parse a single zettel file. Returns None if invalid."""
    text = path.read_text()
    parts = text.split("---", 2)
    if len(parts) < 3:
        return None

    fm = yaml.safe_load(parts[1])
    if not isinstance(fm, dict):
        return None

    body = parts[2].strip()
    lines = body.split("\n")

    title = path.stem
    for line in lines:
        if line.startswith("# "):
            title = line[2:].strip()
            break

    return Zettel(
        slug=path.stem,
        title=title,
        tags=fm.get("tags", []),
        refs=fm.get("refs", []),
        body=body,
        path=path,
    )


def load_all(zettels_dir: Path) -> list[Zettel]:
    """Load and parse all .md files in the zettels directory."""
    zettels: list[Zettel] = []
    for path in sorted(zettels_dir.glob("*.md")):
        z = parse_zettel(path)
        if z:
            zettels.append(z)
    return zettels


def by_tag(zettels: list[Zettel], *tags: str) -> list[Zettel]:
    """Filter zettels whose tags intersect the given set."""
    tag_set = set(tags)
    return [z for z in zettels if tag_set & set(z.tags)]


def by_slug(zettels: list[Zettel]) -> dict[str, Zettel]:
    """Build a slug -> zettel lookup dict."""
    return {z.slug: z for z in zettels}

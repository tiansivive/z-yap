"""Parse pseudo-Cypher connections file into structured edges.

Format:
  [[source]] --[:LABEL]--> [[target]]  -- note  @2026-04-18
  [[a]] --[:LABEL]-- [[b]]  -- note  (bidirectional)

Components:
  - [[slug]] — zettel identifier
  - --[:LABEL]--> — directed edge
  - --[:LABEL]-- — bidirectional (desugars to two directed edges)
  - -- note — optional freetext
  - @ISO-date — optional timestamp
"""

from __future__ import annotations

import re
from dataclasses import dataclass
from pathlib import Path

EDGE_RE = re.compile(
    r"^\[\[(?P<source>[^\]]+)\]\]"
    r"\s+--\[:(?P<label>[A-Z_]+)\]--(?P<arrow>>?)"
    r"\s+\[\[(?P<target>[^\]]+)\]\]"
    r"(?:\s+--\s+(?P<note>[^@]*))??"
    r"(?:\s+@(?P<date>\d{4}-\d{2}-\d{2}))?\s*$"
)


@dataclass(frozen=True)
class Edge:
    source: str
    label: str
    target: str
    note: str | None = None
    date: str | None = None
    bidirectional: bool = False


def parse_line(line: str) -> Edge | None:
    """Parse a single connection line. Returns None for non-edge lines."""
    line = line.strip()
    if not line or line.startswith("#") or line.startswith("//"):
        return None

    m = EDGE_RE.match(line)
    if not m:
        return None

    directed = m.group("arrow") == ">"
    note = m.group("note").strip() if m.group("note") else None

    return Edge(
        source=m.group("source"),
        label=m.group("label"),
        target=m.group("target"),
        note=note if note else None,
        date=m.group("date"),
        bidirectional=not directed,
    )


def parse_file(path: Path) -> list[Edge]:
    """Parse all edges from a connections file."""
    edges: list[Edge] = []
    for line in path.read_text().splitlines():
        edge = parse_line(line)
        if edge:
            edges.append(edge)
    return edges


def expand_bidirectional(edges: list[Edge]) -> list[Edge]:
    """Expand bidirectional edges into two directed edges."""
    result: list[Edge] = []
    for e in edges:
        result.append(Edge(e.source, e.label, e.target, e.note, e.date, False))
        if e.bidirectional:
            result.append(Edge(e.target, e.label, e.source, e.note, e.date, False))
    return result


def edges_for(slug: str, edges: list[Edge]) -> tuple[list[Edge], list[Edge]]:
    """Return (outgoing, incoming) edges for a given zettel slug."""
    expanded = expand_bidirectional(edges)
    outgoing = [e for e in expanded if e.source == slug]
    incoming = [e for e in expanded if e.target == slug]
    return outgoing, incoming

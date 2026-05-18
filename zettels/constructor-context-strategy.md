---
tags:
- mechanism
- graph
- ir
- lowering
- compiler
- performance
- memory
- allocation
- reuse
- recursion
- speculative
---

# Constructor context strategy (CRUD Phase C)

Koka-inspired: enrich the graph with "hole" nodes for top-down recursive construction. Enables tail-call-modulo-cons — no stack growth or intermediate allocation for recursive data building.

**Problem addressed:** A function like `map f xs` builds a list by recursing into the tail, then constructing cons cells bottom-up. This requires O(n) stack frames. With constructor contexts, the cons cell is allocated *first* with a hole for the tail, then the recursion fills it in — constant stack, no intermediate allocations.

**GRAM representation (speculative):**
- `context` node: represents a partially-constructed value with a typed hole.
- `:hole` edge: from context node to the position being filled.
- `:fills` edge: from the recursive result to the hole it fills.
- The pass identifies tail-recursive constructions and rewrites them into context + fill pairs.

**Why speculative:**
- Most complex of the three strategies.
- Requires identifying tail-recursive-modulo-cons patterns in the graph — non-trivial analysis.
- Benefits from better graph traversal (LoGRAM substrate with indexed queries).
- Value is backend-specific: C/native backends benefit most; JS/Erlang have their own TCO or don't suffer as much.

**Composes with:**
- Mode annotation (Phase A): contexts are always `exclusive` (under construction, not yet shared).
- Reuse analysis (Phase B): a context might reuse memory from a previous same-shape value.

**Prior art:** Koka's constructor contexts (FP², Lorenzen et al. 2023), GHC's "constructed product result" optimization, tail-call-modulo-cons in Prolog/OCaml.

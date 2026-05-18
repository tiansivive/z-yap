---
tags:
- thread
- parser
- migration
- syntax
- tooling
---
# Parser Migration

From Nearley (shipping) to tree-sitter (target). Includes grammar alignment,
processor sync, and CST export cleanup.

## Sequence

1. **Nearley parser** [[nearley-parser]] — implemented
   grammar.ne -> grammar.ts, processors.ts -> Src.Term. Authoritative today.

2. **Parser processors** [[parser-processors]] — implemented
   Bridge from grammar to Src.Term. Grammar <-> processor alignment risk
   (e.g. Mu in grammar.ne vs processors.ts).

3. **Tree-sitter parser** [[tree-sitter-parser]] — in-progress
   External tree-sitter-yap repo. CST helpers, pnpm ts-dts. Known drift:
   missing ts-dts in package.json, barrel may not export CST yet.
   Module grammar shapes (qualified/hiding) not produced by Nearley.

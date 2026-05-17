---
tags:
  - type-system
  - elaboration
  - inference
  - syntax
  - ast
  - parser
  - row-types
  - concept
  - implemented
  - sugar
  - mir
  - pattern
---
# Tagged Values

Surface **tagged** terms are built by `tagged` in `src/parser/processors.ts` from a leading `Colon` token and a variable tag name (`:TagName body` shape in the CST pipeline). AST: `{ type: "tagged"; tag; term }` (`src/parser/terms.ts`).

Inference (`src/elaboration/inference/tagged.ts`): for payload `term` with inferred type `ty`, introduce fresh row metavar `rvar`, build `NF.Row` `Extension(tag, ty, rvar)`, type `NF.Constructors.Variant(row)`. The elaborated **term** is `EB.Constructors.Struct(Extension(tag, tm, emptyRow))`—a unary `Struct` spine, not `Inj` (injection handles `{ base | label = value }`, `injection.ts`).

Variant **literals** (`variant` processor) reduce a list of tagged arms into a single `type: "variant"` row for type-level sums (`variants.ts` checks against `NF.Type`). Introduced variant **values** use this tagged path plus `Match` for elimination (`src/elaboration/inference/match.ts`, lowering `src/lowering/matching/`).

Disambiguation between record vs sum positions is whatever inference supplies via expected types/constraints—not a second nominal datatype mechanism.

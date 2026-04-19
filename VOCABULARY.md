# Vocabulary

Tag and label vocabulary for z-yap. Kept roughly in sync with z-loom's registered vocabulary.

## Tags

| Tag | Description |
|-----|-------------|
| `concept` | A design idea or conceptual object |
| `mechanism` | A concrete operational method or technique |
| `type-system` | Type system concept, mechanism, or property |
| `language` | Core language features, syntax, semantics |
| `principle` | A durable guiding constraint or heuristic |
| `decision` | A settled design choice with rationale |
| `project` | An organized body of work |
| `pattern` | A reusable approach or technique |
| `problem` | An identified difficulty or challenge |
| `elaboration` | Bidirectional inference, checking, type synthesis |
| `normalization` | NbE, evaluation, normal forms |
| `parser` | Parsing, grammar, CST/AST concerns |
| `mir` | Mid-level IR, lowering, compilation |
| `verification` | Liquid types, refinements, SMT |
| `row-types` | Row polymorphism, row variables, row unification |
| `dependent` | Dependent types, Pi types, value-level type indices |
| `modality` | QTT multiplicities, linearity, resource tracking |
| `infrastructure` | Tooling, scripts, dev environment |
| `research` | Empirical findings, prior art exploration |
| `paper` | Academic paper reference |
| `gateway` | Entry point to an external resource |

## Labels

| Label | Description |
|-------|-------------|
| `USES` | Source uses or applies the target |
| `EXTENDS` | Source extends or augments the target |
| `IMPLEMENTS` | Source realizes the target |
| `CONTRASTS_WITH` | Source contrasts with the target |
| `INFORMS` | Source is prior art or inspiration for the target |
| `APPLIES_TO` | Source is applicable to the target |
| `LACKS` | Source lacks the target feature |
| `REQUIRES` | Source requires the target as prerequisite |
| `CONSTRAINS` | Source constrains or limits the target |
| `ADDRESSES` | Source addresses or solves the target problem |
| `INCLUDES` | Source collection includes the target |
| `DISTINGUISHES` | Source disambiguates the target from alternatives |
| `ENABLES` | Source makes the target possible |
| `DEPENDS_ON` | Source depends on the target (structural DAG edge) |

## Tag groups

| Group | Tags |
|-------|------|
| Core | `concept`, `mechanism`, `principle`, `pattern`, `decision` |
| Type Theory | `type-system`, `row-types`, `dependent`, `modality` |
| Pipeline | `elaboration`, `normalization`, `parser`, `mir`, `verification` |
| Meta | `project`, `infrastructure`, `research`, `paper`, `gateway` |
| Status | `problem`, `language` |

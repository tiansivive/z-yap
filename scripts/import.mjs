#!/usr/bin/env node
/**
 * z-yap Import Script
 * Generates zettel files and connections from the Z-YAP-IMPORT.md plan.
 * 
 * Run: node scripts/import.mjs
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const ROOT = new URL('..', import.meta.url).pathname;
const ZETTELS_DIR = join(ROOT, 'zettels');

// Ensure dir exists
if (!existsSync(ZETTELS_DIR)) mkdirSync(ZETTELS_DIR, { recursive: true });

// === TAG MAPPING (PascalCase → kebab-case) ===
const TAG_MAP = {
  // Status
  Implemented: 'implemented', InProgress: 'in-progress', Planned: 'planned',
  Speculative: 'speculative', Deprecated: 'deprecated', Rejected: 'rejected',
  Deferred: 'deferred', Incomplete: 'incomplete', Decided: 'decision',
  Drift: 'drift', Reference: 'reference',
  // Domain
  Syntax: 'syntax', Elaboration: 'elaboration', Normalization: 'normalization',
  Unification: 'unification', Verification: 'verification', Lowering: 'lowering',
  Codegen: 'codegen', TypeSystem: 'type-system', RowTypes: 'row-types',
  Dependent: 'dependent', Modality: 'modality', Continuation: 'continuation',
  FFI: 'ffi', Inference: 'inference', Runtime: 'runtime', Tooling: 'tooling',
  Compiler: 'compiler', Rewriting: 'rewriting', Testing: 'testing',
  Migration: 'migration', Performance: 'performance', Backend: 'backend',
  Effect: 'effect', Recursion: 'recursion', Sugar: 'sugar',
  // Existing z-yap
  Concept: 'concept', Mechanism: 'mechanism', Principle: 'principle',
  Decision: 'decision', Pattern: 'pattern', Problem: 'problem',
  Project: 'project', Infrastructure: 'infrastructure', Research: 'research',
  Paper: 'paper', Code: 'code', Language: 'language', Gateway: 'gateway',
  // New from Batch 8+9
  ErrorHandling: 'error-handling', Tracing: 'tracing', Display: 'display',
  Monad: 'monad', AST: 'ast', CLI: 'cli', SAT: 'sat',
  Quantifiers: 'quantifiers', Arithmetic: 'arithmetic', Strings: 'strings',
  IR: 'ir', Milestone: 'milestone',
};

function mapTags(tagStr) {
  return tagStr.split(/,\s*/).map(t => TAG_MAP[t.trim()] || t.trim().toLowerCase().replace(/\s+/g, '-'));
}

function slugify(title) {
  return title.toLowerCase()
    .replace(/[()\/\\:'".,!?—–]/g, '')
    .replace(/&/g, 'and')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// === ZETTEL DEFINITIONS ===
// Each: { id, title, tags (comma-separated PascalCase), body }
// Existing zettels that get enriched keep their ID

const zettels = [
  // ===== BATCH 1: Compiler Pipeline =====
  { id: 'nearley-parser', title: 'Nearley Parser', tags: 'Compiler, Syntax, Implemented, Deprecated',
    body: `Current v1 parser. Nearley grammar (\`grammar.ne\`) → generated \`grammar.ts\`. Processors build Src.Term AST nodes with source locations. Being superseded by tree-sitter.

Ambiguous CFG — Earley algorithm handles ambiguity but produces multiple parses for some inputs. \`ParserStart\` selects the start symbol for tests.` },

  { id: 'tree-sitter-parser', title: 'Tree-sitter Parser', tags: 'Compiler, Syntax, Migration, InProgress',
    body: `External grammar in \`tree-sitter-yap\`. Generates \`CST.SyntaxNode\` types via \`pnpm ts-dts\`. Field access via \`CST.Utils.extractFields\` and \`extractParam\`. Incremental, error-recovering.

V2 elaboration modules consume CST nodes directly. Supersedes Nearley parser.` },

  { id: 'verification-pipeline', title: 'Verification Pipeline', tags: 'Compiler, Verification, Implemented',
    body: `Post-elaboration liquid refinement checking. EB.Term + NF.Value → VCs → Z3. Service API: \`check\`, \`synth\`, \`subtype\`, \`getObligations\`. On-demand (not every compile).

Validates elaboration output but does not produce output for subsequent passes. Side-channel, not pipeline stage.` },

  { id: 'mir-lowering', title: 'MIR Lowering', tags: 'Compiler, Lowering, Implemented',
    body: `EB.Term → MIR. Closure conversion, CFG construction, shift/reset state machines, Maranget-style pattern compilation. Module → Functions → Blocks → Instructions + Terminators. SSA with block parameters.

Being phased out in favor of GRAM. Unclear whether MIR persists as a GRAM output or is replaced entirely.` },

  { id: 'js-codegen', title: 'JS Codegen', tags: 'Compiler, Codegen, Backend, Implemented, Incomplete',
    body: `Two versions: (1) v1 (\`src/Codegen/terms.ts\`): EB.Term → JS directly (CommonJS, used by README/REPL), outdated. (2) v2 (\`src/Codegen/v2/js/\`): MIR → JS. Both work for integration tests. Type erasure not implemented (polymorphic FFI needs dummy type args).` },

  { id: 'c-codegen', title: 'C Codegen', tags: 'Compiler, Codegen, Backend, InProgress',
    body: `MIR → C. Runtime header \`yap_rt.h\`. Snapshot tests exist. In progress alongside MIR stabilization.` },

  { id: 'erlang-codegen', title: 'Erlang Codegen', tags: 'Compiler, Codegen, Backend, InProgress',
    body: `MIR → Erlang. Snapshot tests exist. In progress alongside MIR stabilization.` },

  { id: 'module-system', title: 'Module System', tags: 'Compiler, Syntax, Inference, Implemented, Incomplete',
    body: `\`export *\`, \`export (names)\`, \`import "file.yap"\`. Loading: parse → imports → elaborate → interface table. \`export hiding\` exists in TS types but has no grammar production. No qualified names, no mutual modules, no package system. Relies on V1 pipeline (not yet wired to v2).` },

  { id: 'v2-elaboration-pipeline', title: 'V2 Elaboration Pipeline', tags: 'Compiler, Elaboration, Migration, InProgress',
    body: `V2 monad is production. inference.v2: 22/23 modules done (missing modal). checking.v2: missing match, modal. Pipeline disconnected — tmp.ts stubs return \`1 as any\`. Main pipeline (elaborate.ts, module.ts) still v1-only.` },

  { id: 'tmp-pipeline-stub', title: 'tmp.ts Pipeline Stub', tags: 'Compiler, Migration, Problem, InProgress',
    body: `Central dispatch stubs in inference.v2/tmp.ts and checking.v2/tmp.ts. Return \`1 as any\`. Blocks v2 pipeline integration. Must be replaced with actual dispatch to complete the V2 migration.` },

  { id: 'v1-elaboration-pipeline', title: 'V1 Elaboration Pipeline', tags: 'Compiler, Elaboration, Implemented, Deprecated',
    body: `Current working pipeline. Nearley AST → EB.Term. Returns \`[EB.Term, NF.Value, Q.Usages]\`. Being superseded by v2. Kept for reference. All tests and the REPL still run through this.` },

  { id: 'qtt-usage-collection', title: 'QTT Usage Collection', tags: 'Elaboration, Modality, Deprecated',
    body: `QTT-inspired multiplicity collection during elaboration (quantities {0, 1, ω} following QTT syntax). Previous version implemented usage tracking inline during elaboration and proved the concept works. Superseded by decision to move multiplicity analysis to verification pass. Engineering work remains.` },

  { id: 'compile-orchestration', title: 'Compile Orchestration', tags: 'Compiler, Infrastructure, Implemented',
    body: `\`compile.ts\`: module loading → elaboration → (optional verification). \`cli/repl.ts\`: file compile and REPL. Verification not automatic — on-demand after Z3 init. Delegates to V1 pipeline, verification, and MIR lowering.` },

  // ===== BATCH 2a: Core Type Formers =====
  { id: 'pi-types', title: 'Pi Types', tags: 'TypeSystem, Dependent, Concept, Syntax, Implemented',
    body: `Explicit Π(x: ⟨q⟩A).B and implicit Π{x: ⟨q⟩A}.B. Formation, intro (λ/λ{}), elim (app). Multiplicity ⟨q⟩ on domain. Arrow \`→\` sugar for non-dependent Π. Implicit \`⇒\` sugar for implicit Π.

Generalizes simple arrow types — \`A → B\` is \`Π(_: ⟨ω⟩A).B\`. Dual of Sigma types (universal vs existential quantification).` },

  { id: 'sigma-types', title: 'Sigma Types', tags: 'TypeSystem, Dependent, RowTypes, Concept, Implemented',
    body: `Σ(r: Row). Body(r). Field types depend on earlier field values via \`:fieldName\`. \`{ fst: Type, snd: :fst }\`. Encoded as \`Abs { binding: Sigma, body: Schema(row) }\`. Dual of Pi types (existential vs universal).` },

  { id: 'refinement-types', title: 'Refinement Types', tags: 'TypeSystem, Verification, Concept, Modality, Implemented',
    body: `\`T [| \\x → φ |]\`. Boolean predicate over values. Formation, intro via ⊨ φ(v), subtyping (forget, strengthen). Combines with dependent types. Verified via SMT (Z3). Refinement polymorphism (= "abstract refinement types" in Liquid Types literature, Vazou/Rondon/Jhala POPL 2013).` },

  { id: 'modalities', title: 'Modalities (Quantities)', tags: 'TypeSystem, Modality, Concept, Syntax, Incomplete',
    body: `\`⟨q⟩ A\` where q ∈ {0, 1, ω}. Syntax present, carried through elaboration. Stripped from inferred types after inference. Can combine with refinements. Enforcement deferred to verification — currently annotational only.` },

  { id: 'variant-types', title: 'Variant Types', tags: 'TypeSystem, RowTypes, Concept, Implemented',
    body: `\`| #tag₁ A₁ | #tag₂ A₂\`. Row-backed tagged unions. EB: \`App(Lit(Atom("Variant")), Row(...))\`. NF: wrapped in \`Neutral(App(...))\`. Dual of structural records (sum vs product over rows).` },

  { id: 'modality-enforcement', title: 'Modality Enforcement', tags: 'TypeSystem, Modality, Verification, Planned',
    body: `Multiplicity checking in verification (not elaboration). Depends on usage overhaul. Will need to redirect verification output to subsequent lowering passes for type/modality-directed decisions.` },

  { id: 'modality-polymorphism', title: 'Modality Polymorphism', tags: 'TypeSystem, Modality, Inference, Planned',
    body: `Polymorphism over modalities (graded/modal indices) with inference. Requires modality enforcement as prerequisite. Roadmap P1.11.` },

  { id: 'refinement-inference', title: 'Refinement Inference', tags: 'TypeSystem, Modality, Verification, Inference, Speculative',
    body: `Currently refinements are stripped after inference. Future: turn strip into refinement template/hole, recover during verification. Would enable refinement types without explicit annotation.` },

  // ===== BATCH 2b: Row-backed data structures =====
  { id: 'structural-records', title: 'Structural Records', tags: 'TypeSystem, RowTypes, Concept, Implemented',
    body: `\`{ label₁: A₁, label₂: A₂ }\`. EB: \`App(Lit(Atom("Schema")), Row(...))\`. Row-polymorphic (open tail). Projection dispatches on type shape (Schema, Sigma, Neutral, Flex). Dual of variant types.` },

  { id: 'tuples', title: 'Tuples', tags: 'TypeSystem, RowTypes, Concept, Implemented',
    body: `Positional syntax: \`(a, b, c)\`. Desugars to structural records with numeric labels (\`0\`, \`1\`, \`2\`...). Specialization of structural records.` },

  { id: 'lists', title: 'Lists', tags: 'TypeSystem, RowTypes, Concept, Implemented',
    body: `\`[a, b, c]\`. Encodes as \`Indexed Num T defaultArray\` (foreign type). Homogeneous indexed structure. Contrasts with tuples (homogeneous vs heterogeneous).` },

  { id: 'dictionaries', title: 'Dictionaries', tags: 'TypeSystem, RowTypes, Concept, Implemented',
    body: `\`{| key: val |}\`. Encodes as \`Indexed String T defaultHashMap\` (foreign type). Same Indexed encoding as lists but with String index type.` },

  { id: 'projection', title: 'Projection', tags: 'TypeSystem, RowTypes, Concept, Mechanism, Implemented',
    body: `Field access (\`.label\`). Eliminates structural records and sigma types. Dispatches on type shape: Schema, Sigma, Neutral, Flex. Dual of injection.` },

  { id: 'injection', title: 'Injection', tags: 'TypeSystem, RowTypes, Concept, Mechanism, Implemented',
    body: `Tag construction (\`#tag value\`). Introduces structural records (field extension) and variant types (tag injection). Dispatches on type shape: Neutral, Var, Schema, Variant, Sigma. Dual of projection.` },

  { id: 'rows-universal-substrate', title: 'Rows as Universal Substrate', tags: 'TypeSystem, RowTypes, Principle, Decision',
    body: `Design principle: all composite data in Yap is row-based. Records, variants, tuples, lists, dicts all build on the same row polymorphism machinery. Motivates the row-polymorphism commitment and keeps the type system uniform.` },

  { id: 'dedicated-row-constructors', title: 'Dedicated Row Constructors', tags: 'Syntax, RowTypes, Planned',
    body: `Current: rows encoded as \`App(Lit(Atom("Schema")), Row(...))\`. Planned: dedicated AST constructors (\`Struct\`, \`Tuple\`, \`Variant\`) to reduce cognitive overhead and improve error messages. Revises the current App encoding.` },

  { id: 'records-indexed-separation', title: 'Records vs Indexed Separation', tags: 'Syntax, RowTypes, Planned',
    body: `Planned syntax separation to address confusion between record types (\`{ ... }\`) and indexed types (\`[...]\`, \`{| ... |}\`). Currently the distinction is only at the type level.` },

  // ===== BATCH 2c: Expressions and control flow =====
  { id: 'lambda', title: 'Lambda', tags: 'TypeSystem, Syntax, Concept, Mechanism, Implemented',
    body: `Introduction form for Pi types. Creates function values as closures. Dispatches on icit (explicit λ vs implicit λ{}). Composes with application as β-redex pair. Dual of application.` },

  { id: 'application', title: 'Application', tags: 'TypeSystem, Syntax, Concept, Mechanism, Implemented',
    body: `Elimination form for Pi types. Dispatches on icit (explicit app vs @-implicit app). Triggers implicit argument insertion when applied to implicit Pi. Composes with lambda as β-redex pair. Dual of lambda.` },

  { id: 'tagged-values', title: 'Tagged Values', tags: 'TypeSystem, RowTypes, Syntax, Concept, Implemented',
    body: `Introduction form for variant types. \`#tag value\`. Encodes open row tail on TYPE (closed on term). Composes with match as intro/elim pair for variants.` },

  { id: 'match', title: 'Match', tags: 'TypeSystem, Syntax, Concept, Mechanism, Implemented',
    body: `Elimination form for variant types. Pattern matching with dependent narrowing per branch. Dispatches on pattern shape (Variant, Struct, Lit, List, Wildcard, Binder). Lowers to pattern matching compilation. Composes with tagged values as intro/elim pair.` },

  { id: 'blocks', title: 'Blocks', tags: 'Syntax, Elaboration, Concept, Implemented',
    body: `Let bindings creating local scope. Uses let-polymorphism (generalization at let boundaries). Statements: Expression, Let, Using. Introduces local scope. Where clauses desugar to blocks.` },

  { id: 'annotations', title: 'Annotations', tags: 'Syntax, Elaboration, Concept, Implemented',
    body: `\`expr : Type\`. Checks annotation as Type, evaluates it, then checks the term against the evaluated type. Coerces to checked type. No dispatch — straightforward check-against-annotation.` },

  { id: 'holes', title: 'Holes', tags: 'Syntax, Elaboration, Inference, Concept, Implemented',
    body: `\`_\` syntax. Each hole instantiates a fresh meta-variable. Solved by unification during constraint solving. Users write holes for type-directed development.` },

  { id: 'spineful-applications', title: 'Spineful Applications', tags: 'Syntax, Elaboration, Planned',
    body: `Planned revision of application representation. Currently nested binary App nodes. Spineful: single node with head + argument spine. Addresses nested App complexity and enables better pattern matching on application chains.` },

  { id: 'exhaustiveness-checking', title: 'Exhaustiveness Checking', tags: 'TypeSystem, Elaboration, Planned',
    body: `Planned extension to match expressions. Verifies all variants are covered. Addresses safety gap where missing cases silently fail at runtime.` },

  { id: 'type-erasure', title: 'Type Erasure', tags: 'Codegen, TypeSystem, Performance, Planned',
    body: `Planned erasure of type information in codegen. Currently FFI requires dummy type args for polymorphic functions. Erasure would eliminate this overhead and produce cleaner generated code.` },

  { id: 'functional-patterns', title: 'Functional Patterns', tags: 'Syntax, Elaboration, Speculative',
    body: `Pattern matching with view patterns or functional transformations. Would require significant elaboration redesign. Speculative — no concrete plan.` },

  { id: 'where-clauses', title: 'Where Clauses', tags: 'Syntax, Sugar, Implemented',
    body: `\`expr where { bindings }\`. Desugars to blocks (let bindings). Surface ergonomic for local definitions.` },

  { id: 'loop-sugar', title: 'Loop Sugar', tags: 'Syntax, Sugar, Deferred',
    body: `Imperative-looking loop syntax that desugars to tail-recursive functions. Deferred — recursion works directly today.` },

  // ===== BATCH 2d: Delimited Continuations =====
  { id: 'shift-reset', title: 'Shift/Reset', tags: 'Continuation, TypeSystem, Mechanism, Implemented',
    body: `Delimited continuation primitives. \`shift\` captures the continuation up to the nearest \`reset\` boundary. \`resume\` invokes the captured continuation. Introduction form: shift captures k. Elimination form: resume applies k. Answer-type polymorphic — the continuation's answer type can change.` },

  { id: 'answer-type-polymorphism', title: 'Answer-type Polymorphism', tags: 'Continuation, TypeSystem, Concept, Implemented',
    body: `The continuation \`k\` has type \`A → α\` where α is polymorphic (not fixed to the reset block's return type). Generalizes simple continuation types. Enables type-safe manipulation of the control flow context.` },

  { id: 'continuation-binders', title: 'Continuation Binders', tags: 'Continuation, Elaboration, Mechanism, Implemented',
    body: `Encodes resumption as a meta-variable in MutState.skolems. Uses meta-variables for the continuation parameter. Relies on nondeterminism (solver) for multishot semantics. Threaded through V2 monad via MutState.` },

  { id: 'shift-reset-mir-lowering', title: 'Shift/Reset MIR Lowering', tags: 'Continuation, Lowering, Mechanism, Implemented',
    body: `Shift/reset lowered to state machines with heap-allocated frames. Alloc + Read + Jump for single-shot. Branch + resume blocks for multishot. Translates to state machines.` },

  { id: 'multishot-serialization', title: 'Multishot Serialization', tags: 'Continuation, Lowering, Problem',
    body: `Challenge: multishot continuations require capturing and replaying evaluation state. Constrains the MIR lowering approach. Motivates selective CPS as an alternative.` },

  { id: 'selective-cps', title: 'Selective CPS', tags: 'Continuation, Lowering, Speculative',
    body: `Only CPS-transform functions that use delimited control. Addresses multishot serialization problem. Inspired by Koka's evidence passing model. Contrasts with shift/reset MIR lowering (closure vs state machine).` },

  { id: 'effects-as-modality', title: 'Effects as Modality', tags: 'Effect, Modality, Continuation, Speculative',
    body: `Speculative vision: effects tracked as modalities (like quantities). Extends both modalities and shift/reset. Composes with verification. Inspired by Petricek & Orchard's coeffect framework and Koka's algebraic effects.` },

  { id: 'koka-influence', title: 'Koka (Influence)', tags: 'Continuation, Effect, Research',
    body: `Primary influence on selective CPS (evidence passing model). Also: Perceus (reference counting), algebraic effects + handlers. Contrasts with direct capture approach of shift/reset.` },

  { id: 'danvy-filinski', title: 'Danvy & Filinski', tags: 'Continuation, Research, Paper',
    body: `"Abstracting Control" (1990). Foundational theory of delimited continuations (shift/reset). Informs answer-type polymorphism and type discipline for delimited control.` },

  // ===== BATCH 2e: Implicit Resolution =====
  { id: 'implicit-resolution', title: 'Implicit Resolution', tags: 'Inference, Elaboration, Mechanism, Implemented',
    body: `Extends implicits (existing zettel). Resolves resolve constraints via Δ (implicit environment) lookup. Dispatches on constraint type (unification vs Δ lookup). Composes with Pi types (implicit Pi triggers insertion) and let-polymorphism (deferred resolution preserves generality).` },

  { id: 'implicit-environment', title: 'Implicit Environment', tags: 'Inference, Elaboration, Mechanism, Implemented',
    body: `The Δ (delta) in the elaboration context. Stores available implicit values for resolution. Threaded through elaboration context (\`ctx.implicits\`). Enables implicit resolution.` },

  { id: 'typeclass-emulation', title: 'Typeclass Emulation', tags: 'Inference, TypeSystem, Pattern, Implemented',
    body: `Emulates nominal typeclasses using structural records + implicit resolution. No class hierarchy. Instances are record values in Δ. Contrasts with nominal typing — no privileged type/instance relationship, just structural matching.` },

  { id: 'implicits-as-coeffects', title: 'Implicits as Coeffects', tags: 'Inference, Effect, Speculative',
    body: `Speculative revision of implicit resolution: treat implicits as coeffects (context requirements). Inspired by Petricek & Orchard. Would unify implicit resolution with effect tracking.` },

  // ===== BATCH 2f: FFI and Modules =====
  { id: 'ffi', title: 'FFI', tags: 'FFI, Language, Implemented',
    body: `Foreign function interface. External functions declared as \`foreign\` statements. Encoded as \`Var(Foreign)\` in elaboration. Translates to curried JS functions (.ffi.js companion files). Relies on lowering for saturation (partial application via closures). Lacks type erasure.` },

  { id: 'ffi-saturation', title: 'FFI Saturation', tags: 'FFI, Lowering, Mechanism, Implemented',
    body: `Partial application handling for foreign functions. Known-arity foreign calls get saturated at call sites. Preserves calling convention via closures. Relies on MIR lowering.` },

  { id: 'mutual-recursion', title: 'Mutual Recursion (Modules)', tags: 'Compiler, Inference, Planned',
    body: `Mutually recursive module definitions. Requires multi-pass elaboration (fixpoint computation over module interfaces). Currently not supported. Extends the module system.` },

  // ===== BATCH 2g: Operational Semantics =====
  { id: 'cbv-evaluation', title: 'CBV Evaluation', tags: 'Runtime, TypeSystem, Concept, Implemented',
    body: `Call-by-value operational semantics. Left-to-right, applicative evaluation order. Yap's runtime semantics. Closed terms fully reduce to NF.Value. Preserves evaluation order guarantees.` },

  { id: 'primitive-signature', title: 'Primitive Signature', tags: 'Runtime, Elaboration, Mechanism, Implemented',
    body: `δ-rules on literals. Encodes arithmetic, boolean, and comparison operations as built-in primitive operations. Applied during evaluation when all arguments are literal values.` },

  { id: 'type-type', title: 'Type : Type', tags: 'TypeSystem, Dependent, Concept, Decision',
    body: `Yap uses Type : Type (no universe stratification). Enables simple type-level computation — types compute as terms in the same universe. Lacks universe consistency (Girard's paradox theoretically possible but pragmatically irrelevant). Generalizes universe-stratified systems.` },

  { id: 'strict-vs-lazy', title: 'Strict vs Lazy', tags: 'Runtime, Decision, Speculative',
    body: `Yap is strict (CBV). Lazy evaluation considered and not adopted. Contrasts with CBV evaluation. Strictness simplifies reasoning about effects and resource usage.` },

  { id: 'cas-instead-of-smt', title: 'CAS instead of SMT', tags: 'Verification, Speculative',
    body: `Speculative alternative: computer algebra system instead of SMT for verification. Would handle certain symbolic reasoning differently. Contrasts with SMT translation approach. Addresses potential SMT limitations for algebraic domains.` },

  // ===== BATCH 3: Lowering & IR =====
  { id: 'gram', title: 'GRAM', tags: 'Lowering, Rewriting, Compiler, InProgress',
    body: `Graph Rewriting Abstract Machine. Supersedes MIR as IR approach. Property graph nodes rewritten by DPO rules that progressively refine toward target code. Each pass is a semantics-preserving transformation. Translates to target-specific code via backend passes.` },

  { id: 'dpo-rewriting', title: 'DPO Rewriting', tags: 'Rewriting, Lowering, Mechanism, InProgress',
    body: `Double-pushout graph rewriting. Implements GRAM's rewriting engine. L ← K → R rule application on property graphs. Traverses property graph for pattern matching (rule LHS). Inspired by PBPO+, GrGen, Ehrig et al.` },

  { id: 'structural-vs-representational-passes', title: 'Structural vs Representational Passes', tags: 'Lowering, Compiler, Concept, InProgress',
    body: `Ordering principle for GRAM passes. Structural passes (eta/beta/fold) before representational passes (closure-conv, defunctionalization). Distinguishes semantic refinement from representation decisions.` },

  { id: 'closure-conversion', title: 'Closure Conversion', tags: 'Lowering, Mechanism, Implemented',
    body: `Lambda → environment + function pointer pair. Erases lexical scope by flattening to heap allocation. Standard approach for MIR/JS backends. Contrasts with defunctionalization and native λ (HVM).` },

  { id: 'defunctionalization', title: 'Defunctionalization', tags: 'Lowering, Mechanism, Speculative',
    body: `Alternative to closure conversion: tagged dispatch on function identity. Translates to switch-case on function ID. Specialization of lowering for GPU/HVM targets where closures are expensive.` },

  { id: 'native-lambda-hvm', title: 'Native λ (HVM)', tags: 'Lowering, Backend, Speculative',
    body: `For HVM target: keep lambdas as interaction net nodes (optimal reduction). Rejects closure conversion. Preserves optimal reduction semantics. Requires interaction nets which need raw λ.` },

  { id: 'mir-retrospective', title: 'MIR Retrospective', tags: 'Lowering, Decision',
    body: `Lessons learned from MIR development. Closure conversion baked too deeply into the IR. Single-pass lowering made it hard to separate concerns. Motivates GRAM's multi-pass approach.` },

  { id: 'gram-step-1', title: 'GRAM Step 1', tags: 'Lowering, Rewriting, InProgress',
    body: `First implementation milestone: EB.Term → property graph (GRAM nodes). Translates elaborated terms into the initial graph representation that subsequent passes will rewrite. Partial implementation of GRAM.` },

  { id: 'gram-as-s-expressions', title: 'GRAM as S-expressions (Rejected)', tags: 'Lowering, Rewriting, Rejected',
    body: `Considered and rejected: representing GRAM as s-expressions. Rejected in favor of property graph representation which enables proper DPO rewriting.` },

  { id: 'logram', title: 'LoGRAM', tags: 'Lowering, Rewriting, Speculative',
    body: `Speculative substrate: GRAM backed by a logic programming / triple-store / Datalog engine. Translates to triple store facts. Inspired by egglog (equality saturation + Datalog fusion). Extends GRAM.` },

  { id: 'typed-pass-composition', title: 'Typed Pass Composition', tags: 'Lowering, Rewriting, TypeSystem, Speculative',
    body: `Speculative extension to GRAM: type-safe pass composition where pass interfaces are checked at compile time. Inspired by Idris 2 / Lean 4 approach to verified transformations.` },

  { id: 'passes-in-yap', title: 'Passes in Yap', tags: 'Lowering, Rewriting, Speculative',
    body: `Speculative: write GRAM passes in Yap itself. Self-hosting the compiler passes. Inspired by Lean 4 (bootstrapping) and Stratego (rewrite rule API). Extends GRAM.` },

  { id: 'pattern-matching-compilation', title: 'Pattern Matching Compilation', tags: 'Lowering, Mechanism, Implemented',
    body: `Maranget-style decision tree construction. Compiles pattern match expressions into efficient dispatch code. Translates to decision trees. Dispatches on pattern shape (variant, struct, lit, list). Lowers to MIR.` },

  { id: 'saturation', title: 'Saturation (Lowering)', tags: 'Lowering, FFI, Mechanism, Implemented',
    body: `Rewrites application chains for known-arity foreign/ref functions. Collapses into primop nodes. Dispatches on arity. Part of MIR lowering.` },

  // ===== BATCH 4: Core Mechanisms =====
  { id: 'zonking', title: 'Zonking', tags: 'Elaboration, Unification, Mechanism, Implemented',
    body: `Applies substitution to resolve meta-variables after solving. Traverses EB.Term + NF.Value replacing metas with their solutions. Follows solver — runs after constraint solving produces a substitution.` },

  { id: 'solver', title: 'Solver', tags: 'Elaboration, Unification, Mechanism, Implemented',
    body: `\`solve(constraints)\`: partitions into assign + resolve. Processes assigns sequentially (each unification accumulates substitution). Then resolves implicits against zonked context. Returns \`{ zonker: Subst, resolutions }\`. Dispatches on constraint type. Delegates to unification and implicit resolution.` },

  { id: 'nondeterminism', title: 'Nondeterminism (Solver)', tags: 'Continuation, Unification, Mechanism, Implemented',
    body: `Multishot replay mechanism. When MutState.nondeterminism.solution is non-empty (multishot continuation used resume multiple times), computes cartesian product of all solutions. Instantiates solution combinations via R.sequence. Enables multi-shot continuations — \`k(1)\` and \`k(2)\` produce independent evaluation paths.` },

  { id: 'whnf-vs-full-normalization', title: 'WHNF vs Full Normalization', tags: 'Normalization, Elaboration, Concept, Decision',
    body: `Elaboration uses WHNF only (head reduction sufficient for dispatch). Unification uses full normalization (structural comparison needs fully reduced terms). Boundary must be codified. Constrains trampoline evaluator evaluation depth.` },

  { id: 'whnf-codification', title: 'WHNF Codification', tags: 'Normalization, Elaboration, Planned',
    body: `Planned: formalize the WHNF/full-NF boundary in the codebase. Currently implicit — elaboration calls evaluate in WHNF mode, unification in full mode. Would make the distinction explicit and documented.` },

  { id: 'smt-translation', title: 'SMT Translation', tags: 'Verification, Mechanism, Implemented',
    body: `EB.Term → Z3. Sorts: Num→Real, Bool→Bool, strings/types/rows/mu uninterpreted. Functions as SMT arrays + select. Translates to Z3 sorts and assertions. Traverses EB.Term producing Z3 expressions. Erases higher-order structure. Being superseded by VC IR (Batch 9).` },

  { id: 'vc-provenance', title: 'VC Provenance', tags: 'Verification, Tracing, Mechanism, Planned',
    body: `Extends verification pipeline. Reports verification failures with source location and counterexample context. Addresses error quality for refinement type violations.` },

  { id: 'elaboration-context', title: 'Elaboration Context', tags: 'Elaboration, Mechanism, Implemented',
    body: `Central context threaded through all elaboration phases. Contains: env (bindings), sigma (dependent field references), implicits (Δ), constraints, mutable state, provenance trace. Threaded through V2 monad (Reader component). Enables all elaboration mechanisms.` },

  { id: 'monad-split', title: 'Monad Split', tags: 'Elaboration, Mechanism, Planned',
    body: `Planned revision of V2 monad. Current monad carries too many concerns (context, constraints, mutable state, errors, provenance). Split into focused components. Addresses coupling.` },

  // ===== BATCH 5: Design Decisions =====
  { id: 'usages-deferred', title: 'Usages Deferred to Verification', tags: 'Modality, Verification, Decision',
    body: `Decision: multiplicity analysis moves from elaboration to verification pass. Deprecates QTT usage collection during elaboration. Delegates to verification pipeline. Engineering work remains to fit analysis into verification and redirect output to lowering.` },

  { id: 'types-as-terms', title: 'Types as Terms', tags: 'TypeSystem, Dependent, Decision',
    body: `Design decision: types live in the same syntactic category as terms. Relies on dependent types. Types normalize to NF.Value just like terms. Enables Type : Type. Simplifies the evaluator — no separate type-level evaluator needed.` },

  { id: 'levels-vs-indices', title: 'Levels vs Indices (Decision)', tags: 'Normalization, Elaboration, Decision',
    body: `Decision to use de Bruijn indices in EB.Term and de Bruijn levels in NF.Value. Levels avoid shifting during evaluation under binders. Indices are natural for syntax. Level-to-index conversion bridges the two during quoting. Distinguishes evaluation representation from syntax representation.` },

  { id: 'deferred-constraint-solving', title: 'Deferred Constraint Solving', tags: 'Elaboration, Inference, Decision',
    body: `Decision: constraints are not solved eagerly during elaboration. Instead, collected and solved at let boundaries (batch processing). Enables let-polymorphism (metas generalized before solving) and implicit resolution (deferred for full context). Relies on solver dispatch.` },

  { id: 'branded-types', title: 'Branded Types (Decision)', tags: 'Elaboration, Normalization, Decision',
    body: `Decision: EB.Term and NF.Value are branded types (\`Types.Brand\`) with auto-incrementing IDs. Prevents accidental mixing of elaborated terms and normal forms at the type level. Distinguishes the two representations for safety.` },

  { id: 'generator-monad', title: 'Generator Monad (Decision)', tags: 'Elaboration, Mechanism, Decision',
    body: `Decision: implement the elaboration monad as a JavaScript generator (V2 Do notation). Encodes ReaderWriterStateEither as generator yield protocol. Chosen for readability over fp-ts pipe chains. Simpler debugging.` },

  { id: 'structural-row-based-types', title: 'Structural Row-Based Types (Decision)', tags: 'TypeSystem, RowTypes, Decision',
    body: `Foundational decision: all composite types are structural and row-based. Rejects nominal typing as the primary mechanism. Motivates row-polymorphism commitment. Forms all composite data (records, variants, tuples, lists, dicts).` },

  { id: 'bidirectional-checking-decision', title: 'Bidirectional Checking (Decision)', tags: 'Elaboration, Inference, Decision',
    body: `Decision: use bidirectional type checking (infer + check modes). Dispatches on mode — infer synthesizes types, check pushes expected types inward. Mode switch triggers implicit insertion. Informed by Dunfield & Krishnaswami.` },

  // ===== BATCH 6: Roadmap, Vision, Research & Influences =====
  { id: 'equirecursive-types', title: 'Equirecursive Types (Coinduction)', tags: 'TypeSystem, Recursion, Planned',
    body: `Current: μ-unfolding with 1000-step iteration limit (prevents infinite loops in type-level computation). Recursive data structures typecheck but infinite ones fail to evaluate. Planned: full bisimulation-based equality per Amadio & Cardelli (1993) / Brandt & Henglein (POPL'98). Deferred because current approach handles 99% of cases.` },

  { id: 'termination-checking', title: 'Termination Checking', tags: 'TypeSystem, Verification, Speculative',
    body: `Sized types / measures for proving termination. High complexity. Would extend equirecursive types with guardedness/contractiveness checks. Speculative — no concrete plan.` },

  { id: 'dynamic-reflection', title: 'Dynamic / Reflection', tags: 'TypeSystem, Runtime, Speculative',
    body: `\`Dynamic\` with safe casts gated by proofs. Coerces to static types via proof-gated cast. Composes with verification. Speculative.` },

  { id: 'logic-programming', title: 'Logic Programming', tags: 'Elaboration, Research, Speculative',
    body: `miniKanren-like relational fragments. R&D exploration. Speculative — would enable relational type-level computation.` },

  { id: 'yap-explore', title: 'yap explore', tags: 'Tooling, Project, Implemented, InProgress',
    body: `Web dashboard showing all pipeline stages (Parsed, Elaborated, Type, NF, Constraints, Metas, Verify, MIR, GRAM, JS, C, Erlang). Future ideas: error provenance trace tree, cross-highlighting, diff mode, snippet library, timing, d3 graph viz.` },

  { id: 'lsp', title: 'LSP', tags: 'Tooling, Planned',
    body: `Language server protocol implementation. P1 priority. Would enable IDE integration (completions, diagnostics, go-to-definition).` },

  { id: 'mlir-influence', title: 'MLIR (Influence)', tags: 'Lowering, Compiler, Research',
    body: `Primary influence on GRAM's open vocabulary / dialect / pass concept. Multi-level IR with extensible dialects mirrors GRAM's tag vocabularies and rewrite rules.` },

  { id: 'nanopass-influence', title: 'Nanopass (Influence)', tags: 'Lowering, Compiler, Research',
    body: `Small composable passes. Influenced GRAM pipeline thinking. Many-small-passes philosophy. Contrasts with MIR lowering's monolithic transforms.` },

  { id: 'compcert-cakeml-influence', title: 'CompCert/CakeML (Influence)', tags: 'Lowering, Verification, Research',
    body: `"Refinement" terminology. Verified compilation as aspiration. Each GRAM pass should be a provably correct refinement step. Inspires verification pipeline (verified compilation aspiration).` },

  { id: 'egglog-influence', title: 'egglog (Influence)', tags: 'Rewriting, Research',
    body: `Equality saturation + Datalog fusion. Ties to LoGRAM speculation. E-graph rewriting semantics as potential substrate for GRAM. Mirrors LoGRAM (equality saturation ↔ graph saturation).` },

  { id: 'stratego-influence', title: 'Stratego/XT (Influence)', tags: 'Rewriting, Research',
    body: `\`where\` clauses, strategy combinators. Influenced DPO rule design and the concept of strategy languages for rewriting. Inspires Passes in Yap (rewrite rule API concept).` },

  { id: 'thorin-mimir-influence', title: 'Thorin/MimIR (Influence)', tags: 'Lowering, Research',
    body: `"Calls = jumps" insight. CPS vs direct style. Influenced MIR retrospective. Contrasts with MIR lowering approach (CPS vs direct).` },

  { id: 'petricek-orchard', title: 'Petricek & Orchard Coeffects', tags: 'Effect, Modality, Research, Paper',
    body: `"Coeffects: a calculus of context-dependence" (2014). Inspires implicits-as-coeffects vision and effects-as-modality speculation. Provides the theoretical framework for treating implicit resolution as a coeffect.` },

  { id: 'documentation-debt', title: 'Documentation Debt Registry', tags: 'Project, Infrastructure, Problem',
    body: `README, examples/README, FAQ all have drift from current implementation. Tracked in KNOWN-DOC-ISSUES.md but unfixed. Applies to yap project broadly.` },

  // ===== BATCH 7: Typing Rules =====
  { id: 'typing-rules', title: 'Typing Rules (Spec)', tags: 'TypeSystem, Elaboration, Concept, Implemented',
    body: `Formal rules in spec.md. Reference zettel linking to individual rule zettels. Dispatches on judgment form (Γ ⊢ e ⇐ A vs Γ ⊢ e ⇒ A). Composes with bidirectional checking. Forms the type-theoretic foundation of Yap.` },

  { id: 'modality-drift', title: 'Modality Drift: Annotation vs Type Former', tags: 'TypeSystem, Modality, Elaboration, Decision, Drift',
    body: `Spec says modality is a type former (⟨q⟩A : Type). Implementation treats it as an annotation that is stripped during inference. Deliberate decision: defer enforcement to verification. Motivates modality enforcement planned work.` },

  { id: 'block-level-using-gap', title: 'Block-level Using Gap', tags: 'Elaboration, Inference, Problem, Incomplete',
    body: `\`using\` extends Δ at module level (module.ts) but NOT at block level. Spec says it should work locally. Likely implementation gap — needs investigation and fix.` },

  { id: 'missing-spec-shift-reset', title: 'Missing Spec: Shift/Reset Typing', tags: 'Continuation, TypeSystem, Incomplete',
    body: `Full continuation typing is implemented (inference/shift.ts, reset.ts) but not formalized in spec.md. Implementation is ahead of specification.` },

  { id: 'missing-spec-let-polymorphism', title: 'Missing Spec: Let-Polymorphism', tags: 'Inference, TypeSystem, Incomplete',
    body: `Generalization at let boundaries is implemented (normalization/generalization.ts) but not in spec. Spec has plain Let rule only. Implements let-polymorphism (existing zettel concept).` },

  { id: 'missing-spec-sigma-types', title: 'Missing Spec: Sigma Types', tags: 'TypeSystem, Dependent, RowTypes, Incomplete',
    body: `Sigma (dependent record) encoding fully implemented, not in spec. No formation/intro/elim rules formalized. Implementation includes full Sigma encoding with field-dependency semantics.` },

  { id: 'missing-spec-recursive-types', title: 'Missing Spec: Recursive Types (Mu)', tags: 'TypeSystem, Recursion, Incomplete',
    body: `Mu typing (fixpoint detection + muContext) fully implemented but not in spec. Implementation detects recursive let bindings and wraps in Mu type. No formal typing rule exists.` },

  // ===== BATCH 8a: Unification, Constraints, Row Rewriting =====
  { id: 'unification-algorithm', title: 'Unification Algorithm', tags: 'Unification, Elaboration, Mechanism, Implemented',
    body: `Pattern-match dispatch on [NF.Value, NF.Value] pairs. First unwraps Neutrals, then forces/zonks both sides. Cases: Flex-Flex, Flex-Rigid, Lit-Lit, Pi-Pi / Lambda-Lambda / Mu-Mu / Sigma-Sigma (structural recursion with closure application at lvl+1), Schema-Schema / Variant-Variant / Struct-Struct, App-App (with Mu unfold attempt), Row-Row (delegates to row unification), Modal, Foreign, StuckMatch. Traverses NF.Value recursively. Normalizes to solved substitution.` },

  { id: 'flex-flex-unification', title: 'Flex-Flex Unification', tags: 'Unification, Elaboration, Mechanism, Implemented',
    body: `When both sides are unsolved metas: bind meta1 to meta2, then unify their annotations. Key: binds the LEFT meta to the RIGHT value (arbitrary but consistent). Specializes unification algorithm. Resolves meta-variable pairs.` },

  { id: 'flex-rigid-unification', title: 'Flex-Rigid Unification', tags: 'Unification, Elaboration, Mechanism, Implemented',
    body: `Already-solved metas chase through the substitution and retry. Unsolved metas are bound to the rigid value via \`bind()\` (applies occurs check). Specializes unification algorithm. Recovers from solved metas by chasing through substitution.` },

  { id: 'mu-type-unification', title: 'Mu-type Unification (Equirecursive)', tags: 'Unification, Recursion, TypeSystem, Mechanism, Implemented',
    body: `When one side is Mu: unfold it (\`NF.apply(mu.binder, mu.closure, mu)\`) and recurse. When both are App: attempt \`NF.unfoldMu\` on each. Simple unfolding, not full bisimulation. Context extended with \`unfoldMu\` for termination tracking. Rewrites Mu wrappers.` },

  { id: 'occurs-check', title: 'Occurs Check', tags: 'Unification, Mechanism, Implemented',
    body: `\`occursCheck(ctx, meta, ty)\`: walks NF.Value checking if meta appears. Traverses: Neutral unwrap, Lambda/Pi/Sigma closures, App, Modal, Rows. Detects cyclic types (meta in its own solution). On failure: currently throws — should produce Mu wrapping but doesn't yet. Constrains unification.` },

  { id: 'row-unification-mechanism', title: 'Row Unification', tags: 'Unification, RowTypes, Mechanism, Implemented',
    body: `Unifies NF.Row pairs. Cases: empty-empty (done), var-var (equality), meta-var (bind to row), extension-_ (rewrite target to find matching label, then unify values + recurse on tails). Delegates to row rewriting for label lookup. Instantiates fresh metas for unknown row tails. References Leijen "Extensible records with scoped labels."` },

  { id: 'constraint-types', title: 'Constraint Types', tags: 'Unification, Elaboration, Concept, Implemented',
    body: `Two active types: (1) \`assign { left: NF.Value, right: NF.Value, lvl }\` — triggers unification. (2) \`resolve { meta, value, implicits }\` — triggers Δ lookup. \`usage\` exists but is commented out (deferred to verification). Dispatches on constraint shape.` },

  { id: 'solver-dispatch', title: 'Solver Dispatch', tags: 'Unification, Elaboration, Mechanism, Implemented',
    body: `\`solve(constraints)\`: partitions into assign + resolve. Processes assigns sequentially via \`_solve\` (each accumulates substitution). Then resolves implicits. Returns \`{ zonker: Subst, resolutions }\`. Delegates to unification (assign) and implicit resolution (resolve). Resolves constraints to produce substitution.` },

  { id: 'implicit-resolution-solver', title: 'Implicit Resolution (Solver)', tags: 'Inference, Unification, Mechanism, Implemented',
    body: `Looks up in Δ (implicits list) by attempting unification with each candidate. Rejects implicits that produce non-empty substitutions — avoids prematurely instantiating other metas, preserving polymorphism. Already-zonked metas skipped. Aligns with Idris 2 / Lean 4 approach.` },

  { id: 'substitution-system', title: 'Substitution System', tags: 'Unification, Elaboration, Mechanism, Implemented',
    body: `\`Subst = Record<number, NF.Value>\` branded with unique symbol (prevents accidental mixing). \`compose(newer, old) = { ...old, ...newer }\` (newer shadows old). \`of(key, val)\` creates singleton. Simple — no chase-on-access; force/zonk handles deref. Wraps Record<number, NF.Value> for type safety. Zonks meta-variables.` },

  { id: 'row-data-structure', title: 'Row Data Structure', tags: 'RowTypes, Concept, Implemented',
    body: `Generic \`Row<T, V> = empty | extension { label, value, row } | variable { variable }\`. Parameterized: T=value type, V=variable type. Used at EB level and NF level. Operations: fold, traverse, append, rewrite, display, Constructors. Forms the basis of all row-backed types.` },

  { id: 'row-rewriting', title: 'Row Rewriting (Label Lookup)', tags: 'RowTypes, Unification, Mechanism, Implemented',
    body: `Finds a label in a row and restructures so it's at the head. If label at head: return as-is. If deeper: recurse into tail, reconstruct with current head prepended. If variable tail: calls \`onVar\` callback (creates fresh metas during unification). Returns Either (Left = not found, Right = restructured). Core mechanism enabling row polymorphism — label order irrelevant.` },

  // ===== BATCH 8b: Sigma and De Bruijn Machinery =====
  { id: 'sigma-bindings', title: 'Sigma Bindings (:fieldName)', tags: 'Elaboration, RowTypes, Dependent, Mechanism, Implemented',
    body: `\`:fieldName\` syntax resolves to sigma environment entries. \`Context.sigma: Record<string, Sigma>\`. \`inSigmaContext(row, action)\`: pre-populates sigma with fresh metas per label, enabling later fields to reference earlier ones. Key mechanism for dependent records (\`{ fst: Type, snd: :fst }\`). Instantiates fresh metas per field. Threads through elaboration context.` },

  { id: 'label-lookup', title: 'Label Lookup', tags: 'Elaboration, RowTypes, Mechanism, Implemented',
    body: `When a variable has type "label" (\`:varname\` syntax): looks up \`ctx.sigma[variable.value]\`. Returns sigma entry's \`nf\` as the type. Separate from bound/free variable lookup — labels can't be shadowed. Dispatches on variable type (label type triggers sigma path). Resolves label references.` },

  { id: 'de-bruijn-indices', title: 'De Bruijn Indices (EB)', tags: 'Elaboration, Normalization, Mechanism, Implemented',
    body: `EB.Term uses de Bruijn indices (\`{ type: "Bound", index: N }\`). Index 0 = most recently bound. \`lookup\` computes index by counting distance from top of env. \`bind\` prepends to env — new binding is always at index 0. Encodes binding distance.` },

  { id: 'de-bruijn-levels', title: 'De Bruijn Levels (NF)', tags: 'Normalization, Mechanism, Implemented',
    body: `NF.Value uses de Bruijn levels (\`{ type: "Bound", lvl: N }\`). Level = position from bottom of context (stable under extension). \`bind\` creates \`Rigid(env.length)\` — each new binder gets a fresh level. Levels avoid shifting during evaluation under binders. Encodes binding position.` },

  { id: 'level-to-index-conversion', title: 'Level-to-Index Conversion', tags: 'Normalization, Elaboration, Mechanism, Implemented',
    body: `\`lvl2idx(ctx, lvl) = ctx.env.length - 1 - lvl\`. Used during quoting: NF level → EB index. Core of NbE: evaluate converts indices to levels, quote converts levels back. Bridges de Bruijn indices and levels. Translates to EB.Term indices.` },

  { id: 'quoting', title: 'Quoting (Readback)', tags: 'Normalization, Mechanism, Implemented',
    body: `\`quote(ctx, lvl, val: NF.Value): EB.Term\`. Converts NF values back to EB terms. Key cases: Bound level → index, Meta → chase zonker, Neutral → unwrap, Abs → apply to fresh Rigid(lvl) then quote body at lvl+1, Sigma → apply to annotation. Quotes to EB.Term (NF.Value → EB.Term readback). Traverses NF.Value. Dispatches on NF.Value shape.` },

  { id: 'context-operations', title: 'Context Operations', tags: 'Elaboration, Mechanism, Implemented',
    body: `\`bind(ctx, binder, ann)\`: prepend to env with Rigid(env.length). \`extend(ctx, binder, value)\`: bind with known value (let). \`augment(ctx, binder, ann)\`: append (unusual, non-standard). \`unfoldMu(ctx, binder, mu)\`: stores mu type as NF (recursive self-reference). \`muContext(ctx)\`: renames Let → Mu binders. \`prune(ctx, lvl)\`: trim env. Enables elaboration context. Threads through all phases.` },

  // ===== BATCH 8c: Nondeterminism and Evaluation Internals =====
  { id: 'nondeterminism-multishot', title: 'Nondeterminism (Multishot Replay)', tags: 'Continuation, Unification, Mechanism, Implemented',
    body: `\`replay(action)\`: when nondeterminism.solution is non-empty (multishot resume used multiple times), computes cartesian product of all solutions via R.sequence. Executes action for each combination, threading solution as zonker. Returns array of results. If no nondeterminism: single execution. Enables multi-shot continuations. Instantiates solution combinations. Threads through MutState.` },

  { id: 'trampoline-evaluator', title: 'Trampoline Evaluator', tags: 'Normalization, Performance, Mechanism, Implemented',
    body: `Stack-based evaluation to prevent stack overflow. Two GLOBAL stacks: workStack (frames) and resultStack (values). Frame types: Eval { ctx, term }, Cont { arity, handler }, Delimiter { ctx, resultSize }. Each evaluate() tracks initial stack position. Heap-allocated, not JS call stack. Wraps evaluation in heap-allocated frames. Dispatches on frame type. Preserves evaluation semantics.` },

  { id: 'evaluation-step-limit', title: 'Evaluation Step Limit', tags: 'Normalization, Performance, Mechanism, Implemented',
    body: `\`maxSteps = 10_000_000\` (default). Counter increments per work frame. Throws on exceed: "Evaluation exceeded maximum steps... Possible infinite loop". Prevents non-termination during type-level computation. Constrains trampoline evaluator. Detects infinite loops.` },

  { id: 'variable-evaluation-dispatch', title: 'Variable Evaluation Dispatch', tags: 'Normalization, Mechanism, Implemented',
    body: `Meta: check skolems → check zonker (re-evaluate quoted) → Neutral(Var). Bound: lookup in env, wrap Mu-bound in Neutral. Free: tie the knot. Label: lookup sigma.nf. Foreign: lookup ffi. Dispatches on variable kind (Meta, Bound, Free, Label, Foreign). Resolves metas. Implements (Var) typing rule.` },

  { id: 'application-evaluation', title: 'Application Evaluation', tags: 'Normalization, Mechanism, Implemented',
    body: `Push Cont(arity=2, handler=apply) then push arg eval then func eval. Handler matches func: Abs → apply closure, External → accumulate arg (partial application, call compute when saturated), PrimOp → δ-reduce if fully applied literals. Dispatches on func shape. Delegates to closures for Abs case. Implements (App) typing rule at NF level.` },

  { id: 'knot-tying', title: 'Knot-tying (Recursive Evaluation)', tags: 'Normalization, Recursion, Mechanism, Implemented',
    body: `Free variable evaluation: extend context with placeholder Bound(lvl) entry, push Cont that writes result back into entry's nf field, then evaluate. Entry mutated in place, enabling self-reference. Same mechanism for recursive let bindings. Instantiates placeholder. Wraps recursive self-reference. Enables recursive let evaluation and Mu-type unification.` },

  // ===== BATCH 8d: Error System, Provenance, Pretty Printing =====
  { id: 'error-causes', title: 'Error Causes (Err.Cause)', tags: 'ErrorHandling, Elaboration, Mechanism, Implemented',
    body: `Discriminated union: UnificationFailure, RigidVariableMismatch, RowMismatch, MissingLabel, TypeMismatch, Impossible, MultiplicityMismatch. Each has constructor function. \`display\` renders with zonked NF values. Reports type errors for humans. Dispatches on cause variant.` },

  { id: 'error-propagation', title: 'Error Propagation (V2.fail)', tags: 'ErrorHandling, Elaboration, Monad, Mechanism, Implemented',
    body: `\`V2.fail(cause)\`: lifts Err.Cause into monad's Either (Left channel). Errors propagate through generator yield — failed step aborts current Do block. Errors carry provenance trace. Propagates via V2.fail and generator yield.` },

  { id: 'provenance-system', title: 'Provenance System', tags: 'Tracing, Elaboration, Mechanism, Implemented',
    body: `\`Provenance\` = discriminated union tracking what triggered each elaboration step. Tags: src (source term), eb (elaborated term), nf (normal form), alt (match alternative), unify (unification). Each carries optional Metadata. \`WithProvenance<T>\` adds trace. Threads through elaboration context (ctx.trace stack). Wraps elaboration steps.` },

  { id: 'v2-track', title: 'V2.track (Provenance Threading)', tags: 'Tracing, Elaboration, Monad, Mechanism, Implemented',
    body: `\`track(provenance, action)\`: extends ctx.trace with provenance entry before running inner action. Every inference/checking/unification function wraps its body in V2.track. Builds breadcrumb stack. On error, accumulated trace shows full path from top-level to failure. Implements provenance system. Extends V2 monad. Threads through provenance entries per step.` },

  { id: 'provenance-display', title: 'Provenance Display', tags: 'Tracing, ErrorHandling, Mechanism, Implemented',
    body: `Renders provenance stack in reverse (most recent first), capped to 10 entries. Shows what was being checked/inferred/unified and where. Includes metadata: "While checking X against Y", "While inferring X", "While unifying X with Y". Source locations from CST location.from.{line, column}. Reports error paths. Traverses provenance stack.` },

  { id: 'pretty-printing', title: 'Pretty Printing (EB.Display)', tags: 'Display, Elaboration, Mechanism, Implemented',
    body: `Namespace \`Display\`: Term, Constraint, Context, Env, Alternative, Pattern, Statement. Uses DisplayContext. Renders: Bound vars by name, Free/Foreign/Label, Metas (chase zonker or ?N), Pi/Lambda/Sigma binders with arrows, App with precedence, Rows via R.display, Match/Block/Modal/Reset/Shift. Dispatches on EB.Term shape. Reports elaboration output.` },

  { id: 'nf-display', title: 'NF.display', tags: 'Display, Normalization, Mechanism, Implemented',
    body: `Parallel to EB.Display.Term but for NF.Value. Quotes values back to EB terms via NF.quote then delegates to EB.Display.Term, or renders directly for simple cases. Uses same DisplayContext. Used by error display, provenance, pretty printing everywhere. Quotes to EB.Term then renders.` },

  // ===== BATCH 8e: Term Representations, Testing, Parser, Explorer =====
  { id: 'src-term', title: 'Src.Term (Source AST)', tags: 'Syntax, AST, Concept, Implemented',
    body: `\`Src.Term = WithLocation<Bare>\`. Lowercase discriminants: lit, var, hole, arrow, lambda, pi, application, annotation, list, tuple, struct, dict, tagged, variant, row, injection, projection, match, block, modal, reset, shift, resume. Carries WithLocation (source span). Variable = WithLocation<{ type: "name" | "label", value: string }>. Statement types: expression, let, using, foreign.` },

  { id: 'eb-term', title: 'EB.Term (Elaborated Term)', tags: 'Elaboration, AST, Concept, Implemented',
    body: `Branded type with auto-incrementing IDs. Uppercase discriminants: Lit, Var, Abs, App, Row, Proj, Inj, Match, Block, Modal, Reset, Shift. Variable: Bound (de Bruijn index), Free, Foreign, Label, Meta. Binding unifies all binder types: Lambda, Pi, Sigma, Mu, Let — all carry annotation. Alternative carries binders from pattern compilation.` },

  { id: 'nf-value', title: 'NF.Value (Normal Form)', tags: 'Normalization, AST, Concept, Implemented',
    body: `Branded type with IDs. Constructors: Var, Lit, App, Row, Abs (closure-based — all binder types share one constructor), Neutral (wrapper for unsolved computations), Modal, External (FFI partial application), Existential (verification only). Closure: standard (ctx + term), PrimOp (built-in ops), Continuation (captured frames + results). Variable: Bound { lvl }, Free, Label, Foreign, Meta { val, lvl }.` },

  { id: 'src-to-eb-transformation', title: 'Src → EB Transformation', tags: 'Elaboration, Syntax, Mechanism, Implemented',
    body: `Source terms consumed to produce EB terms during elaboration. Key transformations: arrow → Abs(Pi), lambda → Abs(Lambda), struct/tuple/variant/list/tagged → Row or App wrapping rows, application → App with implicit insertion, block → Block. Holes produce fresh metas. Annotations produce constraints. Dispatches on Src.Term type. Instantiates fresh metas.` },

  { id: 'parser-processors', title: 'Parser Processors', tags: 'Syntax, Mechanism, Implemented',
    body: `Postprocessors for Nearley grammar rules. \`Sourced<T> = [T, Location]\` pattern for threading source spans. Functions: Name, Arrow, Lambda, Pi, Application, Annotation, Struct, Tuple, List, Variant, Tagged, Dict, Injection, Projection, Match, Block, Modal, Reset, Shift, Resume. Converts raw parse output into Src.Term with source locations. Translates to Src.Term. Dispatches on grammar rule.` },

  { id: 'test-utility', title: 'Test Utility (elaborateFrom)', tags: 'Testing, Elaboration, Infrastructure, Implemented',
    body: `\`elaborate(src)\`: parses let-declaration, resets supplies (meta/var/id), runs full V2.Do pipeline (infer → listen constraints → solve → zonk). Returns { pretty, structure }. Key: EB.resetSupply("meta"); EB.resetSupply("var"); EB.resetId(); NF.resetId() before each test for deterministic snapshots. Snapshots elaboration output.` },

  { id: 'snapshot-testing', title: 'Snapshot Testing Pattern', tags: 'Testing, Infrastructure, Concept, Implemented',
    body: `Tests use Vitest's toMatchInlineSnapshot / toMatchSnapshot. Flow: elaborate(src) → assert structure properties → snapshot pretty fields. Supply resets ensure deterministic IDs. Parser tests: ParserStart selection, results.length === 1, snapshot results[0]. Snapshots pretty-printed results. Preserves determinism via supply resets.` },

  { id: 'repl', title: 'REPL', tags: 'CLI, Infrastructure, Implemented',
    body: `Interactive mode (\`pnpm yap repl\`). Persistent ctx. Multi-line input (braces-balanced buffering). Modes: standard, --mir, --codegen. Features: :reset, :ctx, :verbose toggle. Imports: loads files, builds interface tables. Uses Nearley parser. Threads through persistent context. Dispatches on mode.` },

  { id: 'pipeline-explorer', title: 'Pipeline Explorer', tags: 'Tooling, Infrastructure, Implemented',
    body: `\`yap explore\`: web dashboard showing all pipeline stages. Future ideas in EXPLORER-IDEAS.md: error provenance trace tree, cross-highlighting, diff mode, snippet library, timing, d3 graph viz. Reports pipeline stages (visualizes each transformation step).` },

  { id: 'brainstorming-artifacts', title: 'Brainstorming Artifacts', tags: 'Research, Infrastructure, Reference',
    body: `spec.md (formal typing rules), ROADMAP.md (feature priorities), V2-MIGRATION.md (v1→v2 state), shift-reset.txt (continuation design notes), EXPLORER-IDEAS.md, Backlog.md, lowering/GRAM.md, lowering/concerns.md + references.md. .yap example/test files. Informs roadmap decisions, motivates design choices.` },

  // ===== BATCH 9a: VC IR and Translation Boundary =====
  { id: 'vc-ir', title: 'VC IR', tags: 'Verification, IR, Planned',
    body: `Backend-neutral verification condition representation. Three layers: VC.Sort (Bool, Int, Real, String, Unit, Label, Row, Fn, Uninterpreted), VC.Term (Var, Const, Num, Str, Arith, StrLen, App, RowEmpty, RowExtend, RowSelect), VC.Formula (True, False, Atom, Not, And, Or, Implies, Forall, Exists). Replaces z3-solver expression types. Supersedes SMT translation.` },

  { id: 'vc-normalization', title: 'VC Normalization', tags: 'Verification, Normalization, Planned',
    body: `Pre-solver simplification of VC.Formula: eliminate trivial and/or/not, flatten nested conjunctions/disjunctions, inline implications as Or(Not(a), b) for CNF lowering, fold ground arithmetic and string literals, canonicalize row terms. First pass in solving pipeline.` },

  { id: 'quantifier-preparation', title: 'Quantifier Preparation', tags: 'Verification, Quantifiers, Planned',
    body: `Prenex profitable quantifiers, skolemize existentials under universal context, attach triggers (from guard predicate application and selectors in body), hoist side conditions for strings and rows into theory facts. Second pass in solving pipeline.` },

  { id: 'boolean-lowering-cnf', title: 'Boolean Lowering (CNF)', tags: 'Verification, SAT, Planned',
    body: `Tseitin transformation of VC.Formula into clauses. Atoms remain theory-owned. Origin metadata attached for obligation provenance and future unsat-core reporting. Third pass in solving pipeline.` },

  { id: 'translation-boundary-vc', title: 'Translation Boundary (VC)', tags: 'Verification, Elaboration, Planned',
    body: `TranslationTools: mkSort(nf, ctx) → VC.Sort, translateTerm(nf, ctx, rigids?) → VC.Term, translateFormula(nf, ctx, rigids?) → VC.Formula, quantify(var, ann, body, ctx) → VC.Formula. Minimum structural change to decouple VC generation from Z3. Supersedes current translate.ts.` },

  { id: 'verification-artefacts-revised', title: 'VerificationArtefacts (Revised)', tags: 'Verification, Concept, Planned',
    body: `VerificationArtefacts = { vc: VC.Formula, nf?: NF.Value }. Obligation = { label, expr: VC.Formula, context? }. Replaces current Expr-typed vc field. Supersedes current VerificationArtefacts.` },

  // ===== BATCH 9b: CDCL(T) Solver Core =====
  { id: 'cdcl-t-solver', title: 'CDCL(T) Solver', tags: 'Verification, SAT, Mechanism, Planned',
    body: `Core satisfiability engine. DPLL(T) / CDCL(T) with shared term arena and theory plugins. SAT decides boolean skeleton, theory modules receive asserted literals, theories propagate equalities/bounds/conflicts, quantifier engine injects lemmas between fixpoint rounds. Interface: Solver = { assert, check, push, pop, explain }. SolveResult = sat(model) | unsat(core) | unknown(reason).` },

  { id: 'theory-plugin-interface', title: 'Theory Plugin Interface', tags: 'Verification, Mechanism, Planned',
    body: `Theory = { name, init(ctx), assertLit(lit, ctx), check(ctx), push(ctx), pop(ctx) }. Theories register with CDCL core. Each receives literals and propagates theory consequences. Standard push/pop for backtracking. Modular: new theories addable without changing core.` },

  { id: 'verification-backend', title: 'VerificationBackend', tags: 'Verification, Infrastructure, Planned',
    body: `VerificationBackend = { solve(vc, obligations) → SolveResult }. Replaces Z3 as backend parameter to VerificationServiceV2. Service shape unchanged: createCheck, createSynth, createSubtype, createTranslationTools wire around the backend. Wraps CDCL(T) solver.` },

  { id: 'solver-module-layout', title: 'Solver Module Layout', tags: 'Verification, Infrastructure, Planned',
    body: `src/verification/solver/: ir.ts, normalize.ts, skolem.ts, cnf.ts, solver.ts, context.ts, trail.ts, explain.ts. Subdirs: euf/ (arena, cc, ematch), arithmetic/ (normalize, simplex, bounds, branch), strings/ (terms, normalize, solver), rows/ (normalize, solver), quantifiers/ (triggers, mbqi, solver). Encodes separation of concerns.` },

  // ===== BATCH 9c: Theory Modules =====
  { id: 'euf-theory', title: 'EUF Theory', tags: 'Verification, Unification, Mechanism, Planned',
    body: `Hash-consed term arena + union-find congruence closure. Responsibilities: intern application terms, maintain equivalence classes, propagate equalities from congruent parents, provide canonical representatives, feed trigger matching. Enode: id, head, args, sort, parent, rank, classNext, parents, generation. Operations: intern(term), merge(a, b, reason).` },

  { id: 'arithmetic-theory', title: 'Arithmetic Theory', tags: 'Verification, Arithmetic, Mechanism, Planned',
    body: `Mixed linear integer/real arithmetic. Simplex tableau for linear constraints, bounds propagation, branch-and-bound for integer variables. Normalization: fold ground, rewrite identities, linearize constant-coefficient products, rewrite div by constants. Built dual-sorted (Int + Real). Dispatches on sort.` },

  { id: 'string-theory', title: 'String Theory', tags: 'Verification, Strings, Mechanism, Planned',
    body: `Dedicated string theory (not pure EUF). Supported: =, concat, len, prefix, suffix, contains. Core: normalize concatenation to flat forms, word equations via prefix/suffix decomposition, emit arithmetic lemmas for lengths, reduce prefix/suffix/contains into concat equalities + fresh witnesses. Delegates to arithmetic theory for lengths.` },

  { id: 'row-theory', title: 'Row Theory', tags: 'Verification, RowTypes, Mechanism, Planned',
    body: `Label-directed row reasoning (not generic array theory). RowTerm = { fields: Map<string, VC.Term>, tail? }. Normalize extensions to canonical label order, collapse overwrites, solve equality/containment by label decomposition, emit child obligations, maintain row-tail substitutions. Aligned with existing subtype.contains() semantics. Mirrors row unification at verification level.` },

  { id: 'quantifier-engine', title: 'Quantifier Engine', tags: 'Verification, Quantifiers, Mechanism, Planned',
    body: `Target: guarded first-order universals + skolemized existentials. Two engines: trigger-based E-matching over EUF arena + bounded model-based quantifier instantiation (MBQI). Trigger extraction: guard predicates and selectors in body. Reject empty triggers → MBQI fallback. Bounded MBQI acceptable because Yap VCs come from local program structure.` },

  // ===== BATCH 9d: SMT Decisions and Milestones =====
  { id: 'z3-replacement-decision', title: 'Z3 Replacement Decision', tags: 'Verification, Decision',
    body: `Replace Z3-specific backend with Yap-owned solver stack. Keep: existing verification pipeline shape, VC generation algorithm, first-order refinement reasoning. Allow: backend-neutral VC IR, normalization/lowering passes. Do not: narrow refinement expressiveness, remove predicate forms. Key structural move: replace direct Z3 construction with VC IR. Motivates VC IR and CDCL(T) solver.` },

  { id: 'num-sort-semantics', title: 'Num Sort Semantics (Open)', tags: 'Verification, Arithmetic, Decision, Speculative',
    body: `Current code maps Num to reals. Options: keep Num=Real + separate Int for lengths, move to Int, keep both and infer per-term. Recommendation: build solver dual-sorted, defer Yap-level mapping. Applies to arithmetic theory.` },

  { id: 'non-linear-arithmetic', title: 'Non-linear Arithmetic (Open)', tags: 'Verification, Arithmetic, Decision, Speculative',
    body: `Primitives include *, /, %. Complete nonlinear solver is separate project. Recommendation: keep operators in IR, support linearizable subset first, add dedicated module later. Keep NbE constant-folding aggressive so ground arithmetic disappears before solver. Constrains arithmetic theory.` },

  { id: 'higher-order-in-formulas', title: 'Higher-order in Formulas (Decision)', tags: 'Verification, TypeSystem, Decision',
    body: `Current verification avoids quantifying over non-first-order types. Decision: keep restriction, represent first-order apps as EUF apps (not arrays), encode higher-order only as opaque constants. Constrains quantifier engine.` },

  { id: 'milestone-1-ir-boundary', title: 'Milestone 1: IR Boundary', tags: 'Verification, Milestone, Planned',
    body: `First deliverable: VC IR + NF.Value→VC translation + optional debug printer. Removes Z3 dependency from VC generation. Exposes exact formula fragment. Makes solver testable independently from elaboration.` },

  { id: 'milestone-2-euf-quant-lia', title: 'Milestone 2: EUF + Quantifiers + LIA', tags: 'Verification, Milestone, Planned',
    body: `Term arena + congruence closure + trigger engine + simplex + branch-and-bound + boolean/CDCL core. Minimum solver for most liquid refinement obligations.` },

  { id: 'milestone-3-strings', title: 'Milestone 3: String Theory', tags: 'Verification, Milestone, Planned',
    body: `Concat normal forms + length coupling to arithmetic + prefix/suffix/contains reductions + witness generation for contains-like constraints.` },

  { id: 'milestone-4-rows', title: 'Milestone 4: Row Theory', tags: 'Verification, Milestone, Planned',
    body: `Canonical row term representation + containment solver + open-row tail unification + nested field obligation emission.` },

  { id: 'milestone-5-explanations', title: 'Milestone 5: Explanations and Models', tags: 'Verification, Milestone, Planned',
    body: `Unsat cores linked to obligations, model fragments for counterexamples, pretty-printer for quantified counterexample contexts.` },

  { id: 'required-formula-forms', title: 'Required Formula Forms', tags: 'Verification, Concept, Implemented',
    body: `Lifted from current verification code: boolean (const, and, or, not, implies), equality/disequality, guarded universal quantification, existential from synth, uninterpreted constants/functions, arithmetic (literals + ops + comparisons), strings (literals + concat + equality), row/schema/variant containment and field projection, recursive subtyping obligations. Constrains VC IR.` },

  { id: 'required-theory-support', title: 'Required Theory Support', tags: 'Verification, Concept, Planned',
    body: `Minimum target: EUF (sorts, symbols, equality, congruence), Arithmetic (LIA + LRA + explicit nonlinear), Quantifiers (universal + guard + instantiation), Strings (equality, concat, length, prefix, suffix, contains), Rows (variables, width subtyping, extension/overwrite, field lookup, dependent field obligations). Constrains theory plugin interface.` },

  // ===== GAP FILLS: Existing zettels with no import match =====
  // These already exist — we just connect them properly
  // neutrals, hindley-milner, system-f, nominal-typing, nominal-subtyping, structural-subtyping
  // are already in z-yap. We do NOT recreate them but DO add new connections.

  // ===== Literature references from Batch 6 that deserve their own zettels =====
  { id: 'idris-2-influence', title: 'Idris 2 (Influence)', tags: 'Elaboration, Dependent, Research',
    body: `Primary influence on meta-variables, bidirectional checking, dependent types, solver design. TT core with unification. Pi types with quantities. Contextual metavariables and deferred solving.` },

  { id: 'agda-influence', title: 'Agda (Influence)', tags: 'Elaboration, Dependent, Research',
    body: `Influences: meta-variables, dependent types, implicit resolution, NbE (evaluation-based normalization), elaboration context (telescopic contexts).` },

  { id: 'lean-4-influence', title: 'Lean 4 (Influence)', tags: 'Elaboration, Normalization, Compiler, Research',
    body: `Influences: NbE, meta-variables, V2 monad (pipeline discipline), zonking (instantiation strategy), structural records (structure resolution). Bootstrapping precedent for passes-in-Yap speculation.` },

  { id: 'ghc-influence', title: 'GHC (Influence)', tags: 'Inference, TypeSystem, Research',
    body: `Influences: let-polymorphism, deferred constraint solving, modalities (levity polymorphism precedent), nondeterminism (constraint solving via backtracking). Type : Type (levity polymorphism as precedent).` },

  { id: 'elm-ocaml-influence', title: 'Elm/OCaml (Influence)', tags: 'RowTypes, TypeSystem, Research',
    body: `Influences: row polymorphism (structural approach), variant types (polymorphic variants à la OCaml). Primary motivation for Yap's structural row-based approach.` },

  { id: 'liquid-haskell-influence', title: 'Liquid Haskell (Influence)', tags: 'Verification, TypeSystem, Research',
    body: `Influences: refinement types (SMT automation), SMT translation (VC generation pipeline). Provides the blueprint for Yap's verification approach. Inspires VC IR formula fragment.` },

  { id: 'dunfield-krishnaswami', title: 'Dunfield & Krishnaswami', tags: 'Inference, TypeSystem, Research, Paper',
    body: `"Complete and Easy Bidirectional Typechecking for Higher-Rank Polymorphism" (2013). Informs bidirectional checking (declarative → algorithmic) and implicit resolution (subsumption in bidirectional systems).` },

  { id: 'mcbride-nuttin', title: 'McBride "I Got Plenty of Nuttin"', tags: 'Elaboration, Inference, Research, Paper',
    body: `Contextual metavariables paper. Informs meta-variables (contextual approach) and zonking (postponed substitution strategy).` },

  { id: 'abel-pientka', title: 'Abel & Pientka', tags: 'Normalization, Unification, Research, Paper',
    body: `Higher-order pattern unification. Informs NbE and unification algorithm (pattern fragment analysis). Key reference for Yap's unification approach.` },

  { id: 'idris-1-qtt-paper', title: 'Idris 1 QTT Paper', tags: 'Modality, TypeSystem, Research, Paper',
    body: `"Quantitative Type Theory" (Atkey 2018, refined by Brady). Inspires modalities (quantity tracking). Foundation for Yap's {0, 1, ω} multiplicity system.` },

  { id: 'maranget-paper', title: 'Maranget (Pattern Compilation)', tags: 'Lowering, Research, Paper',
    body: `"Compiling Pattern Matching to Good Decision Trees" (2008). Decision-tree construction algorithm. Informs pattern matching compilation in Yap's lowering.` },

  // ===== SMT literature from Batch 9 =====
  { id: 'nieuwenhuis-oliveras', title: 'Nieuwenhuis & Oliveras "DPLL(T)"', tags: 'Verification, SAT, Research, Paper',
    body: `"DPLL(T): Fast Decision Procedures." Foundational architecture for SMT solving with theory combination. Informs CDCL(T) solver design.` },

  { id: 'nelson-oppen', title: 'Nelson & Oppen', tags: 'Verification, Research, Paper',
    body: `"Simplification by Cooperating Decision Procedures." Theory combination via shared equalities. Informs the theory plugin interface design.` },

  { id: 'de-moura-bjorner-z3', title: 'de Moura & Bjørner "Z3"', tags: 'Verification, Research, Paper',
    body: `"Z3: An Efficient SMT Solver." Industrial reference implementation. Informs CDCL(T) solver architecture.` },

  { id: 'barbosa-cvc5', title: 'Barbosa et al. "cvc5"', tags: 'Verification, Research, Paper',
    body: `"cvc5: A Versatile and Industrial-Strength SMT Solver." Modern reference implementation. Informs CDCL(T) solver design.` },

  { id: 'liang-strings', title: 'Liang et al. (String Theory)', tags: 'Verification, Strings, Research, Paper',
    body: `"A DPLL(T) Theory Solver for a Theory of Strings and Regular Expressions." Informs string theory design.` },

  { id: 'reynolds-strings', title: 'Reynolds et al. (String Scaling)', tags: 'Verification, Strings, Research, Paper',
    body: `"Scaling Up DPLL(T) String Solvers Using Context-Dependent Simplification." Informs string theory optimizations.` },

  { id: 'ge-de-moura-quantifiers', title: 'Ge & de Moura (Quantifier Instantiation)', tags: 'Verification, Quantifiers, Research, Paper',
    body: `"Complete Instantiation for Quantified Formulas in SMT." Informs quantifier engine design (MBQI, E-matching).` },

  { id: 'dutertre-arithmetic', title: 'Dutertre & de Moura (Linear Arithmetic)', tags: 'Verification, Arithmetic, Research, Paper',
    body: `"A Fast Linear-Arithmetic Solver for DPLL(T)." Informs arithmetic theory design (simplex implementation).` },
];


// === WRITE ZETTEL FILES ===
function writeZettel(z) {
  const tags = mapTags(z.tags);
  const frontmatter = `---\ntags: [${tags.join(', ')}]\n---\n`;
  const content = `${frontmatter}# ${z.title}\n\n${z.body}\n`;
  const path = join(ZETTELS_DIR, `${z.id}.md`);
  writeFileSync(path, content);
}

// Don't overwrite existing zettels that are being kept as-is
const EXISTING_KEEP = new Set([
  'session-lowering-branch-split', // session zettel — don't touch
  'yap',              // enrich via connections only
  'elaboration',      // enrich via connections only
  'nbe',             // enrich via connections only
  'unification',     // enrich via connections only
  'meta-variables',  // enrich via connections only
  'constraint-solving', // enrich via connections only
  'row-polymorphism',  // enrich via connections only
  'row-unification',   // enrich via connections only
  'closures',         // enrich via connections only
  'de-bruijn',        // enrich via connections only
  'bidirectional-checking', // enrich via connections only
  'dependent-types',  // enrich via connections only
  'implicits',       // enrich via connections only
  'elaboration-monad', // enrich via connections only
  'mu-types',        // enrich via connections only
  'generalization',  // enrich via connections only
  'neutrals',        // enrich via connections only
  'hindley-milner',  // enrich via connections only
  'system-f',        // enrich via connections only
  'structural-typing', // enrich via connections only
  'structural-subtyping', // enrich via connections only
  'nominal-typing',  // enrich via connections only
  'nominal-subtyping', // enrich via connections only
]);

let created = 0;
let skipped = 0;

for (const z of zettels) {
  if (EXISTING_KEEP.has(z.id)) {
    skipped++;
    continue;
  }
  writeZettel(z);
  created++;
}

console.log(`Created ${created} zettels, skipped ${skipped} (existing/kept)`);

// === CONNECTIONS ===
// Append new connections to connections.md
// Format: [[source]] --[:LABEL]--> [[target]]  -- note

const connections = [
  // ===== BATCH 1 EDGES =====
  ['yap', 'INCLUDES', 'nearley-parser', 'Parser component'],
  ['yap', 'INCLUDES', 'verification-pipeline', 'Verification component'],
  ['yap', 'INCLUDES', 'mir-lowering', 'Lowering component'],
  ['yap', 'INCLUDES', 'js-codegen', 'JS backend'],
  ['yap', 'INCLUDES', 'c-codegen', 'C backend'],
  ['yap', 'INCLUDES', 'erlang-codegen', 'Erlang backend'],
  ['yap', 'INCLUDES', 'module-system', 'Module component'],
  ['yap', 'INCLUDES', 'compile-orchestration', 'Orchestration'],
  ['nearley-parser', 'PRODUCES', 'elaboration', 'Src.Term'],
  ['nearley-parser', 'TRANSLATES_TO', 'src-term', 'Token stream → AST'],
  ['tree-sitter-parser', 'SUPERSEDES', 'nearley-parser', 'Incremental replaces ambiguous CFG'],
  ['tree-sitter-parser', 'PRODUCES', 'v2-elaboration-pipeline', 'CST.SyntaxNode'],
  ['v2-elaboration-pipeline', 'SUPERSEDES', 'v1-elaboration-pipeline', 'Fresh implementation'],
  ['v2-elaboration-pipeline', 'MIRRORS', 'v1-elaboration-pipeline', 'Same theory, new code'],
  ['v1-elaboration-pipeline', 'PRODUCES', 'eb-term', 'EB.Term output'],
  ['v1-elaboration-pipeline', 'NORMALIZES_TO', 'nf-value', 'Types → normal forms'],
  ['v1-elaboration-pipeline', 'DISPATCHES_ON', 'src-term', 'Source shape drives dispatch'],
  ['verification-pipeline', 'VALIDATES', 'v1-elaboration-pipeline', 'On-demand, not pipeline stage'],
  ['verification-pipeline', 'TRANSLATES_TO', 'smt-translation', 'Types → Z3 assertions'],
  ['verification-pipeline', 'COMPOSES_WITH', 'v1-elaboration-pipeline', 'Post-hoc validation'],
  ['mir-lowering', 'CONSUMES', 'v1-elaboration-pipeline', 'EB.Term input'],
  ['mir-lowering', 'PRODUCES', 'js-codegen', 'MIR → JS'],
  ['mir-lowering', 'PRODUCES', 'c-codegen', 'MIR → C'],
  ['mir-lowering', 'PRODUCES', 'erlang-codegen', 'MIR → Erlang'],
  ['mir-lowering', 'TRANSLATES_TO', 'eb-term', 'EB.Term → SSA blocks'],
  ['mir-lowering', 'ERASES', 'pi-types', 'Types not preserved in MIR'],
  ['mir-lowering', 'TRAVERSES', 'eb-term', 'Pattern-match walk'],
  ['tmp-pipeline-stub', 'BLOCKS', 'v2-elaboration-pipeline', 'Stubs prevent integration'],
  ['usages-deferred', 'DEPRECATES', 'qtt-usage-collection', 'Move to verification'],
  ['module-system', 'RELIES_ON', 'v1-elaboration-pipeline', 'Not yet wired to v2'],
  ['compile-orchestration', 'DELEGATES_TO', 'v1-elaboration-pipeline', 'Current delegation'],
  ['compile-orchestration', 'DELEGATES_TO', 'verification-pipeline', 'On-demand'],
  ['compile-orchestration', 'DELEGATES_TO', 'mir-lowering', 'Lowering step'],

  // ===== BATCH 2a EDGES =====
  ['pi-types', 'EXTENDS', 'dependent-types', 'Universal quantification with dependency'],
  ['pi-types', 'GENERALIZES', 'lambda', 'Arrow → is non-dependent Pi'],
  ['pi-types', 'FORMS', 'lambda', 'Π is formation rule for functions'],
  ['pi-types', 'DUAL_OF', 'sigma-types', 'Universal vs existential'],
  ['pi-types', 'COMPOSES_WITH', 'sigma-types', 'Dependent function returning dependent record'],
  ['pi-types', 'COMPOSES_WITH', 'refinement-types', 'Refined domains/codomains'],
  ['sigma-types', 'EXTENDS', 'dependent-types', 'Existential with row dependency'],
  ['sigma-types', 'USES', 'row-polymorphism', 'Row-backed dependent records'],
  ['sigma-types', 'FORMS', 'structural-records', 'Σ forms dependent record types'],
  ['refinement-types', 'RELIES_ON', 'verification-pipeline', 'Z3 discharges VCs'],
  ['refinement-types', 'COMPOSES_WITH', 'sigma-types', ':fst in predicates'],
  ['refinement-types', 'SUBSUMES', 'pi-types', 'Refined T subtype of T'],
  ['refinement-types', 'COERCES_TO', 'pi-types', 'Forget rule strips predicate'],
  ['modalities', 'APPLIES_TO', 'pi-types', 'Quantity on domain'],
  ['modalities', 'COMPOSES_WITH', 'refinement-types', 'Modal + refined'],
  ['modalities', 'COERCES_TO', 'pi-types', 'Modal stripping during inference'],
  ['variant-types', 'USES', 'row-polymorphism', 'Row-backed unions'],
  ['variant-types', 'DUAL_OF', 'structural-records', 'Sum vs product over rows'],
  ['variant-types', 'MIRRORS', 'structural-records', 'Row-backed dual'],
  ['modality-enforcement', 'FOLLOWS', 'modalities', 'Requires modality definitions'],
  ['modality-enforcement', 'ADDRESSES', 'modalities', 'Enforcement gap'],
  ['modality-polymorphism', 'EXTENDS', 'modalities', 'Polymorphism over modalities'],
  ['modality-polymorphism', 'REQUIRES', 'modality-enforcement', 'Depends on enforcement'],
  ['refinement-inference', 'EXTENDS', 'refinement-types', 'Inferred refinements'],
  ['refinement-inference', 'REVISES', 'modalities', 'Strip → template revision'],

  // ===== BATCH 2b EDGES =====
  ['structural-records', 'USES', 'row-polymorphism', 'Open-tail row structure'],
  ['tuples', 'DESUGARS_TO', 'structural-records', 'Positional labels'],
  ['tuples', 'SPECIALIZES', 'structural-records', 'Numeric labels only'],
  ['lists', 'ENCODES', 'ffi', 'Indexed Num T defaultArray (foreign)'],
  ['dictionaries', 'ENCODES', 'ffi', 'Indexed String T defaultHashMap (foreign)'],
  ['dictionaries', 'MIRRORS', 'lists', 'Same Indexed encoding, different index'],
  ['projection', 'ELIMINATES', 'structural-records', 'Field access'],
  ['projection', 'ELIMINATES', 'sigma-types', 'Dependent field access'],
  ['projection', 'DUAL_OF', 'injection', 'Elim vs intro for row-backed types'],
  ['injection', 'INTRODUCES', 'structural-records', 'Field extension'],
  ['injection', 'INTRODUCES', 'variant-types', 'Tag injection'],
  ['rows-universal-substrate', 'MOTIVATES', 'row-polymorphism', 'All data is row-based'],
  ['rows-universal-substrate', 'MOTIVATES', 'structural-records', 'Uniform substrate'],
  ['dedicated-row-constructors', 'REVISES', 'structural-records', 'Dedicated AST nodes'],
  ['dedicated-row-constructors', 'ADDRESSES', 'rows-universal-substrate', 'Cognitive overhead'],

  // ===== BATCH 2c EDGES =====
  ['lambda', 'INTRODUCES', 'pi-types', 'Intro form for functions'],
  ['lambda', 'DUAL_OF', 'application', 'Intro/elim pair for Pi'],
  ['application', 'ELIMINATES', 'pi-types', 'Elim form for functions'],
  ['application', 'USES', 'implicit-resolution', 'Implicit insertion'],
  ['tagged-values', 'INTRODUCES', 'variant-types', 'Intro form for variants'],
  ['match', 'ELIMINATES', 'variant-types', 'Elim form for variants'],
  ['match', 'LOWERS_TO', 'pattern-matching-compilation', 'Decision trees'],
  ['match', 'DUAL_OF', 'tagged-values', 'Intro/elim pair for variants'],
  ['blocks', 'USES', 'generalization', 'Let-polymorphism at boundaries'],
  ['holes', 'INSTANTIATES', 'meta-variables', 'Fresh meta per hole'],
  ['where-clauses', 'DESUGARS_TO', 'blocks', 'Let bindings'],
  ['loop-sugar', 'DESUGARS_TO', 'lambda', 'Tail-recursive functions'],
  ['spineful-applications', 'REVISES', 'application', 'Head + spine'],
  ['exhaustiveness-checking', 'EXTENDS', 'match', 'Safety gap'],
  ['type-erasure', 'ERASES', 'pi-types', 'Removes type information'],
  ['annotations', 'COERCES_TO', 'pi-types', 'Term validated against annotation'],

  // ===== BATCH 2d EDGES =====
  ['shift-reset', 'USES', 'answer-type-polymorphism', 'k has polymorphic answer type'],
  ['shift-reset', 'USES', 'continuation-binders', 'Resume encoded via metas'],
  ['shift-reset', 'INTRODUCES', 'continuation-binders', 'Shift captures k'],
  ['shift-reset', 'COMPOSES_WITH', 'pi-types', 'k has Pi type'],
  ['answer-type-polymorphism', 'GENERALIZES', 'pi-types', 'Monomorphic → polymorphic answer'],
  ['continuation-binders', 'USES', 'meta-variables', 'Skolem-like metas'],
  ['continuation-binders', 'RELIES_ON', 'nondeterminism', 'Multishot semantics'],
  ['continuation-binders', 'THREADS_THROUGH', 'elaboration-monad', 'Via MutState'],
  ['shift-reset-mir-lowering', 'LOWERS_TO', 'mir-lowering', 'State machines'],
  ['shift-reset-mir-lowering', 'IMPLEMENTS', 'shift-reset', 'Runtime story'],
  ['multishot-serialization', 'CONSTRAINS', 'shift-reset-mir-lowering', 'Replay challenge'],
  ['selective-cps', 'ADDRESSES', 'multishot-serialization', 'Evidence passing alternative'],
  ['selective-cps', 'CONTRASTS_WITH', 'shift-reset-mir-lowering', 'Closure vs state machine'],
  ['koka-influence', 'INSPIRES', 'selective-cps', 'Evidence passing model'],
  ['koka-influence', 'CONTRASTS_WITH', 'shift-reset', 'Evidence passing vs direct capture'],
  ['effects-as-modality', 'EXTENDS', 'modalities', 'Effects tracked as modalities'],
  ['effects-as-modality', 'EXTENDS', 'shift-reset', 'Effect system over continuations'],
  ['petricek-orchard', 'INSPIRES', 'effects-as-modality', 'Coeffect framework'],
  ['petricek-orchard', 'INSPIRES', 'implicits-as-coeffects', 'Context-dependence calculus'],
  ['danvy-filinski', 'INFORMS', 'shift-reset', 'Foundational theory'],
  ['danvy-filinski', 'INFORMS', 'answer-type-polymorphism', 'Answer type modification'],

  // ===== BATCH 2e EDGES =====
  ['implicit-resolution', 'EXTENDS', 'implicits', 'Resolver mechanism'],
  ['implicit-resolution', 'RESOLVES', 'constraint-types', 'Δ lookup for resolve constraints'],
  ['implicit-resolution', 'COMPOSES_WITH', 'pi-types', 'Implicit Pi triggers insertion'],
  ['implicit-environment', 'ENABLES', 'implicit-resolution', 'Provides Δ'],
  ['implicit-environment', 'THREADS_THROUGH', 'elaboration-context', 'ctx.implicits'],
  ['typeclass-emulation', 'EMULATES', 'nominal-typing', 'Structural alternative to classes'],
  ['typeclass-emulation', 'USES', 'implicit-resolution', 'Instance lookup via Δ'],
  ['typeclass-emulation', 'USES', 'structural-records', 'Instances are records'],
  ['typeclass-emulation', 'CONTRASTS_WITH', 'nominal-typing', 'No class hierarchy'],
  ['implicits-as-coeffects', 'REVISES', 'implicit-resolution', 'Coeffect-based approach'],

  // ===== BATCH 2f EDGES =====
  ['ffi', 'RELIES_ON', 'mir-lowering', 'Saturation'],
  ['ffi', 'LACKS', 'type-erasure', 'Needs dummy type args'],
  ['ffi', 'TRANSLATES_TO', 'js-codegen', 'Curried JS functions'],
  ['ffi-saturation', 'EXTENDS', 'ffi', 'Partial application handling'],
  ['ffi-saturation', 'RELIES_ON', 'mir-lowering', 'Lowering step'],
  ['ffi-saturation', 'PRESERVES', 'lambda', 'Calling convention via closures'],
  ['module-system', 'PRODUCES', 'elaboration-context', 'Interface tables'],
  ['mutual-recursion', 'EXTENDS', 'module-system', 'Multi-pass elaboration'],

  // ===== BATCH 2g EDGES =====
  ['cbv-evaluation', 'IMPLEMENTS', 'yap', 'Runtime semantics'],
  ['cbv-evaluation', 'PRESERVES', 'application', 'Left-to-right evaluation order'],
  ['cbv-evaluation', 'NORMALIZES_TO', 'nf-value', 'Closed terms fully reduce'],
  ['primitive-signature', 'USES', 'cbv-evaluation', 'δ-rules on literals'],
  ['type-type', 'ENABLES', 'dependent-types', 'Types compute as terms'],
  ['type-type', 'GENERALIZES', 'system-f', 'Collapses all universe levels'],
  ['type-type', 'COMPOSES_WITH', 'dependent-types', 'Types in same universe'],
  ['strict-vs-lazy', 'CONTRASTS_WITH', 'cbv-evaluation', 'Lazy alternative'],
  ['cas-instead-of-smt', 'CONTRASTS_WITH', 'smt-translation', 'CAS alternative'],

  // ===== BATCH 3 EDGES =====
  ['gram', 'SUPERSEDES', 'mir-lowering', 'As IR approach'],
  ['gram', 'REWRITES', 'dpo-rewriting', 'DPO rules refine graph'],
  ['gram', 'PRESERVES', 'nbe', 'Semantic equivalence per pass'],
  ['dpo-rewriting', 'IMPLEMENTS', 'gram', 'Rewriting engine'],
  ['dpo-rewriting', 'TRAVERSES', 'gram', 'Pattern matching for rule LHS'],
  ['structural-vs-representational-passes', 'CONSTRAINS', 'gram', 'Ordering principle'],
  ['closure-conversion', 'CONTRASTS_WITH', 'defunctionalization', 'Different lowering strategies'],
  ['closure-conversion', 'CONTRASTS_WITH', 'native-lambda-hvm', 'Different targets'],
  ['closure-conversion', 'TRANSLATES_TO', 'mir-lowering', 'Env + function pointer'],
  ['closure-conversion', 'ERASES', 'lambda', 'Flattens lexical scope'],
  ['defunctionalization', 'SPECIALIZES', 'mir-lowering', 'GPU/HVM targets'],
  ['native-lambda-hvm', 'REJECTS', 'closure-conversion', 'HVM needs raw λ'],
  ['native-lambda-hvm', 'PRESERVES', 'nbe', 'Optimal reduction'],
  ['mir-retrospective', 'INFORMS', 'gram', 'Lessons learned'],
  ['mir-retrospective', 'MOTIVATES', 'gram', 'Why GRAM exists'],
  ['gram-step-1', 'IMPLEMENTS', 'gram', 'Partial — first step'],
  ['gram-as-s-expressions', 'REJECTS', 'gram', 'Rejected representation'],
  ['logram', 'EXTENDS', 'gram', 'Speculative substrate'],
  ['typed-pass-composition', 'EXTENDS', 'gram', 'Type-safe passes'],
  ['passes-in-yap', 'EXTENDS', 'gram', 'Self-hosting passes'],
  ['pattern-matching-compilation', 'LOWERS_TO', 'mir-lowering', 'Decision trees → MIR'],
  ['pattern-matching-compilation', 'DISPATCHES_ON', 'match', 'Pattern shape'],
  ['saturation', 'REWRITES', 'application', 'App chains → primop nodes'],

  // ===== BATCH 4 EDGES =====
  ['zonking', 'RELIES_ON', 'meta-variables', 'Applies subst to metas'],
  ['zonking', 'FOLLOWS', 'solver', 'After solving'],
  ['zonking', 'ZONKS', 'meta-variables', 'Resolves unknowns'],
  ['zonking', 'TRAVERSES', 'eb-term', 'Walks replacing metas'],
  ['solver', 'USES', 'unification', 'Assign constraints → unify'],
  ['solver', 'USES', 'nondeterminism', 'Multishot replay'],
  ['solver', 'RESOLVES', 'constraint-types', 'Processes queue'],
  ['solver', 'DELEGATES_TO', 'unification-algorithm', 'Assign constraints'],
  ['solver', 'DELEGATES_TO', 'implicit-resolution-solver', 'Resolve constraints'],
  ['nondeterminism', 'ENABLES', 'shift-reset', 'Multishot continuations'],
  ['nondeterminism', 'INSTANTIATES', 'meta-variables', 'Solution combinations'],
  ['whnf-vs-full-normalization', 'CONSTRAINS', 'elaboration', 'WHNF only in elab'],
  ['whnf-vs-full-normalization', 'CONSTRAINS', 'unification', 'Full NF in unification'],
  ['smt-translation', 'IMPLEMENTS', 'verification-pipeline', 'Z3 translation'],
  ['smt-translation', 'TRANSLATES_TO', 'verification-pipeline', 'Z3 sorts/assertions'],
  ['smt-translation', 'TRAVERSES', 'eb-term', 'Walks producing Z3'],
  ['smt-translation', 'ERASES', 'pi-types', 'Functions → uninterpreted'],
  ['vc-provenance', 'EXTENDS', 'verification-pipeline', 'Error quality'],
  ['vc-provenance', 'REPORTS', 'verification-pipeline', 'Provenance-annotated failures'],
  ['elaboration-context', 'ENABLES', 'elaboration', 'Central context'],
  ['elaboration-context', 'INCLUDES', 'implicit-environment', 'Δ in context'],
  ['elaboration-context', 'THREADS_THROUGH', 'elaboration-monad', 'Reader component'],
  ['monad-split', 'REVISES', 'elaboration-monad', 'Addresses coupling'],

  // ===== BATCH 5 EDGES =====
  ['usages-deferred', 'DELEGATES_TO', 'verification-pipeline', 'Analysis moves post-elab'],
  ['types-as-terms', 'ENABLES', 'type-type', 'Types compute as terms'],
  ['types-as-terms', 'RELIES_ON', 'dependent-types', 'Dependency required'],
  ['types-as-terms', 'NORMALIZES_TO', 'nf-value', 'Types evaluate like terms'],
  ['levels-vs-indices', 'APPLIES_TO', 'de-bruijn', 'Representation split'],
  ['levels-vs-indices', 'APPLIES_TO', 'nbe', 'Levels for evaluation'],
  ['deferred-constraint-solving', 'ENABLES', 'generalization', 'Metas generalized before solving'],
  ['deferred-constraint-solving', 'ENABLES', 'implicit-resolution', 'Full context for resolution'],
  ['deferred-constraint-solving', 'RELIES_ON', 'solver-dispatch', 'Batch processing at let boundaries'],
  ['deferred-constraint-solving', 'RESOLVES', 'constraint-types', 'At let boundaries'],
  ['branded-types', 'CONSTRAINS', 'eb-term', 'Type-level separation'],
  ['branded-types', 'CONSTRAINS', 'nf-value', 'Prevents mixing'],
  ['generator-monad', 'IMPLEMENTS', 'elaboration-monad', 'Generator yield protocol'],
  ['generator-monad', 'ENCODES', 'elaboration-monad', 'RWSE as generator'],
  ['structural-row-based-types', 'MOTIVATES', 'row-polymorphism', 'All composite = rows'],
  ['structural-row-based-types', 'FORMS', 'structural-records', 'Records, variants, tuples, lists, dicts'],
  ['bidirectional-checking-decision', 'DISPATCHES_ON', 'elaboration', 'Mode drives path'],
  ['bidirectional-checking-decision', 'COMPOSES_WITH', 'implicit-resolution', 'Mode switch triggers insertion'],

  // ===== BATCH 6 EDGES =====
  ['equirecursive-types', 'EXTENDS', 'mu-types', 'Beyond simple unfolding'],
  ['equirecursive-types', 'REVISES', 'mu-type-unification', 'Toward full bisimulation'],
  ['equirecursive-types', 'PRESERVES', 'unification', 'Type equality under finite unfolding'],
  ['termination-checking', 'EXTENDS', 'equirecursive-types', 'Guardedness'],
  ['termination-checking', 'DETECTS', 'nbe', 'Non-termination'],
  ['dynamic-reflection', 'COMPOSES_WITH', 'verification-pipeline', 'Proof-gated casts'],
  ['dynamic-reflection', 'COERCES_TO', 'pi-types', 'Safe cast via proof'],
  ['mlir-influence', 'INSPIRES', 'gram', 'Open vocabulary / dialects'],
  ['mlir-influence', 'INSPIRES', 'structural-vs-representational-passes', 'Pass scheduling'],
  ['nanopass-influence', 'INSPIRES', 'gram', 'Composable passes'],
  ['nanopass-influence', 'CONTRASTS_WITH', 'mir-lowering', 'Many vs monolithic'],
  ['compcert-cakeml-influence', 'INSPIRES', 'gram', 'Refinement terminology'],
  ['compcert-cakeml-influence', 'INSPIRES', 'verification-pipeline', 'Verified compilation aspiration'],
  ['egglog-influence', 'INSPIRES', 'logram', 'Equality saturation'],
  ['egglog-influence', 'INSPIRES', 'dpo-rewriting', 'E-graph rewriting'],
  ['stratego-influence', 'INSPIRES', 'dpo-rewriting', 'Strategy combinators'],
  ['stratego-influence', 'INSPIRES', 'passes-in-yap', 'Rewrite rule API'],
  ['thorin-mimir-influence', 'INSPIRES', 'mir-retrospective', 'Calls = jumps'],
  ['thorin-mimir-influence', 'CONTRASTS_WITH', 'mir-lowering', 'CPS vs direct'],
  ['documentation-debt', 'APPLIES_TO', 'yap', 'README/FAQ drift'],
  ['documentation-debt', 'DETECTS', 'yap', 'Drift between docs and impl'],
  ['idris-2-influence', 'INSPIRES', 'meta-variables', 'Contextual metas'],
  ['idris-2-influence', 'INSPIRES', 'bidirectional-checking', 'TT core'],
  ['idris-2-influence', 'INSPIRES', 'dependent-types', 'Dependent TT'],
  ['idris-2-influence', 'INSPIRES', 'solver', 'Unification approach'],
  ['agda-influence', 'INSPIRES', 'meta-variables', 'Pattern unification'],
  ['agda-influence', 'INSPIRES', 'dependent-types', 'Dependent types'],
  ['agda-influence', 'INSPIRES', 'nbe', 'Evaluation-based normalization'],
  ['agda-influence', 'INSPIRES', 'implicit-resolution', 'Instance resolution'],
  ['lean-4-influence', 'INSPIRES', 'nbe', 'NbE architecture'],
  ['lean-4-influence', 'INSPIRES', 'meta-variables', 'Instantiation strategy'],
  ['lean-4-influence', 'INSPIRES', 'elaboration-monad', 'Pipeline discipline'],
  ['lean-4-influence', 'INSPIRES', 'zonking', 'Substitution application'],
  ['ghc-influence', 'INSPIRES', 'generalization', 'Let-polymorphism'],
  ['ghc-influence', 'INSPIRES', 'deferred-constraint-solving', 'Constraint deferral'],
  ['ghc-influence', 'INSPIRES', 'modalities', 'Levity polymorphism precedent'],
  ['elm-ocaml-influence', 'INSPIRES', 'row-polymorphism', 'Row types approach'],
  ['elm-ocaml-influence', 'INSPIRES', 'variant-types', 'Polymorphic variants'],
  ['liquid-haskell-influence', 'INSPIRES', 'refinement-types', 'SMT automation'],
  ['liquid-haskell-influence', 'INSPIRES', 'smt-translation', 'VC generation pipeline'],
  ['liquid-haskell-influence', 'INSPIRES', 'vc-ir', 'Formula fragment'],
  ['dunfield-krishnaswami', 'INFORMS', 'bidirectional-checking', 'Declarative → algorithmic'],
  ['dunfield-krishnaswami', 'INFORMS', 'implicit-resolution', 'Subsumption in bidir'],
  ['mcbride-nuttin', 'INFORMS', 'meta-variables', 'Contextual metavariables'],
  ['mcbride-nuttin', 'INFORMS', 'zonking', 'Postponed substitution'],
  ['abel-pientka', 'INFORMS', 'nbe', 'Higher-order pattern unification'],
  ['abel-pientka', 'INFORMS', 'unification', 'Pattern fragment analysis'],
  ['idris-1-qtt-paper', 'INSPIRES', 'modalities', 'Quantity tracking'],
  ['maranget-paper', 'INFORMS', 'pattern-matching-compilation', 'Decision-tree construction'],

  // ===== BATCH 7 EDGES =====
  ['typing-rules', 'ENCODES', 'yap', 'Formal rules in spec.md'],
  ['typing-rules', 'FORMS', 'pi-types', 'Type-theoretic foundation'],
  ['typing-rules', 'COMPOSES_WITH', 'bidirectional-checking', 'Mode drives rule selection'],
  ['modality-drift', 'ADDRESSES', 'modalities', 'Annotation vs type former'],
  ['modality-drift', 'MOTIVATES', 'modality-enforcement', 'Gap needs fixing'],
  ['block-level-using-gap', 'APPLIES_TO', 'blocks', 'Using in block scope'],
  ['block-level-using-gap', 'APPLIES_TO', 'implicit-environment', 'Block-local Δ'],
  ['block-level-using-gap', 'DETECTS', 'module-system', 'Gap in implementation'],
  ['missing-spec-shift-reset', 'IMPLEMENTS', 'shift-reset', 'Impl ahead of spec'],
  ['missing-spec-let-polymorphism', 'IMPLEMENTS', 'generalization', 'No spec formalization'],
  ['missing-spec-sigma-types', 'IMPLEMENTS', 'sigma-types', 'No spec formalization'],
  ['missing-spec-recursive-types', 'IMPLEMENTS', 'mu-type-unification', 'No spec formalization'],

  // ===== BATCH 8a EDGES =====
  ['unification-algorithm', 'IMPLEMENTS', 'unification', 'Core algorithm'],
  ['unification-algorithm', 'USES', 'occurs-check', 'Prevents infinite types'],
  ['unification-algorithm', 'USES', 'row-unification-mechanism', 'Row case delegation'],
  ['unification-algorithm', 'USES', 'substitution-system', 'Accumulates solutions'],
  ['unification-algorithm', 'DISPATCHES_ON', 'nf-value', 'Pattern match on pairs'],
  ['unification-algorithm', 'TRAVERSES', 'nf-value', 'Recursive walk'],
  ['flex-flex-unification', 'SPECIALIZES', 'unification-algorithm', 'Both unsolved'],
  ['flex-flex-unification', 'RESOLVES', 'meta-variables', 'Binds left to right'],
  ['flex-rigid-unification', 'SPECIALIZES', 'unification-algorithm', 'Meta vs rigid'],
  ['flex-rigid-unification', 'RESOLVES', 'meta-variables', 'Binds to rigid'],
  ['flex-rigid-unification', 'RECOVERS_FROM', 'substitution-system', 'Chases solved metas'],
  ['mu-type-unification', 'SPECIALIZES', 'unification-algorithm', 'Mu case'],
  ['mu-type-unification', 'IMPLEMENTS', 'equirecursive-types', 'Current approach'],
  ['mu-type-unification', 'REWRITES', 'mu-types', 'Unfolds and recurses'],
  ['occurs-check', 'CONSTRAINS', 'unification-algorithm', 'Prevents cycles'],
  ['occurs-check', 'TRAVERSES', 'nf-value', 'Walks checking meta presence'],
  ['occurs-check', 'DETECTS', 'mu-types', 'Cyclic types'],
  ['row-unification-mechanism', 'EXTENDS', 'unification-algorithm', 'Row extension'],
  ['row-unification-mechanism', 'DELEGATES_TO', 'row-rewriting', 'Label lookup'],
  ['row-unification-mechanism', 'INSTANTIATES', 'meta-variables', 'Fresh row metas'],
  ['constraint-types', 'ENABLES', 'solver-dispatch', 'Typed constraints'],
  ['constraint-types', 'DISPATCHES_ON', 'solver-dispatch', 'Assign vs resolve'],
  ['solver-dispatch', 'USES', 'unification-algorithm', 'Assign → unify'],
  ['solver-dispatch', 'USES', 'implicit-resolution-solver', 'Resolve → Δ lookup'],
  ['solver-dispatch', 'RESOLVES', 'constraint-types', 'Processes queue'],
  ['implicit-resolution-solver', 'IMPLEMENTS', 'implicit-resolution', 'Solver-side mechanism'],
  ['implicit-resolution-solver', 'USES', 'unification-algorithm', 'Candidate matching'],
  ['implicit-resolution-solver', 'PRESERVES', 'generalization', 'Rejects subst-producing candidates'],
  ['substitution-system', 'ENABLES', 'zonking', 'Subst for resolution'],
  ['substitution-system', 'ENABLES', 'unification-algorithm', 'Solution accumulation'],
  ['substitution-system', 'ZONKS', 'meta-variables', 'Maps IDs to solutions'],
  ['row-data-structure', 'ENABLES', 'row-rewriting', 'Rewrite over rows'],
  ['row-data-structure', 'ENABLES', 'row-polymorphism', 'Shared data type'],
  ['row-data-structure', 'FORMS', 'structural-records', 'Basis of row-backed types'],
  ['row-rewriting', 'ENABLES', 'projection', 'Label lookup for field access'],
  ['row-rewriting', 'ENABLES', 'injection', 'Row extension'],
  ['row-rewriting', 'ENABLES', 'row-unification-mechanism', 'Restructuring for unification'],
  ['row-rewriting', 'REWRITES', 'row-data-structure', 'Moves label to head'],
  ['row-rewriting', 'TRAVERSES', 'row-data-structure', 'Recursive tail descent'],

  // ===== BATCH 8b EDGES =====
  ['sigma-bindings', 'IMPLEMENTS', 'dependent-types', 'Field-to-field dependency'],
  ['sigma-bindings', 'APPLIES_TO', 'structural-records', 'Record field references'],
  ['sigma-bindings', 'APPLIES_TO', 'sigma-types', 'Σ field dependency'],
  ['sigma-bindings', 'INSTANTIATES', 'meta-variables', 'Fresh metas per field'],
  ['sigma-bindings', 'THREADS_THROUGH', 'elaboration-context', 'ctx.sigma map'],
  ['label-lookup', 'USES', 'sigma-bindings', ':label → sigma entry'],
  ['label-lookup', 'RESOLVES', 'sigma-bindings', 'Label references'],
  ['de-bruijn-indices', 'CONTRASTS_WITH', 'de-bruijn-levels', 'Dual representations'],
  ['de-bruijn-indices', 'EXTENDS', 'de-bruijn', 'EB-level detail'],
  ['de-bruijn-levels', 'EXTENDS', 'de-bruijn', 'NF-level detail'],
  ['level-to-index-conversion', 'USES', 'de-bruijn-indices', 'Target representation'],
  ['level-to-index-conversion', 'USES', 'de-bruijn-levels', 'Source representation'],
  ['quoting', 'USES', 'level-to-index-conversion', 'Core conversion'],
  ['quoting', 'USES', 'closures', 'Apply closure for readback'],
  ['quoting', 'QUOTES_TO', 'eb-term', 'NF.Value → EB.Term'],
  ['quoting', 'TRAVERSES', 'nf-value', 'Recursive descent'],
  ['context-operations', 'ENABLES', 'elaboration-context', 'Bind, extend, augment, prune'],
  ['context-operations', 'THREADS_THROUGH', 'elaboration-monad', 'All phases'],

  // ===== BATCH 8c EDGES =====
  ['nondeterminism-multishot', 'ENABLES', 'shift-reset', 'Multishot continuations'],
  ['nondeterminism-multishot', 'USES', 'solver-dispatch', 'Runs after solving'],
  ['nondeterminism-multishot', 'INSTANTIATES', 'meta-variables', 'Solution combinations'],
  ['trampoline-evaluator', 'IMPLEMENTS', 'nbe', 'Stack-safe evaluation'],
  ['trampoline-evaluator', 'ADDRESSES', 'nbe', 'Stack overflow prevention'],
  ['trampoline-evaluator', 'WRAPS', 'nbe', 'Heap-allocated frames'],
  ['trampoline-evaluator', 'PRESERVES', 'cbv-evaluation', 'Same results'],
  ['evaluation-step-limit', 'CONSTRAINS', 'trampoline-evaluator', 'Prevents non-termination'],
  ['evaluation-step-limit', 'DETECTS', 'nbe', 'Infinite loops'],
  ['variable-evaluation-dispatch', 'IMPLEMENTS', 'nbe', '(Var) at NF level'],
  ['variable-evaluation-dispatch', 'RESOLVES', 'meta-variables', 'Skolems → zonker → neutral'],
  ['application-evaluation', 'IMPLEMENTS', 'nbe', '(App) at NF level'],
  ['application-evaluation', 'DELEGATES_TO', 'closures', 'Abs case'],
  ['knot-tying', 'ENABLES', 'generalization', 'Recursive let evaluation'],
  ['knot-tying', 'ENABLES', 'mu-type-unification', 'Recursive self-reference'],
  ['knot-tying', 'INSTANTIATES', 'nbe', 'Placeholder entry'],

  // ===== BATCH 8d EDGES =====
  ['error-causes', 'REPORTS', 'unification-algorithm', 'Type error rendering'],
  ['error-causes', 'USES', 'nf-display', 'Zonked NF in messages'],
  ['error-propagation', 'USES', 'error-causes', 'Lifts into monad'],
  ['error-propagation', 'USES', 'provenance-system', 'Carries trace'],
  ['error-propagation', 'PROPAGATES_VIA', 'elaboration-monad', 'V2.fail + yield'],
  ['provenance-system', 'ENABLES', 'error-propagation', 'Meaningful errors need context'],
  ['provenance-system', 'THREADS_THROUGH', 'elaboration-context', 'ctx.trace stack'],
  ['v2-track', 'IMPLEMENTS', 'provenance-system', 'Track function'],
  ['v2-track', 'EXTENDS', 'elaboration-monad', 'Trace extension'],
  ['provenance-display', 'USES', 'provenance-system', 'Stack rendering'],
  ['provenance-display', 'USES', 'pretty-printing', 'Term display'],
  ['provenance-display', 'REPORTS', 'error-causes', 'Error paths'],
  ['pretty-printing', 'USES', 'nf-display', 'NF rendering'],
  ['pretty-printing', 'REPORTS', 'elaboration', 'Human-readable output'],
  ['nf-display', 'USES', 'quoting', 'NF → EB → render'],
  ['nf-display', 'USES', 'zonking', 'Resolves metas before display'],

  // ===== BATCH 8e EDGES =====
  ['src-term', 'PRODUCES', 'eb-term', 'Via elaboration'],
  ['eb-term', 'NORMALIZES_TO', 'nf-value', 'Via evaluation'],
  ['nf-value', 'QUOTES_TO', 'eb-term', 'Via quoting'],
  ['src-term', 'CONTRASTS_WITH', 'eb-term', 'Surface vs core'],
  ['eb-term', 'CONTRASTS_WITH', 'nf-value', 'Syntax vs semantic domain'],
  ['parser-processors', 'PRODUCES', 'src-term', 'Grammar → AST'],
  ['src-to-eb-transformation', 'CONSUMES', 'src-term', 'Source input'],
  ['src-to-eb-transformation', 'PRODUCES', 'eb-term', 'Elaborated output'],
  ['src-to-eb-transformation', 'INSTANTIATES', 'meta-variables', 'Holes, implicit args'],
  ['test-utility', 'USES', 'parser-processors', 'Parses input'],
  ['test-utility', 'USES', 'elaboration-monad', 'V2.Do pipeline'],
  ['test-utility', 'USES', 'solver-dispatch', 'Solve constraints'],
  ['test-utility', 'SNAPSHOTS', 'elaboration', 'Pretty + structure output'],
  ['snapshot-testing', 'USES', 'test-utility', 'elaborateFrom'],
  ['snapshot-testing', 'SNAPSHOTS', 'pretty-printing', 'Inline snapshots'],
  ['snapshot-testing', 'PRESERVES', 'test-utility', 'Determinism via resets'],
  ['repl', 'USES', 'parser-processors', 'Parses each input'],
  ['repl', 'USES', 'v1-elaboration-pipeline', 'Elaborates'],
  ['repl', 'USES', 'mir-lowering', 'Optional MIR mode'],
  ['repl', 'THREADS_THROUGH', 'elaboration-context', 'Persistent ctx'],
  ['pipeline-explorer', 'REPORTS', 'yap', 'Visualizes pipeline stages'],
  ['brainstorming-artifacts', 'INFORMS', 'yap', 'Roadmap decisions'],

  // ===== BATCH 9 EDGES =====
  ['vc-ir', 'SUPERSEDES', 'smt-translation', 'Backend-neutral replaces Z3'],
  ['vc-ir', 'TRANSLATES_TO', 'verification-pipeline', 'NF.Value → formulas'],
  ['vc-normalization', 'NORMALIZES_TO', 'vc-ir', 'Simplifies formulas'],
  ['vc-normalization', 'FOLLOWS', 'translation-boundary-vc', 'After translation'],
  ['quantifier-preparation', 'FOLLOWS', 'vc-normalization', 'After normalization'],
  ['quantifier-preparation', 'REWRITES', 'vc-ir', 'Prenex + skolemize + triggers'],
  ['boolean-lowering-cnf', 'FOLLOWS', 'quantifier-preparation', 'After quantifier prep'],
  ['boolean-lowering-cnf', 'TRANSLATES_TO', 'vc-ir', 'Formula → clauses'],
  ['boolean-lowering-cnf', 'PRESERVES', 'vc-ir', 'Theory atoms untouched'],
  ['translation-boundary-vc', 'SUPERSEDES', 'smt-translation', 'New translation tools'],
  ['translation-boundary-vc', 'CONSUMES', 'nf-value', 'NF.Value input'],
  ['translation-boundary-vc', 'DELEGATES_TO', 'vc-ir', 'Produces VC types'],
  ['verification-artefacts-revised', 'SUPERSEDES', 'verification-pipeline', 'New artefact type'],
  ['cdcl-t-solver', 'IMPLEMENTS', 'verification-pipeline', 'Replaces Z3'],
  ['cdcl-t-solver', 'CONSUMES', 'boolean-lowering-cnf', 'CNF clauses'],
  ['cdcl-t-solver', 'DELEGATES_TO', 'theory-plugin-interface', 'Theory propagation'],
  ['theory-plugin-interface', 'ENABLES', 'cdcl-t-solver', 'Modular theories'],
  ['verification-backend', 'SUPERSEDES', 'verification-pipeline', 'New backend API'],
  ['verification-backend', 'WRAPS', 'cdcl-t-solver', 'Simple API'],
  ['euf-theory', 'IMPLEMENTS', 'theory-plugin-interface', 'Congruence closure'],
  ['euf-theory', 'ENABLES', 'quantifier-engine', 'Trigger matching'],
  ['arithmetic-theory', 'IMPLEMENTS', 'theory-plugin-interface', 'Simplex'],
  ['arithmetic-theory', 'COMPOSES_WITH', 'string-theory', 'Length coupling'],
  ['string-theory', 'IMPLEMENTS', 'theory-plugin-interface', 'Word equations'],
  ['string-theory', 'DELEGATES_TO', 'arithmetic-theory', 'Length lemmas'],
  ['row-theory', 'IMPLEMENTS', 'theory-plugin-interface', 'Row containment'],
  ['row-theory', 'MIRRORS', 'row-unification-mechanism', 'Same label decomposition'],
  ['row-theory', 'PRESERVES', 'verification-pipeline', 'subtype.contains() semantics'],
  ['quantifier-engine', 'IMPLEMENTS', 'theory-plugin-interface', 'Instantiation'],
  ['quantifier-engine', 'DELEGATES_TO', 'euf-theory', 'E-matching'],
  ['z3-replacement-decision', 'MOTIVATES', 'vc-ir', 'Backend-neutral IR needed'],
  ['z3-replacement-decision', 'MOTIVATES', 'cdcl-t-solver', 'Own solver needed'],
  ['z3-replacement-decision', 'SUPERSEDES', 'smt-translation', 'Z3 dependency removed'],
  ['z3-replacement-decision', 'PRESERVES', 'verification-pipeline', 'Shape unchanged'],
  ['num-sort-semantics', 'APPLIES_TO', 'arithmetic-theory', 'Int vs Real'],
  ['non-linear-arithmetic', 'CONSTRAINS', 'arithmetic-theory', 'Linearizable subset first'],
  ['non-linear-arithmetic', 'COMPOSES_WITH', 'nbe', 'Constant-folding removes ground arith'],
  ['higher-order-in-formulas', 'CONSTRAINS', 'quantifier-engine', 'No HO quantification'],
  ['milestone-1-ir-boundary', 'PRODUCES', 'vc-ir', 'First deliverable'],
  ['milestone-1-ir-boundary', 'PRODUCES', 'translation-boundary-vc', 'Translation tools'],
  ['milestone-1-ir-boundary', 'FOLLOWS', 'z3-replacement-decision', 'First step'],
  ['milestone-2-euf-quant-lia', 'PRODUCES', 'cdcl-t-solver', 'Core solver'],
  ['milestone-2-euf-quant-lia', 'PRODUCES', 'euf-theory', 'EUF module'],
  ['milestone-2-euf-quant-lia', 'PRODUCES', 'arithmetic-theory', 'Arithmetic module'],
  ['milestone-2-euf-quant-lia', 'FOLLOWS', 'milestone-1-ir-boundary', 'After IR'],
  ['milestone-3-strings', 'PRODUCES', 'string-theory', 'String module'],
  ['milestone-3-strings', 'FOLLOWS', 'milestone-2-euf-quant-lia', 'After core'],
  ['milestone-4-rows', 'PRODUCES', 'row-theory', 'Row module'],
  ['milestone-4-rows', 'FOLLOWS', 'milestone-3-strings', 'After strings'],
  ['milestone-5-explanations', 'FOLLOWS', 'milestone-4-rows', 'After rows'],
  ['required-formula-forms', 'CONSTRAINS', 'vc-ir', 'IR must express all forms'],
  ['required-theory-support', 'CONSTRAINS', 'theory-plugin-interface', 'All theories needed'],
  ['cas-instead-of-smt', 'CONTRASTS_WITH', 'z3-replacement-decision', 'Alternative rejected'],

  // ===== SMT literature =====
  ['nieuwenhuis-oliveras', 'INFORMS', 'cdcl-t-solver', 'DPLL(T) architecture'],
  ['nelson-oppen', 'INFORMS', 'theory-plugin-interface', 'Cooperating procedures'],
  ['de-moura-bjorner-z3', 'INFORMS', 'cdcl-t-solver', 'Industrial reference'],
  ['barbosa-cvc5', 'INFORMS', 'cdcl-t-solver', 'Modern reference'],
  ['liang-strings', 'INFORMS', 'string-theory', 'DPLL(T) string solver'],
  ['reynolds-strings', 'INFORMS', 'string-theory', 'Context-dependent simplification'],
  ['ge-de-moura-quantifiers', 'INFORMS', 'quantifier-engine', 'Complete instantiation'],
  ['dutertre-arithmetic', 'INFORMS', 'arithmetic-theory', 'Fast linear arithmetic'],

  // ===== EXISTING ZETTEL CONNECTIONS (new edges for gap fills) =====
  ['neutrals', 'WRAPS', 'nf-value', 'Unsolved computations wrapped'],
  ['neutrals', 'ENABLES', 'nbe', 'Stuck terms represent unknowns'],
  ['nbe', 'USES', 'closures', 'Lazy substitution'],
  ['nbe', 'USES', 'neutrals', 'Stuck computations'],
  ['nbe', 'NORMALIZES_TO', 'nf-value', 'Evaluation direction'],
  ['nbe', 'QUOTES_TO', 'eb-term', 'Readback direction'],
  ['nbe', 'PRESERVES', 'dependent-types', 'Beta-eta equivalence'],
  ['hindley-milner', 'INFORMS', 'generalization', 'Let-polymorphism theory'],
  ['hindley-milner', 'INFORMS', 'meta-variables', 'Unification-based inference'],
  ['system-f', 'INFORMS', 'pi-types', 'Parametric polymorphism foundation'],
  ['system-f', 'INFORMS', 'hindley-milner', 'Explicit polymorphism'],
  ['structural-typing', 'ENABLES', 'row-polymorphism', 'Structure-based identity'],
  ['structural-subtyping', 'CONTRASTS_WITH', 'row-polymorphism', 'Subtyping vs parametric'],
  ['nominal-typing', 'CONTRASTS_WITH', 'typeclass-emulation', 'Class hierarchy vs structural'],
];

// Write connections file
const CONNECTIONS_FILE = join(ROOT, 'connections.md');
let connContent = `# z-yap connections
# Format: [[source]] --[:LABEL]--> [[target]]  -- note  @timestamp
# Bidirectional: [[a]] --[:LABEL]-- [[b]]  -- note

## Type System Foundations

[[yap]] --[:USES]--> [[structural-typing]]  -- All compound types are row-based  @2026-04-18
[[yap]] --[:USES]--> [[row-polymorphism]]  -- Structural flexibility via row variables  @2026-04-18
[[yap]] --[:EXTENDS]--> [[hindley-milner]]  -- HM + row variables + dependent types  @2026-04-18
[[yap]] --[:EXTENDS]--> [[system-f]]  -- Parametric polymorphism foundation  @2026-04-18
[[yap]] --[:USES]--> [[dependent-types]]  -- Pi types with value dependencies  @2026-04-18
[[yap]] --[:USES]--> [[bidirectional-checking]]  -- Inference strategy  @2026-04-18
[[yap]] --[:USES]--> [[nbe]]  -- Definitional equality via normalization  @2026-04-18

## Type Discipline Contrasts

[[structural-typing]] --[:CONTRASTS_WITH]-- [[nominal-typing]]  -- Name-based vs structure-based identity
[[structural-subtyping]] --[:CONTRASTS_WITH]-- [[nominal-subtyping]]  -- Subtype compatibility mechanisms
[[structural-subtyping]] --[:APPLIES_TO]--> [[structural-typing]]  -- Asymmetric aspect of structural type systems

## Row Polymorphism

[[row-polymorphism]] --[:EXTENDS]--> [[hindley-milner]]  -- Parametric extension via row variables
[[row-polymorphism]] --[:DISTINGUISHES]--> [[structural-subtyping]]  -- Not subtyping: parametric, not coercive
[[yap]] --[:USES]--> [[row-unification]]  -- Row variable unification in constraint solving  @2026-04-18

## Elaboration Pipeline

[[yap]] --[:INCLUDES]--> [[elaboration]]  -- Core pipeline stage
[[elaboration]] --[:USES]--> [[bidirectional-checking]]  -- Infer synthesises, check pushes inward
[[elaboration]] --[:USES]--> [[nbe]]  -- Evaluate to values, compare structurally
[[elaboration]] --[:USES]--> [[constraint-solving]]  -- Deferred constraints solved per let-binding
[[constraint-solving]] --[:USES]--> [[row-unification]]  -- Row variables unified alongside type variables

## Dependent Types

[[dependent-types]] --[:EXTENDS]--> [[system-f]]  -- Types that depend on values
[[bidirectional-checking]] --[:ENABLES]--> [[dependent-types]]  -- Natural fit for dependent types with annotations

## Core Elaboration Mechanisms

[[meta-variables]] --[:RELIES_ON]--> [[unification]]  -- Metas are solved by unification  @2026-04-18
[[unification]] --[:SOLVES]--> [[meta-variables]]  -- Unification resolves metas to concrete types  @2026-04-18
[[generalization]] --[:USES]--> [[meta-variables]]  -- Generalizes unsolved metas into implicit Pis  @2026-04-18
[[generalization]] --[:IMPLEMENTS]--> [[hindley-milner]]  -- Yap's implementation of HM let-generalization  @2026-04-18
[[generalization]] --[:PRODUCES]--> [[implicits]]  -- Generalization wraps terms in implicit lambdas  @2026-04-18
[[implicits]] --[:USES]--> [[meta-variables]]  -- Inserts metas at call sites for implicit params  @2026-04-18
[[implicits]] --[:RELIES_ON]--> [[unification]]  -- Unification-driven resolution solves implicit metas  @2026-04-18
[[unification]] --[:USES]--> [[mu-types]]  -- Unfolds mu during structural comparison  @2026-04-18
[[unification]] --[:EXTENDS]--> [[row-polymorphism]]  -- Row rewriting extends Robinson unification for row types  @2026-04-18
[[elaboration-monad]] --[:USES]--> [[meta-variables]]  -- Monad state component manages the meta store  @2026-04-18
[[elaboration-monad]] --[:USES]--> [[unification]]  -- Monad writer accumulates constraints consumed by unification  @2026-04-18

## NbE Mechanisms

[[closures]] --[:RELIES_ON]--> [[de-bruijn]]  -- Closures capture de Bruijn level-indexed environments  @2026-04-18
[[meta-variables]] --[:PRODUCES]--> [[neutrals]]  -- Unsolved metas produce neutral terms  @2026-04-18
[[neutrals]] --[:CONTRASTS_WITH]--> [[closures]]  -- Closures reduce; neutrals are stuck — dual roles in NbE  @2026-04-18
[[system-f]] --[:INFORMS]--> [[de-bruijn]]  -- System F's binding structure motivates de Bruijn representation  @2026-04-18

## Sessions

[[session-lowering-branch-split]] --[:ADDRESSES]--> [[closures]]  -- Closure conversion and shared bundle primitive  @2026-05-13
[[session-lowering-branch-split]] --[:ADDRESSES]--> [[elaboration]]  -- FFI arity computation piped from elaboration to lowering  @2026-05-13

## Imported Connections  @2026-05-17

`;

for (const [src, label, tgt, note] of connections) {
  const noteStr = note ? `  -- ${note}` : '';
  connContent += `[[${src}]] --[:${label}]--> [[${tgt}]]${noteStr}\n`;
}

writeFileSync(CONNECTIONS_FILE, connContent);
console.log(`Wrote connections.md with ${connections.length} new edges`);
console.log(`Total edges (including original): ${connections.length + 35} (approx)`);

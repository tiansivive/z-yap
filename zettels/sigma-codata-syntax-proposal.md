---
tags:
- proposal
- exploration
- type-system
- dependent
- recursion
- row-types
- syntax
- language
- needs-design
- parser
- elaboration
- codata
- planned
---
# Syntax proposal: distinct sigils for sigma and codata references

Proposal to separate field reference syntax into two sigils reflecting the sigma/codata distinction (see [[sigma-vs-codata-label-refs]]).

**The split:** Sigma references (dependent type-level field refs) get one sigil; codata references (value-level self-reference, recursive records) get another. The lighter sigil goes to the more frequently used mechanism — codata/self-reference is more common in everyday code than sigma dependency.

**Candidate assignments:**

Option A: `:label` for codata, `&label` for sigma
- `:` retains current feel for value-level self-reference (most common, lightest syntax).
- `&` for sigma suggests "reference to the value behind the label" — a dereference into the future witness.
- Drawback: `&` has reference/pointer connotations from C that may mislead.
- Drawback: if codata self-reference is later implemented via actual references (heap-allocated cyclic records), `&` for that mechanism and a different sigil for sigma would be more semantically honest.

Option B: `&label` for codata, `*label` for sigma
- `&` for self-reference — honest if the implementation uses references.
- `*` for sigma echoes Idris's `**` for dependent pairs.
- Drawback: `*` is the multiplication operator. `x *y` is ambiguous between `x * y` (multiply) and `x (*y)` (apply to sigma-ref). Requires space-sensitivity or other disambiguation. Likely impractical.

Option C: `&label` for codata, `\label` for sigma
- `\` echoes lambda abstraction (`\x -> ...`), reinforcing that sigma IS a binder.
- `\label` in a row position is syntactically distinct from `\x ->` (no arrow follows).
- Drawback: visual similarity to lambda could confuse readers seeing `\fst` for the first time.

Option D: `&label` for codata, `^label` for sigma
- `^` is visually light, no parsing conflicts.
- Vaguely suggests "lifting" or "reaching for" a value that doesn't exist yet.
- No strong connotations from other languages.

Other sigils considered and rejected:
- `.label`: conflicts with `.foo = \x -> x.foo` accessor syntax.
- `$label`: conflicts with intended use for template/interpolation.
- `@label`: conflicts with explicit implicit application.

The decision on whether to split at all remains open. The alternative — a single `:label` syntax with different semantics at type level vs value level — is simpler but less principled. The split becomes more justified if Yap adopts codata records as a distinct core construct (nu binder or equivalent).

**Examples under Option A:**
```
-- Sigma: & for dependent field references in types
let DependentPair: Type = { fst: Type, snd: &fst };
let OrderedPair: Type = { fst: Num, snd: Num[|\v -> v > &fst|] };

-- Codata: : for self-reference in values
let rect = { width: 10, height: 20, area: :width * :height };
let ones = { head: 1, tail: :ones };
```

**Examples under Option D:**
```
-- Sigma: ^ for dependent field references in types
let DependentPair: Type = { fst: Type, snd: ^fst };
let OrderedPair: Type = { fst: Num, snd: Num[|\v -> v > ^fst|] };

-- Codata: & for self-reference in values
let rect = { width: 10, height: 20, area: &width * &height };
let ones = { head: 1, tail: &ones };
```

# From Differential Geometry to General Relativity — Study App

## Context

This is a personal study project for Igor, a PhD student in physics at the
University of São Paulo, taking the course *"From Differential Geometry to
General Relativity"*. The course is based on an in-progress book by the
professor (Daniel López Cano), which Igor converted to Markdown.

- The book source (Markdown) lives at:
  `from_differential_geometry_to_general_relativity/from_differential_geometry_to_general_relativity.md`
  It is the **main reference** for all content.
- The original PDFs (`from_differential_geometry_to_general_relativity.pdf`,
  `main.pdf`) are for Igor's own reference only. **Always ignore them** (they
  are listed in `.claudeignore`). Never read, parse, or refer to them.
- **The book is unpublished. Never commit or push it** (Markdown, images or
  PDFs). The GitHub repo is public; `.gitignore` excludes the book folder and
  all PDFs. Keep it that way.
- The book is unfinished. As of 2026-10, Chapters 1–5 (Introduction, Vector
  Spaces, Topological Manifolds, Tangent Spaces, Fields) are written; later
  chapters are still `??` placeholders. Only build lessons for chapters that
  are actually written. Check the Markdown before starting a new chapter.

## Course Overview

**Objectives.** The course introduces, accessibly yet rigorously, the
fundamentals of differential geometry and shows how this mathematical
language connects directly to the modern formulation of General Relativity.
Thematic blocks: 1. Vector Spaces, 2. Topological Manifolds, 3. Tangent and
Cotangent Spaces, 4. Vector, Covector, and Tensor Fields, 5. Covariant
Derivative, 6. Metric Structure, 7. Integration on Manifolds, 8. Newtonian
Gravitation, 9. General Relativity. Use this arc to anticipate where a
`??` chapter is headed and keep terminology consistent with later blocks.

## Role

Act as Igor's personal tutor, in problem-based-learning style: build genuine
understanding, explain rigorously but pedagogically, and connect back to the
book's notation and logical development.

## The deliverable: a Brilliant-style study app

The study material is an **interactive web app** (static site, no build
step), hosted on GitHub Pages so it works on laptop and phone:

- Repo: https://github.com/Igor-Gibernoot/From-differential-geometry-to-General-relativity-
- Live: https://igor-gibernoot.github.io/From-differential-geometry-to-General-relativity-/
- Deploy = commit + push to `main` (Pages serves the repo root).

Structure:
- **Trail** (`content/course.yaml`): one **level per book chapter**, each with
  a path of lessons. Lessons without a `file:` show as planned nodes.
- **Lessons** (`content/chNN/*.yaml`): a sequence of cards: text, multiple
  choice with per-option misconception feedback, numeric answers, "build the
  expression from tiles", "put the proof steps in order", and interactive
  widgets. **The format is specified in `docs/LESSON_FORMAT.md`; read it
  before writing a lesson.**
- **Engine** (`js/`): `cards.js` (card types), `widgets.js` (interactive
  SVG widgets), `player.js` (lesson flow and feedback), `trail.js`,
  `progress.js` (localStorage with export/import codes, Leitner spaced
  repetition), `main.js` (router). Vendored libraries are in `vendor/`
  (KaTeX, js-yaml, marked). No CDN is needed, so the app works offline.
- `archive/tex_exercises/`: the old TeX exercise files (retired format).
  They are a **source of good problems and solutions** to adapt into guided
  problems, but the book stays the main reference.

Workflow for every content change:
1. Write or edit the YAML.
2. Run `node tools/validate.mjs` and fix every error and warning.
3. Play the lesson locally (`python3 -m http.server 8000`, then
   `#/lesson/<id>/<n>` jumps to card n). Check desktop and phone widths,
   ideally with a headless-browser screenshot pass, for layout bugs,
   overflowing formulas and wrong answers.
4. Commit and push (the user has authorized pushing this repo).

### Lesson kinds (per chapter level)

1. **Concept lessons** (`kind: concept`): open with an **interesting
   problem or prediction question** that the reader cannot yet solve, then
   build the concept, then return to resolve the problem.
2. **Guided problems** (`kind: guided`): one substantial problem split into
   steps, each step a question. Prefer deriving foundational results the
   book states without proof (search the book for `DLC: PROOF`, e.g. the
   invertibility of $J$, that the dual basis is a basis, that the dual change
   of basis uses the same $J$).
3. **Trap rounds** (`kind: traps`): fast questions, each built on a common
   misconception.
4. **Review**: automatic. Every question card enters a spaced-repetition
   deck, so prompts must be **self-contained** (restate the setup).

### How to teach a topic (the pedagogy every concept lesson follows)

1. **Why the topic exists.** Say what problem it was invented to solve,
   ideally physics- or GR-flavored. Start with a hook: a concrete puzzle
   or prediction ("before any theory, guess…").
2. **First principles.** Derive what can be derived from the definitions;
   state requirements, valid conditions and limitations (finite-dimensional,
   real scalars, needs a metric or not, …). Turn derivation steps into
   questions (why is this step allowed? build the next line).
3. **Introduce notation properly.** Name every symbol when first used, and
   say what abbreviations stand for (Hom = homomorphism, id = identity).
   Every variable is introduced with its type before use.
4. **Misconceptions are questions.** Each wrong MCQ option or `wrong:` entry
   should encode a real misconception, with feedback explaining why it is
   tempting and why it fails. Pitfalls must be *explained* in the lesson, not
   only asserted.
5. **Applied examples** small enough to check by hand. Verify every number
   before writing it.
6. **Never use a concept before it is introduced.** Recall earlier
   concepts briefly ("Recall: …") instead of pointing to a book section.
7. **Show, don't assert.** Claims like "the same in every basis" get
   demonstrated, by the general argument plus a small numeric example or a
   widget.
8. **Don't give away a question in the card before it.**
9. **Consistency.** Use the book's conventions exactly: $\hat{x}_i = \sum_j
   J_i^j\cdot\hat{y}_j$ (old in terms of new), $y^i = \sum_j J^i_j x^j$,
   $\mathsf{x}_j = \sum_i J^i_j \mathsf{y}_i$, notation $\mathcal{X}$,
   $\hat{\mathfrak{x}}^i$, $\mathsf{X}$, $T_p\mathcal{M}$, $T_p^*\mathcal{M}$.
   Chapter 2 writes sums explicitly; Einstein summation only from the chapter
   where the book introduces it (Chapter 4).
10. **Self-contained.** No bare references to book sections. Lessons should
    also end with a short "what you now own" summary and a teaser for the
    next lesson.
11. **Card-sized steps for flow.** One idea per card, many small
    questions, immediate feedback. Mix question types (not only MCQ) for
    active recall. Add a widget wherever manipulating something builds
    intuition.
12. **Displayed math.** A standalone equation, definition or chain of
    equalities goes on its own `$$...$$` line. Inline math is for referring to
    symbols inside a sentence. Break long chains so they do not overflow on a
    phone.

### Status (2026-10-18)

Built: Chapter 2 change of basis (concept), covector law (guided), and the
transformation traps round. Next candidates: the remaining Chapter 2 lessons
(maps, axioms, dual space, bases and dual basis, J invertible, tensors), then
Chapters 3–5 in order. Each planned node in `course.yaml` is one lesson to
build.

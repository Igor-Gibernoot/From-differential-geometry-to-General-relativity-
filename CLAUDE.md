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
- The book is **complete** (re-converted 2026-10-18 with `marker_single`):
  Chapters 1–10 (Introduction, Vector Spaces, Topological Manifolds, Tangent
  Spaces, Fields, Covariant Derivative, Metric, Integrals, Newton-Cartan
  Theory, General Relativity) plus appendices (A computational resources,
  B proofs, C worked examples). The appendix B proofs and C examples are the
  sources for the planned guided problems (e.g. B.3 dual basis law, B.10
  torsion is a tensor, B.16 geodesic equation, C.2 circle, C.8 point mass,
  C.9 Schwarzschild).

## Course Overview

**Objectives.** The course introduces, accessibly yet rigorously, the
fundamentals of differential geometry and shows how this mathematical
language connects directly to the modern formulation of General Relativity.
Thematic blocks: 1. Vector Spaces, 2. Topological Manifolds, 3. Tangent and
Cotangent Spaces, 4. Vector, Covector, and Tensor Fields, 5. Covariant
Derivative, 6. Metric Structure, 7. Integration on Manifolds, 8. Newtonian
Gravitation, 9. General Relativity. Book chapter $n+1$ is block $n$ (Chapter 1
is the introduction); in lessons, refer to later material by its name
("the metric, Level 7"): trail levels use book chapter numbers.

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
3. Run `node tools/shots.mjs <file> <id> <outDir>` (headless check at phone
   and desktop width; see "Building sessions"). To play by hand:
   `python3 -m http.server 8000`, then `#/lesson/<id>/<n>` jumps to card n.
4. Commit and push (the user has authorized pushing this repo).

### Lesson kinds (per chapter level)

1. **Concept lessons** (`kind: concept`): open with an **interesting
   problem or prediction question** that the reader cannot yet solve, then
   build the concept, then return to resolve the problem.
2. **Guided problems** (`kind: guided`): one substantial problem split into
   steps, each step a question. Prefer deriving foundational results the
   book states without proof (search the book for `DLC: PROOF`, e.g. the
   invertibility of $J$, that the dual basis is a basis) and the Appendix B
   proofs (e.g. B.3: the dual change of basis uses the same $J$).
3. **Trap rounds** (`kind: traps`): fast questions, each built on a common
   misconception.
4. **End of every level**, three special nodes (see `docs/LESSON_FORMAT.md`):
   - **Content map** (`kind: map`): the reader rebuilds the chapter's concept
     map box by box, picking each box's card among decoys that hide classic
     mistakes. The old TeX files end with a content map per chapter: start
     from it and check it against the book.
   - **Level review** (`kind: review`): automatic, practises only that
     level's questions.
   - **Level challenge** (`kind: challenge`): harder problems that combine
     several concepts of the level. Build it after the level's lessons.
5. **Review**: automatic. Every question card enters a spaced-repetition
   deck, so prompts, hints and feedback must be **self-contained** (restate
   the setup; never "as in the previous card"). The validator warns.

### How to teach a topic (the pedagogy every concept lesson follows)

Igor's emphasis: **language as simple as possible and an intuitive approach,
while building a rigorous foundation**: define every new notation and symbol,
and put the weight on understanding and on the physics.

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
   $\mathtt{x}_j = \sum_i J^i_j \mathtt{y}_i$ (covector components are
   typewriter `\mathtt`, covectors sans-serif `\mathsf{X}`), notation
   $\mathcal{X}$, $\hat{\mathfrak{x}}^i$ (the book's "induced dual cobasis"),
   $T^{i_1\dots}_{j_1\dots}$ for tensor components, $T_p\mathcal{M}$,
   $T_p^*\mathcal{M}$.
   Chapter 2 writes sums explicitly; Einstein summation only from the chapter
   where the book introduces it (Chapter 4).
10. **Self-contained.** No bare references to book sections. Lessons should
    also end with a short "what you now own" summary and a teaser for the
    next lesson.
11. **Card-sized steps for flow.** One idea per card, many small
    questions, immediate feedback. Mix question types (not only MCQ) for
    active recall. Add a widget wherever manipulating something builds
    intuition, and put it **early** (right after the hook, before the
    formulas) so intuition comes first; a later widget can revisit it to
    probe limits.
12. **Displayed math.** A standalone equation, definition or chain of
    equalities goes on its own `$$...$$` line. Inline math is for referring to
    symbols inside a sentence. Follow "Phone-safe layout" in
    `docs/LESSON_FORMAT.md` (one relation per line, `aligned` chains, about
    25–30 characters per display line) so nothing overflows on a phone.
13. **Theme-neutral wording.** The app has light and dark modes: never say
    "the black arrow". Name things by label, or by the fixed hues (basis
    purple, vector components blue, covectors orange).

### App features (besides lessons)

Back button and progress bar in the player; synthesized feedback sounds
(`js/sound.js`, toggle in the player header and settings) with varied
encouraging messages and "N in a row" streaks; average first-try accuracy on
the trail (overall chip and per level); level reviews (`#/review/<levelId>`).

Also built: light/dark toggle (`js/theme.js`), instant tooltips via `data-tip`
(`js/tooltip.js`), and optional Google sign-in with Firestore sync (`js/cloud.js`,
`docs/ACCOUNTS.md`; inactive until `js/firebase-config.js` is filled in).

### Building sessions (token efficiency)

Lessons are built across many short sessions, not all at once. Igor starts
each session with `/clear` and a prompt naming **one unit of work**.
- **One unit per session:** one concept or guided lesson, or one traps
  round, or one content map, or **one new widget** (build it, document it
  in `docs/LESSON_FORMAT.md`, test it with a throwaway preset, no lesson).
  A level challenge takes two sessions (problems 1–3, then 4–5). Don't
  start the next unit even if budget seems to remain; finish cleanly.
  A lesson that needs a new widget is two sessions: the widget first.
- **Read only what you need, once:**
  - Status: only the **Current** block of `docs/STATUS.md`
    (`sed -n '/^## Current/,/^## Log/p' docs/STATUS.md`), never the Log.
  - Format: `docs/QUICKREF.md` (card types, phone-safe layout, YAML
    gotchas, widget index). Open `docs/LESSON_FORMAT.md` only for the
    subsection of a widget you use (`grep -n '^####'`, read that range),
    the map section when building a map, or in widget sessions.
  - The model lesson: the most recent lesson of the same chapter. Read
    only its first ~120 lines for style; don't read the whole file.
  - The book: `grep -n` the section heading and read just that range.
  - `js/widgets.js` only in widget sessions (grep for the widget's
    function; read just it and the registry at the bottom).
  - Never re-read a file you wrote or edited this session.
- **Write the lesson in one `Write` call**, then fix with small `Edit`s.
  Plan the card list in your head (or a few lines of text), not as a
  draft file.
- **Checks are text-first.** Run `node tools/validate.mjs`, then
  `node tools/shots.mjs <file> <id> <scratchpad>/shots` (it serves the
  repo itself and prints only problems: formula overflow at phone and
  desktop width, page errors). Always run it and read its text output.
  It screenshots widget cards only; **view images only when something
  visual is new** (widget sessions, or a widget preset not seen before),
  plus any card it flags. A lesson that only reuses known widget presets
  needs no image viewing. `--all` also saves
  build/order and phone `$$` cards: use it only when hunting a layout bug.
  Setup once per machine: `npm install --prefix tools`.
- **End of every session:** validate, run the shots check, update
  `docs/STATUS.md` (Current block, plus a Log entry of a few lines, not a
  recap of every card), commit and push,
  then **give Igor a ready-to-paste prompt for the next session** naming
  the single next unit from `course.yaml`, with a card plan of about 10
  lines (hook, widget, key questions, summary), and the book lines to read.
  End the Log entry with one line "Conventions fixed here: …"
  (notation, names, choices the next units must reuse), and copy those
  into the Current block's conventions list.

### Autonomous mode (agents, one unit each)

Igor can ask for several units in a row (e.g. "until the end of Chapter 3").
Then the main session is a **lean coordinator**: it builds nothing and
reads nothing itself (no lesson files, no book, no docs), so its context
stays small. Igor reviews the level on the live site at the end.
- For each unit, in `course.yaml` order and **strictly sequentially** (never
  in parallel), spawn one fresh agent (model: Opus) whose prompt is the
  ready-to-paste unit prompt plus: "You are running autonomously: follow
  CLAUDE.md 'Building sessions' exactly, one unit only; you cannot ask Igor
  questions, so make reasonable choices and record them in the Log entry.
  Do not view screenshot images unless shots.mjs flags a card or the unit
  uses a widget preset never used before. Run commands from the repo root
  without `cd … &&` prefixes. At the end, validate, run shots, update
  docs/STATUS.md, commit and push, then reply with a report of at most 15
  lines (what was built, checks output, conventions fixed, doubts) followed
  by the next unit's prompt."
- Between units the coordinator only reads that report: it checks that
  validate and shots were clean and the commit was pushed (`git log -1
  --oneline`), and passes the agent's next-unit prompt on, adding any
  doubt worth carrying forward. If a check failed, it sends the same agent
  back (SendMessage) rather than fixing things itself.
- Traps, map and challenge agents grep the chapter's earlier lesson files
  (titles, card ids, key prompts; not whole files) so they build on what
  was actually taught.
- **Stop at the end of each level** (after its challenge) and give Igor a
  summary of the units, any doubts, and the prompt to continue with the
  next level, so he can review the level on the live site first.


### Status

See `docs/STATUS.md` (read only its **Current** block).

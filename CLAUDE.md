# From Differential Geometry to General Relativity — Study App

## Context

Personal study project for Igor, a physics PhD student at the University of
São Paulo, taking *"From Differential Geometry to General Relativity"*,
based on an in-progress book by the professor (Daniel López Cano).

- The book (Markdown) is the **main reference**:
  `from_differential_geometry_to_general_relativity/from_differential_geometry_to_general_relativity.md`.
  It is complete: Chapters 1–10 plus appendices A (computational), B
  (proofs), C (worked examples). B and C are sources for guided problems.
- **Never read the PDFs** (listed in `.claudeignore`).
- **The book is unpublished: never commit or push it** (Markdown, images,
  PDFs). The repo is public; `.gitignore` excludes the book folder and all
  PDFs. Keep it that way.
- Trail levels use **book chapter numbers** (Chapter 1 is the
  introduction). In lessons, refer to later material by name ("the metric,
  Level 7").

## Role

Act as Igor's personal tutor, in problem-based-learning style: build genuine
understanding, explain rigorously but pedagogically, and connect back to the
book's notation and logical development.

## The deliverable: a Brilliant-style study app

Static web app on GitHub Pages (laptop and phone). Deploy = commit + push to
`main` (Igor has authorized pushing this repo).
- Repo: https://github.com/Igor-Gibernoot/From-differential-geometry-to-General-relativity-
- Live: https://igor-gibernoot.github.io/From-differential-geometry-to-General-relativity-/
- Trail: `content/course.yaml`, one level per book chapter; lessons without
  `file:` are planned nodes. Lessons: `content/chNN/*.yaml` (format in
  `docs/QUICKREF.md`, full spec `docs/LESSON_FORMAT.md`). Engine and app
  features: `docs/APP.md` (read only when changing the engine).
- `archive/tex_exercises/`: retired TeX exercises, a source of good problems
  (and of each chapter's content map); the book stays the reference.

### Lesson kinds (per chapter level)

1. **Concept** (`kind: concept`): open with a problem or prediction the
   reader cannot yet solve, build the concept, return to resolve it.
2. **Guided problem** (`kind: guided`): one substantial problem split into
   steps, each a question. Prefer results the book states without proof
   (grep `DLC: PROOF`) and the Appendix B proofs.
3. **Traps** (`kind: traps`): fast questions, each built on a common
   misconception.
4. **Intuition** (`kind: intuition`): derives nothing; builds quick recall of the main formulas of the concept lessons (mnemonics, limit/scaling checks, build cards, a small numeric example).
   The numeric/applied cards after the build cards **must not state the formula to apply**: the learner recalls it (hints may point to the family or the scaling test, never write the law). Give data, not the law.
5. **End of every level:** **content map** (`kind: map`, rebuild the
   chapter's concept map box by box among decoys; start from the old TeX
   map and check it against the book), **level review** (`kind: review`,
   automatic), **level challenge** (`kind: challenge`, harder problems
   combining the level's concepts; built last).
   **Summaries show the math:** each `own:` bullet restates its main formulas (displayed, phone-safe), never only prose.
6. **Exam** (`kind: exam`, own level, played by `js/exam.js`; format in `docs/LESSON_FORMAT.md`). Built from the professor's exam in `partial_exam/` or `final_exam/`; one session per exam (widgets for its figures first, in their own session). Rules for building one:
   - **Faithful**: same questions, same point weights (`points:` per card, total = original total), same numbers. Adapt only the format (below).
   - **Own level** between chapters (`eyebrow`, `hue`), never inside a chapter. The final exam is `exam-final` after Level 10.
   - **Setting card first** (not a question): the objects and notation of the exam, self-contained. Then one card per sub-question, tagged `Question N · …`, ids `qN-…`.
   - **Written answers become gradable cards**: mcq (also multi-select), numeric, build, order. Each wrong option encodes a real mistake, with `feedback` (shown only in the review). Every card has an `explanation`; the debrief lists the skills tested.
   - **No hints, no feedback, no widgets that reveal the answer** while answering; figures are shown as in the original exam (static or interactive widgets that only display, never solve).
   - **`rules:` written for the app** (timer, no feedback until submit, can go back, empty counts as wrong, no notes), not copied from the paper exam. `minutes:` = the original time.
   - Verify every number twice; the review must show the right answer for every card.
   - Check: validate, shots, and a headless run of intro, answering, submit, time-up, results, review, exit.

7. **Review** is automatic: every question enters a spaced-repetition deck,
   so prompts, hints and feedback must be **self-contained**.
8. **Intro level (Level 1, and any future preview lesson)** is a *light*
   tour for a reader who may know no relativity and no tensor notation.
   Keep the advanced content, but present it thoroughly:
   - **Guessing is the point, for the whole level.** The first lesson says
     so for *all* intro lessons; every later intro lesson repeats it in one
     line in its opening card.
   - **Gloss every technical word at first use**, in one plain sentence,
     even if a later Level formalizes it: event, worldline, proper time,
     timelike, geodesic, chart, basis, tangent plane, tensor, covector,
     great circle, horizon, orientable, energy–momentum tensor, … Never a
     bare name plus "(Level N)".
   - **Warn about notation**: a raised index is a label, not a power
     ($x^i$, $x^2$ = "second component"); a dot is a time derivative;
     units $c = 1$ (speeds as fractions of light speed). Avoid index-heavy
     formulas (Riem, $\Gamma$, $\partial_r$) in cards and `own:`; if one
     appears (e.g. a widget readout), say "the symbols come later, watch
     the shape".
   - **Outside knowledge (special relativity, Newton) is explained where
     used**: if a question needs e.g. the slow-clock factor
     $\sqrt{1-v^2}$, the hint gives it and the explanation derives or
     motivates it (light clock), so a reader who never met it learns it.
   - **Questions must be guessable** from intuition or the card before
     (no recalling the course structure, no counting tasks without the
     needed definition in the prompt). Explanations show the reasoning,
     not only the arithmetic ("$4 + 4\cdot3/2$" → say what each term counts).
   - **Geometric puzzles get a picture** (a widget preset, before the
     question, not revealing its answer) and concrete wording.
   - **No meta or list cards** ("questions to carry", "order the course"):
     each puzzle card states its own question, and the closing table maps
     puzzles to Levels.

### How to teach a topic

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
   encodes a real misconception, with feedback explaining why it is tempting
   and why it fails. Pitfalls are *explained* in the lesson, not only asserted.
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
   $T_p^*\mathcal{M}$. Chapter 2 writes sums explicitly; Einstein summation
   only from Chapter 4, where the book introduces it. Later conventions are
   listed in `docs/STATUS.md` (Current).
   **Runes:** keep the book's runic symbols (never swap them for another
   notation): write them as `\text{ᛖ}`, `\text{ᛞ}`, `\text{ᚱ}`, … inside
   math. They render on every device through the runic font that extends
   KaTeX (`vendor/fonts/`, any rune U+16A0–16F8). Introduce each with its
   meaning and subscript order, e.g. $\text{ᛖ}_{\mathcal{U}\mathcal{V}} :=
   \mathscr{Y}\circ\mathscr{X}^{-1}$, Jacobian $(\text{ᛞ}_{\mathcal{V}\mathcal{U}})^i_j
   := (\partial\mathscr{Y}^i/\partial\mathscr{X}^j)_p$ (first subscript = chart of
   the row index); the fraction form may be used alongside it in laws.
10. **Self-contained.** Never mention "the book" or its section labels
    (C.3, B.5: say "the running example"); where the book derives a result
    another way, give both derivations in the lesson. End each lesson
    with a short "what you now own" summary and a teaser for the next one.
11. **Card-sized steps for flow.** One idea per card, many small
    questions, immediate feedback. Mix question types (not only MCQ). Add a
    widget wherever manipulating something builds intuition, and put it
    **early** (right after the hook, before the formulas); a later widget
    can revisit it to probe limits.
    **Lesson length:** never more than 25 cards, ideally under 20. A topic
    that needs more is split into two or three lessons, each with its own
    hook or recall opening, `own:` summary and teaser. **This limit applies
    only to lessons, not to exams** (`kind: exam`): an exam has as many
    cards as the original has sub-questions (the final exam has 39).
12. **Displayed math.** A standalone equation, definition or chain goes on
    its own `$$...$$` line, phone-safe (`docs/QUICKREF.md`).
13. **Theme-neutral wording.** Never "the black arrow": name things by label
    or by the fixed hues (basis purple, vector components blue, covectors
    orange).
14. **Tables.** Plain Markdown tables only; the house style lives in `css/app.css` (`.prose table`: bordered, shaded header, zebra rows). Never style a table per lesson.

### Building sessions (token efficiency)

Lessons are built across many short sessions. Igor starts each with
`/clear` and a prompt naming **one unit of work**.
- **One unit per session:** one concept or guided lesson, or one traps
  round, or one content map, or **one new widget** (build it, document it
  in `docs/LESSON_FORMAT.md`, test it with a throwaway preset, no lesson).
  A level challenge takes two sessions (problems 1–3, then 4–5). A lesson
  that needs a new widget is two sessions: the widget first. Don't start
  the next unit even if budget seems to remain; finish cleanly.
- **Read only what you need, once:**
  - Status: only the **Current** block of `docs/STATUS.md`
    (`sed -n '/^## Current/,/^## Log/p' docs/STATUS.md`), never the Log.
  - Format: `docs/QUICKREF.md`. Open `docs/LESSON_FORMAT.md` only for the
    subsection of a widget you use (`grep -n '^####'`, read that range),
    the map section when building a map, or in widget sessions.
  - The model lesson: the most recent lesson of the same chapter, first
    ~120 lines only.
  - The book: `grep -n` the section heading and read just that range.
  - `js/widgets.js` only in widget sessions (the widget's function and the
    registry at the bottom).
  - Never re-read a file you wrote or edited this session.
- **Write the lesson in one `Write` call**, then fix with small `Edit`s.
  Plan the card list in your head, not as a draft file.
- **Checks are text-first.** `node tools/validate.mjs` (fix every error and
  warning), then `node tools/shots.mjs <file> <id> <scratchpad>/shots`: it
  prints only problems (formula overflow at phone and desktop width, page
  errors). **View images only when something visual is new** (widget
  sessions, a widget preset not seen before) or a card is flagged. `--all`
  only when hunting a layout bug. Setup once: `npm install --prefix tools`.
  By hand: `python3 -m http.server 8000`, `#/lesson/<id>/<n>` (1-based).
- **End of every session:** validate, run shots, update `docs/STATUS.md`
  (Current block, plus a Log entry of a few lines ending with "Conventions
  fixed here: …", copied into Current's conventions), commit and push,
  then **give Igor a ready-to-paste prompt for the next session** naming
  the single next unit from `course.yaml`, with a card plan of about 10
  lines (hook, widget, key questions, summary) and the book lines to read.
- **Several units in a row** ("until the end of Chapter 3"): follow
  `docs/AUTONOMOUS.md`.

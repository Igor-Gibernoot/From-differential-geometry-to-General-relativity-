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
  - `docs/LESSON_FORMAT.md`: `grep -n '^##'` it, then read from the top
    to the start of `### widget` (registering, lesson file, card types) and
    from `## Phone-safe layout` to the end. For a widget, read only its
    own subsection. Skip the map section unless building a map.
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
- **End of every session:** validate, run the shots check, update the
  Status below (a few lines, not a recap of every card), commit and push,
  then **give Igor a ready-to-paste prompt for the next session** naming
  the single next unit from `course.yaml`, with a card plan of about 10
  lines (hook, widget, key questions, summary), and the book lines to read.
  End the Status entry with one line "Conventions fixed here: …"
  (notation, names, choices the next units must reuse).

### Autonomous mode (agents, one unit each)

Igor can ask for several units in a row (e.g. "until the end of Chapter 3").
Then the main session is a **coordinator**: it builds nothing itself.
- For each unit, in `course.yaml` order and **strictly sequentially** (never
  in parallel), spawn one fresh agent (model: Opus) whose prompt is the
  ready-to-paste unit prompt plus: "You are running autonomously: follow
  CLAUDE.md 'Building sessions' exactly, one unit only; you cannot ask Igor
  questions, so make reasonable choices and record them in Status; at the
  end, validate, run shots, update Status, commit and push, then reply with
  a short report (what was built, checks output, conventions fixed, any
  doubts) and the next unit's prompt."
- Between units the coordinator reads the report, spot-checks the new
  lesson (grep a few cards: notation consistent with earlier lessons, the
  previous teaser honored, no concept used before it is introduced, math
  of guided steps), fixes or sends the agent back if needed, then adds to
  the next prompt what the previous lesson promised and which notation it
  fixed.
- Traps, map and challenge agents read the chapter's earlier lesson files
  (grep titles and key cards) so they build on what was actually taught.
- **Stop at the end of each level** (after its challenge) and give Igor a
  summary of the units, any doubts, and the prompt to continue with the
  next level, so he can review the level on the live site first.

### Status (2026-10-19, Chapter 2 complete, Chapter 3 in progress)

Chapter 2 built: maps, axioms, dual space, bases and dual basis, change of
basis, covector law, J invertible, dual basis law, transformation traps,
tensors (multilinear maps, components, (0,2)/(1,1) laws, (1,1) = linear
maps), tensor product (simple tensors, area = sum of two products, V⊗W,
product basis, d^(r+s), T^(r,s) ≅ V⊗…⊗V*, rank), the content map (its
tensors box now includes the product-basis expansion), and the level
challenge (`ch02/challenge.yaml`: five problems on one change of basis
ŷ₁ = 2x̂₁ + x̂₂, ŷ₂ = 3x̂₁ + 2x̂₂; vector/covector/dual basis, (0,2) vs (1,1)
laws and trace invariance, symmetric + antisymmetric split, rank of a (1,1)
map, dimension counts and the "one up, one down" invariance rule; it
introduces symmetric/antisymmetric parts and the trace). All Chapter 2 lessons
have had a headless screenshot pass (desktop + phone); all widgets are
documented in `docs/LESSON_FORMAT.md` (machine-playground presets can now
switch the tensor). Short inline math keeps trailing punctuation on its line
(`js/render.js`).

Chapter 3 started: `ch03-open-sets` (powerset, topology rules, finite
topologies, discrete/indiscrete, closed and clopen, 4 topologies on two
points) and `ch03-standard-topology` (balls, standard topology, quantifier
order, ball is open, infinite intersections, inherited topology on [0,2) and
S¹), with the new `ball-probe` widget (line/plane/circle arc, optional
ambient subspace). Then `ch03-homeomorphisms` (preimages, continuity, ε-δ as
a special case, composition, homeomorphisms, the wrap [0,2π) → S¹ is a
continuous bijection but not a homeomorphism; new `preimage-explorer` widget)
and `ch03-hausdorff` (convergence via open sets, indiscrete limits, Hausdorff
with the `ball-probe` `pair: true` mode, unique limits, two-point topologies,
subspaces, line with two origins, basis, rational balls, discrete ℝ and
uncountably many lines not second countable, why physics needs both). All four
had a screenshot pass; all widgets are documented. Next: the remaining Chapter 3
nodes in `course.yaml` order, then Chapters 4–10 (each with its content map
and challenge). Each planned node in `course.yaml` is one lesson to build.

Built and documented the `circle-charts` widget (θ and φ angle charts on S¹,
or `stereo: true` for σ = x/(1−y); overlap pieces, draggable p, transition
graph with the jump). The trail now gives each level a hue (`data-hue` on
`.level`: banner and open nodes; light/dark variants in `css/app.css`) and a
darker light-mode `--muted`.

Built `ch03-charts` (chart (𝒰, 𝒳) with open image, why one chart can't
cover S¹, inclusion of an arc is not a chart, overlap in two pieces,
transition 𝒴∘𝒳⁻¹ = ᛖ, θ ↦ θ − 2π on the lower piece, harmless jump,
topological manifold definition and dimension, line with two origins,
stereographic σ = x/(1−y) and σ∘θ⁻¹ = cos/(1−sin), two traps). Screenshot
pass done.

Built `ch03-atlases` (hook: f(p) = p in charts x and x³ on ℝ; atlas
definition; angle and stereographic transitions revisited in circle-charts;
chart representatives f∘𝒳⁻¹ and the build f∘𝒴⁻¹ = (f∘𝒳⁻¹)∘(𝒳∘𝒴⁻¹);
C^k/C^∞ compatibility, x vs x³ fails one direction; dσ/dθ = 1/(1 − sin θ);
maximal atlas with an order-the-proof card; smooth manifold, two structures on
ℝ; three traps). Screenshot pass done. The due review chip now follows the
level hue with the course title.

Built `ch03-smooth-maps` (hook: are ℝ_x and ℝ_y the same smooth manifold?;
circle doubling map D in the θ chart via circle-charts, representative 2θ /
2θ − 2π, slope 2; smooth map via Φ = 𝒴∘φ∘𝒳⁻¹, why continuity, build of chart
independence; smooth functions and curves; id: ℝ_y → ℝ_x not smooth, F = p³
is a diffeomorphism ℝ_y → ℝ_x; p³ on standard ℝ is not; hierarchy; exotic ℝ⁴,
S⁷; two traps). Screenshot pass done.

Session queue (one unit each): ⑤ `ch03-circle` → ⑥ `ch03-traps` → ⑦ `ch03-map` →
⑧–⑨ `ch03-challenge`.

Screenshot pass: `tools/shots.mjs` (`playwright-core`, installed in
`tools/node_modules`, driving the cached Chromium in
`~/Library/Caches/ms-playwright/chromium-1248`). It renders every card and
its hints/feedback, flags `.katex-display` overflow at 390 px and 1280 px,
and saves widget screenshots (full page, plus `*-widget.png` of the widget
alone with the fixed footer hidden: view that one to check readouts). `#/lesson/<id>/<n>` is 1-based. Map lessons have
no `cards:`, so the script doesn't cover them yet (extend it in the map
session).

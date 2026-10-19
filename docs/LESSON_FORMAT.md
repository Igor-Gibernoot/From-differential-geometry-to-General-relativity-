# Lesson format

Lessons are YAML files in `content/<chapter>/`, registered in `content/course.yaml`.
The engine (`js/`) renders them; adding a lesson never requires touching code
(unless it needs a new widget).

After any content change run:

```sh
node tools/validate.mjs
```

It checks structure, that build answers only use available tiles, and that
every `$...$` / `$$...$$` and every tile renders in KaTeX.

## Registering a lesson (`content/course.yaml`)

```yaml
levels:
  - id: ch02
    number: 2
    title: Vector Spaces
    blurb: One line shown under the level title.
    lessons:
      - id: ch02-change-of-basis        # must equal the lesson file's id
        title: Same Arrow, Different Numbers
        kind: concept                   # concept | guided | traps | map | review | challenge
        file: ch02/change-of-basis.yaml # omit → shown as a planned node
        summary: One or two sentences shown before starting.
  - { id: ch06, number: 6, title: Covariant Derivative, status: unwritten }
```

Every level ends with three special nodes, in this order:

```yaml
      - { id: ch02-map, title: "Content Map: Vector Spaces", kind: map, file: ch02/map.yaml }
      - { id: ch02-review, title: Level Review, kind: review }        # automatic, never a file
      - { id: ch02-challenge, title: Level Challenge, kind: challenge, file: ch02/challenge.yaml }
```

- **map**: the content-map puzzle (format below). Build it once the level's lessons exist.
- **review**: automatic. It plays up to 12 questions from this level's lessons
  that the reader has already met, due and weak ones first (route `#/review/<levelId>`).
- **challenge**: an ordinary lesson file (any card types) with harder problems
  that **combine** several concepts of the level. Build it last.

## Lesson file

```yaml
id: ch02-change-of-basis
title: Same Arrow, Different Numbers
kind: concept
cards:
  - type: text
    id: hook            # every card needs a unique id (review keys use it)
    ...
```

**Never rename the `id` of a card that has been played**: progress and the
review deck are keyed by `<lessonId>/<cardId>`.

## Card types

Shared optional fields: `title` (heading), `tag` (small label above the card).
Question cards also take `explanation` (shown after a correct answer or
"Show answer") and `review: false` (keep out of the spaced-repetition deck:
use it when the card only makes sense right after the previous card, such as a
question about a widget).

Question prompts, hints and feedback **must be self-contained**, because review shows them alone,
weeks later and out of order. Restate the setup ("With $\hat{y}_i = 2\cdot\hat{x}_i$…")
instead of saying "in the previous card". The validator warns about phrases such as
"previous card", "last lesson" or "as shown above".

**Never name a colour that changes with the theme** (the app has light and dark
modes: "the black arrow" is white in dark mode). Refer to labels ("the arrow
labelled $\mathcal{X}$") or to the fixed hues: basis vectors are **purple**,
vector components **blue**, covectors **orange**.

### `text`
```yaml
- type: text
  id: why-bases
  title: Why bases exist at all
  body: |
    Markdown with $inline$ and $$display$$ math.
```

### `mcq`
```yaml
- type: mcq
  id: J-doubled
  prompt: |
    Markdown question.
  multiple: false        # true → "select all that apply"
  shuffle: true          # false keeps the order (True/False questions)
  options:
    - text: '$\tfrac12$'
      correct: true
    - text: '$2$'
      feedback: |
        Why this tempting answer is wrong: the misconception, explained.
  explanation: |
    Full reasoning, shown once answered.
```
Every wrong option should carry `feedback` that names the misconception behind it.

### `numeric`
```yaml
- type: numeric
  id: shear
  prompt: |
    ... What is $y^1$?
  answer: -1
  tolerance: 0.001       # optional; default ~1e-6
  answerText: '-1'       # optional; shown on "Show answer"
  unit: 'm'              # optional, shown after the input
  wrong:                 # optional: targeted feedback for common wrong values
    - value: 0
      feedback: ...
  hint: Shown after a wrong answer with no specific feedback.
  explanation: ...
```
The reader may type decimals or fractions (`1/2`).

### `build` — assemble an expression from tiles
```yaml
- type: build
  id: build-contra
  prompt: Build the law ...
  prefix: 'y^j ='                 # fixed TeX before the slots (optional)
  suffix: ''                      # fixed TeX after (optional)
  tiles: ['\sum_{i=1}^d', '\sum_{j=1}^d', 'J_i^j', '(J^{-1})_i^j', 'x^i', 'x^j']
  answers:                        # every accepted sequence (commuted factors!)
    - ['\sum_{i=1}^d', 'J_i^j', 'x^i']
    - ['\sum_{i=1}^d', 'x^i', 'J_i^j']
  wrong:
    - answer: ['\sum_{i=1}^d', '(J^{-1})_i^j', 'x^i']
      feedback: Targeted explanation.
  hint: ...
  explanation: ...
```
Tiles are TeX strings. Include distractor tiles that encode real
misconceptions (wrong index position, $J$ vs $J^{-1}$, the wrong summed index).
Each tile can be used once; list a tile twice if it is needed twice.

### `order` — put steps (e.g. of a proof) in order
```yaml
- type: order
  id: invariance-proof
  prompt: Put the proof in order.
  steps:                         # in the CORRECT order; shown shuffled
    - '$\displaystyle\sum_j \mathtt{y}_j\, y^j$'
    - '$\displaystyle= \dots$'
  hint: ...
  explanation: ...
```

### `widget`
```yaml
- type: widget
  id: playground
  title: Play with it
  widget: basis-playground
  config: { vector: [3, 2], covector: [1, 0.5], basis: [[1,0],[0,1]], snap: 0.5,
            presets: [{ label: Shear, basis: [[1,0],[1,1]] }] }
  body: |
    Instructions: what to drag and what to watch.
```
Widgets live in `js/widgets.js` (register new ones in `WIDGETS`). Follow a
widget card with a question about what the reader observed.

Available widgets:
- `basis-playground`: a fixed vector (and optional covector, drawn as level
  lines) in the plane. The reader drags the new basis; components, covector
  components and their pairing update live.

## Content-map lessons (`kind: map`)

The file describes a graph; the engine turns it into cards: an intro, one
"which card belongs in this box?" question per node (in the order listed),
and the finished map. Each node's correct card competes with decoys that hide
a classic mistake, so every decoy needs `feedback`.

```yaml
id: ch02-map
title: "Content Map: Vector Spaces"
kind: map
name: Chapter 2, Vector Spaces     # used in the (self-contained) review prompts
intro: |
  Markdown shown before the puzzle.
cols: 3                            # grid columns
nodes:                             # build order = list order
  - id: basis                      # card id becomes node-basis: never rename
    title: 'Basis $\{\hat{x}_i\}$'
    row: 2                         # 1-based grid position
    col: 2
    span: 1                        # optional, columns the box spans
    body: |
      The correct card (Markdown, short: it is shown as an option).
    decoys:                        # 2 is a good number
      - body: |
          Same card with one subtle mistake.
        feedback: |
          Why it is wrong.
    explanation: |
      Optional: why this concept sits here, what it connects to.
edges:                             # arrows: from a concept to one built on it
  - [space, basis]
  - { from: maps, to: cob, dashed: true }   # dashed = "tool used in"
outroTitle: Chapter 2 in one picture
outro: |
  Markdown shown under the finished map.
```

Lay the grid out so that no arrow passes behind a box. Keep decoys parallel to
the correct card (same format and length) so the reader has to read the details.

## YAML gotchas

- Put TeX in **single quotes** (`'J_i^j'`) or block scalars (`|`). Never use
  double quotes: `"\sum"` breaks because YAML reads `\s` as an escape.
- Inside single quotes write an apostrophe as `''`.
- A plain (unquoted) value cannot contain `: ` or start with `[`, `{`, `*`, `&`, `!`, `|`, `>`, `'`, `"`, `%`, `@`.
  When in doubt, quote.

## Testing locally

```sh
python3 -m http.server 8000      # then open http://localhost:8000
```
`http://localhost:8000/#/lesson/<id>/<n>` jumps straight to card *n*.

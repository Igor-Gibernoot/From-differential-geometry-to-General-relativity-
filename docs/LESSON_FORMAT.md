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

Available widgets (all coordinates are components in the reference basis
$\hat{x}_1, \hat{x}_2$; draggable tips snap to a grid of `snap`, 0 = free):

#### `basis-playground`
A fixed vector $\mathcal{X}$ (and optionally a covector, drawn as its level
lines) in the plane. The reader drags the new basis $\hat{y}_1, \hat{y}_2$;
the components $y^i$, the covector components $\mathtt{y}_i$ and their pairing
update live. Parallel basis vectors trigger a "not a basis" warning.
```yaml
config:
  vector: [3, 2]              # 𝒳 in the old basis
  covector: [1, 0.5]          # optional: covector components in the old dual basis
  dual: 1                     # optional, 1 or 2: draw the level lines of the dual
                              # basis covector ŷ^k and show it in the old dual basis
  basis: [[1, 0], [0, 1]]     # initial ŷ1, ŷ2
  snap: 0.5
  presets: [{ label: Shear, basis: [[1, 0], [1, 1]] }]
```

#### `machine-playground`
A tensor as a machine with slots: the reader drags the input vector(s) and
watches the output number. Buttons: **Reset**, **Double 𝒳**, and with two
slots **Double both**, plus the presets.
```yaml
config:
  slots: 1                    # 1: a covector eats 𝒳. 2: a (0,2)-tensor eats 𝒳 and 𝒴
  covector: [1, 0.5]          # slots 1: X(𝒳) = 1 x^1 + 0.5 x^2, drawn as level lines
  name: L                     # slots 1: the covector's letter (sans-serif), default X;
                              # slots 2: the tensor's letter, default T
  tensor: [[0, 1], [-1, 0]]   # slots 2: components T_ij, row i = first slot
                              # (the default [[0,1],[-1,0]] is the signed area)
  area: true                  # slots 2: shade the parallelogram spanned by 𝒳 and 𝒴
  partial: true               # slots 2: draw T(𝒳, ·) as level lines and show its
                              # components (fill one slot, get a covector)
  u: [2, 1]                   # initial 𝒳
  v: [0, 2]                   # initial 𝒴 (slots 2)
  snap: 0.5
  presets: [{ label: Along a line, u: [1, 2] }]   # u, v optional: keep the current inputs
                              # slots 2: a preset may also set tensor: [[..],[..]]
                              # (Reset restores the configured tensor)
```
The readout shows the inputs, the formula of a covector and its evaluation
$\mathsf{X}(\mathcal{X}) = \dots$ (slots 1), or $T(\mathcal{X}, \mathcal{Y})$
(slots 2).

#### `map-builder`
Two finite sets, the domain $\mathcal{M}$ on the left and the target
$\mathcal{N}$ on the right, with one arrow per domain element. Tapping a domain
element moves its arrow to the next target element; the readout says whether
the map is injective, surjective and bijective (and lists $\phi^{-1}$ when it
exists), with the reason.
```yaml
config:
  domain: ['a', 'b', 'c']
  target: ['1', '2', '3']
  map: [0, 0, 1]              # index in target of each domain element's image
  presets: [{ label: '3 → 4', domain: ['a','b','c'], target: ['1','2','3','4'] }]
                              # a preset's map is optional (all to the first element)
```

#### `ball-probe`
Is a set open? The reader drags a point $p$ and sets the radius $r$ with a
slider; the ball $B_r(p)$ is drawn and the part outside the set $\mathcal{U}$
(gold) turns red. The readout says whether the ball fits and the largest radius
that does. With an ambient space (an interval $\mathcal{N}$, or the circle
$S^1$ for an arc) the ball is cut down to it (inherited topology): the part
outside is faded, and $\mathcal{U}$ is judged both in the subspace and in
$\mathbb{R}$ or $\mathbb{R}^2$.
```yaml
config:
  dim: 1                      # 1: the real line; 2: the plane
  set: { a: 0, b: 1, closed: [true, false] }   # dim 1: an interval (a, b: null = ±∞)
  # dim 2: { shape: disc, center: [0, 0], radius: 2, closed: false }
  #      | { shape: halfplane, closed: false }              (second coordinate > 0)
  #      | { shape: arc, from: 0, to: 180, closed: [false, false] }  (unit circle, degrees)
  ambient: { a: 0, b: 2, closed: [true, false] }  # dim 1, optional: the space 𝒩 ⊇ 𝒰
  name: '\mathcal{U}'         # TeX names (ambientName for 𝒩)
  view: [-0.5, 1.5]           # dim 1: x range; dim 2: { x, y, w, h }
  p: 0                        # dim 1 number; dim 2 [x, y]; arc: angle in degrees
  r: 0.3
  rMax: 1                     # slider maximum
  snap: 0.05                  # grid for p (defaults 0.05, 0.1, arc 5°)
  presets: [{ label: '[0, 1]', set: {...}, p: 1, r: 0.2 }]   # ambient optional
```
Don't mix arc and non-arc sets in one widget's presets (the view scale differs).

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

## Phone-safe layout (get it right on the first try)

The phone stage is about 320 px wide: a display line holds roughly **25–30
characters of rendered math** (a sum with limits counts as about 3). Anything
longer scrolls sideways. These rules apply to **every** string that holds math:
body, prompt, options, `explanation`, `hint`, `feedback`, map cards.

- **One relation per `$$` line.** Two equations go on two `$$` lines joined by
  prose ("and", "so"), never side by side with `\qquad`, `,\;` or `\text{and}`
  (spacing only makes the line wider).
- **Chains of equalities: use `aligned`**, one step per line, aligned at `=`:
  ```
  $$\begin{aligned}
  \mathsf{X}(\mathcal{X}) &= \sum_{i=1}^d \mathtt{x}_i\, x^i \\
  &= \mathtt{x}_1 x^1 + \mathtt{x}_2 x^2
  \end{aligned}$$
  ```
- **Lists of unrelated formulas** (definitions, a map's rule): use `gathered`,
  one per line.
- **No prose inside display math.** Move "(from the shear)" or
  `\text{for all } i` out into the sentence before or after.
- **Long right-hand sides**: break after an operator (`+`, `=`) inside
  `aligned`, not in the middle of a product.
- **Inline math** wraps only between formulas, so keep each `$...$` short
  (a symbol or a short equation); a long one belongs on a `$$` line.
- **Build cards**: the prefix plus all answer tiles must fit one line. Keep
  the prefix short (`'T_{ij} ='`), and prefer at most about 6 answer tiles.

New widgets: draw planes with `planeSvg` (it clips the layers to the plane and
the CSS caps the SVG height so the readout stays on screen on desktop); keep the
readout to a few short lines, each one formula.

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

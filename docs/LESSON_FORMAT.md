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
The reader may type decimals or fractions (`1/2`). A `wrong` value matches
within 0.5% of itself (at least the card's tolerance; override with its own
`tolerance:`), so rounded inputs such as 1.36 for $e/2$ still get its feedback.

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

**Pair mode** (Hausdorff separation, `dim: 2` only): `pair: true` drops the set
and shows two draggable points $p$ and $q$ with balls of the same radius $r$.
The balls turn red while they overlap; the readout gives $\lVert p - q\rVert$
and says they are disjoint exactly when $r \le \lVert p - q\rVert / 2$.
```yaml
config:
  dim: 2
  pair: true
  p: [-1, 0]                  # first point
  q: [1.5, 0.5]               # second point (default [2, 1])
  r: 1.5
  rMax: 3
  view: { x: -3.5, y: -3, w: 7, h: 6 }   # optional
  presets: [{ label: Close, p: [0, 0], q: [0.4, 0], r: 0.5 }]   # p, q, r optional
```

#### `preimage-explorer`
Continuity through preimages. The graph of a fixed map $\mathbb{R}\to\mathbb{R}$;
the reader drags the two ends of an open interval $\mathcal{V}$ (gold band) on
the vertical axis. The part of the graph inside the band is highlighted and the
preimage $\text{preim}(\mathcal{V})$ is drawn on the horizontal axis (filled end
dot = that end belongs to the preimage). The readout writes the rule, $\mathcal{V}$,
the preimage, and whether it is open (a filled end is a point with no room).
```yaml
config:
  fn: linear                  # linear (2x + 1) | step (H: 0 for x < 0, 1 for x ≥ 0)
                              # | square (x²) | const (1)
  V: [0.5, 1.5]               # ends of the open interval V (a < b)
  view: { x: -3, y: -1.5, w: 6, h: 4.5 }   # model units
  snap: 0.1                   # grid for the ends of V
  presets: [{ label: Jump, fn: step, V: [0.5, 1.5] }]   # fn, V optional
```
New maps go in `FUNCS` in `js/widgets.js` (rule text, formula, jump points).

#### `circle-charts`
Two charts on the unit circle $S^1$. Chart A (blue ring outside the circle) is
the angle $\theta \in (0, 2\pi)$ on $\mathcal{U} = S^1 \setminus \{(1,0)\}$;
chart B (orange ring inside) is the angle $\varphi \in (-\pi, \pi)$ on
$\mathcal{V} = S^1 \setminus \{(-1,0)\}$. Each missing point is a hollow dot
in its chart's hue; the overlap $\mathcal{U}\cap\mathcal{V}$ is gold on the
circle, in two pieces ("upper", "lower"). The reader drags $p$ (gold) around
the circle; small arcs at the centre show $\theta(p)$ and $\varphi(p)$
(negative $\varphi$ runs clockwise). A second panel graphs the transition map
$\varphi(\theta)$ on the overlap: $\varphi = \theta$ on $(0,\pi)$,
$\varphi = \theta - 2\pi$ on $(\pi, 2\pi)$, with the jump at $\theta = \pi$
and $p$ marked on it. The readout gives $p$, both coordinates (as multiples of
$\pi$ when the angle is a multiple of 15°), "undefined: $p \notin \mathcal{U}$"
at a missing point, and which piece's formula applies. With `stereo: true`,
chart B is the stereographic projection $\sigma = x/(1-y)$ from the north pole
on $\mathcal{V} = S^1 \setminus \{(0,1)\}$: the dashed ray from $(0,1)$ through
$p$ hits the horizontal axis at $\sigma(p)$, the overlap pieces are
$\theta \in (0, \pi/2)$ and $(\pi/2, 2\pi)$, and the graph is
$\sigma = \cos\theta/(1-\sin\theta)$ with its asymptote at $\theta = \pi/2$.
On a phone the two panels stack.
```yaml
config:
  angle: 60                 # p, in degrees from (1,0) counterclockwise
  show: both                # both | A | B (one chart alone: no overlap, no graph)
  stereo: false             # chart B = stereographic projection from (0,1)
  snap: 5                   # degrees p snaps to (0 = free; keep a divisor of 90
                            # so p can land on the missing points)
  presets: [{ label: Lower piece, angle: 240 }, { label: Chart A only, show: A }]
```

#### `curve-velocity`
The velocity of a curve as the derivative of functions along it. A fixed point
$p$ (gold) in the plane, or with `circle: true` on the unit circle $S^1$ with
the angle chart $\theta \in (0, 2\pi)$ (the missing point $(1,0)$ is a hollow
dot). Two curves pass through $p$ at $\lambda = 0$, $\gamma_1$ solid and
$\gamma_2$ dashed (labelled on the drawing):
plane $\gamma(\lambda) = p + \lambda v + \lambda^2 a$ with $v, a \in \mathbb{R}^2$;
circle $\theta(\gamma(\lambda)) = \theta_p + \lambda w + \lambda^2 a$ (drawn
slightly outside / inside the circle so both stay visible). Each curve has a
blue handle at the tip of its velocity arrow (sets $v$, or $w$) and a hollow
handle at $\gamma(-1)$ that bends the curve (sets $a$) without moving the
arrow. Small dots mark $\lambda = \pm 0.5, \pm 1$, so their spacing shows speed.
When both arrows coincide, the handle on top is $\gamma_2$'s. Buttons choose
the scalar field $f$: $x$, $y$, $x^2 + y$, $\theta$ (polar angle in $(0,2\pi)$;
on $S^1$ it is the chart itself). In the plane the level lines
$f = f(p) + n/2$ (rays every $\pi/12$ for $\theta$) are dashed orange.
A second panel graphs $\lambda \mapsto f(\gamma(\lambda))$ for both curves
(vertical axis shifted so $f(p)$ sits at the origin) with their tangent lines
at $\lambda = 0$ in blue: equal velocities give tangent graphs. The readout
gives $f$, $p$, and per curve its formula, its components in blue
($(v^1, v^2)$ for the chart $(x, y)$, or $v^\theta$ on $S^1$; these are
$v^i = (\mathscr{X}^i\circ\gamma)'(0)$) and $(f\circ\gamma)'(0)$; with
`chain: true` a line $= \partial_1 f(p)\cdot v^1 + \partial_2 f(p)\cdot v^2$ in
numbers (on $S^1$: $\partial_\theta(f\circ\theta^{-1})\cdot v^\theta$). A badge
says "Same velocity" (all components equal), "Equal on this $f$ only" (the
two numbers agree but the components differ), or "Different velocities".
```yaml
config:
  circle: false               # S¹ with the θ chart instead of the plane
  p: [1, 1]                   # the point (plane); view is centred on it
  angle: 60                   # the point in degrees (circle; never 0)
  curves:                     # plane: v, a in R²; circle: { w, a } numbers
    - { v: [1, 0.5], a: [0, 0] }
    - { v: [1, 0.5], a: [0, -0.75] }
  bend: true                  # false: no bend handles (curves stay as given)
  f: x2y                      # x | y | x2y (x² + y) | theta
  fields: [x, y, x2y, theta]  # field buttons offered
  graph: true                 # panel of λ ↦ f(γ(λ))
  chain: false                # expand (f∘γ)'(0) = Σ ∂_i f(p) v^i
  snap: 0.25                  # grid for v, a (circle: w, a)
  view: { x: -1.5, y: -1.5, w: 5, h: 5 }   # optional (plane)
  presets: [{ label: Faster, curves: [{ v: [1, 0.5] }, { v: [2, 1] }], f: x }]
```
Circle defaults: `curves: [{ w: 1, a: 0 }, { w: 1, a: 0.5 }]`. Keep $|w| \le 1$
in configs so arrows stay inside the drawing. New fields go in `CV_FIELDS`
(`js/widgets.js`: TeX, button name, value, gradient in $\mathbb{R}^2$).

#### `chart-basis`
Chart-induced bases and the Jacobian in the plane $\mathbb{R}^2$ (points
$q = (q_1, q_2)$). One or two charts are drawn as their coordinate lines
(first chart solid, second dashed; the two lines through $p$ darker), around a
draggable point $p$ (gold). At $p$ each chart's basis vectors
$(\partial/\partial\mathscr{X}^i)_p$ are purple arrows (second chart dashed),
labelled on the drawing: the velocity at $\lambda = 0$ of the coordinate curve
$\lambda \mapsto \mathscr{X}^{-1}(\mathscr{X}(p) + \lambda e_i)$, so tangent to
the coordinate lines (column $i$ of $(D\mathscr{X})^{-1}$). A draggable blue
velocity $v$ at $p$ is the velocity of $\gamma(\lambda) = p + \lambda v$.
Chart presets: `cartesian` ($\mathscr{C}$, coordinates $x, y$), `polar`
($\mathscr{P}$, coordinates $r, \theta$ with $\theta \in (0, 2\pi)$), `X`
($\mathscr{X}(q) = (2q_1, -q_2)$) and `Y` ($\mathscr{Y}(q) = (q_1, q_2e^{q_1})$),
the C.3 pair. A polar chart takes `cut: right` (default, $\theta \in (0, 2\pi)$,
undefined on the half-line $q_2 = 0$, $q_1 \ge 0$) or `cut: left`
($\theta \in (-\pi, \pi)$, undefined for $q_1 \le 0$); its cut is drawn dotted.
$p$ can go anywhere: when it leaves a chart's domain (the cut, the origin),
that chart shows no basis and no components, the readout says why, and the
Jacobian is replaced by "needs $p$ in the domains of both charts".
The readout gives $p$, $v$, and per chart its rule, $\mathscr{X}(p)$ and the
components $(\mathscr{X}^i\circ\gamma)'(0)$ in blue; with two charts the
Jacobian $(\partial\mathscr{Y}^i/\partial\mathscr{X}^j)_p$ in numbers (row $i$,
column $j$, the book's convention: $\dot\gamma^i_\mathcal{V} = \sum_j
(\partial\mathscr{Y}^i/\partial\mathscr{X}^j)_p\,\dot\gamma^j_\mathcal{U}$) and
the line "Components in $\mathscr{Y}$ = Jacobian $\cdot$ components in
$\mathscr{X}$"; `chain: true` adds the product in numbers (column = matrix
times column). With `basisOnly: true`, $v$ and the components are hidden and
`chain` instead expands each $(\partial/\partial\mathscr{X}^i)_p =
\sum_j (\partial\mathscr{Y}^j/\partial\mathscr{X}^i)_p\,(\partial/\partial\mathscr{Y}^j)_p$
in numbers (column $i$ of the Jacobian). `inverse: true` also shows
$(\partial\mathscr{X}^i/\partial\mathscr{Y}^j)_p$. `jacobian: false` hides the
Jacobian and the component-law lines (for cards before the Jacobian is taught). Check (C.3, $p = (1,1)$,
$v = (1,2)$): $\mathscr{X}$-components $(2, -2)$, $\mathscr{Y}$-components
$(1, 3e) \approx (1, 8.15)$, Jacobian $\begin{pmatrix} 1/2 & 0 \\ e/2 & -e\end{pmatrix}$.
```yaml
config:
  charts: [X, Y]              # one or two of cartesian | polar | X | Y, or
                              # { chart: polar, name: '\mathscr{Y}', steps: [0.5, 0.3927], cut: left }
                              # (name: the chart letter; steps: line spacing per coordinate;
                              # cut: right = theta in (0, 2pi), left = theta in (-pi, pi))
  p: [1, 1]                   # the point; the default view is 5 × 5 centred on it
  v: [1, 2]                   # the velocity, standard components of R²
  basisOnly: false            # hide v and the components
  chain: false                # the law in numbers (components; basis law if basisOnly)
  inverse: false              # also the inverse Jacobian
  dragP: true                 # p draggable
  lines: 8                    # at most this many coordinate lines each side of p
  snap: 0.25                  # grid for p and the tip of v
  view: { x: -1.5, y: -1.5, w: 5, h: 5 }   # optional
  presets: [{ label: Polar, charts: [cartesian, polar], p: [1, 1], v: [1, 0] }]
```
Default steps: cartesian $(0.5, 0.5)$, polar $(0.5, \pi/8)$, `X` $(1, 0.5)$,
`Y` $(0.5, 1)$. Where the lines of one coordinate get closer than about
$0.14$ view units (the `Y` lines $q_2 = c\,e^{-q_1}$ for large $q_1$, the polar
rays near the origin), only every 2nd (4th, …) line continues, so they thin
out instead of crowding. Labels are placed automatically beside or beyond the
arrow tips, avoiding the arrows (including $v$), $p$ and each other. New charts go
in `CB_CHARTS` (`js/widgets.js`: name, coordinate TeX and glyphs, rule, map,
inverse, Jacobian of the map, steps).

#### `parallel-transport`
Parallel transport and autoparallels in the plane. A curve $\gamma$ (preset)
is drawn with a slider for $\lambda$ (and a Play button); a vector $\mathcal{Z}$
starts at $\gamma(\lambda_0)$ ($\lambda_0$ = start of the range; the start
vector is faded, labelled "start", its tip draggable) and is parallelly
transported along $\gamma$ under the chosen connection: $\nabla^{\mathrm{E}}$
keeps its cartesian components constant, $\nabla^{\mathrm{P}}$ its polar
components (chart $\mathscr{Y} = (r, \theta)$, $\theta \in (-\pi, \pi)$, cut
$b = 0,\ a \le 0$ drawn dotted). $\nabla^{\mathrm{P}}$ exists only on the polar
chart's domain: where the curve reaches the cut or the origin the transport
stops (warning "at $\lambda \approx \dots$ the curve leaves the polar chart's
domain") and $\mathcal{Z}$ is no longer drawn. A faded trail shows $\mathcal{Z}$
at 7 earlier parameters; $\mathcal{Z}$ is blue, the velocity $v_\gamma$ (ink) and
the acceleration $a_\gamma = \nabla_{v_\gamma}v_\gamma$ (ink, dashed) start at the
gold point $\gamma(\lambda)$; `showBasis` adds $\partial y_1, \partial y_2$ in purple.
The readout gives $\mathcal{Z}$, $v_\gamma$, $a_\gamma$ as combinations of
$\partial x_k$ ($\mathscr{X}$, cartesian) and $\partial y_k$ ($\mathscr{Y}$), the
transport equation $\dot z^k + \Gamma^k_{ji} z^j\dot\gamma^i = 0$ in numbers in
the chart where the connection's coefficients do not vanish ($\mathscr{Y}$ for
$\nabla^{\mathrm{E}}$, with $\Gamma^1_{22} = -r$, $\Gamma^2_{12} = \Gamma^2_{21} = 1/r$;
$\mathscr{X}$ for $\nabla^{\mathrm{P}}$), and the badge **Autoparallel?**,
checked along the whole curve (for $\nabla^{\mathrm{P}}$, the part inside the
domain): "Yes, even autoparallelly transported" ($a_\gamma = 0$), "Yes, but not
autoparallelly transported" ($a_\gamma = \text{ᚱ}(\lambda)\,v_\gamma$, with ᚱ at the
current $\lambda$), or "No" (with a $\lambda$ where $a_\gamma \not\parallel v_\gamma$).
Curves: `circle` $\delta_{r_0}(\lambda) = (r_0\cos\lambda, r_0\sin\lambda)$,
$\lambda \in [0, 2\pi]$ (reaches the cut at $\lambda = \pi$); `vertical`
$\gamma_{x_0}(\lambda) = (x_0, \lambda)$, $\lambda \in [-2.5, 2.5]$ (inside the domain
iff $x_0 > 0$); `radial` $\lambda(\cos\theta_0, \sin\theta_0)$, $\lambda \in [0.5, 3]$;
`radial-squared` $\lambda^2(\cos\theta_0, \sin\theta_0)$, $\lambda \in [0.7, 1.75]$
(autoparallel but not autoparallelly transported). Expected badges: circle No
under $\nabla^{\mathrm{E}}$, autoparallelly transported under $\nabla^{\mathrm{P}}$;
vertical line the reverse; radial lines the same under both. Check
($r_0 = 2$, $z_0 = (1, 0)$, $\lambda = 1.2$, $\nabla^{\mathrm{E}}$): polar components
$(\cos\lambda, -\sin\lambda/2) = (0.36, -0.47)$, $\dot z^1 = -0.93$,
$\Gamma^1_{ji}z^j\dot\gamma^i = 0.93$.

Two more connections (for torsion and curvature). `W` is $\nabla^{\mathrm{W}}$:
the unit radial and angular fields $e_1 = (a\,\partial x_1 + b\,\partial x_2)/r$,
$e_2 = (-b\,\partial x_1 + a\,\partial x_2)/r$ are declared parallel, on the plane
minus the origin; $\mathcal{Z}$ keeps its $e_1, e_2$ components, i.e. turns with
the polar angle of $\gamma(\lambda)$ (the transport stops if the curve hits the
origin). Its nonzero coefficients in $\mathscr{X}$: $\Gamma^2_{11} = b/r^2$,
$\Gamma^2_{12} = -a/r^2$, $\Gamma^1_{21} = -b/r^2$, $\Gamma^1_{22} = a/r^2$ (flat, with
torsion $\mathtt{T}^1_{12} = -b/r^2$, $\mathtt{T}^2_{12} = a/r^2$, where
$\mathtt{T}^i_{jk} = \Gamma^i_{kj} - \Gamma^i_{jk}$). `kappa` is $\nabla^{\kappa}$ with the
single coefficient $\Gamma^1_{22} = \kappa a$ in $\mathscr{X}$ (`kappa:`, default 1;
torsion free, $\mathrm{Riem}^1_{212} = \kappa$): $\dot z^1 = -\kappa\,a\,z^2\dot\gamma^2$,
$\dot z^2 = 0$, integrated along the curve (midpoint rule, 2400 steps; exact on
the rectangle). For both, the transport equation and the acceleration are shown
in $\mathscr{X}$. Curve `rectangle` $[x_0, x_1]\times[b_0, b_1]$: closed,
counterclockwise from $(x_0, b_0)$ (bottom, right side up, top, left side
down), one side per unit of $\lambda \in [0, 4]$, exact piecewise velocity;
no autoparallel badge (corners), instead **After the loop**: $\Delta z =
z(4) - z(0)$ (cartesian) next to the **Prediction**: for $\nabla^{\kappa}$,
$\Delta z^1 = -\mathrm{Riem}^1_{212}\,z^2\times\text{area}$, $\Delta z^2 = 0$ (exact for any
loop, by $\oint a\,db = $ area); for the flat ones $\Delta z = 0$ ($\nabla^{\mathrm{P}}$
stops at the cut if the loop surrounds the origin; $\nabla^{\mathrm{W}}$ returns
even around the origin). `compareE: true` draws, for connections other than
$\nabla^{\mathrm{E}}$, the $\nabla^{\mathrm{E}}$ copy of $\mathcal{Z}$ (start vector at
$\gamma(\lambda)$, dashed, labelled "∇ᴱ copy") and the angle from it to $\mathcal{Z}$
(torsion hint: $\nabla^{\mathrm{W}}$ along the vertical line $\gamma_1$ turns
$\mathcal{Z}$ by the change of polar angle, $124.5^\circ$ from $\lambda = -2.5$ to
$1.5$; along radial lines the two agree). `torsion: true` adds
$\mathtt{T}^1_{12}, \mathtt{T}^2_{12}$ at $\gamma(\lambda)$. Check ($\kappa = 1$,
rectangle $[1,2]\times[0,1]$, $z_0 = (0,1)$): $z = (-1, 1)$ at $\lambda = 1.5$ and
$\Delta z = (-1, 0)$ after the loop (right side $-2$, left side $+1$). The view
is fitted to the curve only; give `view` when $\mathcal{Z}$ is long.
```yaml
config:
  curve: circle               # circle | vertical | radial | radial-squared, or
                              # { type: circle, r0: 2 } | { type: vertical, x0: 1 }
                              # | { type: radial, theta0: 0.785 }; any type takes range: [l0, l1]
                              # | { type: rectangle, x0: 1, x1: 2, b0: 0, b1: 1 }
  connection: E               # E | P | W | kappa
  connections: [E, P]         # toggle buttons offered (one entry: none)
  kappa: 1                    # κ of ∇^κ
  compareE: false             # dashed ∇ᴱ copy of Z and the angle to it
  torsion: false              # readout T¹₁₂, T²₁₂ at γ(λ)
  holonomy: true              # closed curves: Δz after the loop and the prediction
  z0: [1, 0]                  # start vector, cartesian components (tip draggable)
  lambda: 0                   # initial slider value (default: start of the range)
  showVelocity: true
  showAcceleration: true
  showBasis: false            # polar basis at the current point (purple)
  trail: true                 # faded copies of Z along the way
  residual: true              # the transport equation in numbers
  badge: true                 # the "Autoparallel?" badge
  dragZ: true
  snap: 0.25                  # grid for the tip of the start vector
  view: { x: -3.2, y: -3.2, w: 6.4, h: 6.4 }   # default: fits the initial curve and its velocity
  presets: [{ label: Vertical line, curve: { type: vertical, x0: 1 }, connection: P, z0: [1, 0], lambda: 0 }]
```
The view is fixed by the initial curve: give `view` when presets switch to a
curve that does not fit it.

#### `time-slices`
A 1+1 spacetime picture for absolute time (Newton-Cartan). Horizontal axis
$a$ (space), vertical axis $\tau$ (a chart coordinate), and a time function
$t$ from a preset. Drawn: the slices $\mathcal{S}_c = \mathrm{preim}_t(\{c\})$
at every multiple $c$ of `step` in view (thin ink), the slice of the slider's
$c$ in gold (labelled "c = …" near the edge away from $p$), a draggable point
$p$ (ink ring, snapped to `snap`), the line $\ker(dt)_p$ through $p$ (ink,
labelled "ker (dt)ₚ": the spatial directions at $p$, tangent to the slice
through $p$), and the covector $(dt)_p$ as its two level lines
$(dt)_p(w) = \pm1$ for displacements $w$ from $p$ (orange, dashed, labelled
$+1$, $-1$; with the Euclidean picture they sit at distance $1/|dt|$, so they
move off-screen where $dt$ is tiny). Where $dt = 0$ in view, a ring marks one
such point, labelled "dt = 0". Readout: $t$, $p$, $t(p)$ and the slice
$\mathcal{S}_{t(p)}$ containing $p$; $(dt)_p = \dots\,da + \dots\,d\tau$ (orange)
with its components $(\partial t/\partial a)_p$, $(\partial t/\partial\tau)_p$; a
vector $v$ spanning the kernel, $v^a = (\partial t/\partial\tau)_p$,
$v^\tau = -(\partial t/\partial a)_p$, and $(dt)_p(v) = 0$ in numbers (if
$(dt)_p = 0$: a warning that the kernel is the whole 2-dimensional tangent
space, "time stands still here"); the gold slice ("(two curves)" when
disconnected, "empty, since $t$ never takes that value" when there is none);
the badge **Absolute time?**: "Yes: $(dt)_q \ne 0$ at every point $q$ in view"
or "No: $(dt)_q = 0$ at $q = \dots$" (for `squared` the point of the line
$\tau = 0$ below or above $p$, "in fact on the whole line $\tau = 0$"; other
time functions are checked on a 61×61 grid). Buttons: one per entry of
`times` (KaTeX formula; switching keeps $p$ and moves the gold slice to
$t(p)$), **Slice through p** (sets $c = t(p)$), Reset, presets. The slider
runs over the multiples of `step` covering $t$ on the view (for `squared`
down to $c = -1$, to show an empty slice).
Time functions: `flat` $t = \tau$ ($dt = d\tau$, horizontal slices); `wavy`
$t = \tau + 0.3\sin a$ (slices $\tau = c - 0.3\sin a$); `squared` $t = \tau^2$
($dt = 2\tau\,d\tau$ vanishes on $\tau = 0$; $\mathcal{S}_c$ is two lines
$\tau = \pm\sqrt c$ for $c > 0$, the line $\tau = 0$ for $c = 0$, empty for
$c < 0$; the slices crowd away from $\tau = 0$ and spread near it); `boosted`
$t = (\tau - 0.5\,a)/\sqrt{0.75}$ (the Minkowski boost's time at speed $0.5$:
tilted slices $\tau = 0.5\,a + c\sqrt{0.75}$, slope $\tfrac12$).
Checks (by hand): `wavy`, $p = (1, 0.5)$: $t(p) = 0.5 + 0.3\sin 1 = 0.75$,
$(dt)_p = 0.16\,da + 1\,d\tau$ ($0.3\cos1 = 0.162$), $v = (1, -0.16)$, the slice
through $p$ has slope $-0.3\cos 1 = -0.16$ there (tangent). `boosted`,
$p = (1, 1)$: $t(p) = 0.5/0.866 = 0.58$, $(dt)_p = -0.58\,da + 1.15\,d\tau$,
$v = (1.15, 0.58)$ of slope $\tfrac12$ (along the slice). `squared`,
$p = (1, 1)$: $t(p) = 1$, $(dt)_p = 0\,da + 2\,d\tau$, $\mathcal{S}_1$ = two
lines $\tau = \pm1$, badge No at $q = (1, 0)$.
```yaml
config:
  time: wavy                  # flat | wavy | squared | boosted
  times: [flat, wavy, squared, boosted]   # buttons offered (one entry: none)
  p: [1, 0.5]                 # initial point (draggable)
  c: 0.75                     # initial gold slice (default t(p))
  step: 0.5                   # spacing of the drawn slices' values
  snap: 0.25                  # grid for p
  kernel: true                # the line ker(dt)_p
  stack: true                 # the orange level lines (dt)_p(w) = ±1
  badge: true                 # "Absolute time?"
  dragP: true
  view: { x: -3, y: -2.5, w: 6, h: 5 }
  presets: [{ label: Boosted, time: boosted, p: [1, 1] }]   # c optional
```

#### `rotating-grid`
Pseudo-forces in a rotating chart (Newton-Cartan without gravity). A top
view of the spatial plane; time is the slider $t$ (with **Play**, 7 s for
the whole range). A free particle moves straight in the inertial chart,
$x(t) = x_0 + v\,t$. The rotating chart turns at constant $\dot\theta = \omega$
($\theta = \omega t$, no translation, the book's sign):
$y^1 = x^1\cos\omega t + x^2\sin\omega t$,
$y^2 = -x^1\sin\omega t + x^2\cos\omega t$, so its only nonzero coefficients
are $\Gamma^1_{02} = \Gamma^1_{20} = -\omega$, $\Gamma^2_{01} = \Gamma^2_{10} = \omega$,
$\Gamma^\alpha_{00} = -\omega^2 y^\alpha$.
Panels (by `view`, toggled by the buttons **Inertial**, **Rotating**,
**Both**; side by side on desktop, stacked on phones): the inertial chart
$(x^1, x^2)$, whose grey grid is fixed and over which the rotating chart's
grid turns by $+\omega t$ (purple lattice, axes labelled y¹, y²); the
rotating chart $(y^1, y^2)$, with the inertial grid turning by $-\omega t$
(axes x¹, x²). In each: the trace of the particle for $0\le s\le t$ (ink;
straight in the first, curling in the second; `ghost: true` adds the whole
path for $0\le s\le$ `tmax`, faint dashed), the particle (ink dot) with its
velocity ($\dot x = v$, resp. $\dot y$, blue), and, at $t = 0$ where the two
charts agree, the start point $x_0$ (grey ring handle) and the start velocity
$v$ (faint blue arrow, blue handle at its tip; drawn on top, so with $v = 0$
the first drag sets $v$). Dragging either handle resets $t = 0$. With
`forces` on (button **Forces** toggles), the rotating panel shows at the
particle, per unit mass and times `scale`: Coriolis
$-2\Gamma^\alpha_{0\beta}\dot y^\beta = (2\omega\dot y^2, -2\omega\dot y^1)$ (gold,
labelled "Coriolis"), centrifugal $-\Gamma^\alpha_{00} = \omega^2 y$ (green,
"centrifugal") and their sum $= \ddot y$ (thick translucent ink, "ÿ", drawn
underneath so a force along it stays visible). Readout: $x_0$, $v$, $\omega$;
the coefficients with numbers; inertial $x$, $\dot x = v$, $\ddot x = (0, 0)$;
rotating $y$, $\dot y = R(\omega t)\,v + \omega(y^2, -y^1)$ (blue); Coriolis
(gold) and centrifugal (green) in numbers; "Their sum is $\ddot y = \dots$"
(green "the two pseudo-forces cancel right now" when it is $0$).
Checks (by hand, $\omega = 1$, $x_0 = (1, 0)$, $t = 0$): $v = (0, 0)$:
$\dot y = (0, -1)$, Coriolis $(-2, 0)$, centrifugal $(1, 0)$, sum $(-1, 0) =
-\omega^2 y$ (the resting particle circles the origin of the rotating chart,
centripetal). $v = (0, 0.5)$: $\dot y = (0, -0.5)$, Coriolis $(-1, 0)$,
centrifugal $(1, 0)$, sum $(0, 0)$, as $y^1 = \cos t + 0.5t\sin t$,
$y^2 = -\sin t + 0.5t\cos t$ give $\ddot y(0) = 0$. $v = (0, 1)$: $\dot y = 0$
(momentarily at rest in the rotating chart), Coriolis $0$, sum = centrifugal
$(1, 0)$. Same $v = (0, 0.5)$ at $t = 4$: $y = (-2.17, -0.55)$,
$\dot y = (-0.93, 1.84)$, Coriolis $(3.68, 1.86)$. $x_0 = (-2, -1)$,
$v = (0.75, 0.5)$, $t = 2.5$: $x = (-0.12, 0.25)$, $y = (0.25, -0.13)$,
$\dot y = (-0.43, -1.1)$, Coriolis $(-2.2, 0.85)$, sum $(-1.95, 0.73)$.
```yaml
config:
  omega: 1                    # θ̇ (negative: clockwise)
  x0: [1, 0]                  # start point (draggable)
  v: [0, 0.5]                 # inertial velocity (draggable tip of x0 + v)
  t: 0                        # initial time
  tmax: 6.28                  # slider range [0, tmax]
  view: both                  # inertial | rotating | both
  views: [inertial, rotating, both]   # buttons offered (one entry: none)
  forces: true                # Coriolis, centrifugal and sum arrows
  forcesToggle: true          # the Forces button
  scale: 1                    # arrow length per unit of force
  velocity: true              # ẋ and ẏ arrows at the particle
  ghost: false                # whole path, faint
  drag: true
  snap: 0.25
  box: { x: -4, y: -4, w: 8, h: 8 }
  presets: [{ label: At rest, v: [0, 0] }]   # omega, x0, v, t (t defaults to 0)
```

#### `falling-cloud`
Tides (Newton-Cartan gravity of a point mass). A plane through the mass $M$
at the origin of the sources chart: $x^1$ radial, $x^2$ transverse,
$G_NM$ = `GM`. A cloud of `N` free particles on a circle of radius `r0`
around $c_0 = (c, 0)$ on the $x^1$ axis, plus the center particle, all at
rest at $t = 0$, falls freely along the exact law
$\ddot x = -G_NM\,x/|x|^3$ (velocity Verlet, $dt = 5\cdot10^{-4}$, sampled every
$0.005$, recomputed when $c_0$ changes). Time is the slider $t$ (with
**Play**, 7 s for the whole range); the run stops (`tmax`, automatic) at the
last sample before **any** particle reaches $|x| = 0.5$ (the inner one gets
there first: $t_{\max} = 0.88$ from $c_0 = (2, 0)$, $2.84$ from $(4, 0)$; the
center alone would need $\approx 1.11$ to reach the mass).
Panels (by `view`, buttons **Sources**, **Falling**, **Both**): the sources
chart $(x^1, x^2)$, with the mass (ink dot, "M"), the center's path from
$c_0$ (dashed), the cloud (blue dots, translucent blue outline), the center
(small ink dot) and the grey ring handle at $c_0$ (drag along the $x^1$ axis,
$1.25\le c\le 4.5$, resets $t = 0$); the falling chart $y = x - b(t)$, $b$ =
the center's path, magnified by `zoom` (caption "magnified ×5"; grid step $1/$`zoom`
in $y$ units): center fixed at $0$, the start circle (thin grey), the cloud
turning into an egg (longer on the inner side), and with `arrows` the exact
tidal accelerations $\ddot y = a - \ddot b$ of each particle (gold, `scale`
panel units per unit of acceleration, not zoomed, capped at 1.5 panel
units). With `linear` (button **Linear**): dashed gold arrows
$-\mathrm{Riem}^\alpha{}_{0\beta0}\eta^\beta$ at each particle's actual offset
$\eta = x - b$, and the dashed gold curve of the tidal equation
$\ddot\eta = -\mathrm{Riem}(t)\,\eta$ solved along the center's path (Riem at
$b(t)$, not frozen at $t = 0$): an ellipse, symmetric, unlike the egg.
$\mathrm{Riem}^\alpha{}_{0\beta0} = \partial_\beta\partial_\alpha\phi$ at $b = (r, 0)$:
$\mathrm{Riem}^1{}_{010} = -2G_NM/r^3$, $\mathrm{Riem}^2{}_{020} = \mathrm{Riem}^3{}_{030} = G_NM/r^3$.
Readout: setup line; $b$ and $r$; the two components; "Their sum is …;
with $\mathrm{Riem}^3{}_{030}$ the full trace is $0 = \mathrm{Ric}_{00}$ (vacuum)";
offsets of the outer $(r_0, 0)$, inner $(-r_0, 0)$ and side $(0, r_0)$
particles (tracked even when `N` is not a multiple of 4), blue; with
`linear` the linear prediction (outer, inner $= -$outer, side); gold: tidal
acceleration of the outer and side particles (and their linear values).
Checks (`GM: 8`, $c_0 = (2, 0)$, $r_0 = 0.2$, numerically verified):
$t = 0$: Riem $-2$, $1$ (sum $-1$, $+1$ gives $0$); exact accelerations outer
$0.347$, inner $-0.469$, side $-0.197$; linear outer $0.4$, side $-0.2$.
$t = 0.5$: $b = (1.738, 0)$; offsets outer $0.248$, inner $-0.267$, side
$(0.004, 0.174)$; linear prediction outer $0.256$, side $0.174$ (the frozen
hand estimate $0.2\cosh(\sqrt2\cdot0.5) = 0.2521$, $0.2\cos0.5 = 0.1755$ is
not what is drawn). $t = 0.8$: $b = (1.268, 0)$, outer $0.351$, inner
$-0.443$, side $0.128$; linear $\pm0.385$, $0.127$. $c_0 = (4, 0)$, $t = 0$:
Riem $-0.25$, $0.125$ (8 times weaker), outer acceleration $0.046$.
```yaml
config:
  GM: 8                       # G_N M
  c0: [2, 0]                  # start of the center (on the x¹ axis; draggable)
  r0: 0.2                     # radius of the cloud
  N: 12                       # particles on the circle
  zoom: 5                     # magnification of the falling panel
  t: 0                        # initial time (clamped to tmax)
  tmax: 0.8                   # optional; default = automatic stop
  view: both                  # sources | falling | both
  views: [sources, falling, both]   # buttons offered (one entry: none)
  arrows: true                # exact tidal accelerations (gold)
  linear: false               # dashed linear prediction (arrows + curve)
  linearToggle: true          # the Linear button
  scale: 1                    # arrow length per unit of acceleration
  drag: true
  snap: 0.25
  presets: [{ label: Far, c0: [4, 0] }]   # c0, t, linear (t defaults to 0)
```

## Recap summaries (`own:`)

A concept lesson may carry `own:`, the text of its closing "what you now
own" summary (Markdown with math), with its key expressions marked
`{{ … }}`. It is the single source of truth for two things:

1. **The lesson's last card**, which must be a `text` card. It shows `own`
   with the markers stripped (content kept), titled "What you now own"
   unless the card sets `title:`. The card's own `body`, if any, is
   appended after it: put only the teaser ("**Next:** …") there.
2. **The Recap** (`#/recap`, `#/recap/<levelId>`; button on the trail and in
   each level-review sheet). A recap card shows the lesson title and the
   summary with some blanks replaced by tappable placeholders; the learner
   recalls each, taps to reveal it, and rates "Knew it" / "Missed".

```yaml
id: ch06-christoffel
kind: concept
own: |
  - **Coefficients**: in a chart a connection is fixed by
    {{ $\nabla_{\partial x_k}\partial x_j = \Gamma^i_{jk}\,\partial x_i$ }}.
  - **Not a tensor**: they transform with {{ an inhomogeneous second-derivative term }}.
  - **Law**:
  {{ $$(\nabla_\mathcal{X}\mathcal{Y})^i = \mathcal{X}(\mathcal{Y}^i) + \Gamma^i_{jk}\mathcal{Y}^j\mathcal{X}^k$$ }}
cards:
  - ...
  - type: text
    id: summary
    body: |
      **Next:** …
```

Mechanics:
- Only marked spans can be hidden; chance only picks *which* marked spans
  are hidden on a pass. Markers are recognized outside math only (inside
  `$…$` a `{{` is TeX); a blank may hold inline math, prose, or a whole
  `$$…$$` display (shown as a full-width placeholder).
- Each blank is a spaced-repetition item with key
  `<lessonId>#<hash>`, the hash of its text after trimming and collapsing
  whitespace. Editing text outside a blank keeps its progress; editing the
  blank itself starts a new item. The same expression twice in one summary
  is one item (both copies hide and reveal together).
- Only lessons the learner has finished are recapped.

**Marking rules** (the author chooses the marks):
- Mark main results: definitions, the central law, a defining property. Not
  notation introductions, not intermediate algebra.
- 3–6 blanks per summary (the validator requires at least 2 and warns
  outside 3–6; markers balanced, no nesting, no empty blank).
- Each blank must be recallable from its own sentence: the words around it
  say what to state.
- No two blanks that give each other away (e.g. a law and its special case
  in the next clause: mark one).
- Prefer whole formulas over bare symbols: `{{ $\nabla_{\mathcal{X}_p}f = \mathcal{X}_p(f)$ }}`,
  not `{{ $\nabla$ }}`.
- Phone-safe layout applies as everywhere: a long blank goes on its own
  `$$…$$` line.

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
  - { from: space, to: dual, label: dual space }  # optional label on the arrow
outroTitle: Chapter 2 in one picture
outro: |
  Markdown shown under the finished map.
```

Lay the grid out so that no arrow passes behind a box. An edge `label` (inline
Markdown, 1–3 words, read as "from *label* to") sits at the middle of its arrow,
in the gap between rows; any label widens the row gap. Keep labelled arrows
between different rows: two side-by-side boxes leave no room for one. Keep decoys parallel to
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

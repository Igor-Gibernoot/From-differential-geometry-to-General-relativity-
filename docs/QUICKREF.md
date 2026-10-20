# Lesson quick reference

The short version of `docs/LESSON_FORMAT.md`, for lesson sessions. The full
doc is the source of truth; open it only for a widget's own subsection
(`grep -n '^####' docs/LESSON_FORMAT.md`), the map format, or widget work.

## Registering (`content/course.yaml`)

```yaml
      - id: ch03-circle               # must equal the lesson file's id
        title: "Guided Problem: …"
        kind: guided                  # concept | guided | traps | map | review | challenge
        file: ch03/circle.yaml        # omit → planned node
        summary: One or two sentences shown before starting.
```

## Lesson file

```yaml
id: ch03-circle
title: …
kind: guided
cards:
  - type: text
    id: hook          # unique; never rename a played card's id
```

Shared optional fields: `title`, `tag`. Question cards also take
`explanation` and `review: false` (only for cards that make no sense alone,
e.g. a question about a widget just shown). Prompts, hints and feedback must be
**self-contained** (restate the setup; never "previous card", "as shown
above"). Never name a theme-dependent colour; use labels or the fixed hues
(basis purple, vector components blue, covectors orange).

## Card types

```yaml
- type: text
  id: …
  body: |
    Markdown with $inline$ and $$display$$ math.

- type: mcq
  id: …
  prompt: |
    …
  multiple: false        # true → select all that apply
  shuffle: true          # false keeps order (True/False)
  options:
    - text: '$\tfrac12$'
      correct: true
    - text: '$2$'
      feedback: |
        The misconception behind it, explained.   # every wrong option
  explanation: |
    …

- type: numeric
  id: …
  prompt: …
  answer: -1
  tolerance: 0.001       # optional
  answerText: '-1'       # optional
  wrong:                 # optional targeted feedback
    - { value: 0, feedback: … }   # matches within 0.5% (or the card tolerance, or its own `tolerance:`)
  hint: …
  explanation: …         # reader may type decimals or fractions

- type: build            # assemble an expression from tiles
  id: …
  prompt: …
  prefix: 'y^j ='        # optional; prefix + answer must fit one phone line
  suffix: ''
  tiles: ['\sum_{i=1}^d', 'J_i^j', '(J^{-1})_i^j', 'x^i']   # distractors = misconceptions
  answers:               # every accepted sequence (commuted factors too)
    - ['\sum_{i=1}^d', 'J_i^j', 'x^i']
  wrong:
    - { answer: ['\sum_{i=1}^d', '(J^{-1})_i^j', 'x^i'], feedback: … }
  hint: …
  explanation: …         # each tile usable once; list twice if needed twice

- type: order            # proof steps, listed in CORRECT order, shown shuffled
  id: …
  prompt: Put the proof in order.
  steps: ['…', '…']
  hint: …
  explanation: …

- type: widget
  id: …
  widget: circle-charts
  config: { … }          # see the widget's subsection in LESSON_FORMAT.md
  body: |
    What to drag and what to watch.   # follow with a question on what was seen
```

## Widgets (config details: `LESSON_FORMAT.md`, subsection `#### <name>`)

- `basis-playground`: drag a new basis; watch a fixed vector's (and covector's) components.
- `machine-playground`: tensor as a slot machine; drag input vectors, watch the output.
- `map-builder`: arrows between two finite sets; injective/surjective/bijective.
- `ball-probe`: is a set open? drag $p$, set radius $r$; line, plane, circle arc, subspaces, `pair: true` for Hausdorff.
- `preimage-explorer`: continuity via preimages of an open interval.
- `circle-charts`: θ/φ angle charts on $S^1$ (or `stereo: true` for $\sigma = x/(1-y)$), overlap pieces, draggable $p$, transition graph.
- `curve-velocity`: two curves through $p$ (plane, or `circle: true` for $S^1$ with θ); drag velocity and bend handles; readouts $(f\circ\gamma)'(0)$, components $v^i$, "same velocity?" badge.
- `chart-basis`: coordinate lines of one or two charts (cartesian, polar with `cut: right|left`, C.3 `X`, `Y`) in the plane, draggable $p$, basis $(\partial/\partial\mathscr{X}^i)_p$ in purple, draggable $v$; components per chart, Jacobian $(\partial\mathscr{Y}^i/\partial\mathscr{X}^j)_p$, `chain`, `basisOnly`, `inverse`.

## Phone-safe layout

About 25–30 characters of rendered math per display line (a sum with limits ≈ 3).
Applies to every string with math (body, prompt, options, hint, feedback, explanation).

- One relation per `$$` line; join two equations with prose, never `\qquad` or `\text{and}`.
- Chains of equalities: `aligned`, one step per line, aligned at `=`.
- Lists of unrelated formulas: `gathered`, one per line.
- No prose inside display math.
- Long right-hand sides: break after an operator inside `aligned`.
- Inline `$...$` short (a symbol or short equation); longer goes on a `$$` line.
- Build cards: short prefix, at most about 6 answer tiles.

## Book symbols

- Runes as in the book, inside math: `$\text{ᛖ}_{\mathcal{U}\mathcal{V}}$` (transition map
  $\mathscr{Y}\circ\mathscr{X}^{-1}$), `$\text{ᛞ}_{\mathcal{V}\mathcal{U}}$` (its Jacobian
  $(\partial\mathscr{Y}^i/\partial\mathscr{X}^j)_p$), `$\text{ᚱ}$` (reparametrization), …
  A bundled runic font makes them render everywhere; no need to avoid them.
- Never write "the book" or section labels (C.3, B.5) in lessons.

## YAML gotchas

- TeX in **single quotes** or block scalars (`|`); never double quotes (`"\sum"` breaks).
- Apostrophe inside single quotes: `''`.
- Quote any value containing `: ` or starting with `[ { * & ! | > ' " % @`.

## Checks

```sh
node tools/validate.mjs
node tools/shots.mjs ch03/circle.yaml ch03-circle <scratchpad>/shots
```
`#/lesson/<id>/<n>` (1-based) jumps to card n under `python3 -m http.server 8000`.

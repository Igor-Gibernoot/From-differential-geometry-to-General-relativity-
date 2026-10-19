# Status

Read only **Current** at the start of a session (`sed -n '/^## Current/,/^## Log/p' docs/STATUS.md`).
At the end of a session: update **Current** (built list, queue, conventions) and
append a short entry at the end of **Log** (a few lines, ending with
"Conventions fixed here: …").

## Current (2026-10-19)

- **Chapter 2 complete** (lessons, traps, map, challenge).
- **Chapter 3 built:** `ch03-open-sets`, `ch03-standard-topology`,
  `ch03-homeomorphisms`, `ch03-hausdorff`, `ch03-charts`, `ch03-atlases`,
  `ch03-smooth-maps`. All had a screenshot pass; all widgets are documented.
- **Queue (one unit each):** ⑤ `ch03-circle` → ⑥ `ch03-traps` → ⑦ `ch03-map` →
  ⑧–⑨ `ch03-challenge`, then Chapters 4–10 (each with map and challenge).
  Each planned node in `course.yaml` is one lesson.
- **Chapter 3 conventions to reuse:** chart $(\mathcal{U}, \mathcal{X})$, second
  chart $(\mathcal{V}, \mathcal{Y})$, transition $\mathcal{Y}\circ\mathcal{X}^{-1}$;
  on $S^1$: $\theta \in (0,2\pi)$ on $S^1\setminus\{(1,0)\}$, $\varphi \in (-\pi,\pi)$
  on $S^1\setminus\{(-1,0)\}$, overlap in two pieces (upper: $\varphi=\theta$,
  lower: $\varphi=\theta-2\pi$); stereographic $\sigma = x/(1-y)$ from $(0,1)$;
  chart representative $f\circ\mathcal{X}^{-1}$, map representative
  $\Phi = \mathcal{Y}\circ\varphi\circ\mathcal{X}^{-1}$; $\mathbb{R}_x$, $\mathbb{R}_y$
  for $\mathbb{R}$ with the charts $x$ and $x^3$.
- **Tooling:** `tools/shots.mjs` (`playwright-core` in `tools/node_modules`,
  cached Chromium in `~/Library/Caches/ms-playwright/chromium-1248`) renders
  every card with hints/feedback, flags `.katex-display` overflow at 390 px and
  1280 px, saves widget screenshots (`*-widget.png` = widget alone; view that
  one to check readouts). `#/lesson/<id>/<n>` is 1-based. Map lessons have no
  `cards:`, so shots doesn't cover them yet (extend it in the map session).

## Log

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

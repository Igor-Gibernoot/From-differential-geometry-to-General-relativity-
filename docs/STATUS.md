# Status

Read only **Current** at the start of a session (`sed -n '/^## Current/,/^## Log/p' docs/STATUS.md`).
At the end of a session: update **Current** (built list, queue, conventions) and
append a short entry at the end of **Log** (a few lines, ending with
"Conventions fixed here: …").

## Current (2026-10-19)

- **Chapter 2 complete** (lessons, traps, map, challenge).
- **Chapter 3 complete** (lessons, traps, map, challenge): `ch03-open-sets`,
  `ch03-standard-topology`, `ch03-homeomorphisms`, `ch03-hausdorff`,
  `ch03-charts`, `ch03-atlases`, `ch03-smooth-maps`, `ch03-circle`,
  `ch03-traps`, `ch03-map`, `ch03-challenge` (five problems: graph of $|t|$,
  stereographic $\sigma_N,\sigma_S$, $\mathbb{R}_x$ vs $\mathbb{R}_y$, line with
  two origins, doubling map $D$ vs reflection $R$ on $S^1$).
  Challenge file layout (reuse for later levels): `intro` (numbered problem
  list), one block per problem with `tag: Problem N · …` and ids `pN-…`, then
  `wrap-up` ending with a teaser for the next level.
- **Chapter 4 in progress:** `ch04-tangent-space` built (26 cards).
- **Queue (one unit each):** Chapter 4 (Tangent Spaces) in `course.yaml`
  order, next `ch04-velocity-operations`; then Chapters 5–10 (each with
  map and challenge). Each planned node in `course.yaml` is one lesson.
- **Chapter 3 conventions to reuse:** chart $(\mathcal{U}, \mathcal{X})$, second
  chart $(\mathcal{V}, \mathcal{Y})$, transition $\mathcal{Y}\circ\mathcal{X}^{-1}$;
  on $S^1$: $\theta \in (0,2\pi)$ on $S^1\setminus\{(1,0)\}$, $\varphi \in (-\pi,\pi)$
  on $S^1\setminus\{(-1,0)\}$, overlap in two pieces (upper: $\varphi=\theta$,
  lower: $\varphi=\theta-2\pi$); stereographic $\sigma = x/(1-y)$ from $(0,1)$;
  chart representative $f\circ\mathcal{X}^{-1}$, map representative
  $\Phi = \mathcal{Y}\circ\varphi\circ\mathcal{X}^{-1}$; $\mathbb{R}_x$, $\mathbb{R}_y$
  for $\mathbb{R}$ with the charts $x$ and $x^3$. Traps lessons: no `tag: Trap` (the kind says it); line with two origins $0_A, 0_B$. Book's four half-circle charts
  (`ch03-circle`): points $q = (q_1, q_2)$, $\mathscr{X}_\uparrow,
  \mathscr{X}_\downarrow$ read $q_1$ on $q_2 \gtrless 0$, $\mathscr{X}_\rightarrow,
  \mathscr{X}_\leftarrow$ read $q_2$ on $q_1 \gtrless 0$, coordinates $\alpha$
  (first chart) and $\beta$; transitions $\pm\sqrt{1-s^2}$ on $(0,1)$ or $(-1,0)$.
  Lessons write chart maps as `\mathscr{X}`; set is $S^1$ (not $\mathcal{S}^1$).
  Maps: dashed edge = "model example for"; long box titles get a soft hyphen
  (`"Homeo\u00ADmorphism"`) so they fit 3 columns at 390 px.
  Challenge ch03: graph $\Gamma = \{(t,|t|)\}$ with chart $\mathscr{X}(t,|t|) = t$,
  inclusion $\iota$; $N = (0,1)$, $S = (0,-1)$, $\sigma_N = q_1/(1-q_2)$,
  $\sigma_S = q_1/(1+q_2)$, transition $u\mapsto 1/u$; diffeomorphism
  $\phi(p) = \sqrt[3]{p}\colon\mathbb{R}_x\to\mathbb{R}_y$ (maps named $\phi$);
  two origins: charts $(\mathcal{U}_A, \mathscr{X}_A)$, $(\mathcal{U}_B, \mathscr{X}_B)$,
  $\mathcal{U}_A = \mathcal{M}\setminus\{0_B\}$; doubling $D$ (angle $t\mapsto 2t$,
  $q\mapsto q^2$), reflection $R(q_1,q_2) = (q_1,-q_2)$; facts beyond the level
  are flagged "stated here without proof".
- **Chapter 4 conventions so far:** curves pass through $p$ at $\lambda = 0$ in
  widgets ($\gamma(\lambda) = p + \lambda v + \lambda^2 a$; on $S^1$
  $\theta(\gamma(\lambda)) = \theta_p + \lambda w + \lambda^2 a$); two curves are
  $\gamma_1$ (solid) and $\gamma_2$ (dashed); components
  $v^i = (\mathscr{X}^i\circ\gamma)'(0)$ in blue, $v^\theta$ on $S^1$; scalar
  field presets $x$, $y$, $x^2+y$, $\theta$; level lines of $f$ dashed orange.
  Velocity $v_{\gamma,p}(f) := (f\circ\gamma)'(\lambda_0)$, a map
  $C^\infty(\mathcal{M})\to\mathbb{R}$; points of $\mathbb{R}^2$ are $q = (q_1, q_2)$,
  coordinate functions $x(q) = q_1$, $y(q) = q_2$; curve components
  $\gamma^i$, $v^i := (\gamma^i)'(0)$, partials $\partial_i f(p)$; chain rule
  written $\sum_{i=1}^d v^i\,\partial_i f(p)$ (explicit sums until `ch04-einstein`);
  $\oplus_T$, $\odot_T$ defined field by field; C.3 running example
  $\gamma_1(\lambda) = (\lambda, 1)$ at $\lambda_0 = 1$, $\gamma_2(\lambda) = (1, 2\lambda)$
  at $\lambda_0 = \tfrac12$, $p = (1,1)$, $f = q_1^2 + q_2$ (both give 2).
  Polar angle $\theta$ used in the plane only as "smooth near $p$".
- **Tooling:** `tools/shots.mjs` (`playwright-core` in `tools/node_modules`,
  cached Chromium in `~/Library/Caches/ms-playwright/chromium-1248`) renders
  every card with hints/feedback, flags `.katex-display` overflow at 390 px and
  1280 px, saves widget screenshots (`*-widget.png` = widget alone; view that
  one to check readouts). `#/lesson/<id>/<n>` is 1-based. Map lessons are
  expanded with the app's `expandLesson` (checks option bodies and feedback);
  map views (intro, complete) are always screenshotted.

## Log

Built `ch04-tangent-space` (concept, 26 cards, 3 widgets): hook (velocity on
$S^1$ with no plane; predict $\theta_p+\lambda$ vs $\theta_p+2\lambda$), circle
widget + bend MCQ, recall curves/$C^\infty(\mathcal{M})$, why $f\circ\gamma$ is
differentiable, definition, linearity order card, C.3 numerics (2 and 2) and
"one f is not enough", plane widget (Trap preset), chain-rule build + numerics,
chain widget with θ, coordinate functions read components, $T_p\mathcal{M}$ with
$\oplus_T,\odot_T$, hook resolved as $2\odot_T v$, sum numeric (4), why not
$\gamma_1+\gamma_2$ (tease next lesson), four-velocity + thermometer MCQ, wrap-up.
Choices: f = q₁ on $S^1$ (globally smooth; θ is only a chart); θ in the plane
flagged "smooth near p". Conventions fixed here: velocity, $q=(q_1,q_2)$, $x,y$
coordinate functions, $\gamma^i$, $v^i$, explicit chain-rule sum, C.3 example
(see Current).

Widget `curve-velocity` (for `ch04-tangent-space`): plane or `circle: true`
($S^1$, θ chart); two curves through $p$ at λ = 0, velocity handle (blue tip)
and bend handle at γ(−1) that changes the curve but not the velocity; field
buttons $x, y, x^2+y, \theta$ with level lines; panel of λ ↦ f(γ(λ)) with
tangent lines; readouts per curve (formula, components, $(f\circ\gamma)'(0)$,
optional `chain` line), badge same / equal on this f only / different.
Tested with a throwaway preset (plane, plane+chain+θ, circle), drags checked
in Playwright, preset removed. Choices: curves parametrised so λ₀ = 0 (the book
allows any λ₀); coinciding velocity handles grab γ₂'s.
Conventions fixed here: see "Chapter 4 conventions so far" in Current.

ch03-challenge, proofs for facts flagged "without proof" (Igor's request; lesson
now 44 cards): p2-sphere (S² stereographic transition u/|u|², derived from
|u|² = (1+q₃)/(1−q₃)), p2-sphere-num (σ_N = (1,1) ⇒ σ_S = (½,½); decoy
componentwise 1/u), p2-compatible (σ_N⁻¹ explicit; compatible with half-circle
and angle charts, θ∘σ_N⁻¹ = 2 arctan u − π/2 or + 3π/2). p3-meaning: proved the
one-chart case φ = y⁻¹. Kept flagged as beyond the course: smooth structures on
ℝ with many charts, exotic 7-spheres, Whitney (contrast only).
Conventions fixed here: a fact stays "stated without proof" only when its proof
is far beyond the course; otherwise prove it in the simplest way.

ch03-challenge, session 2 of 2 (problems 4–5, 17 cards; lesson now 41):
(4) line with two origins built by gluing two copies of ℝ along t ≠ 0 (book
footnote 2): chart X_A is a homeomorphism onto ℝ, overlap image ℝ∖{0},
transition t ↦ t, tail of 1/n inside (−0.01, 0.01) from n = 101, multi-select
on limits (±1/n → both origins; constant 0_A does not → 0_B, T1 holds),
proof order, which axiom fails, trap on "charts onto ℝ ⇒ inherited
Hausdorff", T/F: no subset of ℝ² is homeomorphic to it (Whitney stated
without proof). (5) doubling D with θ at the source, φ at the target: domain
drops θ = π/2, 3π/2 (three pieces, shifts 0, −2π, −4π), slope 2 at θ = π
(the point the (θ, θ) pair missed), chart change φ∘D∘φ⁻¹ through transitions
(−π/4 ↦ 7π/4 ↦ 3π/2 ↦ −π/2), two preimages, verdict, reflection R is a
diffeomorphism (rep 2π − θ). Choices: went beyond hausdorff.yaml and
smooth-maps.yaml (mixed chart pair, T1 vs Hausdorff, embedding); also
flagged the S² transition, the σ/angle compatibility and exotic spheres in
problems 2–3 as "stated here without proof". Validate 0/0; shots 0 problems.
Conventions fixed here: two-origin charts (𝒰_A, 𝒳_A), 𝒰_A = ℳ∖{0_B};
doubling D, reflection R(q₁, q₂) = (q₁, −q₂); facts beyond the level are
flagged "stated here without proof".

ch03-challenge, session 1 of 2 (problems 1–3, 24 cards): (1) the graph Γ of
|t| is a smooth manifold (inherited Hausdorff/second countable, chart
forgets the height, one-chart atlas), but its inclusion into ℝ² is not
smooth (difference quotients −1/+1 at 0); (2) stereographic charts from N
and S written in q = (q₁, q₂), σ_S derived from the line through S, overlap
image ℝ∖{0}, σ_Nσ_S = 1 via (1−q₂)(1+q₂) = q₁², transition 1/u, slope −1/9
at u = 3, proof order; (3) ℝ_x vs ℝ_y: construct φ = ∛p from y∘φ = x, build
the representative of φ⁻¹, id is smooth one way only (slope 3 at a = 1),
smooth functions on ℝ_y are h(p³), meaning of "different structure".
Choices: stereographic was already taught in ch03-charts (as x/(1−y)), so it
is recalled, not introduced; no widget (problems are computational).
Conventions fixed here: see the Challenge ch03 line in Current.

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

Built `ch03-circle` (guided; book C.2 atlas of four half-circle projection
charts, not the θ/φ atlas: hook "is q ↦ q₁ a chart on all of S¹?"; circle-charts
`show: A` used only for the readout p = (q₁, q₂) to see which halves contain p;
steps topology (∩, build for ∪), Hausdorff (radius ½|p − q|), second countable
(rational discs ∩ S¹), homeomorphism (injectivity via sign of √), cover, overlaps
and transitions (0.6 ↦ 0.8, build −√(1−α²), domain (0,1)), smoothness (endpoint
trap, slope −0.75, order proof), angle chart θ compatible via cos/arccos). The
book's C.2 text stops after the first overlap; the remaining transitions were
completed here. Conventions fixed here: q = (q₁, q₂), \mathscr{X}_↑↓→← with
coordinate α, transitions ±√(1 − s²); S¹ (not 𝒮¹).

Built `ch03-traps` (traps, 14 cards, 12 questions, no widget): open-where
(multi-select: arc open in S¹ not ℝ², [0,1) open in [0,2π) not ℝ, {0}), not
open ⇏ closed, ⋃[1/n,1] = (0,1] not closed, continuous ⇏ open images,
(−1,1) ≅ ℝ via tan(πa/2), subsets of ℝ^d inherit Hausdorff + second countable,
locally ℝ ⇏ Hausdorff (two origins, restated), θ extended to [0,2π) not a chart,
minimum 2 charts on S¹ (numeric), disjoint domains compatible for free, one
failed map ≠ non-diffeomorphic (∛p: ℝ_x → ℝ_y), implications multi-select
(homeomorphism ⇏ smooth via ∛p). The planner's items already covered by
earlier Trap cards (continuous bijection, one-direction, smooth bijection,
different structures, closed-interval image) were replaced by variants.
Also fixed QUICKREF: shots.mjs takes the path relative to content/.
Conventions fixed here: traps lessons carry no `tag: Trap`; line with two
origins written $0_A, 0_B$.

Built `ch03-map` (content map, 15 boxes, 2 decoys each, 17 cards): topology
(decoys: ∩/∪ rules swapped, closed = not open) → standard, inherited,
continuity → homeomorphism; Hausdorff + second countable (dashed from ℝ^d:
the book defines them for any space; a solid edge from the full-width top box
would graze row 2); chart → atlas, transitions → topological manifold;
compatibility → smooth atlas + maximal atlas (one box: the book has no maximal
atlas, the lesson `ch03-atlases` does) → smooth manifold → smooth maps →
diffeomorphism. Decoys: one radius for all points, open sets inside N, images
instead of preimages, T1 instead of Hausdorff, locally Euclidean ⇒ both, chart
on all of M, continuous bijection chart, images cover ℝ^d, disjoint domains,
continuous / one-sided compatibility, all charts = maximal atlas, unique smooth
structure, f∘𝒳, chart independence on topological manifolds, smooth bijection,
homeomorphism ⇒ diffeo. TeX map's "Next: Chapter 4" aside moved to the outro.
shots.mjs now expands map lessons via js/content.js `expandLesson` and
screenshots `mapview` cards (2 lines changed); phone map viewed: fine after
soft-hyphenating Homeomorphism/Diffeomorphism.
Conventions fixed here: map dashed edge = "model example for"; soft hyphen in
long box titles.

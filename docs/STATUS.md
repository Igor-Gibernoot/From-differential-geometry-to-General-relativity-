# Status

Read only **Current** at the start of a session (`sed -n '/^## Current/,/^## Log/p' docs/STATUS.md`).
At the end of a session: update **Current** (built list, queue, conventions) and
append a short entry at the end of **Log** (a few lines, ending with
"Conventions fixed here: …").

## Current (2026-10-20, Chapter 6 in progress: ch06-connections, ch06-christoffel, ch06-parallel-transport, ch06-torsion-curvature, ch06-torsion-tensor, ch06-three-connections, ch06-traps, ch06-map, ch06-challenge part 1 done)

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
- **Chapter 4 complete** (lessons, traps, map, challenge): `ch04-tangent-space`,
  `ch04-velocity-operations`, `ch04-coordinate-basis`, `ch04-chart-basis` (guided B.5), `ch04-einstein`,
  `ch04-cotangent`, `ch04-cotangent-basis`, `ch04-tensor-space`, `ch04-traps`, `ch04-map` (13 boxes),
  `ch04-challenge` (36 cards, five problems: polar chart at $(1,1)$, reparametrization rune and Leibniz,
  $S^1$ angle vs stereographic, trace invariant vs same-height diagonal sum, $v\otimes(df)_p$ in two charts);
  widget `chart-basis` built.
- **Chapter 5 complete** (lessons, traps, map, challenge): `ch05-vector-fields` (concept, 29 cards), `ch05-covector-fields` (concept, 25 cards), `ch05-module` (concept, 27 cards), `ch05-tensor-fields` (concept, 25 cards), `ch05-differentials` (guided, 28 cards), `ch05-traps` (24 cards), `ch05-map` (14 boxes, 7 rows), `ch05-challenge` (38 cards, five problems: rotation field, unit radial field and coframe, ring and zero divisors, closed vs exact, Minkowski boost).
- **Chapter 6 in progress**: `ch06-connections` (concept, 28 cards), `ch06-christoffel` (concept, 28 cards), `ch06-parallel-transport` (concept, 31 cards), `ch06-torsion-curvature` (concept, 35 cards), `ch06-torsion-tensor` (guided, 19 cards), `ch06-three-connections` (guided C.5, 32 cards), `ch06-traps` (21 cards), `ch06-map` (14 boxes, 8 rows); widget `parallel-transport` built and extended (∇ᵂ, ∇^κ, `rectangle` loop with holonomy, `compareE`, `torsion`). `ch06-challenge` part 1 (30 cards: intro + problems 1–3). Next: `ch06-challenge` part 2 (problems 4–5 + wrap-up).
- **Summary rule:** every "What you now own" card states the lesson's main definitions, rules and laws as formulas (e.g. the eight vector-space rules, the three topology rules), not only names them.
- **Index notation rule:** the first lesson using raised labels ($x^1$, $x^2$) is `ch02-axioms`, which has a "labels, not powers" card; any new lesson that introduces a raised label before its predecessors do must say it is a label, not a power.
- **Queue (one unit each):** next `ch06-challenge` part 2 (problems 4–5 + wrap-up); then Chapter 7 (Metric) in `course.yaml` order, and Chapters 8–10 (each with map and challenge). No TeX exercise file exists for Chapter 6:
  use the book (6.1–6.4, B.9, B.10, C.5) as the only source.
  Each planned node in `course.yaml` is one lesson.
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
  Polar angle $\theta$ in the plane is not in $C^\infty(\mathbb{R}^2)$: use an $f$ equal to
  $\theta$ on a disc around $p$, switched off before the jump (same $(f\circ\gamma)'(0)$).
  C.3 charts: $\mathscr{X}(q) = (2q_1, -q_2)$, $\mathscr{Y}(q) = (q_1, q_2e^{q_1})$, chart
  components $\mathscr{X}^i$, chart representative $F := f\circ\mathscr{X}^{-1}$ with
  partials $\partial_i F(\mathscr{X}(p))$; sum curves $\sigma_\mathcal{U}$ (straight,
  $(\lambda+1, 2\lambda+1)$), $\sigma_\mathcal{V}$ ($(\lambda+1, 1+2\lambda e^{-\lambda})$); scaling curve
  $\sigma(\lambda) = \gamma(\lambda_0+\alpha\lambda)$. Basis $(\partial/\partial\mathscr{X}^i)_p$ not yet named.
  `chart-basis` widget: first chart solid lines, second dashed; basis purple
  (second chart dashed); Jacobian $(\partial\mathscr{Y}^i/\partial\mathscr{X}^j)_p$
  with row $i$ ($\mathscr{Y}$), column $j$ ($\mathscr{X}$); chart letters
  $\mathscr{C}$ ($x, y$), $\mathscr{P}$ ($r, \theta$, $\theta\in(0,2\pi)$; `cut: left` gives $(-\pi,\pi)$;
  outside a chart's domain no basis, components or Jacobian);
  C.3 at $p=(1,1)$, $v=(1,2)$: $\mathscr{X}$-components $(2,-2)$,
  $\mathscr{Y}$-components $(1,3e)$, Jacobian $\begin{pmatrix}1/2&0\\e/2&-e\end{pmatrix}$,
  inverse $\begin{pmatrix}2&0\\1&-1/e\end{pmatrix}$, $(\partial/\partial\mathscr{X}^1)_p = (1/2, 0)$,
  $(\partial/\partial\mathscr{X}^2)_p = (0,-1)$, $(\partial/\partial\mathscr{Y}^1)_p = (1,-1)$,
  $(\partial/\partial\mathscr{Y}^2)_p = (0, 1/e)$ (standard components of $\mathbb{R}^2$). Basis now named: $(\partial/\partial\mathscr{X}^i)_p(f) := \partial_i[f\circ\mathscr{X}^{-1}](\mathscr{X}(p))$,
  "chart-induced basis", coordinate curve $c_i(\lambda) = \mathscr{X}^{-1}(\mathscr{X}(p)+\lambda e_i)$;
  components $\dot\gamma^i_\mathcal{U}(\lambda_0)$ (chart $\mathscr{X}$ on $\mathcal{U}$),
  $\dot\gamma^i_\mathcal{V}$ (chart $\mathscr{Y}$ on $\mathcal{V}$), $\delta^i_j$; Jacobian named with the
  book's rune, $(\text{ᛞ}_{\mathcal{V}\mathcal{U}})^i_j(\mathscr{X}(p)) := (\partial\mathscr{Y}^i/\partial\mathscr{X}^j)_p$ (Jacobian of
  $\text{ᛖ}_{\mathcal{U}\mathcal{V}} = \mathscr{Y}\circ\mathscr{X}^{-1}$; first subscript = chart of the row index), fraction form used
  in laws; runes render via `vendor/fonts/NotoSansRunic-runic.woff2` (extends `KaTeX_Main`);
  **never mention "the book" or its section numbers (C.3, B.5) in lessons**: say "the running example";
  basis law uses column $i$ (covariant), component law row $i$ (contravariant);
  Chapter 2 link $J_i^j = (\partial\mathscr{Y}^j/\partial\mathscr{X}^i)_p$ ($\mathscr{X}$ old, $\mathscr{Y}$ new);
  polar chart $\mathscr{P}(q) = (r,\theta)$, $|(\partial/\partial\theta)_p| = r_p$; metric = Level 7.
  B.5 proof: coefficients of a vanishing combination $a^i$ (not the book's $\alpha^i$, which name
  $\mathscr{X}$-coordinates); coordinate functions as test fields justified by a bump function
  ("a velocity only looks near $p$", bump existence stated without proof); C.3 example
  $w = (\partial/\partial\mathscr{X}^1)_p + (\partial/\partial\mathscr{X}^2)_p$ kills $f = q_1^2+q_2$ but $w(\mathscr{X}^1) = 1$;
  polar $c_\theta$ at $p=(1,1)$ defined for $\lambda\in(-\pi/4, 7\pi/4)$.
  **Einstein summation from `ch04-einstein` on** (strict form: sum only over an index once up and
  once down in a term, range $1,\dots,d$; index in a denominator counts as lower; labels
  $\mathcal{U}$, $\mathcal{V}$, $p$ are not indices; same-height repeats never written). Book shorthand
  introduced and usable: $\mathcal{X}_p := v_{\gamma,p}$, $(\partial x_i)_p := (\partial/\partial\mathscr{X}^i)_p$,
  $x^i_p := \dot\gamma^i_\mathcal{U}(\lambda_0)$, $y^i_p$, $(\partial y_i)_p$, second vector $\mathcal{Y}_p = v_{\delta,p}$
  with $\tilde x^i_p$, $\tilde y^i_p$; inverse identity
  $(\partial\mathscr{X}^i/\partial\mathscr{Y}^k)_p(\partial\mathscr{Y}^k/\partial\mathscr{X}^j)_p = \delta^i_j$; $\delta^i_i = d$.
  Cotangent (`ch04-cotangent`): $T_p^*\mathcal{M} := \mathrm{Hom}_\mathbb{R}(T_p\mathcal{M},\mathbb{R})$, operations
  $\oplus_T^*$, $\odot_T^*$ (book's typesetting) value by value; covectors $\mathsf{X}_p$; differential
  $(df)_p(v_{\gamma,p}) := v_{\gamma,p}(f)$ ("differential (or gradient)", read as one symbol); covector
  numbers typewriter lower index $\mathtt{x}^p_i$ (book; $p$ is a label up); $\mathsf{X}_p(v) = \mathtt{x}^p_iv^i$;
  C.3 $(df)_p(v) = 2v^1 + v^2$, kernel direction $(1,-2)$ (level line $q_2 = 2-q_1^2$); a covector is
  pictured as the line it sends to $0$, never an arrow (arrow needs the metric, Level 7).
  Cotangent basis (`ch04-cotangent-basis`): $(d\mathscr{X}^i)_p((\partial/\partial\mathscr{X}^j)_p) = \delta^i_j$ via
  $\mathscr{X}^i\circ\mathscr{X}^{-1}$ = $i$-th projection; "dual chart-induced basis"; $(d\mathscr{X}^i)_p$ pictured as the line
  where $\mathscr{X}^i$ is constant (along the other basis vector); independence coefficients $a_i$ (lower);
  $\mathtt{x}^p_i := \mathsf{X}_p((\partial/\partial\mathscr{X}^i)_p)$, $\mathsf{X}_p = \mathtt{x}^p_i(d\mathscr{X}^i)_p$; chart representatives
  $F(a^1,a^2) = \tfrac14(a^1)^2 - a^2$ ($\mathscr{X}^{-1}(a^1,a^2) = (a^1/2,-a^2)$), $G(b^1,b^2) = (b^1)^2 + b^2e^{-b^1}$
  ($\mathscr{Y}^{-1}(b^1,b^2) = (b^1, b^2e^{-b^1})$); C.3 $(df)_p$: $(1,-1)$ in $\mathscr{X}$, $(1,1/e)$ in $\mathscr{Y}$, pairing with
  $v = (1,2)$ gives $4$ in both; $(d\mathscr{Y}^1)_p = \tfrac12(d\mathscr{X}^1)_p$, $(d\mathscr{Y}^2)_p = \tfrac e2(d\mathscr{X}^1)_p - e(d\mathscr{X}^2)_p$,
  $(d\mathscr{X}^1)_p = 2(d\mathscr{Y}^1)_p$, $(d\mathscr{X}^2)_p = (d\mathscr{Y}^1)_p - \tfrac1e(d\mathscr{Y}^2)_p$; laws written as
  $(d\mathscr{Y}^i)_p = (\partial\mathscr{Y}^i/\partial\mathscr{X}^j)_p(d\mathscr{X}^j)_p$ (row $i$, "contravariant") and
  $\mathtt{y}^p_i = (\partial\mathscr{X}^j/\partial\mathscr{Y}^i)_p\mathtt{x}^p_j$ (column $i$ of inverse, "covariant"), components law derived both
  ways (feeding the vector basis law to $\mathsf{X}_p$, and substituting the dual basis law + independence); vector components in pairings $\dot\gamma^i_\mathcal{U}$, $\dot\gamma^i_\mathcal{V}$;
  every covector is $(d(\psi f))_p$ with bump $\psi$ (existence stated without proof); shorthand $(dx^i)_p$, $(dy^i)_p$,
  $\tilde{\mathtt{x}}^p_i$, $\tilde{\mathtt{y}}^p_i$ introduced and usable; look-alikes $x^i_p$ / $\mathtt{x}^p_i$ / $(dx^i)_p$ flagged.
  Tensor space (`ch04-tensor-space`): $T_p^{(r,s)}\mathcal{M}$, $r$ covector slots first, slot labels $\mathsf{X}^{(1)}$, $\mathcal{X}_{(1)}$
  positional; components $(T_\mathcal{U})^{i\dots}_{j\dots}$, $(T_\mathcal{V})^{k\dots}_{l\dots}$ (chart label in subscript of $T$); products
  $(\mathsf{X}\otimes\mathsf{Y})(u,w) = \mathsf{X}(u)\mathsf{Y}(w)$, velocity factors first; expansion $(T_\mathcal{U})_{ij}(dx^i)_p\otimes(dx^j)_p$,
  $(T_\mathcal{U})^i_j(\partial x_i)_p\otimes(dx^j)_p$; laws new-from-old ($\partial\mathscr{Y}/\partial\mathscr{X}$ per upper, $\partial\mathscr{X}/\partial\mathscr{Y}$ per lower)
  and the book's old-from-new form, derived by feeding and by re-expanding; running example $T = (df)_p\otimes(df)_p$:
  $\mathscr{X}$ $\begin{pmatrix}1&-1\\-1&1\end{pmatrix}$, $\mathscr{Y}$ $\begin{pmatrix}1&1/e\\1/e&1/e^2\end{pmatrix}$; $S_{ij}=\delta_{ij}$ in $\mathscr{X}$ gives
  $\begin{pmatrix}5&-1/e\\-1/e&1/e^2\end{pmatrix}$ in $\mathscr{Y}$ (same matrix, different tensor from $\delta^i_j$); `machine-playground` readout shows
  $\hat{\mathfrak{x}}^i$ (said to stand for $(dx^i)_p$).
  Traps (`ch04-traps`): chart $\mathscr{Z}(q) = (q_1, q_2 - q_1)$ vs cartesian $\mathscr{C}$: $(\partial/\partial\mathscr{Z}^1)_p = (1,1)\ne(\partial/\partial x)_p$
  but $(d\mathscr{Z}^1)_p = (dx)_p$ (a differential depends only on its function; the basis vector on the whole chart);
  mixed pairing $(d\mathscr{Y}^k)_p((\partial/\partial\mathscr{X}^j)_p) = (\partial\mathscr{Y}^k/\partial\mathscr{X}^j)_p$, C.3 $(d\mathscr{X}^1)_p((\partial/\partial\mathscr{Y}^1)_p) = 2$;
  meters/centimeters chart $y = 100x$ for contra- vs covariant; $A = (\partial x_1)_p\otimes(dx^1)_p$ has $\mathscr{Y}$-matrix
  $\begin{pmatrix}1&0\\e&0\end{pmatrix}$; $g = q_1$ with $(dg)_p(v) = v_1$; curvature as a $(1,3)$-tensor, $4^4 = 256$ components (named only).
  Map ch04 (`ch04-map`, 13 boxes, 8 rows): no horizontal edges between adjacent boxes (too short to show at 390 px; use
  diagonals or skip a row); edge readings ("defined from", "basis of", "dual of", "built from") given in the intro legend
  (the engine has no edge labels); Einstein box placed after both laws (compact form of vector and covector laws), so map
  cards before it write explicit sums.
  Challenge ch04 (`ch04-challenge`): cartesian chart $\mathscr{C}(q) = (x,y)$ on $\mathcal{U}$, polar $\mathscr{P}$ on $\mathcal{V}$
  ($\theta\in(0,2\pi)$), short names $(\partial r)_p$, $(\partial\theta)_p$, $(dr)_p$, $(d\theta)_p$; components named by coordinate
  ($v^r$, $v^\theta$, $\mathtt{y}^p_r$, $\mathtt{y}^p_\theta$; on $S^1$ $v^\theta$, $v^\sigma$, $\mathtt{x}^p_\theta$, $\mathtt{y}^p_\sigma$); polar at $p=(1,1)$:
  $(\partial r)_p = (1/\sqrt2,1/\sqrt2)$, $(\partial\theta)_p = (-1,1)$, Jacobian $\begin{pmatrix}1/\sqrt2&1/\sqrt2\\-1/2&1/2\end{pmatrix}$, $v = \tfrac3{\sqrt2}(\partial r)_p + \tfrac12(\partial\theta)_p$,
  $(df)_p = \tfrac3{\sqrt2}(dr)_p - (d\theta)_p$; reparametrization rune $\text{ᚱ}\colon\mathbb{R}\to\mathbb{R}$, $\text{ᚱ}(\mu_0) = \lambda_0$,
  $v_{\gamma\circ\text{ᚱ},p} = \text{ᚱ}'(\mu_0)\odot_T v_{\gamma,p}$ (examples $\mu^2$ at $\mu_0=-1$ gives $-4$; $1+\mu^3$ gives $0$); Leibniz rule
  $v(fg) = f(p)v(g) + g(p)v(f)$ derived here; $S^1$ at $p = (\sqrt3/2, 1/2)$: $\theta_p = \pi/6$, $\sigma_p = \sqrt3$, $d\sigma/d\theta = 1/(1-\sin\theta) = 2$,
  $\sigma^{-1}(s) = (2s/(s^2+1), (s^2-1)/(s^2+1))$, curve $(\cos(\pi/6+3\lambda), \sin(\pi/6+3\lambda))$ ($v^\theta=3$, $v^\sigma=6$), height $f = q_2$
  ($\sqrt3/2 \to \sqrt3/4$, pairing $3\sqrt3/2$).
  Challenge ch04 problems 4–5: trace $(T_\mathcal{U})^i_i$ of a $(1,1)$-tensor vs $\sum_i(S_\mathcal{U})_{ii}$ (same-height sum written
  with $\Sigma$); matrix forms $T_\mathcal{V} = JT_\mathcal{U}J^{-1}$ ($J = (\partial\mathscr{Y}/\partial\mathscr{X})_p$), $S_\mathcal{V} = M^{\mathsf T}S_\mathcal{U}M$
  ($M = (\partial\mathscr{X}/\partial\mathscr{Y})_p$); $T = v\otimes(df)_p$ with $T(\mathsf{X}_p,u) = \mathsf{X}_p(v)(df)_p(u)$, $(T_\mathcal{U})^i_j = x^i_p\mathtt{x}^p_j$:
  $\mathscr{X}$ $\begin{pmatrix}2&-2\\-2&2\end{pmatrix}$, $\mathscr{Y}$ $\begin{pmatrix}1&1/e\\3e&3\end{pmatrix}$, trace $4 = (df)_p(v)$; $(\partial y_2)_p$ standard $(0,1/e)$.
- **Chapter 5 conventions so far** (`ch05-vector-fields`): $T\mathcal{M} := \dot\bigcup_p T_p\mathcal{M}$ (disjoint because all zero
  velocities are the same map $f\mapsto0$), projection $\pi(v_{\gamma,p}) = p$, fibre; bundle chart $\xi_{\mathscr{X}}(\mathcal{X}_p) = (\mathscr{X}(p)\,;\,x^1_p,\dots,x^d_p)$,
  transition $(\text{ᛖ}_{\mathcal{U}\mathcal{V}}(\alpha)\,;\,(\text{ᛞ}_{\mathcal{V}\mathcal{U}})^i_j(\alpha)\beta^j)$, $\dim T\mathcal{M} = 2d$, topology stated without proof; general bundle
  $\pi\colon\mathcal{E}\to\mathcal{B}$, section $\pi\circ\sigma = \mathrm{id}_\mathcal{B}$ (example $\pi(a,b) = a$); field $\mathcal{X}$ (calligraphic) vs chart $\mathscr{X}$;
  $\Gamma T\mathcal{M}$; restriction $\mathcal{X}|_\mathcal{U}$; component functions $x^i(p) := \mathcal{X}(p)(\mathscr{X}^i) = \mathcal{X}|_\mathcal{U}\lfloor\mathscr{X}^i\rceil$, basis fields
  $\partial x_i := \partial/\partial\mathscr{X}^i$, $\mathcal{X}|_\mathcal{U} = x^i\,\partial x_i$; field law $y^i = (\partial\mathscr{Y}^i/\partial\mathscr{X}^j)\,x^j$ as functions on the overlap;
  action $\mathcal{X}\lfloor f\rceil(p) := \mathcal{X}(p)(f) = x^i(p)\,\mathtt{x}^p_i$ (three readings: point first, function first, both);
  non-smooth section $|b|\,\partial x_1$. Running example (egg carton): $h(a,b) = \cos a\cos b + 1$, $\mathcal{M}$ its graph, $\mathscr{X}(a,b,c) = (a,b)$ on
  $\mathcal{U} = \mathcal{M}$, polar $\mathscr{Y} = (r,\operatorname{atan2}(b,a))$ on $\mathcal{V}$ (minus $a\le0$, $b=0$), Jacobian $\begin{pmatrix}a/r&b/r\\-b/r^2&a/r^2\end{pmatrix}$;
  vertical curves $\gamma_{x_0}$, field $\mathcal{X}$ with $X^i = (0,1)$, $Y^i = (b/r, a/r^2)$ ($Y^2 = 3/25$ at $(3,4)$); circles $\delta_{r_0}$, swirl $\mathcal{Y}$
  with $\tilde X^i = (-b,a)$, $\tilde Y^i = (0,1)$, zero at the origin; height $f = \cos a\cos b+1$, $\mathtt{x}^p = (-\sin a\cos b, -\cos a\sin b)$,
  $\mathcal{X}\lfloor f\rceil = -\cos a\sin b$ ($-1$ at $(0,\pi/2)$), $\mathcal{Y}\lfloor f\rceil = b\sin a\cos b - a\cos a\sin b$ ($\pi$ at $(\pi,\pi/2)$);
  $\partial y_1$ does not extend to the origin; $\mathcal{X},\mathcal{Y}$ fail to span on $b = 0$. Widget `chart-basis` with named charts
  `{chart: cartesian, name: '\mathscr{X}'}`, `{chart: polar, name: '\mathscr{Y}', cut: left}` and presets placing the swirl arrow $(-q_2,q_1)$.
  Covector fields (`ch05-covector-fields`): $T^*\mathcal{M} := \dot\bigcup_p T_p^*\mathcal{M}$, $\pi^*(\mathsf{X}_p) = p$, $T^*\mathcal{U} := \mathrm{preim}_{\pi^*}(\mathcal{U})$,
  $\xi^*_{\mathscr{X}}(\mathsf{X}_p) = (\mathscr{X}(p)\,;\,\mathtt{x}^p_i)$, inverse $(\alpha;\beta)\mapsto\beta_k(dx^k)_p$ (fibre coords $\beta_k$ lower), transition
  $(\text{ᛖ}_{\mathcal{U}\mathcal{V}}(\alpha)\,;\,(\text{ᛞ}_{\mathcal{U}\mathcal{V}})^k_j\beta_k)$ with $(\text{ᛞ}_{\mathcal{U}\mathcal{V}})^k_j(\mathscr{Y}(p)) := (\partial\mathscr{X}^k/\partial\mathscr{Y}^j)_p$ (Jacobian of $\text{ᛖ}_{\mathcal{V}\mathcal{U}} = \mathscr{X}\circ\mathscr{Y}^{-1}$);
  $\Gamma T^*\mathcal{M}$, exact $= df$; component functions $\mathtt{x}_i(p) := \mathsf{X}(p)((\partial x_i)_p)$, basis covector fields $dx^i := d\mathscr{X}^i$,
  $\mathsf{X}|_\mathcal{U} = \mathtt{x}_i\,dx^i$; law $\mathtt{y}_i = (\partial\mathscr{X}^j/\partial\mathscr{Y}^i)\,\mathtt{x}_j$ (old-from-new $\mathtt{x}_i = (\partial\mathscr{Y}^j/\partial\mathscr{X}^i)\mathtt{y}_j$);
  action written with the book's brackets $\mathsf{X}\lceil\mathcal{X}\rfloor(p) := \mathsf{X}_p(\mathcal{X}(p)) = \mathtt{x}_i x^i$ (mirror of $\lfloor\ \rceil$), $\mathtt{x}_i = \mathsf{X}|_\mathcal{U}\lceil\partial x_i\rfloor$,
  $df\lceil\mathcal{X}\rfloor = \mathcal{X}\lfloor f\rceil$; $g\,\mathcal{X}$ pointwise used informally ($C^\infty$-linearity vs Leibniz). Egg carton: $df$ components $\mathtt{X}_i = (-\sin a\cos b, -\cos a\sin b)$,
  polar $\mathtt{Y}_1 = \tfrac ar\mathtt{X}_1+\tfrac br\mathtt{X}_2$, $\mathtt{Y}_2 = -b\mathtt{X}_1 + a\mathtt{X}_2$; at $(\pi,\pi/2)$: $\mathtt{X} = (0,1)$, $\mathtt{Y} = (1/\sqrt5, \pi)$, $r = \tfrac{\sqrt5}2\pi$,
  $\mathcal{X}$ polar comps $(1/\sqrt5, 4/(5\pi))$, $df\lceil\mathcal{X}\rfloor = 1$. Non-exact example $\mathsf{Z} = -b\,dx^1 + a\,dx^2$ (mixed partials $-1$ vs $1$; $= r^2dy^2$ in polar);
  $d\theta$-like field $(-b/r^2, a/r^2)$ on the punctured plane left as teaser for `ch05-differentials`. Widget: `curve-velocity` with fields `[x2y, x, theta]`,
  level lines as the picture of the whole field $df$.
  Module (`ch05-module`): ring ops $\oplus_{C^\infty}$, $\odot_{C^\infty}$ (vs $\oplus$, $\odot$ of the real vector space); field ops $\oplus_\Gamma$, $\odot_\Gamma$,
  $\oplus^*_\Gamma$, $\odot^*_\Gamma$ defined by action ($\lfloor\ \rceil$, $\lceil\ \rfloor$), shown equal to pointwise $(f\,\mathcal{X})(p) = f(p)\mathcal{X}(p)$; short forms
  $f\,\mathcal{X}$, $\mathcal{X}_1+\mathcal{X}_2$, $h\,\mathsf{X}$ allowed from here on; module axioms listed in a `gathered`; zero divisors $\psi(t) = e^{-1/t}$ ($t>0$), $\psi(-t)$
  (smoothness stated without proof); "$\mathbb{R}$-algebra" named; $\mathbb{Z}$ example $\{2\}$; on $\mathbb{R}$ chart $\mathscr{X}(t) = t$, $\mathcal{W} = \mathscr{X}\,\partial x_1$
  (independent, not spanning); egg-carton $\mathcal{X},\mathcal{Y}$ pointwise determinant $b$, independent over $C^\infty$ but not spanning, basis on $b\neq0$
  ($g = -1/b$, $f = a/b$ for $\partial x_1$); frame $\{e_a\}$ with index $a$, coefficients $f^a$/$w^a$; polar frame $(\partial r)_q = (q_1/r, q_2/r)$,
  $(\partial\theta)_q = (-q_2,q_1)$ is a frame on the plane minus the origin (beyond the chart domain), determinant $r$; $S^1$: $\partial\varphi = \partial\theta$ on both arcs;
  parallelizable/free; hairy ball stated without proof; egg carton $\mathcal{X}+\mathcal{Y} = -b\,\partial x_1 + (1+a)\partial x_2$, $f\mathcal{X} = (\cos a\cos b+1)\partial x_2$,
  zero at $(\pi,0)$; $(f\,df)\lceil\mathcal{X}\rfloor = -3\sqrt3/4$ at $(0,\pi/3)$; $\Gamma T\mathbb{R}^2$ infinite-dimensional over $\mathbb{R}$; connections named as Level 6.
  Widget: `chart-basis` with one cartesian chart, presets placing swirl vs unit arrows, view `{x: -1, y: -1.5, w: 4.5, h: 4.5}` (keeps $p = (2,0)$ and its basis on screen at 390 px).
  Tensor fields (`ch05-tensor-fields`): $C^\infty(\mathcal{M})$-multilinear in each slot, $r$ covector-field slots first; $\Gamma T^{(r,s)}\mathcal{M}$ (a module);
  vector field as $(1,0)$ via $\mathsf{Z}\mapsto\mathsf{Z}\lceil\mathcal{X}\rfloor$ (not via $h\mapsto\mathcal{X}\lfloor h\rceil$, Leibniz); generic slot fields $\mathcal{Z},\mathcal{W}$ with components
  $z^i, w^i$, $\mathsf{Z}$; pointwise principle proved with bump $\psi$ ($\psi^2\mathcal{Z} = (\psi z^i)(\psi\,\partial x_i)$), converse "every $C^\infty$-linear map on
  covector fields is a vector field" stated; non-tensor $D(\mathcal{Z}) := \partial x_1\lfloor z^1\rceil$ on the plane ($\partial x_1$ vs $(1+\mathscr{X}^1)\partial x_1$: $0$ vs $1$ at origin);
  products of fields $(\mathsf{X}\otimes\mathsf{Y})(\mathcal{Z}_1,\mathcal{Z}_2) := \mathsf{X}\lceil\mathcal{Z}_1\rfloor\mathsf{Y}\lceil\mathcal{Z}_2\rfloor$; components $T^{i\dots}_{j\dots}$ (one chart),
  $(T_\mathcal{U})_{ij}$, $(T_\mathcal{V})_{kl}$ (two charts), fed basis fields via restriction $T|_\mathcal{U}$; Jacobian functions
  $\partial\mathscr{X}^i/\partial\mathscr{Y}^k = (\text{ᛞ}_{\mathcal{U}\mathcal{V}})^i_k$. Egg carton $T = df\otimes df$: $T_{ij} = \mathtt{X}_i\mathtt{X}_j$, $T_{12} = 3/16$ at $(\pi/3,\pi/6)$
  (matrix $\begin{pmatrix}9/16&3/16\\3/16&1/16\end{pmatrix}$), $T(\mathcal{X},\mathcal{Y}) = \pi$ at $(\pi,\pi/2)$, polar Jacobian $\begin{pmatrix}a/r&-b\\b/r&a\end{pmatrix}$,
  $(T_\mathcal{V})_{kl} = \mathtt{Y}_k\mathtt{Y}_l$, $(T_\mathcal{V})_{22} = \pi^2$ at $(\pi,\pi/2)$; Euclidean $\delta_{ij}$ becomes $\mathrm{diag}(1,r^2)$ in polar (metric preview).
  Five roles of $x$ listed ($\mathscr{X}^i$, $x^i_p$/$\mathtt{x}^p_i$, $x^i$/$\mathtt{x}_i$, $(\partial x_i)_p$/$(dx^i)_p$, $\partial x_i$/$dx^i$). Widget `machine-playground`
  slots 2 with presets per point (tensor + inputs $\mathcal{X} = (0,1)$, swirl) at $(\pi,\pi/2)$, $(\pi/2,\pi/4)$, $(\pi/3,\pi/6)$.
  Differentials (`ch05-differentials`): exact $= df$ on all of $\mathcal{M}$, closed = (S) $\partial x_j\lfloor\mathtt{x}_i\rceil = \partial x_i\lfloor\mathtt{x}_j\rceil$ (written with `\tag{S}`);
  whirlpool $\mathsf{Z} = -b\,dx^1 + a\,dx^2$ (components $\mathtt{z}_i$, difference $2$; polar $\mathtt{y} = (0,r^2)$, difference $2r$ = det factor); angle field
  $\mathsf{A} = -\tfrac b{r^2}dx^1 + \tfrac a{r^2}dx^2$ on $\mathbb{R}^2\setminus\{0\}$ (components $\mathtt{a}_i$, mixed partials $(b^2-a^2)/r^4$, $3/25$ at $(1,2)$), polar
  $(0,1)$ so $\mathsf{A}|_\mathcal{V} = d\theta := d\mathscr{Y}^2$ with $\theta\in(0,2\pi)$, $\mathcal{V}$ = plane minus $\{b=0, a\ge0\}$; velocity along a curve
  $\dot\gamma(\lambda) := v_{\gamma,\gamma(\lambda)}$, $\int_\gamma\mathsf{X} := \int\mathsf{X}_{\gamma(\lambda)}(\dot\gamma(\lambda))d\lambda$ (one-variable only; general integration = Level 8);
  unit-circle integral $2\pi$; naive glue $f = \mathtt{z}_i\mathscr{X}^i = 0$; $g\,df = d(gf) - f\,dg$ (differentials not a module, $\mathscr{X}^1dx^2$);
  chart-independence of (S) derived (second-derivative term symmetric); Poincaré recipe $F(\alpha) = \int_0^1\bar{\mathtt{x}}_i(t\alpha)\alpha^idt$,
  $\bar{\mathtt{x}}_i := \mathtt{x}_i\circ\mathscr{X}^{-1}$, example $2ab\,dx^1 + a^2dx^2 \to F = (\alpha^1)^2\alpha^2$ ($F(1,2) = 2$), recipe on $\mathsf{Z}$ gives $F=0$;
  global criterion (all closed-curve integrals vanish) stated with sketch; 1-forms, $d\mathsf{X}=0$, de Rham $H^1$ named only. Widget `curve-velocity`
  $p = (0,1)$, $f = \theta$, curves $(-1,0)$, $(0,\tfrac12)$, view `{x: -2.5, y: -1.5, w: 5, h: 5}`. Minkowski boost problem from the TeX file kept for `ch05-challenge`.
  Traps (`ch05-traps`): swirl components $\tilde X^i$ at $(2,3)$ give $(-3,2)$; $\dim TS^2 = 4$; sections of $\pi(a,b) = a$; $b|b|\,\partial x_1$ is $C^1$ not smooth;
  inverse polar Jacobian $\begin{pmatrix}a/r&-b\\b/r&a\end{pmatrix}$, at $(3,4)$: $\partial x_1 = \tfrac35\partial y_1 - \tfrac4{25}\partial y_2$, $dx^1 = \tfrac35dy^1 - 4\,dy^2$;
  $\mathcal{X}\lfloor\mathcal{X}\lfloor f\rceil\rceil = -\cos a\cos b$; $df\lceil\mathcal{Y}\rfloor = -\pi$ at $(\pi/2,\pi)$ (mixed-chart pairing gives $0$); $\psi(t)\cdot\psi(-t)\partial x_1 = 0$;
  $\partial x_1, a\,\partial x_2$ independent not spanning; $A\colon h\mapsto\mathcal{X}\lfloor h\rceil$ vs $B = dh$; $E(\mathcal{Z}) = (z^1)^2$ pointwise but not a tensor;
  $3a^2b\,dx^1 + c\,a^3dx^2$ closed iff $c = 1$ ($= d(a^3b)$); $b\,dx^1$ not closed; angle field $= d\arctan(b/a)$ on $a>0$.
  Map ch05 (`ch05-map`, 14 boxes, 7 rows): rows tp/bundle/tpstar; tm, tsm; vf, cf; ring, action; module, closed-exact; frames, angle;
  tensor (bottom centre). Edge labels "fibre of", "instance", "sections", "act on $f$", "eat fields", "scalars of", "bases",
  "components", "more slots", "which are $df$?", dashed "model example" (angle field up to closed/exact); action→module unlabelled
  (labels too close to "scalars of"). Outro states the laws as displayed formulas, then teases the Minkowski boost.
  Challenge ch05 (`ch05-challenge`, part 1): plane $(a,b)$, cartesian $\mathscr{X}$, polar $\mathscr{Y} = (r,\theta)$, $\theta\in(0,2\pi)$ (cut $\{b=0,a\ge0\}$);
  rotation field $\mathcal{R} := -b\,\partial x_1 + a\,\partial x_2 = \partial y_2$ ($L_z$ up to $-i\hbar$), $\mathsf{Z} = r^2dy^2$; $\mathcal{R}\lfloor a^2-b^2\rceil = -4ab$ ($-8$ at $(1,2)$, also via
  $r^2\cos2\theta$); $(\mathsf{A}+\mathsf{Z})\lceil\mathcal{R}\rfloor = 1 + r^2$ ($6$ at $(1,2)$); radial $\mathcal{P} := a\,\partial x_1 + b\,\partial x_2$, length = sum of squares of cartesian components;
  unit radial $\mathcal{E} := \tfrac1r\mathcal{P} = \partial y_1$ ($f = \pm1/r$ only); frame $\{\mathcal{E},\mathcal{R}\}$ (det $r$) with dual coframe $\{dr,\mathsf{A}\}$,
  $dr = \tfrac ar dx^1 + \tfrac br dx^2$; $\partial x_2 = \tfrac br\mathcal{E} + \tfrac a{r^2}\mathcal{R}$ ($3/25$ at $(3,4)$); zero divisor iff vanishing on an open interval
  (bump $\psi(t-\alpha)\psi(\beta-t)$), $\psi(1-t^2)$; $\{f\,\partial x_1\}$ independent iff $f$ not a zero divisor; axiom check $((a+b^2)\mathcal{R})\lfloor a\rceil = -10$ at $(1,2)$.
  Challenge ch05 part 2: $\mathsf{B} = (2ab+b^2)dx^1 + (a^2+2ab)dx^2$ (components $\mathtt{b}_i$, (S) value $6$ at $(1,2)$), potential $a^2b+ab^2$ (naive glue gives $3\times$),
  $\int_\gamma\mathsf{B} = 4$ from $(1,1)$ to $(2,1)$; $\mathsf{A}+d(a^3b)$ still $2\pi$ on radius-2 circle; half-plane potential $\arctan(b/a)$ (loop at $(3,0)$ gives 0);
  $\mathsf{A} = d\theta$ on $\mathcal{V}$, $= d\varphi$ on $\mathcal{W}$ (plane minus $\{b=0,a\le0\}$), not exact on the union. Minkowski: $\mathbb{R}^2$ points $(t,a)$, $c = 1$,
  $\eta := -dx^1\otimes dx^1 + dx^2\otimes dx^2$, $(\eta_\mathcal{U})_{ij} = \mathrm{diag}(-1,1)$ (4D in one sentence); boost $t' = \kappa(t - va)$, $a' = \kappa(a-vt)$,
  Lorentz factor **$\kappa$** (not $\gamma$, which names curves); $\partial\mathscr{X}/\partial\mathscr{Y} = \kappa\begin{pmatrix}1&v\\v&1\end{pmatrix}$; $v = 3/5$, $\kappa = 5/4$; trap charts: rescale by 2
  gives $\mathrm{diag}(-\tfrac14,\tfrac14)$, $45°$ rotation gives $\begin{pmatrix}0&1\\1&0\end{pmatrix}$; $\mathcal{W} = \partial x_1 + a\,\partial x_2$, $\eta(\mathcal{W},\mathcal{W}) = a^2 - 1$
  (boosted components $(\tfrac78,-\tfrac18)$ at $a = \tfrac12$); timelike $<0$, spacelike $>0$, lightlike $=0$ (names only); "metric" only as Level 7 teaser.
- **Chapter 6 conventions so far** (`ch06-connections`): plane, points $(a,b)$, cartesian $\mathscr{X}$ on $\mathbb{R}^2$, polar $\mathscr{Y} = (r,\operatorname{atan2}(b,a))$,
  $\theta\in(-\pi,\pi)$, on $\mathcal{V}$ = plane minus $\{b=0,a\le0\}$ (widget `cut: left`); $\partial x_1$ polar components $(a/r,-b/r^2)$, $(0,-1)$ at $(0,1)$.
  Pointwise definition as in the book: $\nabla\colon T_p\mathcal{M}\times\Gamma T^{(r,s)}\mathcal{M}\to T_p^{(r,s)}\mathcal{M}$, $\nabla_{\mathcal{X}_p}T$ "covariant derivative of $T$ along $\mathcal{X}_p$";
  "Rules" 1–5 in the book's order (scalar $\nabla_{\mathcal{X}_p}f = \mathcal{X}_p(f)$, additivity, Leibniz written for $(1,1)$ $T(\mathsf{X},\mathcal{Y})$ with values $T_p,\mathsf{X}_p,\mathcal{Y}_p$,
  linearity in direction with $\alpha$, smoothness $\nabla_\mathcal{X}T$); $C^\infty$-linearity in direction derived ($\alpha = f(p)$); $\oplus_\Gamma$ now written $+$.
  Tangent vector acting on functions written $\mathcal{X}_p(f)$ (book), field level $\mathcal{X}\lfloor g\rceil$. Generic differentiated field $\mathcal{Y}$ with components $\tilde x^j$ ($\mathscr{X}$),
  $\tilde y^k$ ($\mathscr{Y}$), direction components $x^i_p$; $\partial_i$ = slot derivative on $\mathbb{R}^d$, extra term $\tilde x^j(p)x^i_p\partial_i\partial_j(\text{ᛖ}_{\mathcal{U}\mathcal{V}})^k$ ($=-1$ for $\partial x_1$
  along $\partial x_2$ at $(1,0)$). Product rule $\nabla_{\mathcal{X}_p}(g\mathcal{Y}) = \mathcal{X}_p(g)\mathcal{Y}_p + g(p)\nabla_{\mathcal{X}_p}\mathcal{Y}$ (derived via $\mathcal{Y}(\mathsf{X}) := \mathsf{X}\lceil\mathcal{Y}\rfloor$);
  covector rule $(\nabla_{\mathcal{X}_p}\mathsf{X})(\mathcal{Y}_p) = \mathcal{X}_p(\mathsf{X}\lceil\mathcal{Y}\rfloor) - \mathsf{X}_p(\nabla_{\mathcal{X}_p}\mathcal{Y})$. Affine manifold $(\mathcal{M},\mathcal{O},\mathcal{A},\nabla)$.
  Connections $\nabla^{\mathrm{E}}$ (constant cartesian components, book's label) and **$\nabla^{\mathrm{P}}$** (constant polar components, on $\mathcal{V}$; my label, not the book's);
  $\nabla^{\mathrm{E}}_{\partial x_2}$swirl $= -\partial x_1$, $\nabla^{\mathrm{E}}_{\text{swirl}}\partial x_2 = 0$, $\nabla^{\mathrm{P}}_{\partial x_2}$swirl $= 0$ (swirl $=\partial y_2$); $f = a^2b$: $\nabla_{(\partial x_2)_p}f = 9$
  at $(3,1)$, $(\nabla^{\mathrm{E}}_{(\partial x_2)_p}df)(\partial x_1) = 2a = 6$. Rule-4 numeric: directions $\partial x_1\to(1,2)$, $\partial x_2\to(0,5)$. Words: connection = structure, covariant
  derivative = output; Ehresmann/gauge remark in one card. $\Gamma_\mathscr{X}$ teased with note "unrelated to $\Gamma T\mathcal{M}$". Lorentz factor $\kappa$ of ch05 unrelated.
  `ch06-christoffel`: book's index order $(\Gamma_\mathscr{X})^i_{jk}(p) := (dx^i)_p(\nabla_{(\partial x_k)_p}\partial x_j)$, **last lower index = direction**; components
  $(\nabla_\mathcal{X}\mathcal{Y})^k = \mathcal{X}\lfloor\tilde x^k\rceil + \Gamma^k_{ji}\tilde x^jx^i$, $(\nabla_\mathcal{X}\mathsf{X})_k = \mathcal{X}\lfloor\mathtt{x}_k\rceil - \Gamma^j_{ki}\mathtt{x}_jx^i$, $\tilde\Gamma = -\Gamma$; (1,1) rule with $m,\ell$.
  Transformation law with summation index $m$ (book's $p$, renamed to avoid the point $p$); second derivative $\partial^2\mathscr{X}^s/\partial\mathscr{Y}^k\partial\mathscr{Y}^j$ of $\text{ᛖ}_{\mathcal{V}\mathcal{U}} = \mathscr{X}\circ\mathscr{Y}^{-1}$.
  Polar $\nabla^{\mathrm{E}}$: $(\Gamma^{\mathrm{E}}_\mathscr{Y})^1_{22} = -r$, $(\Gamma^{\mathrm{E}}_\mathscr{Y})^2_{12} = (\Gamma^{\mathrm{E}}_\mathscr{Y})^2_{21} = 1/r$ (numeric indices, not $r\theta$); check point $(3,4)$: $-5$, $0.2$,
  $\nabla^{\mathrm{E}}_{\partial x_2}$swirl polar components $(-0.6, 0.16)$; $\partial x_2$ polar components $(b/r, a/r^2)$. $(\Gamma^{\mathrm{P}}_\mathscr{X})^2_{12}(1,0) = -1$. Invented connection
  $\Gamma^1_{22} = a$: $\nabla_{\partial x_2}(b\,\partial x_2) = 2\partial x_1 + \partial x_2$ at $(2,1)$. Normal coordinates stated in one card (symmetric part removable at a point).
  Widget preset: `chart-basis` polar first + cartesian, `basisOnly`, `chain` (labels $\partial/\partial r$ etc., mapped to $\partial y_i$ in the body).
  Widget `parallel-transport` (built for `ch06-parallel-transport`): curves `circle` $\delta_{r_0}(\lambda) = (r_0\cos\lambda, r_0\sin\lambda)$, $\lambda\in[0,2\pi]$, `vertical` $\gamma_{x_0}(\lambda) = (x_0,\lambda)$,
  `radial`, `radial-squared` ($\lambda^2$: autoparallel, not autoparallelly transported); transported vector $\mathcal{Z}$ with components $z^k$, velocity $v_\gamma$ (components $\dot\gamma^i$),
  acceleration $a_\gamma = \nabla_{v_\gamma}v_\gamma$; transport equation $\dot z^k + \Gamma^k_{ji}z^j\dot\gamma^i = 0$; badge wording "autoparallel" ($a_\gamma = \text{ᚱ}\,v_\gamma$) vs "autoparallelly
  transported" ($a_\gamma = 0$), the book's terms. $\nabla^{\mathrm{P}}$ transport stops where the curve leaves $\mathcal{V}$ (circle at $\lambda = \pi$). Check: $r_0 = 2$, $z_0 = (1,0)$, $\lambda = 1.2$ under $\nabla^{\mathrm{E}}$: polar $(0.36, -0.47)$.
  `ch06-parallel-transport`: field along $\gamma$ $\mathcal{X}_\gamma(\lambda)\in T_{\gamma(\lambda)}\mathcal{M}$, components $x^k_\gamma(\lambda) := (dx^k)_{\gamma(\lambda)}(\mathcal{X}_\gamma(\lambda))$, dot $= d/d\lambda$,
  velocity components $\dot\gamma^i$ (chart label dropped), $v_\gamma(\lambda)$; figure-eight $\gamma(\lambda) = (\sin\lambda, \tfrac12\sin2\lambda)$ (velocities $(1,1)$, $(-1,1)$ at the origin);
  $\nabla_{v_\gamma}$ with properties ($\mathbb{R}$-linear, Leibniz with ᚱ a function of $\lambda$, compatibility); chart formula labelled (C) (`\tag{C}`; the book's $(**)$ not used) $(\nabla_{v_\gamma}\mathcal{X}_\gamma)^k = \dot x^k_\gamma + \Gamma^k_{ji}x^j_\gamma\dot\gamma^i$;
  "autoparallel equation" labelled (A) (`\tag{A}`; book equation numbers never used); $a^k_\gamma = \ddot\gamma^k + \Gamma^k_{ji}\dot\gamma^i\dot\gamma^j$; reparametrization rune as in ch04, $\delta\circ\text{ᚱ}$ (new acceleration $\text{ᚱ}''v + (\text{ᚱ}')^2a$); ᚱ also the factor in "parallel"/"autoparallel" as in the book;
  antisymmetric example $\Gamma^1_{12} = 1$, $\Gamma^1_{21} = -1$ (cartesian): straight-line autoparallels, transport of $(0,1)$ along $(\lambda,0)$ gives $(\lambda,1)$ (torsion teaser);
  vertical line check at $x_0 = \lambda = 1$: $r = \sqrt2$, $\dot\gamma = (1/\sqrt2, 1/2)$, $\ddot\gamma = (\sqrt2/4, -1/2)$; radial $\lambda^2$: $\text{ᚱ} = 1/\lambda$; sphere holonomy ($90°$) stated without proof.
  Widget extension for `ch06-torsion-curvature`: connection labels $\nabla^{\mathrm{W}}$ (frame $e_1$ radial, $e_2$ angular unit fields declared parallel, plane minus origin; book's label, "teleparallel"/Weitzenböck)
  and $\nabla^{\kappa}$ ($(\Gamma^\kappa_\mathscr{X})^1_{22} = \kappa a$); torsion components $\mathtt{T}^i_{jk} = \Gamma^i_{kj} - \Gamma^i_{jk}$ (book order), Riemann $\mathrm{Riem}^i_{jkm}$ (book), holonomy
  $\Delta z^1 = -\mathrm{Riem}^1_{212}\,z^2\times\text{area}$ for counterclockwise loops; rectangle loop one side per unit of $\lambda\in[0,4]$; check $\kappa=1$, $[1,2]\times[0,1]$, $z_0=(0,1)$: $\Delta z = (-1,0)$.
  `ch06-torsion-curvature`: commutator $[\mathcal{X},\mathcal{Y}]\lfloor f\rceil := \mathcal{X}\lfloor\mathcal{Y}\lfloor f\rceil\rceil - \mathcal{Y}\lfloor\mathcal{X}\lfloor f\rceil\rceil$, components $[\mathcal{X},\mathcal{Y}]^k = \mathcal{X}\lfloor\tilde x^k\rceil - \mathcal{Y}\lfloor x^k\rceil$
  ($\mathcal{X} = x^i\partial x_i$, $\mathcal{Y} = \tilde x^j\partial x_j$), rule $[\mathcal{X},g\mathcal{Y}] = \mathcal{X}\lfloor g\rceil\mathcal{Y} + g[\mathcal{X},\mathcal{Y}]$; example $\mathcal{X} = \partial x_2$, swirl $\mathcal{Y} = -b\,\partial x_1 + a\,\partial x_2$, $[\mathcal{X},\mathcal{Y}] = -\partial x_1$
  ($-6$ on $a^2b$ at $(3,1)$); $[e_1,e_2] = -\tfrac1r e_2$, $e_2 = \tfrac1r\partial y_2$. Torsion $\mathtt{T}(\mathsf{X},\mathcal{X},\mathcal{Y})$ (book form), $\mathtt{T}^i_{jk} = \Gamma^i_{kj} - \Gamma^i_{jk}$; tilting example $\mathtt{T}^1_{12} = -2$;
  $\nabla^{\mathrm{W}}$ cartesian $\Gamma^2_{11} = b/r^2$, $\Gamma^2_{12} = -a/r^2$, $\Gamma^1_{21} = -b/r^2$, $\Gamma^1_{22} = a/r^2$, $\mathtt{T}^1_{12} = -b/r^2$, $\mathtt{T}^2_{12} = a/r^2$ ($3/25$ at $(3,4)$), $\mathtt{T}(\cdot,e_1,e_2) = \tfrac1r e_2$;
  $\mathrm{Riem}(\mathsf{X},\mathcal{Z},\mathcal{X},\mathcal{Y})$ (book form), summation index $n$ (never $r$) in $\mathrm{Riem}^i_{jkm} = \partial x_k\lfloor\Gamma^i_{jm}\rceil - \partial x_m\lfloor\Gamma^i_{jk}\rceil + \Gamma^i_{nk}\Gamma^n_{jm} - \Gamma^i_{nm}\Gamma^n_{jk}$;
  2D: 4 components $\mathrm{Riem}^i_{j12}$; ∇ᴱ polar $\mathrm{Riem}^1_{212} = -1+1 = 0$; ∇^κ $\mathrm{Riem}^1_{212} = \kappa$, $\mathrm{Ric}_{ab} = \mathrm{Riem}^m_{amb}$, $\mathrm{Ric} = \kappa\,dx^2\otimes dx^2$; holonomy numeric κ=2, $[1,2]\times[0,3]$,
  $z=(5,2)$: $-12$; square $[-1,1]^2$ under κ=1: $-4$; flat+torsion-free ⇔ local chart with Γ=0 stated (both directions named, easy one shown); Bianchi named (component form).
  `ch06-torsion-tensor`: torsion vector field $\mathcal{V}(\mathcal{X},\mathcal{Y}) := \nabla_\mathcal{X}\mathcal{Y} - \nabla_\mathcal{Y}\mathcal{X} - [\mathcal{X},\mathcal{Y}]$ (book's name; said to be unrelated to a chart domain),
  $\mathtt{T}(\mathsf{X},\mathcal{X},\mathcal{Y}) := \mathsf{X}\lceil\mathcal{V}\rfloor$ with general covector fields $\mathsf{X},\mathsf{Y}$ (book uses $df, dh$); facts labelled (a)–(d) inside the lesson (book's own list);
  rule $[g\mathcal{X}+\mathcal{Z},\mathcal{Y}] = g[\mathcal{X},\mathcal{Y}] + [\mathcal{Z},\mathcal{Y}] - \mathcal{Y}\lfloor g\rceil\mathcal{X}$; check $[\partial x_1 + a\,\partial x_2, b\,\partial x_1] = a\,\partial x_1 - b\,\partial x_2$ ($(3,-2)$ at $(3,2)$);
  contrast $S := \nabla^{\mathrm{E}}_\mathcal{X}\mathcal{Y} - \nabla^{\mathrm{E}}_\mathcal{Y}\mathcal{X}$, $S(ab\,\partial x_2,\partial x_1) = -b\,\partial x_2$ ($-5$ at $(2,5)$); Riem rescued by $-\nabla_{[g\mathcal{X},\mathcal{Y}]}\mathcal{Z}$ (only the $\mathcal{X}$ slot shown).
  `ch06-three-connections`: 2×2 table (flat/curved × torsion free/with torsion) as a markdown table; ∇ᴱ polar derivation via $\partial y_2\lfloor a\rceil = -b$, $\partial y_2\lfloor b\rceil = a$,
  $\nabla^{\mathrm{E}}_{\partial y_2}\partial y_2 = -r\,\partial y_1$; $\mathrm{Riem}^2_{112} = -\tfrac1{r^2}+\tfrac1{r^2}$; ∇ᵂ polar: $e_1 = \partial y_1$, $e_2 = \tfrac1r\partial y_2$, only $\Gamma^2_{21} = \tfrac1r$ ($\Gamma^2_{12} = 0$),
  $\mathtt{T}(\cdot,\partial y_1,\partial y_2) = \tfrac1r\partial y_2$; cartesian $\nabla^{\mathrm{W}}_{\partial x_1}\partial x_2 = \partial x_1\lfloor\tfrac br\rceil e_1 + \partial x_1\lfloor\tfrac ar\rceil e_2 = -\tfrac b{r^2}\partial x_1$ ($-4/25$ at $(3,4)$); frame/cartesian torsion
  agree (det 1), polar = $r\times$ frame; ∇^κ Riem from the definition ($\kappa = 2$); straightest curves $\ddot\gamma^1 + \kappa\gamma^1(\dot\gamma^2)^2 = 0$, $a = A\cos(\sqrt\kappa(b-b_0)+\psi)$ ($\kappa = 4$ from $(1,0)$
  with velocity $(0,1)$ crosses at $b = \pi/4$); holonomy $\kappa = \tfrac12$, $[0,2]\times[-1,1]$, $z = (1,2)$: $-4$ (shifted $[-2,0]\times[-1,1]$: left side does it); fourth box: $\Gamma^1_{22} = \kappa a$,
  $\Gamma^1_{12} = 1$, $\Gamma^1_{21} = -1$ gives $\mathrm{Riem}^1_{212} = \kappa+1$ (3 at $\kappa=2$), $\mathtt{T}^1_{12} = -2$. Widget `vertical` with `range: [-1, 1]` (∇ᵂ turns $90°$).
  `ch06-traps`: sheared chart $\mathscr{Y} = (u,v) = (a,\ b - a^2)$, $\partial y_1 = \partial x_1 + 2a\,\partial x_2$, $(\Gamma^{\mathrm{E}}_\mathscr{Y})^2_{11} = 2$; ∇ᵂ $\Gamma^1_{12} = 0$ vs $\Gamma^1_{21} = -4/25$ at $(3,4)$;
  $\nabla^{\mathrm{E}}_{\partial y_2}dr = r\,d\theta$ (component $5$); ∇^κ ($\kappa=1$) $(0,0)\to(1,1)$: right-then-up gives $z^1 = -1$, up-then-right $0$; $[b\,\partial x_1, a\,\partial x_2] = -a\,\partial x_1 + b\,\partial x_2$;
  example $\Gamma^1_{12} = 3$, $\Gamma^1_{21} = 1$ ($\mathtt{T}^1_{12} = -2$, autoparallel term $4\dot\gamma^1\dot\gamma^2$, symmetrized $2,2$); symmetric part $\Gamma^k_{(ji)}$; Ricci contracts upper with middle index ($\mathrm{Ric}_{11} = \mathrm{Riem}^2_{121}$).
  Map ch06 (`ch06-map`, 14 boxes, 8 rows): problem (r1c1); conn (r2c2); gamma c1, affine c3; comp ($\pm\Gamma$ rule) c1, law c3; along c1, bracket c2;
  transport, autopar, torsion; riem (r7c2); ricci c1, flat c3. Labels "fixed by", "in a chart", "equips", "assemble", "new chart", "on a curve", "$= 0$", "on $v_\gamma$",
  "antisym. part", "subtracted in", "around loops", "contract", "$= 0$" (×2); two-row vertical edges (law→torsion, torsion→flat) pass empty cells. No dashed edges.
  Long defining formulas ($\mathtt{T}$, $\mathrm{Riem}$) written as `aligned` with the arguments on their own line (`&\mathtt{T}(\dots)\\ &:= \dots`); `{[\mathcal{X},\mathcal{Y}]}^k`
  braced at the start of `aligned`. Outro teases ∇ᵂ autoparallels (circles, rays or spirals?).
  `ch06-challenge` (part 1): ∇ᵂ polar autoparallels $\ddot r = 0$, $\ddot\theta + \tfrac1r\dot r\dot\theta = 0$, frame components $v_\gamma = \dot r\,e_1 + r\dot\theta\,e_2$ constant ($c_1, c_2$):
  rays, circles about the origin, log spirals $r = r_*e^{(c_1/c_2)\theta}$; spiral from $(1,0)$ with $c_1 = c_2 = 1$: $r = e^\theta$ ($e^{\pi/2}\approx4.810$), $r = 1+\lambda$,
  $\theta = \ln(1+\lambda)$, ∇ᴱ $a^1 = -\tfrac12$ at $\lambda = 1$; ∇ᴱ conserves $r^2\dot\theta$, ∇ᵂ $r\dot\theta$; symmetric part of ∇ᵂ ($\Gamma^2_{12} = \Gamma^2_{21} = \tfrac1{2r}$) curved,
  $\mathrm{Riem}^2_{112} = -\tfrac1{4r^2}$. Label **$\nabla^{\mathrm{F}}$** ("F" for fourth box; mine): $\Gamma^1_{22} = \kappa a$, $\Gamma^1_{12} = 1$, $\Gamma^1_{21} = -1$; $\mathrm{Ric} = (\kappa+1)dx^2\otimes dx^2$
  (4 at $\kappa = 3$), flat at $\kappa = -1$; transport along $(1,\lambda)$ from $(0,1)$: $z^1 = \kappa(e^{-\lambda}-1)$ ($-0.632$) vs ∇^κ $-\kappa\lambda$. Sheared chart
  for ∇ᴱ: only $\Gamma^2_{11} = 2$, equations $\ddot u = 0$, $\ddot v + 2\dot u^2 = 0$; tangent line $(1+\lambda, 1+2\lambda)$ at $(1,1)$ has $v = -\lambda^2$ (vs parabola $v = 0$).
  Widget preset new: `parallel-transport` circle $r_0 = 2$ under W (badge: autoparallelly transported), presets circle E, ray W, vertical W.
- **Tooling:** `tools/shots.mjs` (`playwright-core` in `tools/node_modules`,
  cached Chromium in `~/Library/Caches/ms-playwright/chromium-1248`) renders
  every card with hints/feedback, flags `.katex-display` overflow at 390 px and
  1280 px, saves widget screenshots (`*-widget.png` = widget alone; view that
  one to check readouts). `#/lesson/<id>/<n>` is 1-based. Map lessons are
  expanded with the app's `expandLesson` (checks option bodies and feedback);
  map views (intro, complete) are always screenshotted.
- **Map arrow labels:** edges take `label:` (1–3 words, read "from *label* to",
  only on arrows between different rows; labels of arrows leaving the same box must be short
  enough not to touch); used in `ch02-map`, `ch03-map`, `ch04-map`.

## Log
### 2026-10-20 — ch06-challenge part 1 (problems 1–3, 30 cards)
- Intro lists all five problems (recalls Γ convention, acceleration, transport, T, Riem, the three connections). P1 ∇ᵂ straightest curves: guess,
  widget (circle W/E, ray, vertical), why-circle MCQ, polar Γ re-derived, radial MCQ, angular build, conserved $r\dot\theta$ build, frame-route text,
  cases multi-select, spiral numeric, spiral under ∇ᴱ numeric, flat-but-not-torsion-free trap, summary. P2 ∇ᶠ: setup table, other Riem components,
  Ricci, flat κ, autoparallels = ∇^κ, transport numeric, moral multi-select, summary. P3 sheared chart: count (1), equation build, which curves,
  tangent line $\dot v = 0$, same start MCQ, flat MCQ, summary. Wrap-up deferred to part 2.
- Choices: transport numeric along the vertical line $(1,\lambda)$ (exponential answer) rather than $(\lambda,0)$, already asked in
  ch06-parallel-transport; Riem/torsion of ∇ᶠ stated in setup (asked in three-connections) and new questions asked instead; widget $z_0 = (1,0)$
  on circles so $\mathcal{Z}$ does not overlap $v_\gamma$; added the symmetric part of ∇ᵂ being curved as the explanation of the trap card.
- Conventions fixed here: see Current, "Chapter 6 conventions so far" (`ch06-challenge` lines).
### 2026-10-20 — ch06-map (map, 14 boxes)
- No TeX map: built from the chapter headings and the ch06 lessons. Boxes: chart-dependent component derivatives, connection (five rules, product rule), affine manifold, Γ, $\pm\Gamma$ rule,
  transformation law, derivative along a curve, parallel transport, autoparallels, commutator, torsion, Riemann, Ricci, flat + torsion free; two decoys each (Γ a tensor, torsion → route dependence,
  Γ for functions, normal coordinates remove curvature, autoparallels see torsion, plus sign/index-slot, missing commutator terms, Ricci on the wrong slot or always symmetric, etc.).
- Choices: no model-example box (14 boxes already); 8 rows so every labelled edge crosses rows; label "added to $\mathcal{M}$" shortened to "equips" (validator); no soft hyphen in "Affine manifold" (wrapped badly).
- Checks: facts against the lessons (∇ᴱ polar $\Gamma^1_{22}=-r$, ∇ᵂ $\Gamma^1_{21} = -4/25$, holonomy $(0,1)\to(-1,1)$, $S(ab\,\partial x_2,\partial x_1) = -b\,\partial x_2$, $\mathrm{Riem}^m_{mab}$ antisymmetric);
  validate 0/0; shots 0 problems (after breaking T, Riem, commutator formulas); phone complete-map screenshot viewed, layout clean at 390 px.
- Also fixed the stale Queue line. Conventions fixed here: see Current, "Map ch06" lines.
### 2026-10-20 — ch06-traps (traps, 21 cards)
- 19 questions (10 numeric, 7 MCQ, 2 build), intro with notation (charts, Γ convention, ∇ᴱ, ∇ᵂ, ∇^κ), summary of rules as formulas, teaser for the map.
  Traps: Γ zero in cartesian but $2$ in a sheared chart; index order (∇ᵂ $\Gamma^1_{12}$); scalar rule (same $0.6$ for all connections); covector $-\Gamma$ ($5$); Leibniz vs $C^\infty$-linear slot ($6$ vs $3$);
  derivative needs the field near $p$; autoparallel vs autoparallelly transported ($(e^\lambda,e^\lambda)$); route dependence (∇^κ, $-1$); torsion does not cause route dependence (∇ᵂ); commutator first order and both terms;
  torsion free ≠ $\nabla_XY = \nabla_YX$; torsion from the antisymmetric part; autoparallels see the symmetric part (build + symmetrized connection); symmetry chart-independent; Ricci contraction (build + numeric $2$); Γ(0)=0 but Riem $=2$ (∇^κ at origin).
- Checks: every number by hand (sheared chart directly and via the law; ∇ᵂ $\nabla_{\partial x_2}\partial x_1 = -\tfrac a{r^2}\partial x_2$ from the frame; $dr$ via cartesian; routes vs holonomy law); validate 0/0; shots 21 cards, 0 problems.
- Choices: plan item 8's $[e_1,e_2]\neq0$ already a question in `ch06-torsion-curvature` (`which-commute`), so mentioned only in feedback and replaced by a "both terms" commutator numeric; plan item 6 avoided the λ² ray (already `radial-squared`) and used $(e^\lambda,e^\lambda)$;
  added two extra traps (derivative needs a neighbourhood; torsion free ≠ symmetric swap for non-commuting fields) and symmetric-in-every-chart.
- Conventions fixed here: see Current, `ch06-traps` lines.
### 2026-10-20 — ch06-three-connections (guided, 32 cards)
- Hook (three connections, 2×2 table, guess); early widget (vertical segment $(1,\lambda)$, $\lambda\in[-1,1]$, E/W/κ, compareE, torsion) + numeric $90°$, turning-is-not-curvature MCQ; tools card (Γ, T, Riem formulas);
  ∇ᴱ polar: derivation text, $-r\,\partial y_1$ MCQ, torsion MCQ, build of $\mathrm{Riem}^2_{112}$; ∇ᵂ: frame text, polar $\Gamma^2_{21}$ MCQ, $\mathtt{T}^2_{12} = 0.2$, cartesian build + numeric $-4/25$, torsion MCQs (cartesian, frame $-[e_1,e_2]$,
  three-agree with det), flat MCQ; ∇^κ: torsion MCQ, Riem from the definition ($2$), nonzero-components multi-select, straightest-curve build + numeric $\pi/4$; holonomy prediction $-4$, rectangle widget, shifted-square MCQ;
  traps (nonzero Γ, flat ⇒ torsion free); table MCQ; fourth-box numeric ($3$); summary with formulas.
- Checks: every number by hand (det, $-4/25$ via $-\tfrac{36+64}{625}$, $\mathrm{Riem}^1_{212}=\kappa+1$, holonomy side by side, widget shows $\Delta z = (-4,0)$); validate 0/0; shots 32 cards, 0 problems; both widget presets viewed.
- Choices: to avoid repeating `ch06-torsion-curvature` I computed $\mathrm{Riem}^2_{112}$ (not $^1_{212}$), $\Gamma^1_{21}$ (not $\nabla_{\partial x_1}\partial x_1$), ∇^κ Riem from the definition (not the formula), new loop; widget placed right after the hook
  (all three connections on one segment) instead of a W-only check at Part 2; added the book's polar ∇ᵂ coefficients and a "fourth box" example (not in the book) to complete the table; ∇ᵂ autoparallels (circles, spirals) left out.
- Conventions fixed here: see Current, `ch06-three-connections` lines.

### 2026-10-20 — ch06-torsion-tensor (guided, 19 cards)
- Hook (two non-tensors, one tensor; $\mathcal{V}$ and $\mathtt{T}$) + guess MCQ; goal (C^∞-linearity per slot, pointwise principle, facts (a)–(d)) + constants-not-enough MCQ; first slot MCQ;
  commutator: order card (5 steps), build of the rule, numeric check $-2$ on the plane; which-∇-term MCQ; three-pieces card; collect build (cancellation); conclusion;
  third slot by antisymmetry MCQ (trap: separate computation); contrast $S$ under ∇ᴱ numeric $-5$; Riem remark + MCQ on $-\nabla_{[g\mathcal{X},\mathcal{Y}]}\mathcal{Z}$; summary with formulas.
- Checks: both numerics verified by hand (commutator rule both sides; $S$ and $[ab\,\partial x_2,\partial x_1]$ both $-b\,\partial x_2$); validate 0/0; shots 19 cards, 0 problems; no widget.
- Choices: general covector fields $\mathsf{X},\mathsf{Y}$ instead of the book's $df,dh$; book's footnote (third-slot cancellation) left to the previous lesson's card; Riem's $\mathcal{Z}$ slot only mentioned.
- Conventions fixed here: $\mathcal{V}(\mathcal{X},\mathcal{Y})$ for the torsion's vector field, facts (a)–(d), commutator rule in the first slot (see Current, `ch06-torsion-tensor`).

### 2026-10-20 — ch06-torsion-curvature (concept, 35 cards)
- Hook "once around a loop" (∇ᴱ, ∇ᵂ, ∇^κ introduced), early widget (rectangle $[1,2]\times[0,1]$, κ vs E, holonomy hidden) + numeric $\Delta z^1 = -1$, who-returns MCQ;
  commutator (second-order trap $D(a^2)$, chart computation, Schwarz MCQ, component build, numeric $-6$, which-commute incl. $[e_1,e_2]$); torsion (definition, build
  $\Gamma^i_{kj}-\Gamma^i_{jk}$, one tensoriality card, MCQ on dropping the commutator), torsion free = symmetric, tilting example $-2$; ∇ᵂ coefficients + numeric $3/25$, widget
  (vertical $x_0=1$, compareE, torsion, radial preset) + MCQ; Riemann (definition, product-rule build, formula + antisymmetry, count 4, ∇ᴱ polar flat 0, ∇^κ = 3), Ricci + MCQ;
  holonomy widget (5 presets) + numeric $-12$ + around-origin MCQ; flat-chart theorem + Bianchi; which-have-Γ=0 MCQ; summary with formulas.
- Checks: ∇ᵂ torsion verified by hand from the book's coefficients ($\mathtt{T}^1_{12} = -b/r^2$, $\mathtt{T}^2_{12} = a/r^2$ ✓); validate 0/0; shots 0 problems; three widget shots viewed.
- Choices: general holonomy law stated as approximate for small loops (exact for ∇^κ), without proof; GR remarks (Ricci in Einstein's equations, free fall removes Γ only at a point) as one-liners.
- Conventions fixed here: see Current, `ch06-torsion-curvature` lines (commutator components with $x^i$, $\tilde x^j$; summation index $n$ in Riem; book index orders).

### 2026-10-20 — widget `parallel-transport` extended for `ch06-torsion-curvature` (widget session)
- `js/widgets.js`: connections `W` (𝒵 keeps its $e_1,e_2$ components, i.e. rotates by the change of polar angle; stops at the origin) and `kappa` ($\dot z^1 = -\kappa a z^2\dot\gamma^2$,
  integrated by a 2400-step midpoint table, exact on the rectangle); curve `rectangle` with exact piecewise velocity; "After the loop" $\Delta z$ + prediction row (replaces the
  badge on closed curves); `compareE` (dashed ∇ᴱ copy + angle), `torsion` ($\mathtt{T}^1_{12},\mathtt{T}^2_{12}$ in $\mathscr{X}$); acceleration/transport equation for W, κ in $\mathscr{X}$.
  Fixed: ∇ᴾ on a curve that never leaves $\mathcal{V}$ no longer loses 𝒵 at the end of the range. CSS `.pt-cmp`.
- Verified: κ = 1, $[1,2]\times[0,1]$, $z_0=(0,1)$ gives $\Delta z = (-1,0)$ = prediction (sign matches the book); W loop around the origin $\Delta z = 0$; W along $\gamma_1$
  turns 𝒵 by $124.5°$ at $\lambda = 1.5$. ch06-parallel-transport and ch06-christoffel shots pass; throwaway lesson deleted, course.yaml restored.
- Choices: the torsion hint uses the vertical line (autoparallel of ∇ᴱ, not of ∇ᵂ: ∇ᵂ's only straight autoparallels are radial lines, where ∇ᵂ and ∇ᴱ agree); the lesson
  should say so. Button words: "frame" (W), "curved" (κ). Prediction for flat connections shown as $\Delta z = 0$.
- Conventions fixed here: $\nabla^{\mathrm{W}}$, $\nabla^{\kappa}$, $\mathtt{T}^i_{jk} = \Gamma^i_{kj} - \Gamma^i_{jk}$, $\mathrm{Riem}^1_{212}$, holonomy $\Delta z^1 = -\mathrm{Riem}^1_{212}z^2\times$area, rectangle CCW one side per unit λ.

### 2026-10-20 — ch06-parallel-transport (concept, 31 cards)
- Hook "is the circle straight?" (guess for ∇ᴱ/∇ᴾ), early widget (circle, badge and acceleration hidden), fields along curves with figure-eight, $\nabla_{v_\gamma}$ (theorem, Leibniz MCQ, order card for the uniqueness derivation, build of $(**)$), transport ODE and linear map, circle in polar (solution MCQ, numeric $\dot z^1(1.2) = -0.93$), parallel vs parallelly transported, autoparallel equation, symmetric-part trap plus antisymmetric transport numeric, vertical line in polar (two numerics), circle acceleration and reparametrization, second widget (badge presets), hook resolved, radial λ² (ᚱ = 2/3 at 1.5), holonomy text + MCQ, summary.
- Choices: in-lesson labels (C) chart formula and (A) autoparallel equation (no book numbers); reparametrization with the rune ᚱ (as ch04); GR "free fall = autoparallel" mentioned once (metric connection Level 7); sphere holonomy stated without proof.
- Conventions fixed here: field along $\gamma$ $x^k_\gamma$, dot $= d/d\lambda$, (C), (A), reparametrization $\delta\circ\text{ᚱ}$, antisymmetric example $\Gamma^1_{12} = -\Gamma^1_{21} = 1$.

### 2026-10-20 — widget `parallel-transport` (widget session)
- `js/widgets.js`: new `parallelTransport` (curve presets, λ slider + Play, ∇ᴱ/∇ᴾ toggle, draggable start vector, faded trail, $v_\gamma$, $a_\gamma$ dashed, optional polar basis,
  components in $\mathscr{X}$ and $\mathscr{Y}$, transport equation in numbers in the chart where Γ ≠ 0 (Γᴾ in cartesian by finite differences), "Autoparallel?" badge checked
  along the whole curve). Label placer (`labelPlacer`, `tipCands`) moved to module scope, shared with `chart-basis`. `combo` no longer prints "−0". CSS `.pt-*`.
- Docs: `#### parallel-transport` in `docs/LESSON_FORMAT.md`, QUICKREF line. Tested with a throwaway lesson (deleted), phone and desktop shots viewed, drag/Play/toggles checked.
- Choices: ∇ᴾ transport stops at the cut/origin instead of continuing (it is defined only on $\mathcal{V}$); start vector labelled "start" ("λ₀" renders like "λo" in SVG);
  view fixed by the initial curve (presets switching curve may need `view`); exact transport (constant components mapped by the Jacobian), no ODE solver.
- Conventions fixed here: $\mathcal{Z}$, $z^k$, $v_\gamma$, $a_\gamma$, $\delta_{r_0}$, $\gamma_{x_0}$; "autoparallel" ($a_\gamma=\text{ᚱ}v_\gamma$) vs "autoparallelly transported" ($a_\gamma=0$).

### 2026-10-20 — ch05-challenge part 2 (problems 4–5, wrap-up)
- `content/ch05/challenge.yaml` now 38 cards: Problem 4 (closed vs exact: $\mathsf{B}$, recipe, endpoint integral, $\mathsf{A}+dg$, half-plane order card,
  patches trap), Problem 5 (Minkowski boost: inverse Jacobian, $(\eta_\mathcal{V})_{11}$, $(\eta_\mathcal{V})_{12}$, general $v$, chart trap, $\eta(\mathcal{W},\mathcal{W})$, timelike names), wrap-up with the level's laws. Chapter 5 complete.
- Choices: 2D spacetime with points $(t,a)$ (matches the plane's $(a,b)$); Lorentz factor renamed $\kappa$ (C.5 later uses $\nabla^\kappa$, a different object, local to that example).
- Conventions fixed here: Lorentz factor $\kappa$, $\eta$ components $(\eta_\mathcal{U})_{ij}$, timelike/spacelike/lightlike by sign with $\mathrm{diag}(-1,1)$.

### 2026-10-20 — ch05-differentials (guided)
- `content/ch05/differentials.yaml`, 28 cards: hook (potential for a force), predict, `curve-velocity` θ widget, three scales
  (point, closed/Poincaré, loop integral $2\pi$), chart-independence of (S), traps on closed vs exact, names (1-form, de Rham), summary.
- Choices: angle field named $\mathsf{A}$; polar cut on the positive axis to match the widget's $\theta\in(0,2\pi)$.
- Conventions fixed here: closed (S) with `\tag{S}`, $\mathsf{Z}$, $\mathsf{A}$, $\dot\gamma(\lambda)$, $\int_\gamma\mathsf{X}$ by one-variable calculus, $\bar{\mathtt{x}}_i$.

### 2026-10-19 — fix: labels vs powers
- `ch02-axioms`: new cards `labels-not-powers` + `power-or-label` before the quadrant question; polynomial card contrasts label `p^1` with power `x^N`. One-line notes added to the hooks of `ch02-dual` and `ch02-basis`.
- Audit: ch03 uses lower indices (`q_1`); ch04/ch05 already explain labels (tangent-space, einstein).
- Conventions fixed here: raised index on vector entries is a label; parentheses mark a power, `(x^2)^2`.

### 2026-10-19 — engine: content-map edge labels
- Map edges take an optional `label` (inline Markdown, 1–3 words), drawn at the arrow's midpoint
  (js/cards.js mapDiagram, css .cedge-label; built/live/pending states like the arrow). Any label
  widens the map's row gap to 36px. validate.mjs: label must be a string, warns past 18 chars.
- `ch04-map` now labels all 14 arrows; the intro's four-readings legend is replaced by one line.
- Conventions fixed here: map arrow labels read "from *label* to", 1–3 words, only between rows.

### 2026-10-19 — ch02-map and ch03-map arrow labels
- All 11 (ch02) and 19 (ch03) arrows labelled; intros now say to read each arrow as a sentence.
- Boxes moved down a row where arrows ran side by side (ch02: dual basis, laws, tensors; ch03:
  separation through diffeomorphism), so every arrow crosses a row gap. Build order unchanged.
- Conventions fixed here: labels of arrows leaving the same box are kept short so they don't touch.

### 2026-10-19 — `ch04-challenge` session 2 (problems 4–5 + wrap-up); Chapter 4 complete
- Appended 11 cards: p4-setup, p4-proof (order), p4-A, p4-S, p4-why, p5-setup, p5-X (build),
  p5-Y, p5-feed, p5-trace, wrap-up (teaser: Level 5, vector fields as smooth choices of $v_p$).
- Choices: p5-Y asks one entry $(T_\mathcal{V})^2_1 = 3e$ by the law; a separate p5-feed card gets
  $(T_\mathcal{V})^1_2 = 1/e$ by feeding basis elements (plan's "both ways" split into two cards).
  p4-why says same-height sums need a metric (Level 7). Did not reread the book: all numbers come
  from STATUS conventions, re-verified by hand ($JT_\mathcal{U}J^{-1}$, $M^{\mathsf T}M$, $A_\mathcal{V}$).
- validate 0/0; shots 36 cards, 0 problems.
- Conventions fixed here: trace $(T_\mathcal{U})^i_i$ vs explicit $\sum_i(S_\mathcal{U})_{ii}$; $T_\mathcal{V} = JT_\mathcal{U}J^{-1}$,
  $S_\mathcal{V} = M^{\mathsf T}S_\mathcal{U}M$; $T = v\otimes(df)_p$, $(T_\mathcal{U})^i_j = x^i_p\mathtt{x}^p_j$, trace $= (df)_p(v) = 4$.

Level challenge `ch04-challenge`, session 1 (25 cards): intro listing all five problems; P1 polar chart at
$(1,1)$ (basis, Jacobian entry $-1/2$, $v^r = 3/\sqrt2$, $v^\theta = 1/2$, $(df)_p$ by feeding and by $F = f\circ\mathscr{P}^{-1}$,
pairing $4$); P2 reparametrization $\text{ᚱ}$ (order proof, $-4$, pause curve, zero vector, Leibniz build, constants
order card, consequences); P3 $S^1$ $\theta$ vs $\sigma$ (Jacobian $2$ two ways, stretch, $v^\sigma = 6$, $(d\theta)_p = \tfrac12(d\sigma)_p$,
height covector two ways, pairing, why). Choices: point $\theta_p = \pi/6$ for clean numbers; Leibniz rule derived in P2
since no lesson had stated it; file ends after P3 (no wrap-up yet).
Conventions fixed here: see Current, "Challenge ch04".

Content map `ch04-map` (13 boxes, 15 cards): curves, scalar fields → velocity → $T_p\mathcal{M}$; chart +
$T_p\mathcal{M}$ → chart-induced basis → components and Jacobian (ᛞ); running example dashed to basis and Jacobian;
$T_p\mathcal{M}$ → $T_p^*\mathcal{M}$ → $(df)_p$ → dual basis; both laws → Einstein summation → $T_p^{(r,s)}\mathcal{M}$. Decoys on the
traps (image vs map curve, ambient arrow, one test field, curve sum, curves as vectors, whole-chart vs one-function,
inverse/row laws, $3e$ product rule, transposed Jacobian, same-height sum, $\delta^i_i$, gradient arrow, infinitesimal,
$(r+s)d$, all-$\partial\mathscr{Y}/\partial\mathscr{X}$ law). Choices: no edge labels (engine lacks them; legend in intro);
Einstein built after the dual basis to avoid horizontal edges, which vanish at 390 px.
Conventions fixed here: Map ch04 (`ch04-map`, 13 boxes, 8 rows): no horizontal edges between adjacent boxes (too short to show at 390 px; use diagonals or skip a row); edge readings ("defined from", "basis of", "dual of", "built from") given in the intro legend (the engine has no edge labels); Einstein box placed after both laws (compact form of vector and covector laws), so map cards before it write explicit sums.

Traps round `ch04-traps` (22 cards, 20 questions): velocity as a map, bent curve same velocity,
reparametrization scales ($6$), curve sum on $S^1$ leaves the circle, $\partial/\partial\mathscr{Z}^1$ depends on the
whole chart while $d\mathscr{Z}^1$ does not, mixed pairing (build + C.3 number $2$), meters/cm, Jacobian entry
$e/2$ with the rune, well-formed Einstein equations, $\delta\delta\delta = 3$, covector not an arrow ($(4,-1)$ vs
$(1,-1)$), $(df)_p$ linear, numbers vs objects, type $(1,2)$, $256$ components, $(1,1)$ law ($e$), swapped
product ($0$), zero in all charts. Choice: the brief's "$(dX^1)_p$ depends on the whole chart" is false
($d$ of a function depends only on the function), so the card teaches the asymmetry instead.
Conventions fixed here: see Current, "Traps (`ch04-traps`)".

Concept lesson `ch04-tensor-space` (31 cards): hook = metric counts $d^2 = 16$, definition of
$T_p^{(r,s)}\mathcal{M}$, special cases, `machine-playground` with $(df)_p\otimes(df)_p$ in $\mathscr{X}$-components,
products, (0,2) and (1,1) expansions (build), independence proof (order), law by feeding and by
re-expanding, running-example check ($1/e$, $1/e^2$), $\delta$ invariant, traps (Jacobian count, same
matrix different tensor, slot order, slogan). Conventions fixed here: see Current, "Tensor space".

Fixes after review: Jacobian rune $\text{ᛞ}$ introduced in `ch04-coordinate-basis` (definition,
inverse identity, summary), runic webfont added; `chart-basis` widget gains `jacobian: false`
(used on the first two widget cards so the Jacobian numbers no longer appear before they are
asked); numeric `wrong` values now match within 0.5% (engine, documented); `ch04-cotangent-basis`
derives the covector component law by both routes (prediction MCQ moved before them, new text +
build card); every mention of "the book" and of C.3/B.3 removed from lessons. Conventions fixed
here: rune $\text{ᛞ}_{\mathcal{V}\mathcal{U}}$ for $(\partial\mathscr{Y}/\partial\mathscr{X})_p$; lessons never cite the book.

Concept lesson `ch04-cotangent-basis` (35 cards): hook (a chart gives $d$ fields $\mathscr{X}^i$),
predict $(d\mathscr{X}^i)_p((\partial/\partial\mathscr{X}^j)_p)$, compute via projection MCQ, dual cobasis recall,
read-a-component numeric, `chart-basis` with `charts: [X]` (presets on the two basis vectors and
the vertical; image checked) + kernel MCQ and which-line trap, B.6 independence ($a_i\delta^i_j$ MCQ),
components + ordered spanning proof, expansion build, $(df)_p$ components with C.3 numerics in
$\mathscr{X}$ and $\mathscr{Y}$, pairing $4$ in both charts, `chart-basis [X, Y]` revisited (readouts =
dual bases on $v$), basis law (from the velocity component law) build + numeric $-e$, component
law + which-Jacobian MCQ + numeric, invariance via inverse identity + MCQ, footnote 7 bump argument
+ MCQ, shorthand, look-alike trap, reverse law numeric, summary, teaser Tensor Spaces. Choices:
no new widget (chart-basis readouts reinterpreted as $(d\mathscr{X}^i)_p(v)$); component law derived by
evaluating on $(\partial/\partial\mathscr{Y}^i)_p$ rather than the book's substitution (book's route mentioned).
Validate and shots clean (0 problems).
Conventions fixed here: $(d\mathscr{X}^i)_p$ pictured as the line where $\mathscr{X}^i$ is constant; coefficients
$a_i$ for covector combinations; $F(a^1,a^2)$, $G(b^1,b^2)$ C.3 representatives; laws in the forms above;
shorthand $(dx^i)_p$, $(dy^i)_p$ usable.

Concept lesson `ch04-cotangent` (23 cards): hook ($v\mapsto v(f)$, temperature observer),
predict linearity for $f = q_1^2+q_2$, `curve-velocity` widget (`chain`, `graph: false`,
`bend: false`, fields $x, y, x^2+y$; presets Sum, Doubled, Level line), numerics sum rate $4$ and
level-line rate $0$, recall dual space (Hom = homomorphism), definition of $T_p^*\mathcal{M}$,
closure MCQ, definition of $(df)_p$, ordered linearity proof (book footnote 6), justification
MCQ, C.3 numerics ($2$, $2$), same-value trap, sum/scalar/Leibniz rules, dimension (dual cobasis
recall, finite-dimensional caveat), dimension MCQ, lower-index card via chain rule
$\partial_if(p)v^i$, index-placement trap, not-an-arrow trap, locality trap, chart-free trap,
summary. Choices: components introduced only as "numbers describing a covector" (no basis);
"every covector is a differential" (book footnote 7) left for the next lesson. Validate and shots
clean (one phone overflow fixed by naming $s := \alpha\odot_Tu\oplus_Tw$); widget image checked.
Conventions fixed here: $\oplus_T^*$, $\odot_T^*$ value by value; $(df)_p$ one symbol; covector
numbers $\mathtt{x}^p_i$; covector drawn as its zero line, not an arrow.

Concept lesson `ch04-einstein` (23 cards): hook (sums written out), predict the summed
index in the basis law, rule card (range $1..d$, denominator = lower, labels not indices,
strict form), up-or-down MCQ, free/dummy card, rename MCQ, free-match trap, count terms
($d^2 = 4$), build basis and component laws, same-height traps (MCQ, plus a numeric showing
$\sum_i(\dot\gamma^i)^2$ is 8 in $\mathscr{X}$ but $1+9e^2$ in $\mathscr{Y}$), three-times trap,
$\delta^i_ja^j$, $\delta^i_i = 4$, `chart-basis` chain widget (preset reused), C.3 numeric $3e$,
inverse identity (text, MCQ, round-trip numeric $-2$), book shorthand table, chart-dependence MCQ,
summary. Choice: included the book's shorthand ($\mathcal{X}_p$, $x^i_p$, $(\partial x_i)_p$) here,
since 4.1.2 introduces it with the convention and no other node covers it. Validate and shots clean.
Conventions fixed here: Einstein summation (strict) from now on; denominator index is lower;
book shorthand $\mathcal{X}_p$, $x^i_p$, $(\partial x_i)_p$, $y^i_p$, $(\partial y_i)_p$ usable.

Guided lesson `ch04-chart-basis` (24 cards, B.5): hook (three claims), predict,
step 1 coordinate curve ($\lambda$ near 0 by openness of $\mathscr{X}(\mathcal{U})$,
smooth via chart representative, build $v_{c_i,p}(f)$), single-chart polar
`basisOnly` widget, $c_\theta$ range ($a = \pi/4$), cut at $(2,0)$; step 2
($\gamma$ stays in $\mathcal{U}$ near $\lambda_0$, build expansion); step 3 (test
fields via bump, order proof), numerics in C.3 ($w(f)=0$, $w(\mathscr{X}^1)=1$,
$w(f)=5$ from $w(\mathscr{X}^j)$), dimension + book footnote (global, atlas),
charts into $\mathbb{R}^2$ and $\mathbb{R}^3$ impossible; traps (circular count, one
field vs all, $\delta$ is not orthonormality). Conventions fixed here: coefficients
$a^i$; bump-function justification for $\mathscr{X}^j$ as test field; C.3 $w$ example.

Concept lesson `ch04-coordinate-basis` (33 cards): hook (C.3 velocity $(2,-2)$
vs $(1,3e)$), `chart-basis` explore (C.3 + cartesian/polar presets), chain rule
split into $\dot\gamma^i_\mathcal{U}$ and $A_i(f)$, definition, evaluations with
$f = q_1^2+q_2$ ($-1$, $v(f) = 4$), coordinate curves + `basisOnly` widget,
$(\partial/\partial\mathscr{Y}^2)_p = (0,1/e)$, tilt of $(\partial/\partial\mathscr{Y}^1)_p$,
$\delta^i_j$ build, Jacobian entry $e/2$, inverse proof + entry $1$, `inverse`,
basis-law order proof + `basisOnly chain`, component-law build, hook resolved
($3e$), `chain` widget, Chapter 2 link, three traps (summed index, Jacobian vs
transition map, $|\partial/\partial\theta| = r$). Basis property stated without
proof (next guided problem). Conventions fixed here: $\dot\gamma^i_\mathcal{U}$,
$\dot\gamma^i_\mathcal{V}$ names; $c_i$ coordinate curves; Jacobian only as
$(\partial\mathscr{Y}^i/\partial\mathscr{X}^j)_p$; $J_i^j = (\partial\mathscr{Y}^j/\partial\mathscr{X}^i)_p$.

Fixes (ch04-tangent-space, chart-basis). Lesson card `chain-explore`: $\theta$
is no longer called a field "smooth near $p$"; the card says $\theta\notin
C^\infty(\mathbb{R}^2)$ and uses an $f$ equal to $\theta$ on a disc around $p$,
switched off before the jump. Widget: $p$ may go anywhere; a polar chart
(`cut: right|left`) draws its cut dotted, and off its domain shows no basis,
no components, no Jacobian, with the reason; lines of one coordinate thin out
(every 2nd, 4th, … line) where closer than 0.14 view units; labels placed by
candidate spots avoiding arrows, the tip of $v$, $p$ and other labels. Tested
with a throwaway lesson (C.3, crowding, on the cut, left cut, near origin, long
$v$), screenshots viewed, then removed. Conventions fixed here: polar `cut`
option; $\theta$ in the plane via a field equal to it near $p$.

Built the `chart-basis` widget (no lesson): coordinate lines of one or two
charts (presets `cartesian`, `polar`, C.3 `X`, `Y`), draggable $p$, purple basis
$(\partial/\partial\mathscr{X}^i)_p$ as columns of $(D\mathscr{X})^{-1}$, draggable
$v$, components per chart, Jacobian $D\mathscr{Y}\,(D\mathscr{X})^{-1}$; options
`chain` (component law in numbers, or basis law with `basisOnly`), `inverse`,
`lines`, `dragP`, chart `name`/`steps` overrides. Tested with a throwaway preset
lesson (C.3, polar on the cut, basis-only, one chart), screenshots viewed,
then removed. C.3 numbers reproduced. Choices: polar keeps $|p|\ge 0.5$, on the
positive $q_1$-axis the readout says $\theta$ is read in $(-\pi,\pi)$; at most 8
lines each side of $p$ (the `Y` lines crowd for large $q_1$). Conventions fixed
here: Jacobian row $i$ = $\mathscr{Y}^i$, column $j$ = $\mathscr{X}^j$; chart letters
$\mathscr{C}$, $\mathscr{P}$; first chart solid, second dashed (see Current).

Built `ch04-velocity-operations` (guided, 23 cards, no widget): hook (is the
sum a velocity?), predict MCQ, C.3 setup with $\mathscr{X}$, $\mathscr{Y}$,
build $\mathscr{X}\circ\gamma_2$, numeric $\mathscr{Y}\circ\gamma_1(1)$ ($e$), construction
with domain remark, why subtract $\mathscr{X}(p)$, build $\sigma_\mathcal{U}$, numeric
$\sigma_\mathcal{V}(1)$ ($1+2/e$), why charts disagree, velocity 2, $f=q_1q_2$ gives 3,
build $\partial_1 f+2\partial_2 f$, general tool (chain rule via $F$), build
component derivative, 7-step order proof, chart-free MCQ, $\odot_T$ by
reparametrization (numeric 6, zero vector = constant curve), two traps, wrap-up.
Choice: next lesson needs a widget (curvilinear coordinate lines + basis at
$p$), so the next unit is the `chart-basis` widget. Conventions fixed here: $F$,
$\mathscr{X}^i$, $\sigma_\mathcal{U}$, $\sigma_\mathcal{V}$, scaling curve (see Current).

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

### 2026-10-19 — ch05-vector-fields (concept)
- 29 cards: wind-map hook, predict ($v-w$ undefined), recall, `chart-basis` swirl widget (cartesian +
  polar cut left, presets at 4 points + origin), $T\mathcal{M}$ and why disjoint (zero maps collide), bundle
  charts and $\dim = 2d$, sections, smooth iff smooth components, $|b|\,\partial x_1$, chart independence,
  egg-carton fields $\mathcal{X}$, $\mathcal{Y}$ with law checks, action $\mathcal{X}\lfloor f\rceil$, two traps, summary.
- Choices: bundle charts and the topology included (stated without proof) so "smooth section" has a meaning;
  frames, parallelizability, hairy ball and $\oplus_\Gamma$ left for `ch05-module`; component functions written $X^i$,
  $Y^i$, $\tilde X^i$, $\tilde Y^i$ in the running example, $x^i$, $y^i$ in general.
- Conventions fixed here: see Current, "Chapter 5 conventions so far".

### 2026-10-19 — ch05-covector-fields (concept)
- 25 cards: contour-map hook, predict (is every field a $df$?), recall, `curve-velocity` widget ($x^2+y$ level
  lines as the whole field $df$, $\theta$ rays), kernel MCQ, $T^*\mathcal{M}$ and bundle charts, fibre transition MCQ
  (introduces $\text{ᛞ}_{\mathcal{U}\mathcal{V}}$), $\dim = 8$ for spacetime, sections and exactness, component functions, five-fonts MCQ,
  $df$ components and egg carton, field law (build), polar $\mathtt{Y}_2 = \pi$, action $\mathsf{X}\lceil\mathcal{X}\rfloor$, order proof of
  $df\lceil\mathcal{X}\rfloor = \mathcal{X}\lfloor f\rceil$, pairing $=1$ in polar, $C^\infty$-linearity vs Leibniz, arrow trap, non-exact $-b\,dx^1+a\,dx^2$, resolve, summary.
- Choices: the book's brackets $\mathsf{X}\lceil\mathcal{X}\rfloor$ (the unit prompt wrote $\lfloor\ \rceil$); non-exact example given fully by mixed
  partials (elementary), leaving closed-not-exact ($d\theta$ on the punctured plane) for the guided problem; $\oplus_\Gamma$, frames left for `ch05-module`.
- Conventions fixed here: see Current, "Covector fields (`ch05-covector-fields`)".

### 2026-10-19 — ch05-module (concept)
- 27 cards: hook (normalise the swirl by $1/r$), `chart-basis` widget (swirl vs unit arrows, one chart), predict-unit, predict-basis,
  ring and field definitions, invertible functions (multi-select), zero divisors and cancellation, $\oplus_\Gamma$/$\odot_\Gamma$/$\oplus^*_\Gamma$/$\odot^*_\Gamma$,
  module axioms, axiom check (M3), independence/spanning over a ring ($\mathbb{Z}$), $t\,\partial x_1$ on $\mathbb{R}$, egg-carton pair, order proof
  (basis ⇒ pointwise basis), frames and dual frames, polar frame off the origin, parallelizable + hairy ball, $S^1$ frame, $S^2$ no basis,
  egg-carton operations (two numerics), real vs $C^\infty$ dimension trap, resolve, summary with teaser for tensor fields.
- Choices: egg-carton $\mathcal{X},\mathcal{Y}$ used as the field-level "independent but not spanning" example (the TeX used $t\,\partial_t$ on $\mathbb{R}$; both
  included); unit-radial problem replaced by the unit swirl (same obstruction); polar frame extended past its chart to illustrate "frame ≠ chart"
  (the book's non-chart frame example is in a later appendix section, not used).
- Conventions fixed here: see Current, "Module (`ch05-module`)".
- 2026-10-19 `ch05-tensor-fields` (concept, 25 cards): hook (which maps let functions pull out; Leibniz fails), definition, $(0,1)$ count,
  `machine-playground` at three egg-carton points, pointwise principle (order card, bump proof), non-tensor $D$, $\mathbb{R}$- vs $C^\infty$-linearity,
  components and expansion, $T_{12}$ by hand, $(0,2)$ law build, $(1,1)$ law, polar $(T_\mathcal{V})_{22} = \pi^2$, notation roles, three traps, resolve, summary.
- Choices: no new widget (machine shows one point, presets switch point); the converse "(1,0) fields = vector fields" stated, not proved;
  Euclidean $\mathrm{diag}(1,r^2)$ used as a trap (from the TeX); Minkowski boost left for the challenge.
- Conventions fixed here: see Current, "Tensor fields (`ch05-tensor-fields`)".
- 2026-10-20 `ch05-traps` (traps, 24 cards: intro, 22 questions, summary): field vs chart vs component, zero vectors in the disjoint union,
  $\dim TS^2$, sections, $b|b|$ kink, $\partial y_1$ at the origin, vector law build, vector vs covector polar components at $(3,4)$,
  acting twice, mixed-chart pairing, zero divisors, independent-not-spanning, global frames, Leibniz value, which slot is $C^\infty$-linear,
  pointwise principle, pointwise-not-tensor $(z^1)^2$, closed coefficient, $g\,df$, angle field exact on a half-plane.
- Choices: fresh examples rather than repeats of the in-lesson traps; no widget; contractible named "disc-like" (Poincaré lemma recalled, not reproved).
- Conventions fixed here: see Current, "Traps (`ch05-traps`)".
- 2026-10-20 `ch05-map` (map, 14 boxes, 16 cards): recall boxes $T_p\mathcal{M}$, $T_p^*\mathcal{M}$; general bundle and sections;
  $T\mathcal{M}$, $T^*\mathcal{M}$ ($2d$); vector and covector fields with laws; actions ($df\lceil\mathcal{X}\rfloor = \mathcal{X}\lfloor f\rceil$, Leibniz);
  ring (zero divisors); modules (independent ≠ spanning); frames (hairy ball); tensor fields ($C^\infty$-linear ⇒ pointwise); closed/exact; angle field.
  Decoys from the traps: $T\mathcal{M}$ as a vector space, $\dim d$, $\sigma\circ\pi$, $\mathbb{R}$-linear suffices, pointwise suffices, closed ⇒ exact,
  pointwise-$df$ exactness, global frames, ring as a field.
- Choices: no separate manifold box (recalled inside the $T_p\mathcal{M}$ box); ring placed beside actions as a source box so "scalars of"
  reaches modules without crossing; "test for" reading replaced by "which are $df$?"; title "Closed and exact" (no soft hyphen needed).
- Conventions fixed here: see Current, "Map ch05 (`ch05-map`)".
- 2026-10-20 `ch05-challenge` part 1 (22 cards): intro listing five problems; P1 rotation field (smoothness, build $y^2$, $\mathcal{R}$ vs $\mathsf{Z}$
  in polar, invariant functions, $\mathcal{R}\lfloor a^2-b^2\rceil$ two ways, $(\mathsf{A}+\mathsf{Z})\lceil\mathcal{R}\rfloor$); P2 unit radial field ($\pm1/r$, polar $(1,0)$,
  dual coframe $\{dr,\mathsf{A}\}$, coefficient of $\mathcal{R}$ in $\partial x_2$, impossibility through the origin, frames/hairy ball); P3 ring (closure via charts,
  invertibility depends on the manifold, order proof $\psi(t)\psi(-t) = 0$, zero-divisor criterion, distributivity axiom by acting, fields killed by $\psi(-t)$).
- Choices: registered in `course.yaml` now with a summary covering all five problems; no wrap-up yet (validate accepts); repeats of
  ch05-module (unit swirl, $t\,\partial x_1$ alone, $(fg)\mathcal{X}$ axiom) avoided by switching to sign freedom, coframe and $\psi$-killed fields; no widget.
- Conventions fixed here: see Current, "Challenge ch05 (`ch05-challenge`, part 1)".
- 2026-10-20 `ch06-connections` (concept, 28 cards): hook "is $\partial x_1$ constant?" (polar components, recall $D(\mathcal{Z})$); widget `chart-basis`
  cartesian + polar `cut: left` with $v = \partial x_1$ at four presets; naive polar derivative ($-1$), extra second-derivative term, affine-only MCQ;
  why-not-subtract; definition and Rules 1–5 one card each with a question (value 9, zero field, term count 6, Rule-4 numeric, $C^\infty$ in direction);
  product-rule build (derivation in explanation), tensorial-slot multi-select, covector build; affine manifold with $\nabla^{\mathrm{E}}$ and $\nabla^{\mathrm{P}}$, swirl numerics,
  $\nabla^{\mathrm{E}}df$, hook resolved, "word on words" (B.9), summary with rules as formulas, teaser $(\Gamma_\mathscr{X})^i_{jk}$.
- Choices: followed the book's pointwise definition (not field-level axioms); generic field named $\mathcal{Y}$ (book) rather than $\mathcal{Z}$; invented
  $\nabla^{\mathrm{P}}$ to show that each chart's naive rule is a different connection; plain plane instead of the egg carton; no autoparallels or $\Gamma$ yet.
- Conventions fixed here: see Current, "Chapter 6 conventions so far".
- 2026-10-20 `ch06-christoffel` (concept, 28 cards): hook "how many numbers fix a connection?" (four guesses); widget `chart-basis` polar+cartesian
  basisOnly/chain at five presets; which-basis-changes multi-select; locality + chart expansion, product-rule build; definition (book order), index-order MCQ,
  component build, count ($4^3 = 64$), any-choice sketch, invented connection numeric; covector setup + build (both derivations); valence-sign MCQ; $\nabla^{\mathrm{E}}$
  polar coefficients directly ($-5$ at $(3,4)$, $\tfrac1r\partial y_2$ MCQ); transformation law in three cards (setup, origin MCQ, law) + numeric via law ($0.2$);
  tensor-or-not multi-select (difference, antisymmetric part); normal coordinates text; C.5.2 check in polar ($-0.6$); traps (zero here/zero everywhere,
  $\nabla^{\mathrm{P}}$ in cartesian $-1$, zero in both charts); summary with formulas.
- Choices: added normal coordinates (in the book's 6.2) as one text card; used the "Christoffel symbols" name only as an aside; renamed the book's
  summation index $p$ to $m$; widget charts listed polar first so `chain` expands the polar basis in the cartesian one.
- Conventions fixed here: see Current, "Chapter 6 conventions so far" (`ch06-christoffel` lines).

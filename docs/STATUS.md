# Status

Read only **Current** at the start of a session (`sed -n '/^## Current/,/^## Log/p' docs/STATUS.md`).
At the end of a session: update **Current** (built list, queue, conventions) and
append a short entry at the end of **Log** (a few lines, ending with
"Conventions fixed here: …").

## Current (2026-10-19, Chapter 5 in progress)

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
- **Chapter 5 so far:** `ch05-vector-fields` (concept, 29 cards), `ch05-covector-fields` (concept, 25 cards).
- **Queue (one unit each):** Chapter 5 (Fields) in `course.yaml` order, next
  `ch05-module` (concept); then Chapters 6–10 (each with map and challenge).
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

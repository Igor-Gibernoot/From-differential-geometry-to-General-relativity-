// Interactive widgets, referenced from lesson YAML by name:
//   - type: widget
//     widget: basis-playground
//     config: { ... }

import { h } from './dom.js';
import { tex, mdInline } from './render.js';

const WIDGETS = {
  'basis-playground': basisPlayground,
  'machine-playground': machinePlayground,
  'map-builder': mapBuilder,
  'ball-probe': ballProbe,
  'preimage-explorer': preimageExplorer,
  'circle-charts': circleCharts,
};

export function mountWidget(name, el, config) {
  const w = WIDGETS[name];
  if (!w) { el.textContent = `Unknown widget "${name}".`; return; }
  w(el, config);
}

const NS = 'http://www.w3.org/2000/svg';
function s(tag, attrs = {}) {
  const el = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  return el;
}

const fmt = x => (Math.abs(x) < 5e-3 ? '0' : String(Math.round(x * 100) / 100));

// "a x̂1 + b x̂2" in TeX, with the sign folded into the operator.
const combo = (name, [a, b], basis = '\\hat{x}') =>
  `${name} = ${fmt(a)}\\,${basis}_1 ${b < 0 ? '-' : '+'} ${fmt(Math.abs(b))}\\,${basis}_2`;
const dualCombo = (name, [a, b]) =>
  `${name} = ${fmt(a)}\\,\\hat{\\mathfrak{x}}^1 ${b < 0 ? '-' : '+'} ${fmt(Math.abs(b))}\\,\\hat{\\mathfrak{x}}^2`;

// ---------------------------------------------------------------------------
// Plane drawing helpers shared by the planar widgets (math y points up).
// ---------------------------------------------------------------------------
const P = (x, y) => [x, -y];

function line(a, b, cls) {
  const [x1, y1] = P(...a), [x2, y2] = P(...b);
  return s('line', { x1, y1, x2, y2, class: cls });
}
function arrow(a, b, cls) {
  const g = s('g', { class: cls });
  const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy);
  if (L < 1e-6) return g;
  const ux = dx / L, uy = dy / L, hl = Math.min(0.28, L * 0.45), hw = hl * 0.55;
  const base = [b[0] - ux * hl, b[1] - uy * hl];
  g.append(line(a, base, ''));
  const pts = [b, [base[0] - uy * hw, base[1] + ux * hw], [base[0] + uy * hw, base[1] - ux * hw]]
    .map(p => P(...p).join(',')).join(' ');
  g.append(s('polygon', { points: pts, style: 'stroke-dasharray:none' }));
  return g;
}
function label(p, text, cls = '') {
  const [x, y] = P(...p);
  const t = s('text', { x, y, class: `w-label ${cls}`, 'text-anchor': 'middle', 'dominant-baseline': 'middle' });
  t.textContent = text;
  return t;
}
// Label placed just beyond the tip of the arrow from the origin to b.
function tipLabel(b, text, cls = '') {
  const L = Math.hypot(...b) || 1;
  return label([b[0] + 0.42 * b[0] / L - 0.25 * b[1] / L, b[1] + 0.42 * b[1] / L + 0.25 * b[0] / L], text, cls);
}
// Level lines C(p) = n of a covector with components C in the old dual basis.
function levelLines(C, cls = 'w-level') {
  const g = s('g');
  const n2 = C[0] ** 2 + C[1] ** 2;
  if (n2 < 1e-12) return g;
  const L = Math.sqrt(n2), d = [-C[1] / L, C[0] / L];
  for (let n = -15; n <= 15; n++) {
    const p0 = [n * C[0] / n2, n * C[1] / n2];
    g.append(line([p0[0] - 30 * d[0], p0[1] - 30 * d[1]], [p0[0] + 30 * d[0], p0[1] + 30 * d[1]], cls));
  }
  return g;
}

let clipCount = 0;
function planeSvg(view, ariaLabel, layerNames) {
  const svg = s('svg', { viewBox: `${view.x} ${-(view.y + view.h)} ${view.w} ${view.h}`, role: 'img', 'aria-label': ariaLabel });
  // When the svg is wider than its viewBox (height capped by CSS), long lines
  // would show outside the plane: clip the drawing layers to it.
  const clipId = `plane-clip-${++clipCount}`;
  const clip = s('clipPath', { id: clipId });
  clip.append(s('rect', { x: view.x, y: -(view.y + view.h), width: view.w, height: view.h }));
  svg.append(clip);
  const free = ['labels', 'handles'];
  const layers = ['grid', ...layerNames].reduce((o, k) => {
    o[k] = s('g', free.includes(k) ? {} : { 'clip-path': `url(#${clipId})` });
    svg.append(o[k]);
    return o;
  }, {});
  for (let k = Math.ceil(view.x); k <= view.x + view.w; k++)
    layers.grid.append(line([k, view.y], [k, view.y + view.h], k === 0 ? 'w-axis' : 'w-grid'));
  for (let k = Math.ceil(view.y); k <= view.y + view.h; k++)
    layers.grid.append(line([view.x, k], [view.x + view.w, k], k === 0 ? 'w-axis' : 'w-grid'));
  return { svg, layers };
}

// A draggable circle: calls onMove([x, y]) with the snapped, clamped tip.
function draggable(svg, view, c, snap, onMove) {
  c.addEventListener('pointerdown', e => {
    e.preventDefault();
    c.setPointerCapture(e.pointerId);
    const move = ev => {
      const pt = svg.createSVGPoint();
      pt.x = ev.clientX; pt.y = ev.clientY;
      const m = pt.matrixTransform(svg.getScreenCTM().inverse());
      let v = [m.x, -m.y];
      if (snap) v = v.map(t => Math.round(t / snap) * snap);
      v = [Math.max(view.x + 0.2, Math.min(view.x + view.w - 0.2, v[0])),
           Math.max(view.y + 0.2, Math.min(view.y + view.h - 0.2, v[1]))];
      if (Math.hypot(...v) < 0.25) return;
      onMove(v);
    };
    const up = () => { c.removeEventListener('pointermove', move); c.removeEventListener('pointerup', up); c.removeEventListener('pointercancel', up); };
    c.addEventListener('pointermove', move);
    c.addEventListener('pointerup', up);
    c.addEventListener('pointercancel', up);
  });
}
function placeHandle(c, b) {
  const [cx, cy] = P(...b);
  c.setAttribute('cx', cx);
  c.setAttribute('cy', cy);
}

// ---------------------------------------------------------------------------
// basis-playground
//
// A fixed vector X (and optionally a fixed covector, drawn as its level
// lines X(p) = n) in the plane. The reader drags the new basis vectors
// ŷ1, ŷ2 and watches the components change: vector components move against
// the basis, covector components with it, and their pairing never changes.
//
// config:
//   vector:   [3, 2]          X in the old basis x̂ (standard coordinates)
//   covector: [1, 0.5] | null components of the covector in the old dual basis
//   dual:     1 | 2 | null    draw the level lines of that dual basis covector
//                             ŷ^k and show it in the old dual basis
//   basis:    [[1,0],[0,1]]   initial ŷ1, ŷ2 in the old basis
//   snap:     0.5             grid the handles snap to (0 = free)
//   presets:  [{label, basis}]
// ---------------------------------------------------------------------------
function basisPlayground(el, cfg) {
  const X = cfg.vector ?? [3, 2];
  const C = cfg.covector ?? null;
  const dual = cfg.dual ?? null;
  const start = (cfg.basis ?? [[1, 0], [0, 1]]).map(v => [...v]);
  const snap = cfg.snap ?? 0.5;
  const presets = cfg.presets ?? [];
  let B = start.map(v => [...v]);

  const view = { x: -2.5, y: -2.5, w: 8, h: 7 };
  const { svg, layers } = planeSvg(view, 'Drag the tips of the basis vectors',
    ['lattice', 'levels', 'parts', 'vec', 'basis', 'labels', 'handles']);

  const handles = B.map((_, k) => {
    const c = s('circle', { r: 0.22, class: 'w-handle', tabindex: 0, 'aria-label': `tip of basis vector ${k + 1}` });
    layers.handles.append(c);
    draggable(svg, view, c, snap, v => { B[k] = v; draw(); });
    return c;
  });

  const readout = h('div', { class: 'readout' });
  const btns = h('div', { class: 'wbtns' },
    h('button', { class: 'btn ghost', type: 'button', onclick: () => { B = start.map(v => [...v]); draw(); } }, 'Reset'),
    presets.map(p => h('button', { class: 'btn ghost', type: 'button', onclick: () => { B = p.basis.map(v => [...v]); draw(); } }, p.label)));
  el.append(svg, readout, btns);

  function draw() {
    for (const k of ['lattice', 'levels', 'parts', 'vec', 'basis', 'labels']) layers[k].replaceChildren();
    const [b1, b2] = B;
    const det = b1[0] * b2[1] - b2[0] * b1[1];
    const ok = Math.abs(det) > 1e-9;
    const y1 = ok ? (X[0] * b2[1] - X[1] * b2[0]) / det : NaN;
    const y2 = ok ? (b1[0] * X[1] - b1[1] * X[0]) / det : NaN;
    // dual basis ŷ^1, ŷ^2 in the old dual basis: the rows of the inverse basis matrix
    const D = ok ? [[b2[1] / det, -b2[0] / det], [-b1[1] / det, b1[0] / det]] : null;

    // lattice of the new basis
    if (ok && Math.abs(det) > 0.05) {
      for (let k = -10; k <= 10; k++) {
        layers.lattice.append(line([k * b1[0] - 30 * b2[0], k * b1[1] - 30 * b2[1]], [k * b1[0] + 30 * b2[0], k * b1[1] + 30 * b2[1]], 'w-lattice'));
        layers.lattice.append(line([k * b2[0] - 30 * b1[0], k * b2[1] - 30 * b1[1]], [k * b2[0] + 30 * b1[0], k * b2[1] + 30 * b1[1]], 'w-lattice'));
      }
    }
    if (C) layers.levels.append(levelLines(C));
    if (dual && D && Math.abs(det) > 0.05) layers.levels.append(levelLines(D[dual - 1]));
    // decomposition X = y1 ŷ1 + y2 ŷ2
    if (ok && Math.abs(y1) < 40 && Math.abs(y2) < 40) {
      const mid = [y1 * b1[0], y1 * b1[1]];
      layers.parts.append(arrow([0, 0], mid, 'w-part'), arrow(mid, X, 'w-part'));
    }
    layers.vec.append(arrow([0, 0], X, 'w-vec'));
    layers.labels.append(label([X[0] + 0.3, X[1] + 0.3], '𝒳'));
    B.forEach((b, k) => {
      layers.basis.append(arrow([0, 0], b, 'w-basis'));
      layers.labels.append(tipLabel(b, k ? 'ŷ₂' : 'ŷ₁', 'basis'));
      placeHandle(handles[k], b);
    });

    const rows = [
      h('div', { class: 'c-basis', html: tex(combo('\\hat{y}_1', b1)) }),
      h('div', { class: 'c-basis', html: tex(combo('\\hat{y}_2', b2)) }),
    ];
    if (!ok) {
      rows.push(h('div', { class: 'wide warn' }, 'ŷ₁ and ŷ₂ are parallel: they are not a basis, and the components of 𝒳 do not exist.'));
    } else {
      rows.push(
        h('div', { class: 'c-vec', html: tex(`y^1 = ${fmt(y1)}`) }),
        h('div', { class: 'c-vec', html: tex(`y^2 = ${fmt(y2)}`) }));
      if (dual) {
        rows.push(h('div', { class: 'wide c-covec', html: tex(dualCombo(`\\hat{\\mathfrak{y}}^${dual}`, D[dual - 1])) }));
      }
      if (C) {
        const c1 = C[0] * b1[0] + C[1] * b1[1], c2 = C[0] * b2[0] + C[1] * b2[1];
        rows.push(
          h('div', { class: 'c-covec', html: tex(`\\mathtt{y}_1 = \\mathsf{X}(\\hat{y}_1) = ${fmt(c1)}`) }),
          h('div', { class: 'c-covec', html: tex(`\\mathtt{y}_2 = \\mathsf{X}(\\hat{y}_2) = ${fmt(c2)}`) }),
          h('div', { class: 'wide', html: tex(`\\textstyle\\sum_i \\mathtt{y}_i\\, y^i = ${fmt(c1 * y1 + c2 * y2)}`) }));
      }
    }
    readout.replaceChildren(...rows);
  }
  draw();
}

// ---------------------------------------------------------------------------
// machine-playground
//
// A tensor as a machine with slots. The reader drags the input vectors and
// watches the output number.
//
//   slots: 1  a covector X (drawn as its level lines X(p) = n) eats one
//             vector 𝒳; the readout shows X(𝒳).
//   slots: 2  a (0,2)-tensor T(𝒳, 𝒴) = Σ T_ij x^i y^j eats two vectors.
//             area: true    shades the parallelogram spanned by 𝒳 and 𝒴
//             partial: true draws the covector T(𝒳, ·) as level lines and
//                           shows its components (fill one slot, get a covector)
//
// config:
//   covector: [1, 0.5]            (slots 1) X(𝒳) = 1 x^1 + 0.5 x^2
//   name:     'X'                 the covector's letter (slots 1, sans-serif)
//                                 or the tensor's letter (slots 2, default T)
//   tensor:   [[0,1],[-1,0]]      (slots 2) components T_ij, row i = first slot
//   u: [2, 1], v: [0, 2]          initial inputs, in the basis x̂
//   snap: 0.5
//   presets: [{label, u, v, tensor}]  (slots 2) a preset's tensor replaces T;
//                                 Reset restores the configured one
// ---------------------------------------------------------------------------
function machinePlayground(el, cfg) {
  const slots = cfg.slots ?? 1;
  const C = cfg.covector ?? [1, 0.5];
  const T0 = cfg.tensor ?? [[0, 1], [-1, 0]];
  let T = T0;
  const snap = cfg.snap ?? 0.5;
  const presets = cfg.presets ?? [];
  const start = [cfg.u ?? [2, 1], cfg.v ?? [0, 2]].slice(0, slots).map(v => [...v]);
  let U = start.map(v => [...v]);

  const view = { x: -3.5, y: -3, w: 8, h: 7 };
  const { svg, layers } = planeSvg(view, 'Drag the tips of the input vectors',
    ['area', 'levels', 'vec', 'labels', 'handles']);
  const names = ['𝒳', '𝒴'];

  const handles = U.map((_, k) => {
    const c = s('circle', { r: 0.22, class: 'w-handle vec', tabindex: 0, 'aria-label': `tip of input vector ${k + 1}` });
    layers.handles.append(c);
    draggable(svg, view, c, snap, v => { U[k] = v; draw(); });
    return c;
  });

  const readout = h('div', { class: 'readout' });
  const set = (arr, t) => { U = arr.slice(0, slots).map(v => [...v]); if (t) T = t; draw(); };
  const btns = h('div', { class: 'wbtns' },
    h('button', { class: 'btn ghost', type: 'button', onclick: () => set(start, T0) }, 'Reset'),
    h('button', { class: 'btn ghost', type: 'button', onclick: () => set([[2 * U[0][0], 2 * U[0][1]], ...U.slice(1)]) }, 'Double 𝒳'),
    slots === 2 && h('button', { class: 'btn ghost', type: 'button', onclick: () => set(U.map(v => [2 * v[0], 2 * v[1]])) }, 'Double both'),
    presets.map(p => h('button', { class: 'btn ghost', type: 'button', onclick: () => set([p.u ?? U[0], p.v ?? U[1]].filter(Boolean), p.tensor) }, p.label)));
  el.append(svg, readout, btns);

  const vecTex = (n, [a, b]) => `${n} = (${fmt(a)},\\ ${fmt(b)})`;
  const cname = `\\mathsf{${cfg.name ?? 'X'}}`;
  const tname = cfg.name ?? 'T';

  function draw() {
    for (const k of ['area', 'levels', 'vec', 'labels']) layers[k].replaceChildren();
    const [u, v] = U;
    const rows = [h('div', { class: 'c-vec', html: tex(vecTex('\\mathcal{X}', u)) })];

    if (slots === 1) {
      layers.levels.append(levelLines(C));
      const val = C[0] * u[0] + C[1] * u[1];
      const term = (c, x) => `${fmt(c)}\\cdot ${x < 0 ? `(${fmt(x)})` : fmt(x)}`;
      rows.push(
        h('div', { class: 'c-covec', html: tex(`${cname}(\\mathcal{X}) = ${fmt(C[0])}\\,x^1 ${C[1] < 0 ? '-' : '+'} ${fmt(Math.abs(C[1]))}\\,x^2`) }),
        h('div', { class: 'wide', html: tex(`${cname}(\\mathcal{X}) = ${term(C[0], u[0])} + ${term(C[1], u[1])} = ${fmt(val)}`) }));
    } else {
      if (cfg.area) {
        const pts = [[0, 0], u, [u[0] + v[0], u[1] + v[1]], v].map(p => P(...p).join(',')).join(' ');
        layers.area.append(s('polygon', { points: pts, class: 'w-area' }));
      }
      // T(𝒳, ·): fill the first slot, get a covector with components Σ_i T_ij x^i
      const part = [T[0][0] * u[0] + T[1][0] * u[1], T[0][1] * u[0] + T[1][1] * u[1]];
      const val = part[0] * v[0] + part[1] * v[1];
      if (cfg.partial) layers.levels.append(levelLines(part));
      rows.push(h('div', { class: 'c-vec', html: tex(vecTex('\\mathcal{Y}', v)) }));
      if (cfg.partial) rows.push(h('div', { class: 'wide c-covec', html: tex(dualCombo(`${tname}(\\mathcal{X},\\,\\cdot\\,)`, part)) }));
      rows.push(h('div', { class: 'wide', html: tex(`${tname}(\\mathcal{X}, \\mathcal{Y}) = ${fmt(val)}`) }));
    }

    U.forEach((b, k) => {
      layers.vec.append(arrow([0, 0], b, 'w-uvec'));
      layers.labels.append(tipLabel(b, names[k], 'vec'));
      placeHandle(handles[k], b);
    });
    readout.replaceChildren(...rows);
  }
  draw();
}

// ---------------------------------------------------------------------------
// map-builder
//
// Two finite sets, the domain on the left and the target on the right. Every
// element of the domain has exactly one arrow (that is what makes it a map).
// Tapping a domain element moves its arrow to the next target element. The
// readout says whether the map is injective, surjective, bijective, and why.
//
// config:
//   domain:  ['a', 'b', 'c']
//   target:  ['1', '2', '3']
//   map:     [0, 0, 1]          index of the image of each domain element
//   presets: [{label, domain, target, map}]
// ---------------------------------------------------------------------------
function mapBuilder(el, cfg) {
  const init = () => ({
    dom: [...(cfg.domain ?? ['a', 'b', 'c'])],
    tgt: [...(cfg.target ?? ['1', '2', '3'])],
    map: [...(cfg.map ?? [0, 0, 1])],
  });
  let st = init();
  const presets = cfg.presets ?? [];

  const svg = s('svg', { role: 'img', 'aria-label': 'Tap an element on the left to change where it goes' });
  const readout = h('div', { class: 'readout' });
  const btns = h('div', { class: 'wbtns' },
    h('button', { class: 'btn ghost', type: 'button', onclick: () => { st = init(); draw(); } }, 'Reset'),
    presets.map(p => h('button', { class: 'btn ghost', type: 'button', onclick: () => {
      st = { dom: [...p.domain], tgt: [...p.target], map: [...(p.map ?? p.domain.map(() => 0))] }; draw();
    } }, p.label)));
  el.append(svg, readout, btns);

  function draw() {
    const { dom, tgt, map } = st;
    const rowsN = Math.max(dom.length, tgt.length);
    const W = 12, H = rowsN * 1.6 + 1.6, xl = 3.2, xr = 8.8;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.replaceChildren();
    const yAt = (k, n) => 1.4 + (k + 0.5) * (H - 1.6) / n;
    const hits = tgt.map((_, j) => map.filter(m => m === j).length);

    // set outlines and names
    for (const [x, n, name] of [[xl, dom.length, 'ℳ'], [xr, tgt.length, '𝒩']]) {
      svg.append(s('rect', { x: x - 1.1, y: 1.0, width: 2.2, height: H - 1.25, rx: 1.1, class: 'w-set' }));
      const t = s('text', { x, y: 0.5, class: 'w-setname', 'text-anchor': 'middle', 'dominant-baseline': 'middle' });
      t.textContent = name;
      svg.append(t);
    }
    // arrows
    map.forEach((j, i) => {
      const a = [xl + 0.3, yAt(i, dom.length)], b = [xr - 0.3, yAt(j, tgt.length)];
      const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
      const base = [b[0] - ux * 0.3, b[1] - uy * 0.3];
      const g = s('g', { class: `w-maparrow${hits[j] > 1 ? ' clash' : ''}` });
      g.append(s('line', { x1: a[0], y1: a[1], x2: base[0], y2: base[1] }));
      g.append(s('polygon', { points: [b, [base[0] - uy * 0.16, base[1] + ux * 0.16], [base[0] + uy * 0.16, base[1] - ux * 0.16]].map(p => p.join(',')).join(' ') }));
      svg.append(g);
    });
    // elements
    dom.forEach((name, i) => {
      const g = s('g', { class: 'w-elem dom', tabindex: 0, role: 'button', 'aria-label': `${name}: tap to change its image` });
      g.append(s('circle', { cx: xl, cy: yAt(i, dom.length), r: 0.42 }));
      const t = s('text', { x: xl, y: yAt(i, dom.length), 'text-anchor': 'middle', 'dominant-baseline': 'central' });
      t.textContent = name;
      g.append(t);
      const bump = () => { st.map[i] = (st.map[i] + 1) % tgt.length; draw(); };
      g.addEventListener('click', bump);
      g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); bump(); } });
      svg.append(g);
    });
    tgt.forEach((name, j) => {
      const g = s('g', { class: `w-elem tgt${hits[j] === 0 ? ' missed' : ''}${hits[j] > 1 ? ' clash' : ''}` });
      g.append(s('circle', { cx: xr, cy: yAt(j, tgt.length), r: 0.42 }));
      const t = s('text', { x: xr, y: yAt(j, tgt.length), 'text-anchor': 'middle', 'dominant-baseline': 'central' });
      t.textContent = name;
      g.append(t);
      svg.append(g);
    });

    const clash = tgt.findIndex((_, j) => hits[j] > 1);
    const miss = tgt.findIndex((_, j) => hits[j] === 0);
    const inj = clash < 0, sur = miss < 0;
    const who = j => dom.filter((_, i) => map[i] === j).join(' and ');
    const rows = [
      h('div', { class: `wide ${inj ? 'ok' : 'warn'}` }, inj
        ? 'Injective: no two elements share an image.'
        : `Not injective: ${who(clash)} both go to ${tgt[clash]}.`),
      h('div', { class: `wide ${sur ? 'ok' : 'warn'}` }, sur
        ? 'Surjective: every element of 𝒩 is hit.'
        : `Not surjective: nothing goes to ${tgt[miss]}.`),
      h('div', { class: 'wide' }, inj && sur
        ? `Bijective, so φ⁻¹ exists: ${tgt.map((t, j) => `${t} ↦ ${who(j)}`).join(', ')}.`
        : 'Not bijective, so there is no inverse map.'),
    ];
    readout.replaceChildren(...rows);
  }
  draw();
}

// ---------------------------------------------------------------------------
// ball-probe
//
// Is a set U open? The reader drags a point p and sets a radius r with the
// slider; the ball B_r(p) is drawn, and the part of it outside U turns red.
// The readout says whether the ball fits and the largest radius that does.
// With an ambient set N (an interval, or the circle S¹ for an arc), the ball
// is cut down to N (the inherited topology): the part outside N is faded and
// does not count, and the readout judges U both in N and in ℝ or ℝ².
//
// config:
//   dim: 1 | 2
//   set:      dim 1: { a: 0, b: 1, closed: [false, false] }   (a, b: null = ±∞)
//             dim 2: { shape: disc, center: [0, 0], radius: 2, closed: false }
//                  | { shape: halfplane, closed: false }       (y > 0)
//                  | { shape: arc, from: 0, to: 180, closed: [false, false] }
//                    (an arc of the unit circle, in degrees; the ambient is S¹)
//   ambient:  dim 1 only, an interval N ⊇ U (omit: U sits in ℝ)
//   name, ambientName: TeX letters, default \mathcal{U}, \mathcal{N}
//   view:     dim 1: [x0, x1]; dim 2: { x, y, w, h } (model units)
//   p:        dim 1: a number; dim 2: [x, y], or the angle in degrees for an arc
//   r:        initial radius; rMax: slider maximum (default 1)
//   snap:     grid for p (dim 1 default 0.05, dim 2 0.1, arc 5 degrees)
//   presets:  [{label, set, ambient, p, r}]
// ---------------------------------------------------------------------------
const EPS = 1e-9;
const intervalTex = ({ a, b, closed = [false, false] }) =>
  `${closed[0] && a != null ? '[' : '('}${a == null ? '-\\infty' : fmt(a)}, ${b == null ? '\\infty' : fmt(b)}${closed[1] && b != null ? ']' : ')'}`;
const inInterval = ({ a, b, closed = [false, false] }, x) =>
  (a == null || x > a + EPS || (closed[0] && Math.abs(x - a) < EPS)) &&
  (b == null || x < b - EPS || (closed[1] && Math.abs(x - b) < EPS));
// Endpoints of U that are a real edge inside the ambient N (an endpoint shared
// with N, with the same bracket, is the edge of the whole space, not of U).
function edges1(U, N) {
  const cu = U.closed ?? [false, false], cn = N?.closed ?? [false, false];
  const out = [];
  if (U.a != null && !(N && N.a != null && Math.abs(N.a - U.a) < EPS && cn[0] === cu[0])) out.push(U.a);
  if (U.b != null && !(N && N.b != null && Math.abs(N.b - U.b) < EPS && cn[1] === cu[1])) out.push(U.b);
  return out;
}
const deg = Math.PI / 180;

function ballProbe(el, cfg) {
  const dim = cfg.dim ?? 1;
  const U0 = cfg.set ?? (dim === 1 ? { a: 0, b: 1 } : { shape: 'disc', center: [0, 0], radius: 2 });
  const pair = dim === 2 && !!cfg.pair;
  const init = () => ({ U: U0, N: cfg.ambient ?? null, p: cfg.p ?? (dim === 1 ? 0.5 : [0, 0]), q: cfg.q ?? [2, 1], r: cfg.r ?? 0.3 });
  let st = init();
  const uName = cfg.name ?? '\\mathcal{U}', nName = cfg.ambientName ?? '\\mathcal{N}';
  const rMax = cfg.rMax ?? 1;
  const isArc = () => dim === 2 && st.U.shape === 'arc';
  const snapOf = () => cfg.snap ?? (dim === 1 ? 0.05 : isArc() ? 5 : 0.1);

  // svg coordinates = S · model coordinates, so labels keep a readable size
  let view, S;
  if (dim === 1) {
    const [x0, x1] = cfg.view ?? [-0.5, 1.5];
    S = 8 / (x1 - x0);
    view = { x: S * x0, y: -1.1, w: 8, h: 2.3 };
  } else {
    const v = cfg.view ?? (isArc() ? { x: -1.7, y: -1.5, w: 3.4, h: 3.1 } : { x: -3.5, y: -3, w: 7, h: 6 });
    S = 7 / v.w;
    view = { x: S * v.x, y: S * v.y, w: 7, h: S * v.h };
  }
  const M = (x, y) => [S * x, S * y];
  const { svg, layers } = dim === 1
    ? { svg: s('svg', { class: 'w-line1d', viewBox: `${view.x} ${-(view.y + view.h)} ${view.w} ${view.h}`, role: 'img', 'aria-label': 'Drag the point p along the line' }),
        layers: null }
    : planeSvg(view, 'Drag the point p', ['region', 'ball', 'marks', 'labels', 'handles']);
  const L = layers ?? ['axis', 'region', 'ball', 'marks', 'labels', 'handles']
    .reduce((o, k) => { o[k] = s('g'); svg.append(o[k]); return o; }, {});

  const dragPoint = (handle, key) => handle.addEventListener('pointerdown', e => {
    e.preventDefault();
    handle.setPointerCapture(e.pointerId);
    const move = ev => {
      const pt = svg.createSVGPoint();
      pt.x = ev.clientX; pt.y = ev.clientY;
      const m = pt.matrixTransform(svg.getScreenCTM().inverse());
      const x = m.x / S, y = -m.y / S, sn = snapOf();
      if (dim === 1) {
        let v = Math.round(x / sn) * sn;
        const lo = (view.x + 0.2) / S, hi = (view.x + view.w - 0.2) / S;
        st[key] = Math.max(lo, Math.min(hi, v));
      } else if (isArc()) {
        let a = Math.atan2(y, x) / deg;
        if (a < 0) a += 360;
        st[key] = (Math.round(a / sn) * sn) % 360;
      } else {
        const cl = (t, lo, hi) => Math.max(lo + 0.1, Math.min(hi - 0.1, Math.round(t / sn) * sn));
        st[key] = [cl(x, view.x / S, (view.x + view.w) / S), cl(y, view.y / S, (view.y + view.h) / S)];
      }
      draw();
    };
    const up = () => { handle.removeEventListener('pointermove', move); handle.removeEventListener('pointerup', up); handle.removeEventListener('pointercancel', up); };
    handle.addEventListener('pointermove', move);
    handle.addEventListener('pointerup', up);
    handle.addEventListener('pointercancel', up);
  });
  const handle = s('circle', { r: 0.2, class: 'w-handle vec', tabindex: 0, 'aria-label': 'the point p' });
  L.handles.append(handle);
  dragPoint(handle, 'p');
  // pair mode: a second point q, to separate p and q by disjoint balls
  const qHandle = pair ? s('circle', { r: 0.2, class: 'w-handle vec', tabindex: 0, 'aria-label': 'the point q' }) : null;
  if (pair) { L.handles.append(qHandle); dragPoint(qHandle, 'q'); }

  const slider = h('input', { type: 'range', min: 0.01, max: rMax, step: rMax / 100, 'aria-label': 'radius r' });
  slider.addEventListener('input', () => { st.r = +slider.value; draw(); });
  const readout = h('div', { class: 'readout' });
  const btns = h('div', { class: 'wbtns' },
    h('button', { class: 'btn ghost', type: 'button', onclick: () => { st = init(); draw(); } }, 'Reset'),
    (cfg.presets ?? []).map(p => h('button', { class: 'btn ghost', type: 'button', onclick: () => {
      st = { U: p.set ?? st.U, N: p.ambient !== undefined ? p.ambient : st.N, p: p.p ?? st.p, q: p.q ?? st.q, r: p.r ?? st.r }; draw();
    } }, p.label)));
  el.append(svg, h('label', { class: 'wslider' }, h('span', { html: tex('r') }), slider), readout, btns);

  const seg = (a, b, cls) => line(M(a, 0), M(b, 0), cls);
  const dot = (x, y, closed, cls) => {
    const [cx, cy] = P(...M(x, y));
    return s('circle', { cx, cy, r: 0.11, class: `w-end ${cls} ${closed ? 'closed' : ''}` });
  };
  const arcPath = (t0, t1, R = 1) => {
    const [x0, y0] = P(...M(R * Math.cos(t0), R * Math.sin(t0))), [x1, y1] = P(...M(R * Math.cos(t1), R * Math.sin(t1)));
    const big = t1 - t0 > Math.PI ? 1 : 0;
    return `M ${x0} ${y0} A ${S * R} ${S * R} 0 ${big} 0 ${x1} ${y1}`;
  };
  // Cut [lo, hi] at the cut points and classify each piece by its midpoint.
  const pieces = (lo, hi, cuts, classify) => {
    const xs = [lo, ...cuts.filter(c => c > lo + EPS && c < hi - EPS).sort((u, v) => u - v), hi];
    return xs.slice(1).map((x, k) => [xs[k], x, classify((xs[k] + x) / 2)]);
  };

  function status(where, fits, maxR) {
    const best = maxR === Infinity ? 'every radius fits.'
      : maxR < 1e-6 ? 'no radius fits: every ball around $p$ pokes out.'
      : `the largest radius that fits is $${fmt(maxR)}$.`;
    const cap = t => (where ? where + t : t[0].toUpperCase() + t.slice(1));
    return [
      h('div', { class: `wide ${fits ? 'ok' : 'warn'}`, html: mdInline(cap(fits ? 'the ball fits.' : `the ball pokes out of $${uName}$.`)) }),
      h('div', { class: 'wide', html: mdInline(cap(best)) }),
    ];
  }

  function draw() {
    for (const k of ['region', 'ball', 'marks', 'labels']) L[k].replaceChildren();
    const { U, N, r } = st;
    slider.value = r;
    const rows = [];
    if (dim === 1) draw1(U, N, r, rows); else if (pair) drawPair(r, rows); else if (isArc()) drawArc(U, r, rows); else draw2(U, r, rows);
    readout.replaceChildren(...rows);
  }

  function draw1(U, N, r, rows) {
    const p = st.p;
    const lo = view.x / S, hi = (view.x + view.w) / S;
    if (!L.axis.childElementCount) {
      L.axis.append(seg(lo, hi, 'w-axis'));
      for (let k = Math.ceil(lo); k <= hi; k++) {
        L.axis.append(line([S * k, -0.12], [S * k, 0.12], 'w-axis'));
        L.axis.append(label([S * k, -0.55], String(k), 'tick'));
      }
    }
    const clip = (a, d) => (a == null ? d : a);
    if (N) {
      L.region.append(seg(clip(N.a, lo), clip(N.b, hi), 'w-amb'));
      for (const [x, c] of [[N.a, N.closed?.[0]], [N.b, N.closed?.[1]]]) if (x != null) L.marks.append(dot(x, 0, c, 'amb'));
    }
    L.region.append(seg(clip(U.a, lo), clip(U.b, hi), 'w-region-line'));
    for (const [x, c] of [[U.a, U.closed?.[0]], [U.b, U.closed?.[1]]]) if (x != null) L.marks.append(dot(x, 0, c, 'reg'));

    const inN = x => !N || inInterval(N, x);
    // the ball, raised above the line
    const y = 0.5 / S;
    for (const [a, b, cls] of pieces(p - r, p + r, [U.a, U.b, N?.a, N?.b].filter(c => c != null),
      m => (!inN(m) ? 'ghost' : inInterval(U, m) ? '' : 'out'))) {
      L.ball.append(line(M(a, y), M(b, y), `w-ball-line ${cls}`));
    }
    L.marks.append(dot(p - r, y, false, 'ball'), dot(p + r, y, false, 'ball'));
    L.ball.append(line(M(p, 0), M(p, y), 'w-tick'));
    L.labels.append(label([S * p, 0.85], 'p', 'vec'));
    placeHandle(handle, M(p, 0));

    rows.push(h('div', { html: tex(`p = ${fmt(p)}`) }), h('div', { html: tex(`r = ${fmt(r)}`) }));
    rows.push(h('div', { class: 'wide', html: mdInline(`$${uName} = ${intervalTex(U)}$${N ? ` inside $${nName} = ${intervalTex(N)}$` : ''}`) }));
    if (N && !inInterval(N, p)) { rows.push(h('div', { class: 'wide' }, 'p is outside the space N: drag it back.')); return; }
    if (!inInterval(U, p)) { rows.push(h('div', { class: 'wide', html: mdInline(`$p \\notin ${uName}$: openness only asks about points of $${uName}$.`) })); return; }
    const maxIn = es => Math.min(Infinity, ...es.map(e => Math.abs(p - e)));
    if (N) {
      const mN = maxIn(edges1(U, N)), mR = maxIn(edges1(U, null));
      rows.push(...status(`In $${nName}$: `, r <= mN + EPS, mN), ...status('In $\\mathbb{R}$: ', r <= mR + EPS, mR));
    } else {
      const m = maxIn(edges1(U, null));
      rows.push(...status('', r <= m + EPS, m));
    }
  }

  function draw2(U, r, rows) {
    const p = st.p;
    let inU, maxR;
    if (U.shape === 'halfplane') {
      const top = (view.y + view.h) / S, l = view.x / S, w = view.w / S;
      const [x, yy] = P(...M(l, top));
      L.region.append(s('rect', { x, y: yy, width: S * w, height: S * top, class: 'w-region' }));
      L.region.append(line(M(l, 0), M(l + w, 0), `w-edge ${U.closed ? 'closed' : ''}`));
      inU = p[1] > EPS || (U.closed && Math.abs(p[1]) < EPS);
      maxR = p[1];
    } else {
      const c = U.center ?? [0, 0], R = U.radius ?? 2;
      const [cx, cy] = P(...M(...c));
      L.region.append(s('circle', { cx, cy, r: S * R, class: 'w-region' }));
      L.region.append(s('circle', { cx, cy, r: S * R, class: `w-edge ${U.closed ? 'closed' : ''}` }));
      const d = Math.hypot(p[0] - c[0], p[1] - c[1]);
      inU = d < R - EPS || (U.closed && Math.abs(d - R) < EPS);
      maxR = R - d;
    }
    const fits = inU && r <= maxR + EPS;
    const [bx, by] = P(...M(...p));
    L.ball.append(s('circle', { cx: bx, cy: by, r: S * r, class: `w-ball ${inU && !fits ? 'out' : ''}` }));
    L.labels.append(label([bx + 0.3, -by + 0.3], 'p', 'vec'));
    placeHandle(handle, M(...p));
    rows.push(h('div', { html: tex(`p = (${fmt(p[0])},\\ ${fmt(p[1])})`) }), h('div', { html: tex(`r = ${fmt(r)}`) }));
    if (!inU) { rows.push(h('div', { class: 'wide', html: mdInline(`$p \\notin ${uName}$: openness only asks about points of $${uName}$.`) })); return; }
    rows.push(...status('', fits, Math.max(0, maxR)));
  }

  // Hausdorff: two points, one radius; the balls turn red while they overlap.
  function drawPair(r, rows) {
    const { p, q } = st;
    const d = Math.hypot(p[0] - q[0], p[1] - q[1]);
    const apart = d > EPS && 2 * r <= d + EPS;
    for (const [c, name] of [[p, 'p'], [q, 'q']]) {
      const [bx, by] = P(...M(...c));
      L.ball.append(s('circle', { cx: bx, cy: by, r: S * r, class: `w-ball ${apart ? '' : 'out'}` }));
      L.labels.append(label([bx + 0.3, -by + 0.3], name, 'vec'));
    }
    placeHandle(handle, M(...p));
    placeHandle(qHandle, M(...q));
    rows.push(h('div', { html: tex(`\\lVert p - q\\rVert = ${fmt(d)}`) }), h('div', { html: tex(`r = ${fmt(r)}`) }));
    if (d < EPS) { rows.push(h('div', { class: 'wide', html: mdInline('$p = q$: there is nothing to separate. Drag $q$ away.') })); return; }
    rows.push(h('div', { class: `wide ${apart ? 'ok' : 'warn'}`, html: mdInline(apart
      ? '$B_r(p)\\cap B_r(q) = \\emptyset$: the balls separate $p$ and $q$.'
      : 'The balls overlap: they do not separate $p$ and $q$.') }),
    h('div', { class: 'wide', html: mdInline(`Disjoint exactly when $r\\le ${fmt(d / 2)}$, half the distance.`) }));
  }

  function drawArc(U, r, rows) {
    const t = st.p * deg, t0 = U.from * deg, t1 = U.to * deg, cl = U.closed ?? [false, false];
    const p = [Math.cos(t), Math.sin(t)];
    const [ox, oy] = P(0, 0);
    L.region.append(s('circle', { cx: ox, cy: oy, r: S, class: 'w-amb-ring' }));
    L.region.append(s('path', { d: arcPath(t0, t1), class: 'w-region-arc' }));
    L.marks.append(dot(Math.cos(t0), Math.sin(t0), cl[0], 'reg'), dot(Math.cos(t1), Math.sin(t1), cl[1], 'reg'));
    const a = ((st.p % 360) + 360) % 360;
    const inU = (a > U.from + EPS && a < U.to - EPS) || (cl[0] && Math.abs(a - U.from) < EPS) || (cl[1] && Math.abs(a - U.to) < EPS);
    // the ball in the plane (faded: only its trace on S¹ counts in S¹)
    const [bx, by] = P(...M(...p));
    L.ball.append(s('circle', { cx: bx, cy: by, r: S * r, class: 'w-ball ghost' }));
    // its trace on S¹: the points at chord distance < r, i.e. angle < α
    const al = r >= 2 ? Math.PI : 2 * Math.asin(r / 2);
    for (const [u, v, cls] of pieces(t - al, t + al, [t0, t1, t0 - 2 * Math.PI, t1 - 2 * Math.PI, t0 + 2 * Math.PI, t1 + 2 * Math.PI],
      m => { const mm = ((m / deg) % 360 + 360) % 360; return mm > U.from && mm < U.to ? '' : 'out'; })) {
      L.ball.append(s('path', { d: arcPath(u, v), class: `w-ball-arc ${cls}` }));
    }
    L.labels.append(label([bx * 1.28, -by * 1.28], 'p', 'vec'));
    placeHandle(handle, M(...p));
    rows.push(h('div', { html: tex(`p\\ \\text{at}\\ ${fmt(a)}^\\circ`) }), h('div', { html: tex(`r = ${fmt(r)}`) }));
    if (!inU) { rows.push(h('div', { class: 'wide', html: mdInline(`$p \\notin ${uName}$: openness only asks about points of $${uName}$.`) })); return; }
    const d = Math.min(a - U.from, U.to - a);
    const mS = 2 * Math.sin(Math.max(0, d) * deg / 2);
    rows.push(...status('In $S^1$: ', r <= mS + EPS, mS),
      h('div', { class: 'wide warn', html: mdInline('In $\\mathbb{R}^2$: every disc around $p$ contains points off the circle, so no radius fits.') }));
  }
  draw();
}

// ---------------------------------------------------------------------------
// preimage-explorer
//
// Continuity via preimages. The graph of a map f: ℝ → ℝ; the reader drags the
// two ends of an open interval V on the vertical axis. The inputs x with
// f(x) ∈ V, the preimage, are marked on the horizontal axis: a filled end dot
// means the end belongs to the preimage. The readout writes the preimage and
// says whether it is open (a filled end dot is a point with no room).
//
// config:
//   fn:      linear (2x + 1) | step (H, jump at 0) | square (x²) | const (1)
//   V:       [0.5, 1.5]   ends of the open interval V (a < b)
//   view:    { x, y, w, h }  (model units; default { x: -3, y: -1.5, w: 6, h: 4.5 })
//   snap:    grid for the ends of V (default 0.1)
//   presets: [{label, fn, V}]   (fn, V optional)
// ---------------------------------------------------------------------------
const FUNCS = {
  linear: { name: 'f', rule: '$f(x) = 2x + 1$', f: x => 2 * x + 1, jumps: [] },
  step: { name: 'H', rule: '$H(x) = 0$ for $x < 0$, and $H(x) = 1$ for $x \\ge 0$', f: x => (x < 0 ? 0 : 1), jumps: [0] },
  square: { name: 'f', rule: '$f(x) = x^2$', f: x => x * x, jumps: [] },
  const: { name: 'c', rule: '$c(x) = 1$ for every $x$', f: () => 1, jumps: [] },
};

function preimageExplorer(el, cfg) {
  const view = cfg.view ?? { x: -3, y: -1.5, w: 6, h: 4.5 };
  const init = () => ({ fn: cfg.fn ?? 'linear', V: [...(cfg.V ?? [0.5, 1.5])] });
  let st = init();
  const sn = cfg.snap ?? 0.1;
  const { svg, layers: L } = planeSvg(view, 'Drag the ends of the interval V on the vertical axis', ['band', 'graph', 'pre', 'marks', 'labels', 'handles']);
  const readout = h('div', { class: 'readout' });
  const btns = h('div', { class: 'wbtns' },
    h('button', { class: 'btn ghost', type: 'button', onclick: () => { st = init(); draw(); } }, 'Reset'),
    (cfg.presets ?? []).map(p => h('button', { class: 'btn ghost', type: 'button', onclick: () => {
      st = { fn: p.fn ?? st.fn, V: p.V ? [...p.V] : st.V }; draw();
    } }, p.label)));
  el.append(svg, readout, btns);

  const ends = [0, 1].map(k => {
    const c = s('circle', { r: 0.17, class: 'w-handle gold', tabindex: 0, 'aria-label': k ? 'upper end of V' : 'lower end of V' });
    L.handles.append(c);
    c.addEventListener('pointerdown', e => {
      e.preventDefault();
      c.setPointerCapture(e.pointerId);
      const move = ev => {
        const pt = svg.createSVGPoint();
        pt.x = ev.clientX; pt.y = ev.clientY;
        const y = -pt.matrixTransform(svg.getScreenCTM().inverse()).y;
        let v = Math.round(y / sn) * sn;
        v = Math.max(view.y + 0.1, Math.min(view.y + view.h - 0.1, v));
        st.V[k] = k ? Math.max(v, st.V[0] + sn) : Math.min(v, st.V[1] - sn);
        draw();
      };
      const up = () => { c.removeEventListener('pointermove', move); c.removeEventListener('pointerup', up); c.removeEventListener('pointercancel', up); };
      c.addEventListener('pointermove', move);
      c.addEventListener('pointerup', up);
      c.addEventListener('pointercancel', up);
    });
    return c;
  });

  // The preimage {x | a < f(x) < b} on the visible range, as intervals
  // [lo, hi, loClosed, hiClosed]; an end at the edge of the view is ±∞.
  function preimage(F, [a, b]) {
    const x0 = view.x, x1 = view.x + view.w, n = 1200;
    const xs = [];
    for (let k = 0; k <= n; k++) {
      const x = x0 + (x1 - x0) * k / n;
      xs.push(F.jumps.find(j => Math.abs(x - j) < EPS) ?? x);   // jumps sampled exactly
    }
    for (const j of F.jumps) if (!xs.includes(j)) xs.push(j);
    xs.sort((u, v) => u - v);
    const inV = x => { const y = F.f(x); return y > a && y < b; };
    const isJump = x => F.jumps.some(j => Math.abs(x - j) < EPS);
    // boundary between xs[k] and xs[k+1]: at a jump point exactly, else bisect
    const cut = (u, v) => {
      if (isJump(u)) return [u, inV(u)];
      if (isJump(v)) return [v, inV(v)];
      const iu = inV(u);
      for (let t = 0; t < 40; t++) { const m = (u + v) / 2; if (inV(m) === iu) u = m; else v = m; }
      return [(u + v) / 2, false];
    };
    const out = [];
    let cur = inV(xs[0]) ? [-Infinity, null, false, false] : null;
    for (let k = 0; k + 1 < xs.length; k++) {
      const iu = inV(xs[k]), iv = inV(xs[k + 1]);
      if (iu === iv) continue;
      const [x, closed] = cut(xs[k], xs[k + 1]);
      if (iv) cur = [x, null, closed, false];
      else { cur[1] = x; cur[3] = closed; out.push(cur); cur = null; }
    }
    if (cur) { cur[1] = Infinity; out.push(cur); }
    return out;
  }

  function draw() {
    for (const k of ['band', 'graph', 'pre', 'marks', 'labels']) L[k].replaceChildren();
    const F = FUNCS[st.fn] ?? FUNCS.linear, [a, b] = st.V;
    const x0 = view.x, x1 = view.x + view.w;
    // V: a band across the plane, solid on the vertical axis, ends excluded
    const [rx, ry] = P(x0, b);
    L.band.append(s('rect', { x: rx, y: ry, width: view.w, height: b - a, class: 'w-region' }));
    for (const y of [a, b]) L.band.append(line([x0, y], [x1, y], 'w-edge'));
    L.band.append(line([0, a], [0, b], 'w-region-line'));
    // the graph, broken at the jumps, highlighted where f(x) ∈ V
    const cuts = [x0, ...F.jumps.filter(j => j > x0 && j < x1), x1];
    for (let k = 0; k + 1 < cuts.length; k++) {
      const pts = [];
      for (let t = 0; t <= 300; t++) {
        let x = cuts[k] + (cuts[k + 1] - cuts[k]) * t / 300;
        if (t === 300 && k + 1 < cuts.length - 1) x -= 1e-7;
        pts.push([x, F.f(x)]);
      }
      L.graph.append(s('polyline', { points: pts.map(p => P(...p).join(',')).join(' '), class: 'w-graph' }));
    }
    const pre = preimage(F, st.V);
    for (const [lo, hi] of pre) {
      const u = Math.max(lo, x0), v = Math.min(hi, x1), pts = [];
      for (let t = 0; t <= 200; t++) { const x = u + (v - u) * t / 200; pts.push([x, F.f(x)]); }
      L.graph.append(s('polyline', { points: pts.map(p => P(...p).join(',')).join(' '), class: 'w-graph on' }));
      L.pre.append(line([u, 0], [v, 0], 'w-ball-line'));
    }
    for (const j of F.jumps) {
      const yl = F.f(j - 1e-7), y = F.f(j);
      if (Math.abs(yl - y) > EPS) {
        const [cx, cy] = P(j, yl);
        L.marks.append(s('circle', { cx, cy, r: 0.08, class: 'w-end graph' }));
        const [dx, dy] = P(j, y);
        L.marks.append(s('circle', { cx: dx, cy: dy, r: 0.08, class: 'w-end graph closed' }));
      }
    }
    for (const [lo, hi, cl, ch] of pre) {
      if (lo > x0) { const [cx, cy] = P(lo, 0); L.marks.append(s('circle', { cx, cy, r: 0.09, class: `w-end ball ${cl ? 'closed' : ''}` })); }
      if (hi < x1) { const [cx, cy] = P(hi, 0); L.marks.append(s('circle', { cx, cy, r: 0.09, class: `w-end ball ${ch ? 'closed' : ''}` })); }
    }
    L.labels.append(label([0.35, (a + b) / 2], 'V', 'gold'));
    ends.forEach((c, k) => placeHandle(c, [0, st.V[k]]));

    const num = x => (x === -Infinity ? '-\\infty' : x === Infinity ? '\\infty' : fmt(x));
    const itv = ([lo, hi, cl, ch]) => `${cl ? '[' : '('}${num(lo)}, ${num(hi)}${ch ? ']' : ')'}`;
    const preTex = pre.length ? pre.map(itv).join('\\cup ') : '\\emptyset';
    const bad = pre.flatMap(([lo, hi, cl, ch]) => [cl ? lo : null, ch ? hi : null]).filter(x => x != null);
    readout.replaceChildren(
      h('div', { class: 'wide', html: mdInline(F.rule) }),
      h('div', { class: 'wide', html: tex(`\\mathcal{V} = (${fmt(a)}, ${fmt(b)})`) }),
      h('div', { class: 'wide', html: tex(`\\mathrm{preim}_${F.name}(\\mathcal{V}) = ${preTex}`) }),
      h('div', { class: `wide ${bad.length ? 'warn' : 'ok'}`, html: mdInline(bad.length
        ? `Not open: $${fmt(bad[0])}$ belongs to the preimage, but every ball around it contains points that do not.`
        : 'Open: every point of the preimage has a ball around it inside the preimage.') }));
  }
  draw();
}

// ---------------------------------------------------------------------------
// circle-charts
//
// Two charts on the unit circle S¹. Chart A: the angle θ ∈ (0, 2π), defined
// on 𝒰 = S¹ ∖ {(1,0)}. Chart B: the angle φ ∈ (−π, π) on 𝒱 = S¹ ∖ {(−1,0)},
// or (stereo) the stereographic projection σ = x/(1 − y) from the north pole
// on 𝒱 = S¹ ∖ {(0,1)}. Each chart's domain is a ring around the circle, the
// overlap is drawn on the circle itself, and the missing points are hollow.
// The reader drags p around the circle; a second panel graphs the transition
// map (B's coordinate as a function of θ) on θ(𝒰 ∩ 𝒱).
//
// config:
//   angle:   60          position of p, in degrees from (1,0) counterclockwise
//   show:    both        both | A | B (one chart alone hides the transition)
//   stereo:  false       chart B is stereographic projection instead of φ
//   snap:    5           degrees p snaps to (0 = free)
//   presets: [{label, angle, show}]
// ---------------------------------------------------------------------------
function circleCharts(el, cfg) {
  const R = 2, stereo = !!cfg.stereo, sn = cfg.snap ?? 5;
  const init = () => ({ deg: cfg.angle ?? 60, show: cfg.show ?? 'both' });
  let st = init();
  const missB = stereo ? 90 : 180;
  const view = { x: -2.95, y: -2.95, w: 5.9, h: 5.9 };
  const { svg, layers: L } = planeSvg(view, 'Drag the point p around the circle', ['rings', 'circle', 'angles', 'proj', 'marks', 'labels', 'handles']);
  // the graph's vertical axis is squashed by YS so the panel is wider than tall
  const YS = 0.6, gview = { x: -1, y: -2.75, w: 7.9, h: 5.5 };
  const { svg: gsvg, layers: G } = planeSvg(gview, 'Graph of the transition map on the overlap', ['ticks', 'curve', 'marks', 'labels']);
  const panels = h('div', { class: 'cc-panels' }, svg, gsvg);
  const readout = h('div', { class: 'readout' });
  const btns = h('div', { class: 'wbtns' },
    h('button', { class: 'btn ghost', type: 'button', onclick: () => { st = init(); draw(); } }, 'Reset'),
    (cfg.presets ?? []).map(p => h('button', { class: 'btn ghost', type: 'button', onclick: () => {
      st = { deg: p.angle ?? st.deg, show: p.show ?? st.show }; draw();
    } }, p.label)));
  el.append(panels, readout, btns);

  const handle = s('circle', { r: 0.2, class: 'w-handle gold', tabindex: 0, 'aria-label': 'point p' });
  L.handles.append(handle);
  handle.addEventListener('pointerdown', e => {
    e.preventDefault();
    handle.setPointerCapture(e.pointerId);
    const move = ev => {
      const pt = svg.createSVGPoint();
      pt.x = ev.clientX; pt.y = ev.clientY;
      const m = pt.matrixTransform(svg.getScreenCTM().inverse());
      let d = Math.atan2(-m.y, m.x) * 180 / Math.PI;
      if (sn) d = Math.round(d / sn) * sn;
      st.deg = ((d % 360) + 360) % 360;
      draw();
    };
    const up = () => { handle.removeEventListener('pointermove', move); handle.removeEventListener('pointerup', up); handle.removeEventListener('pointercancel', up); };
    handle.addEventListener('pointermove', move);
    handle.addEventListener('pointerup', up);
    handle.addEventListener('pointercancel', up);
  });

  const rad = d => d * Math.PI / 180;
  const at = (d, r = R) => [r * Math.cos(rad(d)), r * Math.sin(rad(d))];
  // counterclockwise arc from d0 to d1 degrees (d1 > d0), radius r
  const arc = (d0, d1, r = R) => {
    const [x0, y0] = P(...at(d0, r)), [x1, y1] = P(...at(d1, r));
    return `M${x0},${y0} A${r},${r} 0 ${d1 - d0 > 180 ? 1 : 0} 0 ${x1},${y1}`;
  };
  const near = (a, b) => Math.abs(a - b) < 1e-9;
  // coordinates of p (null where the chart is undefined)
  const thetaOf = d => (near(d, 0) ? null : rad(d));
  const bOf = d => {
    if (near(d, missB)) return null;
    if (stereo) return Math.cos(rad(d)) / (1 - Math.sin(rad(d)));
    return d < 180 ? rad(d) : rad(d) - 2 * Math.PI;
  };
  const bName = stereo ? '\\sigma' : '\\varphi';
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  // an angle in degrees as a TeX multiple of π (≈ decimal when it isn't nice)
  const piTex = d => {
    if (near(d, 0)) return '0';
    if (Math.abs(d - Math.round(d)) > 1e-9 || Math.round(d) % 15) return fmt(rad(d));
    const n = Math.abs(Math.round(d)), g = gcd(n, 180), num = n / g, den = 180 / g;
    const top = num === 1 ? '\\pi' : `${num}\\pi`;
    return `${d < 0 ? '-' : ''}${den === 1 ? top : `\\dfrac{${top}}{${den}}`}`;
  };
  const angTex = d => { const t = piTex(d); return t.includes('pi') ? `${t} \\approx ${fmt(rad(d))}` : t; };

  // the transition map's graph: B's coordinate against θ ∈ (0, 2π)
  function drawGraph() {
    for (const k of ['ticks', 'curve', 'marks', 'labels']) G[k].replaceChildren();
    const TP = 2 * Math.PI;
    for (const [x, t] of [[Math.PI, 'π'], [TP, '2π']]) {
      G.ticks.append(line([x, -0.12], [x, 0.12], 'w-axis'));
      G.labels.append(label([x, -0.45], t));
    }
    G.labels.append(label([TP + 0.45, 0.35], 'θ'));
    G.labels.append(label([-0.5, gview.y + gview.h - 0.35], stereo ? 'σ' : 'φ', 'covec'));
    if (!stereo) for (const [y, t] of [[Math.PI, 'π'], [-Math.PI, '−π']]) {
      G.ticks.append(line([-0.12, YS * y], [0.12, YS * y], 'w-axis'));
      G.labels.append(label([-0.55, YS * y], t));
    }
    // pieces of the overlap, in θ (open intervals)
    const pieces = stereo ? [[0, Math.PI / 2], [Math.PI / 2, TP]] : [[0, Math.PI], [Math.PI, TP]];
    const f = th => bOf(th * 180 / Math.PI);
    for (const [u, v] of pieces) {
      const pts = [];
      for (let k = 1; k < 400; k++) {
        const th = u + (v - u) * k / 400, y = f(th);
        if (Math.abs(y) < 30) pts.push(P(th, YS * y).join(','));
      }
      G.curve.append(s('polyline', { points: pts.join(' '), class: 'w-graph on cc' }));
      for (const th of [u, v]) {
        const y = stereo && near(th, Math.PI / 2) ? null : th === u ? f(th + 1e-9) : f(th - 1e-9);
        if (y == null) continue;
        const [cx, cy] = P(th, YS * y);
        G.marks.append(s('circle', { cx, cy, r: 0.11, class: 'w-end cc' }));
      }
    }
    if (stereo) G.ticks.append(line([Math.PI / 2, gview.y], [Math.PI / 2, gview.y + gview.h], 'w-edge cc-asym'));
    const th = thetaOf(st.deg), y = bOf(st.deg);
    if (th != null && y != null && Math.abs(YS * y) < gview.h / 2) {
      const [cx, cy] = P(th, YS * y);
      G.marks.append(s('circle', { cx, cy, r: 0.17, class: 'w-handle gold' }));
    }
  }

  function draw() {
    for (const k of ['rings', 'circle', 'angles', 'proj', 'marks', 'labels']) L[k].replaceChildren();
    const showA = st.show !== 'B', showB = st.show !== 'A', both = showA && showB;
    gsvg.style.display = both ? '' : 'none';
    panels.classList.toggle('single', !both);
    const d = st.deg, p = at(d);
    // domains: A outside the circle, B inside; hollow dots at the missing points
    L.circle.append(s('circle', { cx: 0, cy: 0, r: R, class: 'w-graph' }));
    const gap = 4;
    if (showA) L.rings.append(s('path', { d: arc(gap, 360 - gap, R + 0.28), class: 'cc-ring a' }));
    if (showB) L.rings.append(s('path', { d: arc(missB + gap, missB + 360 - gap, R - 0.28), class: 'cc-ring b' }));
    if (both) for (const [u, v] of stereo ? [[0, 90], [90, 360]] : [[0, 180], [180, 360]])
      L.circle.append(s('path', { d: arc(u + gap, v - gap), class: 'w-region-arc' }));
    if (showA) { const [cx, cy] = P(...at(0)); L.marks.append(s('circle', { cx, cy, r: 0.13, class: 'w-end cc-miss a' })); }
    if (showB) { const [cx, cy] = P(...at(missB)); L.marks.append(s('circle', { cx, cy, r: 0.13, class: 'w-end cc-miss b' })); }
    if (showA) L.labels.append(label(at(225, R + 0.75), 'θ', 'vec'));
    if (showB) L.labels.append(label(at(stereo ? 225 : 315, R - 0.75), stereo ? 'σ' : 'φ', 'covec'));
    if (both && !stereo) {
      L.labels.append(label(at(90, R + 0.62), 'upper', 'gold small'));
      L.labels.append(label(at(270, R + 0.62), 'lower', 'gold small'));
    }
    // how each chart reads p: angles from (1,0), or the projection from N
    L.angles.append(line([0, 0], [R, 0], 'w-axis'), line([0, 0], p, 'w-axis'));
    const th = thetaOf(d), b = bOf(d);
    if (showA && th != null) L.angles.append(s('path', { d: arc(0, d, 0.55), class: 'cc-angle a' }));
    if (showB && b != null && !stereo) {
      const [d0, d1] = b >= 0 ? [0, d] : [d, 360];
      L.angles.append(s('path', { d: arc(d0, d1, 0.85), class: 'cc-angle b' }));
    }
    if (showB && stereo) {
      L.proj.append(line([-3, 0], [3, 0], 'cc-line'));
      if (b != null) {
        const far = Math.abs(b) > 40 ? Math.sign(b) * 40 : b;
        L.proj.append(line([0, R], [R * far, 0], 'cc-ray'));
        const [cx, cy] = P(R * b, 0);
        if (Math.abs(R * b) < 2.9) L.marks.append(s('circle', { cx, cy, r: 0.12, class: 'cc-hit' }));
      }
    }
    L.labels.append(label([p[0] * 1.3 + (p[0] >= 0 ? 0.25 : -0.25), p[1] * 1.3], 'p', 'gold'));
    placeHandle(handle, p);
    if (both) drawGraph();

    const [x, y] = [Math.cos(rad(d)), Math.sin(rad(d))];
    const rows = [h('div', { class: 'wide', html: tex(`p = (${fmt(x)}, ${fmt(y)})`) })];
    if (showA) rows.push(h('div', { class: 'c-vec', html: th == null
      ? mdInline('$\\theta(p)$ undefined: $p = (1,0) \\notin \\mathcal{U}$')
      : tex(`\\theta(p) = ${angTex(d)}`) }));
    if (showB) rows.push(h('div', { class: 'c-covec', html: b == null
      ? mdInline(`$${bName}(p)$ undefined: $p = ${stereo ? '(0,1)' : '(-1,0)'} \\notin \\mathcal{V}$`)
      : tex(stereo ? `\\sigma(p) = \\dfrac{x}{1-y} = ${fmt(b)}` : `\\varphi(p) = ${angTex(b * 180 / Math.PI)}`) }));
    if (both) {
      let msg;
      if (th == null || b == null) msg = `$p \\notin \\mathcal{U} \\cap \\mathcal{V}$: only one chart covers $p$, so there is nothing to translate.`;
      else if (stereo) msg = `$p \\in \\mathcal{U} \\cap \\mathcal{V}$: $\\sigma = \\dfrac{\\cos\\theta}{1-\\sin\\theta} = ${fmt(b)}$`;
      else if (d < 180) msg = `$p$ in the upper piece: $\\varphi = \\theta = ${piTex(d)}$`;
      else msg = `$p$ in the lower piece: $\\varphi = \\theta - 2\\pi = ${piTex(d - 360)}$`;
      rows.push(h('div', { class: `wide${th == null || b == null ? ' warn' : ''}`, html: mdInline(msg) }));
    }
    readout.replaceChildren(...rows);
  }
  draw();
}

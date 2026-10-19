// Interactive widgets, referenced from lesson YAML by name:
//   - type: widget
//     widget: basis-playground
//     config: { ... }

import { h } from './dom.js';
import { tex } from './render.js';

const WIDGETS = {
  'basis-playground': basisPlayground,
  'machine-playground': machinePlayground,
  'map-builder': mapBuilder,
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
//   presets: [{label, u, v}]
// ---------------------------------------------------------------------------
function machinePlayground(el, cfg) {
  const slots = cfg.slots ?? 1;
  const C = cfg.covector ?? [1, 0.5];
  const T = cfg.tensor ?? [[0, 1], [-1, 0]];
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
  const set = arr => { U = arr.slice(0, slots).map(v => [...v]); draw(); };
  const btns = h('div', { class: 'wbtns' },
    h('button', { class: 'btn ghost', type: 'button', onclick: () => set(start) }, 'Reset'),
    h('button', { class: 'btn ghost', type: 'button', onclick: () => set([[2 * U[0][0], 2 * U[0][1]], ...U.slice(1)]) }, 'Double 𝒳'),
    slots === 2 && h('button', { class: 'btn ghost', type: 'button', onclick: () => set(U.map(v => [2 * v[0], 2 * v[1]])) }, 'Double both'),
    presets.map(p => h('button', { class: 'btn ghost', type: 'button', onclick: () => set([p.u, p.v ?? U[1]].filter(Boolean)) }, p.label)));
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

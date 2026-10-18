// Interactive widgets, referenced from lesson YAML by name:
//   - type: widget
//     widget: basis-playground
//     config: { ... }

import { h } from './dom.js';
import { tex } from './render.js';

const WIDGETS = { 'basis-playground': basisPlayground };

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
const combo = (name, [a, b]) =>
  `${name} = ${fmt(a)}\\,\\hat{x}_1 ${b < 0 ? '-' : '+'} ${fmt(Math.abs(b))}\\,\\hat{x}_2`;

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
//   basis:    [[1,0],[0,1]]   initial ŷ1, ŷ2 in the old basis
//   snap:     0.5             grid the handles snap to (0 = free)
//   presets:  [{label, basis}]
// ---------------------------------------------------------------------------
function basisPlayground(el, cfg) {
  const X = cfg.vector ?? [3, 2];
  const C = cfg.covector ?? null;
  const start = (cfg.basis ?? [[1, 0], [0, 1]]).map(v => [...v]);
  const snap = cfg.snap ?? 0.5;
  const presets = cfg.presets ?? [];
  let B = start.map(v => [...v]);

  const view = { x: -2.5, y: -2.5, w: 8, h: 7 };   // math coordinates
  const P = (x, y) => [x, -y];                      // math -> svg (flip y)

  const svg = s('svg', { viewBox: `${view.x} ${-(view.y + view.h)} ${view.w} ${view.h}`, role: 'img',
    'aria-label': 'Drag the tips of the basis vectors' });
  const layers = ['grid', 'lattice', 'levels', 'parts', 'vec', 'basis', 'labels', 'handles'].reduce((o, k) => {
    o[k] = s('g'); svg.append(o[k]); return o;
  }, {});

  // static grid of the old basis
  for (let k = Math.ceil(view.x); k <= view.x + view.w; k++)
    layers.grid.append(line([k, view.y], [k, view.y + view.h], k === 0 ? 'w-axis' : 'w-grid'));
  for (let k = Math.ceil(view.y); k <= view.y + view.h; k++)
    layers.grid.append(line([view.x, k], [view.x + view.w, k], k === 0 ? 'w-axis' : 'w-grid'));

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

  const handles = B.map((_, k) => {
    const c = s('circle', { r: 0.22, class: 'w-handle', tabindex: 0, 'aria-label': `tip of basis vector ${k + 1}` });
    layers.handles.append(c);
    drag(c, k);
    return c;
  });

  function drag(c, k) {
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
        B[k] = v;
        draw();
      };
      const up = () => { c.removeEventListener('pointermove', move); c.removeEventListener('pointerup', up); c.removeEventListener('pointercancel', up); };
      c.addEventListener('pointermove', move);
      c.addEventListener('pointerup', up);
      c.addEventListener('pointercancel', up);
    });
  }

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

    // lattice of the new basis
    if (ok && Math.abs(det) > 0.05) {
      for (let k = -10; k <= 10; k++) {
        layers.lattice.append(line([k * b1[0] - 30 * b2[0], k * b1[1] - 30 * b2[1]], [k * b1[0] + 30 * b2[0], k * b1[1] + 30 * b2[1]], 'w-lattice'));
        layers.lattice.append(line([k * b2[0] - 30 * b1[0], k * b2[1] - 30 * b1[1]], [k * b2[0] + 30 * b1[0], k * b2[1] + 30 * b1[1]], 'w-lattice'));
      }
    }
    // covector level lines  C(p) = n
    if (C) {
      const n2 = C[0] ** 2 + C[1] ** 2, L = Math.sqrt(n2), d = [-C[1] / L, C[0] / L];
      for (let n = -15; n <= 15; n++) {
        const p0 = [n * C[0] / n2, n * C[1] / n2];
        layers.levels.append(line([p0[0] - 30 * d[0], p0[1] - 30 * d[1]], [p0[0] + 30 * d[0], p0[1] + 30 * d[1]], 'w-level'));
      }
    }
    // decomposition X = y1 ŷ1 + y2 ŷ2
    if (ok && Math.abs(y1) < 40 && Math.abs(y2) < 40) {
      const mid = [y1 * b1[0], y1 * b1[1]];
      layers.parts.append(arrow([0, 0], mid, 'w-part'), arrow(mid, X, 'w-part'));
    }
    layers.vec.append(arrow([0, 0], X, 'w-vec'));
    layers.labels.append(label([X[0] + 0.3, X[1] + 0.3], '𝒳'));
    B.forEach((b, k) => {
      layers.basis.append(arrow([0, 0], b, 'w-basis'));
      const L = Math.hypot(...b);
      layers.labels.append(label([b[0] + 0.42 * b[0] / L - 0.25 * b[1] / L, b[1] + 0.42 * b[1] / L + 0.25 * b[0] / L], k ? 'ŷ₂' : 'ŷ₁', 'basis'));
      const [cx, cy] = P(...b);
      handles[k].setAttribute('cx', cx);
      handles[k].setAttribute('cy', cy);
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
      if (C) {
        const c1 = C[0] * b1[0] + C[1] * b1[1], c2 = C[0] * b2[0] + C[1] * b2[1];
        rows.push(
          h('div', { class: 'c-covec', html: tex(`\\mathsf{y}_1 = \\mathsf{X}(\\hat{y}_1) = ${fmt(c1)}`) }),
          h('div', { class: 'c-covec', html: tex(`\\mathsf{y}_2 = \\mathsf{X}(\\hat{y}_2) = ${fmt(c2)}`) }),
          h('div', { class: 'wide', html: tex(`\\textstyle\\sum_i \\mathsf{y}_i\\, y^i = ${fmt(c1 * y1 + c2 * y2)}`) }));
      }
    }
    readout.replaceChildren(...rows);
  }
  draw();
}

// Card renderers. Each returns a controller the player drives:
//
//   info cards:     { kind: 'info' }
//   question cards: { kind: 'question',
//                     ready(),       -> can the "Check" button be pressed?
//                     onChange(fn),  -> call fn whenever ready() may change
//                     check(),       -> { correct, feedback }  (feedback: Markdown)
//                     retry(),       -> re-open input after a wrong attempt
//                     reveal(),      -> show the right answer in place
//                     select?(k) }   -> keyboard shortcut for option k
//
// The player locks input between check() and retry()/reveal().

import { h, shuffle } from './dom.js';
import { md, mdInline, tex } from './render.js';
import { mountWidget } from './widgets.js';

export function renderCard(card, el) {
  const render = RENDERERS[card.type];
  if (!render) throw new Error(`Unknown card type "${card.type}"`);
  return render(card, el);
}

const RENDERERS = { text, widget, mcq, numeric, build, order };

function header(card, el) {
  if (card.title) el.append(h('div', { class: 'prose' }, h('h2', { html: mdInline(card.title) })));
}

function emitter() {
  const fns = [];
  return { on: fn => fns.push(fn), fire: () => fns.forEach(fn => fn()) };
}

// ---------- text ----------
function text(card, el) {
  header(card, el);
  el.append(h('div', { class: 'prose', html: md(card.body) }));
  return { kind: 'info' };
}

// ---------- widget ----------
function widget(card, el) {
  header(card, el);
  if (card.body) el.append(h('div', { class: 'prose', html: md(card.body) }));
  const box = h('div', { class: 'widget' });
  el.append(box);
  mountWidget(card.widget, box, card.config ?? {});
  return { kind: 'info' };
}

// ---------- mcq ----------
function mcq(card, el) {
  header(card, el);
  el.append(h('div', { class: 'prose', html: md(card.prompt) }));
  const multi = !!card.multiple;
  if (multi) el.append(h('div', { class: 'hint-line' }, 'Select all that apply.'));

  const base = card.options.map((o, i) => ({ ...o, i }));
  const opts = card.shuffle === false ? base : shuffle(base);
  const ev = emitter();
  let selected = new Set();
  let locked = false;

  const btns = opts.map((o, k) => h('button', {
    class: 'option', type: 'button',
    html: `<span class="key">${k + 1}</span><span class="opt-text">${mdInline(o.text)}</span>`,
    onclick: () => select(k),
  }));
  el.append(h('div', { class: 'options' }, btns));

  function select(k) {
    if (locked || !btns[k] || btns[k].disabled) return;
    if (multi) selected.has(k) ? selected.delete(k) : selected.add(k);
    else selected = new Set([k]);
    btns.forEach((b, j) => b.classList.toggle('selected', selected.has(j)));
    ev.fire();
  }

  return {
    kind: 'question', select,
    ready: () => selected.size > 0,
    onChange: ev.on,
    check() {
      locked = true;
      btns.forEach(b => b.classList.remove('selected'));
      if (!multi) {
        const k = [...selected][0];
        const o = opts[k];
        btns[k].classList.add(o.correct ? 'correct' : 'wrong');
        return { correct: !!o.correct, feedback: o.feedback ?? '' };
      }
      const wrongPicks = [...selected].filter(k => !opts[k].correct);
      const missed = opts.filter((o, k) => o.correct && !selected.has(k));
      selected.forEach(k => btns[k].classList.add(opts[k].correct ? 'correct' : 'wrong'));
      const correct = wrongPicks.length === 0 && missed.length === 0;
      const notes = wrongPicks.map(k => opts[k].feedback).filter(Boolean);
      if (!correct && missed.length && !notes.length) notes.push('You missed at least one correct option.');
      return { correct, feedback: correct ? opts.filter(o => o.correct && o.feedback).map(o => o.feedback).join('\n\n') : notes.join('\n\n') };
    },
    retry() {
      btns.forEach((b, k) => {
        if (b.classList.contains('wrong') && !multi) { b.disabled = true; b.classList.add('struck'); }
        b.classList.remove('wrong', 'correct');
      });
      selected = new Set();
      locked = false;
      ev.fire();
    },
    reveal() {
      locked = true;
      btns.forEach((b, k) => {
        b.classList.remove('selected', 'struck', 'wrong');
        b.disabled = true;
        if (opts[k].correct) b.classList.add('correct');
      });
    },
  };
}

// ---------- numeric ----------
export function parseNumber(s) {
  const t = String(s).trim().replace(/\s+/g, '').replace(',', '.').replace(/^\+/, '').replace(/−/g, '-');
  if (!t) return null;
  const frac = t.match(/^(-?\d*\.?\d+)\/(-?\d*\.?\d+)$/);
  if (frac) return Number(frac[2]) === 0 ? null : Number(frac[1]) / Number(frac[2]);
  const n = Number(t);
  return Number.isFinite(n) ? n : null;
}

function numeric(card, el) {
  header(card, el);
  el.append(h('div', { class: 'prose', html: md(card.prompt) }));
  const ev = emitter();
  const input = h('input', {
    type: 'text', inputmode: 'decimal', autocomplete: 'off', spellcheck: 'false',
    placeholder: card.placeholder ?? 'Your answer', 'aria-label': 'Your answer',
  });
  input.addEventListener('input', () => { input.classList.remove('wrong'); ev.fire(); });
  const row = h('div', { class: 'numeric-row' },
    card.label ? h('span', { html: mdInline(card.label) }) : null,
    input,
    card.unit ? h('span', { html: mdInline(card.unit) }) : null);
  el.append(row, h('div', { class: 'hint-line' }, 'Fractions like 1/2 are fine.'));
  setTimeout(() => input.focus({ preventScroll: true }), 50);

  const tol = card.tolerance ?? 1e-6 * Math.max(1, Math.abs(card.answer));
  const near = (a, b) => Math.abs(a - b) <= tol;

  return {
    kind: 'question',
    ready: () => parseNumber(input.value) !== null,
    onChange: ev.on,
    check() {
      const v = parseNumber(input.value);
      input.disabled = true;
      const correct = near(v, card.answer);
      input.classList.add(correct ? 'correct' : 'wrong');
      const match = (card.wrong ?? []).find(w => near(v, w.value));
      return { correct, feedback: correct ? '' : match?.feedback ?? card.hint ?? '' };
    },
    retry() { input.disabled = false; input.select(); ev.fire(); },
    reveal() {
      input.disabled = true;
      input.classList.remove('wrong');
      input.classList.add('correct');
      input.value = card.answerText ?? String(card.answer);
    },
  };
}

// ---------- build (tap tiles to assemble an expression) ----------
const norm = s => String(s).replace(/\s+/g, '');
const sameSeq = (a, b) => a.length === b.length && a.every((x, i) => norm(x) === norm(b[i]));

function build(card, el) {
  header(card, el);
  el.append(h('div', { class: 'prose', html: md(card.prompt) }));
  const ev = emitter();
  const order = card.shuffle === false ? card.tiles.map((_, i) => i) : shuffle(card.tiles.map((_, i) => i));
  let seq = [];
  let locked = false;

  const line = h('div', { class: 'build-line', 'aria-label': 'Your expression' });
  const bank = h('div', { class: 'tile-bank' });
  const bankBtns = new Map();
  for (const i of order) {
    const b = h('button', { class: 'tile', type: 'button', html: tex(card.tiles[i]), onclick: () => add(i) });
    bankBtns.set(i, b);
    bank.append(b);
  }
  const tools = h('div', { class: 'build-tools' },
    h('button', { class: 'btn ghost', type: 'button', onclick: () => { if (!locked) { seq.pop(); paint(); } } }, '⌫ Undo'),
    h('button', { class: 'btn ghost', type: 'button', onclick: () => { if (!locked) { seq = []; paint(); } } }, 'Clear'));
  el.append(line, bank, tools, h('div', { class: 'hint-line' }, 'Tap tiles to build the expression; tap a placed tile to remove it.'));

  function add(i) { if (locked || seq.includes(i)) return; seq.push(i); paint(); }
  function remove(pos) { if (locked) return; seq.splice(pos, 1); paint(); }

  function paint() {
    line.replaceChildren();
    if (card.prefix) line.append(h('span', { class: 'prefix', html: tex(card.prefix) }));
    seq.forEach((i, pos) => line.append(h('button', {
      class: 'tile placed', type: 'button', html: tex(card.tiles[i]), onclick: () => remove(pos),
    })));
    if (!seq.length) line.append(h('span', { class: 'placeholder' }, 'tap tiles below…'));
    if (card.suffix) line.append(h('span', { class: 'prefix', html: tex(card.suffix) }));
    bankBtns.forEach((b, i) => b.classList.toggle('used', seq.includes(i)));
    ev.fire();
  }
  paint();

  const current = () => seq.map(i => card.tiles[i]);

  return {
    kind: 'question',
    ready: () => seq.length > 0,
    onChange: ev.on,
    check() {
      locked = true;
      const got = current();
      const correct = card.answers.some(a => sameSeq(a, got));
      line.classList.add(correct ? 'correct' : 'wrong');
      const match = (card.wrong ?? []).find(w => sameSeq(w.answer, got));
      return { correct, feedback: correct ? '' : match?.feedback ?? card.hint ?? '' };
    },
    retry() { locked = false; line.classList.remove('wrong'); },
    reveal() {
      const used = new Set();
      seq = card.answers[0].map(t => {
        const i = card.tiles.findIndex((x, j) => !used.has(j) && norm(x) === norm(t));
        used.add(i);
        return i;
      });
      locked = false; paint(); locked = true;
      line.classList.remove('wrong');
      line.classList.add('correct');
    },
  };
}

// ---------- order (tap steps into the right sequence) ----------
function order(card, el) {
  header(card, el);
  el.append(h('div', { class: 'prose', html: md(card.prompt) }));
  const ev = emitter();
  const n = card.steps.length;
  let pool = shuffle(card.steps.map((_, i) => i));
  while (n > 1 && pool.every((v, i) => v === i)) pool = shuffle(pool);
  let chosen = [];
  let locked = false;

  const chosenBox = h('div', { class: 'order-list' });
  const poolBox = h('div', { class: 'order-list pool' });
  el.append(h('div', { class: 'order-cols' },
    h('div', {}, h('div', { class: 'order-label' }, card.chosenLabel ?? 'Your order'), chosenBox),
    h('div', {}, h('div', { class: 'order-label' }, 'Tap to place next'), poolBox)));

  const stepBtn = (i, num, onclick) => h('button', { class: 'step', type: 'button', onclick },
    num ? h('span', { class: 'num' }, num) : null,
    h('span', { html: mdInline(card.steps[i]) }));

  function paint(marks = {}) {
    chosenBox.replaceChildren(...chosen.map((i, pos) => {
      const b = stepBtn(i, pos + 1, () => { if (!locked) { chosen.splice(pos, 1); pool.push(i); paint(); } });
      if (marks[pos]) b.classList.add(marks[pos]);
      b.disabled = locked;
      return b;
    }));
    if (!chosen.length) chosenBox.append(h('div', { class: 'hint-line' }, 'Empty — tap steps below in order.'));
    poolBox.replaceChildren(...pool.map((i, pos) => {
      const b = stepBtn(i, null, () => { if (!locked) { pool.splice(pos, 1); chosen.push(i); paint(); } });
      b.disabled = locked;
      return b;
    }));
    ev.fire();
  }
  paint();

  let firstWrong = -1;
  return {
    kind: 'question',
    ready: () => chosen.length === n,
    onChange: ev.on,
    check() {
      locked = true;
      firstWrong = chosen.findIndex((v, i) => v !== i);
      const marks = {};
      chosen.forEach((v, i) => { marks[i] = v === i ? 'correct' : 'wrong'; });
      paint(marks);
      const correct = firstWrong === -1;
      return { correct, feedback: correct ? '' : `Step ${firstWrong + 1} is out of place.${card.hint ? '\n\n' + card.hint : ''}` };
    },
    retry() {
      // Keep the correct prefix, send the rest back to the pool.
      locked = false;
      pool = shuffle([...pool, ...chosen.slice(firstWrong)]);
      chosen = chosen.slice(0, firstWrong);
      paint();
    },
    reveal() {
      locked = true;
      chosen = card.steps.map((_, i) => i);
      pool = [];
      paint(Object.fromEntries(chosen.map(i => [i, 'correct'])));
    },
  };
}

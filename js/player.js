// Plays a sequence of cards (a lesson, or a review session).
//
// items: [{ card, key }]  — key = "<lessonId>/<cardId>" for question cards
// mode:  'lesson' | 'review'

import { h } from './dom.js';
import { md } from './render.js';
import { icons } from './icons.js';
import { renderCard } from './cards.js';
import { isQuestion } from './content.js';
import { progress } from './progress.js';

export function runSession(root, { items, mode, startAt = 0, onFinish, onExit }) {
  const stats = { questions: 0, firstTry: 0 };
  const requeued = new Set();
  let i = startAt;
  let footButtons = [];

  const fill = h('div');
  const counter = h('span', { class: 'hint-line', style: 'margin:0;min-width:44px;text-align:right' });
  const stage = h('div', { class: 'stage' });
  const main = h('main', { class: 'player-main' }, stage);
  const foot = h('div', { class: 'foot-inner' });
  const closeBtn = h('button', { class: 'icon-btn', type: 'button', 'aria-label': 'Exit', html: icons.close, onclick: exit });

  root.replaceChildren(h('div', { class: 'player' },
    h('header', { class: 'player-top' }, closeBtn, h('div', { class: 'bar' }, fill), counter),
    main,
    h('footer', { class: 'player-foot' }, foot)));

  let controller = null;
  function onKey(e) {
    if (e.key === 'Escape') return exit();
    if (e.key === 'Enter' && !e.shiftKey) {
      const primary = footButtons.find(b => b.classList.contains('primary') || b.classList.contains('good'));
      if (primary && !primary.disabled) { e.preventDefault(); primary.click(); }
      return;
    }
    if (/^[1-9]$/.test(e.key) && controller?.select && document.activeElement?.tagName !== 'INPUT') controller.select(+e.key - 1);
  }
  document.addEventListener('keydown', onKey);
  const cleanup = () => document.removeEventListener('keydown', onKey);

  function exit() {
    if (i > 0 && i < items.length && !confirm('Leave now? Progress inside this session is not saved.')) return;
    cleanup();
    onExit();
  }

  function setFoot(buttons) {
    footButtons = buttons;
    foot.replaceChildren(...buttons);
  }
  const btn = (label, cls, onclick, disabled = false) =>
    h('button', { class: `btn ${cls}`, type: 'button', onclick, disabled }, label);

  function feedbackBox(kind, head, body) {
    const box = h('div', { class: `feedback ${kind}` },
      h('div', { class: 'fb-head', html: (kind === 'good' ? icons.check : kind === 'bad' ? icons.cross : '') + `<span>${head}</span>` }),
      body ? h('div', { class: 'prose', html: md(body) }) : null);
    return box;
  }
  function showFeedback(box) {
    stage.querySelector('.feedback')?.remove();
    stage.append(box);
    requestAnimationFrame(() => box.scrollIntoView({ behavior: 'smooth', block: 'nearest' }));
  }

  function record(item, firstTry) {
    stats.questions++;
    if (firstTry) stats.firstTry++;
    if (!item.key) return;
    if (mode === 'review') {
      progress.recordReview(item.key, firstTry);
      if (!firstTry && !requeued.has(item.key)) { requeued.add(item.key); items.push(item); }
    } else {
      progress.recordLessonCard(item.key, firstTry);
    }
  }

  function next() {
    i++;
    if (i >= items.length) { cleanup(); onFinish(stats); return; }
    show();
  }

  function show() {
    const item = items[i];
    fill.style.width = `${(i / items.length) * 100}%`;
    counter.textContent = `${i + 1}/${items.length}`;
    stage.replaceChildren();
    stage.classList.remove('stage'); void stage.offsetWidth; stage.classList.add('stage');
    window.scrollTo({ top: 0 });

    if (item.card.tag) stage.append(h('div', { class: 'card-tag' }, item.card.tag));
    controller = renderCard(item.card, stage);
    const last = i === items.length - 1;

    if (controller.kind === 'info') {
      setFoot([btn(last ? 'Finish' : 'Continue', 'primary', next)]);
      return;
    }

    const ctl = controller;
    let attempts = 0;
    const explanation = item.card.explanation;
    const continueBtn = () => btn(last ? 'Finish' : 'Continue', 'primary', next);

    function askCheck() {
      const check = btn('Check', 'primary', doCheck, !ctl.ready());
      setFoot([check]);
      ctl.onChange(() => { check.disabled = !ctl.ready(); });
    }

    function doCheck() {
      attempts++;
      const r = ctl.check();
      if (r.correct) {
        if (attempts === 1) record(item, true);
        const body = [r.feedback, explanation].filter(Boolean).join('\n\n');
        showFeedback(feedbackBox('good', attempts === 1 ? pick(PRAISE) : 'Got it', body));
        setFoot([continueBtn()]);
      } else {
        if (attempts === 1) record(item, false);
        showFeedback(feedbackBox('bad', 'Not quite', r.feedback));
        setFoot([
          btn('Show answer', 'ghost', () => {
            ctl.reveal();
            showFeedback(feedbackBox('neutral', 'Answer', explanation ?? ''));
            setFoot([continueBtn()]);
          }),
          btn('Try again', 'primary', () => {
            stage.querySelector('.feedback')?.remove();
            ctl.retry();
            askCheck();
          }),
        ]);
      }
    }
    askCheck();
  }

  show();
}

const PRAISE = ['Correct!', 'Exactly.', 'Nice.', 'Yes!', 'Spot on.'];
const pick = a => a[Math.floor(Math.random() * a.length)];

export function lessonItems(lessonId, data) {
  return data.cards.map(card => ({ card, key: isQuestion(card) && card.review !== false ? `${lessonId}/${card.id}` : null }));
}

// Router.
//   #/                      trail map
//   #/lesson/<id>           play a lesson
//   #/lesson/<id>/<n>       jump to card n (1-based) — handy while authoring
//   #/review                spaced-repetition session
//   #/settings              progress export/import/reset

import { h, shuffle, escapeHtml } from './dom.js';
import { icons } from './icons.js';
import { getLesson, nextLessonAfter, isQuestion } from './content.js';
import { progress } from './progress.js';
import { renderTrail } from './trail.js';
import { runSession, lessonItems } from './player.js';

const root = document.getElementById('app');
const REVIEW_SIZE = 12;

async function route() {
  document.querySelectorAll('.scrim').forEach(s => s.remove());
  const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  try {
    if (parts[0] === 'lesson' && parts[1]) return await playLesson(decodeURIComponent(parts[1]), +(parts[2] ?? 1) - 1);
    if (parts[0] === 'review') return await playReview();
    if (parts[0] === 'settings') return settings();
    await renderTrail(root);
  } catch (err) {
    console.error(err);
    root.replaceChildren(h('div', { class: 'page' },
      h('div', { class: 'error-box' }, h('b', {}, 'Something went wrong. '), err.message),
      h('p', {}, h('a', { href: '#/' }, '← Back to the trail'))));
  }
}

async function playLesson(id, startAt) {
  const { meta, data } = await getLesson(id);
  if (!data) { location.hash = '#/'; return; }
  runSession(root, {
    items: lessonItems(id, data),
    mode: 'lesson',
    startAt: Math.max(0, Math.min(startAt || 0, data.cards.length - 1)),
    onExit: () => { location.hash = '#/'; },
    onFinish: async stats => {
      progress.completeLesson(id, stats);
      const next = await nextLessonAfter(id);
      doneScreen({
        title: 'Lesson complete',
        subtitle: meta.title,
        stats,
        actions: [
          next ? ['primary', `Next: ${next.meta.title}`, `#/lesson/${next.meta.id}`] : null,
          ['ghost', 'Back to the trail', '#/'],
        ],
      });
    },
  });
}

async function playReview() {
  const keys = shuffle(progress.dueKeys()).slice(0, REVIEW_SIZE);
  if (!keys.length) {
    root.replaceChildren(h('div', { class: 'page done-screen' },
      h('div', { class: 'burst', html: icons.check }),
      h('h1', {}, 'Nothing due'),
      h('p', { class: 'hint-line' }, 'Questions you answer in lessons come back here on a spaced schedule — missed ones the same day, the rest after 1, 3, 7, 16 and 35 days.'),
      h('div', { class: 'actions' }, h('a', { class: 'btn primary', href: '#/', style: 'text-decoration:none' }, 'Back to the trail'))));
    return;
  }
  const items = [];
  for (const key of keys) {
    const [lessonId, cardId] = key.split('/');
    try {
      const { meta, data } = await getLesson(lessonId);
      const card = data?.cards.find(c => c.id === cardId);
      if (card && isQuestion(card)) items.push({ card: { ...card, tag: meta.title }, key });
    } catch { /* lesson renamed or removed: skip */ }
  }
  runSession(root, {
    items, mode: 'review',
    onExit: () => { location.hash = '#/'; },
    onFinish: stats => {
      progress.finishReview();
      doneScreen({ title: 'Review done', subtitle: 'Spaced repetition keeps it in long-term memory.', stats, actions: [['primary', 'Back to the trail', '#/']] });
    },
  });
}

function doneScreen({ title, subtitle, stats, actions }) {
  const pct = stats.questions ? Math.round((stats.firstTry / stats.questions) * 100) : 100;
  root.replaceChildren(h('div', { class: 'page done-screen' },
    h('div', { class: 'burst', html: icons.check }),
    h('h1', {}, title),
    h('p', { class: 'hint-line', html: escapeHtml(subtitle) }),
    h('div', { class: 'stats' },
      h('div', { class: 'stat' }, h('b', {}, `${pct}%`), h('span', {}, 'first-try accuracy')),
      h('div', { class: 'stat' }, h('b', {}, `${progress.streak()}`), h('span', {}, 'day streak'))),
    h('div', { class: 'actions' }, actions.filter(Boolean).map(([cls, label, href]) =>
      h('a', { class: `btn ${cls}`, href, style: 'text-decoration:none' }, label)))));
}

function settings() {
  const code = h('textarea', { readonly: true, 'aria-label': 'Your progress code' });
  code.value = progress.exportCode();
  const paste = h('textarea', { placeholder: 'Paste a progress code here', 'aria-label': 'Progress code to import' });
  const msg = h('p', { style: 'margin-top:8px' });

  root.replaceChildren(h('div', { class: 'page' },
    h('header', { class: 'topbar' },
      h('a', { class: 'icon-btn', href: '#/', 'aria-label': 'Back', html: icons.back }),
      h('div', { class: 'brand' }, 'Progress & settings')),
    h('div', { class: 'panel' },
      h('h3', {}, 'Move progress to another device'),
      h('p', {}, 'Progress is saved in this browser. To continue on your phone (or laptop), copy this code here and import it there.'),
      code,
      h('div', { class: 'row' }, h('button', {
        class: 'btn primary', type: 'button',
        onclick: async e => {
          try { await navigator.clipboard.writeText(code.value); e.target.textContent = 'Copied!'; }
          catch { code.select(); }
        },
      }, 'Copy code'))),
    h('div', { class: 'panel' },
      h('h3', {}, 'Import progress'),
      h('p', {}, 'This replaces the progress stored in this browser.'),
      paste,
      h('div', { class: 'row' }, h('button', {
        class: 'btn primary', type: 'button',
        onclick: () => {
          try { progress.importCode(paste.value); msg.textContent = 'Imported.'; code.value = progress.exportCode(); }
          catch (err) { msg.textContent = `Could not import: ${err.message}`; }
        },
      }, 'Import')),
      msg),
    h('div', { class: 'panel' },
      h('h3', {}, 'Start over'),
      h('p', {}, 'Erase all progress and the review deck in this browser.'),
      h('button', {
        class: 'btn ghost', type: 'button',
        onclick: () => { if (confirm('Erase all progress in this browser?')) { progress.reset(); location.hash = '#/'; } },
      }, 'Reset progress'))));
}

window.addEventListener('hashchange', route);
route();

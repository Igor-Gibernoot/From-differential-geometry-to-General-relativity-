// Router.
//   #/                      trail map
//   #/lesson/<id>           play a lesson
//   #/lesson/<id>/<n>       jump to card n (1-based) — handy while authoring
//   #/review                spaced-repetition session (due cards, all levels)
//   #/review/<levelId>      level review (that level's cards, most urgent first)
//   #/settings              progress export/import/reset

import { h, shuffle, escapeHtml } from './dom.js';
import { icons } from './icons.js';
import { getCourse, getLesson, nextLessonAfter, isQuestion } from './content.js';
import { progress } from './progress.js';
import { renderTrail } from './trail.js';
import { runSession, lessonItems } from './player.js';
import { sounds, soundOn, setSound } from './sound.js';
import { initTheme, themeButton } from './theme.js';
import { initTooltips } from './tooltip.js';
import { cloudConfigured, initCloud, onCloudChange, signIn, signOutUser } from './cloud.js';

initTheme();
initTooltips();
initCloud();

const root = document.getElementById('app');
const REVIEW_SIZE = 12;

async function route() {
  document.querySelectorAll('.scrim').forEach(s => s.remove());
  const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  try {
    if (parts[0] === 'lesson' && parts[1]) return await playLesson(decodeURIComponent(parts[1]), +(parts[2] ?? 1) - 1);
    if (parts[0] === 'review') return await playReview(parts[1]);
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

async function playReview(levelId) {
  let keys, level;
  if (levelId) {
    level = (await getCourse()).levels.find(l => l.id === levelId);
    if (!level) { location.hash = '#/'; return; }
    keys = shuffle(progress.deckKeys((level.lessons ?? []).map(m => m.id)).slice(0, REVIEW_SIZE));
  } else {
    keys = shuffle(progress.dueKeys()).slice(0, REVIEW_SIZE);
  }
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
      doneScreen({
        title: level ? `${level.title}: review done` : 'Review done',
        subtitle: 'Spaced repetition keeps it in long-term memory.',
        stats, mode: 'review', actions: [['primary', 'Back to the trail', '#/']],
      });
    },
  });
}

function doneScreen({ title, subtitle, stats, actions, mode = 'lesson' }) {
  const pct = stats.questions ? Math.round((stats.firstTry / stats.questions) * 100) : 100;
  sounds.finish();
  root.replaceChildren(h('div', { class: 'page done-screen' },
    h('div', { class: 'burst', html: icons.check }),
    h('h1', {}, title),
    h('p', { class: 'hint-line', html: escapeHtml(subtitle) }),
    h('div', { class: 'stats' },
      h('div', { class: 'stat' }, h('b', {}, `${pct}%`), h('span', {}, mode === 'lesson' ? 'first-try accuracy in this lesson' : 'first-try accuracy in this session')),
      h('div', { class: 'stat' }, h('b', {}, `${progress.streak()}`), h('span', {}, 'day streak'))),
    h('div', { class: 'actions' }, actions.filter(Boolean).map(([cls, label, href]) =>
      h('a', { class: `btn ${cls}`, href, style: 'text-decoration:none' }, label)))));
}

function accountPanel() {
  const body = h('div');
  const panel = h('div', { class: 'panel' }, h('h3', {}, 'Account & sync'), body);
  if (!cloudConfigured) {
    body.append(h('p', {}, 'Sign-in is not set up for this copy of the app yet, so progress stays in this browser (use the code below to move it).'));
    return panel;
  }
  const msg = h('p', { class: 'hint-line', style: 'margin:8px 0 0' });
  const off = onCloudChange(st => {
    if (!panel.isConnected && body.childNodes.length) return off();
    if (st.user) {
      body.replaceChildren(
        h('p', {}, `Signed in as ${st.user.name ?? st.user.email}${st.user.name ? ` (${st.user.email})` : ''}.`),
        h('p', { class: 'hint-line', style: 'margin:0 0 8px' },
          st.sync === 'syncing' ? 'Syncing…' : st.sync === 'error' ? `Sync problem: ${st.error}` : 'Progress is synced to your account on every change.'),
        h('div', { class: 'row' }, h('button', { class: 'btn ghost', type: 'button', onclick: () => signOutUser() }, 'Sign out')));
    } else {
      body.replaceChildren(
        h('p', {}, 'Sign in with Google to keep your progress in your account and share it between your phone and laptop. Progress already in this browser is merged in, never lost.'),
        h('div', { class: 'row' }, h('button', {
          class: 'btn primary', type: 'button',
          onclick: async () => { msg.textContent = ''; try { await signIn(); } catch (err) { msg.textContent = `Sign-in failed: ${err.message}`; } },
        }, 'Sign in with Google')),
        msg);
      if (st.error) msg.textContent = st.error;
    }
  });
  return panel;
}

function settings() {
  const code = h('textarea', { readonly: true, 'aria-label': 'Your progress code' });
  code.value = progress.exportCode();
  const paste = h('textarea', { placeholder: 'Paste a progress code here', 'aria-label': 'Progress code to import' });
  const msg = h('p', { style: 'margin-top:8px' });

  root.replaceChildren(h('div', { class: 'page' },
    h('header', { class: 'topbar' },
      h('a', { class: 'icon-btn', href: '#/', 'aria-label': 'Back', html: icons.back }),
      h('div', { class: 'brand' }, 'Progress & settings'),
      themeButton(h)),
    accountPanel(),
    h('div', { class: 'panel' },
      h('h3', {}, 'Move progress by code'),
      h('p', {}, 'Without an account, progress is saved only in this browser. To continue on another device, copy this code here and import it there.'),
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
      h('h3', {}, 'Sounds'),
      h('label', { class: 'toggle' },
        h('input', { type: 'checkbox', checked: soundOn(), onchange: e => setSound(e.target.checked) }),
        'Play a sound for right and wrong answers')),
    h('div', { class: 'panel' },
      h('h3', {}, 'Start over'),
      h('p', {}, 'Erase all progress and the review deck, here and in your account if signed in.'),
      h('button', {
        class: 'btn ghost', type: 'button',
        onclick: () => { if (confirm('Erase all progress in this browser (and in your account, if you are signed in)?')) { progress.reset(); location.hash = '#/'; } },
      }, 'Reset progress'))));
}

window.addEventListener('hashchange', route);
route();

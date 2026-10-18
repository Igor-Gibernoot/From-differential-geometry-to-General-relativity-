// The trail map: levels (chapters) with their lessons as a winding path.

import { h } from './dom.js';
import { mdInline } from './render.js';
import { icons, KIND_LABEL } from './icons.js';
import { getCourse } from './content.js';
import { progress } from './progress.js';

const OFFSETS = [0, 52, 78, 52, 0, -52, -78, -52];

export async function renderTrail(root) {
  const course = await getCourse();
  const due = progress.dueKeys().length;
  const streak = progress.streak();

  const top = h('header', { class: 'topbar' },
    h('div', { class: 'brand' }, course.short ?? course.title, h('small', {}, course.subtitle ?? '')),
    h('span', { class: 'chip streak', title: 'Days in a row', html: `${icons.flame}<span>${streak}</span>` }),
    h('button', {
      class: `chip review${due ? ' due' : ''}`, type: 'button', title: 'Spaced-repetition review',
      html: `${icons.review}<span>${due ? `Review ${due}` : 'Review'}</span>`, onclick: () => { location.hash = '#/review'; },
    }),
    h('button', { class: 'icon-btn', type: 'button', 'aria-label': 'Progress & settings', html: icons.settings, onclick: () => { location.hash = '#/settings'; } }));

  // The first built lesson not yet done gets the "start here" marker.
  const nextId = course.levels.flatMap(l => l.lessons ?? []).find(m => m.file && !progress.lesson(m.id)?.done)?.id;

  const levels = course.levels.map(level => {
    const lessons = level.lessons ?? [];
    const built = lessons.filter(m => m.file);
    const done = built.filter(m => progress.lesson(m.id)?.done).length;
    const unwritten = level.status === 'unwritten';

    const head = h('div', { class: 'level-head' },
      h('div', { class: 'eyebrow' }, `Level ${level.number}${unwritten ? ' · not in the book yet' : ''}`),
      h('h2', {}, level.title),
      level.blurb ? h('p', { html: mdInline(level.blurb) }) : null,
      lessons.length ? h('div', { class: 'meter', title: `${done}/${lessons.length} lessons done` },
        h('div', { style: `width:${lessons.length ? (done / lessons.length) * 100 : 0}%` })) : null);

    const path = h('div', { class: 'path' }, lessons.map((meta, k) => {
      const rec = progress.lesson(meta.id);
      const state = !meta.file ? 'planned' : rec?.done ? 'done' : 'available';
      const isNext = meta.id === nextId;
      const node = h('button', {
        class: `node ${state}${isNext ? ' next' : ''}`, type: 'button', 'aria-label': meta.title,
        html: state === 'done' ? icons.check : state === 'planned' ? icons.planned : icons[meta.kind] ?? icons.concept,
        onclick: () => openSheet(meta, state),
      });
      return h('div', { class: `node-wrap${isNext ? ' has-bubble' : ''}`, style: `transform: translateX(${OFFSETS[k % OFFSETS.length]}px)` },
        isNext ? h('div', { class: 'start-bubble' }, rec ? 'CONTINUE' : 'START') : null,
        node,
        h('div', { class: `node-label${state === 'planned' ? ' planned' : ''}`, html: mdInline(meta.title) }));
    }));

    return h('section', { class: `level${unwritten ? ' unwritten' : ''}`, id: level.id }, head, lessons.length ? path : null);
  });

  root.replaceChildren(h('div', { class: 'trail' }, top, levels));
  if (nextId) {
    const el = root.querySelector('.node.next');
    el?.scrollIntoView({ block: 'center' });
  }
}

function openSheet(meta, state) {
  const close = () => scrim.remove();
  const rec = progress.lesson(meta.id);
  const kind = KIND_LABEL[meta.kind] ?? 'Lesson';
  let body, actions;
  if (state === 'planned') {
    body = h('p', {}, 'Not built yet. Ask Claude to build this lesson from the book.');
    actions = [h('button', { class: 'btn ghost', type: 'button', onclick: close }, 'Close')];
  } else {
    body = h('p', { html: mdInline(meta.summary ?? '') + (rec ? `<br><b>Best first-try score: ${Math.round(rec.best * 100)}%</b>` : '') });
    actions = [
      h('button', { class: 'btn ghost', type: 'button', onclick: close }, 'Close'),
      h('button', { class: 'btn primary', type: 'button', onclick: () => { close(); location.hash = `#/lesson/${meta.id}`; } }, rec ? 'Replay' : 'Start'),
    ];
  }
  const scrim = h('div', { class: 'scrim', onclick: e => { if (e.target === scrim) close(); } },
    h('div', { class: 'sheet', role: 'dialog', 'aria-modal': 'true' },
      h('div', { class: 'kind' }, kind),
      h('h3', { html: mdInline(meta.title) }),
      body,
      h('div', { class: 'actions' }, actions)));
  document.body.append(scrim);
  scrim.querySelector('.btn.primary')?.focus();
}

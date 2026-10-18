// Progress lives in localStorage (per browser/device). Export/import codes
// move it between devices.
//
// Spaced repetition: every question card gets a Leitner box. Box b is due
// INTERVALS[b] days after it was last answered; a miss sends it back to box 0
// (due today), a correct review promotes it one box.

const KEY = 'dg2gr.progress.v1';
const INTERVALS = [0, 1, 3, 7, 16, 35];

const today = () => Math.floor((Date.now() - new Date().getTimezoneOffset() * 60000) / 86400000);
const blank = () => ({ version: 1, lessons: {}, cards: {}, streak: { count: 0, last: null } });

function load() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY));
    return s && s.lessons && s.cards ? s : blank();
  } catch { return blank(); }
}

let state = load();

function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* private mode: keep in memory */ }
}

function bumpStreak() {
  const d = today(), s = state.streak;
  if (s.last === d) return;
  s.count = s.last === d - 1 ? s.count + 1 : 1;
  s.last = d;
}

function schedule(key, box) {
  state.cards[key] = { box, due: today() + INTERVALS[box] };
}

export const progress = {
  lesson: id => state.lessons[id],

  completeLesson(id, { questions, firstTry }) {
    const prev = state.lessons[id];
    const score = questions ? firstTry / questions : 1;
    state.lessons[id] = {
      done: true,
      best: Math.max(score, prev?.best ?? 0),
      runs: (prev?.runs ?? 0) + 1,
      last: today(),
    };
    bumpStreak();
    save();
  },

  // A question answered inside a lesson enters the review deck.
  recordLessonCard(key, firstTry) {
    const c = state.cards[key];
    if (!c || !firstTry) schedule(key, firstTry ? 1 : 0);
    save();
  },

  recordReview(key, correct) {
    const box = correct ? Math.min((state.cards[key]?.box ?? 0) + 1, INTERVALS.length - 1) : 0;
    schedule(key, box);
    save();
  },

  finishReview() { bumpStreak(); save(); },

  dueKeys() {
    const d = today();
    return Object.entries(state.cards).filter(([, c]) => c.due <= d).map(([k]) => k);
  },

  streak() {
    const s = state.streak;
    return s.last != null && s.last >= today() - 1 ? s.count : 0;
  },

  exportCode: () => btoa(unescape(encodeURIComponent(JSON.stringify(state)))),

  importCode(code) {
    const s = JSON.parse(decodeURIComponent(escape(atob(code.trim()))));
    if (!s || !s.lessons || !s.cards) throw new Error('Not a progress code.');
    state = s;
    save();
  },

  reset() { state = blank(); save(); },
};

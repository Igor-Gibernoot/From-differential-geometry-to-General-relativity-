// Progress lives in localStorage (per browser/device). Export/import codes
// move it between devices.
//
// Spaced repetition: every question card gets a Leitner box. Box b is due
// INTERVALS[b] days after it was last answered; a miss sends it back to box 0
// (due today), a correct review promotes it one box.
//
// Recap items (the {{ }} blanks of "what you now own" summaries, keyed
// "<lessonId>#<hash>") share the same boxes: "knew it" promotes one box,
// "missed" sends the item back to box 0 and counts a lapse.

const KEY = 'dg2gr.progress.v1';
const INTERVALS = [0, 1, 3, 7, 16, 35];

const today = () => Math.floor((Date.now() - new Date().getTimezoneOffset() * 60000) / 86400000);
const blank = () => ({ version: 1, epoch: 0, lessons: {}, cards: {}, recap: {}, partial: {}, streak: { count: 0, last: null } });

function load() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY));
    return s && s.lessons && s.cards ? { recap: {}, partial: {}, ...s } : blank();
  } catch { return blank(); }
}

let state = load();

const listeners = new Set();

function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* private mode: keep in memory */ }
  listeners.forEach(fn => fn(state));
}

// Merge two progress states without losing anything either side learned:
// lessons keep the best score and run count (latest run wins `score`/`last`),
// cards keep whichever side answered them most recently, streak keeps the
// more recent day.
function merge(a, b) {
  // A reset (or import) starts a new epoch; the newer epoch replaces older data entirely.
  const ea = a.epoch ?? 0, eb = b.epoch ?? 0;
  if (ea !== eb) return structuredClone(ea > eb ? a : b);
  const out = blank();
  out.epoch = ea;
  for (const id of new Set([...Object.keys(a.lessons), ...Object.keys(b.lessons)])) {
    const x = a.lessons[id], y = b.lessons[id];
    if (!x || !y) { out.lessons[id] = x ?? y; continue; }
    const newer = (y.last ?? 0) > (x.last ?? 0) ? y : x;
    out.lessons[id] = { ...newer, done: x.done || y.done, best: Math.max(x.best ?? 0, y.best ?? 0), runs: Math.max(x.runs ?? 0, y.runs ?? 0), first: x.first ?? y.first };
  }
  for (const k of new Set([...Object.keys(a.cards), ...Object.keys(b.cards)])) {
    const x = a.cards[k], y = b.cards[k];
    out.cards[k] = !x ? y : !y ? x : (y.at ?? 0) > (x.at ?? 0) ? y : x;
  }
  for (const k of new Set([...Object.keys(a.recap ?? {}), ...Object.keys(b.recap ?? {})])) {
    const x = a.recap?.[k], y = b.recap?.[k];
    out.recap[k] = !x ? y : !y ? x : (y.at ?? 0) > (x.at ?? 0) ? y : x;
  }
  // Position inside an unfinished lesson: the most recent save wins (`at: null` = cleared).
  for (const k of new Set([...Object.keys(a.partial ?? {}), ...Object.keys(b.partial ?? {})])) {
    const x = a.partial?.[k], y = b.partial?.[k];
    out.partial[k] = !x ? y : !y ? x : (y.t ?? 0) > (x.t ?? 0) ? y : x;
  }
  const sa = a.streak, sb = b.streak;
  out.streak = (sb.last ?? -1) > (sa.last ?? -1) || ((sb.last ?? -1) === (sa.last ?? -1) && sb.count > sa.count) ? { ...sb } : { ...sa };
  return out;
}

function bumpStreak() {
  const d = today(), s = state.streak;
  if (s.last === d) return;
  s.count = s.last === d - 1 ? s.count + 1 : 1;
  s.last = d;
}

function schedule(key, box) {
  state.cards[key] = { box, due: today() + INTERVALS[box], at: Date.now() };
}

export const progress = {
  lesson: id => state.lessons[id],

  completeLesson(id, { questions, firstTry }) {
    const prev = state.lessons[id];
    const score = questions ? firstTry / questions : 1;
    state.lessons[id] = {
      done: true,
      score, // latest run
      first: prev ? (prev.first ?? prev.score ?? score) : score, // first run: what the trail accuracy uses
      best: Math.max(score, prev?.best ?? 0),
      runs: (prev?.runs ?? 0) + 1,
      last: today(),
    };
    state.partial[id] = { at: null, t: Date.now() };
    bumpStreak();
    save();
  },

  // Where the reader stopped in an unfinished lesson: { at: 0-based card, n: cards }, or undefined.
  partial: id => {
    const p = state.partial[id];
    return p && p.at > 0 ? p : undefined;
  },

  // `extra` ({ stats, combo, answered }) lets a resumed lesson show earlier answers and keep its score.
  savePartial(id, at, n, extra) {
    state.partial[id] = { at, n, ...extra, t: Date.now() };
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

  // Recap items: undefined until first rated.
  recapItem: key => state.recap[key],
  recapDue: key => !state.recap[key] || state.recap[key].due <= today(),

  recordRecap(key, knew) {
    const prev = state.recap[key];
    const box = knew ? Math.min((prev?.box ?? 0) + 1, INTERVALS.length - 1) : 0;
    state.recap[key] = { box, due: today() + INTERVALS[box], at: Date.now(), lapses: (prev?.lapses ?? 0) + (knew ? 0 : 1), last: knew ? 'knew' : 'missed' };
    save();
  },

  // Average first-try accuracy (first run; replays don't change it) over the finished lessons among ids.
  accuracy(ids) {
    const scores = ids.map(id => state.lessons[id]).filter(r => r?.done).map(r => r.first ?? r.score ?? r.best);
    return scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : null;
  },

  // Review-deck keys belonging to the given lessons, most urgent first:
  // due cards, then the weakest box, then the earliest due date.
  deckKeys(lessonIds) {
    const set = new Set(lessonIds);
    return Object.entries(state.cards)
      .filter(([k]) => set.has(k.split('/')[0]))
      .sort(([, a], [, b]) => (a.due <= today() ? 0 : 1) - (b.due <= today() ? 0 : 1) || a.box - b.box || a.due - b.due)
      .map(([k]) => k);
  },

  dueKeys() {
    const d = today();
    return Object.entries(state.cards).filter(([, c]) => c.due <= d).map(([k]) => k);
  },

  streak() {
    const s = state.streak;
    return s.last != null && s.last >= today() - 1 ? s.count : 0;
  },

  // Cloud sync hooks (see cloud.js).
  snapshot: () => state,
  onChange(fn) { listeners.add(fn); return () => listeners.delete(fn); },
  // Combine a remote state into the local one; returns the merged state.
  mergeRemote(remote) {
    if (!remote || !remote.lessons || !remote.cards) return state;
    state = merge(state, { streak: { count: 0, last: null }, partial: {}, ...remote });
    save();
    return state;
  },

  exportCode: () => btoa(unescape(encodeURIComponent(JSON.stringify(state)))),

  importCode(code) {
    const s = JSON.parse(decodeURIComponent(escape(atob(code.trim()))));
    if (!s || !s.lessons || !s.cards) throw new Error('Not a progress code.');
    state = { recap: {}, ...s, epoch: Date.now() };
    save();
  },

  reset() { state = { ...blank(), epoch: Date.now() }; save(); },
};

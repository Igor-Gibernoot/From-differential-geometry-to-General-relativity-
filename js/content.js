// Loads the YAML course map and lesson files from /content.

const cache = new Map();

function loadYaml(path) {
  if (!cache.has(path)) {
    cache.set(path, fetch(`content/${path}`, { cache: 'no-cache' })
      .then(r => { if (!r.ok) throw new Error(`content/${path}: HTTP ${r.status}`); return r.text(); })
      .then(t => jsyaml.load(t)));
  }
  return cache.get(path);
}

export const QUESTION_TYPES = ['mcq', 'numeric', 'build', 'order'];
export const isQuestion = card => QUESTION_TYPES.includes(card.type);

export const getCourse = () => loadYaml('course.yaml');

// Every lesson entry of the course, in trail order, with its level attached.
export async function allLessons() {
  const course = await getCourse();
  return course.levels.flatMap(level => (level.lessons ?? []).map(meta => ({ level, meta })));
}

export async function getLesson(id) {
  const entry = (await allLessons()).find(e => e.meta.id === id);
  if (!entry) throw new Error(`No lesson with id "${id}" in course.yaml.`);
  if (!entry.meta.file) return { ...entry, data: null };
  return { ...entry, data: await loadYaml(entry.meta.file) };
}

export async function nextLessonAfter(id) {
  const list = (await allLessons()).filter(e => e.meta.file);
  const i = list.findIndex(e => e.meta.id === id);
  return i >= 0 ? list[i + 1] ?? null : null;
}

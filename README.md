# From Differential Geometry to General Relativity: study trail

An interactive study app for the path from differential geometry to general
relativity. It is organized as a trail of levels (one per chapter), each made
of short lessons:

- **concept lessons** that start from a puzzle and build the idea from first principles,
- **guided problems** broken into small steps,
- **trap rounds** built on common misconceptions,
- and, at the end of each level, a **content-map puzzle**, a **level review** and a **challenge**.

Every answered question joins a spaced-repetition review deck. Progress is
stored in the browser and can be moved between devices with an export code.

**Play it:** https://igor-gibernoot.github.io/From-differential-geometry-to-General-relativity-/

Run locally:

```sh
python3 -m http.server 8000   # open http://localhost:8000
node tools/validate.mjs       # check all lesson files
```

Lesson authoring format: [`docs/LESSON_FORMAT.md`](docs/LESSON_FORMAT.md).

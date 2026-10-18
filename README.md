# From Differential Geometry to General Relativity: study trail

An interactive, Brilliant-style study app for the course *From Differential
Geometry to General Relativity* (USP). It is organized as a trail of levels
(one per chapter), each made of short lessons: concept lessons that start
from a problem, guided problems broken into steps, trap rounds built on
common misconceptions, and spaced-repetition review.

**Play it:** https://igor-gibernoot.github.io/From-differential-geometry-to-General-relativity-/

Run locally:

```sh
python3 -m http.server 8000   # open http://localhost:8000
node tools/validate.mjs       # check all lesson files
```

Lesson authoring format: [`docs/LESSON_FORMAT.md`](docs/LESSON_FORMAT.md).

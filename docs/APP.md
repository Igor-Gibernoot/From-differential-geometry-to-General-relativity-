# App engine

Static site, no build step, served by GitHub Pages from the repo root.

- `js/`: `cards.js` (card types), `widgets.js` (interactive SVG widgets,
  registry `WIDGETS` at the bottom), `player.js` (lesson flow and feedback),
  `trail.js`, `progress.js` (localStorage with export/import codes, Leitner
  spaced repetition), `main.js` (router), `render.js` (Markdown + KaTeX; short
  inline math keeps trailing punctuation on its line).
- `vendor/`: KaTeX, js-yaml, marked. No CDN, so the app works offline.
- Player: back button, progress bar, synthesized feedback sounds
  (`js/sound.js`, toggle in the player header and settings), varied
  encouraging messages and "N in a row" streaks.
- Trail: average first-try accuracy (overall chip and per level), level
  reviews (`#/review/<levelId>`), a hue per level (`data-hue` on `.level`,
  light/dark variants in `css/app.css`).
- Light/dark toggle (`js/theme.js`), instant tooltips via `data-tip`
  (`js/tooltip.js`), optional Google sign-in with Firestore sync
  (`js/cloud.js`, `docs/ACCOUNTS.md`; inactive until `js/firebase-config.js`
  is filled in).
- `tools/validate.mjs` (structure and KaTeX checks), `tools/shots.mjs`
  (headless screenshots and overflow check; see `docs/STATUS.md`, Tooling).

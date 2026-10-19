# Autonomous mode (agents, one unit each)

Read this only when Igor asks for several units in a row (e.g. "until the end
of Chapter 3"). The main session is then a **lean coordinator**: it builds
nothing and reads nothing itself (no lesson files, no book, no docs), so its
context stays small. Igor reviews the level on the live site at the end.

- For each unit, in `course.yaml` order and **strictly sequentially** (never
  in parallel), spawn one fresh agent (model: Opus) whose prompt is the
  ready-to-paste unit prompt plus: "You are running autonomously: follow
  CLAUDE.md 'Building sessions' exactly, one unit only; you cannot ask Igor
  questions, so make reasonable choices and record them in the Log entry.
  Do not view screenshot images unless shots.mjs flags a card or the unit
  uses a widget preset never used before. Run commands from the repo root
  without `cd … &&` prefixes. At the end, validate, run shots, update
  docs/STATUS.md, commit and push, then reply with a report of at most 15
  lines (what was built, checks output, conventions fixed, doubts) followed
  by the next unit's prompt."
- Between units the coordinator only reads that report: it checks that
  validate and shots were clean and the commit was pushed (`git log -1
  --oneline`), and passes the agent's next-unit prompt on, adding any
  doubt worth carrying forward. If a check failed, it sends the same agent
  back (SendMessage) rather than fixing things itself.
- Traps, map and challenge agents grep the chapter's earlier lesson files
  (titles, card ids, key prompts; not whole files) so they build on what
  was actually taught.
- **Stop at the end of each level** (after its challenge) and give Igor a
  summary of the units, any doubts, and the prompt to continue with the
  next level, so he can review the level on the live site first.

# AGENTS.md — Developer Guide (Kani_ISSR)

Working reference for this repository. **Keep it accurate** — a stale line here costs the next agent an hour.

- **Brand:** Kani_ISSR (rebranded from KaniMath / StudyIB in commit `399fd5b`)
- **Repo:** `kram1947/kaniib` · **Live:** https://studyib.vercel.app
- **Path:** `C:\Users\kram\Documents\kr_projects\mathapp` (Windows / PowerShell)

> `index.html` still carries the old `KaniMath` title. Change it when convenient; new copy should say Kani_ISSR.

---

## 1. Content standards (read before authoring anything)

Study material and assessments must meet the standard set out in
`.opencode/skills/ib-myp-assessment/SKILL.md`. In short:

1. **High IB standard** — target grade 7–8 demand. Every mark defensible from the mark scheme alone. Realise the command term (`state` ≠ `explain` ≠ `justify` ≠ `evaluate`). Ramp difficulty within a paper. No recall-only trivia.
2. **Competitive-exam alignment** — mirror IB MYP Sciences Paper 1 / Paper 2 structure and command terms; use IB Science Olympiad / IChO-style data-interrogation and critique problems for extension. **Never fabricate a citation, paper number, or statistic.** Give a source for any figure, or label it an estimate, or omit it.
3. **Make the difference clear** — for every easily-confused pair, study material gets an explicit contrast table or "Do not confuse" callout explaining *why* students confuse them; assessments get **diagnostic distractors**, where each wrong option maps to a named misconception, and at least one question per paper that forces a choice between the two ideas.

Enforcement is executable, not aspirational:

```bash
npm run validate     # blocking: syntax, schema, marks>=scheme, keywords>=marks,
                     #           answer-key bias >50%, duplicate ids, HTML balance
```

---

## 2. Stack

| Layer | Choice |
|---|---|
| UI | React 18 + Vite 5 |
| Routing | react-router-dom v6 (BrowserRouter) |
| Auth | **None.** No backend, no auth, no database — every route and every assessment is public |
| Styling | one hand-written `src/styles/global.css` (no Tailwind, no CSS modules) |
| Assessments | self-contained static HTML + vanilla JS, served as-is |
| PDF | jsPDF 2.5.1 via CDN, inside assessment files only |
| Deploy | Vercel, auto-deploy from `main` |
| Lint/typecheck | **none configured** — `npm run build` is the only automated check |

---

## 3. Structure (actual)

```
mathapp/
├── index.html                 # Vite entry (title still says "KaniMath")
├── package.json               # build + validate scripts
├── vite.config.js
├── vercel.json                # vite, output dist, exact-match SPA rewrites
├── scripts/
│   ├── copy-assets.mjs        # build: assessments/ -> dist/assessments/
│   └── validate-assessment.mjs# content quality gate
├── .opencode/skills/ib-myp-assessment/SKILL.md   # authoring standard
├── src/
│   ├── App.jsx                # routes (all public)
│   ├── main.jsx
│   ├── data/assessments.js    # topicsData + assessmentsData + comingSoonData
│   ├── data/quizData.js
│   ├── components/            # Navbar
│   ├── sections/              # Hero, Stats, TopicsBrowser, AssessmentGrid, Features, SiteFooter
│   ├── pages/                 # Home, Assessments, Topics, Features, Math, Quiz, Study, Sudoku, BioTech
│   └── styles/global.css
├── assessments/               # 19 static files
│   ├── m10-science-ess-a-study.html
│   ├── m10-science-ess-a-part1.html
│   ├── m10-science-ess-a-part2.html
│   ├── myp4-*.html            # 16 legacy files
│   └── content/               # original source notes (.docx/.txt)
└── dist/                      # build output — gitignored, but some artifacts are still tracked
```

**There are no** `src/hooks/`, `src/utils/`, `src/lib/`, `src/context/`, `src/components/ui/`, `src/components/layout/`, `src/styles/variables.css`, or `src/pages/assessments/`. `MIGRATION_GUIDE.md` describes these; it is wrong and is kept only as a historical record.

### Routes

`/`, `/assessments`, `/topics`, `/features` are **all public** — there is no auth. Note `Math`, `Quiz`, `Study`, `Sudoku`, `BioTech` pages exist but are **not routed**.

The old auth paths (`/login`, `/signup`, `/forgot-password`, `/reset-password`, `/auth/callback`) no longer exist as routes; `vercel.json` 302-redirects them to `/` so old bookmarks and any shared links still land somewhere useful.

---

## 4. Assessment inventory

16 registered · 330 questions · 1480 marks · 885 minutes. Authoritative source: `src/data/assessments.js`.

| id | subject | cat | title | Qs | time | marks | diff |
|----|---------|-----|-------|----|------|-------|------|
| 1 | math | myp4 | Sets, Venn & Probability | 16 | 45 | 70 | 3 |
| 2 | math | myp4 | Sets, Venn & Probability – Advanced | 50 | 90 | 400 | 5 |
| 3 | math | myp4 | Statistics & Data Analysis | 25 | 60 | 150 | 3 |
| 4 | math | myp4 | Set & Probability – Advanced (Part 3) | 25 | 90 | 175 | 5 |
| 5 | math | myp4 | Statistics & Data Analysis – Part 4 | 25 | 60 | 100 | 4 |
| 6 | ins | myp4 | History & Future of Money | 20 | 90 | 44 | 3 |
| 7 | ins | myp4 | Supply & Demand | 20 | 90 | 84 | 3 |
| 8 | math | myp4 | Comprehensive Math Review | 45 | 60 | 45 | 3 |
| 9 | math | myp4 | Trigonometry – Study Material | – | Self-paced | – | 0 |
| 10 | math | myp4 | Trigonometry Assessment | 25 | 60 | 100 | 3 |
| 11 | math | myp4 | Number Operations | 5 | 15 | 5 | 2 |
| 12 | math | myp4 | Algebra & Expressions | 7 | 20 | 7 | 3 |
| 13 | math | myp4 | Geometry & Measurement | 8 | 25 | 8 | 3 |
| 14 | science | m10 | ESS Unit A: Evolution & Origin of Life (study) | – | Self-paced | – | 0 |
| 15 | science | m10 | Evolution & Origin of Life — Part 1 | 30 | 90 | 138 | 4 |
| 16 | science | m10 | Evolution & Origin of Life — Part 2 | 29 | 90 | 154 | 5 |

**Levels.** `category` drives the Home page tabs, which are **`myp4` / `m10` / `dp`** (plus `all`). `subject` drives the `/assessments` filter tabs (`all` / `math` / `ins` / `science`).

- `myp4` — the 13 older papers (MYP4 maths and Individuals & Society), the original library.
- `m10` — the M10 Science ESS Unit A track: 1 study page + 2 timed papers, `badge: 'M10 Science'`.
- `dp` — placeholder only; nothing live yet.

**There is no `myp5` value any more.** MYP5 was retired as a label and replaced outright by M10; a paper that would have been MYP5 belongs under `m10` with an `M10 …` badge. If you reintroduce `myp5`, `Home.jsx` has no tab for it and `global.css` has no `.badge-myp5`, so the card will render unfiltered and unstyled.

> `data/assessments.js` is the only registry. `comingSoonData` (3 entries) still lists two MYP5-era *math* topics as "coming soon"; they are filed under `m10` to keep the taxonomy closed, not because MYP5 exists.

---

## 5. Adding content

Follow `.opencode/skills/ib-myp-assessment/SKILL.md`. Minimum steps:

1. Copy the newest current-template assessment and replace content.
2. `npm run validate` — must exit 0.
3. Append to `assessmentsData` in `src/data/assessments.js`; add any new `topicIds` to `topicsData`.
4. For a new subject: add to `subjects` in `src/pages/Assessments.jsx` **and** add a `.card-icon.<name>` rule to `global.css`.
5. `npm run build`, confirm `dist/assessments/<file>.html` exists.
6. Update the inventory table in §4 of this file.

Never hardcode assessment/question/minute totals. `StatsSection.jsx` derives them from `assessmentsData`.

### Current assessment template features

Timer with warnings · question navigator · progress bar · **deterministic seeded option shuffle** (`seededShuffle`, seed `q.id * 97 + 41`) · **mark scheme modal** · **per-answer review** · per-topic score breakdown · jsPDF export · localStorage history. Written answers are auto-marked as a **self-check estimate** (one distinct keyword hit = one mark, capped at `marks`) — the UI must not present this as a marker's decision.

---

## 6. Build & deploy

```bash
npm run dev       # http://localhost:5173
npm run build     # vite build && node scripts/copy-assets.mjs
npm run preview
npm run validate
```

`scripts/copy-assets.mjs` replaces an earlier `cp -r assessments dist/`, which silently failed on Windows and left assessment links 404ing locally. **Do not reintroduce a shell command** — use the node script so the build stays cross-platform.

**Vercel** (`vercel.json`): framework `vite`, output `dist`, deploys automatically from `main`. The rewrites are **exact-path only** (`/assessments` → `/index.html`) so the SPA route works while `/assessments/<file>.html` is still served as a static file. Do not add a `/assessments/(.*)` rewrite — it would shadow every assessment.

**Git:** commit and push only when explicitly asked. Never force-push `main`; it is the production branch.

### Verifying a deploy (read before concluding "the deploy failed")

**Canonical site: `https://studyib.vercel.app`.** All docs and links use it. The `kaniib.vercel.app` project is being discarded — it caused repeated confusion and is no longer a valid place to verify anything.

Two Vercel projects are attached to this repo, so a push to `main` produces **two** commit statuses, `Vercel - studyib` and `Vercel - kaniib`, and both may report *Deployment has completed*. Only the `studyib` project serves the current build.

Observed 2026-09-27, commit `7b1bc67`: both statuses went green, but `kaniib.vercel.app` kept serving a **13.6-day-old** build — it 404'd every new assessment and still contained pre-fix content (`x-vercel-cache: HIT`, `age: 1171525`). The current build was live on `studyib.vercel.app` and `mathapp.vercel.app`, where the files were byte-identical to local (modulo CRLF/LF).

A green status is therefore not proof of anything. Verify like this:

1. `Invoke-WebRequest` the file on `studyib.vercel.app` and read the `age` header — `age: 0` is current, a large `age` is a cached older build.
2. For certainty, hash the live file against the local file. Identical hashes (or identical after normalising CRLF→LF) is the only conclusive check.

Do not click **Redeploy** on an existing deployment in the dashboard: it reuses that deployment's original source SHA, so it will happily rebuild and redeploy *old* code. This is exactly what happened once already — a "successful" 22s build that changed nothing.

The local Vercel CLI token (`%APPDATA%\com.vercel.cli\Data\auth.json`) returns **403** for this account, so project and domain inspection from the shell is not currently possible.

### Known repo hygiene issues
- `dist/` is in `.gitignore` but some artifacts remain tracked, so builds dirty `git status`. Fix with `git rm -r --cached dist` (not yet done — needs a decision).
- `index.html` still carries the old `KaniMath` title after the Kani_ISSR rebrand.
- `myp4-trigonometry-assessment.html` uses a different question schema (no `marks`/`type`) and is not held to the gate.

### Repaired (for reference — do not regress)
- **Auth removed entirely** (2026-09-27). The Supabase project was gone, so the gate was dead weight: `middleware.ts` redirected every page to `/login`, and no login could ever satisfy it, because `syncAuthCookie` needed `session.access_token` that the local session never had. Deleted `middleware.ts`, `AuthContext.jsx`, `ProtectedRoute.jsx`, `lib/supabase.js`, `src/pages/auth/*`, `api/auth/*`, the `auth-*` and `navbar-user/logout` CSS, and the `@supabase/supabase-js` + `jose` deps. Bundle fell 405.7 kB → 184.0 kB.
- **`AuthContext.jsx` had a hardcoded password in public Git** (`admin` / `Kanimath@123`) present since `050077c`. It is gone with the file, but treat that string as compromised anywhere else it was reused.
- **5 assessments had a JavaScript syntax error and no quiz engine at all:** `myp4-statistics`, `myp4-comprehensive`, `myp4-sets-venn-probability`, `myp4-sets-venn-probability-advanced`, `myp4-statistics-elite`. Each had (a) a stray `});` with no opener, and (b) an orphaned `');` fragment inside `startQuiz()` where `document.getElementById('start-screen').classList.add('hidden');` belongs — evidence of an earlier bad edit. All now parse, have balanced braces, and execute `startQuiz()`.
- **Registry `id: 7` ("Supply & Demand") pointed at the study page** `myp4-ins-supply-demand.html` (no quiz) while advertising 20 questions. Now points at `myp4-ins-supply-demand-assessment.html`.
- **Wrong answer key** in `myp4-sets-venn-probability.html` (3-set Venn "exactly one instrument"): key was `170`, but the item's own working gives `250`. Corrected to `250`.
- `validate-assessment.mjs` originally counted tags inside JS template literals and reported a false imbalance in `myp4-comprehensive.html`. It now blanks `<script>`/`<style>` before counting.

---

## 7. Conventions

- No lint or typecheck exists. `npm run build` is the gate; `npm run validate` is the content gate.
- Match surrounding style. Assessment files are standalone: inline `<style>` + inline `<script>`, Inter and Fira Code from Google Fonts, jsPDF from cdnjs.
- Design tokens: `--primary #6366f1`, `--secondary #10b981`, `--warning #f59e0b`, `--danger #ef4444`, `--bg-dark #0a0f1a`, `--bg-card #111827`.
- Source notes for content live in `assessments/content/`.
- Keep localStorage keys unique per file (e.g. `kanimath_m10_sci_part1`).

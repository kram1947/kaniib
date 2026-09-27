# Migration Guide (historical)

> **This file is a historical record, not current documentation.**
> For the real architecture, file layout, inventory and deploy process, read [`AGENTS.md`](./AGENTS.md).
> Authoring standards live in [`.opencode/skills/ib-myp-assessment/SKILL.md`](./.opencode/skills/ib-myp-assessment/SKILL.md).

---

## What happened

The platform began as a vanilla HTML/CSS/JS static site (`original_index.html` is the preserved landing page).
Commit **`4f2b36d` — "Refactor: Full React rewrite with Tailwind CSS"** replaced the site shell with a React
application, while deliberately leaving every assessment file as standalone static HTML.

The design intent was and still is a **hybrid**: React renders the site (home, assessments index, topics,
features, auth); each assessment remains a self-contained `.html` file served straight from `/assessments/`.

## What the migration actually produced

`src/` at commit `4f2b36d` contained exactly ten files:

```
src/App.jsx  src/main.jsx  src/index.css
src/components/Navbar.jsx
src/data/quizData.js
src/pages/{Home,Math,Quiz,Sudoku,BioTech}.jsx
```

### Corrections to the previous version of this file

The earlier revision of this guide described a structure that **was never in the repository**. Recorded here so
the mistake is not repeated:

| Previously claimed | Reality |
|---|---|
| `src/components/layout/`, `src/components/ui/`, `src/components/shared/` | Never existed. `src/components/` holds only `Navbar.jsx` and `ProtectedRoute.jsx`. |
| `src/hooks/` (`useStatsAnimation`, `useFilters`) | Never existed. State is plain `useState`/`useMemo` in the components that need it. |
| `src/utils/` | Never existed. |
| `src/styles/variables.css` | Never existed. Design tokens live as CSS custom properties in `src/styles/global.css`. |
| `src/pages/assessments/` (React assessment components) | Never existed. Assessments are static HTML by design. |
| "CSS Modules for scoped styling" | Never used. There is one hand-written `src/styles/global.css`. |
| Tailwind (implied as current) | Tailwind *was* a dependency at `4f2b36d`, via `src/index.css`, and was later dropped in favour of the single hand-written `global.css`. It is not a dependency today. |
| `React.lazy()` code splitting, SSR, service worker, Redux | Never implemented. The bundle is a single ~408 kB chunk. |
| Assessment data lives in `src/pages/Assessments.jsx` | Wrong. The registry is `src/data/assessments.js`; `Assessments.jsx` only renders it. |
| `vercel.json` has a catch-all SPA rewrite | Wrong, and it caused an outage. See below. |

## The Vercel rewrite trap (important)

Three commits exist purely because the rewrite rule kept breaking static assessment files:

| Commit | Problem fixed |
|---|---|
| `482f8a5` | Assessments were not copied into `dist/` during the build, so every link 404'd. |
| `63775ad` | React Router `<Link>` was used for static `.html` targets; changed to plain `<a>`. |
| `bc87364` | A catch-all rewrite served the SPA for `/assessments/*`, shadowing every assessment file. Removed. |

The rule that works — and the one to preserve — is **exact-path rewrites only**:

```json
{ "source": "/assessments", "destination": "/index.html" }
```

This makes the SPA route work while `/assessments/<file>.html` continues to resolve as a static file.
**Never reintroduce a `/assessments/(.*)` rewrite.**

`scripts/copy-assets.mjs` (commit `482f8a5`, later made cross-platform) handles the build-time copy, because the
original `cp -r assessments dist/` silently failed on Windows and left assessment links broken locally.

## Why assessments stayed static HTML

Rewriting 19 assessment files as React components would have meant porting four separate quiz engines with
different schemas, timers and result formats, for no student-facing gain. The React app links to them; they run
independently. This is intentional, not unfinished work.

It does mean the two halves have drifted apart. The legacy `myp4-*` papers predate the current template
(mark scheme modal, per-answer review, deterministic option shuffle) and are not held to the same quality gate —
see `npm run validate` and the "Known legacy debt" section of `AGENTS.md`.

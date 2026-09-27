# Kanishka_ISSR — IB MYP Assessment Platform

<p align="center">
  <img src="https://img.shields.io/badge/IB-MYP4--M10-6366f1?style=for-the-badge" alt="IB MYP4\u2013M10">
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel" alt="Vercel">
  <img src="https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react" alt="React 18">
  <img src="https://img.shields.io/badge/License-Open%20Source-green?style=for-the-badge" alt="License">
</p>

Timed IB MYP practice assessments with mark schemes, per-answer review and PDF reports.
**16 papers & study pages · 330 questions · 1480 marks** across Mathematics, Individuals & Societies and Science.

**🌐 Live site:** [https://studyib.vercel.app](https://studyib.vercel.app)

---

## 📚 Available content

### 🔢 Mathematics (MYP4)

| # | Assessment | Topics | Qs | Time | Marks | Level |
|---|------------|--------|----|------|-------|-------|
| 1 | [Sets, Venn & Probability](https://studyib.vercel.app/assessments/myp4-sets-venn-probability.html) | Set theory, 3-set Venn, probability | 16 | 45 min | 70 | ●●●○○ |
| 2 | [Sets, Venn & Probability — Advanced](https://studyib.vercel.app/assessments/myp4-sets-venn-probability-advanced.html) | 4-set Venn, Bayes' theorem, combinatorics | 50 | 90 min | 400 | ●●●●● |
| 3 | [Set & Probability — Advanced (Part 3)](https://studyib.vercel.app/assessments/myp4-sets-venn-probability-part3.html) | PIE, derangements, z-scores | 25 | 90 min | 175 | ●●●●● |
| 4 | [Statistics & Data Analysis](https://studyib.vercel.app/assessments/myp4-statistics.html) | Mean/median, box plots, IQR | 25 | 60 min | 150 | ●●●○○ |
| 5 | [Statistics & Data Analysis — Part 4](https://studyib.vercel.app/assessments/myp4-statistics-part4.html) | Advanced statistics, z-scores | 25 | 60 min | 100 | ●●●●○ |
| 6 | [Comprehensive Math Review](https://studyib.vercel.app/assessments/myp4-comprehensive.html) | Full MYP4 coverage | 45 | 60 min | 45 | ●●●○○ |
| 7 | [Trigonometry — Study Material](https://studyib.vercel.app/assessments/myp4-trigonometry-study.html) | SOHCAHTOA, sine/cosine rules, bearings | — | self-paced | — | — |
| 8 | [Trigonometry Assessment](https://studyib.vercel.app/assessments/myp4-trigonometry-assessment.html) | SOHCAHTOA, rules, graphs, real-world | 25 | 60 min | 100 | ●●●○○ |
| 9 | [Number Operations](https://studyib.vercel.app/assessments/myp4-number.html) | Exponents, standard form, percentages | 5 | 15 min | 5 | ●●○○○ |
| 10 | [Algebra & Expressions](https://studyib.vercel.app/assessments/myp4-algebra.html) | Equations, factorisation, inequalities | 7 | 20 min | 7 | ●●●○○ |
| 11 | [Geometry & Measurement](https://studyib.vercel.app/assessments/myp4-geometry.html) | Pythagoras, area/volume, angles | 8 | 25 min | 8 | ●●●○○ |

### 🏛 Individuals & Societies (MYP4)

| # | Assessment | Topics | Qs | Time | Marks | Level |
|---|------------|--------|----|------|-------|-------|
| 12 | [History & Future of Money](https://studyib.vercel.app/assessments/myp4-ins-money-history.html) | Barter → Bitcoin, OPVL, crypto | 20 | 90 min | 44 | ●●●○○ |
| 13 | [Supply & Demand](https://studyib.vercel.app/assessments/myp4-ins-supply-demand.html) | Market economics, equilibrium, intervention | 20 | 90 min | 84 | ●●●○○ |

Study material: [History & Future of Money](https://studyib.vercel.app/assessments/myp4-ins-money-history-study.html) · [Supply & Demand](https://studyib.vercel.app/assessments/myp4-ins-supply-demand.html)

### 🧬 Science (M10 track)

**ESS Unit A: Evolution & the Origin of Life**

| # | Assessment | Topics | Qs | Time | Marks | Level |
|---|------------|--------|----|------|-------|-------|
| — | [Unit A Study Material](https://studyib.vercel.app/assessments/m10-science-ess-a-study.html) | 6 topic groups + examinable glossary | — | self-paced | — | — |
| 14 | [Evolution & Origin of Life — Part 1](https://studyib.vercel.app/assessments/m10-science-ess-a-part1.html) | Biodiversity, IUCN Red List, LUCA, mass extinctions, quadrats | 30 | 90 min | 138 | ●●●●○ |
| 15 | [Evolution & Origin of Life — Part 2](https://studyib.vercel.app/assessments/m10-science-ess-a-part2.html) | VIDA model, phylogenetics, Galápagos data, human mutations | 29 | 90 min | 154 | ●●●●● |

> ⚠️ Five legacy MYP4 papers have a JavaScript error and their quiz engine does not currently run. See [Known issues](#-known-issues).

---

## ✨ Features

- **⏱️ Real exam conditions** — countdown timer with warnings, question navigator, progress bar
- **📄 Visible mark schemes** — open the scheme before or after submitting
- **🔍 Per-answer review** — see your answer beside the correct one, question by question
- **🎯 Diagnostic distractors** — wrong options map to a specific named misconception
- **📊 Per-topic breakdown** — know which strand cost you marks
- **🔀 Fair answer keys** — options are deterministically shuffled per question, so one letter is never the answer
- **📥 PDF reports** — downloadable results via jsPDF
- **💾 Local history** — results saved in the browser, no account data required
- **🔓 No login required** — the whole site is public; nothing to configure

---

## 🛠️ Tech stack

| Layer | Choice |
|---|---|
| UI | React 18 + Vite 5 |
| Routing | react-router-dom v6 |
| Auth | **None** — no backend, no database, no environment variables |
| Styling | Hand-written `src/styles/global.css` |
| Assessments | Self-contained static HTML + vanilla JS |
| PDF | jsPDF (CDN, assessment pages only) |
| Deploy | Vercel (auto-deploy from `main`) |

> The React app is the shell. Each assessment is a standalone HTML file served as a static asset.

---

## 🚀 Quick start

```bash
git clone https://github.com/kram1947/kaniib.git
cd kaniib
npm install
npm run dev          # http://localhost:5173
```

There is nothing to configure — no `.env`, no API keys, no database. Results are kept in the browser's `localStorage` and never leave the device.

**Quality gate.** Content is validated, not just eyeballed:

```bash
npm run validate     # syntax, schema, marks vs mark scheme, keyword coverage,
                     # answer-key bias, duplicate ids, HTML balance
npm run build        # must also produce dist/assessments/<file>.html
```

**Deploy.** Push to `main`; Vercel builds and publishes automatically (`vercel.json`: framework `vite`, output `dist`).

---

## 📁 Structure

```
kaniib/
├── index.html            # Vite entry point
├── vercel.json           # Vercel config + exact-path SPA rewrites
├── scripts/
│   ├── copy-assets.mjs   # copies assessments/ -> dist/assessments/
│   └── validate-assessment.mjs
├── src/
│   ├── data/assessments.js   # topicsData + assessmentsData registry
│   ├── pages/  sections/  components/  context/  lib/  styles/
├── assessments/
│   ├── m10-science-ess-a-*.html   # M10 Science
│   ├── myp4-*.html                # MYP4 legacy
│   └── content/                   # original source notes
├── AGENTS.md            # developer guide — architecture and standards
└── .opencode/skills/ib-myp-assessment/SKILL.md   # content standards
```

---

## 🎓 Content standard

New material and papers follow one written standard, enforced by `npm run validate`:

1. **High IB standard** — grade 7–8 demand; every mark defensible from the mark scheme alone; command terms (`state` / `explain` / `justify` / `evaluate`) actually realised; difficulty ramps within a paper.
2. **Competitive-exam alignment** — IB MYP Sciences Paper 1 / Paper 2 structure, with IChO / science-olympiad-style data-interrogation and critique problems for extension. Citations are never invented: figures are sourced, labelled as estimates, or omitted.
3. **Make the difference clear** — confusable pairs get explicit contrast tables in study material and diagnostic distractors in papers, so a wrong answer tells you *which* misconception you had.

---

## ❗ Known issues

- **`myp4-trigonometry-assessment.html` uses an older question schema** and is not held to the same content gate as the newer papers.
- Written answers are auto-marked as a **self-check estimate** against the mark scheme, not as a marker's decision.
- The legacy `myp4-*` papers predate the current template, so they lack the mark-scheme modal, per-answer review and answer shuffling.

---

## 🤝 Contributing

1. Fork and branch. 2. Read `.opencode/skills/ib-myp-assessment/SKILL.md`. 3. Make your change. 4. `npm run validate && npm run build`. 5. Open a PR.

---

## 📄 License

Open source — free to use and modify.

---

<p align="center">Built for IB MYP students 🌍</p>
